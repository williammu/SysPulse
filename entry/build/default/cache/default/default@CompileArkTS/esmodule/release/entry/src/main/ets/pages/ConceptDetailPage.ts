if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConceptDetailPage_Params {
    conceptInfo?: ConceptInfo | null;
    isLoading?: boolean;
}
import router from "@ohos:router";
import { getConceptInfo } from "@bundle:com.huawei.sysinfo/entry/ets/config/ConceptConfig";
import type { ConceptInfo, ConceptDetailItem } from "@bundle:com.huawei.sysinfo/entry/ets/config/ConceptConfig";
import hilog from "@ohos:hilog";
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
const TAG = 'ConceptDetailPage';
class ConceptDetailPage extends ViewPU {
    constructor(f10, g10, h10, i10 = -1, j10 = undefined, k10) {
        super(f10, h10, i10, k10);
        if (typeof j10 === "function") {
            this.paramsGenerator_ = j10;
        }
        this.__conceptInfo = new ObservedPropertyObjectPU(null, this, "conceptInfo");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(g10);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(e10: ConceptDetailPage_Params) {
        if (e10.conceptInfo !== undefined) {
            this.conceptInfo = e10.conceptInfo;
        }
        if (e10.isLoading !== undefined) {
            this.isLoading = e10.isLoading;
        }
    }
    updateStateVars(d10: ConceptDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(c10) {
        this.__conceptInfo.purgeDependencyOnElmtId(c10);
        this.__isLoading.purgeDependencyOnElmtId(c10);
    }
    aboutToBeDeleted() {
        this.__conceptInfo.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __conceptInfo: ObservedPropertyObjectPU<ConceptInfo | null>;
    get conceptInfo() {
        return this.__conceptInfo.get();
    }
    set conceptInfo(b10: ConceptInfo | null) {
        this.__conceptInfo.set(b10);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(a10: boolean) {
        this.__isLoading.set(a10);
    }
    aboutToAppear() {
        const x9 = router.getParams() as Record<string, string>;
        const y9 = x9?.['conceptId'];
        hilog.info(0x0000, TAG, 'Loading concept: %{public}s', y9);
        if (y9) {
            const z9 = getConceptInfo(y9);
            if (z9) {
                this.conceptInfo = z9;
            }
        }
        this.isLoading = false;
    }
    initialRender() {
        this.observeComponentCreation2((v9, w9) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((r9, s9) => {
                if (s9) {
                    let t9 = new NavigationBarWithArrow(this, {
                        title: '概念说明',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, r9, () => { }, { page: "entry/src/main/ets/pages/ConceptDetailPage.ets", line: 32, col: 7 });
                    ViewPU.create(t9);
                    let u9 = () => {
                        return {
                            title: '概念说明',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    t9.paramsGenerator_ = u9;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(r9, {
                        title: '概念说明'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((p9, q9) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((n9, o9) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((f8, g8) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((l9, m9) => {
                        Text.create('加载中...');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                });
            }
            else if (!this.conceptInfo) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((j9, k9) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((h9, i9) => {
                        Text.create('未找到概念信息');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((f9, g9) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(16);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.borderRadius(12);
                        Column.margin({ bottom: 16 });
                    }, Column);
                    this.observeComponentCreation2((d9, e9) => {
                        Text.create(this.conceptInfo.title);
                        Text.fontSize(28);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((b9, c9) => {
                        Text.create(this.conceptInfo.subtitle);
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 4 });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((z8, a9) => {
                        Text.create(this.conceptInfo.description);
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 16 });
                        Text.width('100%');
                        Text.lineHeight(20);
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((h8, i8) => {
                        ForEach.create();
                        const j8 = (m8, n8: number) => {
                            const o8 = m8;
                            this.observeComponentCreation2((x8, y8) => {
                                Column.create();
                                Column.width('100%');
                                Column.padding(16);
                                Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Column.borderRadius(12);
                                Column.margin({ bottom: 12 });
                            }, Column);
                            this.observeComponentCreation2((v8, w8) => {
                                Row.create();
                                Row.width('100%');
                                Row.alignItems(VerticalAlign.Center);
                            }, Row);
                            this.observeComponentCreation2((t8, u8) => {
                                Text.create(`${n8 + 1}`);
                                Text.fontSize(12);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Text.width(20);
                                Text.height(20);
                                Text.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Text.borderRadius(10);
                                Text.textAlign(TextAlign.Center);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((r8, s8) => {
                                Text.create(o8.title);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Medium);
                                Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Text.margin({ left: 8 });
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((p8, q8) => {
                                Text.create(o8.content);
                                Text.fontSize(14);
                                Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Text.margin({ top: 12 });
                                Text.width('100%');
                                Text.lineHeight(22);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(h8, this.conceptInfo.details, j8, (k8: ConceptDetailItem, l8: number) => l8.toString(), true, true);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ConceptDetailPage";
    }
}
registerNamedRoute(() => new ConceptDetailPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/ConceptDetailPage", pageFullPath: "entry/src/main/ets/pages/ConceptDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
