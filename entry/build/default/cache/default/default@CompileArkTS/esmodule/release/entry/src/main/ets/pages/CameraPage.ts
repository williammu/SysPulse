if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CameraPage_Params {
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
class CameraPage extends ViewPU {
    constructor(r6, s6, t6, u6 = -1, v6 = undefined, w6) {
        super(r6, t6, u6, w6);
        if (typeof v6 === "function") {
            this.paramsGenerator_ = v6;
        }
        this.setInitiallyProvidedValue(s6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(q6: CameraPage_Params) {
    }
    updateStateVars(p6: CameraPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(o6) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((m6, n6) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((k6, l6) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((i6, j6) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((g6, h6) => {
            Text.create('摄像头');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((e6, f6) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((c6, d6) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        {
            this.observeComponentCreation2((y5, z5) => {
                if (z5) {
                    let a6 = new SectionHeader(this, { title: '状态' }, undefined, y5, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 29, col: 11 });
                    ViewPU.create(a6);
                    let b6 = () => {
                        return {
                            title: '状态'
                        };
                    };
                    a6.paramsGenerator_ = b6;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(y5, {
                        title: '状态'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((u5, v5) => {
                if (v5) {
                    let w5 = new InfoCard(this, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    }, undefined, u5, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 31, col: 11 });
                    ViewPU.create(w5);
                    let x5 = () => {
                        return {
                            title: '摄像头信息',
                            value: '暂未获取'
                        };
                    };
                    w5.paramsGenerator_ = x5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(u5, {
                        title: '摄像头信息',
                        value: '暂未获取'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((q5, r5) => {
                if (r5) {
                    let s5 = new SectionHeader(this, { title: '说明' }, undefined, q5, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 36, col: 11 });
                    ViewPU.create(s5);
                    let t5 = () => {
                        return {
                            title: '说明'
                        };
                    };
                    s5.paramsGenerator_ = t5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(q5, {
                        title: '说明'
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((m5, n5) => {
                if (n5) {
                    let o5 = new InfoCard(this, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    }, undefined, m5, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 38, col: 11 });
                    ViewPU.create(o5);
                    let p5 = () => {
                        return {
                            title: 'API 限制',
                            value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                        };
                    };
                    o5.paramsGenerator_ = p5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(m5, {
                        title: 'API 限制',
                        value: 'HarmonyOS NEXT 暂未提供获取摄像头详细信息的公开 API'
                    });
                }
            }, { name: "InfoCard" });
        }
        {
            this.observeComponentCreation2((i5, j5) => {
                if (j5) {
                    let k5 = new InfoCard(this, {
                        title: '备注',
                        value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                    }, undefined, i5, () => { }, { page: "entry/src/main/ets/pages/CameraPage.ets", line: 43, col: 11 });
                    ViewPU.create(k5);
                    let l5 = () => {
                        return {
                            title: '备注',
                            value: '如需获取摄像头信息，需要申请系统权限或使用私有 API'
                        };
                    };
                    k5.paramsGenerator_ = l5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(i5, {
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
