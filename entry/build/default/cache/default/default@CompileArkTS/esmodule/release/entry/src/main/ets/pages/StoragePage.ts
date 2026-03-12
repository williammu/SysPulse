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
    constructor(b32, c32, d32, e32 = -1, f32 = undefined, g32) {
        super(b32, d32, e32, g32);
        if (typeof f32 === "function") {
            this.paramsGenerator_ = f32;
        }
        this.__storageInfo = new ObservedPropertyObjectPU(null, this, "storageInfo");
        this.setInitiallyProvidedValue(c32);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(a32: StoragePage_Params) {
        if (a32.storageInfo !== undefined) {
            this.storageInfo = a32.storageInfo;
        }
    }
    updateStateVars(z31: StoragePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(y31) {
        this.__storageInfo.purgeDependencyOnElmtId(y31);
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
    set storageInfo(x31: StorageInfoModel | null) {
        this.__storageInfo.set(x31);
    }
    aboutToAppear() {
        this.storageInfo = DeviceUtil.getStorageInfo();
    }
    initialRender() {
        this.observeComponentCreation2((v31, w31) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((t31, u31) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((r31, s31) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((p31, q31) => {
            Text.create('存储');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((n31, o31) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((l31, m31) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((h31, i31) => {
                if (i31) {
                    let j31 = new SectionHeader(this, { title: '存储使用' }, undefined, h31, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 39, col: 11 });
                    ViewPU.create(j31);
                    let k31 = () => {
                        return {
                            title: '存储使用'
                        };
                    };
                    j31.paramsGenerator_ = k31;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(h31, {
                        title: '存储使用'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((f31, g31) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((d31, e31) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((b31, c31) => {
            Text.create('已用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((z30, a31) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((x30, y30) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.usedSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((v30, w30) => {
            __Common__.create();
            __Common__.margin({ top: 12, bottom: 12 });
        }, __Common__);
        {
            this.observeComponentCreation2((r30, s30) => {
                if (s30) {
                    let t30 = new ProgressBar(this, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    }, undefined, r30, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 54, col: 13 });
                    ViewPU.create(t30);
                    let u30 = () => {
                        return {
                            progress: this.storageInfo?.usedSize || 0,
                            total: this.storageInfo?.totalSize || 1,
                            color: '#007DFF'
                        };
                    };
                    t30.paramsGenerator_ = u30;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(r30, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((p30, q30) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((n30, o30) => {
            Text.create('可用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((l30, m30) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((j30, k30) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.freeSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((h30, i30) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((f30, g30) => {
            Text.create('总计');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((d30, e30) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((b30, c30) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.totalSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        {
            this.observeComponentCreation2((x29, y29) => {
                if (y29) {
                    let z29 = new SectionHeader(this, { title: '存储信息' }, undefined, x29, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 91, col: 11 });
                    ViewPU.create(z29);
                    let a30 = () => {
                        return {
                            title: '存储信息'
                        };
                    };
                    z29.paramsGenerator_ = a30;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(x29, {
                        title: '存储信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((t29, u29) => {
                if (u29) {
                    let v29 = new InfoCard(this, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    }, undefined, t29, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 93, col: 11 });
                    ViewPU.create(v29);
                    let w29 = () => {
                        return {
                            title: '状态',
                            value: this.storageInfo ? '已获取' : '未获取'
                        };
                    };
                    v29.paramsGenerator_ = w29;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(t29, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((p29, q29) => {
                if (q29) {
                    let r29 = new InfoCard(this, {
                        title: '说明',
                        value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                    }, undefined, p29, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 98, col: 11 });
                    ViewPU.create(r29);
                    let s29 = () => {
                        return {
                            title: '说明',
                            value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                        };
                    };
                    r29.paramsGenerator_ = s29;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(p29, {
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
