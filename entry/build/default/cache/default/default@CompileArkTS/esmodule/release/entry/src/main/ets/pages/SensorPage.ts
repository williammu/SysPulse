if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SensorPage_Params {
    accelerometerData?: AccelerometerData | null;
    gyroscopeData?: GyroscopeData | null;
    lightData?: LightData | null;
    proximityData?: ProximityData | null;
    magneticFieldData?: MagneticFieldData | null;
    orientationData?: OrientationData | null;
    hasAccelerometer?: boolean;
    hasGyroscope?: boolean;
    hasLight?: boolean;
    hasProximity?: boolean;
    hasMagneticField?: boolean;
    hasOrientation?: boolean;
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { SensorUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/SensorUtil";
import type { AccelerometerData, GyroscopeData, LightData, ProximityData, MagneticFieldData, OrientationData } from "@bundle:com.huawei.sysinfo/entry/ets/utils/SensorUtil";
import hilog from "@ohos:hilog";
const TAG = 'SensorPage';
class SensorPage extends ViewPU {
    constructor(g26, h26, i26, j26 = -1, k26 = undefined, l26) {
        super(g26, i26, j26, l26);
        if (typeof k26 === "function") {
            this.paramsGenerator_ = k26;
        }
        this.__accelerometerData = new ObservedPropertyObjectPU(null, this, "accelerometerData");
        this.__gyroscopeData = new ObservedPropertyObjectPU(null, this, "gyroscopeData");
        this.__lightData = new ObservedPropertyObjectPU(null, this, "lightData");
        this.__proximityData = new ObservedPropertyObjectPU(null, this, "proximityData");
        this.__magneticFieldData = new ObservedPropertyObjectPU(null, this, "magneticFieldData");
        this.__orientationData = new ObservedPropertyObjectPU(null, this, "orientationData");
        this.__hasAccelerometer = new ObservedPropertySimplePU(false, this, "hasAccelerometer");
        this.__hasGyroscope = new ObservedPropertySimplePU(false, this, "hasGyroscope");
        this.__hasLight = new ObservedPropertySimplePU(false, this, "hasLight");
        this.__hasProximity = new ObservedPropertySimplePU(false, this, "hasProximity");
        this.__hasMagneticField = new ObservedPropertySimplePU(false, this, "hasMagneticField");
        this.__hasOrientation = new ObservedPropertySimplePU(false, this, "hasOrientation");
        this.setInitiallyProvidedValue(h26);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(f26: SensorPage_Params) {
        if (f26.accelerometerData !== undefined) {
            this.accelerometerData = f26.accelerometerData;
        }
        if (f26.gyroscopeData !== undefined) {
            this.gyroscopeData = f26.gyroscopeData;
        }
        if (f26.lightData !== undefined) {
            this.lightData = f26.lightData;
        }
        if (f26.proximityData !== undefined) {
            this.proximityData = f26.proximityData;
        }
        if (f26.magneticFieldData !== undefined) {
            this.magneticFieldData = f26.magneticFieldData;
        }
        if (f26.orientationData !== undefined) {
            this.orientationData = f26.orientationData;
        }
        if (f26.hasAccelerometer !== undefined) {
            this.hasAccelerometer = f26.hasAccelerometer;
        }
        if (f26.hasGyroscope !== undefined) {
            this.hasGyroscope = f26.hasGyroscope;
        }
        if (f26.hasLight !== undefined) {
            this.hasLight = f26.hasLight;
        }
        if (f26.hasProximity !== undefined) {
            this.hasProximity = f26.hasProximity;
        }
        if (f26.hasMagneticField !== undefined) {
            this.hasMagneticField = f26.hasMagneticField;
        }
        if (f26.hasOrientation !== undefined) {
            this.hasOrientation = f26.hasOrientation;
        }
    }
    updateStateVars(e26: SensorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(d26) {
        this.__accelerometerData.purgeDependencyOnElmtId(d26);
        this.__gyroscopeData.purgeDependencyOnElmtId(d26);
        this.__lightData.purgeDependencyOnElmtId(d26);
        this.__proximityData.purgeDependencyOnElmtId(d26);
        this.__magneticFieldData.purgeDependencyOnElmtId(d26);
        this.__orientationData.purgeDependencyOnElmtId(d26);
        this.__hasAccelerometer.purgeDependencyOnElmtId(d26);
        this.__hasGyroscope.purgeDependencyOnElmtId(d26);
        this.__hasLight.purgeDependencyOnElmtId(d26);
        this.__hasProximity.purgeDependencyOnElmtId(d26);
        this.__hasMagneticField.purgeDependencyOnElmtId(d26);
        this.__hasOrientation.purgeDependencyOnElmtId(d26);
    }
    aboutToBeDeleted() {
        this.__accelerometerData.aboutToBeDeleted();
        this.__gyroscopeData.aboutToBeDeleted();
        this.__lightData.aboutToBeDeleted();
        this.__proximityData.aboutToBeDeleted();
        this.__magneticFieldData.aboutToBeDeleted();
        this.__orientationData.aboutToBeDeleted();
        this.__hasAccelerometer.aboutToBeDeleted();
        this.__hasGyroscope.aboutToBeDeleted();
        this.__hasLight.aboutToBeDeleted();
        this.__hasProximity.aboutToBeDeleted();
        this.__hasMagneticField.aboutToBeDeleted();
        this.__hasOrientation.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __accelerometerData: ObservedPropertyObjectPU<AccelerometerData | null>;
    get accelerometerData() {
        return this.__accelerometerData.get();
    }
    set accelerometerData(c26: AccelerometerData | null) {
        this.__accelerometerData.set(c26);
    }
    private __gyroscopeData: ObservedPropertyObjectPU<GyroscopeData | null>;
    get gyroscopeData() {
        return this.__gyroscopeData.get();
    }
    set gyroscopeData(b26: GyroscopeData | null) {
        this.__gyroscopeData.set(b26);
    }
    private __lightData: ObservedPropertyObjectPU<LightData | null>;
    get lightData() {
        return this.__lightData.get();
    }
    set lightData(a26: LightData | null) {
        this.__lightData.set(a26);
    }
    private __proximityData: ObservedPropertyObjectPU<ProximityData | null>;
    get proximityData() {
        return this.__proximityData.get();
    }
    set proximityData(z25: ProximityData | null) {
        this.__proximityData.set(z25);
    }
    private __magneticFieldData: ObservedPropertyObjectPU<MagneticFieldData | null>;
    get magneticFieldData() {
        return this.__magneticFieldData.get();
    }
    set magneticFieldData(y25: MagneticFieldData | null) {
        this.__magneticFieldData.set(y25);
    }
    private __orientationData: ObservedPropertyObjectPU<OrientationData | null>;
    get orientationData() {
        return this.__orientationData.get();
    }
    set orientationData(x25: OrientationData | null) {
        this.__orientationData.set(x25);
    }
    private __hasAccelerometer: ObservedPropertySimplePU<boolean>;
    get hasAccelerometer() {
        return this.__hasAccelerometer.get();
    }
    set hasAccelerometer(w25: boolean) {
        this.__hasAccelerometer.set(w25);
    }
    private __hasGyroscope: ObservedPropertySimplePU<boolean>;
    get hasGyroscope() {
        return this.__hasGyroscope.get();
    }
    set hasGyroscope(v25: boolean) {
        this.__hasGyroscope.set(v25);
    }
    private __hasLight: ObservedPropertySimplePU<boolean>;
    get hasLight() {
        return this.__hasLight.get();
    }
    set hasLight(u25: boolean) {
        this.__hasLight.set(u25);
    }
    private __hasProximity: ObservedPropertySimplePU<boolean>;
    get hasProximity() {
        return this.__hasProximity.get();
    }
    set hasProximity(t25: boolean) {
        this.__hasProximity.set(t25);
    }
    private __hasMagneticField: ObservedPropertySimplePU<boolean>;
    get hasMagneticField() {
        return this.__hasMagneticField.get();
    }
    set hasMagneticField(s25: boolean) {
        this.__hasMagneticField.set(s25);
    }
    private __hasOrientation: ObservedPropertySimplePU<boolean>;
    get hasOrientation() {
        return this.__hasOrientation.get();
    }
    set hasOrientation(r25: boolean) {
        this.__hasOrientation.set(r25);
    }
    aboutToAppear() {
        hilog.info(0x0000, TAG, 'SensorPage aboutToAppear');
        this.trySubscribeSensors();
    }
    aboutToDisappear() {
        hilog.info(0x0000, TAG, 'SensorPage aboutToDisappear');
        if (this.hasAccelerometer) {
            SensorUtil.unsubscribeAccelerometer();
        }
        if (this.hasGyroscope) {
            SensorUtil.unsubscribeGyroscope();
        }
        if (this.hasLight) {
            SensorUtil.unsubscribeLight();
        }
        if (this.hasProximity) {
            SensorUtil.unsubscribeProximity();
        }
        if (this.hasMagneticField) {
            SensorUtil.unsubscribeMagneticField();
        }
        if (this.hasOrientation) {
            SensorUtil.unsubscribeOrientation();
        }
    }
    trySubscribeSensors() {
        try {
            SensorUtil.subscribeAccelerometer((q25) => {
                this.accelerometerData = q25;
                this.hasAccelerometer = true;
            });
            this.hasAccelerometer = true;
        }
        catch (p25) {
            hilog.warn(0x0000, TAG, 'Accelerometer not available');
        }
        try {
            SensorUtil.subscribeGyroscope((o25) => {
                this.gyroscopeData = o25;
                this.hasGyroscope = true;
            });
            this.hasGyroscope = true;
        }
        catch (n25) {
            hilog.warn(0x0000, TAG, 'Gyroscope not available');
        }
        try {
            SensorUtil.subscribeLight((m25) => {
                this.lightData = m25;
                this.hasLight = true;
            });
            this.hasLight = true;
        }
        catch (l25) {
            hilog.warn(0x0000, TAG, 'Light sensor not available');
        }
        try {
            SensorUtil.subscribeProximity((k25) => {
                this.proximityData = k25;
                this.hasProximity = true;
            });
            this.hasProximity = true;
        }
        catch (j25) {
            hilog.warn(0x0000, TAG, 'Proximity sensor not available');
        }
        try {
            SensorUtil.subscribeMagneticField((i25) => {
                this.magneticFieldData = i25;
                this.hasMagneticField = true;
            });
            this.hasMagneticField = true;
        }
        catch (h25) {
            hilog.warn(0x0000, TAG, 'Magnetic field sensor not available');
        }
        try {
            SensorUtil.subscribeOrientation((g25) => {
                this.orientationData = g25;
                this.hasOrientation = true;
            });
            this.hasOrientation = true;
        }
        catch (f25) {
            hilog.warn(0x0000, TAG, 'Orientation sensor not available');
        }
    }
    DataDescription(b25: string, c25 = null) {
        this.observeComponentCreation2((d25, e25) => {
            Text.create(b25);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((z24, a25) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((x24, y24) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((v24, w24) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((t24, u24) => {
            Text.create('传感器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((r24, s24) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((p24, q24) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((v23, w23) => {
            If.create();
            if (this.hasAccelerometer) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((l24, m24) => {
                            if (m24) {
                                let n24 = new SectionHeader(this, { title: '加速度传感器' }, undefined, l24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 156, col: 13 });
                                ViewPU.create(n24);
                                let o24 = () => {
                                    return {
                                        title: '加速度传感器'
                                    };
                                };
                                n24.paramsGenerator_ = o24;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l24, {
                                    title: '加速度传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的加速度，单位 m/s²。用于检测设备的运动状态、倾斜角度等。');
                    this.observeComponentCreation2((x23, y23) => {
                        If.create();
                        if (this.accelerometerData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((h24, i24) => {
                                        if (i24) {
                                            let j24 = new InfoCard(this, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            }, undefined, h24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 160, col: 15 });
                                            ViewPU.create(j24);
                                            let k24 = () => {
                                                return {
                                                    title: 'X 轴',
                                                    value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                                };
                                            };
                                            j24.paramsGenerator_ = k24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(h24, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((d24, e24) => {
                                        if (e24) {
                                            let f24 = new InfoCard(this, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            }, undefined, d24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 165, col: 15 });
                                            ViewPU.create(f24);
                                            let g24 = () => {
                                                return {
                                                    title: 'Y 轴',
                                                    value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                                };
                                            };
                                            f24.paramsGenerator_ = g24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(d24, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((z23, a24) => {
                                        if (a24) {
                                            let b24 = new InfoCard(this, {
                                                title: 'Z 轴',
                                                value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                            }, undefined, z23, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 170, col: 15 });
                                            ViewPU.create(b24);
                                            let c24 = () => {
                                                return {
                                                    title: 'Z 轴',
                                                    value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                                };
                                            };
                                            b24.paramsGenerator_ = c24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(z23, {
                                                title: 'Z 轴',
                                                value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((b23, c23) => {
            If.create();
            if (this.hasGyroscope) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((r23, s23) => {
                            if (s23) {
                                let t23 = new SectionHeader(this, { title: '陀螺仪' }, undefined, r23, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 179, col: 13 });
                                ViewPU.create(t23);
                                let u23 = () => {
                                    return {
                                        title: '陀螺仪'
                                    };
                                };
                                t23.paramsGenerator_ = u23;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r23, {
                                    title: '陀螺仪'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的角速度，单位 rad/s。用于检测设备的旋转、转向等动作。');
                    this.observeComponentCreation2((d23, e23) => {
                        If.create();
                        if (this.gyroscopeData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((n23, o23) => {
                                        if (o23) {
                                            let p23 = new InfoCard(this, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            }, undefined, n23, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 183, col: 15 });
                                            ViewPU.create(p23);
                                            let q23 = () => {
                                                return {
                                                    title: 'X 轴角速度',
                                                    value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                                };
                                            };
                                            p23.paramsGenerator_ = q23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(n23, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((j23, k23) => {
                                        if (k23) {
                                            let l23 = new InfoCard(this, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            }, undefined, j23, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 188, col: 15 });
                                            ViewPU.create(l23);
                                            let m23 = () => {
                                                return {
                                                    title: 'Y 轴角速度',
                                                    value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                                };
                                            };
                                            l23.paramsGenerator_ = m23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(j23, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((f23, g23) => {
                                        if (g23) {
                                            let h23 = new InfoCard(this, {
                                                title: 'Z 轴角速度',
                                                value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                            }, undefined, f23, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 193, col: 15 });
                                            ViewPU.create(h23);
                                            let i23 = () => {
                                                return {
                                                    title: 'Z 轴角速度',
                                                    value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                                };
                                            };
                                            h23.paramsGenerator_ = i23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(f23, {
                                                title: 'Z 轴角速度',
                                                value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((p22, q22) => {
            If.create();
            if (this.hasLight) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((x22, y22) => {
                            if (y22) {
                                let z22 = new SectionHeader(this, { title: '光线传感器' }, undefined, x22, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 202, col: 13 });
                                ViewPU.create(z22);
                                let a23 = () => {
                                    return {
                                        title: '光线传感器'
                                    };
                                };
                                z22.paramsGenerator_ = a23;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x22, {
                                    title: '光线传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量环境光强度，单位 lux。用于自动调节屏幕亮度、切换暗黑模式等。');
                    this.observeComponentCreation2((r22, s22) => {
                        If.create();
                        if (this.lightData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((t22, u22) => {
                                        if (u22) {
                                            let v22 = new InfoCard(this, {
                                                title: '光强度',
                                                value: `${this.lightData.intensity.toFixed(0)} lux`
                                            }, undefined, t22, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 206, col: 15 });
                                            ViewPU.create(v22);
                                            let w22 = () => {
                                                return {
                                                    title: '光强度',
                                                    value: `${this.lightData.intensity.toFixed(0)} lux`
                                                };
                                            };
                                            v22.paramsGenerator_ = w22;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(t22, {
                                                title: '光强度',
                                                value: `${this.lightData.intensity.toFixed(0)} lux`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((d22, e22) => {
            If.create();
            if (this.hasProximity) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((l22, m22) => {
                            if (m22) {
                                let n22 = new SectionHeader(this, { title: '距离传感器' }, undefined, l22, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 215, col: 13 });
                                ViewPU.create(n22);
                                let o22 = () => {
                                    return {
                                        title: '距离传感器'
                                    };
                                };
                                n22.paramsGenerator_ = o22;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l22, {
                                    title: '距离传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备与遮挡物之间的距离，单位 cm。用于通话时自动息屏、接近检测等。');
                    this.observeComponentCreation2((f22, g22) => {
                        If.create();
                        if (this.proximityData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((h22, i22) => {
                                        if (i22) {
                                            let j22 = new InfoCard(this, {
                                                title: '距离',
                                                value: `${this.proximityData.distance.toFixed(0)} cm`
                                            }, undefined, h22, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 219, col: 15 });
                                            ViewPU.create(j22);
                                            let k22 = () => {
                                                return {
                                                    title: '距离',
                                                    value: `${this.proximityData.distance.toFixed(0)} cm`
                                                };
                                            };
                                            j22.paramsGenerator_ = k22;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(h22, {
                                                title: '距离',
                                                value: `${this.proximityData.distance.toFixed(0)} cm`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((j21, k21) => {
            If.create();
            if (this.hasMagneticField) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((z21, a22) => {
                            if (a22) {
                                let b22 = new SectionHeader(this, { title: '磁场传感器' }, undefined, z21, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 228, col: 13 });
                                ViewPU.create(b22);
                                let c22 = () => {
                                    return {
                                        title: '磁场传感器'
                                    };
                                };
                                b22.paramsGenerator_ = c22;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z21, {
                                    title: '磁场传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备周围的磁场强度，单位 μT。用于电子罗盘、方向检测等。');
                    this.observeComponentCreation2((l21, m21) => {
                        If.create();
                        if (this.magneticFieldData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((v21, w21) => {
                                        if (w21) {
                                            let x21 = new InfoCard(this, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            }, undefined, v21, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 232, col: 15 });
                                            ViewPU.create(x21);
                                            let y21 = () => {
                                                return {
                                                    title: 'X 轴磁场',
                                                    value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                                };
                                            };
                                            x21.paramsGenerator_ = y21;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(v21, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((r21, s21) => {
                                        if (s21) {
                                            let t21 = new InfoCard(this, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            }, undefined, r21, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 237, col: 15 });
                                            ViewPU.create(t21);
                                            let u21 = () => {
                                                return {
                                                    title: 'Y 轴磁场',
                                                    value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                                };
                                            };
                                            t21.paramsGenerator_ = u21;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(r21, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((n21, o21) => {
                                        if (o21) {
                                            let p21 = new InfoCard(this, {
                                                title: 'Z 轴磁场',
                                                value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                            }, undefined, n21, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 242, col: 15 });
                                            ViewPU.create(p21);
                                            let q21 = () => {
                                                return {
                                                    title: 'Z 轴磁场',
                                                    value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                                };
                                            };
                                            p21.paramsGenerator_ = q21;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(n21, {
                                                title: 'Z 轴磁场',
                                                value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((p20, q20) => {
            If.create();
            if (this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((f21, g21) => {
                            if (g21) {
                                let h21 = new SectionHeader(this, { title: '方向传感器' }, undefined, f21, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 251, col: 13 });
                                ViewPU.create(h21);
                                let i21 = () => {
                                    return {
                                        title: '方向传感器'
                                    };
                                };
                                h21.paramsGenerator_ = i21;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f21, {
                                    title: '方向传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备的方位角度。Alpha: 方位角(0-360°)，Beta: 俯仰角(-180-180°)，Gamma: 翻滚角(-90-90°)。');
                    this.observeComponentCreation2((r20, s20) => {
                        If.create();
                        if (this.orientationData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((b21, c21) => {
                                        if (c21) {
                                            let d21 = new InfoCard(this, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            }, undefined, b21, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 255, col: 15 });
                                            ViewPU.create(d21);
                                            let e21 = () => {
                                                return {
                                                    title: '方位角 (Alpha)',
                                                    value: `${this.orientationData.alpha.toFixed(1)}°`
                                                };
                                            };
                                            d21.paramsGenerator_ = e21;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(b21, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((x20, y20) => {
                                        if (y20) {
                                            let z20 = new InfoCard(this, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            }, undefined, x20, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 260, col: 15 });
                                            ViewPU.create(z20);
                                            let a21 = () => {
                                                return {
                                                    title: '俯仰角 (Beta)',
                                                    value: `${this.orientationData.beta.toFixed(1)}°`
                                                };
                                            };
                                            z20.paramsGenerator_ = a21;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(x20, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((t20, u20) => {
                                        if (u20) {
                                            let v20 = new InfoCard(this, {
                                                title: '翻滚角 (Gamma)',
                                                value: `${this.orientationData.gamma.toFixed(1)}°`
                                            }, undefined, t20, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 265, col: 15 });
                                            ViewPU.create(v20);
                                            let w20 = () => {
                                                return {
                                                    title: '翻滚角 (Gamma)',
                                                    value: `${this.orientationData.gamma.toFixed(1)}°`
                                                };
                                            };
                                            v20.paramsGenerator_ = w20;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(t20, {
                                                title: '翻滚角 (Gamma)',
                                                value: `${this.orientationData.gamma.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((h20, i20) => {
            If.create();
            if (!this.hasAccelerometer && !this.hasGyroscope && !this.hasLight &&
                !this.hasProximity && !this.hasMagneticField && !this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((n20, o20) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((l20, m20) => {
                        Text.create('未检测到传感器');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((j20, k20) => {
                        Text.create('该设备可能没有可用的传感器或传感器权限未开启');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SensorPage";
    }
}
registerNamedRoute(() => new SensorPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/SensorPage", pageFullPath: "entry/src/main/ets/pages/SensorPage", integratedHsp: "false", moduleType: "followWithHap" });
