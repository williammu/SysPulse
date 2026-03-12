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
class BatteryPage extends ViewPU {
    constructor(y7, z7, a8, b8 = -1, c8 = undefined, d8) {
        super(y7, a8, b8, d8);
        if (typeof c8 === "function") {
            this.paramsGenerator_ = c8;
        }
        this.__batteryInfo = new ObservedPropertyObjectPU(null, this, "batteryInfo");
        this.setInitiallyProvidedValue(z7);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(x7: BatteryPage_Params) {
        if (x7.batteryInfo !== undefined) {
            this.batteryInfo = x7.batteryInfo;
        }
    }
    updateStateVars(w7: BatteryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(v7) {
        this.__batteryInfo.purgeDependencyOnElmtId(v7);
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
    set batteryInfo(u7: BatteryInfoModel | null) {
        this.__batteryInfo.set(u7);
    }
    aboutToAppear() {
        this.batteryInfo = DeviceUtil.getBatteryInfo();
    }
    initialRender() {
        this.observeComponentCreation2((s7, t7) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((q7, r7) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((o7, p7) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((m7, n7) => {
            Text.create('电池');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((k7, l7) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((i7, j7) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((e7, f7) => {
                if (f7) {
                    let g7 = new SectionHeader(this, { title: '电池状态' }, undefined, e7, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 37, col: 11 });
                    ViewPU.create(g7);
                    let h7 = () => {
                        return {
                            title: '电池状态'
                        };
                    };
                    g7.paramsGenerator_ = h7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e7, {
                        title: '电池状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((c7, d7) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((a7, b7) => {
            Text.create(this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--');
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((y6, z6) => {
            __Common__.create();
            __Common__.margin({ top: 16 });
        }, __Common__);
        {
            this.observeComponentCreation2((u6, v6) => {
                if (v6) {
                    let w6 = new ProgressBar(this, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    }, undefined, u6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 45, col: 13 });
                    ViewPU.create(w6);
                    let x6 = () => {
                        return {
                            progress: this.batteryInfo?.batterySOC || 0,
                            total: 100,
                            barHeight: 12,
                            color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                        };
                    };
                    w6.paramsGenerator_ = x6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u6, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((s6, t6) => {
            Text.create(this.batteryInfo?.chargingStatus ? '充电中' : '未充电');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((o6, p6) => {
                if (p6) {
                    let q6 = new SectionHeader(this, { title: '电池信息' }, undefined, o6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 64, col: 11 });
                    ViewPU.create(q6);
                    let r6 = () => {
                        return {
                            title: '电池信息'
                        };
                    };
                    q6.paramsGenerator_ = r6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o6, {
                        title: '电池信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((k6, l6) => {
                if (l6) {
                    let m6 = new InfoCard(this, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    }, undefined, k6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 66, col: 11 });
                    ViewPU.create(m6);
                    let n6 = () => {
                        return {
                            title: '电量',
                            value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                        };
                    };
                    m6.paramsGenerator_ = n6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k6, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((g6, h6) => {
                if (h6) {
                    let i6 = new InfoCard(this, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    }, undefined, g6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 71, col: 11 });
                    ViewPU.create(i6);
                    let j6 = () => {
                        return {
                            title: '温度',
                            value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                        };
                    };
                    i6.paramsGenerator_ = j6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g6, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((c6, d6) => {
                if (d6) {
                    let e6 = new InfoCard(this, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    }, undefined, c6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 76, col: 11 });
                    ViewPU.create(e6);
                    let f6 = () => {
                        return {
                            title: '电压',
                            value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                        };
                    };
                    e6.paramsGenerator_ = f6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c6, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((y5, z5) => {
                if (z5) {
                    let a6 = new InfoCard(this, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    }, undefined, y5, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 81, col: 11 });
                    ViewPU.create(a6);
                    let b6 = () => {
                        return {
                            title: '电池技术',
                            value: this.batteryInfo?.technology || '--'
                        };
                    };
                    a6.paramsGenerator_ = b6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y5, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((u5, v5) => {
                if (v5) {
                    let w5 = new InfoCard(this, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    }, undefined, u5, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 86, col: 11 });
                    ViewPU.create(w5);
                    let x5 = () => {
                        return {
                            title: '健康状态',
                            value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                        };
                    };
                    w5.paramsGenerator_ = x5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u5, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((q5, r5) => {
                if (r5) {
                    let s5 = new InfoCard(this, {
                        title: '充电器类型',
                        value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                    }, undefined, q5, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 91, col: 11 });
                    ViewPU.create(s5);
                    let t5 = () => {
                        return {
                            title: '充电器类型',
                            value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                        };
                    };
                    s5.paramsGenerator_ = t5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q5, {
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
