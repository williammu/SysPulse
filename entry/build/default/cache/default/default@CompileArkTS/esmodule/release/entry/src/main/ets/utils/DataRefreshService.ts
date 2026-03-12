import hilog from "@ohos:hilog";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { SystemMemInfo, AppMemInfo, MemoryLimit, CpuUsage, CpuUsageAll } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import type { BatteryInfoModel, DeviceInfoModel, DisplayInfoModel, StorageInfoModel } from '../model/DeviceInfo';
const TAG = 'DataRefreshService';
const REFRESH_INTERVAL = 200;
export interface SystemData {
    systemMemInfo: SystemMemInfo | null;
    appMemInfo: AppMemInfo | null;
    memoryLimit: MemoryLimit | null;
    systemCpuUsage: CpuUsage | null;
    appCpuUsage: CpuUsage | null;
    cpuUsageAll: CpuUsageAll | null;
    batteryInfo: BatteryInfoModel | null;
    deviceInfo: DeviceInfoModel | null;
    displayInfo: DisplayInfoModel | null;
    storageInfo: StorageInfoModel | null;
    timestamp: number;
}
export interface DataListener {
    onDataUpdated(data: SystemData): void;
}
export class DataRefreshService {
    private static instance: DataRefreshService;
    private timerId: number | null = null;
    private listeners: Set<DataListener> = new Set();
    private currentData: SystemData = {
        systemMemInfo: null,
        appMemInfo: null,
        memoryLimit: null,
        systemCpuUsage: null,
        appCpuUsage: null,
        cpuUsageAll: null,
        batteryInfo: null,
        deviceInfo: null,
        displayInfo: null,
        storageInfo: null,
        timestamp: 0
    };
    private isRunning: boolean = false;
    private constructor() { }
    static getInstance(): DataRefreshService {
        if (!DataRefreshService.instance) {
            DataRefreshService.instance = new DataRefreshService();
        }
        return DataRefreshService.instance;
    }
    start(): void {
        if (this.isRunning) {
            hilog.warn(0x0000, TAG, 'Data refresh service is already running');
            return;
        }
        hilog.info(0x0000, TAG, 'Starting data refresh service, interval: %{public}dms', REFRESH_INTERVAL);
        this.isRunning = true;
        this.refreshData();
        this.timerId = setInterval(() => {
            this.refreshData();
        }, REFRESH_INTERVAL);
    }
    stop(): void {
        if (!this.isRunning) {
            return;
        }
        hilog.info(0x0000, TAG, 'Stopping data refresh service');
        this.isRunning = false;
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    private refreshData(): void {
        try {
            const h5 = nativeApi.isNativeAvailable();
            if (h5) {
                this.currentData.systemMemInfo = nativeApi.getSystemMemInfo();
                this.currentData.appMemInfo = nativeApi.getAppMemInfo();
                this.currentData.memoryLimit = nativeApi.getMemoryLimit();
                this.currentData.systemCpuUsage = nativeApi.getSystemCpuUsage();
                this.currentData.appCpuUsage = nativeApi.getAppCpuUsage();
                this.currentData.cpuUsageAll = nativeApi.getCpuUsageAll();
            }
            this.currentData.batteryInfo = DeviceUtil.getBatteryInfo();
            if (!this.currentData.deviceInfo) {
                this.currentData.deviceInfo = DeviceUtil.getDeviceInfo();
            }
            if (!this.currentData.displayInfo) {
                this.currentData.displayInfo = DeviceUtil.getDisplayInfoSync();
            }
            if (!this.currentData.storageInfo) {
                this.currentData.storageInfo = DeviceUtil.getStorageInfo();
            }
            this.currentData.timestamp = Date.now();
            this.notifyListeners();
        }
        catch (g5) {
            hilog.error(0x0000, TAG, 'Error refreshing data: %{public}s', String(g5));
        }
    }
    private notifyListeners(): void {
        this.listeners.forEach(e5 => {
            try {
                e5.onDataUpdated(this.currentData);
            }
            catch (f5) {
                hilog.error(0x0000, TAG, 'Error notifying listener: %{public}s', String(f5));
            }
        });
    }
    addListener(d5: DataListener): void {
        this.listeners.add(d5);
        hilog.info(0x0000, TAG, 'Listener added, total: %{public}d', this.listeners.size);
        if (this.currentData.timestamp > 0) {
            d5.onDataUpdated(this.currentData);
        }
    }
    removeListener(c5: DataListener): void {
        this.listeners.delete(c5);
        hilog.info(0x0000, TAG, 'Listener removed, total: %{public}d', this.listeners.size);
    }
    getCurrentData(): SystemData {
        return this.currentData;
    }
    getIsRunning(): boolean {
        return this.isRunning;
    }
}
export const dataRefreshService = DataRefreshService.getInstance();
