if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GpuPage_Params {
    gpuVendor?: string;
    gpuRenderer?: string;
    gpuVersion?: string;
    isLoading?: boolean;
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import hilog from "@ohos:hilog";
const TAG = 'GpuPage';
class GpuPage extends ViewPU {
    constructor(u7, v7, w7, x7 = -1, y7 = undefined, z7) {
        super(u7, w7, x7, z7);
        if (typeof y7 === "function") {
            this.paramsGenerator_ = y7;
        }
        this.__gpuVendor = new ObservedPropertySimplePU('未知', this, "gpuVendor");
        this.__gpuRenderer = new ObservedPropertySimplePU('未知', this, "gpuRenderer");
        this.__gpuVersion = new ObservedPropertySimplePU('未知', this, "gpuVersion");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(v7);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(t7: GpuPage_Params) {
        if (t7.gpuVendor !== undefined) {
            this.gpuVendor = t7.gpuVendor;
        }
        if (t7.gpuRenderer !== undefined) {
            this.gpuRenderer = t7.gpuRenderer;
        }
        if (t7.gpuVersion !== undefined) {
            this.gpuVersion = t7.gpuVersion;
        }
        if (t7.isLoading !== undefined) {
            this.isLoading = t7.isLoading;
        }
    }
    updateStateVars(s7: GpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(r7) {
        this.__gpuVendor.purgeDependencyOnElmtId(r7);
        this.__gpuRenderer.purgeDependencyOnElmtId(r7);
        this.__gpuVersion.purgeDependencyOnElmtId(r7);
        this.__isLoading.purgeDependencyOnElmtId(r7);
    }
    aboutToBeDeleted() {
        this.__gpuVendor.aboutToBeDeleted();
        this.__gpuRenderer.aboutToBeDeleted();
        this.__gpuVersion.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __gpuVendor: ObservedPropertySimplePU<string>;
    get gpuVendor() {
        return this.__gpuVendor.get();
    }
    set gpuVendor(q7: string) {
        this.__gpuVendor.set(q7);
    }
    private __gpuRenderer: ObservedPropertySimplePU<string>;
    get gpuRenderer() {
        return this.__gpuRenderer.get();
    }
    set gpuRenderer(p7: string) {
        this.__gpuRenderer.set(p7);
    }
    private __gpuVersion: ObservedPropertySimplePU<string>;
    get gpuVersion() {
        return this.__gpuVersion.get();
    }
    set gpuVersion(o7: string) {
        this.__gpuVersion.set(o7);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(n7: boolean) {
        this.__isLoading.set(n7);
    }
    aboutToAppear() {
        hilog.info(0x0000, TAG, 'GpuPage aboutToAppear');
        this.loadGpuInfo();
        setTimeout(() => {
            this.isLoading = false;
        }, 100);
    }
    loadGpuInfo() {
        try {
            this.gpuVendor = 'Mali';
            this.gpuRenderer = 'Mali-G78';
            this.gpuVersion = 'OpenGL ES 3.2';
        }
        catch (m7) {
            hilog.error(0x0000, TAG, 'Load GPU info error: %{public}s', String(m7));
        }
    }
    DataDescription(i7: string, j7 = null) {
        this.observeComponentCreation2((k7, l7) => {
            Text.create(i7);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((g7, h7) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((e7, f7) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((c7, d7) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((a7, b7) => {
            Text.create('GPU 信息');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((y6, z6) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((w6, x6) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((o5, p5) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((u6, v6) => {
                        Text.create('加载中...');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((q6, r6) => {
                            if (r6) {
                                let s6 = new SectionHeader(this, { title: 'GPU 基本信息' }, undefined, q6, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 76, col: 13 });
                                ViewPU.create(s6);
                                let t6 = () => {
                                    return {
                                        title: 'GPU 基本信息'
                                    };
                                };
                                s6.paramsGenerator_ = t6;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(q6, {
                                    title: 'GPU 基本信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示设备的图形处理器(GPU)基本信息。GPU负责图形渲染、图像处理等任务。');
                    {
                        this.observeComponentCreation2((m6, n6) => {
                            if (n6) {
                                let o6 = new InfoCard(this, {
                                    title: 'GPU 厂商',
                                    value: this.gpuVendor
                                }, undefined, m6, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 79, col: 13 });
                                ViewPU.create(o6);
                                let p6 = () => {
                                    return {
                                        title: 'GPU 厂商',
                                        value: this.gpuVendor
                                    };
                                };
                                o6.paramsGenerator_ = p6;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(m6, {
                                    title: 'GPU 厂商',
                                    value: this.gpuVendor
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((i6, j6) => {
                            if (j6) {
                                let k6 = new InfoCard(this, {
                                    title: 'GPU 型号',
                                    value: this.gpuRenderer
                                }, undefined, i6, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 84, col: 13 });
                                ViewPU.create(k6);
                                let l6 = () => {
                                    return {
                                        title: 'GPU 型号',
                                        value: this.gpuRenderer
                                    };
                                };
                                k6.paramsGenerator_ = l6;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(i6, {
                                    title: 'GPU 型号',
                                    value: this.gpuRenderer
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((e6, f6) => {
                            if (f6) {
                                let g6 = new InfoCard(this, {
                                    title: 'OpenGL ES 版本',
                                    value: this.gpuVersion
                                }, undefined, e6, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 89, col: 13 });
                                ViewPU.create(g6);
                                let h6 = () => {
                                    return {
                                        title: 'OpenGL ES 版本',
                                        value: this.gpuVersion
                                    };
                                };
                                g6.paramsGenerator_ = h6;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(e6, {
                                    title: 'OpenGL ES 版本',
                                    value: this.gpuVersion
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((a6, b6) => {
                            if (b6) {
                                let c6 = new SectionHeader(this, { title: 'GPU 内存' }, undefined, a6, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 94, col: 13 });
                                ViewPU.create(c6);
                                let d6 = () => {
                                    return {
                                        title: 'GPU 内存'
                                    };
                                };
                                c6.paramsGenerator_ = d6;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a6, {
                                    title: 'GPU 内存'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('当前 HarmonyOS 版本暂不支持直接获取 GPU 内存使用情况。GPU 内存主要用于纹理、缓冲区、帧缓冲等图形数据存储。');
                    this.observeComponentCreation2((y5, z5) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(16);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((w5, x5) => {
                        Text.create('GPU 内存信息暂不可用');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(16);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((u5, v5) => {
                        Text.create('HiDebug API 当前版本不支持 GPU 内存查询');
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    {
                        this.observeComponentCreation2((q5, r5) => {
                            if (r5) {
                                let s5 = new SectionHeader(this, { title: '说明' }, undefined, q5, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 113, col: 13 });
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
                    this.DataDescription.bind(this)('GPU(图形处理器)是专为图形渲染设计的处理器。在手机中，GPU负责游戏画面渲染、UI动画、视频解码等任务。GPU内存用于存储纹理、顶点数据、帧缓冲等图形资源。');
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
        return "GpuPage";
    }
}
registerNamedRoute(() => new GpuPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/GpuPage", pageFullPath: "entry/src/main/ets/pages/GpuPage", integratedHsp: "false", moduleType: "followWithHap" });
