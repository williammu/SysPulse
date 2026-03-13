import deviceInfo from '@ohos.deviceInfo';
import batteryInfo from '@ohos.batteryInfo';
import display from '@ohos.display';
import statvfs from '@ohos.file.statvfs';
import connection from '@ohos.net.connection';
import type {
  DeviceInfoModel,
  BatteryInfoModel,
  DisplayInfoModel,
  StorageInfoModel,
  NetworkInfoModel,
  MemoryInfoModel,
  CpuInfoModel
} from '../model/DeviceInfo';

export class SystemInfoCore {
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
      softwareVersion: deviceInfo.displayVersion || '未知',
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
      const displays = await display.getDefaultDisplay();
      return {
        // 从 @ohos.display 获取的真实数据
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

  static async getNetworkInfo(): Promise<NetworkInfoModel | null> {
    try {
      const netHandle = await connection.getDefaultNet();
      const netCapabilities = await connection.getNetCapabilities(netHandle);
      return {
        // 从 @ohos.net.connection 获取的真实数据
        netType: netCapabilities.bearerTypes?.join(',') || '未知',
        capabilities: netCapabilities.networkCap || [],
        bearerTypes: netCapabilities.bearerTypes || []
      };
    } catch (err) {
      console.error('Get network info error:', err);
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
      cores: 0
    };
  }

  static async runAllTests(): Promise<void> {
    console.log('========== SystemInfoCore Test Start ==========');
    
    console.log('\n[Test 1] Device Info:');
    const deviceInfoResult = SystemInfoCore.getDeviceInfo();
    console.log('  设备类型:', deviceInfoResult.deviceType);
    console.log('  设备品牌:', deviceInfoResult.brand);
    console.log('  设备型号:', deviceInfoResult.marketName);
    console.log('  系统版本:', deviceInfoResult.osFullName);
    console.log('  API 版本:', deviceInfoResult.sdkApiVersion);
    console.log('  CPU 架构:', deviceInfoResult.abiList);

    console.log('\n[Test 2] Battery Info:');
    const batteryInfoResult = SystemInfoCore.getBatteryInfo();
    console.log('  电池电量:', batteryInfoResult.batterySOC + '%');
    console.log('  充电状态:', batteryInfoResult.chargingStatus);
    console.log('  健康状态:', batteryInfoResult.healthStatus);
    console.log('  电池温度:', (batteryInfoResult.batteryTemperature / 10).toFixed(1) + '°C');

    console.log('\n[Test 3] Display Info:');
    const displayInfoResult = await SystemInfoCore.getDisplayInfo();
    if (displayInfoResult) {
      console.log('  屏幕宽度:', displayInfoResult.width + 'px');
      console.log('  屏幕高度:', displayInfoResult.height + 'px');
      console.log('  像素密度:', displayInfoResult.densityDPI + ' DPI');
      console.log('  刷新率:', displayInfoResult.refreshRate + ' Hz');
    }

    console.log('\n[Test 4] Storage Info:');
    const storageInfoResult = SystemInfoCore.getStorageInfo();
    if (storageInfoResult) {
      console.log('  总存储:', (storageInfoResult.totalSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
      console.log('  可用存储:', (storageInfoResult.freeSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
      console.log('  已用存储:', (storageInfoResult.usedSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
    }

    console.log('\n[Test 5] Network Info:');
    const networkInfoResult = await SystemInfoCore.getNetworkInfo();
    if (networkInfoResult) {
      console.log('  网络类型:', networkInfoResult.netType);
    }

    console.log('\n========== SystemInfoCore Test Complete ==========');
  }
}
