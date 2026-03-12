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
    constructor(m42, n42, o42, p42 = -1, q42 = undefined, r42) {
        super(m42, o42, p42, r42);
        if (typeof q42 === "function") {
            this.paramsGenerator_ = q42;
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
        this.setInitiallyProvidedValue(n42);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(l42: SensorPage_Params) {
        if (l42.accelerometerData !== undefined) {
            this.accelerometerData = l42.accelerometerData;
        }
        if (l42.gyroscopeData !== undefined) {
            this.gyroscopeData = l42.gyroscopeData;
        }
        if (l42.lightData !== undefined) {
            this.lightData = l42.lightData;
        }
        if (l42.proximityData !== undefined) {
            this.proximityData = l42.proximityData;
        }
        if (l42.magneticFieldData !== undefined) {
            this.magneticFieldData = l42.magneticFieldData;
        }
        if (l42.orientationData !== undefined) {
            this.orientationData = l42.orientationData;
        }
        if (l42.hasAccelerometer !== undefined) {
            this.hasAccelerometer = l42.hasAccelerometer;
        }
        if (l42.hasGyroscope !== undefined) {
            this.hasGyroscope = l42.hasGyroscope;
        }
        if (l42.hasLight !== undefined) {
            this.hasLight = l42.hasLight;
        }
        if (l42.hasProximity !== undefined) {
            this.hasProximity = l42.hasProximity;
        }
        if (l42.hasMagneticField !== undefined) {
            this.hasMagneticField = l42.hasMagneticField;
        }
        if (l42.hasOrientation !== undefined) {
            this.hasOrientation = l42.hasOrientation;
        }
    }
    updateStateVars(k42: SensorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(j42) {
        this.__accelerometerData.purgeDependencyOnElmtId(j42);
        this.__gyroscopeData.purgeDependencyOnElmtId(j42);
        this.__lightData.purgeDependencyOnElmtId(j42);
        this.__proximityData.purgeDependencyOnElmtId(j42);
        this.__magneticFieldData.purgeDependencyOnElmtId(j42);
        this.__orientationData.purgeDependencyOnElmtId(j42);
        this.__hasAccelerometer.purgeDependencyOnElmtId(j42);
        this.__hasGyroscope.purgeDependencyOnElmtId(j42);
        this.__hasLight.purgeDependencyOnElmtId(j42);
        this.__hasProximity.purgeDependencyOnElmtId(j42);
        this.__hasMagneticField.purgeDependencyOnElmtId(j42);
        this.__hasOrientation.purgeDependencyOnElmtId(j42);
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
    set accelerometerData(i42: AccelerometerData | null) {
        this.__accelerometerData.set(i42);
    }
    private __gyroscopeData: ObservedPropertyObjectPU<GyroscopeData | null>;
    get gyroscopeData() {
        return this.__gyroscopeData.get();
    }
    set gyroscopeData(h42: GyroscopeData | null) {
        this.__gyroscopeData.set(h42);
    }
    private __lightData: ObservedPropertyObjectPU<LightData | null>;
    get lightData() {
        return this.__lightData.get();
    }
    set lightData(g42: LightData | null) {
        this.__lightData.set(g42);
    }
    private __proximityData: ObservedPropertyObjectPU<ProximityData | null>;
    get proximityData() {
        return this.__proximityData.get();
    }
    set proximityData(f42: ProximityData | null) {
        this.__proximityData.set(f42);
    }
    private __magneticFieldData: ObservedPropertyObjectPU<MagneticFieldData | null>;
    get magneticFieldData() {
        return this.__magneticFieldData.get();
    }
    set magneticFieldData(e42: MagneticFieldData | null) {
        this.__magneticFieldData.set(e42);
    }
    private __orientationData: ObservedPropertyObjectPU<OrientationData | null>;
    get orientationData() {
        return this.__orientationData.get();
    }
    set orientationData(d42: OrientationData | null) {
        this.__orientationData.set(d42);
    }
    private __hasAccelerometer: ObservedPropertySimplePU<boolean>;
    get hasAccelerometer() {
        return this.__hasAccelerometer.get();
    }
    set hasAccelerometer(c42: boolean) {
        this.__hasAccelerometer.set(c42);
    }
    private __hasGyroscope: ObservedPropertySimplePU<boolean>;
    get hasGyroscope() {
        return this.__hasGyroscope.get();
    }
    set hasGyroscope(b42: boolean) {
        this.__hasGyroscope.set(b42);
    }
    private __hasLight: ObservedPropertySimplePU<boolean>;
    get hasLight() {
        return this.__hasLight.get();
    }
    set hasLight(a42: boolean) {
        this.__hasLight.set(a42);
    }
    private __hasProximity: ObservedPropertySimplePU<boolean>;
    get hasProximity() {
        return this.__hasProximity.get();
    }
    set hasProximity(z41: boolean) {
        this.__hasProximity.set(z41);
    }
    private __hasMagneticField: ObservedPropertySimplePU<boolean>;
    get hasMagneticField() {
        return this.__hasMagneticField.get();
    }
    set hasMagneticField(y41: boolean) {
        this.__hasMagneticField.set(y41);
    }
    private __hasOrientation: ObservedPropertySimplePU<boolean>;
    get hasOrientation() {
        return this.__hasOrientation.get();
    }
    set hasOrientation(x41: boolean) {
        this.__hasOrientation.set(x41);
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
            SensorUtil.subscribeAccelerometer((w41) => {
                this.accelerometerData = w41;
                this.hasAccelerometer = true;
            });
            this.hasAccelerometer = true;
        }
        catch (v41) {
            hilog.warn(0x0000, TAG, 'Accelerometer not available');
        }
        try {
            SensorUtil.subscribeGyroscope((u41) => {
                this.gyroscopeData = u41;
                this.hasGyroscope = true;
            });
            this.hasGyroscope = true;
        }
        catch (t41) {
            hilog.warn(0x0000, TAG, 'Gyroscope not available');
        }
        try {
            SensorUtil.subscribeLight((s41) => {
                this.lightData = s41;
                this.hasLight = true;
            });
            this.hasLight = true;
        }
        catch (r41) {
            hilog.warn(0x0000, TAG, 'Light sensor not available');
        }
        try {
            SensorUtil.subscribeProximity((q41) => {
                this.proximityData = q41;
                this.hasProximity = true;
            });
            this.hasProximity = true;
        }
        catch (p41) {
            hilog.warn(0x0000, TAG, 'Proximity sensor not available');
        }
        try {
            SensorUtil.subscribeMagneticField((o41) => {
                this.magneticFieldData = o41;
                this.hasMagneticField = true;
            });
            this.hasMagneticField = true;
        }
        catch (n41) {
            hilog.warn(0x0000, TAG, 'Magnetic field sensor not available');
        }
        try {
            SensorUtil.subscribeOrientation((m41) => {
                this.orientationData = m41;
                this.hasOrientation = true;
            });
            this.hasOrientation = true;
        }
        catch (l41) {
            hilog.warn(0x0000, TAG, 'Orientation sensor not available');
        }
    }
    DataDescription(h41: string, i41 = null) {
        this.observeComponentCreation2((j41, k41) => {
            Text.create(h41);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((f41, g41) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((d41, e41) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((b41, c41) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((z40, a41) => {
            Text.create('传感器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((x40, y40) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((v40, w40) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((b40, c40) => {
            If.create();
            if (this.hasAccelerometer) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((r40, s40) => {
                            if (s40) {
                                let t40 = new SectionHeader(this, { title: '加速度传感器' }, undefined, r40, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 157, col: 13 });
                                ViewPU.create(t40);
                                let u40 = () => {
                                    return {
                                        title: '加速度传感器'
                                    };
                                };
                                t40.paramsGenerator_ = u40;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r40, {
                                    title: '加速度传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的加速度，单位 m/s²。用于检测设备的运动状态、倾斜角度等。');
                    this.observeComponentCreation2((d40, e40) => {
                        If.create();
                        if (this.accelerometerData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((n40, o40) => {
                                        if (o40) {
                                            let p40 = new InfoCard(this, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            }, undefined, n40, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 161, col: 15 });
                                            ViewPU.create(p40);
                                            let q40 = () => {
                                                return {
                                                    title: 'X 轴',
                                                    value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                                };
                                            };
                                            p40.paramsGenerator_ = q40;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(n40, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((j40, k40) => {
                                        if (k40) {
                                            let l40 = new InfoCard(this, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            }, undefined, j40, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 166, col: 15 });
                                            ViewPU.create(l40);
                                            let m40 = () => {
                                                return {
                                                    title: 'Y 轴',
                                                    value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                                };
                                            };
                                            l40.paramsGenerator_ = m40;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(j40, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((f40, g40) => {
                                        if (g40) {
                                            let h40 = new InfoCard(this, {
                                                title: 'Z 轴',
                                                value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                            }, undefined, f40, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 171, col: 15 });
                                            ViewPU.create(h40);
                                            let i40 = () => {
                                                return {
                                                    title: 'Z 轴',
                                                    value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                                };
                                            };
                                            h40.paramsGenerator_ = i40;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(f40, {
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
        this.observeComponentCreation2((h39, i39) => {
            If.create();
            if (this.hasGyroscope) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((x39, y39) => {
                            if (y39) {
                                let z39 = new SectionHeader(this, { title: '陀螺仪' }, undefined, x39, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 180, col: 13 });
                                ViewPU.create(z39);
                                let a40 = () => {
                                    return {
                                        title: '陀螺仪'
                                    };
                                };
                                z39.paramsGenerator_ = a40;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x39, {
                                    title: '陀螺仪'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的角速度，单位 rad/s。用于检测设备的旋转、转向等动作。');
                    this.observeComponentCreation2((j39, k39) => {
                        If.create();
                        if (this.gyroscopeData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((t39, u39) => {
                                        if (u39) {
                                            let v39 = new InfoCard(this, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            }, undefined, t39, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 184, col: 15 });
                                            ViewPU.create(v39);
                                            let w39 = () => {
                                                return {
                                                    title: 'X 轴角速度',
                                                    value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                                };
                                            };
                                            v39.paramsGenerator_ = w39;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(t39, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((p39, q39) => {
                                        if (q39) {
                                            let r39 = new InfoCard(this, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            }, undefined, p39, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 189, col: 15 });
                                            ViewPU.create(r39);
                                            let s39 = () => {
                                                return {
                                                    title: 'Y 轴角速度',
                                                    value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                                };
                                            };
                                            r39.paramsGenerator_ = s39;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(p39, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((l39, m39) => {
                                        if (m39) {
                                            let n39 = new InfoCard(this, {
                                                title: 'Z 轴角速度',
                                                value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                            }, undefined, l39, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 194, col: 15 });
                                            ViewPU.create(n39);
                                            let o39 = () => {
                                                return {
                                                    title: 'Z 轴角速度',
                                                    value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                                };
                                            };
                                            n39.paramsGenerator_ = o39;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(l39, {
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
        this.observeComponentCreation2((v38, w38) => {
            If.create();
            if (this.hasLight) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((d39, e39) => {
                            if (e39) {
                                let f39 = new SectionHeader(this, { title: '光线传感器' }, undefined, d39, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 203, col: 13 });
                                ViewPU.create(f39);
                                let g39 = () => {
                                    return {
                                        title: '光线传感器'
                                    };
                                };
                                f39.paramsGenerator_ = g39;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(d39, {
                                    title: '光线传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量环境光强度，单位 lux。用于自动调节屏幕亮度、切换暗黑模式等。');
                    this.observeComponentCreation2((x38, y38) => {
                        If.create();
                        if (this.lightData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((z38, a39) => {
                                        if (a39) {
                                            let b39 = new InfoCard(this, {
                                                title: '光强度',
                                                value: `${this.lightData.intensity.toFixed(0)} lux`
                                            }, undefined, z38, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 207, col: 15 });
                                            ViewPU.create(b39);
                                            let c39 = () => {
                                                return {
                                                    title: '光强度',
                                                    value: `${this.lightData.intensity.toFixed(0)} lux`
                                                };
                                            };
                                            b39.paramsGenerator_ = c39;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(z38, {
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
        this.observeComponentCreation2((j38, k38) => {
            If.create();
            if (this.hasProximity) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((r38, s38) => {
                            if (s38) {
                                let t38 = new SectionHeader(this, { title: '距离传感器' }, undefined, r38, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 216, col: 13 });
                                ViewPU.create(t38);
                                let u38 = () => {
                                    return {
                                        title: '距离传感器'
                                    };
                                };
                                t38.paramsGenerator_ = u38;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r38, {
                                    title: '距离传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备与遮挡物之间的距离，单位 cm。用于通话时自动息屏、接近检测等。');
                    this.observeComponentCreation2((l38, m38) => {
                        If.create();
                        if (this.proximityData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((n38, o38) => {
                                        if (o38) {
                                            let p38 = new InfoCard(this, {
                                                title: '距离',
                                                value: `${this.proximityData.distance.toFixed(0)} cm`
                                            }, undefined, n38, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 220, col: 15 });
                                            ViewPU.create(p38);
                                            let q38 = () => {
                                                return {
                                                    title: '距离',
                                                    value: `${this.proximityData.distance.toFixed(0)} cm`
                                                };
                                            };
                                            p38.paramsGenerator_ = q38;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(n38, {
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
        this.observeComponentCreation2((p37, q37) => {
            If.create();
            if (this.hasMagneticField) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((f38, g38) => {
                            if (g38) {
                                let h38 = new SectionHeader(this, { title: '磁场传感器' }, undefined, f38, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 229, col: 13 });
                                ViewPU.create(h38);
                                let i38 = () => {
                                    return {
                                        title: '磁场传感器'
                                    };
                                };
                                h38.paramsGenerator_ = i38;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f38, {
                                    title: '磁场传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备周围的磁场强度，单位 μT。用于电子罗盘、方向检测等。');
                    this.observeComponentCreation2((r37, s37) => {
                        If.create();
                        if (this.magneticFieldData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((b38, c38) => {
                                        if (c38) {
                                            let d38 = new InfoCard(this, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            }, undefined, b38, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 233, col: 15 });
                                            ViewPU.create(d38);
                                            let e38 = () => {
                                                return {
                                                    title: 'X 轴磁场',
                                                    value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                                };
                                            };
                                            d38.paramsGenerator_ = e38;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(b38, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((x37, y37) => {
                                        if (y37) {
                                            let z37 = new InfoCard(this, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            }, undefined, x37, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 238, col: 15 });
                                            ViewPU.create(z37);
                                            let a38 = () => {
                                                return {
                                                    title: 'Y 轴磁场',
                                                    value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                                };
                                            };
                                            z37.paramsGenerator_ = a38;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(x37, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((t37, u37) => {
                                        if (u37) {
                                            let v37 = new InfoCard(this, {
                                                title: 'Z 轴磁场',
                                                value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                            }, undefined, t37, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 243, col: 15 });
                                            ViewPU.create(v37);
                                            let w37 = () => {
                                                return {
                                                    title: 'Z 轴磁场',
                                                    value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                                };
                                            };
                                            v37.paramsGenerator_ = w37;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(t37, {
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
        this.observeComponentCreation2((v36, w36) => {
            If.create();
            if (this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((l37, m37) => {
                            if (m37) {
                                let n37 = new SectionHeader(this, { title: '方向传感器' }, undefined, l37, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 252, col: 13 });
                                ViewPU.create(n37);
                                let o37 = () => {
                                    return {
                                        title: '方向传感器'
                                    };
                                };
                                n37.paramsGenerator_ = o37;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l37, {
                                    title: '方向传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备的方位角度。Alpha: 方位角(0-360°)，Beta: 俯仰角(-180-180°)，Gamma: 翻滚角(-90-90°)。');
                    this.observeComponentCreation2((x36, y36) => {
                        If.create();
                        if (this.orientationData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((h37, i37) => {
                                        if (i37) {
                                            let j37 = new InfoCard(this, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            }, undefined, h37, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 256, col: 15 });
                                            ViewPU.create(j37);
                                            let k37 = () => {
                                                return {
                                                    title: '方位角 (Alpha)',
                                                    value: `${this.orientationData.alpha.toFixed(1)}°`
                                                };
                                            };
                                            j37.paramsGenerator_ = k37;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(h37, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((d37, e37) => {
                                        if (e37) {
                                            let f37 = new InfoCard(this, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            }, undefined, d37, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 261, col: 15 });
                                            ViewPU.create(f37);
                                            let g37 = () => {
                                                return {
                                                    title: '俯仰角 (Beta)',
                                                    value: `${this.orientationData.beta.toFixed(1)}°`
                                                };
                                            };
                                            f37.paramsGenerator_ = g37;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(d37, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((z36, a37) => {
                                        if (a37) {
                                            let b37 = new InfoCard(this, {
                                                title: '翻滚角 (Gamma)',
                                                value: `${this.orientationData.gamma.toFixed(1)}°`
                                            }, undefined, z36, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 266, col: 15 });
                                            ViewPU.create(b37);
                                            let c37 = () => {
                                                return {
                                                    title: '翻滚角 (Gamma)',
                                                    value: `${this.orientationData.gamma.toFixed(1)}°`
                                                };
                                            };
                                            b37.paramsGenerator_ = c37;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(z36, {
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
        this.observeComponentCreation2((n36, o36) => {
            If.create();
            if (!this.hasAccelerometer && !this.hasGyroscope && !this.hasLight &&
                !this.hasProximity && !this.hasMagneticField && !this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((t36, u36) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((r36, s36) => {
                        Text.create('未检测到传感器');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((p36, q36) => {
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
