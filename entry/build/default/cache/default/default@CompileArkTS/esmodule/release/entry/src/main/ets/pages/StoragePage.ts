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
    constructor(m34, n34, o34, p34 = -1, q34 = undefined, r34) {
        super(m34, o34, p34, r34);
        if (typeof q34 === "function") {
            this.paramsGenerator_ = q34;
        }
        this.__storageInfo = new ObservedPropertyObjectPU(null, this, "storageInfo");
        this.setInitiallyProvidedValue(n34);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(l34: StoragePage_Params) {
        if (l34.storageInfo !== undefined) {
            this.storageInfo = l34.storageInfo;
        }
    }
    updateStateVars(k34: StoragePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(j34) {
        this.__storageInfo.purgeDependencyOnElmtId(j34);
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
    set storageInfo(i34: StorageInfoModel | null) {
        this.__storageInfo.set(i34);
    }
    aboutToAppear() {
        this.storageInfo = DeviceUtil.getStorageInfo();
    }
    initialRender() {
        this.observeComponentCreation2((g34, h34) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((e34, f34) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((c34, d34) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((a34, b34) => {
            Text.create('存储');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((y33, z33) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((w33, x33) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((s33, t33) => {
                if (t33) {
                    let u33 = new SectionHeader(this, { title: '存储使用' }, undefined, s33, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 38, col: 11 });
                    ViewPU.create(u33);
                    let v33 = () => {
                        return {
                            title: '存储使用'
                        };
                    };
                    u33.paramsGenerator_ = v33;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s33, {
                        title: '存储使用'
                    });
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((q33, r33) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((o33, p33) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((m33, n33) => {
            Text.create('已用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((k33, l33) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((i33, j33) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.usedSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((g33, h33) => {
            __Common__.create();
            __Common__.margin({ top: 12, bottom: 12 });
        }, __Common__);
        {
            this.observeComponentCreation2((c33, d33) => {
                if (d33) {
                    let e33 = new ProgressBar(this, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    }, undefined, c33, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 52, col: 13 });
                    ViewPU.create(e33);
                    let f33 = () => {
                        return {
                            progress: this.storageInfo?.usedSize || 0,
                            total: this.storageInfo?.totalSize || 1,
                            color: '#007DFF'
                        };
                    };
                    e33.paramsGenerator_ = f33;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c33, {
                        progress: this.storageInfo?.usedSize || 0,
                        total: this.storageInfo?.totalSize || 1,
                        color: '#007DFF'
                    });
                }
            }, { name: "ProgressBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((a33, b33) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((y32, z32) => {
            Text.create('可用');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((w32, x32) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((u32, v32) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.freeSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((s32, t32) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((q32, r32) => {
            Text.create('总计');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((o32, p32) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((m32, n32) => {
            Text.create(this.storageInfo ? FormatUtil.formatBytes(this.storageInfo.totalSize) : '未获取');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        {
            this.observeComponentCreation2((i32, j32) => {
                if (j32) {
                    let k32 = new SectionHeader(this, { title: '存储信息' }, undefined, i32, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 87, col: 11 });
                    ViewPU.create(k32);
                    let l32 = () => {
                        return {
                            title: '存储信息'
                        };
                    };
                    k32.paramsGenerator_ = l32;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i32, {
                        title: '存储信息'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((e32, f32) => {
                if (f32) {
                    let g32 = new InfoCard(this, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    }, undefined, e32, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 89, col: 11 });
                    ViewPU.create(g32);
                    let h32 = () => {
                        return {
                            title: '状态',
                            value: this.storageInfo ? '已获取' : '未获取'
                        };
                    };
                    g32.paramsGenerator_ = h32;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e32, {
                        title: '状态',
                        value: this.storageInfo ? '已获取' : '未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((a32, b32) => {
                if (b32) {
                    let c32 = new InfoCard(this, {
                        title: '说明',
                        value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                    }, undefined, a32, () => { }, { page: "entry/src/main/ets/pages/StoragePage.ets", line: 94, col: 11 });
                    ViewPU.create(c32);
                    let d32 = () => {
                        return {
                            title: '说明',
                            value: this.storageInfo ? '存储信息来自系统 API' : '部分设备可能无法获取存储信息'
                        };
                    };
                    c32.paramsGenerator_ = d32;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a32, {
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
