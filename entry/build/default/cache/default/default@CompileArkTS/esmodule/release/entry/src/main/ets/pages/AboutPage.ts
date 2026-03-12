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
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
class AboutPage extends ViewPU {
    constructor(a4, b4, c4, d4 = -1, e4 = undefined, f4) {
        super(a4, c4, d4, f4);
        if (typeof e4 === "function") {
            this.paramsGenerator_ = e4;
        }
        this.__deviceInfo = new ObservedPropertyObjectPU(null, this, "deviceInfo");
        this.setInitiallyProvidedValue(b4);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(z3: AboutPage_Params) {
        if (z3.deviceInfo !== undefined) {
            this.deviceInfo = z3.deviceInfo;
        }
    }
    updateStateVars(y3: AboutPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(x3) {
        this.__deviceInfo.purgeDependencyOnElmtId(x3);
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
    set deviceInfo(w3: DeviceInfoModel | null) {
        this.__deviceInfo.set(w3);
    }
    aboutToAppear() {
        this.deviceInfo = DeviceUtil.getDeviceInfo();
    }
    initialRender() {
        this.observeComponentCreation2((u3, v3) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((q3, r3) => {
                if (r3) {
                    let s3 = new NavigationBarWithArrow(this, {
                        title: '关于',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, q3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 19, col: 7 });
                    ViewPU.create(s3);
                    let t3 = () => {
                        return {
                            title: '关于',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    s3.paramsGenerator_ = t3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q3, {
                        title: '关于'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((o3, p3) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((m3, n3) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((k3, l3) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((i3, j3) => {
            Text.create('SysPulse');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((g3, h3) => {
            Text.create('v1.0.0');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((c3, d3) => {
                if (d3) {
                    let e3 = new SectionHeader(this, { title: '设备信息' }, undefined, c3, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 43, col: 11 });
                    ViewPU.create(e3);
                    let f3 = () => {
                        return {
                            title: '设备信息'
                        };
                    };
                    e3.paramsGenerator_ = f3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c3, {
                        title: '设备信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((y2, z2) => {
                if (z2) {
                    let a3 = new InfoCard(this, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    }, undefined, y2, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 45, col: 11 });
                    ViewPU.create(a3);
                    let b3 = () => {
                        return {
                            title: '设备型号',
                            value: this.deviceInfo?.marketName || '--'
                        };
                    };
                    a3.paramsGenerator_ = b3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y2, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((u2, v2) => {
                if (v2) {
                    let w2 = new InfoCard(this, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    }, undefined, u2, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 50, col: 11 });
                    ViewPU.create(w2);
                    let x2 = () => {
                        return {
                            title: '品牌',
                            value: this.deviceInfo?.brand || '--'
                        };
                    };
                    w2.paramsGenerator_ = x2;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u2, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((q2, r2) => {
                if (r2) {
                    let s2 = new InfoCard(this, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    }, undefined, q2, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 55, col: 11 });
                    ViewPU.create(s2);
                    let t2 = () => {
                        return {
                            title: '制造商',
                            value: this.deviceInfo?.manufacture || '--'
                        };
                    };
                    s2.paramsGenerator_ = t2;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q2, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((m2, n2) => {
                if (n2) {
                    let o2 = new SectionHeader(this, { title: '系统信息' }, undefined, m2, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 60, col: 11 });
                    ViewPU.create(o2);
                    let p2 = () => {
                        return {
                            title: '系统信息'
                        };
                    };
                    o2.paramsGenerator_ = p2;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m2, {
                        title: '系统信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((i2, j2) => {
                if (j2) {
                    let k2 = new InfoCard(this, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    }, undefined, i2, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 62, col: 11 });
                    ViewPU.create(k2);
                    let l2 = () => {
                        return {
                            title: '系统版本',
                            value: this.deviceInfo?.osFullName || '--'
                        };
                    };
                    k2.paramsGenerator_ = l2;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i2, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((e2, f2) => {
                if (f2) {
                    let g2 = new InfoCard(this, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    }, undefined, e2, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 67, col: 11 });
                    ViewPU.create(g2);
                    let h2 = () => {
                        return {
                            title: '系统类型',
                            value: 'HarmonyOS'
                        };
                    };
                    g2.paramsGenerator_ = h2;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e2, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((a2, b2) => {
                if (b2) {
                    let c2 = new InfoCard(this, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    }, undefined, a2, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 72, col: 11 });
                    ViewPU.create(c2);
                    let d2 = () => {
                        return {
                            title: 'API 版本',
                            value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                        };
                    };
                    c2.paramsGenerator_ = d2;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a2, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((w1, x1) => {
                if (x1) {
                    let y1 = new InfoCard(this, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    }, undefined, w1, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 77, col: 11 });
                    ViewPU.create(y1);
                    let z1 = () => {
                        return {
                            title: '设备类型',
                            value: this.deviceInfo?.deviceType || '--'
                        };
                    };
                    y1.paramsGenerator_ = z1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w1, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s1, t1) => {
                if (t1) {
                    let u1 = new InfoCard(this, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    }, undefined, s1, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 82, col: 11 });
                    ViewPU.create(u1);
                    let v1 = () => {
                        return {
                            title: '编译类型',
                            value: this.deviceInfo?.buildType || '--'
                        };
                    };
                    u1.paramsGenerator_ = v1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s1, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        this.observeComponentCreation2((q1, r1) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 24, bottom: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((o1, p1) => {
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
