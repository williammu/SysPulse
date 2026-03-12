import { hilog } from '@kit.PerformanceAnalysisKit';
import { nativeApi, SystemMemInfo, AppMemInfo, MemoryLimit, CpuUsage, CpuUsageAll } from './NativeApi';
import { DeviceUtil } from './DeviceUtil';
import type { BatteryInfoModel, DeviceInfoModel, DisplayInfoModel, StorageInfoModel } from '../model/DeviceInfo';

const TAG = 'DataRefreshService';
const REFRESH_INTERVAL = 200; // 200ms

// 数据模型
export interface SystemData {
  // Native API 数据
  systemMemInfo: SystemMemInfo | null;
  appMemInfo: AppMemInfo | null;
  memoryLimit: MemoryLimit | null;
  systemCpuUsage: CpuUsage | null;
  appCpuUsage: CpuUsage | null;
  cpuUsageAll: CpuUsageAll | null;
  
  // DeviceUtil 数据
  batteryInfo: BatteryInfoModel | null;
  deviceInfo: DeviceInfoModel | null;
  displayInfo: DisplayInfoModel | null;
  storageInfo: StorageInfoModel | null;
  
  // 时间戳
  timestamp: number;
}

// 数据监听器接口
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

  private constructor() {}

  static getInstance(): DataRefreshService {
    if (!DataRefreshService.instance) {
      DataRefreshService.instance = new DataRefreshService();
    }
    return DataRefreshService.instance;
  }

  // 启动数据刷新
  start(): void {
    if (this.isRunning) {
      hilog.warn(0x0000, TAG, 'Data refresh service is already running');
      return;
    }

    hilog.info(0x0000, TAG, 'Starting data refresh service, interval: %{public}dms', REFRESH_INTERVAL);
    this.isRunning = true;
    
    // 立即执行一次
    this.refreshData();
    
    // 设置定时器
    this.timerId = setInterval(() => {
      this.refreshData();
    }, REFRESH_INTERVAL);
  }

  // 停止数据刷新
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

  // 刷新数据
  private refreshData(): void {
    try {
      // 检查 Native API 是否可用
      const isNativeAvailable = nativeApi.isNativeAvailable();
      
      if (isNativeAvailable) {
        // 刷新 Native API 数据
        this.currentData.systemMemInfo = nativeApi.getSystemMemInfo();
        this.currentData.appMemInfo = nativeApi.getAppMemInfo();
        this.currentData.memoryLimit = nativeApi.getMemoryLimit();
        this.currentData.systemCpuUsage = nativeApi.getSystemCpuUsage();
        this.currentData.appCpuUsage = nativeApi.getAppCpuUsage();
        this.currentData.cpuUsageAll = nativeApi.getCpuUsageAll();
      }

      // 刷新 DeviceUtil 数据（部分数据不需要频繁刷新，可以优化）
      this.currentData.batteryInfo = DeviceUtil.getBatteryInfo();
      // deviceInfo 和 displayInfo 变化较少，不需要每 200ms 刷新
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

      // 通知所有监听器
      this.notifyListeners();
    } catch (error) {
      hilog.error(0x0000, TAG, 'Error refreshing data: %{public}s', String(error));
    }
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener.onDataUpdated(this.currentData);
      } catch (error) {
        hilog.error(0x0000, TAG, 'Error notifying listener: %{public}s', String(error));
      }
    });
  }

  // 添加监听器
  addListener(listener: DataListener): void {
    this.listeners.add(listener);
    hilog.info(0x0000, TAG, 'Listener added, total: %{public}d', this.listeners.size);
    
    // 立即通知一次当前数据
    if (this.currentData.timestamp > 0) {
      listener.onDataUpdated(this.currentData);
    }
  }

  // 移除监听器
  removeListener(listener: DataListener): void {
    this.listeners.delete(listener);
    hilog.info(0x0000, TAG, 'Listener removed, total: %{public}d', this.listeners.size);
  }

  // 获取当前数据
  getCurrentData(): SystemData {
    return this.currentData;
  }

  // 检查是否正在运行
  getIsRunning(): boolean {
    return this.isRunning;
  }
}

// 导出单例
export const dataRefreshService = DataRefreshService.getInstance();
