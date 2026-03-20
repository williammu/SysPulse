import router from '@ohos.router';
import { InfoCard } from '../components/InfoCard';
import { InfoHeader, InfoButton, InfoCardWithDesc } from '../components/InfoButton';
import { NavigationBarWithArrow } from '../components/NavigationBar';
import { camera } from '@kit.CameraKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { abilityAccessCtrl, PermissionRequestResult } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { promptAction } from '@kit.ArkUI';

const TAG = 'CameraPage';
const LOG_DOMAIN = 0x1234;

// 相机设备详细信息
interface CameraDeviceDetail {
  cameraId: string;
  cameraPosition: camera.CameraPosition;
  cameraType: camera.CameraType;
  connectionType: camera.ConnectionType;
  previewProfiles: camera.Profile[];
  photoProfiles: camera.Profile[];
  videoProfiles: camera.VideoProfile[];
  photoZoomRange: number[];
  videoZoomRange: number[];
  videoStabilization: boolean;
  isPreviewing: boolean;
  previewWidth: number; // 预览区域宽度
  previewHeight: number; // 预览区域高度
}

@Entry
@Component
struct CameraPage {
  @State backCameras: CameraDeviceDetail[] = [];
  @State frontCameras: CameraDeviceDetail[] = [];
  @State otherCameras: CameraDeviceDetail[] = [];
  @State isLoading: boolean = true;
  @State hasPermission: boolean = false;
  @State errorMessage: string = '';
  @State activeCameraId: string = '';
  @State activeCameraPosition: 'back' | 'front' | 'other' | '' = '';
  @State zoomErrorMessage: string = '';
  @State isPreviewStarting: boolean = false;
  @State debugMessage: string = ''; // 调试信息

  // 每个相机类型的 XComponentController
  private backCameraControllers: XComponentController[] = [];
  private frontCameraControllers: XComponentController[] = [];
  private otherCameraControllers: XComponentController[] = [];

  private currentSession: camera.PhotoSession | null = null;
  private currentCameraInput: camera.CameraInput | null = null;
  private currentPreviewOutput: camera.PreviewOutput | null = null;
  private currentPhotoOutput: camera.PhotoOutput | null = null;

  aboutToAppear() {
    hilog.info(LOG_DOMAIN, TAG, 'CameraPage appeared');
    this.requestCameraPermission();
  }

  aboutToDisappear() {
    this.releaseCamera();
  }

  releaseCamera() {
    if (this.currentSession) {
      try {
        this.currentSession.stop();
      } catch (e) {
        hilog.warn(LOG_DOMAIN, TAG, 'Failed to stop session: %{public}s', JSON.stringify(e));
      }
    }

    if (this.currentPhotoOutput) {
      try {
        this.currentPhotoOutput.release();
      } catch (e) {
        hilog.warn(LOG_DOMAIN, TAG, 'Failed to release photo output: %{public}s', JSON.stringify(e));
      }
      this.currentPhotoOutput = null;
    }

    if (this.currentPreviewOutput) {
      try {
        this.currentPreviewOutput.release();
      } catch (e) {
        hilog.warn(LOG_DOMAIN, TAG, 'Failed to release preview output: %{public}s', JSON.stringify(e));
      }
      this.currentPreviewOutput = null;
    }

    if (this.currentSession) {
      try {
        this.currentSession.release();
      } catch (e) {
        hilog.warn(LOG_DOMAIN, TAG, 'Failed to release session: %{public}s', JSON.stringify(e));
      }
      this.currentSession = null;
    }

    if (this.currentCameraInput) {
      try {
        this.currentCameraInput.close();
      } catch (e) {
        hilog.warn(LOG_DOMAIN, TAG, 'Failed to close camera input: %{public}s', JSON.stringify(e));
      }
      this.currentCameraInput = null;
    }

    this.resetAllPreviewState();
    this.activeCameraId = '';
    this.activeCameraPosition = '';
    this.isPreviewStarting = false;

    hilog.info(LOG_DOMAIN, TAG, 'Camera resources released');
  }

  resetAllPreviewState() {
    if (this.backCameras.length > 0) {
      const newBackCameras = this.backCameras.slice();
      newBackCameras.forEach(cam => cam.isPreviewing = false);
      this.backCameras = newBackCameras;
    }
    if (this.frontCameras.length > 0) {
      const newFrontCameras = this.frontCameras.slice();
      newFrontCameras.forEach(cam => cam.isPreviewing = false);
      this.frontCameras = newFrontCameras;
    }
    if (this.otherCameras.length > 0) {
      const newOtherCameras = this.otherCameras.slice();
      newOtherCameras.forEach(cam => cam.isPreviewing = false);
      this.otherCameras = newOtherCameras;
    }
  }

  async requestCameraPermission() {
    try {
      const atManager = abilityAccessCtrl.createAtManager();
      const context = getContext();
      const authStatus = await atManager.checkAccessToken(context.applicationInfo.accessTokenId, 'ohos.permission.CAMERA');

      if (authStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
        this.hasPermission = true;
        this.loadCameraInfo();
      } else {
        const result = await atManager.requestPermissionsFromUser(context, ['ohos.permission.CAMERA']);
        if (result.authResults[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
          this.hasPermission = true;
          this.loadCameraInfo();
        } else {
          this.errorMessage = '未获得相机权限';
          this.isLoading = false;
        }
      }
    } catch (error) {
      this.errorMessage = '权限申请失败';
      this.isLoading = false;
    }
  }

  async loadCameraInfo() {
    try {
      const cameraManager = camera.getCameraManager(getContext());
      const cameras = cameraManager.getSupportedCameras();

      if (cameras && cameras.length > 0) {
        const backList: CameraDeviceDetail[] = [];
        const frontList: CameraDeviceDetail[] = [];
        const otherList: CameraDeviceDetail[] = [];

        this.backCameraControllers = [];
        this.frontCameraControllers = [];
        this.otherCameraControllers = [];

        for (let i = 0; i < cameras.length; i++) {
          const cam = cameras[i];
          try {
            const photoCapability = cameraManager.getSupportedOutputCapability(cam, camera.SceneMode.NORMAL_PHOTO);
            const videoCapability = cameraManager.getSupportedOutputCapability(cam, camera.SceneMode.NORMAL_VIDEO);

            // 为每个相机创建一个 XComponentController
            const controller = new XComponentController();

            const detail: CameraDeviceDetail = {
              cameraId: cam.cameraId || `Camera ${i + 1}`,
              cameraPosition: cam.cameraPosition,
              cameraType: cam.cameraType,
              connectionType: cam.connectionType,
              previewProfiles: photoCapability?.previewProfiles || [],
              photoProfiles: photoCapability?.photoProfiles || [],
              videoProfiles: videoCapability?.videoProfiles || [],
              photoZoomRange: [],
              videoZoomRange: [],
              videoStabilization: false,
              isPreviewing: false,
              previewWidth: 120, // 小预览区域默认宽度
              previewHeight: 160 // 小预览区域默认高度 (3:4 比例)
            };

            if (cam.cameraPosition === camera.CameraPosition.CAMERA_POSITION_BACK) {
              backList.push(detail);
              this.backCameraControllers.push(controller);
            } else if (cam.cameraPosition === camera.CameraPosition.CAMERA_POSITION_FRONT) {
              frontList.push(detail);
              this.frontCameraControllers.push(controller);
            } else {
              otherList.push(detail);
              this.otherCameraControllers.push(controller);
            }
          } catch (e) {
            hilog.error(LOG_DOMAIN, TAG, 'Failed to get capability: %{public}s', JSON.stringify(e));
          }
        }

        this.backCameras = backList;
        this.frontCameras = frontList;
        this.otherCameras = otherList;

        hilog.info(LOG_DOMAIN, TAG, 'Camera info loaded, back: %{public}d, front: %{public}d', backList.length, frontList.length);

        // 不再自动获取，需要用户手动点击
      } else {
        this.errorMessage = '未检测到相机设备';
      }
    } catch (error) {
      this.errorMessage = '获取相机信息失败';
    } finally {
      this.isLoading = false;
    }
  }

  getController(cameraType: 'back' | 'front' | 'other', index: number): XComponentController {
    if (cameraType === 'back') return this.backCameraControllers[index];
    if (cameraType === 'front') return this.frontCameraControllers[index];
    return this.otherCameraControllers[index];
  }

  async startCameraPreview(cameraId: string, cameraType: 'back' | 'front' | 'other', index: number) {
    this.isPreviewStarting = true;
    this.debugMessage = '开始启动预览...';

    try {
      // 先释放之前的相机资源
      this.releaseCamera();
      // releaseCamera 会重置 isPreviewStarting，需要重新设置
      this.isPreviewStarting = true;

      const cameraManager = camera.getCameraManager(getContext());
      const cameras = cameraManager.getSupportedCameras();
      const cameraDevice = cameras.find(cam => cam.cameraId === cameraId);

      if (!cameraDevice) {
        this.debugMessage = '错误：找不到相机设备';
        this.isPreviewStarting = false;
        return;
      }

      const controller = this.getController(cameraType, index);
      let surfaceId = controller.getXComponentSurfaceId();
      this.debugMessage = `Surface ID: ${surfaceId ? '已获取' : '未获取'}`;

      // 如果 surfaceId 还没准备好，等待一下再试
      if (!surfaceId || surfaceId.length === 0) {
        this.debugMessage = 'Surface ID 未就绪，等待...';
        await new Promise<void>((resolve: () => void) => setTimeout(resolve, 500));
        surfaceId = controller.getXComponentSurfaceId();
      }

      if (!surfaceId || surfaceId.length === 0) {
        this.debugMessage = '错误：Surface ID 获取失败';
        this.isPreviewStarting = false;
        return;
      }

      this.debugMessage = `Surface ID 已获取: ${surfaceId.substring(0, 20)}...`;

      const photoSession = cameraManager.createSession(camera.SceneMode.NORMAL_PHOTO) as camera.PhotoSession;
      this.currentSession = photoSession;

      const cameraInput = cameraManager.createCameraInput(cameraDevice);
      this.currentCameraInput = cameraInput;
      await cameraInput.open();

      photoSession.beginConfig();
      photoSession.addInput(cameraInput);

      const photoCapability = cameraManager.getSupportedOutputCapability(cameraDevice, camera.SceneMode.NORMAL_PHOTO);
      if (photoCapability?.previewProfiles && photoCapability.previewProfiles.length > 0) {
        // 选择适合小预览区域的分辨率 (优先选择 3:4 或 9:16 的竖屏比例)
        let bestProfile = photoCapability.previewProfiles[0];
        let maxPixels = 0;

        for (const profile of photoCapability.previewProfiles) {
          const pixels = profile.size.width * profile.size.height;
          const ratio = profile.size.height / profile.size.width; // 高宽比
          // 优先选择竖屏比例 (高宽比 > 1.2)
          const isPortrait = ratio > 1.2;

          if (isPortrait && pixels > maxPixels) {
            maxPixels = pixels;
            bestProfile = profile;
          }
        }

        // 如果没有找到竖屏的，选择像素最多的
        if (maxPixels === 0) {
          for (const profile of photoCapability.previewProfiles) {
            const pixels = profile.size.width * profile.size.height;
            if (pixels > maxPixels) {
              maxPixels = pixels;
              bestProfile = profile;
            }
          }
        }

        hilog.info(LOG_DOMAIN, TAG, 'Selected preview profile: %{public}dx%{public}d',
          bestProfile.size.width, bestProfile.size.height);

        const previewOutput = cameraManager.createPreviewOutput(bestProfile, surfaceId);
        this.currentPreviewOutput = previewOutput;
        photoSession.addOutput(previewOutput);

        // 更新预览尺寸
        const camArray = this.getCameraArray(cameraType);
        const newArray = camArray.slice();
        if (newArray[index]) {
          // 根据实际分辨率计算预览区域大小，保持比例
          const aspectRatio = bestProfile.size.height / bestProfile.size.width;
          // 固定宽度 120，计算高度
          newArray[index].previewWidth = 120;
          newArray[index].previewHeight = Math.round(120 * aspectRatio);
          newArray[index].isPreviewing = true;
          this.updateCameraArray(cameraType, newArray);
        }
      }

      if (photoCapability?.photoProfiles && photoCapability.photoProfiles.length > 0) {
        const photoOutput = cameraManager.createPhotoOutput(photoCapability.photoProfiles[0]);
        this.currentPhotoOutput = photoOutput;
        photoSession.addOutput(photoOutput);
      }

      photoSession.commitConfig();
      photoSession.start();

      this.activeCameraId = cameraId;
      this.activeCameraPosition = cameraType;
      // 注意：isPreviewStarting 保持为 true，直到获取变焦完成
      hilog.info(LOG_DOMAIN, TAG, 'Preview started for %{public}s', cameraId);

      // 获取变焦范围
      const currentSession = photoSession;
      const currentCameraType = cameraType;
      const currentIndex = index;
      const currentCameraId = cameraId;

      setTimeout(() => {
        try {
          hilog.info(LOG_DOMAIN, TAG, 'Getting zoom range for camera: %{public}s', currentCameraId);
          if (!currentSession) {
            hilog.error(LOG_DOMAIN, TAG, 'Session is null, cannot get zoom range');
            return;
          }
          hilog.info(LOG_DOMAIN, TAG, 'Calling getZoomRatioRange...');
          const zoomRange = currentSession.getZoomRatioRange();
          hilog.info(LOG_DOMAIN, TAG, 'Zoom range result: %{public}s', JSON.stringify(zoomRange));
          if (!zoomRange || zoomRange.length < 2) {
            hilog.warn(LOG_DOMAIN, TAG, 'Invalid zoom range: %{public}s', JSON.stringify(zoomRange));
            return;
          }

          const camArray = this.getCameraArray(currentCameraType);
          const newArray = camArray.slice();
          if (newArray[currentIndex]) {
            newArray[currentIndex].photoZoomRange = zoomRange;
            this.updateCameraArray(currentCameraType, newArray);
            hilog.info(LOG_DOMAIN, TAG, 'Zoom range updated for camera: %{public}s', currentCameraId);
          }

          // 获取到变焦后自动停止预览，释放资源
          hilog.info(LOG_DOMAIN, TAG, 'Auto stopping preview after getting zoom range');
          this.releaseCamera();
        } catch (e) {
          hilog.error(LOG_DOMAIN, TAG, 'Failed to get zoom: %{public}s', JSON.stringify(e));
        }
      }, 2000);

    } catch (error) {
      this.isPreviewStarting = false;
      hilog.error(LOG_DOMAIN, TAG, 'Failed to start preview: %{public}s', JSON.stringify(error));
    }
  }

  getCameraArray(cameraType: 'back' | 'front' | 'other'): CameraDeviceDetail[] {
    if (cameraType === 'back') return this.backCameras;
    if (cameraType === 'front') return this.frontCameras;
    return this.otherCameras;
  }

  updateCameraArray(cameraType: 'back' | 'front' | 'other', newArray: CameraDeviceDetail[]) {
    if (cameraType === 'back') this.backCameras = newArray;
    else if (cameraType === 'front') this.frontCameras = newArray;
    else this.otherCameras = newArray;
  }

  getCameraTypeText(type: camera.CameraType): string {
    switch (type) {
      case camera.CameraType.CAMERA_TYPE_WIDE_ANGLE: return '广角';
      case camera.CameraType.CAMERA_TYPE_ULTRA_WIDE: return '超广角';
      case camera.CameraType.CAMERA_TYPE_TELEPHOTO: return '长焦';
      case camera.CameraType.CAMERA_TYPE_TRUE_DEPTH: return '深感';
      default: return '标准';
    }
  }

  getConnectionTypeText(connection: camera.ConnectionType): string {
    switch (connection) {
      case camera.ConnectionType.CAMERA_CONNECTION_BUILT_IN: return '内置';
      case camera.ConnectionType.CAMERA_CONNECTION_USB_PLUGIN: return 'USB外接';
      case camera.ConnectionType.CAMERA_CONNECTION_REMOTE: return '远程';
      default: return '未知';
    }
  }

  formatSize(size: camera.Size): string {
    if (!size) return '未知';
    return `${size.width} × ${size.height}`;
  }

  getMaxPreviewResolution(detail: CameraDeviceDetail): string {
    if (!detail.previewProfiles || detail.previewProfiles.length === 0) return '未获取';
    const maxProfile = detail.previewProfiles.reduce((max, current) => {
      const maxPixels = (max.size?.width || 0) * (max.size?.height || 0);
      const currentPixels = (current.size?.width || 0) * (current.size?.height || 0);
      return currentPixels > maxPixels ? current : max;
    });
    return this.formatSize(maxProfile.size);
  }

  getMaxPhotoResolution(detail: CameraDeviceDetail): string {
    if (!detail.photoProfiles || detail.photoProfiles.length === 0) return '未获取';
    const maxProfile = detail.photoProfiles.reduce((max, current) => {
      const maxPixels = (max.size?.width || 0) * (max.size?.height || 0);
      const currentPixels = (current.size?.width || 0) * (current.size?.height || 0);
      return currentPixels > maxPixels ? current : max;
    });
    return this.formatSize(maxProfile.size);
  }

  getMaxVideoResolution(detail: CameraDeviceDetail): string {
    if (!detail.videoProfiles || detail.videoProfiles.length === 0) return '未获取';
    const maxProfile = detail.videoProfiles.reduce((max, current) => {
      const maxPixels = (max.size?.width || 0) * (max.size?.height || 0);
      const currentPixels = (current.size?.width || 0) * (current.size?.height || 0);
      return currentPixels > maxPixels ? current : max;
    });
    return this.formatSize(maxProfile.size);
  }

  getZoomRangeText(zoomRange: number[]): string {
    if (!zoomRange || zoomRange.length < 2) return '未获取';
    return `${zoomRange[0].toFixed(1)}x - ${zoomRange[1].toFixed(1)}x`;
  }

  getCameraPositionText(position: 'back' | 'front' | 'other'): string {
    switch (position) {
      case 'back': return '后置';
      case 'front': return '前置';
      case 'other': return '其他';
      default: return '';
    }
  }

  // 辅助方法：判断指定相机是否正在获取变焦
  isGettingZoomForCamera(cameraType: 'back' | 'front' | 'other', index: number): boolean {
    const cameraId = this.getCameraArray(cameraType)[index]?.cameraId ?? '';
    return this.isPreviewStarting && this.activeCameraId === cameraId;
  }

  @Builder
  CameraDetailView(detail: CameraDeviceDetail, index: number, cameraType: 'back' | 'front' | 'other') {
    Column() {
      // 相机类型和连接类型行
      Row() {
        Text(`${this.getCameraTypeText(detail.cameraType)} · ${this.getConnectionTypeText(detail.connectionType)}`)
          .fontSize(14)
          .fontColor($r('app.color.text_secondary'))
          .layoutWeight(1);
      }
      .width('100%')
      .margin({ bottom: 12 });

      // 分辨率信息
      InfoCardWithDesc({
        title: '最高预览分辨率',
        value: this.getMaxPreviewResolution(detail),
        conceptId: 'camera_preview_resolution',
        onInfoClick: () => {
          router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: 'camera_preview_resolution' }
          });
        }
      });

      InfoCardWithDesc({
        title: '最高拍照分辨率',
        value: this.getMaxPhotoResolution(detail),
        conceptId: 'camera_photo_resolution',
        onInfoClick: () => {
          router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: 'camera_photo_resolution' }
          });
        }
      });

      InfoCardWithDesc({
        title: '最高视频分辨率',
        value: this.getMaxVideoResolution(detail),
        conceptId: 'camera_video_resolution',
        onInfoClick: () => {
          router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: 'camera_video_resolution' }
          });
        }
      });

      // 分隔线
      Divider()
        .strokeWidth(1)
        .color($r('app.color.text_secondary'))
        .opacity(0.3)
        .margin({ top: 8, bottom: 12 });

      // 隐藏的 XComponent（用于获取 Surface ID，不显示但必须有）
      XComponent({
        id: `cameraPreview_${cameraType}_${index}`,
        type: XComponentType.SURFACE,
        controller: this.getController(cameraType, index)
      })
        .width(1)
        .height(1)
        .opacity(0);

      // 变焦能力和操作按钮行
      Row() {
        // 左侧：操作按钮
        Column() {
          Button(this.isGettingZoomForCamera(cameraType, index) ? '获取中' : '获取变焦')
            .fontSize(12)
            .fontColor($r('app.color.background_dark'))
            .backgroundColor(this.isGettingZoomForCamera(cameraType, index) ? $r('app.color.text_secondary') : $r('app.color.primary_color'))
            .width(90)
            .height(36)
            .enabled(!this.isPreviewStarting)
            .onClick(async () => {
              const currentCameraId = this.getCameraArray(cameraType)[index]?.cameraId ?? '';
              if (this.activeCameraId !== '' && this.activeCameraId !== currentCameraId) {
                this.releaseCamera();
                await new Promise<void>((resolve: () => void) => setTimeout(resolve, 300));
              }
              await this.startCameraPreview(currentCameraId, cameraType, index);
            });
        }
        .width(100)
        .margin({ right: 12 })

        // 右侧：变焦信息
        Column() {
          Row() {
            Text('变焦范围')
              .fontSize(14)
              .fontColor($r('app.color.text_primary'))
              .fontWeight(FontWeight.Medium);

            InfoButton({
              conceptId: 'camera_zoom_range',
              onInfoClick: () => {
                router.pushUrl({
                  url: 'pages/ConceptDetailPage',
                  params: { conceptId: 'camera_zoom_range' }
                });
              }
            })
              .margin({ left: 4 });
          }
          .margin({ bottom: 4 });

          // 获取中状态显示
          if (this.isGettingZoomForCamera(cameraType, index)) {
            Text('获取中...')
              .fontSize(18)
              .fontColor($r('app.color.primary_color'))
              .fontWeight(FontWeight.Medium);
          } else {
            // 直接从 State 数组获取最新值
            Text(this.getZoomRangeText(this.getCameraArray(cameraType)[index]?.photoZoomRange))
              .fontSize(18)
              .fontColor(this.getCameraArray(cameraType)[index]?.photoZoomRange?.length >= 2 ? $r('app.color.primary_color') : $r('app.color.text_secondary'))
              .fontWeight(this.getCameraArray(cameraType)[index]?.photoZoomRange?.length >= 2 ? FontWeight.Medium : FontWeight.Normal);
          }

          if (this.getCameraArray(cameraType)[index]?.photoZoomRange?.length < 2 && !this.isGettingZoomForCamera(cameraType, index)) {
            Text('点击左侧按钮获取')
              .fontSize(11)
              .fontColor($r('app.color.text_secondary'))
              .margin({ top: 4 });
          }
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
        .justifyContent(FlexAlign.Center);
      }
      .width('100%');
    }
    .width('100%')
    .padding(16)
    .backgroundColor($r('app.color.background_card'))
    .borderRadius(12)
    .margin({ bottom: 12 });
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: '相机',
        onBack: () => {
          this.releaseCamera();
          router.back();
        }
      })

      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24);
          } else if (this.errorMessage) {
            InfoHeader({ title: '状态' });
            InfoCard({ title: '提示', value: this.errorMessage });
          } else {
            // 后置相机区域
            if (this.backCameras.length > 0) {
              InfoHeader({
                title: '后置相机',
                subtitle: `${this.backCameras.length} 个`
              });

              ForEach(this.backCameras, (cam: CameraDeviceDetail, index: number) => {
                this.CameraDetailView(cam, index, 'back');
              }, (cam: CameraDeviceDetail) => cam.cameraId);
            }

            // 前置相机区域
            if (this.frontCameras.length > 0) {
              InfoHeader({
                title: '前置相机',
                subtitle: `${this.frontCameras.length} 个`
              });

              ForEach(this.frontCameras, (cam: CameraDeviceDetail, index: number) => {
                this.CameraDetailView(cam, index, 'front');
              }, (cam: CameraDeviceDetail) => cam.cameraId);
            }

            // 其他相机区域
            if (this.otherCameras.length > 0) {
              InfoHeader({
                title: '其他相机',
                subtitle: `${this.otherCameras.length} 个`
              });

              ForEach(this.otherCameras, (cam: CameraDeviceDetail, index: number) => {
                this.CameraDetailView(cam, index, 'other');
              }, (cam: CameraDeviceDetail) => cam.cameraId);
            }


          }
        }
        .width('100%')
        .padding(16);
      }
      .layoutWeight(1);
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_dark'));
  }
}
