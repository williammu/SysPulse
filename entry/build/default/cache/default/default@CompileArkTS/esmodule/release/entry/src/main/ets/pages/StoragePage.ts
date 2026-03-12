if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StoragePage_Params {
    storageInfo?: StorageInfoModel | null;
}
import router from "@ohos:router";
import { DeviceUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/DeviceUtil";
import { FormatUtil } from "@bundle:com.huawei.sysinfo/entry/ets/utils/FormatUtil";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { ProgressBar } from "@bundle:com.huawei.sysinfo/entry/ets/components/ProgressBar";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import type { StorageInfoModel } from '../model/DeviceInfo';
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
class StoragePage extends ViewPU {
    constructor(t38, u38, v38, w38 = -1, x38 = undefined, y38) {
        super(t38, v38, w38, y38);
        if (typeof x38 === "function") {
            this.paramsGenerator_ = x38;
        }
        this.__storageInfo = new ObservedPropertyObjectPU(null, this, "storageInfo");
        this.setInitiallyProvidedValue(u38);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(s38: StoragePage_Params) {
        if (s38.storageInfo !== undefined) {
            this.storageInfo = s38.storageInfo;
        }
    }
    updateStateVars(r38: StoragePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(q38) {
        this.__storageInfo.purgeDependencyOnElmtId(q38);
    }
    aboutToBeDeleted() {
        this.__storageInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __storageInfo: ObservedPropertyObjectPU<StorageInfoModel | null>;
    get storageInfo() {
        return this.__storageInfo.get();
    }
    set storageInfo(p38: StorageInfoModel | null) {
        this.__storageInfo.set(p38);
    }
    aboutToAppear() {
        this.storageInfo = DeviceUtil.getStorageInfo();
    }
    initialRender() {
        this.observeComponentCreation2((n38, o38) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((j38, k38) => {
                if (k38) {
                    let l38 = new NavigationBarWithArrow(this, {
                        title: '存储',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, j38, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 21, col: 7 });
                    ViewPU.create(l38);
                    let m38 = () => {
                        return {
                            title: '存储',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    l38.paramsGenerator_ = m38;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(j38, {
                        title: '存储'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((h38, i38) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((f38, g38) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((b38, c38) => {
                if (c38) {
                    let d38 = new SectionHeader(this, { title: '存储使用' }, undefined, b38, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 30, col: 11 });
                    ViewPU.create(d38);
                    let e38 = () => {
                        return {
                            title: '存储使用'
                        };
                    };
                    d38.paramsGenerator_ = e38;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(b38, {
                        title: '存储使用'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((z37, a38) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((x37, y37) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((v37, w37) => {
            Text.create('已用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((t37, u37) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((r37, s37) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.usedSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((p37, q37) => {
            __Common__.create();
            __Common__.margin({ top: 12, bottom: 12 });
        }, __Common__);
        {
            this.observeComponentCreation2((l37, m37) => {
                if (m37) {
                    let n37 = new ProgressBar(this, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    }, undefined, l37, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 45, col: 13 });
                    ViewPU.create(n37);
                    let o37 = () => {
                        return {
                            progress: this.storageInfo?.usedSize || 0,
                            total: this.storageInfo?.totalSize || 1,
                            color: '#007DFF'
                        };
                    };
                    n37.paramsGenerator_ = o37;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(l37, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((j37, k37) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((h37, i37) => {
            Text.create('可用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((f37, g37) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((d37, e37) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.freeSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((b37, c37) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((z36, a37) => {
            Text.create('总计');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((x36, y36) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((v36, w36) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.totalSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        {
            this.observeComponentCreation2((r36, s36) => {
                if (s36) {
                    let t36 = new SectionHeader(this, { title: '存储信息' }, undefined, r36, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 82, col: 11 });
                    ViewPU.create(t36);
                    let u36 = () => {
                        return {
                            title: '存储信息'
                        };
                    };
                    t36.paramsGenerator_ = u36;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(r36, {
                        title: '存储信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((n36, o36) => {
                if (o36) {
                    let p36 = new InfoCard(this, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    }, undefined, n36, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 84, col: 11 });
                    ViewPU.create(p36);
                    let q36 = () => {
                        return {
                            title: '状态',
                            value: this.storageInfo ? '已获取' : '未获取'
                        };
                    };
                    p36.paramsGenerator_ = q36;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(n36, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((j36, k36) => {
                if (k36) {
                    let l36 = new InfoCard(this, {
                        title: '说明',
                        value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                    }, undefined, j36, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 89, col: 11 });
                    ViewPU.create(l36);
                    let m36 = () => {
                        return {
                            title: '说明',
                            value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                        };
                    };
                    l36.paramsGenerator_ = m36;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(j36, {
                        title: '说明',
                        value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
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
        return "StoragePage";
    }
}
registerNamedRoute(() => new StoragePage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/StoragePage", pageFullPath: "entry/src/main/ets/pages/StoragePage", integratedHsp: "false", moduleType: "followWithHap" });
