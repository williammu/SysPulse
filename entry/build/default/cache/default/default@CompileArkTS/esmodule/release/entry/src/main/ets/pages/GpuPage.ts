if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GpuPage_Params {
    gpuInfo?: GpuInfo | null;
    isLoading?: boolean;
    hasError?: boolean;
    errorMessage?: string;
}
import router from "@ohos:router";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { InfoHeader, InfoCardWithDesc } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoButton";
import { nativeApi } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import type { GpuInfo } from "@bundle:com.huawei.sysinfo/entry/ets/utils/NativeApi";
import hilog from "@ohos:hilog";
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
const TAG = 'GpuPage';
class GpuPage extends ViewPU {
    constructor(d6, e6, f6, g6 = -1, h6 = undefined, i6) {
        super(d6, f6, g6, i6);
        if (typeof h6 === "function") {
            this.paramsGenerator_ = h6;
        }
        this.__gpuInfo = new ObservedPropertyObjectPU(null, this, "gpuInfo");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__hasError = new ObservedPropertySimplePU(false, this, "hasError");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.setInitiallyProvidedValue(e6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(c6: GpuPage_Params) {
        if (c6.gpuInfo !== undefined) {
            this.gpuInfo = c6.gpuInfo;
        }
        if (c6.isLoading !== undefined) {
            this.isLoading = c6.isLoading;
        }
        if (c6.hasError !== undefined) {
            this.hasError = c6.hasError;
        }
        if (c6.errorMessage !== undefined) {
            this.errorMessage = c6.errorMessage;
        }
    }
    updateStateVars(b6: GpuPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(a6) {
        this.__gpuInfo.purgeDependencyOnElmtId(a6);
        this.__isLoading.purgeDependencyOnElmtId(a6);
        this.__hasError.purgeDependencyOnElmtId(a6);
        this.__errorMessage.purgeDependencyOnElmtId(a6);
    }
    aboutToBeDeleted() {
        this.__gpuInfo.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__hasError.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __gpuInfo: ObservedPropertyObjectPU<GpuInfo | null>;
    get gpuInfo() {
        return this.__gpuInfo.get();
    }
    set gpuInfo(z5: GpuInfo | null) {
        this.__gpuInfo.set(z5);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(y5: boolean) {
        this.__isLoading.set(y5);
    }
    private __hasError: ObservedPropertySimplePU<boolean>;
    get hasError() {
        return this.__hasError.get();
    }
    set hasError(x5: boolean) {
        this.__hasError.set(x5);
    }
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(w5: string) {
        this.__errorMessage.set(w5);
    }
    aboutToAppear() {
        hilog.info(0x0000, TAG, 'GpuPage aboutToAppear');
        this.loadGpuInfo();
    }
    loadGpuInfo() {
        try {
            const v5 = nativeApi.getGpuInfo();
            if (v5 && v5.success) {
                this.gpuInfo = v5;
                hilog.info(0x0000, TAG, 'GPU info loaded: vendor=%{public}s, renderer=%{public}s', v5.vendor, v5.renderer);
            }
            else {
                this.hasError = true;
                this.errorMessage = v5?.error || '无法获取 GPU 信息';
                hilog.error(0x0000, TAG, 'Failed to get GPU info: %{public}s', this.errorMessage);
            }
        }
        catch (u5) {
            this.hasError = true;
            this.errorMessage = String(u5);
            hilog.error(0x0000, TAG, 'Error loading GPU info: %{public}s', String(u5));
        }
        this.isLoading = false;
    }
    navigateToConcept(t5: string): void {
        router.pushUrl({
            url: 'pages/ConceptDetailPage',
            params: { conceptId: t5 }
        });
    }
    formatValue(r5: number, s5: string = ''): string {
        if (r5 === -1 || r5 === undefined) {
            return '不支持';
        }
        return s5 ? `${r5} ${s5}` : `${r5}`;
    }
    initialRender() {
        this.observeComponentCreation2((p5, q5) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((l5, m5) => {
                if (m5) {
                    let n5 = new NavigationBarWithArrow(this, {
                        title: 'GPU 信息',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, l5, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 61, col: 7 });
                    ViewPU.create(n5);
                    let o5 = () => {
                        return {
                            title: 'GPU 信息',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    n5.paramsGenerator_ = o5;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(l5, {
                        title: 'GPU 信息'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((j5, k5) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((h5, i5) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((b, c) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((f5, g5) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((d5, e5) => {
                        Text.create('加载中...');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.hasError) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((b5, c5) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((z4, a5) => {
                        Text.create('获取 GPU 信息失败');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((x4, y4) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.gpuInfo) {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((t4, u4) => {
                            if (u4) {
                                let v4 = new InfoHeader(this, {
                                    title: 'GPU 基本信息',
                                    subtitle: '通过 OpenGL ES API 获取的 GPU 硬件信息'
                                }, undefined, t4, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 100, col: 13 });
                                ViewPU.create(v4);
                                let w4 = () => {
                                    return {
                                        title: 'GPU 基本信息',
                                        subtitle: '通过 OpenGL ES API 获取的 GPU 硬件信息'
                                    };
                                };
                                v4.paramsGenerator_ = w4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t4, {
                                    title: 'GPU 基本信息',
                                    subtitle: '通过 OpenGL ES API 获取的 GPU 硬件信息'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((p4, q4) => {
                            if (q4) {
                                let r4 = new InfoCard(this, {
                                    title: 'GPU 厂商',
                                    value: this.gpuInfo.vendor || '未知'
                                }, undefined, p4, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 105, col: 13 });
                                ViewPU.create(r4);
                                let s4 = () => {
                                    return {
                                        title: 'GPU 厂商',
                                        value: this.gpuInfo.vendor || '未知'
                                    };
                                };
                                r4.paramsGenerator_ = s4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p4, {
                                    title: 'GPU 厂商',
                                    value: this.gpuInfo.vendor || '未知'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((l4, m4) => {
                            if (m4) {
                                let n4 = new InfoCard(this, {
                                    title: 'GPU 型号',
                                    value: this.gpuInfo.renderer || '未知'
                                }, undefined, l4, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 110, col: 13 });
                                ViewPU.create(n4);
                                let o4 = () => {
                                    return {
                                        title: 'GPU 型号',
                                        value: this.gpuInfo.renderer || '未知'
                                    };
                                };
                                n4.paramsGenerator_ = o4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l4, {
                                    title: 'GPU 型号',
                                    value: this.gpuInfo.renderer || '未知'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((h4, i4) => {
                            if (i4) {
                                let j4 = new InfoCard(this, {
                                    title: 'OpenGL ES 版本',
                                    value: this.gpuInfo.version || '未知'
                                }, undefined, h4, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 115, col: 13 });
                                ViewPU.create(j4);
                                let k4 = () => {
                                    return {
                                        title: 'OpenGL ES 版本',
                                        value: this.gpuInfo.version || '未知'
                                    };
                                };
                                j4.paramsGenerator_ = k4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(h4, {
                                    title: 'OpenGL ES 版本',
                                    value: this.gpuInfo.version || '未知'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((d4, e4) => {
                            if (e4) {
                                let f4 = new InfoCard(this, {
                                    title: 'GLSL 版本',
                                    value: this.gpuInfo.shadingLanguageVersion || '未知'
                                }, undefined, d4, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 120, col: 13 });
                                ViewPU.create(f4);
                                let g4 = () => {
                                    return {
                                        title: 'GLSL 版本',
                                        value: this.gpuInfo.shadingLanguageVersion || '未知'
                                    };
                                };
                                f4.paramsGenerator_ = g4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(d4, {
                                    title: 'GLSL 版本',
                                    value: this.gpuInfo.shadingLanguageVersion || '未知'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((z3, a4) => {
                            if (a4) {
                                let b4 = new InfoHeader(this, {
                                    title: '纹理限制',
                                    subtitle: 'GPU 对纹理资源的硬件限制',
                                    conceptId: 'gpu_max_texture_size',
                                    onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
                                }, undefined, z3, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 126, col: 13 });
                                ViewPU.create(b4);
                                let c4 = () => {
                                    return {
                                        title: '纹理限制',
                                        subtitle: 'GPU 对纹理资源的硬件限制',
                                        conceptId: 'gpu_max_texture_size',
                                        onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
                                    };
                                };
                                b4.paramsGenerator_ = c4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z3, {
                                    title: '纹理限制',
                                    subtitle: 'GPU 对纹理资源的硬件限制',
                                    conceptId: 'gpu_max_texture_size'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((v3, w3) => {
                            if (w3) {
                                let x3 = new InfoCardWithDesc(this, {
                                    title: '最大纹理尺寸',
                                    value: this.formatValue(this.gpuInfo.maxTextureSize, 'px'),
                                    conceptId: 'gpu_max_texture_size',
                                    onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
                                }, undefined, v3, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 133, col: 13 });
                                ViewPU.create(x3);
                                let y3 = () => {
                                    return {
                                        title: '最大纹理尺寸',
                                        value: this.formatValue(this.gpuInfo.maxTextureSize, 'px'),
                                        conceptId: 'gpu_max_texture_size',
                                        onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
                                    };
                                };
                                x3.paramsGenerator_ = y3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(v3, {
                                    title: '最大纹理尺寸',
                                    value: this.formatValue(this.gpuInfo.maxTextureSize, 'px'),
                                    conceptId: 'gpu_max_texture_size'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((r3, s3) => {
                            if (s3) {
                                let t3 = new InfoCardWithDesc(this, {
                                    title: '最大立方体贴图尺寸',
                                    value: this.formatValue(this.gpuInfo.maxCubeMapTextureSize, 'px'),
                                    conceptId: 'gpu_cube_map_size',
                                    onInfoClick: () => this.navigateToConcept('gpu_cube_map_size')
                                }, undefined, r3, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 140, col: 13 });
                                ViewPU.create(t3);
                                let u3 = () => {
                                    return {
                                        title: '最大立方体贴图尺寸',
                                        value: this.formatValue(this.gpuInfo.maxCubeMapTextureSize, 'px'),
                                        conceptId: 'gpu_cube_map_size',
                                        onInfoClick: () => this.navigateToConcept('gpu_cube_map_size')
                                    };
                                };
                                t3.paramsGenerator_ = u3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r3, {
                                    title: '最大立方体贴图尺寸',
                                    value: this.formatValue(this.gpuInfo.maxCubeMapTextureSize, 'px'),
                                    conceptId: 'gpu_cube_map_size'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((n3, o3) => {
                            if (o3) {
                                let p3 = new InfoCardWithDesc(this, {
                                    title: '最大渲染缓冲区尺寸',
                                    value: this.formatValue(this.gpuInfo.maxRenderbufferSize, 'px'),
                                    conceptId: 'gpu_max_texture_size',
                                    onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
                                }, undefined, n3, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 147, col: 13 });
                                ViewPU.create(p3);
                                let q3 = () => {
                                    return {
                                        title: '最大渲染缓冲区尺寸',
                                        value: this.formatValue(this.gpuInfo.maxRenderbufferSize, 'px'),
                                        conceptId: 'gpu_max_texture_size',
                                        onInfoClick: () => this.navigateToConcept('gpu_max_texture_size')
                                    };
                                };
                                p3.paramsGenerator_ = q3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(n3, {
                                    title: '最大渲染缓冲区尺寸',
                                    value: this.formatValue(this.gpuInfo.maxRenderbufferSize, 'px'),
                                    conceptId: 'gpu_max_texture_size'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((j3, k3) => {
                            if (k3) {
                                let l3 = new InfoCardWithDesc(this, {
                                    title: '纹理单元数',
                                    value: this.formatValue(this.gpuInfo.maxTextureImageUnits),
                                    conceptId: 'gpu_texture_units',
                                    onInfoClick: () => this.navigateToConcept('gpu_texture_units')
                                }, undefined, j3, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 154, col: 13 });
                                ViewPU.create(l3);
                                let m3 = () => {
                                    return {
                                        title: '纹理单元数',
                                        value: this.formatValue(this.gpuInfo.maxTextureImageUnits),
                                        conceptId: 'gpu_texture_units',
                                        onInfoClick: () => this.navigateToConcept('gpu_texture_units')
                                    };
                                };
                                l3.paramsGenerator_ = m3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(j3, {
                                    title: '纹理单元数',
                                    value: this.formatValue(this.gpuInfo.maxTextureImageUnits),
                                    conceptId: 'gpu_texture_units'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((f3, g3) => {
                            if (g3) {
                                let h3 = new InfoCardWithDesc(this, {
                                    title: '顶点纹理单元数',
                                    value: this.formatValue(this.gpuInfo.maxVertexTextureImageUnits),
                                    conceptId: 'gpu_texture_units',
                                    onInfoClick: () => this.navigateToConcept('gpu_texture_units')
                                }, undefined, f3, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 161, col: 13 });
                                ViewPU.create(h3);
                                let i3 = () => {
                                    return {
                                        title: '顶点纹理单元数',
                                        value: this.formatValue(this.gpuInfo.maxVertexTextureImageUnits),
                                        conceptId: 'gpu_texture_units',
                                        onInfoClick: () => this.navigateToConcept('gpu_texture_units')
                                    };
                                };
                                h3.paramsGenerator_ = i3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f3, {
                                    title: '顶点纹理单元数',
                                    value: this.formatValue(this.gpuInfo.maxVertexTextureImageUnits),
                                    conceptId: 'gpu_texture_units'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((b3, c3) => {
                            if (c3) {
                                let d3 = new InfoCardWithDesc(this, {
                                    title: '组合纹理单元数',
                                    value: this.formatValue(this.gpuInfo.maxCombinedTextureImageUnits),
                                    conceptId: 'gpu_texture_units',
                                    onInfoClick: () => this.navigateToConcept('gpu_texture_units')
                                }, undefined, b3, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 168, col: 13 });
                                ViewPU.create(d3);
                                let e3 = () => {
                                    return {
                                        title: '组合纹理单元数',
                                        value: this.formatValue(this.gpuInfo.maxCombinedTextureImageUnits),
                                        conceptId: 'gpu_texture_units',
                                        onInfoClick: () => this.navigateToConcept('gpu_texture_units')
                                    };
                                };
                                d3.paramsGenerator_ = e3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(b3, {
                                    title: '组合纹理单元数',
                                    value: this.formatValue(this.gpuInfo.maxCombinedTextureImageUnits),
                                    conceptId: 'gpu_texture_units'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((x2, y2) => {
                            if (y2) {
                                let z2 = new InfoHeader(this, {
                                    title: '视口与渲染',
                                    subtitle: 'GPU 对视口和渲染的限制',
                                    conceptId: 'gpu_viewport',
                                    onInfoClick: () => this.navigateToConcept('gpu_viewport')
                                }, undefined, x2, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 176, col: 13 });
                                ViewPU.create(z2);
                                let a3 = () => {
                                    return {
                                        title: '视口与渲染',
                                        subtitle: 'GPU 对视口和渲染的限制',
                                        conceptId: 'gpu_viewport',
                                        onInfoClick: () => this.navigateToConcept('gpu_viewport')
                                    };
                                };
                                z2.paramsGenerator_ = a3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x2, {
                                    title: '视口与渲染',
                                    subtitle: 'GPU 对视口和渲染的限制',
                                    conceptId: 'gpu_viewport'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((t2, u2) => {
                            if (u2) {
                                let v2 = new InfoCardWithDesc(this, {
                                    title: '最大视口尺寸',
                                    value: `${this.formatValue(this.gpuInfo.maxViewportWidth)} × ${this.formatValue(this.gpuInfo.maxViewportHeight)}`,
                                    conceptId: 'gpu_viewport',
                                    onInfoClick: () => this.navigateToConcept('gpu_viewport')
                                }, undefined, t2, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 183, col: 13 });
                                ViewPU.create(v2);
                                let w2 = () => {
                                    return {
                                        title: '最大视口尺寸',
                                        value: `${this.formatValue(this.gpuInfo.maxViewportWidth)} × ${this.formatValue(this.gpuInfo.maxViewportHeight)}`,
                                        conceptId: 'gpu_viewport',
                                        onInfoClick: () => this.navigateToConcept('gpu_viewport')
                                    };
                                };
                                v2.paramsGenerator_ = w2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t2, {
                                    title: '最大视口尺寸',
                                    value: `${this.formatValue(this.gpuInfo.maxViewportWidth)} × ${this.formatValue(this.gpuInfo.maxViewportHeight)}`,
                                    conceptId: 'gpu_viewport'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((p2, q2) => {
                            if (q2) {
                                let r2 = new InfoCardWithDesc(this, {
                                    title: '线宽范围',
                                    value: this.gpuInfo.aliasedLineWidthRange && this.gpuInfo.aliasedLineWidthRange.length >= 2
                                        ? `${this.gpuInfo.aliasedLineWidthRange[0]} - ${this.gpuInfo.aliasedLineWidthRange[1]}`
                                        : '未知',
                                    conceptId: 'gpu_line_width',
                                    onInfoClick: () => this.navigateToConcept('gpu_line_width')
                                }, undefined, p2, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 190, col: 13 });
                                ViewPU.create(r2);
                                let s2 = () => {
                                    return {
                                        title: '线宽范围',
                                        value: this.gpuInfo.aliasedLineWidthRange && this.gpuInfo.aliasedLineWidthRange.length >= 2
                                            ? `${this.gpuInfo.aliasedLineWidthRange[0]} - ${this.gpuInfo.aliasedLineWidthRange[1]}`
                                            : '未知',
                                        conceptId: 'gpu_line_width',
                                        onInfoClick: () => this.navigateToConcept('gpu_line_width')
                                    };
                                };
                                r2.paramsGenerator_ = s2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p2, {
                                    title: '线宽范围',
                                    value: this.gpuInfo.aliasedLineWidthRange && this.gpuInfo.aliasedLineWidthRange.length >= 2
                                        ? `${this.gpuInfo.aliasedLineWidthRange[0]} - ${this.gpuInfo.aliasedLineWidthRange[1]}`
                                        : '未知',
                                    conceptId: 'gpu_line_width'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((l2, m2) => {
                            if (m2) {
                                let n2 = new InfoCardWithDesc(this, {
                                    title: '点大小范围',
                                    value: this.gpuInfo.aliasedPointSizeRange && this.gpuInfo.aliasedPointSizeRange.length >= 2
                                        ? `${this.gpuInfo.aliasedPointSizeRange[0]} - ${this.gpuInfo.aliasedPointSizeRange[1]}`
                                        : '未知',
                                    conceptId: 'gpu_point_size',
                                    onInfoClick: () => this.navigateToConcept('gpu_point_size')
                                }, undefined, l2, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 199, col: 13 });
                                ViewPU.create(n2);
                                let o2 = () => {
                                    return {
                                        title: '点大小范围',
                                        value: this.gpuInfo.aliasedPointSizeRange && this.gpuInfo.aliasedPointSizeRange.length >= 2
                                            ? `${this.gpuInfo.aliasedPointSizeRange[0]} - ${this.gpuInfo.aliasedPointSizeRange[1]}`
                                            : '未知',
                                        conceptId: 'gpu_point_size',
                                        onInfoClick: () => this.navigateToConcept('gpu_point_size')
                                    };
                                };
                                n2.paramsGenerator_ = o2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l2, {
                                    title: '点大小范围',
                                    value: this.gpuInfo.aliasedPointSizeRange && this.gpuInfo.aliasedPointSizeRange.length >= 2
                                        ? `${this.gpuInfo.aliasedPointSizeRange[0]} - ${this.gpuInfo.aliasedPointSizeRange[1]}`
                                        : '未知',
                                    conceptId: 'gpu_point_size'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((h2, i2) => {
                            if (i2) {
                                let j2 = new InfoHeader(this, {
                                    title: '着色器限制',
                                    subtitle: 'GPU 对着色器程序的资源限制',
                                    conceptId: 'gpu_vertex_attribs',
                                    onInfoClick: () => this.navigateToConcept('gpu_vertex_attribs')
                                }, undefined, h2, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 209, col: 13 });
                                ViewPU.create(j2);
                                let k2 = () => {
                                    return {
                                        title: '着色器限制',
                                        subtitle: 'GPU 对着色器程序的资源限制',
                                        conceptId: 'gpu_vertex_attribs',
                                        onInfoClick: () => this.navigateToConcept('gpu_vertex_attribs')
                                    };
                                };
                                j2.paramsGenerator_ = k2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(h2, {
                                    title: '着色器限制',
                                    subtitle: 'GPU 对着色器程序的资源限制',
                                    conceptId: 'gpu_vertex_attribs'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((d2, e2) => {
                            if (e2) {
                                let f2 = new InfoCardWithDesc(this, {
                                    title: '顶点属性数',
                                    value: this.formatValue(this.gpuInfo.maxVertexAttribs),
                                    conceptId: 'gpu_vertex_attribs',
                                    onInfoClick: () => this.navigateToConcept('gpu_vertex_attribs')
                                }, undefined, d2, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 216, col: 13 });
                                ViewPU.create(f2);
                                let g2 = () => {
                                    return {
                                        title: '顶点属性数',
                                        value: this.formatValue(this.gpuInfo.maxVertexAttribs),
                                        conceptId: 'gpu_vertex_attribs',
                                        onInfoClick: () => this.navigateToConcept('gpu_vertex_attribs')
                                    };
                                };
                                f2.paramsGenerator_ = g2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(d2, {
                                    title: '顶点属性数',
                                    value: this.formatValue(this.gpuInfo.maxVertexAttribs),
                                    conceptId: 'gpu_vertex_attribs'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((z1, a2) => {
                            if (a2) {
                                let b2 = new InfoCardWithDesc(this, {
                                    title: '顶点 Uniform 向量数',
                                    value: this.formatValue(this.gpuInfo.maxVertexUniformVectors),
                                    conceptId: 'gpu_uniform_vectors',
                                    onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                }, undefined, z1, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 223, col: 13 });
                                ViewPU.create(b2);
                                let c2 = () => {
                                    return {
                                        title: '顶点 Uniform 向量数',
                                        value: this.formatValue(this.gpuInfo.maxVertexUniformVectors),
                                        conceptId: 'gpu_uniform_vectors',
                                        onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                    };
                                };
                                b2.paramsGenerator_ = c2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z1, {
                                    title: '顶点 Uniform 向量数',
                                    value: this.formatValue(this.gpuInfo.maxVertexUniformVectors),
                                    conceptId: 'gpu_uniform_vectors'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((v1, w1) => {
                            if (w1) {
                                let x1 = new InfoCardWithDesc(this, {
                                    title: '片段 Uniform 向量数',
                                    value: this.formatValue(this.gpuInfo.maxFragmentUniformVectors),
                                    conceptId: 'gpu_uniform_vectors',
                                    onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                }, undefined, v1, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 230, col: 13 });
                                ViewPU.create(x1);
                                let y1 = () => {
                                    return {
                                        title: '片段 Uniform 向量数',
                                        value: this.formatValue(this.gpuInfo.maxFragmentUniformVectors),
                                        conceptId: 'gpu_uniform_vectors',
                                        onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                    };
                                };
                                x1.paramsGenerator_ = y1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(v1, {
                                    title: '片段 Uniform 向量数',
                                    value: this.formatValue(this.gpuInfo.maxFragmentUniformVectors),
                                    conceptId: 'gpu_uniform_vectors'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((r1, s1) => {
                            if (s1) {
                                let t1 = new InfoCardWithDesc(this, {
                                    title: 'Varying 向量数',
                                    value: this.formatValue(this.gpuInfo.maxVaryingVectors),
                                    conceptId: 'gpu_varying_vectors',
                                    onInfoClick: () => this.navigateToConcept('gpu_varying_vectors')
                                }, undefined, r1, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 237, col: 13 });
                                ViewPU.create(t1);
                                let u1 = () => {
                                    return {
                                        title: 'Varying 向量数',
                                        value: this.formatValue(this.gpuInfo.maxVaryingVectors),
                                        conceptId: 'gpu_varying_vectors',
                                        onInfoClick: () => this.navigateToConcept('gpu_varying_vectors')
                                    };
                                };
                                t1.paramsGenerator_ = u1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r1, {
                                    title: 'Varying 向量数',
                                    value: this.formatValue(this.gpuInfo.maxVaryingVectors),
                                    conceptId: 'gpu_varying_vectors'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((n1, o1) => {
                            if (o1) {
                                let p1 = new InfoCardWithDesc(this, {
                                    title: 'Uniform 缓冲区绑定数',
                                    value: this.formatValue(this.gpuInfo.maxUniformBufferBindings),
                                    conceptId: 'gpu_uniform_vectors',
                                    onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                }, undefined, n1, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 244, col: 13 });
                                ViewPU.create(p1);
                                let q1 = () => {
                                    return {
                                        title: 'Uniform 缓冲区绑定数',
                                        value: this.formatValue(this.gpuInfo.maxUniformBufferBindings),
                                        conceptId: 'gpu_uniform_vectors',
                                        onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                    };
                                };
                                p1.paramsGenerator_ = q1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(n1, {
                                    title: 'Uniform 缓冲区绑定数',
                                    value: this.formatValue(this.gpuInfo.maxUniformBufferBindings),
                                    conceptId: 'gpu_uniform_vectors'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((j1, k1) => {
                            if (k1) {
                                let l1 = new InfoCardWithDesc(this, {
                                    title: 'Uniform 块大小',
                                    value: this.formatValue(this.gpuInfo.maxUniformBlockSize, 'bytes'),
                                    conceptId: 'gpu_uniform_vectors',
                                    onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                }, undefined, j1, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 251, col: 13 });
                                ViewPU.create(l1);
                                let m1 = () => {
                                    return {
                                        title: 'Uniform 块大小',
                                        value: this.formatValue(this.gpuInfo.maxUniformBlockSize, 'bytes'),
                                        conceptId: 'gpu_uniform_vectors',
                                        onInfoClick: () => this.navigateToConcept('gpu_uniform_vectors')
                                    };
                                };
                                l1.paramsGenerator_ = m1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(j1, {
                                    title: 'Uniform 块大小',
                                    value: this.formatValue(this.gpuInfo.maxUniformBlockSize, 'bytes'),
                                    conceptId: 'gpu_uniform_vectors'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((f1, g1) => {
                            if (g1) {
                                let h1 = new InfoHeader(this, {
                                    title: '其他限制',
                                    subtitle: 'GPU 的其他硬件能力限制',
                                    conceptId: 'gpu_multisample',
                                    onInfoClick: () => this.navigateToConcept('gpu_multisample')
                                }, undefined, f1, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 259, col: 13 });
                                ViewPU.create(h1);
                                let i1 = () => {
                                    return {
                                        title: '其他限制',
                                        subtitle: 'GPU 的其他硬件能力限制',
                                        conceptId: 'gpu_multisample',
                                        onInfoClick: () => this.navigateToConcept('gpu_multisample')
                                    };
                                };
                                h1.paramsGenerator_ = i1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(f1, {
                                    title: '其他限制',
                                    subtitle: 'GPU 的其他硬件能力限制',
                                    conceptId: 'gpu_multisample'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    {
                        this.observeComponentCreation2((b1, c1) => {
                            if (c1) {
                                let d1 = new InfoCardWithDesc(this, {
                                    title: '绘制缓冲区数',
                                    value: this.formatValue(this.gpuInfo.maxDrawBuffers),
                                    conceptId: 'gpu_draw_buffers',
                                    onInfoClick: () => this.navigateToConcept('gpu_draw_buffers')
                                }, undefined, b1, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 266, col: 13 });
                                ViewPU.create(d1);
                                let e1 = () => {
                                    return {
                                        title: '绘制缓冲区数',
                                        value: this.formatValue(this.gpuInfo.maxDrawBuffers),
                                        conceptId: 'gpu_draw_buffers',
                                        onInfoClick: () => this.navigateToConcept('gpu_draw_buffers')
                                    };
                                };
                                d1.paramsGenerator_ = e1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(b1, {
                                    title: '绘制缓冲区数',
                                    value: this.formatValue(this.gpuInfo.maxDrawBuffers),
                                    conceptId: 'gpu_draw_buffers'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((x, y) => {
                            if (y) {
                                let z = new InfoCardWithDesc(this, {
                                    title: '颜色附件数',
                                    value: this.formatValue(this.gpuInfo.maxColorAttachments),
                                    conceptId: 'gpu_draw_buffers',
                                    onInfoClick: () => this.navigateToConcept('gpu_draw_buffers')
                                }, undefined, x, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 273, col: 13 });
                                ViewPU.create(z);
                                let a1 = () => {
                                    return {
                                        title: '颜色附件数',
                                        value: this.formatValue(this.gpuInfo.maxColorAttachments),
                                        conceptId: 'gpu_draw_buffers',
                                        onInfoClick: () => this.navigateToConcept('gpu_draw_buffers')
                                    };
                                };
                                z.paramsGenerator_ = a1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(x, {
                                    title: '颜色附件数',
                                    value: this.formatValue(this.gpuInfo.maxColorAttachments),
                                    conceptId: 'gpu_draw_buffers'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((t, u) => {
                            if (u) {
                                let v = new InfoCardWithDesc(this, {
                                    title: '最大采样数 (MSAA)',
                                    value: this.formatValue(this.gpuInfo.maxSamples, 'x'),
                                    conceptId: 'gpu_multisample',
                                    onInfoClick: () => this.navigateToConcept('gpu_multisample')
                                }, undefined, t, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 280, col: 13 });
                                ViewPU.create(v);
                                let w = () => {
                                    return {
                                        title: '最大采样数 (MSAA)',
                                        value: this.formatValue(this.gpuInfo.maxSamples, 'x'),
                                        conceptId: 'gpu_multisample',
                                        onInfoClick: () => this.navigateToConcept('gpu_multisample')
                                    };
                                };
                                v.paramsGenerator_ = w;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t, {
                                    title: '最大采样数 (MSAA)',
                                    value: this.formatValue(this.gpuInfo.maxSamples, 'x'),
                                    conceptId: 'gpu_multisample'
                                });
                            }
                        }, { name: "InfoCardWithDesc" });
                    }
                    {
                        this.observeComponentCreation2((p, q) => {
                            if (q) {
                                let r = new InfoCard(this, {
                                    title: '最大元素索引',
                                    value: this.formatValue(this.gpuInfo.maxElementIndex)
                                }, undefined, p, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 287, col: 13 });
                                ViewPU.create(r);
                                let s = () => {
                                    return {
                                        title: '最大元素索引',
                                        value: this.formatValue(this.gpuInfo.maxElementIndex)
                                    };
                                };
                                r.paramsGenerator_ = s;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p, {
                                    title: '最大元素索引',
                                    value: this.formatValue(this.gpuInfo.maxElementIndex)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((l, m) => {
                            if (m) {
                                let n = new InfoCard(this, {
                                    title: '扩展数量',
                                    value: this.formatValue(this.gpuInfo.numExtensions)
                                }, undefined, l, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 292, col: 13 });
                                ViewPU.create(n);
                                let o = () => {
                                    return {
                                        title: '扩展数量',
                                        value: this.formatValue(this.gpuInfo.numExtensions)
                                    };
                                };
                                n.paramsGenerator_ = o;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l, {
                                    title: '扩展数量',
                                    value: this.formatValue(this.gpuInfo.numExtensions)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((h, i) => {
                            if (i) {
                                let j = new InfoHeader(this, {
                                    title: '扩展支持',
                                    subtitle: 'GPU 支持的 OpenGL ES 扩展功能',
                                    conceptId: 'gpu_extensions',
                                    onInfoClick: () => this.navigateToConcept('gpu_extensions')
                                }, undefined, h, () => { }, { page: "entry/src/main/ets/pages/GpuPage.ets", line: 298, col: 13 });
                                ViewPU.create(j);
                                let k = () => {
                                    return {
                                        title: '扩展支持',
                                        subtitle: 'GPU 支持的 OpenGL ES 扩展功能',
                                        conceptId: 'gpu_extensions',
                                        onInfoClick: () => this.navigateToConcept('gpu_extensions')
                                    };
                                };
                                j.paramsGenerator_ = k;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(h, {
                                    title: '扩展支持',
                                    subtitle: 'GPU 支持的 OpenGL ES 扩展功能',
                                    conceptId: 'gpu_extensions'
                                });
                            }
                        }, { name: "InfoHeader" });
                    }
                    this.observeComponentCreation2((f, g) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(16);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Column);
                    this.observeComponentCreation2((d, e) => {
                        Text.create(this.gpuInfo.extensions || '无扩展信息');
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.maxLines(10);
                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
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
