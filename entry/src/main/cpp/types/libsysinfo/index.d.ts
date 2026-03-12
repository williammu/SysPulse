// Native API 类型定义

// ============ HiDebug 模块 ============

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
  // 基本信息
  vendor: string;
  renderer: string;
  version: string;
  shadingLanguageVersion: string;
  extensions: string;
  
  // 纹理限制
  maxTextureSize: number;
  maxCubeMapTextureSize: number;
  maxRenderbufferSize: number;
  maxTextureImageUnits: number;
  maxVertexTextureImageUnits: number;
  maxCombinedTextureImageUnits: number;
  
  // 视口和渲染限制
  maxViewportWidth: number;
  maxViewportHeight: number;
  aliasedLineWidthRange: number[];
  aliasedPointSizeRange: number[];
  
  // 着色器限制
  maxVertexAttribs: number;
  maxVertexUniformVectors: number;
  maxFragmentUniformVectors: number;
  maxVaryingVectors: number;
  maxUniformBufferBindings: number;
  maxUniformBlockSize: number;
  
  // 其他限制
  maxDrawBuffers: number;
  maxColorAttachments: number;
  maxSamples: number;
  maxElementIndex: number;
  numProgramBinaryFormats: number;
  numShaderBinaryFormats: number;
  numExtensions: number;
  
  // 压缩纹理格式
  compressedTextureFormats: number[];
  
  success: boolean;
  error?: string;
}

// ============ Sensor 模块 ============

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

export interface AccelerometerData extends SensorData {
  axes: {
    x: string;
    y: string;
    z: string;
  };
  type: string;
}

export interface GyroscopeData extends SensorData {
  axes: {
    x: string;
    y: string;
    z: string;
  };
  type: string;
}

export interface MagnetometerData extends SensorData {
  axes: {
    x: string;
    y: string;
    z: string;
  };
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

// ============ Native API 函数 ============

export function getSystemMemInfo(): SystemMemInfo;
export function getAppMemInfo(): AppMemInfo;
export function getMemoryLimit(): MemoryLimit;
export function getSystemCpuUsage(): CpuUsage;
export function getAppCpuUsage(): CpuUsage;
export function getCpuUsageAll(): CpuUsageAll;
export function getGpuMemoryInfo(): GpuMemoryInfo;
export function getGpuInfo(): GpuInfo;

export function getAllSensorInfos(): AllSensorInfos;
export function getAccelerometerData(): AccelerometerData;
export function getGyroscopeData(): GyroscopeData;
export function getMagnetometerData(): MagnetometerData;
export function getLightData(): LightData;
export function getProximityData(): ProximityData;
export function getBarometerData(): BarometerData;
export function getTemperatureData(): TemperatureData;
export function getHumidityData(): HumidityData;
