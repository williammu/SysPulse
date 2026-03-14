import router from '@ohos.router';
import batteryInfo from '@ohos.batteryInfo';
import { InfoCard } from '../components/InfoCard';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import { NavigationBarWithArrow } from '../components/NavigationBar';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'BatteryPage';

interface BatteryInfoModel {
  batterySOC: number;
  chargingStatus: number;
  healthStatus: number;
  pluggedType: number;
  voltage: number;
  technology: string;
  batteryTemperature: number;
}

@Entry
@Component
struct BatteryPage {
  @State batteryInfo: BatteryInfoModel | null = null;
  private refreshTimer: number | null = null;

  aboutToAppear() {
    this.loadBatteryInfo();
    // 每秒刷新一次电池信息
    this.refreshTimer = setInterval(() => {
      this.loadBatteryInfo();
    }, 1000);
  }

  aboutToDisappear() {
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  loadBatteryInfo() {
    try {
      this.batteryInfo = {
        batterySOC: batteryInfo.batterySOC,
        chargingStatus: batteryInfo.chargingStatus,
        healthStatus: batteryInfo.healthStatus,
        pluggedType: batteryInfo.pluggedType,
        voltage: batteryInfo.voltage,
        technology: batteryInfo.technology,
        batteryTemperature: batteryInfo.batteryTemperature
      };
    } catch (error) {
      hilog.error(0x0000, TAG, 'Failed to load battery info: %{public}s', String(error));
    }
  }

  // 获取健康状态文本
  getHealthStatusText(status: number | undefined): string {
    if (status === undefined) return '--';
    switch (status) {
      case 0: return '未知';
      case 1: return '良好';
      case 2: return '过热';
      case 3: return '过冷';
      case 4: return '损坏';
      case 5: return '需要更换';
      default: return `未知(${status})`;
    }
  }

  // 获取充电器类型文本
  // BatteryPluggedType 枚举:
  // 0: NONE - 未连接充电器
  // 1: AC - 交流充电器（普通充电器）
  // 2: USB - USB 充电（连接电脑）
  // 3: WIRELESS - 无线充电
  getPluggedTypeText(type: number | undefined): string {
    if (type === undefined) return '--';
    switch (type) {
      case 0: return '未连接充电器';
      case 1: return '交流充电器';
      case 2: return 'USB（电脑）';
      case 3: return '无线充电';
      default: return `未知(${type})`;
    }
  }

  // 获取充电状态文本
  getChargingStatusText(status: number | undefined): string {
    if (status === undefined) return '未知';
    switch (status) {
      case 0: return '未充电';
      case 1: return '充电中';
      case 2: return '已充满';
      case 3: return '未充电';
      default: return '未知';
    }
  }

  // 判断是否快充（通过电压判断，快充通常电压较高）
  isFastCharge(): boolean {
    if (!this.batteryInfo) return false;
    // 快充通常电压 > 4.2V (4200000 μV)
    // 超级快充通常电压 > 4.5V (4500000 μV)
    return this.batteryInfo.voltage > 4200000;
  }

  // 判断是否超级快充
  isSuperFastCharge(): boolean {
    if (!this.batteryInfo) return false;
    return this.batteryInfo.voltage > 4500000;
  }

  // 获取充电类型描述
  getChargeTypeDescription(): string {
    if (!this.batteryInfo) return '';
    if (this.batteryInfo.pluggedType === 0) return '';
    
    if (this.isSuperFastCharge()) {
      return '（超级快充）';
    } else if (this.isFastCharge()) {
      return '（快充）';
    }
    return '';
  }

  build() {
    Column() {
      NavigationBarWithArrow({
        title: '电池',
        onBack: () => {
          router.back();
        }
      })

      Scroll() {
        Column() {
          SectionHeader({ title: '电池状态' })

          Column() {
            Text(this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--')
              .fontSize(48)
              .fontWeight(FontWeight.Bold)
              .fontColor($r('app.color.primary_color'))

            ProgressBar({
              progress: this.batteryInfo?.batterySOC || 0,
              total: 100,
              barHeight: 12,
              color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
            })
            .margin({ top: 16 })

            Text(this.getChargingStatusText(this.batteryInfo?.chargingStatus))
              .fontSize(16)
              .fontColor($r('app.color.text_secondary'))
              .margin({ top: 12 })
          }
          .width('100%')
          .padding(24)
          .borderRadius(12)
          .backgroundColor($r('app.color.background_card'))
          .alignItems(HorizontalAlign.Center)

          SectionHeader({ title: '电池信息' })

          InfoCard({
            title: '电量',
            value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
          })

          InfoCard({
            title: '温度',
            value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
          })

          InfoCard({
            title: '电压',
            value: this.batteryInfo?.voltage ? `${(this.batteryInfo.voltage / 1000000).toFixed(2)}V` : '--'
          })

          InfoCard({
            title: '电池技术',
            value: this.batteryInfo?.technology || '--'
          })

          InfoCard({
            title: '健康状态',
            value: this.getHealthStatusText(this.batteryInfo?.healthStatus)
          })

          InfoCard({
            title: '充电器类型',
            value: this.getPluggedTypeText(this.batteryInfo?.pluggedType) + this.getChargeTypeDescription()
          })
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
