import router from '@ohos.router';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import { SensorUtil, AccelerometerData, GyroscopeData, LightData, ProximityData, MagneticFieldData, OrientationData } from '../utils/SensorUtil';
import sensor from '@ohos.sensor';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'SensorPage';

@Entry
@Component
struct SensorPage {
  @State accelerometerData: AccelerometerData | null = null;
  @State gyroscopeData: GyroscopeData | null = null;
  @State lightData: LightData | null = null;
  @State proximityData: ProximityData | null = null;
  @State magneticFieldData: MagneticFieldData | null = null;
  @State orientationData: OrientationData | null = null;
  @State hasAccelerometer: boolean = false;
  @State hasGyroscope: boolean = false;
  @State hasLight: boolean = false;
  @State hasProximity: boolean = false;
  @State hasMagneticField: boolean = false;
  @State hasOrientation: boolean = false;

  aboutToAppear() {
    hilog.info(0x0000, TAG, 'SensorPage aboutToAppear');

    // 尝试订阅各传感器数据（如果传感器存在）
    this.trySubscribeSensors();
  }

  aboutToDisappear() {
    hilog.info(0x0000, TAG, 'SensorPage aboutToDisappear');
    // 取消订阅所有传感器
    if (this.hasAccelerometer) {
      SensorUtil.unsubscribeAccelerometer();
    }
    if (this.hasGyroscope) {
      SensorUtil.unsubscribeGyroscope();
    }
    if (this.hasLight) {
      SensorUtil.unsubscribeLight();
    }
    if (this.hasProximity) {
      SensorUtil.unsubscribeProximity();
    }
    if (this.hasMagneticField) {
      SensorUtil.unsubscribeMagneticField();
    }
    if (this.hasOrientation) {
      SensorUtil.unsubscribeOrientation();
    }
  }

  trySubscribeSensors() {
    // 尝试订阅加速度传感器
    try {
      SensorUtil.subscribeAccelerometer((data) => {
        this.accelerometerData = data;
        this.hasAccelerometer = true;
      });
      this.hasAccelerometer = true;
    } catch (error) {
      hilog.warn(0x0000, TAG, 'Accelerometer not available');
    }

    // 尝试订阅陀螺仪
    try {
      SensorUtil.subscribeGyroscope((data) => {
        this.gyroscopeData = data;
        this.hasGyroscope = true;
      });
      this.hasGyroscope = true;
    } catch (error) {
      hilog.warn(0x0000, TAG, 'Gyroscope not available');
    }

    // 尝试订阅光线传感器
    try {
      SensorUtil.subscribeLight((data) => {
        this.lightData = data;
        this.hasLight = true;
      });
      this.hasLight = true;
    } catch (error) {
      hilog.warn(0x0000, TAG, 'Light sensor not available');
    }

    // 尝试订阅距离传感器
    try {
      SensorUtil.subscribeProximity((data) => {
        this.proximityData = data;
        this.hasProximity = true;
      });
      this.hasProximity = true;
    } catch (error) {
      hilog.warn(0x0000, TAG, 'Proximity sensor not available');
    }

    // 尝试订阅磁场传感器
    try {
      SensorUtil.subscribeMagneticField((data) => {
        this.magneticFieldData = data;
        this.hasMagneticField = true;
      });
      this.hasMagneticField = true;
    } catch (error) {
      hilog.warn(0x0000, TAG, 'Magnetic field sensor not available');
    }

    // 尝试订阅方向传感器
    try {
      SensorUtil.subscribeOrientation((data) => {
        this.orientationData = data;
        this.hasOrientation = true;
      });
      this.hasOrientation = true;
    } catch (error) {
      hilog.warn(0x0000, TAG, 'Orientation sensor not available');
    }
  }

  // 数据说明组件
  @Builder
  DataDescription(text: string) {
    Text(text)
      .fontSize(12)
      .fontColor($r('app.color.text_secondary'))
      .margin({ top: 4, bottom: 8 })
      .width('100%')
  }

  build() {
    Column() {
      Row() {
        Text('← 返回')
          .fontSize(16)
          .fontColor($r('app.color.primary_color'))
          .onClick(() => {
            router.back();
          })

        Text('传感器')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 12 })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      Scroll() {
        Column() {
          // 加速度传感器
          if (this.hasAccelerometer) {
            SectionHeader({ title: '加速度传感器' });
            this.DataDescription('测量设备在 X/Y/Z 三个轴上的加速度，单位 m/s²。用于检测设备的运动状态、倾斜角度等。');

            if (this.accelerometerData) {
              InfoCard({
                title: 'X 轴',
                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
              })

              InfoCard({
                title: 'Y 轴',
                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
              })

              InfoCard({
                title: 'Z 轴',
                value: `${this.accelerometerData.z.toFixed(2)} m/s²`
              })
            }
          }

          // 陀螺仪
          if (this.hasGyroscope) {
            SectionHeader({ title: '陀螺仪' });
            this.DataDescription('测量设备在 X/Y/Z 三个轴上的角速度，单位 rad/s。用于检测设备的旋转、转向等动作。');

            if (this.gyroscopeData) {
              InfoCard({
                title: 'X 轴角速度',
                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
              })

              InfoCard({
                title: 'Y 轴角速度',
                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
              })

              InfoCard({
                title: 'Z 轴角速度',
                value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
              })
            }
          }

          // 光线传感器
          if (this.hasLight) {
            SectionHeader({ title: '光线传感器' });
            this.DataDescription('测量环境光强度，单位 lux。用于自动调节屏幕亮度、切换暗黑模式等。');

            if (this.lightData) {
              InfoCard({
                title: '光强度',
                value: `${this.lightData.intensity.toFixed(0)} lux`
              })
            }
          }

          // 距离传感器
          if (this.hasProximity) {
            SectionHeader({ title: '距离传感器' });
            this.DataDescription('测量设备与遮挡物之间的距离，单位 cm。用于通话时自动息屏、接近检测等。');

            if (this.proximityData) {
              InfoCard({
                title: '距离',
                value: `${this.proximityData.distance.toFixed(0)} cm`
              })
            }
          }

          // 磁场传感器
          if (this.hasMagneticField) {
            SectionHeader({ title: '磁场传感器' });
            this.DataDescription('测量设备周围的磁场强度，单位 μT。用于电子罗盘、方向检测等。');

            if (this.magneticFieldData) {
              InfoCard({
                title: 'X 轴磁场',
                value: `${this.magneticFieldData.x.toFixed(2)} μT`
              })

              InfoCard({
                title: 'Y 轴磁场',
                value: `${this.magneticFieldData.y.toFixed(2)} μT`
              })

              InfoCard({
                title: 'Z 轴磁场',
                value: `${this.magneticFieldData.z.toFixed(2)} μT`
              })
            }
          }

          // 方向传感器
          if (this.hasOrientation) {
            SectionHeader({ title: '方向传感器' });
            this.DataDescription('测量设备的方位角度。Alpha: 方位角(0-360°)，Beta: 俯仰角(-180-180°)，Gamma: 翻滚角(-90-90°)。');

            if (this.orientationData) {
              InfoCard({
                title: '方位角 (Alpha)',
                value: `${this.orientationData.alpha.toFixed(1)}°`
              })

              InfoCard({
                title: '俯仰角 (Beta)',
                value: `${this.orientationData.beta.toFixed(1)}°`
              })

              InfoCard({
                title: '翻滚角 (Gamma)',
                value: `${this.orientationData.gamma.toFixed(1)}°`
              })
            }
          }

          // 无传感器提示
          if (!this.hasAccelerometer && !this.hasGyroscope && !this.hasLight && 
              !this.hasProximity && !this.hasMagneticField && !this.hasOrientation) {
            Column() {
              Text('未检测到传感器')
                .fontSize(18)
                .fontColor($r('app.color.text_secondary'))
                .margin(24)

              Text('该设备可能没有可用的传感器或传感器权限未开启')
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
            }
            .width('100%')
            .padding(24)
            .borderRadius(12)
            .backgroundColor($r('app.color.card_bg'))
            .alignItems(HorizontalAlign.Center)
          }
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F7F8FA')
  }
}
