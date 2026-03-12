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
    constructor(j29, k29, l29, m29 = -1, n29 = undefined, o29) {
        super(j29, l29, m29, o29);
        if (typeof n29 === "function") {
            this.paramsGenerator_ = n29;
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
        this.setInitiallyProvidedValue(k29);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(i29: SensorPage_Params) {
        if (i29.accelerometerData !== undefined) {
            this.accelerometerData = i29.accelerometerData;
        }
        if (i29.gyroscopeData !== undefined) {
            this.gyroscopeData = i29.gyroscopeData;
        }
        if (i29.lightData !== undefined) {
            this.lightData = i29.lightData;
        }
        if (i29.proximityData !== undefined) {
            this.proximityData = i29.proximityData;
        }
        if (i29.magneticFieldData !== undefined) {
            this.magneticFieldData = i29.magneticFieldData;
        }
        if (i29.orientationData !== undefined) {
            this.orientationData = i29.orientationData;
        }
        if (i29.hasAccelerometer !== undefined) {
            this.hasAccelerometer = i29.hasAccelerometer;
        }
        if (i29.hasGyroscope !== undefined) {
            this.hasGyroscope = i29.hasGyroscope;
        }
        if (i29.hasLight !== undefined) {
            this.hasLight = i29.hasLight;
        }
        if (i29.hasProximity !== undefined) {
            this.hasProximity = i29.hasProximity;
        }
        if (i29.hasMagneticField !== undefined) {
            this.hasMagneticField = i29.hasMagneticField;
        }
        if (i29.hasOrientation !== undefined) {
            this.hasOrientation = i29.hasOrientation;
        }
    }
    updateStateVars(h29: SensorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(g29) {
        this.__accelerometerData.purgeDependencyOnElmtId(g29);
        this.__gyroscopeData.purgeDependencyOnElmtId(g29);
        this.__lightData.purgeDependencyOnElmtId(g29);
        this.__proximityData.purgeDependencyOnElmtId(g29);
        this.__magneticFieldData.purgeDependencyOnElmtId(g29);
        this.__orientationData.purgeDependencyOnElmtId(g29);
        this.__hasAccelerometer.purgeDependencyOnElmtId(g29);
        this.__hasGyroscope.purgeDependencyOnElmtId(g29);
        this.__hasLight.purgeDependencyOnElmtId(g29);
        this.__hasProximity.purgeDependencyOnElmtId(g29);
        this.__hasMagneticField.purgeDependencyOnElmtId(g29);
        this.__hasOrientation.purgeDependencyOnElmtId(g29);
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
    set accelerometerData(f29: AccelerometerData | null) {
        this.__accelerometerData.set(f29);
    }
    private __gyroscopeData: ObservedPropertyObjectPU<GyroscopeData | null>;
    get gyroscopeData() {
        return this.__gyroscopeData.get();
    }
    set gyroscopeData(e29: GyroscopeData | null) {
        this.__gyroscopeData.set(e29);
    }
    private __lightData: ObservedPropertyObjectPU<LightData | null>;
    get lightData() {
        return this.__lightData.get();
    }
    set lightData(d29: LightData | null) {
        this.__lightData.set(d29);
    }
    private __proximityData: ObservedPropertyObjectPU<ProximityData | null>;
    get proximityData() {
        return this.__proximityData.get();
    }
    set proximityData(c29: ProximityData | null) {
        this.__proximityData.set(c29);
    }
    private __magneticFieldData: ObservedPropertyObjectPU<MagneticFieldData | null>;
    get magneticFieldData() {
        return this.__magneticFieldData.get();
    }
    set magneticFieldData(b29: MagneticFieldData | null) {
        this.__magneticFieldData.set(b29);
    }
    private __orientationData: ObservedPropertyObjectPU<OrientationData | null>;
    get orientationData() {
        return this.__orientationData.get();
    }
    set orientationData(a29: OrientationData | null) {
        this.__orientationData.set(a29);
    }
    private __hasAccelerometer: ObservedPropertySimplePU<boolean>;
    get hasAccelerometer() {
        return this.__hasAccelerometer.get();
    }
    set hasAccelerometer(z28: boolean) {
        this.__hasAccelerometer.set(z28);
    }
    private __hasGyroscope: ObservedPropertySimplePU<boolean>;
    get hasGyroscope() {
        return this.__hasGyroscope.get();
    }
    set hasGyroscope(y28: boolean) {
        this.__hasGyroscope.set(y28);
    }
    private __hasLight: ObservedPropertySimplePU<boolean>;
    get hasLight() {
        return this.__hasLight.get();
    }
    set hasLight(x28: boolean) {
        this.__hasLight.set(x28);
    }
    private __hasProximity: ObservedPropertySimplePU<boolean>;
    get hasProximity() {
        return this.__hasProximity.get();
    }
    set hasProximity(w28: boolean) {
        this.__hasProximity.set(w28);
    }
    private __hasMagneticField: ObservedPropertySimplePU<boolean>;
    get hasMagneticField() {
        return this.__hasMagneticField.get();
    }
    set hasMagneticField(v28: boolean) {
        this.__hasMagneticField.set(v28);
    }
    private __hasOrientation: ObservedPropertySimplePU<boolean>;
    get hasOrientation() {
        return this.__hasOrientation.get();
    }
    set hasOrientation(u28: boolean) {
        this.__hasOrientation.set(u28);
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
            SensorUtil.subscribeAccelerometer((t28) => {
                this.accelerometerData = t28;
                this.hasAccelerometer = true;
            });
            this.hasAccelerometer = true;
        }
        catch (s28) {
            hilog.warn(0x0000, TAG, 'Accelerometer not available');
        }
        try {
            SensorUtil.subscribeGyroscope((r28) => {
                this.gyroscopeData = r28;
                this.hasGyroscope = true;
            });
            this.hasGyroscope = true;
        }
        catch (q28) {
            hilog.warn(0x0000, TAG, 'Gyroscope not available');
        }
        try {
            SensorUtil.subscribeLight((p28) => {
                this.lightData = p28;
                this.hasLight = true;
            });
            this.hasLight = true;
        }
        catch (o28) {
            hilog.warn(0x0000, TAG, 'Light sensor not available');
        }
        try {
            SensorUtil.subscribeProximity((n28) => {
                this.proximityData = n28;
                this.hasProximity = true;
            });
            this.hasProximity = true;
        }
        catch (m28) {
            hilog.warn(0x0000, TAG, 'Proximity sensor not available');
        }
        try {
            SensorUtil.subscribeMagneticField((l28) => {
                this.magneticFieldData = l28;
                this.hasMagneticField = true;
            });
            this.hasMagneticField = true;
        }
        catch (k28) {
            hilog.warn(0x0000, TAG, 'Magnetic field sensor not available');
        }
        try {
            SensorUtil.subscribeOrientation((j28) => {
                this.orientationData = j28;
                this.hasOrientation = true;
            });
            this.hasOrientation = true;
        }
        catch (i28) {
            hilog.warn(0x0000, TAG, 'Orientation sensor not available');
        }
    }
    DataDescription(e28: string, f28 = null) {
        this.observeComponentCreation2((g28, h28) => {
            Text.create(e28);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((c28, d28) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((a28, b28) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((y27, z27) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((w27, x27) => {
            Text.create('传感器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((u27, v27) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((s27, t27) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((y26, z26) => {
            If.create();
            if (this.hasAccelerometer) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((o27, p27) => {
                            if (p27) {
                                let q27 = new SectionHeader(this, { title: '加速度传感器' }, undefined, o27, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 157, col: 13 });
                                ViewPU.create(q27);
                                let r27 = () => {
                                    return {
                                        title: '加速度传感器'
                                    };
                                };
                                q27.paramsGenerator_ = r27;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o27, {
                                    title: '加速度传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的加速度，单位 m/s²。用于检测设备的运动状态、倾斜角度等。');
                    this.observeComponentCreation2((a27, b27) => {
                        If.create();
                        if (this.accelerometerData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((k27, l27) => {
                                        if (l27) {
                                            let m27 = new InfoCard(this, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            }, undefined, k27, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 161, col: 15 });
                                            ViewPU.create(m27);
                                            let n27 = () => {
                                                return {
                                                    title: 'X 轴',
                                                    value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                                };
                                            };
                                            m27.paramsGenerator_ = n27;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(k27, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((g27, h27) => {
                                        if (h27) {
                                            let i27 = new InfoCard(this, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            }, undefined, g27, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 166, col: 15 });
                                            ViewPU.create(i27);
                                            let j27 = () => {
                                                return {
                                                    title: 'Y 轴',
                                                    value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                                };
                                            };
                                            i27.paramsGenerator_ = j27;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(g27, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((c27, d27) => {
                                        if (d27) {
                                            let e27 = new InfoCard(this, {
                                                title: 'Z 轴',
                                                value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                            }, undefined, c27, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 171, col: 15 });
                                            ViewPU.create(e27);
                                            let f27 = () => {
                                                return {
                                                    title: 'Z 轴',
                                                    value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                                };
                                            };
                                            e27.paramsGenerator_ = f27;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(c27, {
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
        this.observeComponentCreation2((e26, f26) => {
            If.create();
            if (this.hasGyroscope) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((u26, v26) => {
                            if (v26) {
                                let w26 = new SectionHeader(this, { title: '陀螺仪' }, undefined, u26, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 180, col: 13 });
                                ViewPU.create(w26);
                                let x26 = () => {
                                    return {
                                        title: '陀螺仪'
                                    };
                                };
                                w26.paramsGenerator_ = x26;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(u26, {
                                    title: '陀螺仪'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的角速度，单位 rad/s。用于检测设备的旋转、转向等动作。');
                    this.observeComponentCreation2((g26, h26) => {
                        If.create();
                        if (this.gyroscopeData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((q26, r26) => {
                                        if (r26) {
                                            let s26 = new InfoCard(this, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            }, undefined, q26, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 184, col: 15 });
                                            ViewPU.create(s26);
                                            let t26 = () => {
                                                return {
                                                    title: 'X 轴角速度',
                                                    value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                                };
                                            };
                                            s26.paramsGenerator_ = t26;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q26, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((m26, n26) => {
                                        if (n26) {
                                            let o26 = new InfoCard(this, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            }, undefined, m26, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 189, col: 15 });
                                            ViewPU.create(o26);
                                            let p26 = () => {
                                                return {
                                                    title: 'Y 轴角速度',
                                                    value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                                };
                                            };
                                            o26.paramsGenerator_ = p26;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(m26, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((i26, j26) => {
                                        if (j26) {
                                            let k26 = new InfoCard(this, {
                                                title: 'Z 轴角速度',
                                                value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                            }, undefined, i26, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 194, col: 15 });
                                            ViewPU.create(k26);
                                            let l26 = () => {
                                                return {
                                                    title: 'Z 轴角速度',
                                                    value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                                };
                                            };
                                            k26.paramsGenerator_ = l26;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(i26, {
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
        this.observeComponentCreation2((s25, t25) => {
            If.create();
            if (this.hasLight) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((a26, b26) => {
                            if (b26) {
                                let c26 = new SectionHeader(this, { title: '光线传感器' }, undefined, a26, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 203, col: 13 });
                                ViewPU.create(c26);
                                let d26 = () => {
                                    return {
                                        title: '光线传感器'
                                    };
                                };
                                c26.paramsGenerator_ = d26;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a26, {
                                    title: '光线传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量环境光强度，单位 lux。用于自动调节屏幕亮度、切换暗黑模式等。');
                    this.observeComponentCreation2((u25, v25) => {
                        If.create();
                        if (this.lightData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((w25, x25) => {
                                        if (x25) {
                                            let y25 = new InfoCard(this, {
                                                title: '光强度',
                                                value: `${this.lightData.intensity.toFixed(0)} lux`
                                            }, undefined, w25, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 207, col: 15 });
                                            ViewPU.create(y25);
                                            let z25 = () => {
                                                return {
                                                    title: '光强度',
                                                    value: `${this.lightData.intensity.toFixed(0)} lux`
                                                };
                                            };
                                            y25.paramsGenerator_ = z25;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(w25, {
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
        this.observeComponentCreation2((g25, h25) => {
            If.create();
            if (this.hasProximity) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((o25, p25) => {
                            if (p25) {
                                let q25 = new SectionHeader(this, { title: '距离传感器' }, undefined, o25, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 216, col: 13 });
                                ViewPU.create(q25);
                                let r25 = () => {
                                    return {
                                        title: '距离传感器'
                                    };
                                };
                                q25.paramsGenerator_ = r25;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o25, {
                                    title: '距离传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备与遮挡物之间的距离，单位 cm。用于通话时自动息屏、接近检测等。');
                    this.observeComponentCreation2((i25, j25) => {
                        If.create();
                        if (this.proximityData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((k25, l25) => {
                                        if (l25) {
                                            let m25 = new InfoCard(this, {
                                                title: '距离',
                                                value: `${this.proximityData.distance.toFixed(0)} cm`
                                            }, undefined, k25, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 220, col: 15 });
                                            ViewPU.create(m25);
                                            let n25 = () => {
                                                return {
                                                    title: '距离',
                                                    value: `${this.proximityData.distance.toFixed(0)} cm`
                                                };
                                            };
                                            m25.paramsGenerator_ = n25;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(k25, {
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
        this.observeComponentCreation2((m24, n24) => {
            If.create();
            if (this.hasMagneticField) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((c25, d25) => {
                            if (d25) {
                                let e25 = new SectionHeader(this, { title: '磁场传感器' }, undefined, c25, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 229, col: 13 });
                                ViewPU.create(e25);
                                let f25 = () => {
                                    return {
                                        title: '磁场传感器'
                                    };
                                };
                                e25.paramsGenerator_ = f25;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c25, {
                                    title: '磁场传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备周围的磁场强度，单位 μT。用于电子罗盘、方向检测等。');
                    this.observeComponentCreation2((o24, p24) => {
                        If.create();
                        if (this.magneticFieldData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((y24, z24) => {
                                        if (z24) {
                                            let a25 = new InfoCard(this, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            }, undefined, y24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 233, col: 15 });
                                            ViewPU.create(a25);
                                            let b25 = () => {
                                                return {
                                                    title: 'X 轴磁场',
                                                    value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                                };
                                            };
                                            a25.paramsGenerator_ = b25;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(y24, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((u24, v24) => {
                                        if (v24) {
                                            let w24 = new InfoCard(this, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            }, undefined, u24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 238, col: 15 });
                                            ViewPU.create(w24);
                                            let x24 = () => {
                                                return {
                                                    title: 'Y 轴磁场',
                                                    value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                                };
                                            };
                                            w24.paramsGenerator_ = x24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(u24, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((q24, r24) => {
                                        if (r24) {
                                            let s24 = new InfoCard(this, {
                                                title: 'Z 轴磁场',
                                                value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                            }, undefined, q24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 243, col: 15 });
                                            ViewPU.create(s24);
                                            let t24 = () => {
                                                return {
                                                    title: 'Z 轴磁场',
                                                    value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                                };
                                            };
                                            s24.paramsGenerator_ = t24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q24, {
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
        this.observeComponentCreation2((s23, t23) => {
            If.create();
            if (this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((i24, j24) => {
                            if (j24) {
                                let k24 = new SectionHeader(this, { title: '方向传感器' }, undefined, i24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 252, col: 13 });
                                ViewPU.create(k24);
                                let l24 = () => {
                                    return {
                                        title: '方向传感器'
                                    };
                                };
                                k24.paramsGenerator_ = l24;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(i24, {
                                    title: '方向传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备的方位角度。Alpha: 方位角(0-360°)，Beta: 俯仰角(-180-180°)，Gamma: 翻滚角(-90-90°)。');
                    this.observeComponentCreation2((u23, v23) => {
                        If.create();
                        if (this.orientationData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((e24, f24) => {
                                        if (f24) {
                                            let g24 = new InfoCard(this, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            }, undefined, e24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 256, col: 15 });
                                            ViewPU.create(g24);
                                            let h24 = () => {
                                                return {
                                                    title: '方位角 (Alpha)',
                                                    value: `${this.orientationData.alpha.toFixed(1)}°`
                                                };
                                            };
                                            g24.paramsGenerator_ = h24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(e24, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((a24, b24) => {
                                        if (b24) {
                                            let c24 = new InfoCard(this, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            }, undefined, a24, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 261, col: 15 });
                                            ViewPU.create(c24);
                                            let d24 = () => {
                                                return {
                                                    title: '俯仰角 (Beta)',
                                                    value: `${this.orientationData.beta.toFixed(1)}°`
                                                };
                                            };
                                            c24.paramsGenerator_ = d24;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(a24, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((w23, x23) => {
                                        if (x23) {
                                            let y23 = new InfoCard(this, {
                                                title: '翻滚角 (Gamma)',
                                                value: `${this.orientationData.gamma.toFixed(1)}°`
                                            }, undefined, w23, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 266, col: 15 });
                                            ViewPU.create(y23);
                                            let z23 = () => {
                                                return {
                                                    title: '翻滚角 (Gamma)',
                                                    value: `${this.orientationData.gamma.toFixed(1)}°`
                                                };
                                            };
                                            y23.paramsGenerator_ = z23;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(w23, {
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
        this.observeComponentCreation2((k23, l23) => {
            If.create();
            if (!this.hasAccelerometer && !this.hasGyroscope && !this.hasLight &&
                !this.hasProximity && !this.hasMagneticField && !this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((q23, r23) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((o23, p23) => {
                        Text.create('未检测到传感器');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((m23, n23) => {
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
