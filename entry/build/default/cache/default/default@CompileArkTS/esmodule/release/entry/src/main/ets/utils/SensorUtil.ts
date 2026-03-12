import sensor from "@ohos:sensor";
import hilog from "@ohos:hilog";
const TAG = 'SensorUtil';
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
    static subscribeAccelerometer(h27: (data: AccelerometerData) => void): void {
        try {
            sensor.on(sensor.SensorId.ACCELEROMETER, (j27) => {
                h27({
                    x: j27.x,
                    y: j27.y,
                    z: j27.z,
                    timestamp: j27.timestamp
                });
            });
            hilog.info(0x0000, TAG, 'Subscribed to accelerometer');
        }
        catch (i27) {
            hilog.error(0x0000, TAG, 'Subscribe accelerometer error: %{public}s', String(i27));
        }
    }
    static unsubscribeAccelerometer(): void {
        try {
            sensor.off(sensor.SensorId.ACCELEROMETER);
            hilog.info(0x0000, TAG, 'Unsubscribed from accelerometer');
        }
        catch (g27) {
            hilog.error(0x0000, TAG, 'Unsubscribe accelerometer error: %{public}s', String(g27));
        }
    }
    static subscribeGyroscope(d27: (data: GyroscopeData) => void): void {
        try {
            sensor.on(sensor.SensorId.GYROSCOPE, (f27) => {
                d27({
                    x: f27.x,
                    y: f27.y,
                    z: f27.z,
                    timestamp: f27.timestamp
                });
            });
            hilog.info(0x0000, TAG, 'Subscribed to gyroscope');
        }
        catch (e27) {
            hilog.error(0x0000, TAG, 'Subscribe gyroscope error: %{public}s', String(e27));
        }
    }
    static unsubscribeGyroscope(): void {
        try {
            sensor.off(sensor.SensorId.GYROSCOPE);
            hilog.info(0x0000, TAG, 'Unsubscribed from gyroscope');
        }
        catch (c27) {
            hilog.error(0x0000, TAG, 'Unsubscribe gyroscope error: %{public}s', String(c27));
        }
    }
    static subscribeLight(z26: (data: LightData) => void): void {
        try {
            sensor.on(sensor.SensorId.AMBIENT_LIGHT, (b27) => {
                z26({
                    intensity: b27.intensity,
                    timestamp: b27.timestamp
                });
            });
            hilog.info(0x0000, TAG, 'Subscribed to light sensor');
        }
        catch (a27) {
            hilog.error(0x0000, TAG, 'Subscribe light sensor error: %{public}s', String(a27));
        }
    }
    static unsubscribeLight(): void {
        try {
            sensor.off(sensor.SensorId.AMBIENT_LIGHT);
            hilog.info(0x0000, TAG, 'Unsubscribed from light sensor');
        }
        catch (y26) {
            hilog.error(0x0000, TAG, 'Unsubscribe light sensor error: %{public}s', String(y26));
        }
    }
    static subscribeProximity(v26: (data: ProximityData) => void): void {
        try {
            sensor.on(sensor.SensorId.PROXIMITY, (x26) => {
                v26({
                    distance: x26.distance,
                    timestamp: x26.timestamp
                });
            });
            hilog.info(0x0000, TAG, 'Subscribed to proximity sensor');
        }
        catch (w26) {
            hilog.error(0x0000, TAG, 'Subscribe proximity sensor error: %{public}s', String(w26));
        }
    }
    static unsubscribeProximity(): void {
        try {
            sensor.off(sensor.SensorId.PROXIMITY);
            hilog.info(0x0000, TAG, 'Unsubscribed from proximity sensor');
        }
        catch (u26) {
            hilog.error(0x0000, TAG, 'Unsubscribe proximity sensor error: %{public}s', String(u26));
        }
    }
    static subscribeMagneticField(r26: (data: MagneticFieldData) => void): void {
        try {
            sensor.on(sensor.SensorId.MAGNETIC_FIELD, (t26) => {
                r26({
                    x: t26.x,
                    y: t26.y,
                    z: t26.z,
                    timestamp: t26.timestamp
                });
            });
            hilog.info(0x0000, TAG, 'Subscribed to magnetic field sensor');
        }
        catch (s26) {
            hilog.error(0x0000, TAG, 'Subscribe magnetic field sensor error: %{public}s', String(s26));
        }
    }
    static unsubscribeMagneticField(): void {
        try {
            sensor.off(sensor.SensorId.MAGNETIC_FIELD);
            hilog.info(0x0000, TAG, 'Unsubscribed from magnetic field sensor');
        }
        catch (q26) {
            hilog.error(0x0000, TAG, 'Unsubscribe magnetic field sensor error: %{public}s', String(q26));
        }
    }
    static subscribeOrientation(n26: (data: OrientationData) => void): void {
        try {
            sensor.on(sensor.SensorId.ORIENTATION, (p26) => {
                n26({
                    alpha: p26.alpha,
                    beta: p26.beta,
                    gamma: p26.gamma,
                    timestamp: p26.timestamp
                });
            });
            hilog.info(0x0000, TAG, 'Subscribed to orientation sensor');
        }
        catch (o26) {
            hilog.error(0x0000, TAG, 'Subscribe orientation sensor error: %{public}s', String(o26));
        }
    }
    static unsubscribeOrientation(): void {
        try {
            sensor.off(sensor.SensorId.ORIENTATION);
            hilog.info(0x0000, TAG, 'Unsubscribed from orientation sensor');
        }
        catch (m26) {
            hilog.error(0x0000, TAG, 'Unsubscribe orientation sensor error: %{public}s', String(m26));
        }
    }
}
