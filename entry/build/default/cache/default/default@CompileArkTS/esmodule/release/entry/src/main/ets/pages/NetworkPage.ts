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
    constructor(e23, f23, g23, h23 = -1, i23 = undefined, j23) {
        super(e23, g23, h23, j23);
        if (typeof i23 === "function") {
            this.paramsGenerator_ = i23;
        }
        this.__networkDetails = new ObservedPropertyObjectPU(null, this, "networkDetails");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(f23);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(d23: NetworkPage_Params) {
        if (d23.networkDetails !== undefined) {
            this.networkDetails = d23.networkDetails;
        }
        if (d23.isLoading !== undefined) {
            this.isLoading = d23.isLoading;
        }
    }
    updateStateVars(c23: NetworkPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(b23) {
        this.__networkDetails.purgeDependencyOnElmtId(b23);
        this.__isLoading.purgeDependencyOnElmtId(b23);
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
    set networkDetails(a23: NetworkDetails | null) {
        this.__networkDetails.set(a23);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(z22: boolean) {
        this.__isLoading.set(z22);
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
            const s22 = connection.getDefaultNetSync();
            if (s22 && s22.netId !== 0) {
                const t22 = connection.getNetCapabilitiesSync(s22);
                const u22 = connection.getConnectionPropertiesSync(s22);
                const v22 = t22.bearerTypes[0] || connection.NetBearType.BEARER_CELLULAR;
                const w22 = t22.networkCap || [];
                const x22 = t22.linkUpBandwidthKbps || 0;
                const y22 = t22.linkDownBandwidthKbps || 0;
                this.networkDetails = {
                    type: this.getNetworkTypeName(v22),
                    isConnected: true,
                    isMetered: w22.includes(connection.NetCap.NET_CAPABILITY_NOT_METERED) ? false : true,
                    isRoaming: false,
                    linkUpBandwidth: x22,
                    linkDownBandwidth: y22
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
        catch (r22) {
            hilog.error(0x0000, TAG, 'Load network info error: %{public}s', String(r22));
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
    getNetworkTypeName(q22: connection.NetBearType): string {
        switch (q22) {
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
    formatBandwidth(p22: number): string {
        if (p22 <= 0)
            return '未知';
        if (p22 >= 1000000) {
            return `${(p22 / 1000000).toFixed(1)} Gbps`;
        }
        else if (p22 >= 1000) {
            return `${(p22 / 1000).toFixed(1)} Mbps`;
        }
        else {
            return `${p22} Kbps`;
        }
    }
    DataDescription(l22: string, m22 = null) {
        this.observeComponentCreation2((n22, o22) => {
            Text.create(l22);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((j22, k22) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((h22, i22) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((f22, g22) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((d22, e22) => {
            Text.create('网络');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((b22, c22) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((z21, a22) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((l20, m20) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((x21, y21) => {
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
                        this.observeComponentCreation2((t21, u21) => {
                            if (u21) {
                                let v21 = new SectionHeader(this, { title: '网络状态' }, undefined, t21, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 140, col: 13 });
                                ViewPU.create(v21);
                                let w21 = () => {
                                    return {
                                        title: '网络状态'
                                    };
                                };
                                v21.paramsGenerator_ = w21;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(t21, {
                                    title: '网络状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前设备的网络连接状态和网络类型。');
                    {
                        this.observeComponentCreation2((p21, q21) => {
                            if (q21) {
                                let r21 = new InfoCard(this, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                }, undefined, p21, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 143, col: 13 });
                                ViewPU.create(r21);
                                let s21 = () => {
                                    return {
                                        title: '网络类型',
                                        value: this.networkDetails.type
                                    };
                                };
                                r21.paramsGenerator_ = s21;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(p21, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((l21, m21) => {
                            if (m21) {
                                let n21 = new InfoCard(this, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                }, undefined, l21, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 148, col: 13 });
                                ViewPU.create(n21);
                                let o21 = () => {
                                    return {
                                        title: '连接状态',
                                        value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                    };
                                };
                                n21.paramsGenerator_ = o21;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(l21, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((h21, i21) => {
                            if (i21) {
                                let j21 = new InfoCard(this, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                }, undefined, h21, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 153, col: 13 });
                                ViewPU.create(j21);
                                let k21 = () => {
                                    return {
                                        title: '计费网络',
                                        value: this.networkDetails.isMetered ? '是' : '否'
                                    };
                                };
                                j21.paramsGenerator_ = k21;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(h21, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((d21, e21) => {
                            if (e21) {
                                let f21 = new SectionHeader(this, { title: '带宽信息' }, undefined, d21, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 158, col: 13 });
                                ViewPU.create(f21);
                                let g21 = () => {
                                    return {
                                        title: '带宽信息'
                                    };
                                };
                                f21.paramsGenerator_ = g21;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(d21, {
                                    title: '带宽信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前网络连接的理论上行和下行带宽。实际网速可能因网络环境、信号强度等因素而有所不同。');
                    {
                        this.observeComponentCreation2((z20, a21) => {
                            if (a21) {
                                let b21 = new InfoCard(this, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                }, undefined, z20, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 161, col: 13 });
                                ViewPU.create(b21);
                                let c21 = () => {
                                    return {
                                        title: '上行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                    };
                                };
                                b21.paramsGenerator_ = c21;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(z20, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((v20, w20) => {
                            if (w20) {
                                let x20 = new InfoCard(this, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                }, undefined, v20, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 166, col: 13 });
                                ViewPU.create(x20);
                                let y20 = () => {
                                    return {
                                        title: '下行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                    };
                                };
                                x20.paramsGenerator_ = y20;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(v20, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((r20, s20) => {
                            if (s20) {
                                let t20 = new SectionHeader(this, { title: '说明' }, undefined, r20, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 171, col: 13 });
                                ViewPU.create(t20);
                                let u20 = () => {
                                    return {
                                        title: '说明'
                                    };
                                };
                                t20.paramsGenerator_ = u20;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(r20, {
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
                    this.observeComponentCreation2((p20, q20) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((n20, o20) => {
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
