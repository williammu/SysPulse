import sensor from '@ohos.sensor';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'SensorUtil';

// 传感器数据模型
export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export interface GyroscopeData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export interface LightData {
  intensity: number;
  timestamp: number;
}

export interface ProximityData {
  distance: number;
  timestamp: number;
}

export interface MagneticFieldData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export interface OrientationData {
  alpha: number;
  beta: number;
  gamma: number;
  timestamp: number;
}

export class SensorUtil {
  // 订阅加速度传感器
  static subscribeAccelerometer(callback: (data: AccelerometerData) => void): void {
    try {
      sensor.on(sensor.SensorId.ACCELEROMETER, (data) => {
        callback({
          x: data.x,
          y: data.y,
          z: data.z,
          timestamp: data.timestamp
        });
      });
      hilog.info(0x0000, TAG, 'Subscribed to accelerometer');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Subscribe accelerometer error: %{public}s', String(error));
    }
  }

  // 取消订阅加速度传感器
  static unsubscribeAccelerometer(): void {
    try {
      sensor.off(sensor.SensorId.ACCELEROMETER);
      hilog.info(0x0000, TAG, 'Unsubscribed from accelerometer');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Unsubscribe accelerometer error: %{public}s', String(error));
    }
  }

  // 订阅陀螺仪
  static subscribeGyroscope(callback: (data: GyroscopeData) => void): void {
    try {
      sensor.on(sensor.SensorId.GYROSCOPE, (data) => {
        callback({
          x: data.x,
          y: data.y,
          z: data.z,
          timestamp: data.timestamp
        });
      });
      hilog.info(0x0000, TAG, 'Subscribed to gyroscope');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Subscribe gyroscope error: %{public}s', String(error));
    }
  }

  // 取消订阅陀螺仪
  static unsubscribeGyroscope(): void {
    try {
      sensor.off(sensor.SensorId.GYROSCOPE);
      hilog.info(0x0000, TAG, 'Unsubscribed from gyroscope');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Unsubscribe gyroscope error: %{public}s', String(error));
    }
  }

  // 订阅光线传感器
  static subscribeLight(callback: (data: LightData) => void): void {
    try {
      sensor.on(sensor.SensorId.AMBIENT_LIGHT, (data) => {
        callback({
          intensity: data.intensity,
          timestamp: data.timestamp
        });
      });
      hilog.info(0x0000, TAG, 'Subscribed to light sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Subscribe light sensor error: %{public}s', String(error));
    }
  }

  // 取消订阅光线传感器
  static unsubscribeLight(): void {
    try {
      sensor.off(sensor.SensorId.AMBIENT_LIGHT);
      hilog.info(0x0000, TAG, 'Unsubscribed from light sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Unsubscribe light sensor error: %{public}s', String(error));
    }
  }

  // 订阅距离传感器
  static subscribeProximity(callback: (data: ProximityData) => void): void {
    try {
      sensor.on(sensor.SensorId.PROXIMITY, (data) => {
        callback({
          distance: data.distance,
          timestamp: data.timestamp
        });
      });
      hilog.info(0x0000, TAG, 'Subscribed to proximity sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Subscribe proximity sensor error: %{public}s', String(error));
    }
  }

  // 取消订阅距离传感器
  static unsubscribeProximity(): void {
    try {
      sensor.off(sensor.SensorId.PROXIMITY);
      hilog.info(0x0000, TAG, 'Unsubscribed from proximity sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Unsubscribe proximity sensor error: %{public}s', String(error));
    }
  }

  // 订阅磁场传感器
  static subscribeMagneticField(callback: (data: MagneticFieldData) => void): void {
    try {
      sensor.on(sensor.SensorId.MAGNETIC_FIELD, (data) => {
        callback({
          x: data.x,
          y: data.y,
          z: data.z,
          timestamp: data.timestamp
        });
      });
      hilog.info(0x0000, TAG, 'Subscribed to magnetic field sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Subscribe magnetic field sensor error: %{public}s', String(error));
    }
  }

  // 取消订阅磁场传感器
  static unsubscribeMagneticField(): void {
    try {
      sensor.off(sensor.SensorId.MAGNETIC_FIELD);
      hilog.info(0x0000, TAG, 'Unsubscribed from magnetic field sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Unsubscribe magnetic field sensor error: %{public}s', String(error));
    }
  }

  // 订阅方向传感器
  static subscribeOrientation(callback: (data: OrientationData) => void): void {
    try {
      sensor.on(sensor.SensorId.ORIENTATION, (data) => {
        callback({
          alpha: data.alpha,
          beta: data.beta,
          gamma: data.gamma,
          timestamp: data.timestamp
        });
      });
      hilog.info(0x0000, TAG, 'Subscribed to orientation sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Subscribe orientation sensor error: %{public}s', String(error));
    }
  }

  // 取消订阅方向传感器
  static unsubscribeOrientation(): void {
    try {
      sensor.off(sensor.SensorId.ORIENTATION);
      hilog.info(0x0000, TAG, 'Unsubscribed from orientation sensor');
    } catch (error) {
      hilog.error(0x0000, TAG, 'Unsubscribe orientation sensor error: %{public}s', String(error));
    }
  }
}
