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
    constructor(k5, l5, m5, n5 = -1, o5 = undefined, p5) {
        super(k5, m5, n5, p5);
        if (typeof o5 === "function") {
            this.paramsGenerator_ = o5;
        }
        this.__deviceInfo = new ObservedPropertyObjectPU(null, this, "deviceInfo");
        this.setInitiallyProvidedValue(l5);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(j5: AboutPage_Params) {
        if (j5.deviceInfo !== undefined) {
            this.deviceInfo = j5.deviceInfo;
        }
    }
    updateStateVars(i5: AboutPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(h5) {
        this.__deviceInfo.purgeDependencyOnElmtId(h5);
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
    set deviceInfo(g5: DeviceInfoModel | null) {
        this.__deviceInfo.set(g5);
    }
    aboutToAppear() {
        this.deviceInfo = DeviceUtil.getDeviceInfo();
    }
    initialRender() {
        this.observeComponentCreation2((e5, f5) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((c5, d5) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((a5, b5) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((y4, z4) => {
            Text.create('关于');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((w4, x4) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((u4, v4) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((s4, t4) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((q4, r4) => {
            Text.create('SysInfo');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((o4, p4) => {
            Text.create('v1.0.0');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((k4, l4) => {
                if (l4) {
                    let m4 = new SectionHeader(this, { title: '设备信息' }, undefined, k4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 51, col: 11 });
                    ViewPU.create(m4);
                    let n4 = () => {
                        return {
                            title: '设备信息'
                        };
                    };
                    m4.paramsGenerator_ = n4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k4, {
                        title: '设备信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((g4, h4) => {
                if (h4) {
                    let i4 = new InfoCard(this, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    }, undefined, g4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 53, col: 11 });
                    ViewPU.create(i4);
                    let j4 = () => {
                        return {
                            title: '设备型号',
                            value: this.deviceInfo?.marketName || '--'
                        };
                    };
                    i4.paramsGenerator_ = j4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g4, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((c4, d4) => {
                if (d4) {
                    let e4 = new InfoCard(this, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    }, undefined, c4, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 58, col: 11 });
                    ViewPU.create(e4);
                    let f4 = () => {
                        return {
                            title: '品牌',
                            value: this.deviceInfo?.brand || '--'
                        };
                    };
                    e4.paramsGenerator_ = f4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c4, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((y3, z3) => {
                if (z3) {
                    let a4 = new InfoCard(this, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    }, undefined, y3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 63, col: 11 });
                    ViewPU.create(a4);
                    let b4 = () => {
                        return {
                            title: '制造商',
                            value: this.deviceInfo?.manufacture || '--'
                        };
                    };
                    a4.paramsGenerator_ = b4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y3, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((u3, v3) => {
                if (v3) {
                    let w3 = new SectionHeader(this, { title: '系统信息' }, undefined, u3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 68, col: 11 });
                    ViewPU.create(w3);
                    let x3 = () => {
                        return {
                            title: '系统信息'
                        };
                    };
                    w3.paramsGenerator_ = x3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u3, {
                        title: '系统信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((q3, r3) => {
                if (r3) {
                    let s3 = new InfoCard(this, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    }, undefined, q3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 70, col: 11 });
                    ViewPU.create(s3);
                    let t3 = () => {
                        return {
                            title: '系统版本',
                            value: this.deviceInfo?.osFullName || '--'
                        };
                    };
                    s3.paramsGenerator_ = t3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q3, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((m3, n3) => {
                if (n3) {
                    let o3 = new InfoCard(this, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    }, undefined, m3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 75, col: 11 });
                    ViewPU.create(o3);
                    let p3 = () => {
                        return {
                            title: '系统类型',
                            value: 'HarmonyOS'
                        };
                    };
                    o3.paramsGenerator_ = p3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m3, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((i3, j3) => {
                if (j3) {
                    let k3 = new InfoCard(this, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    }, undefined, i3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 80, col: 11 });
                    ViewPU.create(k3);
                    let l3 = () => {
                        return {
                            title: 'API 版本',
                            value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                        };
                    };
                    k3.paramsGenerator_ = l3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i3, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((e3, f3) => {
                if (f3) {
                    let g3 = new InfoCard(this, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    }, undefined, e3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 85, col: 11 });
                    ViewPU.create(g3);
                    let h3 = () => {
                        return {
                            title: '设备类型',
                            value: this.deviceInfo?.deviceType || '--'
                        };
                    };
                    g3.paramsGenerator_ = h3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e3, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((a3, b3) => {
                if (b3) {
                    let c3 = new InfoCard(this, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    }, undefined, a3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 90, col: 11 });
                    ViewPU.create(c3);
                    let d3 = () => {
                        return {
                            title: '编译类型',
                            value: this.deviceInfo?.buildType || '--'
                        };
                    };
                    c3.paramsGenerator_ = d3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a3, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        this.observeComponentCreation2((y2, z2) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 24, bottom: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((w2, x2) => {
            Text.create('© 2026 SysInfo. All rights reserved.');
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
