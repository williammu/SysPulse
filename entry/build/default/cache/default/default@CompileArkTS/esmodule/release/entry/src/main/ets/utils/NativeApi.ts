import sysinfo from "@app:com.huawei.sysinfo/entry/sysinfo";
import hilog from "@ohos:hilog";
const TAG = 'NativeApi';
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
            hilog.info(0x0000, TAG, 'About to call sysinfo.getSystemMemInfo()...');
            const h1 = sysinfo.getSystemMemInfo();
            hilog.info(0x0000, TAG, 'getSystemMemInfo returned successfully');
            hilog.info(0x0000, TAG, 'Result type: %{public}s', typeof h1);
            hilog.info(0x0000, TAG, 'Result value: %{public}s', JSON.stringify(h1));
            this.isAvailable = h1 !== undefined && h1 !== null;
            this.hasInitialized = true;
            hilog.info(0x0000, TAG, 'Native API initialized, available: %{public}s', String(this.isAvailable));
        }
        catch (g1) {
            this.isAvailable = false;
            this.hasInitialized = true;
            hilog.error(0x0000, TAG, 'Native API initialization failed');
            hilog.error(0x0000, TAG, 'Error: %{public}s', String(g1));
        }
    }
    static getInstance(): NativeApi {
        if (!NativeApi.instance) {
            NativeApi.instance = new NativeApi();
        }
        return NativeApi.instance;
    }
    isNativeAvailable(): boolean {
        if (!this.hasInitialized) {
            this.checkAvailability();
        }
        return this.isAvailable;
    }
    getSystemMemInfo(): SystemMemInfo | null {
        if (!this.isAvailable)
            return null;
        try {
            const f1 = sysinfo.getSystemMemInfo() as SystemMemInfo;
            hilog.debug(0x0000, TAG, 'SystemMemInfo: total=%{public}d, available=%{public}d', f1.total, f1.available);
            return f1;
        }
        catch (e1) {
            hilog.error(0x0000, TAG, 'getSystemMemInfo error: %{public}s', String(e1));
            return null;
        }
    }
    getAppMemInfo(): AppMemInfo | null {
        if (!this.isAvailable)
            return null;
        try {
            const d1 = sysinfo.getAppMemInfo() as AppMemInfo;
            hilog.debug(0x0000, TAG, 'AppMemInfo: pss=%{public}d, vss=%{public}d', d1.pss, d1.vss);
            return d1;
        }
        catch (c1) {
            hilog.error(0x0000, TAG, 'getAppMemInfo error: %{public}s', String(c1));
            return null;
        }
    }
    getMemoryLimit(): MemoryLimit | null {
        if (!this.isAvailable)
            return null;
        try {
            const b1 = sysinfo.getMemoryLimit() as MemoryLimit;
            hilog.debug(0x0000, TAG, 'MemoryLimit: rssLimit=%{public}d', b1.rssLimit);
            return b1;
        }
        catch (a1) {
            hilog.error(0x0000, TAG, 'getMemoryLimit error: %{public}s', String(a1));
            return null;
        }
    }
    getSystemCpuUsage(): CpuUsage | null {
        if (!this.isAvailable)
            return null;
        try {
            const z = sysinfo.getSystemCpuUsage() as CpuUsage;
            hilog.debug(0x0000, TAG, 'SystemCpuUsage: %{public}f%%', z.percentage);
            return z;
        }
        catch (y) {
            hilog.error(0x0000, TAG, 'getSystemCpuUsage error: %{public}s', String(y));
            return null;
        }
    }
    getAppCpuUsage(): CpuUsage | null {
        if (!this.isAvailable)
            return null;
        try {
            const x = sysinfo.getAppCpuUsage() as CpuUsage;
            hilog.debug(0x0000, TAG, 'AppCpuUsage: %{public}f%%', x.percentage);
            return x;
        }
        catch (w) {
            hilog.error(0x0000, TAG, 'getAppCpuUsage error: %{public}s', String(w));
            return null;
        }
    }
    getCpuUsageAll(): CpuUsageAll | null {
        if (!this.isAvailable)
            return null;
        try {
            const v = sysinfo.getCpuUsageAll() as CpuUsageAll;
            hilog.debug(0x0000, TAG, 'CpuUsageAll: threads=%{public}d', v.threadCount);
            return v;
        }
        catch (u) {
            hilog.error(0x0000, TAG, 'getCpuUsageAll error: %{public}s', String(u));
            return null;
        }
    }
    getGpuMemoryInfo(): GpuMemoryInfo | null {
        if (!this.isAvailable)
            return null;
        try {
            const t = sysinfo.getGpuMemoryInfo() as GpuMemoryInfo;
            hilog.debug(0x0000, TAG, 'GpuMemoryInfo: total=%{public}d, used=%{public}d', t.total, t.used);
            return t;
        }
        catch (s) {
            hilog.error(0x0000, TAG, 'getGpuMemoryInfo error: %{public}s', String(s));
            return null;
        }
    }
    getAllSensorInfos(): AllSensorInfos | null {
        if (!this.isAvailable)
            return null;
        try {
            const r = sysinfo.getAllSensorInfos() as AllSensorInfos;
            hilog.debug(0x0000, TAG, 'AllSensorInfos: count=%{public}d', r.count);
            return r;
        }
        catch (q) {
            hilog.error(0x0000, TAG, 'getAllSensorInfos error: %{public}s', String(q));
            return null;
        }
    }
    getAccelerometerData(): AccelerometerData | null {
        if (!this.isAvailable)
            return null;
        try {
            const p = sysinfo.getAccelerometerData() as AccelerometerData;
            hilog.debug(0x0000, TAG, 'AccelerometerData: values=%{public}s', JSON.stringify(p.values));
            return p;
        }
        catch (o) {
            hilog.error(0x0000, TAG, 'getAccelerometerData error: %{public}s', String(o));
            return null;
        }
    }
    getGyroscopeData(): GyroscopeData | null {
        if (!this.isAvailable)
            return null;
        try {
            const n = sysinfo.getGyroscopeData() as GyroscopeData;
            hilog.debug(0x0000, TAG, 'GyroscopeData: values=%{public}s', JSON.stringify(n.values));
            return n;
        }
        catch (m) {
            hilog.error(0x0000, TAG, 'getGyroscopeData error: %{public}s', String(m));
            return null;
        }
    }
    getMagnetometerData(): MagnetometerData | null {
        if (!this.isAvailable)
            return null;
        try {
            const l = sysinfo.getMagnetometerData() as MagnetometerData;
            hilog.debug(0x0000, TAG, 'MagnetometerData: values=%{public}s', JSON.stringify(l.values));
            return l;
        }
        catch (k) {
            hilog.error(0x0000, TAG, 'getMagnetometerData error: %{public}s', String(k));
            return null;
        }
    }
    getLightData(): LightData | null {
        if (!this.isAvailable)
            return null;
        try {
            const j = sysinfo.getLightData() as LightData;
            hilog.debug(0x0000, TAG, 'LightData: values=%{public}s', JSON.stringify(j.values));
            return j;
        }
        catch (i) {
            hilog.error(0x0000, TAG, 'getLightData error: %{public}s', String(i));
            return null;
        }
    }
    getProximityData(): ProximityData | null {
        if (!this.isAvailable)
            return null;
        try {
            const h = sysinfo.getProximityData() as ProximityData;
            hilog.debug(0x0000, TAG, 'ProximityData: values=%{public}s', JSON.stringify(h.values));
            return h;
        }
        catch (g) {
            hilog.error(0x0000, TAG, 'getProximityData error: %{public}s', String(g));
            return null;
        }
    }
    getBarometerData(): BarometerData | null {
        if (!this.isAvailable)
            return null;
        try {
            const f = sysinfo.getBarometerData() as BarometerData;
            hilog.debug(0x0000, TAG, 'BarometerData: values=%{public}s', JSON.stringify(f.values));
            return f;
        }
        catch (e) {
            hilog.error(0x0000, TAG, 'getBarometerData error: %{public}s', String(e));
            return null;
        }
    }
    getTemperatureData(): TemperatureData | null {
        if (!this.isAvailable)
            return null;
        try {
            const d = sysinfo.getTemperatureData() as TemperatureData;
            hilog.debug(0x0000, TAG, 'TemperatureData: values=%{public}s', JSON.stringify(d.values));
            return d;
        }
        catch (c) {
            hilog.error(0x0000, TAG, 'getTemperatureData error: %{public}s', String(c));
            return null;
        }
    }
    getHumidityData(): HumidityData | null {
        if (!this.isAvailable)
            return null;
        try {
            const b = sysinfo.getHumidityData() as HumidityData;
            hilog.debug(0x0000, TAG, 'HumidityData: values=%{public}s', JSON.stringify(b.values));
            return b;
        }
        catch (a) {
            hilog.error(0x0000, TAG, 'getHumidityData error: %{public}s', String(a));
            return null;
        }
    }
}
export const nativeApi = NativeApi.getInstance();
