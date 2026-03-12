if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CameraPage_Params {
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
class CameraPage extends ViewPU {
    constructor(n9, o9, p9, q9 = -1, r9 = undefined, s9) {
        super(n9, p9, q9, s9);
        if (typeof r9 === "function") {
            this.paramsGenerator_ = r9;
        }
        this.setInitiallyProvidedValue(o9);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(m9: CameraPage_Params) {
    }
    updateStateVars(l9: CameraPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(k9) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((i9, j9) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((g9, h9) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((e9, f9) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c9, d9) => {
            Text.create('摄像头');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((a9, b9) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((y8, z8) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((u8, v8) => {
                if (v8) {
                    let w8 = new SectionHeader(this, { title: '状态' }, undefined, u8, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 28, col: 11 });
                    ViewPU.create(w8);
                    let x8 = () => {
                        return {
                            title: '状态'
                        };
                    };
                    w8.paramsGenerator_ = x8;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u8, {
                        title: '状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((q8, r8) => {
                if (r8) {
                    let s8 = new InfoCard(this, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    }, undefined, q8, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 30, col: 11 });
                    ViewPU.create(s8);
                    let t8 = () => {
                        return {
                            title: '摄像头信息',
                            value: '暂未获取'
                        };
                    };
                    s8.paramsGenerator_ = t8;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q8, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((m8, n8) => {
                if (n8) {
                    let o8 = new SectionHeader(this, { title: '说明' }, undefined, m8, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 35, col: 11 });
                    ViewPU.create(o8);
                    let p8 = () => {
                        return {
                            title: '说明'
                        };
                    };
                    o8.paramsGenerator_ = p8;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m8, {
                        title: '说明'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((i8, j8) => {
                if (j8) {
                    let k8 = new InfoCard(this, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    }, undefined, i8, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 37, col: 11 });
                    ViewPU.create(k8);
                    let l8 = () => {
                        return {
                            title: 'API 限制',
                            value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                        };
                    };
                    k8.paramsGenerator_ = l8;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i8, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((e8, f8) => {
                if (f8) {
                    let g8 = new InfoCard(this, {
                        title: '备注',
                        value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                    }, undefined, e8, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 42, col: 11 });
                    ViewPU.create(g8);
                    let h8 = () => {
                        return {
                            title: '备注',
                            value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                        };
                    };
                    g8.paramsGenerator_ = h8;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e8, {
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
