import deviceInfo from "@ohos:deviceInfo";
import batteryInfo from "@ohos:batteryInfo";
import display from "@ohos:display";
import statvfs from "@ohos:file.statvfs";
import type { DeviceInfoModel, BatteryInfoModel, DisplayInfoModel, MemoryInfoModel, CpuInfoModel, StorageInfoModel } from '../model/DeviceInfo';
export class DeviceUtil {
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
            const q5 = await display.getDefaultDisplaySync();
            return {
                id: q5.id,
                name: q5.name,
                alive: q5.alive,
                state: q5.state,
                refreshRate: q5.refreshRate,
                rotation: q5.rotation,
                width: q5.width,
                height: q5.height,
                densityDPI: q5.densityDPI,
                densityPixels: q5.densityPixels,
                scaledDensity: q5.scaledDensity,
                xDPI: q5.xDPI,
                yDPI: q5.yDPI
            };
        }
        catch (p5) {
            console.error('Get display info error:', p5);
            return null;
        }
    }
    static getDisplayInfoSync(): DisplayInfoModel | null {
        try {
            const o5 = display.getDefaultDisplaySync();
            return {
                id: o5.id,
                name: o5.name,
                alive: o5.alive,
                state: o5.state,
                refreshRate: o5.refreshRate,
                rotation: o5.rotation,
                width: o5.width,
                height: o5.height,
                densityDPI: o5.densityDPI,
                densityPixels: o5.densityPixels,
                scaledDensity: o5.scaledDensity,
                xDPI: o5.xDPI,
                yDPI: o5.yDPI
            };
        }
        catch (n5) {
            console.error('Get display info sync error:', n5);
            return null;
        }
    }
    static getStorageInfo(): StorageInfoModel | null {
        try {
            const j5: Context = getContext();
            const k5: string = j5.filesDir;
            const l5: number = statvfs.getTotalSizeSync(k5);
            const m5: number = statvfs.getFreeSizeSync(k5);
            return {
                totalSize: l5,
                freeSize: m5,
                usedSize: l5 - m5
            };
        }
        catch (i5) {
            console.error('Get storage info error:', i5);
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
}
