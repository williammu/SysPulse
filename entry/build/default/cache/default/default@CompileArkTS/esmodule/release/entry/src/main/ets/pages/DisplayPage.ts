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
    constructor(o15, p15, q15, r15 = -1, s15 = undefined, t15) {
        super(o15, q15, r15, t15);
        if (typeof s15 === "function") {
            this.paramsGenerator_ = s15;
        }
        this.__displayInfo = new ObservedPropertyObjectPU(null, this, "displayInfo");
        this.setInitiallyProvidedValue(p15);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(n15: DisplayPage_Params) {
        if (n15.displayInfo !== undefined) {
            this.displayInfo = n15.displayInfo;
        }
    }
    updateStateVars(m15: DisplayPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(l15) {
        this.__displayInfo.purgeDependencyOnElmtId(l15);
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
    set displayInfo(k15: DisplayInfoModel | null) {
        this.__displayInfo.set(k15);
    }
    async aboutToAppear() {
        this.displayInfo = await DeviceUtil.getDisplayInfo();
    }
    initialRender() {
        this.observeComponentCreation2((i15, j15) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((g15, h15) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((e15, f15) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c15, d15) => {
            Text.create('屏幕');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((a15, b15) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((y14, z14) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((u14, v14) => {
                if (v14) {
                    let w14 = new SectionHeader(this, { title: '屏幕信息' }, undefined, u14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 36, col: 11 });
                    ViewPU.create(w14);
                    let x14 = () => {
                        return {
                            title: '屏幕信息'
                        };
                    };
                    w14.paramsGenerator_ = x14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u14, {
                        title: '屏幕信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((q14, r14) => {
                if (r14) {
                    let s14 = new InfoCard(this, {
                        title: '分辨率',
                        value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                    }, undefined, q14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 38, col: 11 });
                    ViewPU.create(s14);
                    let t14 = () => {
                        return {
                            title: '分辨率',
                            value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                        };
                    };
                    s14.paramsGenerator_ = t14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q14, {
                        title: '分辨率',
                        value: this.displayInfo ? `${this.displayInfo.width} × ${this.displayInfo.height}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((m14, n14) => {
                if (n14) {
                    let o14 = new InfoCard(this, {
                        title: '像素密度',
                        value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                    }, undefined, m14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 43, col: 11 });
                    ViewPU.create(o14);
                    let p14 = () => {
                        return {
                            title: '像素密度',
                            value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                        };
                    };
                    o14.paramsGenerator_ = p14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m14, {
                        title: '像素密度',
                        value: this.displayInfo ? `${this.displayInfo.densityDPI} DPI` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((i14, j14) => {
                if (j14) {
                    let k14 = new InfoCard(this, {
                        title: '刷新率',
                        value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                    }, undefined, i14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 48, col: 11 });
                    ViewPU.create(k14);
                    let l14 = () => {
                        return {
                            title: '刷新率',
                            value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                        };
                    };
                    k14.paramsGenerator_ = l14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i14, {
                        title: '刷新率',
                        value: this.displayInfo ? `${this.displayInfo.refreshRate} Hz` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((e14, f14) => {
                if (f14) {
                    let g14 = new InfoCard(this, {
                        title: 'X轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                    }, undefined, e14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 53, col: 11 });
                    ViewPU.create(g14);
                    let h14 = () => {
                        return {
                            title: 'X轴DPI',
                            value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                        };
                    };
                    g14.paramsGenerator_ = h14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e14, {
                        title: 'X轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.xDPI}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((a14, b14) => {
                if (b14) {
                    let c14 = new InfoCard(this, {
                        title: 'Y轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                    }, undefined, a14, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 58, col: 11 });
                    ViewPU.create(c14);
                    let d14 = () => {
                        return {
                            title: 'Y轴DPI',
                            value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                        };
                    };
                    c14.paramsGenerator_ = d14;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a14, {
                        title: 'Y轴DPI',
                        value: this.displayInfo ? `${this.displayInfo.yDPI}` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((w13, x13) => {
                if (x13) {
                    let y13 = new InfoCard(this, {
                        title: '显示状态',
                        value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                    }, undefined, w13, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 63, col: 11 });
                    ViewPU.create(y13);
                    let z13 = () => {
                        return {
                            title: '显示状态',
                            value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                        };
                    };
                    y13.paramsGenerator_ = z13;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w13, {
                        title: '显示状态',
                        value: this.displayInfo ? (this.displayInfo.alive ? '正常' : '异常') : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s13, t13) => {
                if (t13) {
                    let u13 = new InfoCard(this, {
                        title: '旋转角度',
                        value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                    }, undefined, s13, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 68, col: 11 });
                    ViewPU.create(u13);
                    let v13 = () => {
                        return {
                            title: '旋转角度',
                            value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                        };
                    };
                    u13.paramsGenerator_ = v13;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s13, {
                        title: '旋转角度',
                        value: this.displayInfo ? `${this.displayInfo.rotation}°` : '--'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((o13, p13) => {
                if (p13) {
                    let q13 = new SectionHeader(this, { title: '说明' }, undefined, o13, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 73, col: 11 });
                    ViewPU.create(q13);
                    let r13 = () => {
                        return {
                            title: '说明'
                        };
                    };
                    q13.paramsGenerator_ = r13;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o13, {
                        title: '说明'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((k13, l13) => {
                if (l13) {
                    let m13 = new InfoCard(this, {
                        title: '数据来源',
                        value: '所有屏幕信息均来自 @ohos.display API'
                    }, undefined, k13, () => { }, { page: "entry/src/main/ets/pages/DisplayPage.ets", line: 75, col: 11 });
                    ViewPU.create(m13);
                    let n13 = () => {
                        return {
                            title: '数据来源',
                            value: '所有屏幕信息均来自 @ohos.display API'
                        };
                    };
                    m13.paramsGenerator_ = n13;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k13, {
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
