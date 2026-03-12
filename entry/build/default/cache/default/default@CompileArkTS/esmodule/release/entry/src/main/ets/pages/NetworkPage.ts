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
    constructor(b20, c20, d20, e20 = -1, f20 = undefined, g20) {
        super(b20, d20, e20, g20);
        if (typeof f20 === "function") {
            this.paramsGenerator_ = f20;
        }
        this.__networkDetails = new ObservedPropertyObjectPU(null, this, "networkDetails");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(c20);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(a20: NetworkPage_Params) {
        if (a20.networkDetails !== undefined) {
            this.networkDetails = a20.networkDetails;
        }
        if (a20.isLoading !== undefined) {
            this.isLoading = a20.isLoading;
        }
    }
    updateStateVars(z19: NetworkPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(y19) {
        this.__networkDetails.purgeDependencyOnElmtId(y19);
        this.__isLoading.purgeDependencyOnElmtId(y19);
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
    set networkDetails(x19: NetworkDetails | null) {
        this.__networkDetails.set(x19);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(w19: boolean) {
        this.__isLoading.set(w19);
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
            const p19 = connection.getDefaultNetSync();
            if (p19 && p19.netId !== 0) {
                const q19 = connection.getNetCapabilitiesSync(p19);
                const r19 = connection.getConnectionPropertiesSync(p19);
                const s19 = q19.bearerTypes[0] || connection.NetBearType.BEARER_CELLULAR;
                const t19 = q19.networkCap || [];
                const u19 = q19.linkUpBandwidthKbps || 0;
                const v19 = q19.linkDownBandwidthKbps || 0;
                this.networkDetails = {
                    type: this.getNetworkTypeName(s19),
                    isConnected: true,
                    isMetered: t19.includes(connection.NetCap.NET_CAPABILITY_NOT_METERED) ? false : true,
                    isRoaming: false,
                    linkUpBandwidth: u19,
                    linkDownBandwidth: v19
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
        catch (o19) {
            hilog.error(0x0000, TAG, 'Load network info error: %{public}s', String(o19));
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
    getNetworkTypeName(n19: connection.NetBearType): string {
        switch (n19) {
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
    formatBandwidth(m19: number): string {
        if (m19 <= 0)
            return '未知';
        if (m19 >= 1000000) {
            return `${(m19 / 1000000).toFixed(1)} Gbps`;
        }
        else if (m19 >= 1000) {
            return `${(m19 / 1000).toFixed(1)} Mbps`;
        }
        else {
            return `${m19} Kbps`;
        }
    }
    DataDescription(i19: string, j19 = null) {
        this.observeComponentCreation2((k19, l19) => {
            Text.create(i19);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((g19, h19) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F7F8FA');
        }, Column);
        this.observeComponentCreation2((e19, f19) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((c19, d19) => {
            Text.create('← 返回');
            Text.fontSize(16);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((a19, b19) => {
            Text.create('网络');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((y18, z18) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((w18, x18) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((i17, j17) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((u18, v18) => {
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
                        this.observeComponentCreation2((q18, r18) => {
                            if (r18) {
                                let s18 = new SectionHeader(this, { title: '网络状态' }, undefined, q18, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 139, col: 13 });
                                ViewPU.create(s18);
                                let t18 = () => {
                                    return {
                                        title: '网络状态'
                                    };
                                };
                                s18.paramsGenerator_ = t18;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(q18, {
                                    title: '网络状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前设备的网络连接状态和网络类型。');
                    {
                        this.observeComponentCreation2((m18, n18) => {
                            if (n18) {
                                let o18 = new InfoCard(this, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                }, undefined, m18, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 142, col: 13 });
                                ViewPU.create(o18);
                                let p18 = () => {
                                    return {
                                        title: '网络类型',
                                        value: this.networkDetails.type
                                    };
                                };
                                o18.paramsGenerator_ = p18;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(m18, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((i18, j18) => {
                            if (j18) {
                                let k18 = new InfoCard(this, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                }, undefined, i18, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 147, col: 13 });
                                ViewPU.create(k18);
                                let l18 = () => {
                                    return {
                                        title: '连接状态',
                                        value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                    };
                                };
                                k18.paramsGenerator_ = l18;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(i18, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((e18, f18) => {
                            if (f18) {
                                let g18 = new InfoCard(this, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                }, undefined, e18, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 152, col: 13 });
                                ViewPU.create(g18);
                                let h18 = () => {
                                    return {
                                        title: '计费网络',
                                        value: this.networkDetails.isMetered ? '是' : '否'
                                    };
                                };
                                g18.paramsGenerator_ = h18;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(e18, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((a18, b18) => {
                            if (b18) {
                                let c18 = new SectionHeader(this, { title: '带宽信息' }, undefined, a18, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 157, col: 13 });
                                ViewPU.create(c18);
                                let d18 = () => {
                                    return {
                                        title: '带宽信息'
                                    };
                                };
                                c18.paramsGenerator_ = d18;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a18, {
                                    title: '带宽信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前网络连接的理论上行和下行带宽。实际网速可能因网络环境、信号强度等因素而有所不同。');
                    {
                        this.observeComponentCreation2((w17, x17) => {
                            if (x17) {
                                let y17 = new InfoCard(this, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                }, undefined, w17, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 160, col: 13 });
                                ViewPU.create(y17);
                                let z17 = () => {
                                    return {
                                        title: '上行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                    };
                                };
                                y17.paramsGenerator_ = z17;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w17, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((s17, t17) => {
                            if (t17) {
                                let u17 = new InfoCard(this, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                }, undefined, s17, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 165, col: 13 });
                                ViewPU.create(u17);
                                let v17 = () => {
                                    return {
                                        title: '下行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                    };
                                };
                                u17.paramsGenerator_ = v17;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s17, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((o17, p17) => {
                            if (p17) {
                                let q17 = new SectionHeader(this, { title: '说明' }, undefined, o17, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 170, col: 13 });
                                ViewPU.create(q17);
                                let r17 = () => {
                                    return {
                                        title: '说明'
                                    };
                                };
                                q17.paramsGenerator_ = r17;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o17, {
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
                    this.observeComponentCreation2((m17, n17) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((k17, l17) => {
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
