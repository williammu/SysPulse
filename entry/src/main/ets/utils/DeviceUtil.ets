import deviceInfo from '@ohos.deviceInfo';
import batteryInfo from '@ohos.batteryInfo';
import display from '@ohos.display';
import statvfs from '@ohos.file.statvfs';
import type { DeviceInfoModel, BatteryInfoModel, DisplayInfoModel, MemoryInfoModel, CpuInfoModel, StorageInfoModel } from '../model/DeviceInfo';

export class DeviceUtil {
  static getDeviceInfo(): DeviceInfoModel {
    return {
      // 从 @ohos.deviceInfo 获取的真实数据
      deviceType: deviceInfo.deviceType || '未知',
      manufacture: deviceInfo.manufacture || '未知',
      brand: deviceInfo.brand || '未知',
      marketName: deviceInfo.marketName || '未知',
      productSeries: deviceInfo.productSeries || '未知',
      productModel: deviceInfo.productModel || '未知',
      softwareModel: deviceInfo.softwareModel || '未知',
      hardwareModel: deviceInfo.hardwareModel || '未知',
      bootloaderVersion: deviceInfo.bootloaderVersion || '未知',
      abiList: deviceInfo.abiList || '未知',
      securityPatchTag: deviceInfo.securityPatchTag || '未知',
      displayVersion: deviceInfo.displayVersion || '未知',
      incrementalVersion: deviceInfo.incrementalVersion || '未知',
      osReleaseType: deviceInfo.osReleaseType || '未知',
      osFullName: deviceInfo.osFullName || '未知',
      majorVersion: deviceInfo.majorVersion || 0,
      seniorVersion: deviceInfo.seniorVersion || 0,
      featureVersion: deviceInfo.featureVersion || 0,
      buildVersion: deviceInfo.buildVersion || 0,
      sdkApiVersion: deviceInfo.sdkApiVersion || 0,
      firstApiVersion: deviceInfo.firstApiVersion || 0,
      versionId: deviceInfo.versionId || '未知',
      buildType: deviceInfo.buildType || '未知',
      buildUser: deviceInfo.buildUser || '未知',
      buildHost: deviceInfo.buildHost || '未知',
      buildTime: deviceInfo.buildTime || '未知',
      buildRootHash: deviceInfo.buildRootHash || '未知',
      
      // 以下字段无法从公开 API 获取，标记为"未获取"
      productModelAlias: '未获取',
      udid: '未获取',
      distributionOSName: '未获取',
      distributionOSVersion: '未获取',
      distributionOSApiVersion: 0,
      distributionOSApiName: '未获取',
      distributionOSReleaseType: '未获取',
      odid: '未获取',
      diskSN: '未获取',
      performanceClass: 0,
      chipType: '未获取',
      bootCount: 0
    };
  }

  static getBatteryInfo(): BatteryInfoModel {
    return {
      // 从 @ohos.batteryInfo 获取的真实数据
      batterySOC: batteryInfo.batterySOC || 0,
      chargingStatus: batteryInfo.chargingStatus || 0,
      healthStatus: batteryInfo.healthStatus || 0,
      pluggedType: batteryInfo.pluggedType || 0,
      voltage: batteryInfo.voltage || 0,
      technology: batteryInfo.technology || '未知',
      batteryTemperature: batteryInfo.batteryTemperature || 0,
      
      // 以下字段无法从公开 API 获取，标记为"未获取"
      isBatteryPresent: false,
      batteryCapacityLevel: 0,
      nowCurrent: 0
    };
  }

  static async getDisplayInfo(): Promise<DisplayInfoModel | null> {
    try {
      const displays = await display.getDefaultDisplaySync();
      return {
        id: displays.id,
        name: displays.name,
        alive: displays.alive,
        state: displays.state,
        refreshRate: displays.refreshRate,
        rotation: displays.rotation,
        width: displays.width,
        height: displays.height,
        densityDPI: displays.densityDPI,
        densityPixels: displays.densityPixels,
        scaledDensity: displays.scaledDensity,
        xDPI: displays.xDPI,
        yDPI: displays.yDPI
      };
    } catch (err) {
      console.error('Get display info error:', err);
      return null;
    }
  }

  static getDisplayInfoSync(): DisplayInfoModel | null {
    try {
      const displays = display.getDefaultDisplaySync();
      return {
        id: displays.id,
        name: displays.name,
        alive: displays.alive,
        state: displays.state,
        refreshRate: displays.refreshRate,
        rotation: displays.rotation,
        width: displays.width,
        height: displays.height,
        densityDPI: displays.densityDPI,
        densityPixels: displays.densityPixels,
        scaledDensity: displays.scaledDensity,
        xDPI: displays.xDPI,
        yDPI: displays.yDPI
      };
    } catch (err) {
      console.error('Get display info sync error:', err);
      return null;
    }
  }

  static getStorageInfo(): StorageInfoModel | null {
    try {
      const context: Context = getContext();
      const dataPath: string = context.filesDir;
      const totalSize: number = statvfs.getTotalSizeSync(dataPath);
      const freeSize: number = statvfs.getFreeSizeSync(dataPath);
      return {
        // 从 @ohos.file.statvfs 获取的真实数据
        totalSize: totalSize,
        freeSize: freeSize,
        usedSize: totalSize - freeSize
      };
    } catch (err) {
      console.error('Get storage info error:', err);
      return null;
    }
  }

  static getMemoryInfo(): MemoryInfoModel | null {
    // 注意：HarmonyOS NEXT 目前没有提供获取内存信息的公开 API
    // 返回 null 表示无法获取
    console.warn('Memory info API not available in HarmonyOS NEXT');
    return null;
  }

  static getCpuInfo(): CpuInfoModel {
    return {
      // 从 deviceInfo.abiList 获取架构信息
      architecture: deviceInfo.abiList || '未知',
      
      // 以下字段无法从公开 API 获取，标记为"未获取"
      model: '未获取',
      cores: 0,
      process: '未获取'
    };
  }
}
