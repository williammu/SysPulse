if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AboutPage_Params {
    deviceInfo?: DeviceInfoModel | null;
}
import router from "@ohos:router";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import type { DeviceInfoModel } from '../model/DeviceInfo';
class AboutPage extends ViewPU {
    constructor(e6, f6, g6, h6 = -1, i6 = undefined, j6) {
        super(e6, g6, h6, j6);
        if (typeof i6 === "function") {
            this.paramsGenerator_ = i6;
        }
        this.__deviceInfo = new ObservedPropertyObjectPU(null, this, "deviceInfo");
        this.setInitiallyProvidedValue(f6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(d6: AboutPage_Params) {
        if (d6.deviceInfo !== undefined) {
            this.deviceInfo = d6.deviceInfo;
        }
    }
    updateStateVars(c6: AboutPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(b6) {
        this.__deviceInfo.purgeDependencyOnElmtId(b6);
    }
    aboutToBeDeleted() {
        this.__deviceInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __deviceInfo: ObservedPropertyObjectPU<DeviceInfoModel | null>;
    get deviceInfo() {
        return this.__deviceInfo.get();
    }
    set deviceInfo(a6: DeviceInfoModel | null) {
        this.__deviceInfo.set(a6);
    }
    aboutToAppear() {
        this.deviceInfo = DeviceUtil.getDeviceInfo();
    }
    initialRender() {
        this.observeComponentCreation2((y5, z5) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((w5, x5) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((u5, v5) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((s5, t5) => {
            Text.create('关于');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((q5, r5) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((o5, p5) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((m5, n5) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((k5, l5) => {
            Text.create('SysPulse');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((i5, j5) => {
            Text.create('v1.0.0');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((e5, f5) => {
                if (f5) {
                    let g5 = new SectionHeader(this, { title: '设备信息' }, undefined, e5, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 52, col: 11 });
                    ViewPU.create(g5);
                    let h5 = () => {
                        return {
                            title: '设备信息'
                        };
                    };
                    g5.paramsGenerator_ = h5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e5, {
                        title: '设备信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((a5, b5) => {
                if (b5) {
                    let c5 = new InfoCard(this, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    }, undefined, a5, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 54, col: 11 });
                    ViewPU.create(c5);
                    let d5 = () => {
                        return {
                            title: '设备型号',
                            value: this.deviceInfo?.marketName || '--'
                        };
                    };
                    c5.paramsGenerator_ = d5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a5, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((w4, x4) => {
                if (x4) {
                    let y4 = new InfoCard(this, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    }, undefined, w4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 59, col: 11 });
                    ViewPU.create(y4);
                    let z4 = () => {
                        return {
                            title: '品牌',
                            value: this.deviceInfo?.brand || '--'
                        };
                    };
                    y4.paramsGenerator_ = z4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w4, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s4, t4) => {
                if (t4) {
                    let u4 = new InfoCard(this, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    }, undefined, s4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 64, col: 11 });
                    ViewPU.create(u4);
                    let v4 = () => {
                        return {
                            title: '制造商',
                            value: this.deviceInfo?.manufacture || '--'
                        };
                    };
                    u4.paramsGenerator_ = v4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s4, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((o4, p4) => {
                if (p4) {
                    let q4 = new SectionHeader(this, { title: '系统信息' }, undefined, o4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 69, col: 11 });
                    ViewPU.create(q4);
                    let r4 = () => {
                        return {
                            title: '系统信息'
                        };
                    };
                    q4.paramsGenerator_ = r4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o4, {
                        title: '系统信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((k4, l4) => {
                if (l4) {
                    let m4 = new InfoCard(this, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    }, undefined, k4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 71, col: 11 });
                    ViewPU.create(m4);
                    let n4 = () => {
                        return {
                            title: '系统版本',
                            value: this.deviceInfo?.osFullName || '--'
                        };
                    };
                    m4.paramsGenerator_ = n4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k4, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((g4, h4) => {
                if (h4) {
                    let i4 = new InfoCard(this, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    }, undefined, g4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 76, col: 11 });
                    ViewPU.create(i4);
                    let j4 = () => {
                        return {
                            title: '系统类型',
                            value: 'HarmonyOS'
                        };
                    };
                    i4.paramsGenerator_ = j4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g4, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((c4, d4) => {
                if (d4) {
                    let e4 = new InfoCard(this, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    }, undefined, c4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 81, col: 11 });
                    ViewPU.create(e4);
                    let f4 = () => {
                        return {
                            title: 'API 版本',
                            value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                        };
                    };
                    e4.paramsGenerator_ = f4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c4, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((y3, z3) => {
                if (z3) {
                    let a4 = new InfoCard(this, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    }, undefined, y3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 86, col: 11 });
                    ViewPU.create(a4);
                    let b4 = () => {
                        return {
                            title: '设备类型',
                            value: this.deviceInfo?.deviceType || '--'
                        };
                    };
                    a4.paramsGenerator_ = b4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y3, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((u3, v3) => {
                if (v3) {
                    let w3 = new InfoCard(this, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    }, undefined, u3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 91, col: 11 });
                    ViewPU.create(w3);
                    let x3 = () => {
                        return {
                            title: '编译类型',
                            value: this.deviceInfo?.buildType || '--'
                        };
                    };
                    w3.paramsGenerator_ = x3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u3, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        this.observeComponentCreation2((s3, t3) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 24, bottom: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((q3, r3) => {
            Text.create('© 2026 SysPulse. All rights reserved.');
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AboutPage";
    }
}
registerNamedRoute(() => new AboutPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/AboutPage", pageFullPath: "entry/src/main/ets/pages/AboutPage", integratedHsp: "false", moduleType: "followWithHap" });
