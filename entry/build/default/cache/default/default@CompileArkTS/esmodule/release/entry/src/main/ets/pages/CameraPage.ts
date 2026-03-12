if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CameraPage_Params {
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
class CameraPage extends ViewPU {
    constructor(z7, a8, b8, c8 = -1, d8 = undefined, e8) {
        super(z7, b8, c8, e8);
        if (typeof d8 === "function") {
            this.paramsGenerator_ = d8;
        }
        this.setInitiallyProvidedValue(a8);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(y7: CameraPage_Params) {
    }
    updateStateVars(x7: CameraPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(w7) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((u7, v7) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((q7, r7) => {
                if (r7) {
                    let s7 = new NavigationBarWithArrow(this, {
                        title: '摄像头',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, q7, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 11, col: 7 });
                    ViewPU.create(s7);
                    let t7 = () => {
                        return {
                            title: '摄像头',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    s7.paramsGenerator_ = t7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q7, {
                        title: '摄像头'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((o7, p7) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((m7, n7) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((i7, j7) => {
                if (j7) {
                    let k7 = new SectionHeader(this, { title: '状态' }, undefined, i7, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 20, col: 11 });
                    ViewPU.create(k7);
                    let l7 = () => {
                        return {
                            title: '状态'
                        };
                    };
                    k7.paramsGenerator_ = l7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i7, {
                        title: '状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((e7, f7) => {
                if (f7) {
                    let g7 = new InfoCard(this, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    }, undefined, e7, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 22, col: 11 });
                    ViewPU.create(g7);
                    let h7 = () => {
                        return {
                            title: '摄像头信息',
                            value: '暂未获取'
                        };
                    };
                    g7.paramsGenerator_ = h7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(e7, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((a7, b7) => {
                if (b7) {
                    let c7 = new SectionHeader(this, { title: '说明' }, undefined, a7, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 27, col: 11 });
                    ViewPU.create(c7);
                    let d7 = () => {
                        return {
                            title: '说明'
                        };
                    };
                    c7.paramsGenerator_ = d7;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(a7, {
                        title: '说明'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((w6, x6) => {
                if (x6) {
                    let y6 = new InfoCard(this, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    }, undefined, w6, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 29, col: 11 });
                    ViewPU.create(y6);
                    let z6 = () => {
                        return {
                            title: 'API 限制',
                            value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                        };
                    };
                    y6.paramsGenerator_ = z6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w6, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((s6, t6) => {
                if (t6) {
                    let u6 = new InfoCard(this, {
                        title: '备注',
                        value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                    }, undefined, s6, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 34, col: 11 });
                    ViewPU.create(u6);
                    let v6 = () => {
                        return {
                            title: '备注',
                            value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                        };
                    };
                    u6.paramsGenerator_ = v6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(s6, {
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
