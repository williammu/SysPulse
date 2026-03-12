import deviceInfo from "@ohos:deviceInfo";
import batteryInfo from "@ohos:batteryInfo";
import display from "@ohos:display";
import statvfs from "@ohos:file.statvfs";
import connection from "@ohos:net.connection";
import type { DeviceInfoModel, BatteryInfoModel, DisplayInfoModel, StorageInfoModel, NetworkInfoModel, MemoryInfoModel, CpuInfoModel } from '../model/DeviceInfo';
export class SystemInfoCore {
    static getDeviceInfo(): DeviceInfoModel {
        return {
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
            batterySOC: batteryInfo.batterySOC || 0,
            chargingStatus: batteryInfo.chargingStatus || 0,
            healthStatus: batteryInfo.healthStatus || 0,
            pluggedType: batteryInfo.pluggedType || 0,
            voltage: batteryInfo.voltage || 0,
            technology: batteryInfo.technology || '未知',
            batteryTemperature: batteryInfo.batteryTemperature || 0,
            isBatteryPresent: false,
            batteryCapacityLevel: 0,
            nowCurrent: 0
        };
    }
    static async getDisplayInfo(): Promise<DisplayInfoModel | null> {
        try {
            const n43 = await display.getDefaultDisplay();
            return {
                id: n43.id,
                name: n43.name,
                alive: n43.alive,
                state: n43.state,
                refreshRate: n43.refreshRate,
                rotation: n43.rotation,
                width: n43.width,
                height: n43.height,
                densityDPI: n43.densityDPI,
                densityPixels: n43.densityPixels,
                scaledDensity: n43.scaledDensity,
                xDPI: n43.xDPI,
                yDPI: n43.yDPI
            };
        }
        catch (m43) {
            console.error('Get display info error:', m43);
            return null;
        }
    }
    static getStorageInfo(): StorageInfoModel | null {
        try {
            const i43: Context = getContext();
            const j43: string = i43.filesDir;
            const k43: number = statvfs.getTotalSizeSync(j43);
            const l43: number = statvfs.getFreeSizeSync(j43);
            return {
                totalSize: k43,
                freeSize: l43,
                usedSize: k43 - l43
            };
        }
        catch (h43) {
            console.error('Get storage info error:', h43);
            return null;
        }
    }
    static async getNetworkInfo(): Promise<NetworkInfoModel | null> {
        try {
            const f43 = await connection.getDefaultNet();
            const g43 = await connection.getNetCapabilities(f43);
            return {
                netType: g43.bearerTypes?.join(',') || '未知',
                capabilities: g43.networkCap || [],
                bearerTypes: g43.bearerTypes || []
            };
        }
        catch (e43) {
            console.error('Get network info error:', e43);
            return null;
        }
    }
    static getMemoryInfo(): MemoryInfoModel | null {
        console.warn('Memory info API not available in HarmonyOS NEXT');
        return null;
    }
    static getCpuInfo(): CpuInfoModel {
        return {
            architecture: deviceInfo.abiList || '未知',
            model: '未获取',
            cores: 0,
            process: '未获取'
        };
    }
    static async runAllTests(): Promise<void> {
        console.log('========== SystemInfoCore Test Start ==========');
        console.log('\n[Test 1] Device Info:');
        const z42 = SystemInfoCore.getDeviceInfo();
        console.log('  设备类型:', z42.deviceType);
        console.log('  设备品牌:', z42.brand);
        console.log('  设备型号:', z42.marketName);
        console.log('  系统版本:', z42.osFullName);
        console.log('  API 版本:', z42.sdkApiVersion);
        console.log('  CPU 架构:', z42.abiList);
        console.log('\n[Test 2] Battery Info:');
        const a43 = SystemInfoCore.getBatteryInfo();
        console.log('  电池电量:', a43.batterySOC + '%');
        console.log('  充电状态:', a43.chargingStatus);
        console.log('  健康状态:', a43.healthStatus);
        console.log('  电池温度:', (a43.batteryTemperature / 10).toFixed(1) + '°C');
        console.log('\n[Test 3] Display Info:');
        const b43 = await SystemInfoCore.getDisplayInfo();
        if (b43) {
            console.log('  屏幕宽度:', b43.width + 'px');
            console.log('  屏幕高度:', b43.height + 'px');
            console.log('  像素密度:', b43.densityDPI + ' DPI');
            console.log('  刷新率:', b43.refreshRate + ' Hz');
        }
        console.log('\n[Test 4] Storage Info:');
        const c43 = SystemInfoCore.getStorageInfo();
        if (c43) {
            console.log('  总存储:', (c43.totalSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
            console.log('  可用存储:', (c43.freeSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
            console.log('  已用存储:', (c43.usedSize / 1024 / 1024 / 1024).toFixed(2) + ' GB');
        }
        console.log('\n[Test 5] Network Info:');
        const d43 = await SystemInfoCore.getNetworkInfo();
        if (d43) {
            console.log('  网络类型:', d43.netType);
        }
        console.log('\n========== SystemInfoCore Test Complete ==========');
    }
}
