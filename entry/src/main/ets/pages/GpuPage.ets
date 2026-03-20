import router from '@ohos.router';
import { InfoCard } from '../components/InfoCard';
import { InfoHeader, InfoCardWithDesc } from '../components/InfoButton';
import { nativeApi, GpuInfo } from '../utils/NativeApi';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { NavigationBarWithArrow } from '../components/NavigationBar';

const TAG = 'GpuPage';

@Entry
@Component
struct GpuPage {
  @State gpuInfo: GpuInfo | null = null;
  @State isLoading: boolean = true;
  @State hasError: boolean = false;
  @State errorMessage: string = '';

  aboutToAppear() {
    hilog.info(0x0000, TAG, 'GpuPage aboutToAppear');
    this.loadGpuInfo();
  }

  loadGpuInfo() {
    try {
      const info = nativeApi.getGpuInfo();
      if (info && info.success) {
        this.gpuInfo = info;
        hilog.info(0x0000, TAG, 'GPU info loaded: vendor=%{public}s, renderer=%{public}s', 
                   info.vendor, info.renderer);
      } else {
        this.hasError = true;
        this.errorMessage = info?.error || '无法获取 GPU 信息';
        hilog.error(0x0000, TAG, 'Failed to get GPU info: %{public}s', this.errorMessage);
      }
    } catch (error) {
      this.hasError = true;
      this.errorMessage = String(error);
      hilog.error(0x0000, TAG, 'Error loading GPU info: %{public}s', String(error));
    }
    this.isLoading = false;
  }

  // 跳转到概念详情页
  navigateToConcept(conceptId: string): void {
    router.pushUrl({
      url: 'pages/ConceptDetailPage',
      params: { conceptId: conceptId }
    });
  }

  // 格式化数值显示
  formatValue(value: number, unit: string = ''): string {
    if (value === -1 || value === undefined) {
      return '不支持';
    }
    return unit ? `${value} ${unit}` : `${value}`;
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: 'GPU 信息',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          if (this.isLoading) {
            Column() {
              Text('加载中...')
                .fontSize(16)
                .fontColor($r('app.color.text_secondary'))
                .margin(24)
            }
            .width('100%')
            .padding(24)
            .borderRadius(12)
            .backgroundColor($r('app.color.background_card'))
            .alignItems(HorizontalAlign.Center)
          } else if (this.hasError) {
            Column() {
              Text('获取 GPU 信息失败')
                .fontSize(18)
                .fontColor($r('app.color.text_secondary'))
                .margin(24)

              Text(this.errorMessage)
                .fontSize(14)
                .fontColor($r('app.color.text_secondary'))
            }
            .width('100%')
            .padding(24)
            .borderRadius(12)
            .backgroundColor($r('app.color.background_card'))
            .alignItems(HorizontalAlign.Center)
          } else if (this.gpuInfo) {
            // GPU 基本信息
            InfoHeader({
              title: 'GPU 基本信息',
              subtitle: '通过 OpenGL ES API 获取的 GPU 硬件信息'
            });

            InfoCardWithDesc({
              title: 'GPU 厂商',
              value: this.gpuInfo.vendor || '未知',
              conceptId: 'gpu_vendor',
              onInfoClick: () => this.navigateToConcept('gpu_vendor')
            })

            InfoCardWithDesc({
              title: 'GPU 型号',
              value: this.gpuInfo.renderer || '未知',
              conceptId: 'gpu_renderer',
              onInfoClick: () => this.navigateToConcept('gpu_renderer')
            })

            InfoCardWithDesc({
              title: 'OpenGL ES 版本',
              value: this.gpuInfo.version || '未知',
              conceptId: 'gpu_opengl_version',
              onInfoClick: () => this.navigateToConcept('gpu_opengl_version')
            })

            InfoCardWithDesc({
              title: 'GLSL 版本',
              value: this.gpuInfo.shadingLanguageVersion || '未知',
              conceptId: 'gpu_glsl_version',
              onInfoClick: () => this.navigateToConcept('gpu_glsl_version')
            })

            // 纹理限制
            InfoHeader({
              title: '纹理限制',
              subtitle: 'GPU 对纹理资源的硬件限制',
              conceptId: 'gpu_max_texture_size',
              onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
            });

            InfoCardWithDesc({
              title: '最大纹理尺寸',
              value: this.formatValue(this.gpuInfo.maxTextureSize, 'px'),
              conceptId: 'gpu_max_texture_size',
              onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
            })

            InfoCardWithDesc({
              title: '最大立方体贴图尺寸',
              value: this.formatValue(this.gpuInfo.maxCubeMapTextureSize, 'px'),
              conceptId: 'gpu_cube_map_size',
              onInfoClick: () => this.navigateToConcept('gpu_cube_map_size')
            })

            InfoCardWithDesc({
              title: '最大渲染缓冲区尺寸',
              value: this.formatValue(this.gpuInfo.maxRenderbufferSize, 'px'),
              conceptId: 'gpu_max_texture_size',
              onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
            })

            InfoCardWithDesc({
              title: '纹理单元数',
              value: this.formatValue(this.gpuInfo.maxTextureImageUnits),
              conceptId: 'gpu_texture_units',
              onInfoClick: () => this.navigateToConcept('gpu_texture_units')
            })

            InfoCardWithDesc({
              title: '顶点纹理单元数',
              value: this.formatValue(this.gpuInfo.maxVertexTextureImageUnits),
              conceptId: 'gpu_texture_units',
              onInfoClick: () => this.navigateToConcept('gpu_texture_units')
            })

            InfoCardWithDesc({
              title: '组合纹理单元数',
              value: this.formatValue(this.gpuInfo.maxCombinedTextureImageUnits),
              conceptId: 'gpu_texture_units',
              onInfoClick: () => this.navigateToConcept('gpu_texture_units')
            })

            // 视口限制
            InfoHeader({
              title: '视口与渲染',
              subtitle: 'GPU 对视口和渲染的限制',
              conceptId: 'gpu_viewport',
              onInfoClick: () => this.navigateToConcept('gpu_viewport')
            });

            InfoCardWithDesc({
              title: '最大视口尺寸',
              value: `${this.formatValue(this.gpuInfo.maxViewportWidth)} × ${this.formatValue(this.gpuInfo.maxViewportHeight)}`,
              conceptId: 'gpu_viewport',
              onInfoClick: () => this.navigateToConcept('gpu_viewport')
            })

            InfoCardWithDesc({
              title: '线宽范围',
              value: this.gpuInfo.aliasedLineWidthRange && this.gpuInfo.aliasedLineWidthRange.length >= 2
                ? `${this.gpuInfo.aliasedLineWidthRange[0]} - ${this.gpuInfo.aliasedLineWidthRange[1]}`
                : '未知',
              conceptId: 'gpu_line_width',
              onInfoClick: () => this.navigateToConcept('gpu_line_width')
            })

            InfoCardWithDesc({
              title: '点大小范围',
              value: this.gpuInfo.aliasedPointSizeRange && this.gpuInfo.aliasedPointSizeRange.length >= 2
                ? `${this.gpuInfo.aliasedPointSizeRange[0]} - ${this.gpuInfo.aliasedPointSizeRange[1]}`
                : '未知',
              conceptId: 'gpu_point_size',
              onInfoClick: () => this.navigateToConcept('gpu_point_size')
            })

            // 着色器限制
            InfoHeader({
              title: '着色器限制',
              subtitle: 'GPU 对着色器程序的资源限制',
              conceptId: 'gpu_vertex_attribs',
              onInfoClick: () => this.navigateToConcept('gpu_vertex_attribs')
            });

            InfoCardWithDesc({
              title: '顶点属性数',
              value: this.formatValue(this.gpuInfo.maxVertexAttribs),
              conceptId: 'gpu_vertex_attribs',
              onInfoClick: () => this.navigateToConcept('gpu_vertex_attribs')
            })

            InfoCardWithDesc({
              title: '顶点 Uniform 向量数',
              value: this.formatValue(this.gpuInfo.maxVertexUniformVectors),
              conceptId: 'gpu_uniform_vectors',
              onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
            })

            InfoCardWithDesc({
              title: '片段 Uniform 向量数',
              value: this.formatValue(this.gpuInfo.maxFragmentUniformVectors),
              conceptId: 'gpu_uniform_vectors',
              onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
            })

            InfoCardWithDesc({
              title: 'Varying 向量数',
              value: this.formatValue(this.gpuInfo.maxVaryingVectors),
              conceptId: 'gpu_varying_vectors',
              onInfoClick: () => this.navigateToConcept('gpu_varying_vectors')
            })

            InfoCardWithDesc({
              title: 'Uniform 缓冲区绑定数',
              value: this.formatValue(this.gpuInfo.maxUniformBufferBindings),
              conceptId: 'gpu_uniform_vectors',
              onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
            })

            InfoCardWithDesc({
              title: 'Uniform 块大小',
              value: this.formatValue(this.gpuInfo.maxUniformBlockSize, 'bytes'),
              conceptId: 'gpu_uniform_vectors',
              onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
            })

            // 其他限制
            InfoHeader({
              title: '其他限制',
              subtitle: 'GPU 的其他硬件能力限制',
              conceptId: 'gpu_multisample',
              onInfoClick: () => this.navigateToConcept('gpu_multisample')
            });

            InfoCardWithDesc({
              title: '绘制缓冲区数',
              value: this.formatValue(this.gpuInfo.maxDrawBuffers),
              conceptId: 'gpu_draw_buffers',
              onInfoClick: () => this.navigateToConcept('gpu_draw_buffers')
            })

            InfoCardWithDesc({
              title: '颜色附件数',
              value: this.formatValue(this.gpuInfo.maxColorAttachments),
              conceptId: 'gpu_draw_buffers',
              onInfoClick: () => this.navigateToConcept('gpu_draw_buffers')
            })

            InfoCardWithDesc({
              title: '最大采样数 (MSAA)',
              value: this.formatValue(this.gpuInfo.maxSamples, 'x'),
              conceptId: 'gpu_multisample',
              onInfoClick: () => this.navigateToConcept('gpu_multisample')
            })

            InfoCardWithDesc({
              title: '最大元素索引',
              value: this.formatValue(this.gpuInfo.maxElementIndex),
              conceptId: 'gpu_info',
              onInfoClick: () => this.navigateToConcept('gpu_info')
            })

            InfoCardWithDesc({
              title: '扩展数量',
              value: this.formatValue(this.gpuInfo.numExtensions),
              conceptId: 'gpu_extensions',
              onInfoClick: () => this.navigateToConcept('gpu_extensions')
            })

            // 扩展支持
            InfoHeader({
              title: '扩展支持',
              subtitle: 'GPU 支持的 OpenGL ES 扩展功能',
              conceptId: 'gpu_extensions',
              onInfoClick: () => this.navigateToConcept('gpu_extensions')
            });

            Column() {
              Text(this.gpuInfo.extensions || '无扩展信息')
                .fontSize(12)
                .fontColor($r('app.color.text_secondary'))
                .maxLines(10)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
            }
            .width('100%')
            .padding(16)
            .borderRadius(12)
            .backgroundColor($r('app.color.background_card'))
          }
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_dark'))
  }
}
