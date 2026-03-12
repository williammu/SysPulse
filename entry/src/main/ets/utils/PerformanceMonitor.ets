import hilog from '@ohos.hilog';
import deviceInfo from '@ohos.deviceInfo';
import batteryInfo from '@ohos.batteryInfo';
import display from '@ohos.display';
import statvfs from '@ohos.file.statvfs';
import connection from '@ohos.net.connection';

interface PerformanceMetrics {
  timestamp: number;
  deviceType: string;
  brand: string;
  marketName: string;
  osFullName: string;
  sdkApiVersion: number;
  batterySOC: number;
  chargingStatus: number;
  batteryTemperature: number;
  screenWidth: number;
  screenHeight: number;
  densityDPI: number;
  refreshRate: number;
  totalStorage: number;
  freeStorage: number;
  networkType: string;
}

interface TestCaseExpectation {
  field: string;
  expected: string;
  actual: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
}

interface DeviceMetrics {
  deviceType: string;
  brand: string;
  marketName: string;
  osFullName: string;
  sdkApiVersion: number;
}

interface BatteryMetrics {
  batterySOC: number;
  chargingStatus: number;
  batteryTemperature: number;
}

interface DisplayMetrics {
  screenWidth: number;
  screenHeight: number;
  densityDPI: number;
  refreshRate: number;
}

interface StorageMetrics {
  totalStorage: number;
  freeStorage: number;
}

interface ApiVersionRange {
  min: number;
  max: number;
}

interface SocRange {
  min: number;
  max: number;
}

interface TemperatureRange {
  min: number;
  max: number;
}

interface MinResolution {
  width: number;
  height: number;
}

interface DensityRange {
  min: number;
  max: number;
}

interface DeviceInfoTestCase {
  apiVersionRange: ApiVersionRange;
  osVersionPattern: RegExp;
}

interface BatteryInfoTestCase {
  socRange: SocRange;
  chargingStatusValues: number[];
  temperatureRange: TemperatureRange;
}

interface DisplayInfoTestCase {
  minResolution: MinResolution;
  densityRange: DensityRange;
  refreshRateValues: number[];
}

interface StorageInfoTestCase {
  minTotalSize: number;
}

interface TestCases {
  deviceInfo: DeviceInfoTestCase;
  batteryInfo: BatteryInfoTestCase;
  displayInfo: DisplayInfoTestCase;
  storageInfo: StorageInfoTestCase;
}

const TAG = 'PerformanceMonitor';
const DOMAIN = 0x0000;

// 测试用例期望值（基于 HarmonyOS NEXT API 文档）
const TEST_CASES: TestCases = {
  deviceInfo: {
    apiVersionRange: { min: 12, max: 30 },
    osVersionPattern: /^HarmonyOS|^OpenHarmony/
  },
  batteryInfo: {
    socRange: { min: 0, max: 100 },
    chargingStatusValues: [0, 1, 2, 3, 4, 5],
    temperatureRange: { min: -500, max: 800 }
  },
  displayInfo: {
    minResolution: { width: 320, height: 240 },
    densityRange: { min: 80, max: 640 },
    refreshRateValues: [30, 60, 90, 120, 144]
  },
  storageInfo: {
    minTotalSize: 1024 * 1024 * 1024
  }
};

export class PerformanceMonitor {
  static async collectMetrics(): Promise<PerformanceMetrics | null> {
    try {
      const timestamp = Date.now();

      const deviceMetrics: DeviceMetrics = {
        deviceType: deviceInfo.deviceType || 'unknown',
        brand: deviceInfo.brand || 'unknown',
        marketName: deviceInfo.marketName || 'unknown',
        osFullName: deviceInfo.osFullName || 'unknown',
        sdkApiVersion: deviceInfo.sdkApiVersion || 0
      };

      const batteryMetrics: BatteryMetrics = {
        batterySOC: batteryInfo.batterySOC ?? -1,
        chargingStatus: batteryInfo.chargingStatus ?? -1,
        batteryTemperature: batteryInfo.batteryTemperature ?? -1
      };

      let displayMetrics: DisplayMetrics = {
        screenWidth: 0,
        screenHeight: 0,
        densityDPI: 0,
        refreshRate: 0
      };

      try {
        const displayInfo = await display.getDefaultDisplay();
        displayMetrics = {
          screenWidth: displayInfo.width,
          screenHeight: displayInfo.height,
          densityDPI: displayInfo.densityDPI,
          refreshRate: displayInfo.refreshRate
        };
      } catch (e) {
        hilog.warn(DOMAIN, TAG, 'Failed to get display info: %{public}s', JSON.stringify(e));
      }

      let storageMetrics: StorageMetrics = {
        totalStorage: 0,
        freeStorage: 0
      };

      try {
        const context: Context = getContext();
        const dataPath = context.filesDir;
        const totalSize = statvfs.getTotalSizeSync(dataPath);
        const freeSize = statvfs.getFreeSizeSync(dataPath);
        storageMetrics = {
          totalStorage: totalSize,
          freeStorage: freeSize
        };
        
        // 如果获取到的存储为0，可能是权限问题，标记为警告
        if (totalSize === 0 || freeSize === 0) {
          hilog.warn(DOMAIN, TAG, 'Storage info returned 0, may need permission or API not supported on this device');
        }
      } catch (e) {
        hilog.warn(DOMAIN, TAG, 'Failed to get storage info: %{public}s', JSON.stringify(e));
      }

      let networkType = 'unknown';
      try {
        const netHandle = await connection.getDefaultNet();
        const netCapabilities = await connection.getNetCapabilities(netHandle);
        networkType = netCapabilities.bearerTypes?.join(',') || 'unknown';
      } catch (e) {
        hilog.warn(DOMAIN, TAG, 'Failed to get network info: %{public}s', JSON.stringify(e));
      }

      const metrics: PerformanceMetrics = {
        timestamp,
        deviceType: deviceMetrics.deviceType,
        brand: deviceMetrics.brand,
        marketName: deviceMetrics.marketName,
        osFullName: deviceMetrics.osFullName,
        sdkApiVersion: deviceMetrics.sdkApiVersion,
        batterySOC: batteryMetrics.batterySOC,
        chargingStatus: batteryMetrics.chargingStatus,
        batteryTemperature: batteryMetrics.batteryTemperature,
        screenWidth: displayMetrics.screenWidth,
        screenHeight: displayMetrics.screenHeight,
        densityDPI: displayMetrics.densityDPI,
        refreshRate: displayMetrics.refreshRate,
        totalStorage: storageMetrics.totalStorage,
        freeStorage: storageMetrics.freeStorage,
        networkType: networkType
      };

      return metrics;
    } catch (error) {
      hilog.error(DOMAIN, TAG, 'Failed to collect metrics: %{public}s', JSON.stringify(error));
      return null;
    }
  }

  static validateMetrics(metrics: PerformanceMetrics): TestCaseExpectation[] {
    const results: TestCaseExpectation[] = [];

    results.push({
      field: 'deviceType',
      expected: '非空字符串',
      actual: metrics.deviceType,
      status: metrics.deviceType && metrics.deviceType !== 'unknown' ? 'PASS' : 'FAIL'
    });

    results.push({
      field: 'brand',
      expected: '非空字符串',
      actual: metrics.brand,
      status: metrics.brand && metrics.brand !== 'unknown' ? 'PASS' : 'FAIL'
    });

    results.push({
      field: 'marketName',
      expected: '非空字符串',
      actual: metrics.marketName,
      status: metrics.marketName && metrics.marketName !== 'unknown' ? 'PASS' : 'FAIL'
    });

    results.push({
      field: 'osFullName',
      expected: '符合 HarmonyOS/OpenHarmony 格式',
      actual: metrics.osFullName,
      status: TEST_CASES.deviceInfo.osVersionPattern.test(metrics.osFullName) ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'sdkApiVersion',
      expected: '范围 12-14',
      actual: metrics.sdkApiVersion.toString(),
      status: metrics.sdkApiVersion >= TEST_CASES.deviceInfo.apiVersionRange.min &&
              metrics.sdkApiVersion <= TEST_CASES.deviceInfo.apiVersionRange.max ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'batterySOC',
      expected: '范围 0-100%',
      actual: metrics.batterySOC + '%',
      status: metrics.batterySOC >= TEST_CASES.batteryInfo.socRange.min &&
              metrics.batterySOC <= TEST_CASES.batteryInfo.socRange.max ? 'PASS' : 'FAIL'
    });

    results.push({
      field: 'chargingStatus',
      expected: '有效值之一: 0,1,2,3,4,5',
      actual: metrics.chargingStatus.toString(),
      status: TEST_CASES.batteryInfo.chargingStatusValues.includes(metrics.chargingStatus) ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'batteryTemperature',
      expected: '范围 -500-800 (0.1°C)',
      actual: metrics.batteryTemperature + ' (' + (metrics.batteryTemperature / 10).toFixed(1) + '°C)',
      status: metrics.batteryTemperature >= TEST_CASES.batteryInfo.temperatureRange.min &&
              metrics.batteryTemperature <= TEST_CASES.batteryInfo.temperatureRange.max ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'screenResolution',
      expected: '最小 320x240',
      actual: metrics.screenWidth + 'x' + metrics.screenHeight,
      status: metrics.screenWidth >= TEST_CASES.displayInfo.minResolution.width &&
              metrics.screenHeight >= TEST_CASES.displayInfo.minResolution.height ? 'PASS' : 'FAIL'
    });

    results.push({
      field: 'densityDPI',
      expected: '范围 80-640',
      actual: metrics.densityDPI.toString(),
      status: metrics.densityDPI >= TEST_CASES.displayInfo.densityRange.min &&
              metrics.densityDPI <= TEST_CASES.displayInfo.densityRange.max ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'refreshRate',
      expected: '常见值之一: 30,60,90,120,144Hz',
      actual: metrics.refreshRate + 'Hz',
      status: TEST_CASES.displayInfo.refreshRateValues.includes(metrics.refreshRate) ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'totalStorage',
      expected: '最小 1GB (部分设备可能无法获取)',
      actual: metrics.totalStorage > 0 ? (metrics.totalStorage / 1024 / 1024 / 1024).toFixed(2) + 'GB' : '无法获取',
      status: metrics.totalStorage >= TEST_CASES.storageInfo.minTotalSize ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'freeStorage',
      expected: '大于 0 (部分设备可能无法获取)',
      actual: metrics.freeStorage > 0 ? (metrics.freeStorage / 1024 / 1024 / 1024).toFixed(2) + 'GB' : '无法获取',
      status: metrics.freeStorage > 0 ? 'PASS' : 'WARNING'
    });

    results.push({
      field: 'networkType',
      expected: '非空字符串',
      actual: metrics.networkType,
      status: metrics.networkType && metrics.networkType !== 'unknown' ? 'PASS' : 'WARNING'
    });

    return results;
  }

  static async runPerformanceCheck(): Promise<void> {
    hilog.info(DOMAIN, TAG, '========== 性能监控和测试开始 ==========');

    const startTime = Date.now();

    const metrics = await PerformanceMonitor.collectMetrics();

    if (!metrics) {
      hilog.error(DOMAIN, TAG, '性能指标收集失败');
      return;
    }

    const collectTime = Date.now() - startTime;
    hilog.info(DOMAIN, TAG, '指标收集耗时: %{public}d ms', collectTime);

    hilog.info(DOMAIN, TAG, '【收集到的性能指标】');
    hilog.info(DOMAIN, TAG, '设备类型: %{public}s', metrics.deviceType);
    hilog.info(DOMAIN, TAG, '设备品牌: %{public}s', metrics.brand);
    hilog.info(DOMAIN, TAG, '设备型号: %{public}s', metrics.marketName);
    hilog.info(DOMAIN, TAG, '系统版本: %{public}s', metrics.osFullName);
    hilog.info(DOMAIN, TAG, 'API 版本: %{public}d', metrics.sdkApiVersion);
    hilog.info(DOMAIN, TAG, '电池电量: %{public}d%%', metrics.batterySOC);
    hilog.info(DOMAIN, TAG, '充电状态: %{public}d', metrics.chargingStatus);
    hilog.info(DOMAIN, TAG, '电池温度: %{public}s°C', (metrics.batteryTemperature / 10).toFixed(1));
    hilog.info(DOMAIN, TAG, '屏幕分辨率: %{public}d x %{public}d', metrics.screenWidth, metrics.screenHeight);
    hilog.info(DOMAIN, TAG, '像素密度: %{public}d DPI', metrics.densityDPI);
    hilog.info(DOMAIN, TAG, '刷新率: %{public}d Hz', metrics.refreshRate);
    hilog.info(DOMAIN, TAG, '总存储: %{public}s GB', (metrics.totalStorage / 1024 / 1024 / 1024).toFixed(2));
    hilog.info(DOMAIN, TAG, '可用存储: %{public}s GB', (metrics.freeStorage / 1024 / 1024 / 1024).toFixed(2));
    hilog.info(DOMAIN, TAG, '网络类型: %{public}s', metrics.networkType);

    hilog.info(DOMAIN, TAG, '【测试用例验证结果】');
    const validationResults = PerformanceMonitor.validateMetrics(metrics);

    let passCount = 0;
    let failCount = 0;
    let warningCount = 0;

    for (const result of validationResults) {
      const statusIcon = result.status === 'PASS' ? 'PASS' : result.status === 'FAIL' ? 'FAIL' : 'WARN';
      hilog.info(DOMAIN, TAG, '[%{public}s] %{public}s: %{public}s (期望值: %{public}s, 实际值: %{public}s)',
        statusIcon, result.field, result.status, result.expected, result.actual);

      if (result.status === 'PASS') passCount++;
      else if (result.status === 'FAIL') failCount++;
      else warningCount++;
    }

    hilog.info(DOMAIN, TAG, '【测试结果汇总】');
    hilog.info(DOMAIN, TAG, '通过: %{public}d', passCount);
    hilog.info(DOMAIN, TAG, '失败: %{public}d', failCount);
    hilog.info(DOMAIN, TAG, '警告: %{public}d', warningCount);
    hilog.info(DOMAIN, TAG, '总计: %{public}d', validationResults.length);

    const totalTime = Date.now() - startTime;
    hilog.info(DOMAIN, TAG, '总耗时: %{public}d ms', totalTime);
    hilog.info(DOMAIN, TAG, '========== 性能监控和测试完成 ==========');

    if (failCount > 0) {
      hilog.error(DOMAIN, TAG, '警告: 有 %{public}d 项测试失败，请检查系统信息获取是否正常', failCount);
    }
  }
}
