if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BatteryPage_Params {
    batteryInfo?: BatteryInfoModel | null;
}
import router from "@ohos:router";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { ProgressBar } from "@bundle:com.huawei.sysinfo/entry/ets/components/ProgressBar";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import type { BatteryInfoModel } from '../model/DeviceInfo';
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
class BatteryPage extends ViewPU {
    constructor(m6, n6, o6, p6 = -1, q6 = undefined, r6) {
        super(m6, o6, p6, r6);
        if (typeof q6 === "function") {
            this.paramsGenerator_ = q6;
        }
        this.__batteryInfo = new ObservedPropertyObjectPU(null, this, "batteryInfo");
        this.setInitiallyProvidedValue(n6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(l6: BatteryPage_Params) {
        if (l6.batteryInfo !== undefined) {
            this.batteryInfo = l6.batteryInfo;
        }
    }
    updateStateVars(k6: BatteryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(j6) {
        this.__batteryInfo.purgeDependencyOnElmtId(j6);
    }
    aboutToBeDeleted() {
        this.__batteryInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __batteryInfo: ObservedPropertyObjectPU<BatteryInfoModel | null>;
    get batteryInfo() {
        return this.__batteryInfo.get();
    }
    set batteryInfo(i6: BatteryInfoModel | null) {
        this.__batteryInfo.set(i6);
    }
    aboutToAppear() {
        this.batteryInfo = DeviceUtil.getBatteryInfo();
    }
    initialRender() {
        this.observeComponentCreation2((g6, h6) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((c6, d6) => {
                if (d6) {
                    let e6 = new NavigationBarWithArrow(this, {
                        title: '电池',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, c6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 20, col: 7 });
                    ViewPU.create(e6);
                    let f6 = () => {
                        return {
                            title: '电池',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    e6.paramsGenerator_ = f6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c6, {
                        title: '电池'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((a6, b6) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((y5, z5) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((u5, v5) => {
                if (v5) {
                    let w5 = new SectionHeader(this, { title: '电池状态' }, undefined, u5, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 29, col: 11 });
                    ViewPU.create(w5);
                    let x5 = () => {
                        return {
                            title: '电池状态'
                        };
                    };
                    w5.paramsGenerator_ = x5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u5, {
                        title: '电池状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((s5, t5) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((q5, r5) => {
            Text.create(this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--');
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((o5, p5) => {
            __Common__.create();
            __Common__.margin({ top: 16 });
        }, __Common__);
        {
            this.observeComponentCreation2((k5, l5) => {
                if (l5) {
                    let m5 = new ProgressBar(this, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    }, undefined, k5, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 37, col: 13 });
                    ViewPU.create(m5);
                    let n5 = () => {
                        return {
                            progress: this.batteryInfo?.batterySOC || 0,
                            total: 100,
                            barHeight: 12,
                            color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                        };
                    };
                    m5.paramsGenerator_ = n5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k5, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((i5, j5) => {
            Text.create(this.batteryInfo?.chargingStatus ? '充电中' : '未充电');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((e5, f5) => {
                if (f5) {
                    let g5 = new SectionHeader(this, { title: '电池信息' }, undefined, e5, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 56, col: 11 });
                    ViewPU.create(g5);
                    let h5 = () => {
                        return {
                            title: '电池信息'
                        };
                    };
                    g5.paramsGenerator_ = h5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e5, {
                        title: '电池信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((a5, b5) => {
                if (b5) {
                    let c5 = new InfoCard(this, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    }, undefined, a5, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 58, col: 11 });
                    ViewPU.create(c5);
                    let d5 = () => {
                        return {
                            title: '电量',
                            value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                        };
                    };
                    c5.paramsGenerator_ = d5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a5, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((w4, x4) => {
                if (x4) {
                    let y4 = new InfoCard(this, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    }, undefined, w4, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 63, col: 11 });
                    ViewPU.create(y4);
                    let z4 = () => {
                        return {
                            title: '温度',
                            value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                        };
                    };
                    y4.paramsGenerator_ = z4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w4, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s4, t4) => {
                if (t4) {
                    let u4 = new InfoCard(this, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    }, undefined, s4, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 68, col: 11 });
                    ViewPU.create(u4);
                    let v4 = () => {
                        return {
                            title: '电压',
                            value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                        };
                    };
                    u4.paramsGenerator_ = v4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s4, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((o4, p4) => {
                if (p4) {
                    let q4 = new InfoCard(this, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    }, undefined, o4, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 73, col: 11 });
                    ViewPU.create(q4);
                    let r4 = () => {
                        return {
                            title: '电池技术',
                            value: this.batteryInfo?.technology || '--'
                        };
                    };
                    q4.paramsGenerator_ = r4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o4, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((k4, l4) => {
                if (l4) {
                    let m4 = new InfoCard(this, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    }, undefined, k4, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 78, col: 11 });
                    ViewPU.create(m4);
                    let n4 = () => {
                        return {
                            title: '健康状态',
                            value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                        };
                    };
                    m4.paramsGenerator_ = n4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k4, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((g4, h4) => {
                if (h4) {
                    let i4 = new InfoCard(this, {
                        title: '充电器类型',
                        value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                    }, undefined, g4, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 83, col: 11 });
                    ViewPU.create(i4);
                    let j4 = () => {
                        return {
                            title: '充电器类型',
                            value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                        };
                    };
                    i4.paramsGenerator_ = j4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g4, {
                        title: '充电器类型',
                        value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "BatteryPage";
    }
}
registerNamedRoute(() => new BatteryPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/BatteryPage", pageFullPath: "entry/src/main/ets/pages/BatteryPage", integratedHsp: "false", moduleType: "followWithHap" });
