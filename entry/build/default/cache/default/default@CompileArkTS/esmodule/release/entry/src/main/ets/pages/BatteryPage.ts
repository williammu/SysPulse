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
    constructor(s8, t8, u8, v8 = -1, w8 = undefined, x8) {
        super(s8, u8, v8, x8);
        if (typeof w8 === "function") {
            this.paramsGenerator_ = w8;
        }
        this.__batteryInfo = new ObservedPropertyObjectPU(null, this, "batteryInfo");
        this.setInitiallyProvidedValue(t8);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(r8: BatteryPage_Params) {
        if (r8.batteryInfo !== undefined) {
            this.batteryInfo = r8.batteryInfo;
        }
    }
    updateStateVars(q8: BatteryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(p8) {
        this.__batteryInfo.purgeDependencyOnElmtId(p8);
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
    set batteryInfo(o8: BatteryInfoModel | null) {
        this.__batteryInfo.set(o8);
    }
    aboutToAppear() {
        this.batteryInfo = DeviceUtil.getBatteryInfo();
    }
    initialRender() {
        this.observeComponentCreation2((m8, n8) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((k8, l8) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((i8, j8) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((g8, h8) => {
            Text.create('电池');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((e8, f8) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((c8, d8) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((y7, z7) => {
                if (z7) {
                    let a8 = new SectionHeader(this, { title: '电池状态' }, undefined, y7, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 38, col: 11 });
                    ViewPU.create(a8);
                    let b8 = () => {
                        return {
                            title: '电池状态'
                        };
                    };
                    a8.paramsGenerator_ = b8;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y7, {
                        title: '电池状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((w7, x7) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((u7, v7) => {
            Text.create(this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--');
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((s7, t7) => {
            __Common__.create();
            __Common__.margin({ top: 16 });
        }, __Common__);
        {
            this.observeComponentCreation2((o7, p7) => {
                if (p7) {
                    let q7 = new ProgressBar(this, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    }, undefined, o7, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 46, col: 13 });
                    ViewPU.create(q7);
                    let r7 = () => {
                        return {
                            progress: this.batteryInfo?.batterySOC || 0,
                            total: 100,
                            barHeight: 12,
                            color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                        };
                    };
                    q7.paramsGenerator_ = r7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o7, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((m7, n7) => {
            Text.create(this.batteryInfo?.chargingStatus ? '充电中' : '未充电');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((i7, j7) => {
                if (j7) {
                    let k7 = new SectionHeader(this, { title: '电池信息' }, undefined, i7, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 65, col: 11 });
                    ViewPU.create(k7);
                    let l7 = () => {
                        return {
                            title: '电池信息'
                        };
                    };
                    k7.paramsGenerator_ = l7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i7, {
                        title: '电池信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((e7, f7) => {
                if (f7) {
                    let g7 = new InfoCard(this, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    }, undefined, e7, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 67, col: 11 });
                    ViewPU.create(g7);
                    let h7 = () => {
                        return {
                            title: '电量',
                            value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                        };
                    };
                    g7.paramsGenerator_ = h7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e7, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((a7, b7) => {
                if (b7) {
                    let c7 = new InfoCard(this, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    }, undefined, a7, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 72, col: 11 });
                    ViewPU.create(c7);
                    let d7 = () => {
                        return {
                            title: '温度',
                            value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                        };
                    };
                    c7.paramsGenerator_ = d7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a7, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((w6, x6) => {
                if (x6) {
                    let y6 = new InfoCard(this, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    }, undefined, w6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 77, col: 11 });
                    ViewPU.create(y6);
                    let z6 = () => {
                        return {
                            title: '电压',
                            value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                        };
                    };
                    y6.paramsGenerator_ = z6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w6, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s6, t6) => {
                if (t6) {
                    let u6 = new InfoCard(this, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    }, undefined, s6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 82, col: 11 });
                    ViewPU.create(u6);
                    let v6 = () => {
                        return {
                            title: '电池技术',
                            value: this.batteryInfo?.technology || '--'
                        };
                    };
                    u6.paramsGenerator_ = v6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s6, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((o6, p6) => {
                if (p6) {
                    let q6 = new InfoCard(this, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    }, undefined, o6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 87, col: 11 });
                    ViewPU.create(q6);
                    let r6 = () => {
                        return {
                            title: '健康状态',
                            value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                        };
                    };
                    q6.paramsGenerator_ = r6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o6, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((k6, l6) => {
                if (l6) {
                    let m6 = new InfoCard(this, {
                        title: '充电器类型',
                        value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                    }, undefined, k6, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 92, col: 11 });
                    ViewPU.create(m6);
                    let n6 = () => {
                        return {
                            title: '充电器类型',
                            value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                        };
                    };
                    m6.paramsGenerator_ = n6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k6, {
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
