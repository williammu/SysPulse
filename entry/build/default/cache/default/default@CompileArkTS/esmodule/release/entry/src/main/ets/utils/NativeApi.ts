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
export interface GpuInfo {
    vendor: string;
    renderer: string;
    version: string;
    shadingLanguageVersion: string;
    extensions: string;
    maxTextureSize: number;
    maxCubeMapTextureSize: number;
    maxRenderbufferSize: number;
    maxTextureImageUnits: number;
    maxVertexTextureImageUnits: number;
    maxCombinedTextureImageUnits: number;
    maxViewportWidth: number;
    maxViewportHeight: number;
    aliasedLineWidthRange: number[];
    aliasedPointSizeRange: number[];
    maxVertexAttribs: number;
    maxVertexUniformVectors: number;
    maxFragmentUniformVectors: number;
    maxVaryingVectors: number;
    maxUniformBufferBindings: number;
    maxUniformBlockSize: number;
    maxDrawBuffers: number;
    maxColorAttachments: number;
    maxSamples: number;
    maxElementIndex: number;
    numProgramBinaryFormats: number;
    numShaderBinaryFormats: number;
    numExtensions: number;
    compressedTextureFormats: number[];
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
            const u7 = sysinfo.getSystemMemInfo();
            hilog.info(0x0000, TAG, 'getSystemMemInfo returned successfully');
            hilog.info(0x0000, TAG, 'Result type: %{public}s', typeof u7);
            hilog.info(0x0000, TAG, 'Result value: %{public}s', JSON.stringify(u7));
            this.isAvailable = u7 !== undefined && u7 !== null;
            this.hasInitialized = true;
            hilog.info(0x0000, TAG, 'Native API initialized, available: %{public}s', String(this.isAvailable));
        }
        catch (t7) {
            this.isAvailable = false;
            this.hasInitialized = true;
            hilog.error(0x0000, TAG, 'Native API initialization failed');
            hilog.error(0x0000, TAG, 'Error: %{public}s', String(t7));
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
            const s7 = sysinfo.getSystemMemInfo() as SystemMemInfo;
            hilog.debug(0x0000, TAG, 'SystemMemInfo: total=%{public}d, available=%{public}d', s7.total, s7.available);
            return s7;
        }
        catch (r7) {
            hilog.error(0x0000, TAG, 'getSystemMemInfo error: %{public}s', String(r7));
            return null;
        }
    }
    getAppMemInfo(): AppMemInfo | null {
        if (!this.isAvailable)
            return null;
        try {
            const q7 = sysinfo.getAppMemInfo() as AppMemInfo;
            hilog.debug(0x0000, TAG, 'AppMemInfo: pss=%{public}d, vss=%{public}d', q7.pss, q7.vss);
            return q7;
        }
        catch (p7) {
            hilog.error(0x0000, TAG, 'getAppMemInfo error: %{public}s', String(p7));
            return null;
        }
    }
    getMemoryLimit(): MemoryLimit | null {
        if (!this.isAvailable)
            return null;
        try {
            const o7 = sysinfo.getMemoryLimit() as MemoryLimit;
            hilog.debug(0x0000, TAG, 'MemoryLimit: rssLimit=%{public}d', o7.rssLimit);
            return o7;
        }
        catch (n7) {
            hilog.error(0x0000, TAG, 'getMemoryLimit error: %{public}s', String(n7));
            return null;
        }
    }
    getSystemCpuUsage(): CpuUsage | null {
        if (!this.isAvailable)
            return null;
        try {
            const m7 = sysinfo.getSystemCpuUsage() as CpuUsage;
            hilog.debug(0x0000, TAG, 'SystemCpuUsage: %{public}f%%', m7.percentage);
            return m7;
        }
        catch (l7) {
            hilog.error(0x0000, TAG, 'getSystemCpuUsage error: %{public}s', String(l7));
            return null;
        }
    }
    getAppCpuUsage(): CpuUsage | null {
        if (!this.isAvailable)
            return null;
        try {
            const k7 = sysinfo.getAppCpuUsage() as CpuUsage;
            hilog.debug(0x0000, TAG, 'AppCpuUsage: %{public}f%%', k7.percentage);
            return k7;
        }
        catch (j7) {
            hilog.error(0x0000, TAG, 'getAppCpuUsage error: %{public}s', String(j7));
            return null;
        }
    }
    getCpuUsageAll(): CpuUsageAll | null {
        if (!this.isAvailable)
            return null;
        try {
            const i7 = sysinfo.getCpuUsageAll() as CpuUsageAll;
            hilog.debug(0x0000, TAG, 'CpuUsageAll: threads=%{public}d', i7.threadCount);
            return i7;
        }
        catch (h7) {
            hilog.error(0x0000, TAG, 'getCpuUsageAll error: %{public}s', String(h7));
            return null;
        }
    }
    getGpuMemoryInfo(): GpuMemoryInfo | null {
        if (!this.isAvailable)
            return null;
        try {
            const g7 = sysinfo.getGpuMemoryInfo() as GpuMemoryInfo;
            hilog.debug(0x0000, TAG, 'GpuMemoryInfo: total=%{public}d, used=%{public}d', g7.total, g7.used);
            return g7;
        }
        catch (f7) {
            hilog.error(0x0000, TAG, 'getGpuMemoryInfo error: %{public}s', String(f7));
            return null;
        }
    }
    getGpuInfo(): GpuInfo | null {
        if (!this.isAvailable)
            return null;
        try {
            const e7 = sysinfo.getGpuInfo() as GpuInfo;
            hilog.debug(0x0000, TAG, 'GpuInfo: vendor=%{public}s, renderer=%{public}s', e7.vendor, e7.renderer);
            return e7;
        }
        catch (d7) {
            hilog.error(0x0000, TAG, 'getGpuInfo error: %{public}s', String(d7));
            return null;
        }
    }
    getAllSensorInfos(): AllSensorInfos | null {
        if (!this.isAvailable)
            return null;
        try {
            const c7 = sysinfo.getAllSensorInfos() as AllSensorInfos;
            hilog.debug(0x0000, TAG, 'AllSensorInfos: count=%{public}d', c7.count);
            return c7;
        }
        catch (b7) {
            hilog.error(0x0000, TAG, 'getAllSensorInfos error: %{public}s', String(b7));
            return null;
        }
    }
    getAccelerometerData(): AccelerometerData | null {
        if (!this.isAvailable)
            return null;
        try {
            const a7 = sysinfo.getAccelerometerData() as AccelerometerData;
            hilog.debug(0x0000, TAG, 'AccelerometerData: values=%{public}s', JSON.stringify(a7.values));
            return a7;
        }
        catch (z6) {
            hilog.error(0x0000, TAG, 'getAccelerometerData error: %{public}s', String(z6));
            return null;
        }
    }
    getGyroscopeData(): GyroscopeData | null {
        if (!this.isAvailable)
            return null;
        try {
            const y6 = sysinfo.getGyroscopeData() as GyroscopeData;
            hilog.debug(0x0000, TAG, 'GyroscopeData: values=%{public}s', JSON.stringify(y6.values));
            return y6;
        }
        catch (x6) {
            hilog.error(0x0000, TAG, 'getGyroscopeData error: %{public}s', String(x6));
            return null;
        }
    }
    getMagnetometerData(): MagnetometerData | null {
        if (!this.isAvailable)
            return null;
        try {
            const w6 = sysinfo.getMagnetometerData() as MagnetometerData;
            hilog.debug(0x0000, TAG, 'MagnetometerData: values=%{public}s', JSON.stringify(w6.values));
            return w6;
        }
        catch (v6) {
            hilog.error(0x0000, TAG, 'getMagnetometerData error: %{public}s', String(v6));
            return null;
        }
    }
    getLightData(): LightData | null {
        if (!this.isAvailable)
            return null;
        try {
            const u6 = sysinfo.getLightData() as LightData;
            hilog.debug(0x0000, TAG, 'LightData: values=%{public}s', JSON.stringify(u6.values));
            return u6;
        }
        catch (t6) {
            hilog.error(0x0000, TAG, 'getLightData error: %{public}s', String(t6));
            return null;
        }
    }
    getProximityData(): ProximityData | null {
        if (!this.isAvailable)
            return null;
        try {
            const s6 = sysinfo.getProximityData() as ProximityData;
            hilog.debug(0x0000, TAG, 'ProximityData: values=%{public}s', JSON.stringify(s6.values));
            return s6;
        }
        catch (r6) {
            hilog.error(0x0000, TAG, 'getProximityData error: %{public}s', String(r6));
            return null;
        }
    }
    getBarometerData(): BarometerData | null {
        if (!this.isAvailable)
            return null;
        try {
            const q6 = sysinfo.getBarometerData() as BarometerData;
            hilog.debug(0x0000, TAG, 'BarometerData: values=%{public}s', JSON.stringify(q6.values));
            return q6;
        }
        catch (p6) {
            hilog.error(0x0000, TAG, 'getBarometerData error: %{public}s', String(p6));
            return null;
        }
    }
    getTemperatureData(): TemperatureData | null {
        if (!this.isAvailable)
            return null;
        try {
            const o6 = sysinfo.getTemperatureData() as TemperatureData;
            hilog.debug(0x0000, TAG, 'TemperatureData: values=%{public}s', JSON.stringify(o6.values));
            return o6;
        }
        catch (n6) {
            hilog.error(0x0000, TAG, 'getTemperatureData error: %{public}s', String(n6));
            return null;
        }
    }
    getHumidityData(): HumidityData | null {
        if (!this.isAvailable)
            return null;
        try {
            const m6 = sysinfo.getHumidityData() as HumidityData;
            hilog.debug(0x0000, TAG, 'HumidityData: values=%{public}s', JSON.stringify(m6.values));
            return m6;
        }
        catch (l6) {
            hilog.error(0x0000, TAG, 'getHumidityData error: %{public}s', String(l6));
            return null;
        }
    }
}
export const nativeApi = NativeApi.getInstance();
