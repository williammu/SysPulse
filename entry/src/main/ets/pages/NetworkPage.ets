import router from '@ohos.router';
import connection from '@ohos.net.connection';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'NetworkPage';

interface NetworkDetails {
  type: string;
  isConnected: boolean;
  isMetered: boolean;
  isRoaming: boolean;
  linkUpBandwidth: number;
  linkDownBandwidth: number;
}

@Entry
@Component
struct NetworkPage {
  @State networkDetails: NetworkDetails | null = null;
  @State isLoading: boolean = true;

  async aboutToAppear() {
    hilog.info(0x0000, TAG, 'NetworkPage aboutToAppear');
    await this.loadNetworkInfo();
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
  }

  async loadNetworkInfo() {
    try {
      const netHandle = connection.getDefaultNetSync();
      if (netHandle && netHandle.netId !== 0) {
        const netCapabilities = connection.getNetCapabilitiesSync(netHandle);
        const connectionProperties = connection.getConnectionPropertiesSync(netHandle);

        const bearerType = netCapabilities.bearerTypes[0] || connection.NetBearType.BEARER_CELLULAR;
        const networkCap = netCapabilities.networkCap || [];
        const linkUpBandwidth = netCapabilities.linkUpBandwidthKbps || 0;
        const linkDownBandwidth = netCapabilities.linkDownBandwidthKbps || 0;

        this.networkDetails = {
          type: this.getNetworkTypeName(bearerType),
          isConnected: true,
          isMetered: networkCap.includes(connection.NetCap.NET_CAPABILITY_NOT_METERED) ? false : true,
          isRoaming: false, // 需要额外权限
          linkUpBandwidth: linkUpBandwidth,
          linkDownBandwidth: linkDownBandwidth
        };
      } else {
        this.networkDetails = {
          type: '无网络',
          isConnected: false,
          isMetered: false,
          isRoaming: false,
          linkUpBandwidth: 0,
          linkDownBandwidth: 0
        };
      }
    } catch (error) {
      hilog.error(0x0000, TAG, 'Load network info error: %{public}s', String(error));
      this.networkDetails = {
        type: '未知',
        isConnected: false,
        isMetered: false,
        isRoaming: false,
        linkUpBandwidth: 0,
        linkDownBandwidth: 0
      };
    }
  }

  getNetworkTypeName(bearerType: connection.NetBearType): string {
    switch (bearerType) {
      case connection.NetBearType.BEARER_CELLULAR:
        return '移动数据';
      case connection.NetBearType.BEARER_WIFI:
        return 'Wi-Fi';
      case connection.NetBearType.BEARER_BLUETOOTH:
        return '蓝牙';
      case connection.NetBearType.BEARER_ETHERNET:
        return '以太网';
      case connection.NetBearType.BEARER_VPN:
        return 'VPN';
      default:
        return '未知';
    }
  }

  formatBandwidth(kbps: number): string {
    if (kbps <= 0) return '未知';
    if (kbps >= 1000000) {
      return `${(kbps / 1000000).toFixed(1)} Gbps`;
    } else if (kbps >= 1000) {
      return `${(kbps / 1000).toFixed(1)} Mbps`;
    } else {
      return `${kbps} Kbps`;
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

        Text('网络')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .margin({ left: 12 })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24)
          } else if (this.networkDetails) {
            SectionHeader({ title: '网络状态' });
            this.DataDescription('显示当前设备的网络连接状态和网络类型。');

            InfoCard({
              title: '网络类型',
              value: this.networkDetails.type
            })

            InfoCard({
              title: '连接状态',
              value: this.networkDetails.isConnected ? '已连接' : '未连接'
            })

            InfoCard({
              title: '计费网络',
              value: this.networkDetails.isMetered ? '是' : '否'
            })

            SectionHeader({ title: '带宽信息' });
            this.DataDescription('显示当前网络连接的理论上行和下行带宽。实际网速可能因网络环境、信号强度等因素而有所不同。');

            InfoCard({
              title: '上行带宽',
              value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
            })

            InfoCard({
              title: '下行带宽',
              value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
            })

            SectionHeader({ title: '说明' });
            this.DataDescription('网络信息通过 @ohos.net.connection API 获取。移动数据网络通常按流量计费，Wi-Fi 网络通常不计费。带宽信息由系统根据网络类型估算，不代表实际测速结果。');
          } else {
            Column() {
              Text('无法获取网络信息')
                .fontSize(18)
                .fontColor($r('app.color.text_secondary'))
                .margin(24)
            }
            .width('100%')
            .padding(24)
            .borderRadius(12)
            .backgroundColor($r('app.color.background_card'))
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
    .backgroundColor($r('app.color.background_dark'))
  }
}
