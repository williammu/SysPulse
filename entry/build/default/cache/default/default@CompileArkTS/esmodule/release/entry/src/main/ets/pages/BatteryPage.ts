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
    constructor(c5, d5, e5, f5 = -1, g5 = undefined, h5) {
        super(c5, e5, f5, h5);
        if (typeof g5 === "function") {
            this.paramsGenerator_ = g5;
        }
        this.__batteryInfo = new ObservedPropertyObjectPU(null, this, "batteryInfo");
        this.setInitiallyProvidedValue(d5);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(b5: BatteryPage_Params) {
        if (b5.batteryInfo !== undefined) {
            this.batteryInfo = b5.batteryInfo;
        }
    }
    updateStateVars(a5: BatteryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(z4) {
        this.__batteryInfo.purgeDependencyOnElmtId(z4);
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
    set batteryInfo(y4: BatteryInfoModel | null) {
        this.__batteryInfo.set(y4);
    }
    aboutToAppear() {
        this.batteryInfo = DeviceUtil.getBatteryInfo();
    }
    initialRender() {
        this.observeComponentCreation2((w4, x4) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((u4, v4) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((s4, t4) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((q4, r4) => {
            Text.create('电池');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((o4, p4) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((m4, n4) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((i4, j4) => {
                if (j4) {
                    let k4 = new SectionHeader(this, { title: '电池状态' }, undefined, i4, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 38, col: 11 });
                    ViewPU.create(k4);
                    let l4 = () => {
                        return {
                            title: '电池状态'
                        };
                    };
                    k4.paramsGenerator_ = l4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i4, {
                        title: '电池状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((g4, h4) => {
            Column.create();
            Column.width('100%');
            Column.padding(24);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((e4, f4) => {
            Text.create(this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--');
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c4, d4) => {
            __Common__.create();
            __Common__.margin({ top: 16 });
        }, __Common__);
        {
            this.observeComponentCreation2((y3, z3) => {
                if (z3) {
                    let a4 = new ProgressBar(this, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    }, undefined, y3, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 46, col: 13 });
                    ViewPU.create(a4);
                    let b4 = () => {
                        return {
                            progress: this.batteryInfo?.batterySOC || 0,
                            total: 100,
                            barHeight: 12,
                            color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                        };
                    };
                    a4.paramsGenerator_ = b4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y3, {
                        progress: this.batteryInfo?.batterySOC || 0,
                        total: 100,
                        barHeight: 12,
                        color: (this.batteryInfo?.batterySOC ?? 0) > 20 ? '#00B578' : '#F53F3F'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((w3, x3) => {
            Text.create(this.batteryInfo?.chargingStatus ? '充电中' : '未充电');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((s3, t3) => {
                if (t3) {
                    let u3 = new SectionHeader(this, { title: '电池信息' }, undefined, s3, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 65, col: 11 });
                    ViewPU.create(u3);
                    let v3 = () => {
                        return {
                            title: '电池信息'
                        };
                    };
                    u3.paramsGenerator_ = v3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s3, {
                        title: '电池信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((o3, p3) => {
                if (p3) {
                    let q3 = new InfoCard(this, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    }, undefined, o3, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 67, col: 11 });
                    ViewPU.create(q3);
                    let r3 = () => {
                        return {
                            title: '电量',
                            value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                        };
                    };
                    q3.paramsGenerator_ = r3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o3, {
                        title: '电量',
                        value: this.batteryInfo ? `${this.batteryInfo.batterySOC}%` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((k3, l3) => {
                if (l3) {
                    let m3 = new InfoCard(this, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    }, undefined, k3, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 72, col: 11 });
                    ViewPU.create(m3);
                    let n3 = () => {
                        return {
                            title: '温度',
                            value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                        };
                    };
                    m3.paramsGenerator_ = n3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k3, {
                        title: '温度',
                        value: this.batteryInfo?.batteryTemperature ? `${(this.batteryInfo.batteryTemperature / 10).toFixed(1)}°C` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((g3, h3) => {
                if (h3) {
                    let i3 = new InfoCard(this, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    }, undefined, g3, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 77, col: 11 });
                    ViewPU.create(i3);
                    let j3 = () => {
                        return {
                            title: '电压',
                            value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                        };
                    };
                    i3.paramsGenerator_ = j3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g3, {
                        title: '电压',
                        value: this.batteryInfo?.voltage ? `${this.batteryInfo.voltage} μV` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((c3, d3) => {
                if (d3) {
                    let e3 = new InfoCard(this, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    }, undefined, c3, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 82, col: 11 });
                    ViewPU.create(e3);
                    let f3 = () => {
                        return {
                            title: '电池技术',
                            value: this.batteryInfo?.technology || '--'
                        };
                    };
                    e3.paramsGenerator_ = f3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c3, {
                        title: '电池技术',
                        value: this.batteryInfo?.technology || '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((y2, z2) => {
                if (z2) {
                    let a3 = new InfoCard(this, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    }, undefined, y2, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 87, col: 11 });
                    ViewPU.create(a3);
                    let b3 = () => {
                        return {
                            title: '健康状态',
                            value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                        };
                    };
                    a3.paramsGenerator_ = b3;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y2, {
                        title: '健康状态',
                        value: this.batteryInfo?.healthStatus !== undefined ? `${this.batteryInfo.healthStatus}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((u2, v2) => {
                if (v2) {
                    let w2 = new InfoCard(this, {
                        title: '充电器类型',
                        value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                    }, undefined, u2, () => { }, { page: "entry/src/main/ets/pages/BatteryPage.ets", line: 92, col: 11 });
                    ViewPU.create(w2);
                    let x2 = () => {
                        return {
                            title: '充电器类型',
                            value: this.batteryInfo?.pluggedType !== undefined ? `${this.batteryInfo.pluggedType}` : '--'
                        };
                    };
                    w2.paramsGenerator_ = x2;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u2, {
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
