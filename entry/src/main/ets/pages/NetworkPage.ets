import router from '@ohos.router';
import connection from '@ohos.net.connection';
import wifiManager from '@ohos.wifiManager';
import { InfoCard } from '../components/InfoCard';
import { SectionHeader } from '../components/SectionHeader';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { NavigationBarWithArrow } from '../components/NavigationBar';

const TAG = 'NetworkPage';

interface NetworkDetails {
  type: string;
  isConnected: boolean;
  isMetered: boolean;
  isRoaming: boolean;
  linkUpBandwidth: number;
  linkDownBandwidth: number;
  // 连接属性
  interfaceName: string;
  ipAddress: string;
  gateway: string;
  dnsServers: string[];
  mtu: number;
  macAddress: string;
  subnetMask: string;
  // WiFi 信息
  ssid: string;
  signalStrength: number;
  frequency: number;
  linkSpeed: number;
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
      hilog.info(0x0000, TAG, 'NetHandle: netId=%{public}d', netHandle?.netId || 0);

      if (netHandle && netHandle.netId !== 0) {
        const netCapabilities = connection.getNetCapabilitiesSync(netHandle);
        const connectionProperties = connection.getConnectionPropertiesSync(netHandle);

        hilog.info(0x0000, TAG, 'NetCapabilities: %{public}s', JSON.stringify(netCapabilities));
        hilog.info(0x0000, TAG, 'ConnectionProperties: %{public}s', JSON.stringify(connectionProperties));

        const bearerType = netCapabilities.bearerTypes?.[0] || connection.NetBearType.BEARER_CELLULAR;
        const networkCap = netCapabilities.networkCap || [];
        let linkUpBandwidth = netCapabilities.linkUpBandwidthKbps || 0;
        let linkDownBandwidth = netCapabilities.linkDownBandwidthKbps || 0;

        hilog.info(0x0000, TAG, 'Bandwidth: up=%{public}d, down=%{public}d', linkUpBandwidth, linkDownBandwidth);

        // 解析连接属性
        const connProps = JSON.parse(JSON.stringify(connectionProperties)) as Record<string, string | number | object | object[]>;

        // 安全地获取属性值
        const getStringProp = (key: string): string => {
          const val = connProps[key];
          return typeof val === 'string' ? val : '未知';
        };

        const getNumberProp = (key: string): number => {
          const val = connProps[key];
          return typeof val === 'number' ? val : 0;
        };

        const getObjectArrayProp = (key: string): object[] => {
          const val = connProps[key];
          return Array.isArray(val) ? val : [];
        };

        // 解析 IP 地址
        const linkAddresses = getObjectArrayProp('linkAddresses');
        let ipAddress = '未获取';
        let subnetMask = '未获取';
        if (linkAddresses.length > 0) {
          const firstAddr = linkAddresses[0] as Record<string, object | number>;
          // address 是对象，包含 address 字段
          const addrObj = firstAddr.address as Record<string, string | number> | undefined;
          if (addrObj && typeof addrObj.address === 'string') {
            ipAddress = addrObj.address;
          }
          subnetMask = typeof firstAddr.prefixLength === 'number' ? `/${firstAddr.prefixLength}` : '未获取';
        }

        // 解析网关 - 从 routes 中获取默认网关
        const routes = getObjectArrayProp('routes');
        let gatewayAddress = '未知';
        if (routes.length > 0) {
          const firstRoute = routes[0] as Record<string, object>;
          const gatewayObj = firstRoute.gateway as Record<string, string> | undefined;
          if (gatewayObj && typeof gatewayObj.address === 'string') {
            gatewayAddress = gatewayObj.address;
          }
        }

        // 解析 DNS - 使用 dnses 字段
        const dnses = getObjectArrayProp('dnses');
        const dnsList: string[] = [];
        for (const dns of dnses) {
          const dnsRecord = dns as Record<string, string | number>;
          if (typeof dnsRecord.address === 'string') {
            dnsList.push(dnsRecord.address);
          }
        }

        // 获取 WiFi 信息
        let wifiSsid = '';
        let wifiSignalStrength = 0;
        let wifiFrequency = 0;
        let wifiLinkSpeed = 0;
        
        if (bearerType === connection.NetBearType.BEARER_WIFI) {
          try {
            const wifiInfo = wifiManager.getLinkedInfoSync();
            hilog.info(0x0000, TAG, 'WiFi Info: %{public}s', JSON.stringify(wifiInfo));
            wifiSsid = wifiInfo.ssid || '';
            wifiSignalStrength = wifiInfo.rssi || 0;
            wifiFrequency = wifiInfo.frequency || 0;
            wifiLinkSpeed = wifiInfo.linkSpeed || 0;
            
            // 如果系统 API 返回的带宽为 0，使用 WiFi linkSpeed 作为替代
            if (linkUpBandwidth === 0 && wifiLinkSpeed > 0) {
              linkUpBandwidth = wifiLinkSpeed * 1000; // 转换为 Kbps
            }
            if (linkDownBandwidth === 0 && wifiLinkSpeed > 0) {
              linkDownBandwidth = wifiLinkSpeed * 1000; // 转换为 Kbps
            }
          } catch (wifiError) {
            hilog.warn(0x0000, TAG, 'Failed to get WiFi info: %{public}s', String(wifiError));
          }
        }

        this.networkDetails = {
          type: this.getNetworkTypeName(bearerType),
          isConnected: true,
          isMetered: networkCap.includes(connection.NetCap.NET_CAPABILITY_NOT_METERED) ? false : true,
          isRoaming: false,
          linkUpBandwidth: linkUpBandwidth,
          linkDownBandwidth: linkDownBandwidth,
          // 连接属性
          interfaceName: getStringProp('interfaceName'),
          ipAddress: ipAddress,
          gateway: gatewayAddress,
          dnsServers: dnsList,
          mtu: getNumberProp('mtu'),
          macAddress: getStringProp('macAddress'),
          subnetMask: subnetMask,
          // WiFi 信息
          ssid: wifiSsid,
          signalStrength: wifiSignalStrength,
          frequency: wifiFrequency,
          linkSpeed: wifiLinkSpeed
        };
      } else {
        this.networkDetails = {
          type: '无网络',
          isConnected: false,
          isMetered: false,
          isRoaming: false,
          linkUpBandwidth: 0,
          linkDownBandwidth: 0,
          interfaceName: '无',
          ipAddress: '无',
          gateway: '无',
          dnsServers: [],
          mtu: 0,
          macAddress: '无',
          subnetMask: '无',
          ssid: '',
          signalStrength: 0,
          frequency: 0,
          linkSpeed: 0
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
        linkDownBandwidth: 0,
        interfaceName: '未知',
        ipAddress: '未知',
        gateway: '未知',
        dnsServers: [],
        mtu: 0,
        macAddress: '未知',
        subnetMask: '未知',
        ssid: '',
        signalStrength: 0,
        frequency: 0,
        linkSpeed: 0
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
    if (kbps <= 0) return '未提供';
    if (kbps >= 1000000) {
      return `${(kbps / 1000000).toFixed(1)} Gbps`;
    } else if (kbps >= 1000) {
      return `${(kbps / 1000).toFixed(1)} Mbps`;
    } else {
      return `${kbps} Kbps`;
    }
  }

  formatMtu(mtu: number): string {
    if (mtu <= 0) return '未获取';
    return `${mtu} bytes`;
  }

  formatFrequency(freq: number): string {
    if (freq <= 0) return '未获取';
    if (freq >= 1000) {
      return `${(freq / 1000).toFixed(1)} GHz`;
    }
    return `${freq} MHz`;
  }

  formatLinkSpeed(speed: number): string {
    if (speed <= 0) return '未获取';
    return `${speed} Mbps`;
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
      NavigationBarWithArrow({
        title: '网络',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          if (this.isLoading) {
            Text('加载中...')
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin(24)
          } else if (this.networkDetails) {
            // 网络状态
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

            // IP 配置
            SectionHeader({ title: 'IP 配置' });
            this.DataDescription('显示当前网络的 IP 地址、子网掩码、网关等配置信息。');

            InfoCard({
              title: 'IP 地址',
              value: this.networkDetails.ipAddress
            })

            InfoCard({
              title: '子网前缀',
              value: this.networkDetails.subnetMask
            })

            InfoCard({
              title: '默认网关',
              value: this.networkDetails.gateway
            })

            // DNS 服务器
            SectionHeader({ title: 'DNS 服务器' });
            this.DataDescription('显示当前网络配置的 DNS 服务器地址，用于域名解析。');

            if (this.networkDetails.dnsServers.length > 0) {
              ForEach(this.networkDetails.dnsServers, (dns: string, index: number) => {
                InfoCard({
                  title: `DNS ${index + 1}`,
                  value: dns
                })
              }, (dns: string, index: number) => index.toString())
            } else {
              InfoCard({
                title: 'DNS 服务器',
                value: '未获取'
              })
            }

            // 网卡信息
            SectionHeader({ title: '网卡信息' });
            this.DataDescription('显示网卡名称、MAC 地址、MTU 等硬件信息。');

            InfoCard({
              title: '网卡名称',
              value: this.networkDetails.interfaceName
            })

            InfoCard({
              title: 'MAC 地址',
              value: this.networkDetails.macAddress
            })

            InfoCard({
              title: 'MTU',
              value: this.formatMtu(this.networkDetails.mtu)
            })

            // WiFi 详细信息（仅 WiFi 网络显示）
            if (this.networkDetails.type === 'Wi-Fi' && this.networkDetails.ssid) {
              SectionHeader({ title: 'Wi-Fi 信息' });
              this.DataDescription('显示 Wi-Fi 网络的详细信息。');

              InfoCard({
                title: 'SSID',
                value: this.networkDetails.ssid
              })

              if (this.networkDetails.signalStrength > 0) {
                InfoCard({
                  title: '信号强度',
                  value: `${this.networkDetails.signalStrength} dBm`
                })
              }

              if (this.networkDetails.frequency > 0) {
                InfoCard({
                  title: '频段',
                  value: this.formatFrequency(this.networkDetails.frequency)
                })
              }

              if (this.networkDetails.linkSpeed > 0) {
                InfoCard({
                  title: '连接速度',
                  value: this.formatLinkSpeed(this.networkDetails.linkSpeed)
                })
              }
            }

            // 带宽信息
            SectionHeader({ title: '带宽信息' });
            this.DataDescription('显示当前网络连接的理论上行和下行带宽。某些网络类型（如模拟器环境）可能不提供带宽信息。实际网速可能因网络环境、信号强度等因素而有所不同。');

            InfoCard({
              title: '上行带宽',
              value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
            })

            InfoCard({
              title: '下行带宽',
              value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
            })

            // 说明
            SectionHeader({ title: '说明' });
            this.DataDescription('网络信息通过 @ohos.net.connection API 获取。IP 配置、DNS、网关等信息用于网络诊断和故障排查。MAC 地址是网卡的物理地址，MTU 是最大传输单元。');
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
