import sysinfo from 'libsysinfo.so';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'NativeApi';

// ============ HiDebug 数据接口 ============

export interface SystemMemInfo {
  total: number;
  available: number;
  free: number;
  buffers: number;
  cached: number;
  swapTotal: number;
  swapFree: number;
  success: boolean;
  error?: string;
}

export interface AppMemInfo {
  pss: number;
  vss: number;
  rss: number;
  sharedClean: number;
  sharedDirty: number;
  privateClean: number;
  privateDirty: number;
  success: boolean;
  error?: string;
}

export interface MemoryLimit {
  rssLimit: number;
  vssLimit: number;
  success: boolean;
  error?: string;
}

export interface CpuUsage {
  usage: number;
  percentage: number;
  success: boolean;
  error?: string;
}

export interface ThreadCpuInfo {
  threadId: number;
  usage: number;
  percentage: number;
}

export interface CpuUsageAll {
  threadCount: number;
  threads: ThreadCpuInfo[];
  success: boolean;
  error?: string;
}

export interface GpuMemoryInfo {
  total: number;
  used: number;
  free: number;
  success: boolean;
  error?: string;
}

// ============ Sensor 数据接口 ============

export interface SensorInfo {
  type: number;
  typeName: string;
  name: string;
  vendor: string;
  version: number;
  maxRange: number;
  resolution: number;
  minDelay: number;
  maxDelay: number;
  fifoMaxEventCount: number;
  fifoReservedEventCount: number;
}

export interface SensorData {
  values: number[];
  timestamp: number;
  accuracy: number;
  success: boolean;
  error?: string;
}

export interface SensorAxes {
  x: string;
  y: string;
  z: string;
}

export interface AccelerometerData extends SensorData {
  axes: SensorAxes;
  type: string;
}

export interface GyroscopeData extends SensorData {
  axes: SensorAxes;
  type: string;
}

export interface MagnetometerData extends SensorData {
  axes: SensorAxes;
  type: string;
}

export interface LightData extends SensorData {
  unit: string;
  type: string;
  description: string;
}

export interface ProximityData extends SensorData {
  unit: string;
  type: string;
  description: string;
}

export interface BarometerData extends SensorData {
  unit: string;
  type: string;
  description: string;
}

export interface TemperatureData extends SensorData {
  unit: string;
  type: string;
  description: string;
}

export interface HumidityData extends SensorData {
  unit: string;
  type: string;
  description: string;
}

export interface AllSensorInfos {
  sensors: SensorInfo[];
  count: number;
  success: boolean;
  error?: string;
}

// ============ Native API 封装类 ============

export class NativeApi {
  private static instance: NativeApi;
  private isAvailable: boolean = false;
  private hasInitialized: boolean = false;

  private constructor() {
    this.checkAvailability();
  }

  private checkAvailability(): void {
    hilog.info(0x0000, TAG, 'Checking Native API availability...');
    try {
      // 测试 Native 模块是否可用
      hilog.info(0x0000, TAG, 'About to call sysinfo.getSystemMemInfo()...');
      const testResult = sysinfo.getSystemMemInfo();
      hilog.info(0x0000, TAG, 'getSystemMemInfo returned successfully');
      hilog.info(0x0000, TAG, 'Result type: %{public}s', typeof testResult);
      hilog.info(0x0000, TAG, 'Result value: %{public}s', JSON.stringify(testResult));
      this.isAvailable = testResult !== undefined && testResult !== null;
      this.hasInitialized = true;
      hilog.info(0x0000, TAG, 'Native API initialized, available: %{public}s', String(this.isAvailable));
    } catch (e) {
      this.isAvailable = false;
      this.hasInitialized = true;
      hilog.error(0x0000, TAG, 'Native API initialization failed');
      hilog.error(0x0000, TAG, 'Error: %{public}s', String(e));
    }
  }

  static getInstance(): NativeApi {
    if (!NativeApi.instance) {
      NativeApi.instance = new NativeApi();
    }
    return NativeApi.instance;
  }

  isNativeAvailable(): boolean {
    // 如果还没有初始化，尝试检查可用性
    if (!this.hasInitialized) {
      this.checkAvailability();
    }
    return this.isAvailable;
  }

  // ============ HiDebug API ============

  getSystemMemInfo(): SystemMemInfo | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getSystemMemInfo() as SystemMemInfo;
      hilog.debug(0x0000, TAG, 'SystemMemInfo: total=%{public}d, available=%{public}d', result.total, result.available);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getSystemMemInfo error: %{public}s', String(e));
      return null;
    }
  }

  getAppMemInfo(): AppMemInfo | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getAppMemInfo() as AppMemInfo;
      hilog.debug(0x0000, TAG, 'AppMemInfo: pss=%{public}d, vss=%{public}d', result.pss, result.vss);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getAppMemInfo error: %{public}s', String(e));
      return null;
    }
  }

  getMemoryLimit(): MemoryLimit | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getMemoryLimit() as MemoryLimit;
      hilog.debug(0x0000, TAG, 'MemoryLimit: rssLimit=%{public}d', result.rssLimit);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getMemoryLimit error: %{public}s', String(e));
      return null;
    }
  }

  getSystemCpuUsage(): CpuUsage | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getSystemCpuUsage() as CpuUsage;
      hilog.debug(0x0000, TAG, 'SystemCpuUsage: %{public}f%%', result.percentage);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getSystemCpuUsage error: %{public}s', String(e));
      return null;
    }
  }

  getAppCpuUsage(): CpuUsage | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getAppCpuUsage() as CpuUsage;
      hilog.debug(0x0000, TAG, 'AppCpuUsage: %{public}f%%', result.percentage);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getAppCpuUsage error: %{public}s', String(e));
      return null;
    }
  }

  getCpuUsageAll(): CpuUsageAll | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getCpuUsageAll() as CpuUsageAll;
      hilog.debug(0x0000, TAG, 'CpuUsageAll: threads=%{public}d', result.threadCount);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getCpuUsageAll error: %{public}s', String(e));
      return null;
    }
  }

  getGpuMemoryInfo(): GpuMemoryInfo | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getGpuMemoryInfo() as GpuMemoryInfo;
      hilog.debug(0x0000, TAG, 'GpuMemoryInfo: total=%{public}d, used=%{public}d', result.total, result.used);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getGpuMemoryInfo error: %{public}s', String(e));
      return null;
    }
  }

  // ============ Sensor API ============

  getAllSensorInfos(): AllSensorInfos | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getAllSensorInfos() as AllSensorInfos;
      hilog.debug(0x0000, TAG, 'AllSensorInfos: count=%{public}d', result.count);
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getAllSensorInfos error: %{public}s', String(e));
      return null;
    }
  }

  getAccelerometerData(): AccelerometerData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getAccelerometerData() as AccelerometerData;
      hilog.debug(0x0000, TAG, 'AccelerometerData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getAccelerometerData error: %{public}s', String(e));
      return null;
    }
  }

  getGyroscopeData(): GyroscopeData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getGyroscopeData() as GyroscopeData;
      hilog.debug(0x0000, TAG, 'GyroscopeData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getGyroscopeData error: %{public}s', String(e));
      return null;
    }
  }

  getMagnetometerData(): MagnetometerData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getMagnetometerData() as MagnetometerData;
      hilog.debug(0x0000, TAG, 'MagnetometerData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getMagnetometerData error: %{public}s', String(e));
      return null;
    }
  }

  getLightData(): LightData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getLightData() as LightData;
      hilog.debug(0x0000, TAG, 'LightData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getLightData error: %{public}s', String(e));
      return null;
    }
  }

  getProximityData(): ProximityData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getProximityData() as ProximityData;
      hilog.debug(0x0000, TAG, 'ProximityData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getProximityData error: %{public}s', String(e));
      return null;
    }
  }

  getBarometerData(): BarometerData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getBarometerData() as BarometerData;
      hilog.debug(0x0000, TAG, 'BarometerData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getBarometerData error: %{public}s', String(e));
      return null;
    }
  }

  getTemperatureData(): TemperatureData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getTemperatureData() as TemperatureData;
      hilog.debug(0x0000, TAG, 'TemperatureData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getTemperatureData error: %{public}s', String(e));
      return null;
    }
  }

  getHumidityData(): HumidityData | null {
    if (!this.isAvailable) return null;
    try {
      const result = sysinfo.getHumidityData() as HumidityData;
      hilog.debug(0x0000, TAG, 'HumidityData: values=%{public}s', JSON.stringify(result.values));
      return result;
    } catch (e) {
      hilog.error(0x0000, TAG, 'getHumidityData error: %{public}s', String(e));
      return null;
    }
  }
}

// 导出单例实例
export const nativeApi = NativeApi.getInstance();
