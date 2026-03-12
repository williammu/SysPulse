export interface DeviceInfoModel {
  deviceType: string;
  manufacture: string;
  brand: string;
  marketName: string;
  productSeries: string;
  productModel: string;
  productModelAlias: string;
  softwareModel: string;
  hardwareModel: string;
  bootloaderVersion: string;
  abiList: string;
  securityPatchTag: string;
  displayVersion: string;
  incrementalVersion: string;
  osReleaseType: string;
  osFullName: string;
  majorVersion: number;
  seniorVersion: number;
  featureVersion: number;
  buildVersion: number;
  sdkApiVersion: number;
  firstApiVersion: number;
  versionId: string;
  buildType: string;
  buildUser: string;
  buildHost: string;
  buildTime: string;
  buildRootHash: string;
  udid: string;
  distributionOSName: string;
  distributionOSVersion: string;
  distributionOSApiVersion: number;
  distributionOSApiName: string;
  distributionOSReleaseType: string;
  odid: string;
  diskSN: string;
  performanceClass: number;
  chipType: string;
  bootCount: number;
}

export interface BatteryInfoModel {
  batterySOC: number;
  chargingStatus: number;
  healthStatus: number;
  pluggedType: number;
  voltage: number;
  technology: string;
  batteryTemperature: number;
  isBatteryPresent: boolean;
  batteryCapacityLevel: number;
  nowCurrent: number;
}

export interface DisplayInfoModel {
  id: number;
  name: string;
  alive: boolean;
  state: number;
  refreshRate: number;
  rotation: number;
  width: number;
  height: number;
  densityDPI: number;
  densityPixels: number;
  scaledDensity: number;
  xDPI: number;
  yDPI: number;
}

export interface StorageInfoModel {
  totalSize: number;
  freeSize: number;
  usedSize: number;
}

export interface NetworkInfoModel {
  netType: string;
  capabilities: number[];
  bearerTypes: number[];
}

export interface MemoryInfoModel {
  total: number;
  available: number;
  used: number;
}

export interface CpuInfoModel {
  model: string;
  cores: number;
  architecture: string;
  process: string;
}
