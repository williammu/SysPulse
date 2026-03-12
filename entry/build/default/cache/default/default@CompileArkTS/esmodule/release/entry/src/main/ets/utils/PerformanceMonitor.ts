import hilog from "@ohos:hilog";
import deviceInfo from "@ohos:deviceInfo";
import batteryInfo from "@ohos:batteryInfo";
import display from "@ohos:display";
import statvfs from "@ohos:file.statvfs";
import connection from "@ohos:net.connection";
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
            const i42 = Date.now();
            const j42: DeviceMetrics = {
                deviceType: deviceInfo.deviceType || 'unknown',
                brand: deviceInfo.brand || 'unknown',
                marketName: deviceInfo.marketName || 'unknown',
                osFullName: deviceInfo.osFullName || 'unknown',
                sdkApiVersion: deviceInfo.sdkApiVersion || 0
            };
            const k42: BatteryMetrics = {
                batterySOC: batteryInfo.batterySOC ?? -1,
                chargingStatus: batteryInfo.chargingStatus ?? -1,
                batteryTemperature: batteryInfo.batteryTemperature ?? -1
            };
            let l42: DisplayMetrics = {
                screenWidth: 0,
                screenHeight: 0,
                densityDPI: 0,
                refreshRate: 0
            };
            try {
                const y42 = await display.getDefaultDisplay();
                l42 = {
                    screenWidth: y42.width,
                    screenHeight: y42.height,
                    densityDPI: y42.densityDPI,
                    refreshRate: y42.refreshRate
                };
            }
            catch (x42) {
                hilog.warn(DOMAIN, TAG, 'Failed to get display info: %{public}s', JSON.stringify(x42));
            }
            let m42: StorageMetrics = {
                totalStorage: 0,
                freeStorage: 0
            };
            try {
                const t42: Context = getContext();
                const u42 = t42.filesDir;
                const v42 = statvfs.getTotalSizeSync(u42);
                const w42 = statvfs.getFreeSizeSync(u42);
                m42 = {
                    totalStorage: v42,
                    freeStorage: w42
                };
                if (v42 === 0 || w42 === 0) {
                    hilog.warn(DOMAIN, TAG, 'Storage info returned 0, may need permission or API not supported on this device');
                }
            }
            catch (s42) {
                hilog.warn(DOMAIN, TAG, 'Failed to get storage info: %{public}s', JSON.stringify(s42));
            }
            let n42 = 'unknown';
            try {
                const q42 = await connection.getDefaultNet();
                const r42 = await connection.getNetCapabilities(q42);
                n42 = r42.bearerTypes?.join(',') || 'unknown';
            }
            catch (p42) {
                hilog.warn(DOMAIN, TAG, 'Failed to get network info: %{public}s', JSON.stringify(p42));
            }
            const o42: PerformanceMetrics = {
                timestamp: i42,
                deviceType: j42.deviceType,
                brand: j42.brand,
                marketName: j42.marketName,
                osFullName: j42.osFullName,
                sdkApiVersion: j42.sdkApiVersion,
                batterySOC: k42.batterySOC,
                chargingStatus: k42.chargingStatus,
                batteryTemperature: k42.batteryTemperature,
                screenWidth: l42.screenWidth,
                screenHeight: l42.screenHeight,
                densityDPI: l42.densityDPI,
                refreshRate: l42.refreshRate,
                totalStorage: m42.totalStorage,
                freeStorage: m42.freeStorage,
                networkType: n42
            };
            return o42;
        }
        catch (h42) {
            hilog.error(DOMAIN, TAG, 'Failed to collect metrics: %{public}s', JSON.stringify(h42));
            return null;
        }
    }
    static validateMetrics(f42: PerformanceMetrics): TestCaseExpectation[] {
        const g42: TestCaseExpectation[] = [];
        g42.push({
            field: 'deviceType',
            expected: '非空字符串',
            actual: f42.deviceType,
            status: f42.deviceType && f42.deviceType !== 'unknown' ? 'PASS' : 'FAIL'
        });
        g42.push({
            field: 'brand',
            expected: '非空字符串',
            actual: f42.brand,
            status: f42.brand && f42.brand !== 'unknown' ? 'PASS' : 'FAIL'
        });
        g42.push({
            field: 'marketName',
            expected: '非空字符串',
            actual: f42.marketName,
            status: f42.marketName && f42.marketName !== 'unknown' ? 'PASS' : 'FAIL'
        });
        g42.push({
            field: 'osFullName',
            expected: '符合 HarmonyOS/OpenHarmony 格式',
            actual: f42.osFullName,
            status: TEST_CASES.deviceInfo.osVersionPattern.test(f42.osFullName) ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'sdkApiVersion',
            expected: '范围 12-14',
            actual: f42.sdkApiVersion.toString(),
            status: f42.sdkApiVersion >= TEST_CASES.deviceInfo.apiVersionRange.min &&
                f42.sdkApiVersion <= TEST_CASES.deviceInfo.apiVersionRange.max ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'batterySOC',
            expected: '范围 0-100%',
            actual: f42.batterySOC + '%',
            status: f42.batterySOC >= TEST_CASES.batteryInfo.socRange.min &&
                f42.batterySOC <= TEST_CASES.batteryInfo.socRange.max ? 'PASS' : 'FAIL'
        });
        g42.push({
            field: 'chargingStatus',
            expected: '有效值之一: 0,1,2,3,4,5',
            actual: f42.chargingStatus.toString(),
            status: TEST_CASES.batteryInfo.chargingStatusValues.includes(f42.chargingStatus) ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'batteryTemperature',
            expected: '范围 -500-800 (0.1°C)',
            actual: f42.batteryTemperature + ' (' + (f42.batteryTemperature / 10).toFixed(1) + '°C)',
            status: f42.batteryTemperature >= TEST_CASES.batteryInfo.temperatureRange.min &&
                f42.batteryTemperature <= TEST_CASES.batteryInfo.temperatureRange.max ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'screenResolution',
            expected: '最小 320x240',
            actual: f42.screenWidth + 'x' + f42.screenHeight,
            status: f42.screenWidth >= TEST_CASES.displayInfo.minResolution.width &&
                f42.screenHeight >= TEST_CASES.displayInfo.minResolution.height ? 'PASS' : 'FAIL'
        });
        g42.push({
            field: 'densityDPI',
            expected: '范围 80-640',
            actual: f42.densityDPI.toString(),
            status: f42.densityDPI >= TEST_CASES.displayInfo.densityRange.min &&
                f42.densityDPI <= TEST_CASES.displayInfo.densityRange.max ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'refreshRate',
            expected: '常见值之一: 30,60,90,120,144Hz',
            actual: f42.refreshRate + 'Hz',
            status: TEST_CASES.displayInfo.refreshRateValues.includes(f42.refreshRate) ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'totalStorage',
            expected: '最小 1GB (部分设备可能无法获取)',
            actual: f42.totalStorage > 0 ? (f42.totalStorage / 1024 / 1024 / 1024).toFixed(2) + 'GB' : '无法获取',
            status: f42.totalStorage >= TEST_CASES.storageInfo.minTotalSize ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'freeStorage',
            expected: '大于 0 (部分设备可能无法获取)',
            actual: f42.freeStorage > 0 ? (f42.freeStorage / 1024 / 1024 / 1024).toFixed(2) + 'GB' : '无法获取',
            status: f42.freeStorage > 0 ? 'PASS' : 'WARNING'
        });
        g42.push({
            field: 'networkType',
            expected: '非空字符串',
            actual: f42.networkType,
            status: f42.networkType && f42.networkType !== 'unknown' ? 'PASS' : 'WARNING'
        });
        return g42;
    }
    static async runPerformanceCheck(): Promise<void> {
        hilog.info(DOMAIN, TAG, '========== 性能监控和测试开始 ==========');
        const v41 = Date.now();
        const w41 = await PerformanceMonitor.collectMetrics();
        if (!w41) {
            hilog.error(DOMAIN, TAG, '性能指标收集失败');
            return;
        }
        const x41 = Date.now() - v41;
        hilog.info(DOMAIN, TAG, '指标收集耗时: %{public}d ms', x41);
        hilog.info(DOMAIN, TAG, '【收集到的性能指标】');
        hilog.info(DOMAIN, TAG, '设备类型: %{public}s', w41.deviceType);
        hilog.info(DOMAIN, TAG, '设备品牌: %{public}s', w41.brand);
        hilog.info(DOMAIN, TAG, '设备型号: %{public}s', w41.marketName);
        hilog.info(DOMAIN, TAG, '系统版本: %{public}s', w41.osFullName);
        hilog.info(DOMAIN, TAG, 'API 版本: %{public}d', w41.sdkApiVersion);
        hilog.info(DOMAIN, TAG, '电池电量: %{public}d%%', w41.batterySOC);
        hilog.info(DOMAIN, TAG, '充电状态: %{public}d', w41.chargingStatus);
        hilog.info(DOMAIN, TAG, '电池温度: %{public}s°C', (w41.batteryTemperature / 10).toFixed(1));
        hilog.info(DOMAIN, TAG, '屏幕分辨率: %{public}d x %{public}d', w41.screenWidth, w41.screenHeight);
        hilog.info(DOMAIN, TAG, '像素密度: %{public}d DPI', w41.densityDPI);
        hilog.info(DOMAIN, TAG, '刷新率: %{public}d Hz', w41.refreshRate);
        hilog.info(DOMAIN, TAG, '总存储: %{public}s GB', (w41.totalStorage / 1024 / 1024 / 1024).toFixed(2));
        hilog.info(DOMAIN, TAG, '可用存储: %{public}s GB', (w41.freeStorage / 1024 / 1024 / 1024).toFixed(2));
        hilog.info(DOMAIN, TAG, '网络类型: %{public}s', w41.networkType);
        hilog.info(DOMAIN, TAG, '【测试用例验证结果】');
        const y41 = PerformanceMonitor.validateMetrics(w41);
        let z41 = 0;
        let a42 = 0;
        let b42 = 0;
        for (const d42 of y41) {
            const e42 = d42.status === 'PASS' ? 'PASS' : d42.status === 'FAIL' ? 'FAIL' : 'WARN';
            hilog.info(DOMAIN, TAG, '[%{public}s] %{public}s: %{public}s (期望值: %{public}s, 实际值: %{public}s)', e42, d42.field, d42.status, d42.expected, d42.actual);
            if (d42.status === 'PASS')
                z41++;
            else if (d42.status === 'FAIL')
                a42++;
            else
                b42++;
        }
        hilog.info(DOMAIN, TAG, '【测试结果汇总】');
        hilog.info(DOMAIN, TAG, '通过: %{public}d', z41);
        hilog.info(DOMAIN, TAG, '失败: %{public}d', a42);
        hilog.info(DOMAIN, TAG, '警告: %{public}d', b42);
        hilog.info(DOMAIN, TAG, '总计: %{public}d', y41.length);
        const c42 = Date.now() - v41;
        hilog.info(DOMAIN, TAG, '总耗时: %{public}d ms', c42);
        hilog.info(DOMAIN, TAG, '========== 性能监控和测试完成 ==========');
        if (a42 > 0) {
            hilog.error(DOMAIN, TAG, '警告: 有 %{public}d 项测试失败，请检查系统信息获取是否正常', a42);
        }
    }
}
