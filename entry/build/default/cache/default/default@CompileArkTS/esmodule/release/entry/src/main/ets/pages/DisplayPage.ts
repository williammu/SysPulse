if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DisplayPage_Params {
    displayInfo?: DisplayInfoModel | null;
}
import router from "@ohos:router";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import type { DisplayInfoModel } from '../model/DeviceInfo';
class DisplayPage extends ViewPU {
    constructor(b13, c13, d13, e13 = -1, f13 = undefined, g13) {
        super(b13, d13, e13, g13);
        if (typeof f13 === "function") {
            this.paramsGenerator_ = f13;
        }
        this.__displayInfo = new ObservedPropertyObjectPU(null, this, "displayInfo");
        this.setInitiallyProvidedValue(c13);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(a13: DisplayPage_Params) {
        if (a13.displayInfo !== undefined) {
            this.displayInfo = a13.displayInfo;
        }
    }
    updateStateVars(z12: DisplayPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(y12) {
        this.__displayInfo.purgeDependencyOnElmtId(y12);
    }
    aboutToBeDeleted() {
        this.__displayInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __displayInfo: ObservedPropertyObjectPU<DisplayInfoModel | null>;
    get displayInfo() {
        return this.__displayInfo.get();
    }
    set displayInfo(x12: DisplayInfoModel | null) {
        this.__displayInfo.set(x12);
    }
    async aboutToAppear() {
        this.displayInfo = await DeviceUtil.getDisplayInfo();
    }
    initialRender() {
        this.observeComponentCreation2((v12, w12) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((t12, u12) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((r12, s12) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((p12, q12) => {
            Text.create('屏幕');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((n12, o12) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((l12, m12) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((h12, i12) => {
                if (i12) {
                    let j12 = new SectionHeader(this, { title: '屏幕信息' }, undefined, h12, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 37, col: 11 });
                    ViewPU.create(j12);
                    let k12 = () => {
                        return {
                            title: '屏幕信息'
                        };
                    };
                    j12.paramsGenerator_ = k12;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(h12, {
                        title: '屏幕信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((d12, e12) => {
                if (e12) {
                    let f12 = new InfoCard(this, {
                        title: '分辨率',
                        value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                    }, undefined, d12, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 39, col: 11 });
                    ViewPU.create(f12);
                    let g12 = () => {
                        return {
                            title: '分辨率',
                            value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                        };
                    };
                    f12.paramsGenerator_ = g12;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(d12, {
                        title: '分辨率',
                        value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((z11, a12) => {
                if (a12) {
                    let b12 = new InfoCard(this, {
                        title: '像素密度',
                        value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                    }, undefined, z11, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 44, col: 11 });
                    ViewPU.create(b12);
                    let c12 = () => {
                        return {
                            title: '像素密度',
                            value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                        };
                    };
                    b12.paramsGenerator_ = c12;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(z11, {
                        title: '像素密度',
                        value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((v11, w11) => {
                if (w11) {
                    let x11 = new InfoCard(this, {
                        title: '刷新率',
                        value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                    }, undefined, v11, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 49, col: 11 });
                    ViewPU.create(x11);
                    let y11 = () => {
                        return {
                            title: '刷新率',
                            value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                        };
                    };
                    x11.paramsGenerator_ = y11;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(v11, {
                        title: '刷新率',
                        value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((r11, s11) => {
                if (s11) {
                    let t11 = new InfoCard(this, {
                        title: 'X轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                    }, undefined, r11, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 54, col: 11 });
                    ViewPU.create(t11);
                    let u11 = () => {
                        return {
                            title: 'X轴DPI',
                            value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                        };
                    };
                    t11.paramsGenerator_ = u11;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(r11, {
                        title: 'X轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((n11, o11) => {
                if (o11) {
                    let p11 = new InfoCard(this, {
                        title: 'Y轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                    }, undefined, n11, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 59, col: 11 });
                    ViewPU.create(p11);
                    let q11 = () => {
                        return {
                            title: 'Y轴DPI',
                            value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                        };
                    };
                    p11.paramsGenerator_ = q11;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(n11, {
                        title: 'Y轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((j11, k11) => {
                if (k11) {
                    let l11 = new InfoCard(this, {
                        title: '显示状态',
                        value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                    }, undefined, j11, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 64, col: 11 });
                    ViewPU.create(l11);
                    let m11 = () => {
                        return {
                            title: '显示状态',
                            value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                        };
                    };
                    l11.paramsGenerator_ = m11;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(j11, {
                        title: '显示状态',
                        value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((f11, g11) => {
                if (g11) {
                    let h11 = new InfoCard(this, {
                        title: '旋转角度',
                        value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                    }, undefined, f11, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 69, col: 11 });
                    ViewPU.create(h11);
                    let i11 = () => {
                        return {
                            title: '旋转角度',
                            value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                        };
                    };
                    h11.paramsGenerator_ = i11;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(f11, {
                        title: '旋转角度',
                        value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((b11, c11) => {
                if (c11) {
                    let d11 = new SectionHeader(this, { title: '说明' }, undefined, b11, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 74, col: 11 });
                    ViewPU.create(d11);
                    let e11 = () => {
                        return {
                            title: '说明'
                        };
                    };
                    d11.paramsGenerator_ = e11;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(b11, {
                        title: '说明'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((x10, y10) => {
                if (y10) {
                    let z10 = new InfoCard(this, {
                        title: '数据来源',
                        value: '所有屏幕信息均来自 @ohos.display API'
                    }, undefined, x10, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 76, col: 11 });
                    ViewPU.create(z10);
                    let a11 = () => {
                        return {
                            title: '数据来源',
                            value: '所有屏幕信息均来自 @ohos.display API'
                        };
                    };
                    z10.paramsGenerator_ = a11;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(x10, {
                        title: '数据来源',
                        value: '所有屏幕信息均来自 @ohos.display API'
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
        return "DisplayPage";
    }
}
registerNamedRoute(() => new DisplayPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/DisplayPage", pageFullPath: "entry/src/main/ets/pages/DisplayPage", integratedHsp: "false", moduleType: "followWithHap" });
