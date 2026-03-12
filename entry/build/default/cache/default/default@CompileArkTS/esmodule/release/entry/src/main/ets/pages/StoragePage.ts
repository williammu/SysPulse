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
class StoragePage extends ViewPU {
    constructor(e45, f45, g45, h45 = -1, i45 = undefined, j45) {
        super(e45, g45, h45, j45);
        if (typeof i45 === "function") {
            this.paramsGenerator_ = i45;
        }
        this.__storageInfo = new ObservedPropertyObjectPU(null, this, "storageInfo");
        this.setInitiallyProvidedValue(f45);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(d45: StoragePage_Params) {
        if (d45.storageInfo !== undefined) {
            this.storageInfo = d45.storageInfo;
        }
    }
    updateStateVars(c45: StoragePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(b45) {
        this.__storageInfo.purgeDependencyOnElmtId(b45);
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
    set storageInfo(a45: StorageInfoModel | null) {
        this.__storageInfo.set(a45);
    }
    aboutToAppear() {
        this.storageInfo = DeviceUtil.getStorageInfo();
    }
    initialRender() {
        this.observeComponentCreation2((y44, z44) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((w44, x44) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((u44, v44) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((s44, t44) => {
            Text.create('存储');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((q44, r44) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((o44, p44) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((k44, l44) => {
                if (l44) {
                    let m44 = new SectionHeader(this, { title: '存储使用' }, undefined, k44, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 39, col: 11 });
                    ViewPU.create(m44);
                    let n44 = () => {
                        return {
                            title: '存储使用'
                        };
                    };
                    m44.paramsGenerator_ = n44;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k44, {
                        title: '存储使用'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((i44, j44) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((g44, h44) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((e44, f44) => {
            Text.create('已用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c44, d44) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((a44, b44) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.usedSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((y43, z43) => {
            __Common__.create();
            __Common__.margin({ top: 12, bottom: 12 });
        }, __Common__);
        {
            this.observeComponentCreation2((u43, v43) => {
                if (v43) {
                    let w43 = new ProgressBar(this, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    }, undefined, u43, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 54, col: 13 });
                    ViewPU.create(w43);
                    let x43 = () => {
                        return {
                            progress: this.storageInfo?.usedSize || 0,
                            total: this.storageInfo?.totalSize || 1,
                            color: '#007DFF'
                        };
                    };
                    w43.paramsGenerator_ = x43;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u43, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((s43, t43) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((q43, r43) => {
            Text.create('可用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((o43, p43) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((m43, n43) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.freeSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((k43, l43) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((i43, j43) => {
            Text.create('总计');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((g43, h43) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((e43, f43) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.totalSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        {
            this.observeComponentCreation2((a43, b43) => {
                if (b43) {
                    let c43 = new SectionHeader(this, { title: '存储信息' }, undefined, a43, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 91, col: 11 });
                    ViewPU.create(c43);
                    let d43 = () => {
                        return {
                            title: '存储信息'
                        };
                    };
                    c43.paramsGenerator_ = d43;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a43, {
                        title: '存储信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((w42, x42) => {
                if (x42) {
                    let y42 = new InfoCard(this, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    }, undefined, w42, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 93, col: 11 });
                    ViewPU.create(y42);
                    let z42 = () => {
                        return {
                            title: '状态',
                            value: this.storageInfo ? '已获取' : '未获取'
                        };
                    };
                    y42.paramsGenerator_ = z42;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w42, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s42, t42) => {
                if (t42) {
                    let u42 = new InfoCard(this, {
                        title: '说明',
                        value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                    }, undefined, s42, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 98, col: 11 });
                    ViewPU.create(u42);
                    let v42 = () => {
                        return {
                            title: '说明',
                            value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                        };
                    };
                    u42.paramsGenerator_ = v42;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s42, {
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
