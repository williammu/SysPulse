if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NetworkPage_Params {
    networkDetails?: NetworkDetails | null;
    isLoading?: boolean;
}
import router from "@ohos:router";
import connection from "@ohos:net.connection";
import { InfoCard } from "@bundle:com.huawei.sysinfo/entry/ets/components/InfoCard";
import { SectionHeader } from "@bundle:com.huawei.sysinfo/entry/ets/components/SectionHeader";
import hilog from "@ohos:hilog";
const TAG = 'NetworkPage';
interface NetworkDetails {
    type: string;
    isConnected: boolean;
    isMetered: boolean;
    isRoaming: boolean;
    linkUpBandwidth: number;
    linkDownBandwidth: number;
}
class NetworkPage extends ViewPU {
    constructor(h36, i36, j36, k36 = -1, l36 = undefined, m36) {
        super(h36, j36, k36, m36);
        if (typeof l36 === "function") {
            this.paramsGenerator_ = l36;
        }
        this.__networkDetails = new ObservedPropertyObjectPU(null, this, "networkDetails");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(i36);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(g36: NetworkPage_Params) {
        if (g36.networkDetails !== undefined) {
            this.networkDetails = g36.networkDetails;
        }
        if (g36.isLoading !== undefined) {
            this.isLoading = g36.isLoading;
        }
    }
    updateStateVars(f36: NetworkPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(e36) {
        this.__networkDetails.purgeDependencyOnElmtId(e36);
        this.__isLoading.purgeDependencyOnElmtId(e36);
    }
    aboutToBeDeleted() {
        this.__networkDetails.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __networkDetails: ObservedPropertyObjectPU<NetworkDetails | null>;
    get networkDetails() {
        return this.__networkDetails.get();
    }
    set networkDetails(d36: NetworkDetails | null) {
        this.__networkDetails.set(d36);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(c36: boolean) {
        this.__isLoading.set(c36);
    }
    async aboutToAppear() {
        hilog.info(0x0000, TAG, 'NetworkPage aboutToAppear');
        await this.loadNetworkInfo();
        setTimeout(() => {
            this.isLoading = false;
        }, 100);
    }
    async loadNetworkInfo() {
        try {
            const v35 = connection.getDefaultNetSync();
            if (v35 && v35.netId !== 0) {
                const w35 = connection.getNetCapabilitiesSync(v35);
                const x35 = connection.getConnectionPropertiesSync(v35);
                const y35 = w35.bearerTypes[0] || connection.NetBearType.BEARER_CELLULAR;
                const z35 = w35.networkCap || [];
                const a36 = w35.linkUpBandwidthKbps || 0;
                const b36 = w35.linkDownBandwidthKbps || 0;
                this.networkDetails = {
                    type: this.getNetworkTypeName(y35),
                    isConnected: true,
                    isMetered: z35.includes(connection.NetCap.NET_CAPABILITY_NOT_METERED) ? false : true,
                    isRoaming: false,
                    linkUpBandwidth: a36,
                    linkDownBandwidth: b36
                };
            }
            else {
                this.networkDetails = {
                    type: '无网络',
                    isConnected: false,
                    isMetered: false,
                    isRoaming: false,
                    linkUpBandwidth: 0,
                    linkDownBandwidth: 0
                };
            }
        }
        catch (u35) {
            hilog.error(0x0000, TAG, 'Load network info error: %{public}s', String(u35));
            this.networkDetails = {
                type: '未知',
                isConnected: false,
                isMetered: false,
                isRoaming: false,
                linkUpBandwidth: 0,
                linkDownBandwidth: 0
            };
        }
    }
    getNetworkTypeName(t35: connection.NetBearType): string {
        switch (t35) {
            case connection.NetBearType.BEARER_CELLULAR:
                return '移动数据';
            case connection.NetBearType.BEARER_WIFI:
                return 'Wi-Fi';
            case connection.NetBearType.BEARER_BLUETOOTH:
                return '蓝牙';
            case connection.NetBearType.BEARER_ETHERNET:
                return '以太网';
            case connection.NetBearType.BEARER_VPN:
                return 'VPN';
            default:
                return '未知';
        }
    }
    formatBandwidth(s35: number): string {
        if (s35 <= 0)
            return '未知';
        if (s35 >= 1000000) {
            return `${(s35 / 1000000).toFixed(1)} Gbps`;
        }
        else if (s35 >= 1000) {
            return `${(s35 / 1000).toFixed(1)} Mbps`;
        }
        else {
            return `${s35} Kbps`;
        }
    }
    DataDescription(o35: string, p35 = null) {
        this.observeComponentCreation2((q35, r35) => {
            Text.create(o35);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((m35, n35) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((k35, l35) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((i35, j35) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((g35, h35) => {
            Text.create('网络');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((e35, f35) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((c35, d35) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((o33, p33) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((a35, b35) => {
                        Text.create('加载中...');
                        Text.fontSize(16);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                });
            }
            else if (this.networkDetails) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((w34, x34) => {
                            if (x34) {
                                let y34 = new SectionHeader(this, { title: '网络状态' }, undefined, w34, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 140, col: 13 });
                                ViewPU.create(y34);
                                let z34 = () => {
                                    return {
                                        title: '网络状态'
                                    };
                                };
                                y34.paramsGenerator_ = z34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w34, {
                                    title: '网络状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前设备的网络连接状态和网络类型。');
                    {
                        this.observeComponentCreation2((s34, t34) => {
                            if (t34) {
                                let u34 = new InfoCard(this, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                }, undefined, s34, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 143, col: 13 });
                                ViewPU.create(u34);
                                let v34 = () => {
                                    return {
                                        title: '网络类型',
                                        value: this.networkDetails.type
                                    };
                                };
                                u34.paramsGenerator_ = v34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s34, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((o34, p34) => {
                            if (p34) {
                                let q34 = new InfoCard(this, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                }, undefined, o34, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 148, col: 13 });
                                ViewPU.create(q34);
                                let r34 = () => {
                                    return {
                                        title: '连接状态',
                                        value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                    };
                                };
                                q34.paramsGenerator_ = r34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o34, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((k34, l34) => {
                            if (l34) {
                                let m34 = new InfoCard(this, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                }, undefined, k34, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 153, col: 13 });
                                ViewPU.create(m34);
                                let n34 = () => {
                                    return {
                                        title: '计费网络',
                                        value: this.networkDetails.isMetered ? '是' : '否'
                                    };
                                };
                                m34.paramsGenerator_ = n34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k34, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((g34, h34) => {
                            if (h34) {
                                let i34 = new SectionHeader(this, { title: '带宽信息' }, undefined, g34, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 158, col: 13 });
                                ViewPU.create(i34);
                                let j34 = () => {
                                    return {
                                        title: '带宽信息'
                                    };
                                };
                                i34.paramsGenerator_ = j34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g34, {
                                    title: '带宽信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前网络连接的理论上行和下行带宽。实际网速可能因网络环境、信号强度等因素而有所不同。');
                    {
                        this.observeComponentCreation2((c34, d34) => {
                            if (d34) {
                                let e34 = new InfoCard(this, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                }, undefined, c34, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 161, col: 13 });
                                ViewPU.create(e34);
                                let f34 = () => {
                                    return {
                                        title: '上行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                    };
                                };
                                e34.paramsGenerator_ = f34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c34, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((y33, z33) => {
                            if (z33) {
                                let a34 = new InfoCard(this, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                }, undefined, y33, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 166, col: 13 });
                                ViewPU.create(a34);
                                let b34 = () => {
                                    return {
                                        title: '下行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                    };
                                };
                                a34.paramsGenerator_ = b34;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(y33, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((u33, v33) => {
                            if (v33) {
                                let w33 = new SectionHeader(this, { title: '说明' }, undefined, u33, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 171, col: 13 });
                                ViewPU.create(w33);
                                let x33 = () => {
                                    return {
                                        title: '说明'
                                    };
                                };
                                w33.paramsGenerator_ = x33;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(u33, {
                                    title: '说明'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('网络信息通过 @ohos.net.connection API 获取。移动数据网络通常按流量计费，Wi-Fi 网络通常不计费。带宽信息由系统根据网络类型估算，不代表实际测速结果。');
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((s33, t33) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((q33, r33) => {
                        Text.create('无法获取网络信息');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin(24);
                    }, Text);
                    Text.pop();
                    Column.pop();
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
        return "NetworkPage";
    }
}
registerNamedRoute(() => new NetworkPage(undefined, {}), "", { bundleName: "com.huawei.sysinfo", moduleName: "entry", pagePath: "pages/NetworkPage", pageFullPath: "entry/src/main/ets/pages/NetworkPage", integratedHsp: "false", moduleType: "followWithHap" });
