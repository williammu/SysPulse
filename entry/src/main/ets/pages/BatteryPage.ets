import router from '@ohos.router';
import batteryInfo from '@ohos.batteryInfo';
import { InfoCard } from '../components/InfoCard';
import { InfoCardWithDesc } from '../components/InfoButton';
import { ProgressBar } from '../components/ProgressBar';
import { InfoHeader } from '../components/InfoButton';
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
  nowCurrent: number;
}

interface ChargingInfo {
  power: number;
  voltage: number;
  current: number;
  type: string;
  chargerSpec: string;
  isFastCharge: boolean;
  isSuperFastCharge: boolean;
  powerLevel: number;
}

@Entry
@Component
struct BatteryPage {
  @State batteryInfo: BatteryInfoModel | null = null;
  private refreshTimer: number | null = null;

  aboutToAppear() {
    this.loadBatteryInfo();
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
        batteryTemperature: batteryInfo.batteryTemperature,
        nowCurrent: batteryInfo.nowCurrent
      };
    } catch (error) {
      hilog.error(0x0000, TAG, 'Failed to load battery info: %{public}s', String(error));
    }
  }

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

  // 跳转到概念详情页
  private navigateToConcept(conceptId: string): void {
    router.pushUrl({
      url: 'pages/ConceptDetailPage',
      params: { conceptId: conceptId }
    });
  }

  getChargingInfo(): ChargingInfo {
    if (!this.batteryInfo) {
      return {
        power: 0,
        voltage: 0,
        current: 0,
        type: '未充电',
        chargerSpec: '',
        isFastCharge: false,
        isSuperFastCharge: false,
        powerLevel: 0
      };
    }

    const voltageV = this.batteryInfo.voltage / 1000000;
    const currentA = (this.batteryInfo.nowCurrent || 0) / 1000;
    const powerW = voltageV * currentA;

    let type = '未充电';
    let chargerSpec = '';
    let powerLevel = 0;
    const isSuperFast = powerW >= 30;
    const isFast = powerW >= 15;

    if (this.batteryInfo.chargingStatus === 1) {
      if (powerW >= 66) {
        type = '超级快充Turbo';
        chargerSpec = '20V/5A (100W)';
        powerLevel = 4;
      } else if (powerW >= 40) {
        type = '超级快充';
        chargerSpec = '10V/4A (40W) 或 11V/6A (66W)';
        powerLevel = 3;
      } else if (powerW >= 30) {
        type = '超级快充';
        chargerSpec = '10V/3A (30W)';
        powerLevel = 3;
      } else if (powerW >= 22) {
        type = '快充';
        chargerSpec = '5V/4.5A (22.5W)';
        powerLevel = 2;
      } else if (powerW >= 15) {
        type = '快充';
        chargerSpec = '9V/2A (18W)';
        powerLevel = 2;
      } else {
        type = '普通充电';
        chargerSpec = '5V/2A (10W)';
        powerLevel = 1;
      }
    }

    return {
      power: Math.round(powerW * 10) / 10,
      voltage: Math.round(voltageV * 100) / 100,
      current: Math.round(currentA * 100) / 100,
      type,
      chargerSpec,
      isFastCharge: isFast,
      isSuperFastCharge: isSuperFast,
      powerLevel
    };
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
          InfoHeader({
            title: '电池状态',
            subtitle: 'BATTERY STATUS',
            conceptId: 'battery_status',
            onInfoClick: () => this.navigateToConcept('battery_status')
          })

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

          InfoHeader({
            title: '充电信息',
            subtitle: 'CHARGING INFO',
            conceptId: 'charging_info',
            onInfoClick: () => this.navigateToConcept('charging_info')
          })

          InfoCardWithDesc({
            title: '充电类型',
            value: this.getChargingInfo().type,
            conceptId: 'charging_info',
            onInfoClick: () => this.navigateToConcept('charging_info')
          })

          InfoCardWithDesc({
            title: '实时功率',
            value: this.getChargingInfo().power > 0 ? `${this.getChargingInfo().power}W` : '--',
            conceptId: 'charging_power',
            onInfoClick: () => this.navigateToConcept('charging_power')
          })

          InfoCardWithDesc({
            title: '充电电流',
            value: this.batteryInfo?.nowCurrent ? `${this.batteryInfo.nowCurrent}mA` : '--',
            conceptId: 'charging_current',
            onInfoClick: () => this.navigateToConcept('charging_current')
          })

          InfoCardWithDesc({
            title: '充电器类型',
            value: this.getPluggedTypeText(this.batteryInfo?.pluggedType),
            conceptId: 'charger_type',
            onInfoClick: () => this.navigateToConcept('charger_type')
          })

          InfoHeader({
            title: '电池信息',
            subtitle: 'BATTERY INFO',
            conceptId: 'battery_info',
            onInfoClick: () => this.navigateToConcept('battery_info')
          })

          InfoCardWithDesc({
            title: '电量',
            value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--',
            conceptId: 'battery_soc',
            onInfoClick: () => this.navigateToConcept('battery_soc')
          })

          InfoCardWithDesc({
            title: '温度',
            value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--',
            conceptId: 'battery_temperature',
            onInfoClick: () => this.navigateToConcept('battery_temperature')
          })

          InfoCardWithDesc({
            title: '电压',
            value: this.batteryInfo?.voltage ? `${(this.batteryInfo.voltage / 1000000).toFixed(2)}V` : '--',
            conceptId: 'battery_voltage',
            onInfoClick: () => this.navigateToConcept('battery_voltage')
          })

          InfoCardWithDesc({
            title: '电池技术',
            value: this.batteryInfo?.technology || '--',
            conceptId: 'battery_technology',
            onInfoClick: () => this.navigateToConcept('battery_technology')
          })

          InfoCardWithDesc({
            title: '健康状态',
            value: this.getHealthStatusText(this.batteryInfo?.healthStatus),
            conceptId: 'battery_health',
            onInfoClick: () => this.navigateToConcept('battery_health')
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
