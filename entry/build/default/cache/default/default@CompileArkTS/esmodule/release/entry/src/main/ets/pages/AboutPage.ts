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
    constructor(o2, p2, q2, r2 = -1, s2 = undefined, t2) {
        super(o2, q2, r2, t2);
        if (typeof s2 === "function") {
            this.paramsGenerator_ = s2;
        }
        this.__deviceInfo = new ObservedPropertyObjectPU(null, this, "deviceInfo");
        this.setInitiallyProvidedValue(p2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(n2: AboutPage_Params) {
        if (n2.deviceInfo !== undefined) {
            this.deviceInfo = n2.deviceInfo;
        }
    }
    updateStateVars(m2: AboutPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(l2) {
        this.__deviceInfo.purgeDependencyOnElmtId(l2);
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
    set deviceInfo(k2: DeviceInfoModel | null) {
        this.__deviceInfo.set(k2);
    }
    aboutToAppear() {
        this.deviceInfo = DeviceUtil.getDeviceInfo();
    }
    initialRender() {
        this.observeComponentCreation2((i2, j2) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((g2, h2) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((e2, f2) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c2, d2) => {
            Text.create('关于');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((a2, b2) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((y1, z1) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((w1, x1) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((u1, v1) => {
            Text.create('SysPulse');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((s1, t1) => {
            Text.create('v1.0.0');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((o1, p1) => {
                if (p1) {
                    let q1 = new SectionHeader(this, { title: '设备信息' }, undefined, o1, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 52, col: 11 });
                    ViewPU.create(q1);
                    let r1 = () => {
                        return {
                            title: '设备信息'
                        };
                    };
                    q1.paramsGenerator_ = r1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o1, {
                        title: '设备信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((k1, l1) => {
                if (l1) {
                    let m1 = new InfoCard(this, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    }, undefined, k1, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 54, col: 11 });
                    ViewPU.create(m1);
                    let n1 = () => {
                        return {
                            title: '设备型号',
                            value: this.deviceInfo?.marketName || '--'
                        };
                    };
                    m1.paramsGenerator_ = n1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k1, {
                        title: '设备型号',
                        value: this.deviceInfo?.marketName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((g1, h1) => {
                if (h1) {
                    let i1 = new InfoCard(this, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    }, undefined, g1, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 59, col: 11 });
                    ViewPU.create(i1);
                    let j1 = () => {
                        return {
                            title: '品牌',
                            value: this.deviceInfo?.brand || '--'
                        };
                    };
                    i1.paramsGenerator_ = j1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g1, {
                        title: '品牌',
                        value: this.deviceInfo?.brand || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((c1, d1) => {
                if (d1) {
                    let e1 = new InfoCard(this, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    }, undefined, c1, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 64, col: 11 });
                    ViewPU.create(e1);
                    let f1 = () => {
                        return {
                            title: '制造商',
                            value: this.deviceInfo?.manufacture || '--'
                        };
                    };
                    e1.paramsGenerator_ = f1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c1, {
                        title: '制造商',
                        value: this.deviceInfo?.manufacture || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((y, z) => {
                if (z) {
                    let a1 = new SectionHeader(this, { title: '系统信息' }, undefined, y, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 69, col: 11 });
                    ViewPU.create(a1);
                    let b1 = () => {
                        return {
                            title: '系统信息'
                        };
                    };
                    a1.paramsGenerator_ = b1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y, {
                        title: '系统信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((u, v) => {
                if (v) {
                    let w = new InfoCard(this, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    }, undefined, u, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 71, col: 11 });
                    ViewPU.create(w);
                    let x = () => {
                        return {
                            title: '系统版本',
                            value: this.deviceInfo?.osFullName || '--'
                        };
                    };
                    w.paramsGenerator_ = x;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u, {
                        title: '系统版本',
                        value: this.deviceInfo?.osFullName || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((q, r) => {
                if (r) {
                    let s = new InfoCard(this, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    }, undefined, q, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 76, col: 11 });
                    ViewPU.create(s);
                    let t = () => {
                        return {
                            title: '系统类型',
                            value: 'HarmonyOS'
                        };
                    };
                    s.paramsGenerator_ = t;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q, {
                        title: '系统类型',
                        value: 'HarmonyOS'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((m, n) => {
                if (n) {
                    let o = new InfoCard(this, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    }, undefined, m, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 81, col: 11 });
                    ViewPU.create(o);
                    let p = () => {
                        return {
                            title: 'API 版本',
                            value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                        };
                    };
                    o.paramsGenerator_ = p;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m, {
                        title: 'API 版本',
                        value: this.deviceInfo?.sdkApiVersion ? `API ${this.deviceInfo.sdkApiVersion}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((i, j) => {
                if (j) {
                    let k = new InfoCard(this, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    }, undefined, i, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 86, col: 11 });
                    ViewPU.create(k);
                    let l = () => {
                        return {
                            title: '设备类型',
                            value: this.deviceInfo?.deviceType || '--'
                        };
                    };
                    k.paramsGenerator_ = l;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i, {
                        title: '设备类型',
                        value: this.deviceInfo?.deviceType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((e, f) => {
                if (f) {
                    let g = new InfoCard(this, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    }, undefined, e, () => { }, { page: "entry/src/main/ets/pages/AboutPage.ets", line: 91, col: 11 });
                    ViewPU.create(g);
                    let h = () => {
                        return {
                            title: '编译类型',
                            value: this.deviceInfo?.buildType || '--'
                        };
                    };
                    g.paramsGenerator_ = h;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e, {
                        title: '编译类型',
                        value: this.deviceInfo?.buildType || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        this.observeComponentCreation2((c, d) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 24, bottom: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((a, b) => {
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
