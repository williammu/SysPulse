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
const TAG = 'ConceptDetailPage';
class ConceptDetailPage extends ViewPU {
    constructor(f5, g5, h5, i5 = -1, j5 = undefined, k5) {
        super(f5, h5, i5, k5);
        if (typeof j5 === "function") {
            this.paramsGenerator_ = j5;
        }
        this.__conceptInfo = new ObservedPropertyObjectPU(null, this, "conceptInfo");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(g5);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(e5: ConceptDetailPage_Params) {
        if (e5.conceptInfo !== undefined) {
            this.conceptInfo = e5.conceptInfo;
        }
        if (e5.isLoading !== undefined) {
            this.isLoading = e5.isLoading;
        }
    }
    updateStateVars(d5: ConceptDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(c5) {
        this.__conceptInfo.purgeDependencyOnElmtId(c5);
        this.__isLoading.purgeDependencyOnElmtId(c5);
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
    set conceptInfo(b5: ConceptInfo | null) {
        this.__conceptInfo.set(b5);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(a5: boolean) {
        this.__isLoading.set(a5);
    }
    aboutToAppear() {
        const x4 = router.getParams() as Record<string, string>;
        const y4 = x4?.['conceptId'];
        hilog.info(0x0000, TAG, 'Loading concept: %{public}s', y4);
        if (y4) {
            const z4 = getConceptInfo(y4);
            if (z4) {
                this.conceptInfo = z4;
            }
        }
        this.isLoading = false;
    }
    initialRender() {
        this.observeComponentCreation2((v4, w4) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((t4, u4) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((r4, s4) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((p4, q4) => {
            Text.create('概念说明');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((n4, o4) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((l4, m4) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((d3, e3) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((j4, k4) => {
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
                    this.observeComponentCreation2((h4, i4) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((f4, g4) => {
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
                    this.observeComponentCreation2((d4, e4) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(16);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.borderRadius(12);
                        Column.margin({ bottom: 16 });
                    }, Column);
                    this.observeComponentCreation2((b4, c4) => {
                        Text.create(this.conceptInfo.title);
                        Text.fontSize(28);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((z3, a4) => {
                        Text.create(this.conceptInfo.subtitle);
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 4 });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((x3, y3) => {
                        Text.create(this.conceptInfo.description);
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 16 });
                        Text.width('100%');
                        Text.lineHeight(20);
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((f3, g3) => {
                        ForEach.create();
                        const h3 = (k3, l3: number) => {
                            const m3 = k3;
                            this.observeComponentCreation2((v3, w3) => {
                                Column.create();
                                Column.width('100%');
                                Column.padding(16);
                                Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Column.borderRadius(12);
                                Column.margin({ bottom: 12 });
                            }, Column);
                            this.observeComponentCreation2((t3, u3) => {
                                Row.create();
                                Row.width('100%');
                                Row.alignItems(VerticalAlign.Center);
                            }, Row);
                            this.observeComponentCreation2((r3, s3) => {
                                Text.create(`${l3 + 1}`);
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
                            this.observeComponentCreation2((p3, q3) => {
                                Text.create(m3.title);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Medium);
                                Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Text.margin({ left: 8 });
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((n3, o3) => {
                                Text.create(m3.content);
                                Text.fontSize(14);
                                Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                                Text.margin({ top: 12 });
                                Text.width('100%');
                                Text.lineHeight(22);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(f3, this.conceptInfo.details, h3, (i3: ConceptDetailItem, j3: number) => j3.toString(), true, true);
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
