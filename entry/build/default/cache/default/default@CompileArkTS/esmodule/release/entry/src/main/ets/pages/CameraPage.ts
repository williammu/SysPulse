if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CameraPage_Params {
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
class CameraPage extends ViewPU {
    constructor(h10, i10, j10, k10 = -1, l10 = undefined, m10) {
        super(h10, j10, k10, m10);
        if (typeof l10 === "function") {
            this.paramsGenerator_ = l10;
        }
        this.setInitiallyProvidedValue(i10);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(g10: CameraPage_Params) {
    }
    updateStateVars(f10: CameraPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(e10) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((c10, d10) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((a10, b10) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((y9, z9) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((w9, x9) => {
            Text.create('摄像头');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((u9, v9) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((s9, t9) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((o9, p9) => {
                if (p9) {
                    let q9 = new SectionHeader(this, { title: '状态' }, undefined, o9, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 29, col: 11 });
                    ViewPU.create(q9);
                    let r9 = () => {
                        return {
                            title: '状态'
                        };
                    };
                    q9.paramsGenerator_ = r9;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(o9, {
                        title: '状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((k9, l9) => {
                if (l9) {
                    let m9 = new InfoCard(this, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    }, undefined, k9, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 31, col: 11 });
                    ViewPU.create(m9);
                    let n9 = () => {
                        return {
                            title: '摄像头信息',
                            value: '暂未获取'
                        };
                    };
                    m9.paramsGenerator_ = n9;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(k9, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((g9, h9) => {
                if (h9) {
                    let i9 = new SectionHeader(this, { title: '说明' }, undefined, g9, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 36, col: 11 });
                    ViewPU.create(i9);
                    let j9 = () => {
                        return {
                            title: '说明'
                        };
                    };
                    i9.paramsGenerator_ = j9;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(g9, {
                        title: '说明'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((c9, d9) => {
                if (d9) {
                    let e9 = new InfoCard(this, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    }, undefined, c9, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 38, col: 11 });
                    ViewPU.create(e9);
                    let f9 = () => {
                        return {
                            title: 'API 限制',
                            value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                        };
                    };
                    e9.paramsGenerator_ = f9;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(c9, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((y8, z8) => {
                if (z8) {
                    let a9 = new InfoCard(this, {
                        title: '备注',
                        value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                    }, undefined, y8, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 43, col: 11 });
                    ViewPU.create(a9);
                    let b9 = () => {
                        return {
                            title: '备注',
                            value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                        };
                    };
                    a9.paramsGenerator_ = b9;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y8, {
                        title: '备注',
                        value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
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
        return "CameraPage";
    }
}
registerNamedRoute(() => new CameraPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/CameraPage", pageFullPath: "entry/src/main/ets/pages/CameraPage", integratedHsp: "false", moduleType: "followWithHap" });
