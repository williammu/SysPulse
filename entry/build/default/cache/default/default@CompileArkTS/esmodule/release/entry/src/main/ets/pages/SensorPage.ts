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
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
const TAG = 'SensorPage';
class SensorPage extends ViewPU {
    constructor(d36, e36, f36, g36 = -1, h36 = undefined, i36) {
        super(d36, f36, g36, i36);
        if (typeof h36 === "function") {
            this.paramsGenerator_ = h36;
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
        this.setInitiallyProvidedValue(e36);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(c36: SensorPage_Params) {
        if (c36.accelerometerData !== undefined) {
            this.accelerometerData = c36.accelerometerData;
        }
        if (c36.gyroscopeData !== undefined) {
            this.gyroscopeData = c36.gyroscopeData;
        }
        if (c36.lightData !== undefined) {
            this.lightData = c36.lightData;
        }
        if (c36.proximityData !== undefined) {
            this.proximityData = c36.proximityData;
        }
        if (c36.magneticFieldData !== undefined) {
            this.magneticFieldData = c36.magneticFieldData;
        }
        if (c36.orientationData !== undefined) {
            this.orientationData = c36.orientationData;
        }
        if (c36.hasAccelerometer !== undefined) {
            this.hasAccelerometer = c36.hasAccelerometer;
        }
        if (c36.hasGyroscope !== undefined) {
            this.hasGyroscope = c36.hasGyroscope;
        }
        if (c36.hasLight !== undefined) {
            this.hasLight = c36.hasLight;
        }
        if (c36.hasProximity !== undefined) {
            this.hasProximity = c36.hasProximity;
        }
        if (c36.hasMagneticField !== undefined) {
            this.hasMagneticField = c36.hasMagneticField;
        }
        if (c36.hasOrientation !== undefined) {
            this.hasOrientation = c36.hasOrientation;
        }
    }
    updateStateVars(b36: SensorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(a36) {
        this.__accelerometerData.purgeDependencyOnElmtId(a36);
        this.__gyroscopeData.purgeDependencyOnElmtId(a36);
        this.__lightData.purgeDependencyOnElmtId(a36);
        this.__proximityData.purgeDependencyOnElmtId(a36);
        this.__magneticFieldData.purgeDependencyOnElmtId(a36);
        this.__orientationData.purgeDependencyOnElmtId(a36);
        this.__hasAccelerometer.purgeDependencyOnElmtId(a36);
        this.__hasGyroscope.purgeDependencyOnElmtId(a36);
        this.__hasLight.purgeDependencyOnElmtId(a36);
        this.__hasProximity.purgeDependencyOnElmtId(a36);
        this.__hasMagneticField.purgeDependencyOnElmtId(a36);
        this.__hasOrientation.purgeDependencyOnElmtId(a36);
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
    set accelerometerData(z35: AccelerometerData | null) {
        this.__accelerometerData.set(z35);
    }
    private __gyroscopeData: ObservedPropertyObjectPU<GyroscopeData | null>;
    get gyroscopeData() {
        return this.__gyroscopeData.get();
    }
    set gyroscopeData(y35: GyroscopeData | null) {
        this.__gyroscopeData.set(y35);
    }
    private __lightData: ObservedPropertyObjectPU<LightData | null>;
    get lightData() {
        return this.__lightData.get();
    }
    set lightData(x35: LightData | null) {
        this.__lightData.set(x35);
    }
    private __proximityData: ObservedPropertyObjectPU<ProximityData | null>;
    get proximityData() {
        return this.__proximityData.get();
    }
    set proximityData(w35: ProximityData | null) {
        this.__proximityData.set(w35);
    }
    private __magneticFieldData: ObservedPropertyObjectPU<MagneticFieldData | null>;
    get magneticFieldData() {
        return this.__magneticFieldData.get();
    }
    set magneticFieldData(v35: MagneticFieldData | null) {
        this.__magneticFieldData.set(v35);
    }
    private __orientationData: ObservedPropertyObjectPU<OrientationData | null>;
    get orientationData() {
        return this.__orientationData.get();
    }
    set orientationData(u35: OrientationData | null) {
        this.__orientationData.set(u35);
    }
    private __hasAccelerometer: ObservedPropertySimplePU<boolean>;
    get hasAccelerometer() {
        return this.__hasAccelerometer.get();
    }
    set hasAccelerometer(t35: boolean) {
        this.__hasAccelerometer.set(t35);
    }
    private __hasGyroscope: ObservedPropertySimplePU<boolean>;
    get hasGyroscope() {
        return this.__hasGyroscope.get();
    }
    set hasGyroscope(s35: boolean) {
        this.__hasGyroscope.set(s35);
    }
    private __hasLight: ObservedPropertySimplePU<boolean>;
    get hasLight() {
        return this.__hasLight.get();
    }
    set hasLight(r35: boolean) {
        this.__hasLight.set(r35);
    }
    private __hasProximity: ObservedPropertySimplePU<boolean>;
    get hasProximity() {
        return this.__hasProximity.get();
    }
    set hasProximity(q35: boolean) {
        this.__hasProximity.set(q35);
    }
    private __hasMagneticField: ObservedPropertySimplePU<boolean>;
    get hasMagneticField() {
        return this.__hasMagneticField.get();
    }
    set hasMagneticField(p35: boolean) {
        this.__hasMagneticField.set(p35);
    }
    private __hasOrientation: ObservedPropertySimplePU<boolean>;
    get hasOrientation() {
        return this.__hasOrientation.get();
    }
    set hasOrientation(o35: boolean) {
        this.__hasOrientation.set(o35);
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
            SensorUtil.subscribeAccelerometer((n35) => {
                this.accelerometerData = n35;
                this.hasAccelerometer = true;
            });
            this.hasAccelerometer = true;
        }
        catch (m35) {
            hilog.warn(0x0000, TAG, 'Accelerometer not available');
        }
        try {
            SensorUtil.subscribeGyroscope((l35) => {
                this.gyroscopeData = l35;
                this.hasGyroscope = true;
            });
            this.hasGyroscope = true;
        }
        catch (k35) {
            hilog.warn(0x0000, TAG, 'Gyroscope not available');
        }
        try {
            SensorUtil.subscribeLight((j35) => {
                this.lightData = j35;
                this.hasLight = true;
            });
            this.hasLight = true;
        }
        catch (i35) {
            hilog.warn(0x0000, TAG, 'Light sensor not available');
        }
        try {
            SensorUtil.subscribeProximity((h35) => {
                this.proximityData = h35;
                this.hasProximity = true;
            });
            this.hasProximity = true;
        }
        catch (g35) {
            hilog.warn(0x0000, TAG, 'Proximity sensor not available');
        }
        try {
            SensorUtil.subscribeMagneticField((f35) => {
                this.magneticFieldData = f35;
                this.hasMagneticField = true;
            });
            this.hasMagneticField = true;
        }
        catch (e35) {
            hilog.warn(0x0000, TAG, 'Magnetic field sensor not available');
        }
        try {
            SensorUtil.subscribeOrientation((d35) => {
                this.orientationData = d35;
                this.hasOrientation = true;
            });
            this.hasOrientation = true;
        }
        catch (c35) {
            hilog.warn(0x0000, TAG, 'Orientation sensor not available');
        }
    }
    DataDescription(y34: string, z34 = null) {
        this.observeComponentCreation2((a35, b35) => {
            Text.create(y34);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((w34, x34) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((s34, t34) => {
                if (t34) {
                    let u34 = new NavigationBarWithArrow(this, {
                        title: '传感器',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, s34, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 137, col: 7 });
                    ViewPU.create(u34);
                    let v34 = () => {
                        return {
                            title: '传感器',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    u34.paramsGenerator_ = v34;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s34, {
                        title: '传感器'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((q34, r34) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((o34, p34) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((u33, v33) => {
            If.create();
            if (this.hasAccelerometer) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((k34, l34) => {
                            if (l34) {
                                let m34 = new SectionHeader(this, { title: '加速度传感器' }, undefined, k34, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 148, col: 13 });
                                ViewPU.create(m34);
                                let n34 = () => {
                                    return {
                                        title: '加速度传感器'
                                    };
                                };
                                m34.paramsGenerator_ = n34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k34, {
                                    title: '加速度传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的加速度，单位 m/s²。用于检测设备的运动状态、倾斜角度等。');
                    this.observeComponentCreation2((w33, x33) => {
                        If.create();
                        if (this.accelerometerData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((g34, h34) => {
                                        if (h34) {
                                            let i34 = new InfoCard(this, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            }, undefined, g34, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 152, col: 15 });
                                            ViewPU.create(i34);
                                            let j34 = () => {
                                                return {
                                                    title: 'X 轴',
                                                    value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                                };
                                            };
                                            i34.paramsGenerator_ = j34;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(g34, {
                                                title: 'X 轴',
                                                value: `${this.accelerometerData.x.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((c34, d34) => {
                                        if (d34) {
                                            let e34 = new InfoCard(this, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            }, undefined, c34, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 157, col: 15 });
                                            ViewPU.create(e34);
                                            let f34 = () => {
                                                return {
                                                    title: 'Y 轴',
                                                    value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                                };
                                            };
                                            e34.paramsGenerator_ = f34;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(c34, {
                                                title: 'Y 轴',
                                                value: `${this.accelerometerData.y.toFixed(2)} m/s²`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((y33, z33) => {
                                        if (z33) {
                                            let a34 = new InfoCard(this, {
                                                title: 'Z 轴',
                                                value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                            }, undefined, y33, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 162, col: 15 });
                                            ViewPU.create(a34);
                                            let b34 = () => {
                                                return {
                                                    title: 'Z 轴',
                                                    value: `${this.accelerometerData.z.toFixed(2)} m/s²`
                                                };
                                            };
                                            a34.paramsGenerator_ = b34;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(y33, {
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
        this.observeComponentCreation2((a33, b33) => {
            If.create();
            if (this.hasGyroscope) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((q33, r33) => {
                            if (r33) {
                                let s33 = new SectionHeader(this, { title: '陀螺仪' }, undefined, q33, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 171, col: 13 });
                                ViewPU.create(s33);
                                let t33 = () => {
                                    return {
                                        title: '陀螺仪'
                                    };
                                };
                                s33.paramsGenerator_ = t33;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(q33, {
                                    title: '陀螺仪'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备在 X/Y/Z 三个轴上的角速度，单位 rad/s。用于检测设备的旋转、转向等动作。');
                    this.observeComponentCreation2((c33, d33) => {
                        If.create();
                        if (this.gyroscopeData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((m33, n33) => {
                                        if (n33) {
                                            let o33 = new InfoCard(this, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            }, undefined, m33, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 175, col: 15 });
                                            ViewPU.create(o33);
                                            let p33 = () => {
                                                return {
                                                    title: 'X 轴角速度',
                                                    value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                                };
                                            };
                                            o33.paramsGenerator_ = p33;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(m33, {
                                                title: 'X 轴角速度',
                                                value: `${this.gyroscopeData.x.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((i33, j33) => {
                                        if (j33) {
                                            let k33 = new InfoCard(this, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            }, undefined, i33, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 180, col: 15 });
                                            ViewPU.create(k33);
                                            let l33 = () => {
                                                return {
                                                    title: 'Y 轴角速度',
                                                    value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                                };
                                            };
                                            k33.paramsGenerator_ = l33;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(i33, {
                                                title: 'Y 轴角速度',
                                                value: `${this.gyroscopeData.y.toFixed(2)} rad/s`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((e33, f33) => {
                                        if (f33) {
                                            let g33 = new InfoCard(this, {
                                                title: 'Z 轴角速度',
                                                value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                            }, undefined, e33, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 185, col: 15 });
                                            ViewPU.create(g33);
                                            let h33 = () => {
                                                return {
                                                    title: 'Z 轴角速度',
                                                    value: `${this.gyroscopeData.z.toFixed(2)} rad/s`
                                                };
                                            };
                                            g33.paramsGenerator_ = h33;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(e33, {
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
        this.observeComponentCreation2((o32, p32) => {
            If.create();
            if (this.hasLight) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((w32, x32) => {
                            if (x32) {
                                let y32 = new SectionHeader(this, { title: '光线传感器' }, undefined, w32, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 194, col: 13 });
                                ViewPU.create(y32);
                                let z32 = () => {
                                    return {
                                        title: '光线传感器'
                                    };
                                };
                                y32.paramsGenerator_ = z32;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w32, {
                                    title: '光线传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量环境光强度，单位 lux。用于自动调节屏幕亮度、切换暗黑模式等。');
                    this.observeComponentCreation2((q32, r32) => {
                        If.create();
                        if (this.lightData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((s32, t32) => {
                                        if (t32) {
                                            let u32 = new InfoCard(this, {
                                                title: '光强度',
                                                value: `${this.lightData.intensity.toFixed(0)} lux`
                                            }, undefined, s32, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 198, col: 15 });
                                            ViewPU.create(u32);
                                            let v32 = () => {
                                                return {
                                                    title: '光强度',
                                                    value: `${this.lightData.intensity.toFixed(0)} lux`
                                                };
                                            };
                                            u32.paramsGenerator_ = v32;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(s32, {
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
        this.observeComponentCreation2((c32, d32) => {
            If.create();
            if (this.hasProximity) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((k32, l32) => {
                            if (l32) {
                                let m32 = new SectionHeader(this, { title: '距离传感器' }, undefined, k32, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 207, col: 13 });
                                ViewPU.create(m32);
                                let n32 = () => {
                                    return {
                                        title: '距离传感器'
                                    };
                                };
                                m32.paramsGenerator_ = n32;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k32, {
                                    title: '距离传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备与遮挡物之间的距离，单位 cm。用于通话时自动息屏、接近检测等。');
                    this.observeComponentCreation2((e32, f32) => {
                        If.create();
                        if (this.proximityData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((g32, h32) => {
                                        if (h32) {
                                            let i32 = new InfoCard(this, {
                                                title: '距离',
                                                value: `${this.proximityData.distance.toFixed(0)} cm`
                                            }, undefined, g32, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 211, col: 15 });
                                            ViewPU.create(i32);
                                            let j32 = () => {
                                                return {
                                                    title: '距离',
                                                    value: `${this.proximityData.distance.toFixed(0)} cm`
                                                };
                                            };
                                            i32.paramsGenerator_ = j32;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(g32, {
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
        this.observeComponentCreation2((i31, j31) => {
            If.create();
            if (this.hasMagneticField) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((y31, z31) => {
                            if (z31) {
                                let a32 = new SectionHeader(this, { title: '磁场传感器' }, undefined, y31, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 220, col: 13 });
                                ViewPU.create(a32);
                                let b32 = () => {
                                    return {
                                        title: '磁场传感器'
                                    };
                                };
                                a32.paramsGenerator_ = b32;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(y31, {
                                    title: '磁场传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备周围的磁场强度，单位 μT。用于电子罗盘、方向检测等。');
                    this.observeComponentCreation2((k31, l31) => {
                        If.create();
                        if (this.magneticFieldData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((u31, v31) => {
                                        if (v31) {
                                            let w31 = new InfoCard(this, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            }, undefined, u31, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 224, col: 15 });
                                            ViewPU.create(w31);
                                            let x31 = () => {
                                                return {
                                                    title: 'X 轴磁场',
                                                    value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                                };
                                            };
                                            w31.paramsGenerator_ = x31;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(u31, {
                                                title: 'X 轴磁场',
                                                value: `${this.magneticFieldData.x.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((q31, r31) => {
                                        if (r31) {
                                            let s31 = new InfoCard(this, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            }, undefined, q31, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 229, col: 15 });
                                            ViewPU.create(s31);
                                            let t31 = () => {
                                                return {
                                                    title: 'Y 轴磁场',
                                                    value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                                };
                                            };
                                            s31.paramsGenerator_ = t31;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q31, {
                                                title: 'Y 轴磁场',
                                                value: `${this.magneticFieldData.y.toFixed(2)} μT`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((m31, n31) => {
                                        if (n31) {
                                            let o31 = new InfoCard(this, {
                                                title: 'Z 轴磁场',
                                                value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                            }, undefined, m31, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 234, col: 15 });
                                            ViewPU.create(o31);
                                            let p31 = () => {
                                                return {
                                                    title: 'Z 轴磁场',
                                                    value: `${this.magneticFieldData.z.toFixed(2)} μT`
                                                };
                                            };
                                            o31.paramsGenerator_ = p31;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(m31, {
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
        this.observeComponentCreation2((o30, p30) => {
            If.create();
            if (this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((e31, f31) => {
                            if (f31) {
                                let g31 = new SectionHeader(this, { title: '方向传感器' }, undefined, e31, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 243, col: 13 });
                                ViewPU.create(g31);
                                let h31 = () => {
                                    return {
                                        title: '方向传感器'
                                    };
                                };
                                g31.paramsGenerator_ = h31;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(e31, {
                                    title: '方向传感器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('测量设备的方位角度。Alpha: 方位角(0-360°)，Beta: 俯仰角(-180-180°)，Gamma: 翻滚角(-90-90°)。');
                    this.observeComponentCreation2((q30, r30) => {
                        If.create();
                        if (this.orientationData) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((a31, b31) => {
                                        if (b31) {
                                            let c31 = new InfoCard(this, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            }, undefined, a31, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 247, col: 15 });
                                            ViewPU.create(c31);
                                            let d31 = () => {
                                                return {
                                                    title: '方位角 (Alpha)',
                                                    value: `${this.orientationData.alpha.toFixed(1)}°`
                                                };
                                            };
                                            c31.paramsGenerator_ = d31;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(a31, {
                                                title: '方位角 (Alpha)',
                                                value: `${this.orientationData.alpha.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((w30, x30) => {
                                        if (x30) {
                                            let y30 = new InfoCard(this, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            }, undefined, w30, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 252, col: 15 });
                                            ViewPU.create(y30);
                                            let z30 = () => {
                                                return {
                                                    title: '俯仰角 (Beta)',
                                                    value: `${this.orientationData.beta.toFixed(1)}°`
                                                };
                                            };
                                            y30.paramsGenerator_ = z30;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(w30, {
                                                title: '俯仰角 (Beta)',
                                                value: `${this.orientationData.beta.toFixed(1)}°`
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                {
                                    this.observeComponentCreation2((s30, t30) => {
                                        if (t30) {
                                            let u30 = new InfoCard(this, {
                                                title: '翻滚角 (Gamma)',
                                                value: `${this.orientationData.gamma.toFixed(1)}°`
                                            }, undefined, s30, () => { }, { page: "entry/src/main/ets/pages/SensorPage.ets", line: 257, col: 15 });
                                            ViewPU.create(u30);
                                            let v30 = () => {
                                                return {
                                                    title: '翻滚角 (Gamma)',
                                                    value: `${this.orientationData.gamma.toFixed(1)}°`
                                                };
                                            };
                                            u30.paramsGenerator_ = v30;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(s30, {
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
        this.observeComponentCreation2((g30, h30) => {
            If.create();
            if (!this.hasAccelerometer && !this.hasGyroscope && !this.hasLight &&
                !this.hasProximity && !this.hasMagneticField && !this.hasOrientation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((m30, n30) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((k30, l30) => {
                        Text.create('未检测到传感器');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((i30, j30) => {
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
