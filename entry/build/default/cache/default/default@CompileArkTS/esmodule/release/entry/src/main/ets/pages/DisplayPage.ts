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
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
class DisplayPage extends ViewPU {
    constructor(i16, j16, k16, l16 = -1, m16 = undefined, n16) {
        super(i16, k16, l16, n16);
        if (typeof m16 === "function") {
            this.paramsGenerator_ = m16;
        }
        this.__displayInfo = new ObservedPropertyObjectPU(null, this, "displayInfo");
        this.setInitiallyProvidedValue(j16);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(h16: DisplayPage_Params) {
        if (h16.displayInfo !== undefined) {
            this.displayInfo = h16.displayInfo;
        }
    }
    updateStateVars(g16: DisplayPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(f16) {
        this.__displayInfo.purgeDependencyOnElmtId(f16);
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
    set displayInfo(e16: DisplayInfoModel | null) {
        this.__displayInfo.set(e16);
    }
    async aboutToAppear() {
        this.displayInfo = await DeviceUtil.getDisplayInfo();
    }
    initialRender() {
        this.observeComponentCreation2((c16, d16) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((y15, z15) => {
                if (z15) {
                    let a16 = new NavigationBarWithArrow(this, {
                        title: '屏幕',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, y15, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 19, col: 7 });
                    ViewPU.create(a16);
                    let b16 = () => {
                        return {
                            title: '屏幕',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    a16.paramsGenerator_ = b16;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y15, {
                        title: '屏幕'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((w15, x15) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((u15, v15) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((q15, r15) => {
                if (r15) {
                    let s15 = new SectionHeader(this, { title: '屏幕信息' }, undefined, q15, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 28, col: 11 });
                    ViewPU.create(s15);
                    let t15 = () => {
                        return {
                            title: '屏幕信息'
                        };
                    };
                    s15.paramsGenerator_ = t15;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q15, {
                        title: '屏幕信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((m15, n15) => {
                if (n15) {
                    let o15 = new InfoCard(this, {
                        title: '分辨率',
                        value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                    }, undefined, m15, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 30, col: 11 });
                    ViewPU.create(o15);
                    let p15 = () => {
                        return {
                            title: '分辨率',
                            value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                        };
                    };
                    o15.paramsGenerator_ = p15;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m15, {
                        title: '分辨率',
                        value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((i15, j15) => {
                if (j15) {
                    let k15 = new InfoCard(this, {
                        title: '像素密度',
                        value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                    }, undefined, i15, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 35, col: 11 });
                    ViewPU.create(k15);
                    let l15 = () => {
                        return {
                            title: '像素密度',
                            value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                        };
                    };
                    k15.paramsGenerator_ = l15;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i15, {
                        title: '像素密度',
                        value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((e15, f15) => {
                if (f15) {
                    let g15 = new InfoCard(this, {
                        title: '刷新率',
                        value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                    }, undefined, e15, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 40, col: 11 });
                    ViewPU.create(g15);
                    let h15 = () => {
                        return {
                            title: '刷新率',
                            value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                        };
                    };
                    g15.paramsGenerator_ = h15;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e15, {
                        title: '刷新率',
                        value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((a15, b15) => {
                if (b15) {
                    let c15 = new InfoCard(this, {
                        title: 'X轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                    }, undefined, a15, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 45, col: 11 });
                    ViewPU.create(c15);
                    let d15 = () => {
                        return {
                            title: 'X轴DPI',
                            value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                        };
                    };
                    c15.paramsGenerator_ = d15;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a15, {
                        title: 'X轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((w14, x14) => {
                if (x14) {
                    let y14 = new InfoCard(this, {
                        title: 'Y轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                    }, undefined, w14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 50, col: 11 });
                    ViewPU.create(y14);
                    let z14 = () => {
                        return {
                            title: 'Y轴DPI',
                            value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                        };
                    };
                    y14.paramsGenerator_ = z14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w14, {
                        title: 'Y轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s14, t14) => {
                if (t14) {
                    let u14 = new InfoCard(this, {
                        title: '显示状态',
                        value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                    }, undefined, s14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 55, col: 11 });
                    ViewPU.create(u14);
                    let v14 = () => {
                        return {
                            title: '显示状态',
                            value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                        };
                    };
                    u14.paramsGenerator_ = v14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s14, {
                        title: '显示状态',
                        value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((o14, p14) => {
                if (p14) {
                    let q14 = new InfoCard(this, {
                        title: '旋转角度',
                        value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                    }, undefined, o14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 60, col: 11 });
                    ViewPU.create(q14);
                    let r14 = () => {
                        return {
                            title: '旋转角度',
                            value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                        };
                    };
                    q14.paramsGenerator_ = r14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o14, {
                        title: '旋转角度',
                        value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((k14, l14) => {
                if (l14) {
                    let m14 = new SectionHeader(this, { title: '说明' }, undefined, k14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 65, col: 11 });
                    ViewPU.create(m14);
                    let n14 = () => {
                        return {
                            title: '说明'
                        };
                    };
                    m14.paramsGenerator_ = n14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k14, {
                        title: '说明'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((g14, h14) => {
                if (h14) {
                    let i14 = new InfoCard(this, {
                        title: '数据来源',
                        value: '所有屏幕信息均来自 @ohos.display API'
                    }, undefined, g14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 67, col: 11 });
                    ViewPU.create(i14);
                    let j14 = () => {
                        return {
                            title: '数据来源',
                            value: '所有屏幕信息均来自 @ohos.display API'
                        };
                    };
                    i14.paramsGenerator_ = j14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g14, {
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
