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
import { NavigationBarWithArrow } from "@bundle:com.huawei.sysinfo/entry/ets/components/NavigationBar";
const TAG = 'NetworkPage';
interface NetworkDetails {
    type: string;
    isConnected: boolean;
    isMetered: boolean;
    isRoaming: boolean;
    linkUpBandwidth: number;
    linkDownBandwidth: number;
    interfaceName: string;
    ipAddress: string;
    gateway: string;
    dnsServers: string[];
    mtu: number;
    macAddress: string;
    subnetMask: string;
    ssid: string;
    signalStrength: number;
    frequency: number;
    linkSpeed: number;
}
class NetworkPage extends ViewPU {
    constructor(s6, t6, u6, v6 = -1, w6 = undefined, x6) {
        super(s6, u6, v6, x6);
        if (typeof w6 === "function") {
            this.paramsGenerator_ = w6;
        }
        this.__networkDetails = new ObservedPropertyObjectPU(null, this, "networkDetails");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.setInitiallyProvidedValue(t6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(r6: NetworkPage_Params) {
        if (r6.networkDetails !== undefined) {
            this.networkDetails = r6.networkDetails;
        }
        if (r6.isLoading !== undefined) {
            this.isLoading = r6.isLoading;
        }
    }
    updateStateVars(q6: NetworkPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(p6) {
        this.__networkDetails.purgeDependencyOnElmtId(p6);
        this.__isLoading.purgeDependencyOnElmtId(p6);
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
    set networkDetails(o6: NetworkDetails | null) {
        this.__networkDetails.set(o6);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(n6: boolean) {
        this.__isLoading.set(n6);
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
            const m5 = connection.getDefaultNetSync();
            hilog.info(0x0000, TAG, 'NetHandle: netId=%{public}d', m5?.netId || 0);
            if (m5 && m5.netId !== 0) {
                const n5 = connection.getNetCapabilitiesSync(m5);
                const o5 = connection.getConnectionPropertiesSync(m5);
                hilog.info(0x0000, TAG, 'NetCapabilities: %{public}s', JSON.stringify(n5));
                hilog.info(0x0000, TAG, 'ConnectionProperties: %{public}s', JSON.stringify(o5));
                const p5 = n5.bearerTypes?.[0] || connection.NetBearType.BEARER_CELLULAR;
                const q5 = n5.networkCap || [];
                const r5 = n5.linkUpBandwidthKbps || 0;
                const s5 = n5.linkDownBandwidthKbps || 0;
                hilog.info(0x0000, TAG, 'Bandwidth: up=%{public}d, down=%{public}d', r5, s5);
                const t5 = JSON.parse(JSON.stringify(o5)) as Record<string, string | number | object | object[]>;
                const u5 = (l6: string): string => {
                    const m6 = t5[l6];
                    return typeof m6 === 'string' ? m6 : '未知';
                };
                const v5 = (j6: string): number => {
                    const k6 = t5[j6];
                    return typeof k6 === 'number' ? k6 : 0;
                };
                const w5 = (h6: string): object[] => {
                    const i6 = t5[h6];
                    return Array.isArray(i6) ? i6 : [];
                };
                const x5 = w5('linkAddresses');
                let y5 = '未获取';
                let z5 = '未获取';
                if (x5.length > 0) {
                    const g6 = x5[0] as Record<string, string | number>;
                    y5 = typeof g6.address === 'string' ? g6.address : '未获取';
                    z5 = typeof g6.prefixLength === 'number' ? `/${g6.prefixLength}` : '未获取';
                }
                const a6 = t5.gateway as Record<string, string> | undefined;
                const b6 = a6?.address || '未知';
                const c6 = w5('dnsServers');
                const d6: string[] = [];
                for (const e6 of c6) {
                    const f6 = e6 as Record<string, string>;
                    if (typeof f6.address === 'string') {
                        d6.push(f6.address);
                    }
                }
                this.networkDetails = {
                    type: this.getNetworkTypeName(p5),
                    isConnected: true,
                    isMetered: q5.includes(connection.NetCap.NET_CAPABILITY_NOT_METERED) ? false : true,
                    isRoaming: false,
                    linkUpBandwidth: r5,
                    linkDownBandwidth: s5,
                    interfaceName: u5('interfaceName'),
                    ipAddress: y5,
                    gateway: b6,
                    dnsServers: d6,
                    mtu: v5('mtu'),
                    macAddress: u5('macAddress'),
                    subnetMask: z5,
                    ssid: u5('ssid'),
                    signalStrength: v5('signalStrength'),
                    frequency: v5('frequency'),
                    linkSpeed: v5('linkSpeed')
                };
            }
            else {
                this.networkDetails = {
                    type: '无网络',
                    isConnected: false,
                    isMetered: false,
                    isRoaming: false,
                    linkUpBandwidth: 0,
                    linkDownBandwidth: 0,
                    interfaceName: '无',
                    ipAddress: '无',
                    gateway: '无',
                    dnsServers: [],
                    mtu: 0,
                    macAddress: '无',
                    subnetMask: '无',
                    ssid: '',
                    signalStrength: 0,
                    frequency: 0,
                    linkSpeed: 0
                };
            }
        }
        catch (l5) {
            hilog.error(0x0000, TAG, 'Load network info error: %{public}s', String(l5));
            this.networkDetails = {
                type: '未知',
                isConnected: false,
                isMetered: false,
                isRoaming: false,
                linkUpBandwidth: 0,
                linkDownBandwidth: 0,
                interfaceName: '未知',
                ipAddress: '未知',
                gateway: '未知',
                dnsServers: [],
                mtu: 0,
                macAddress: '未知',
                subnetMask: '未知',
                ssid: '',
                signalStrength: 0,
                frequency: 0,
                linkSpeed: 0
            };
        }
    }
    getNetworkTypeName(k5: connection.NetBearType): string {
        switch (k5) {
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
    formatBandwidth(j5: number): string {
        if (j5 <= 0)
            return '未提供';
        if (j5 >= 1000000) {
            return `${(j5 / 1000000).toFixed(1)} Gbps`;
        }
        else if (j5 >= 1000) {
            return `${(j5 / 1000).toFixed(1)} Mbps`;
        }
        else {
            return `${j5} Kbps`;
        }
    }
    formatMtu(i5: number): string {
        if (i5 <= 0)
            return '未获取';
        return `${i5} bytes`;
    }
    formatFrequency(h5: number): string {
        if (h5 <= 0)
            return '未获取';
        if (h5 >= 1000) {
            return `${(h5 / 1000).toFixed(1)} GHz`;
        }
        return `${h5} MHz`;
    }
    formatLinkSpeed(g5: number): string {
        if (g5 <= 0)
            return '未获取';
        return `${g5} Mbps`;
    }
    DataDescription(c5: string, d5 = null) {
        this.observeComponentCreation2((e5, f5) => {
            Text.create(c5);
            Text.fontSize(12);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4, bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((a5, b5) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((w4, x4) => {
                if (x4) {
                    let y4 = new NavigationBarWithArrow(this, {
                        title: '网络',
                        onBack: () => {
                            router.back();
                        }
                    }, undefined, w4, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 232, col: 7 });
                    ViewPU.create(y4);
                    let z4 = () => {
                        return {
                            title: '网络',
                            onBack: () => {
                                router.back();
                            }
                        };
                    };
                    y4.paramsGenerator_ = z4;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(w4, {
                        title: '网络'
                    });
                }
            }, { name: "NavigationBarWithArrow" });
        }
        this.observeComponentCreation2((u4, v4) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((s4, t4) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((a, b) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((q4, r4) => {
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
                        this.observeComponentCreation2((m4, n4) => {
                            if (n4) {
                                let o4 = new SectionHeader(this, { title: '网络状态' }, undefined, m4, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 248, col: 13 });
                                ViewPU.create(o4);
                                let p4 = () => {
                                    return {
                                        title: '网络状态'
                                    };
                                };
                                o4.paramsGenerator_ = p4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(m4, {
                                    title: '网络状态'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前设备的网络连接状态和网络类型。');
                    {
                        this.observeComponentCreation2((i4, j4) => {
                            if (j4) {
                                let k4 = new InfoCard(this, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                }, undefined, i4, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 251, col: 13 });
                                ViewPU.create(k4);
                                let l4 = () => {
                                    return {
                                        title: '网络类型',
                                        value: this.networkDetails.type
                                    };
                                };
                                k4.paramsGenerator_ = l4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(i4, {
                                    title: '网络类型',
                                    value: this.networkDetails.type
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((e4, f4) => {
                            if (f4) {
                                let g4 = new InfoCard(this, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                }, undefined, e4, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 256, col: 13 });
                                ViewPU.create(g4);
                                let h4 = () => {
                                    return {
                                        title: '连接状态',
                                        value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                    };
                                };
                                g4.paramsGenerator_ = h4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(e4, {
                                    title: '连接状态',
                                    value: this.networkDetails.isConnected ? '已连接' : '未连接'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((a4, b4) => {
                            if (b4) {
                                let c4 = new InfoCard(this, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                }, undefined, a4, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 261, col: 13 });
                                ViewPU.create(c4);
                                let d4 = () => {
                                    return {
                                        title: '计费网络',
                                        value: this.networkDetails.isMetered ? '是' : '否'
                                    };
                                };
                                c4.paramsGenerator_ = d4;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(a4, {
                                    title: '计费网络',
                                    value: this.networkDetails.isMetered ? '是' : '否'
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((w3, x3) => {
                            if (x3) {
                                let y3 = new SectionHeader(this, { title: 'IP 配置' }, undefined, w3, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 267, col: 13 });
                                ViewPU.create(y3);
                                let z3 = () => {
                                    return {
                                        title: 'IP 配置'
                                    };
                                };
                                y3.paramsGenerator_ = z3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(w3, {
                                    title: 'IP 配置'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前网络的 IP 地址、子网掩码、网关等配置信息。');
                    {
                        this.observeComponentCreation2((s3, t3) => {
                            if (t3) {
                                let u3 = new InfoCard(this, {
                                    title: 'IP 地址',
                                    value: this.networkDetails.ipAddress
                                }, undefined, s3, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 270, col: 13 });
                                ViewPU.create(u3);
                                let v3 = () => {
                                    return {
                                        title: 'IP 地址',
                                        value: this.networkDetails.ipAddress
                                    };
                                };
                                u3.paramsGenerator_ = v3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s3, {
                                    title: 'IP 地址',
                                    value: this.networkDetails.ipAddress
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((o3, p3) => {
                            if (p3) {
                                let q3 = new InfoCard(this, {
                                    title: '子网前缀',
                                    value: this.networkDetails.subnetMask
                                }, undefined, o3, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 275, col: 13 });
                                ViewPU.create(q3);
                                let r3 = () => {
                                    return {
                                        title: '子网前缀',
                                        value: this.networkDetails.subnetMask
                                    };
                                };
                                q3.paramsGenerator_ = r3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o3, {
                                    title: '子网前缀',
                                    value: this.networkDetails.subnetMask
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((k3, l3) => {
                            if (l3) {
                                let m3 = new InfoCard(this, {
                                    title: '默认网关',
                                    value: this.networkDetails.gateway
                                }, undefined, k3, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 280, col: 13 });
                                ViewPU.create(m3);
                                let n3 = () => {
                                    return {
                                        title: '默认网关',
                                        value: this.networkDetails.gateway
                                    };
                                };
                                m3.paramsGenerator_ = n3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k3, {
                                    title: '默认网关',
                                    value: this.networkDetails.gateway
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((g3, h3) => {
                            if (h3) {
                                let i3 = new SectionHeader(this, { title: 'DNS 服务器' }, undefined, g3, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 286, col: 13 });
                                ViewPU.create(i3);
                                let j3 = () => {
                                    return {
                                        title: 'DNS 服务器'
                                    };
                                };
                                i3.paramsGenerator_ = j3;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g3, {
                                    title: 'DNS 服务器'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前网络配置的 DNS 服务器地址，用于域名解析。');
                    this.observeComponentCreation2((o2, p2) => {
                        If.create();
                        if (this.networkDetails.dnsServers.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((u2, v2) => {
                                    ForEach.create();
                                    const w2 = (z2, a3: number) => {
                                        const b3 = z2;
                                        {
                                            this.observeComponentCreation2((c3, d3) => {
                                                if (d3) {
                                                    let e3 = new InfoCard(this, {
                                                        title: `DNS ${a3 + 1}`,
                                                        value: b3
                                                    }, undefined, c3, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 291, col: 17 });
                                                    ViewPU.create(e3);
                                                    let f3 = () => {
                                                        return {
                                                            title: `DNS ${a3 + 1}`,
                                                            value: b3
                                                        };
                                                    };
                                                    e3.paramsGenerator_ = f3;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(c3, {
                                                        title: `DNS ${a3 + 1}`,
                                                        value: b3
                                                    });
                                                }
                                            }, { name: "InfoCard" });
                                        }
                                    };
                                    this.forEachUpdateFunction(u2, this.networkDetails.dnsServers, w2, (x2: string, y2: number) => y2.toString(), true, true);
                                }, ForEach);
                                ForEach.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                {
                                    this.observeComponentCreation2((q2, r2) => {
                                        if (r2) {
                                            let s2 = new InfoCard(this, {
                                                title: 'DNS 服务器',
                                                value: '未获取'
                                            }, undefined, q2, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 297, col: 15 });
                                            ViewPU.create(s2);
                                            let t2 = () => {
                                                return {
                                                    title: 'DNS 服务器',
                                                    value: '未获取'
                                                };
                                            };
                                            s2.paramsGenerator_ = t2;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q2, {
                                                title: 'DNS 服务器',
                                                value: '未获取'
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((k2, l2) => {
                            if (l2) {
                                let m2 = new SectionHeader(this, { title: '网卡信息' }, undefined, k2, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 304, col: 13 });
                                ViewPU.create(m2);
                                let n2 = () => {
                                    return {
                                        title: '网卡信息'
                                    };
                                };
                                m2.paramsGenerator_ = n2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k2, {
                                    title: '网卡信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示网卡名称、MAC 地址、MTU 等硬件信息。');
                    {
                        this.observeComponentCreation2((g2, h2) => {
                            if (h2) {
                                let i2 = new InfoCard(this, {
                                    title: '网卡名称',
                                    value: this.networkDetails.interfaceName
                                }, undefined, g2, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 307, col: 13 });
                                ViewPU.create(i2);
                                let j2 = () => {
                                    return {
                                        title: '网卡名称',
                                        value: this.networkDetails.interfaceName
                                    };
                                };
                                i2.paramsGenerator_ = j2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g2, {
                                    title: '网卡名称',
                                    value: this.networkDetails.interfaceName
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((c2, d2) => {
                            if (d2) {
                                let e2 = new InfoCard(this, {
                                    title: 'MAC 地址',
                                    value: this.networkDetails.macAddress
                                }, undefined, c2, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 312, col: 13 });
                                ViewPU.create(e2);
                                let f2 = () => {
                                    return {
                                        title: 'MAC 地址',
                                        value: this.networkDetails.macAddress
                                    };
                                };
                                e2.paramsGenerator_ = f2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(c2, {
                                    title: 'MAC 地址',
                                    value: this.networkDetails.macAddress
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((y1, z1) => {
                            if (z1) {
                                let a2 = new InfoCard(this, {
                                    title: 'MTU',
                                    value: this.formatMtu(this.networkDetails.mtu)
                                }, undefined, y1, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 317, col: 13 });
                                ViewPU.create(a2);
                                let b2 = () => {
                                    return {
                                        title: 'MTU',
                                        value: this.formatMtu(this.networkDetails.mtu)
                                    };
                                };
                                a2.paramsGenerator_ = b2;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(y1, {
                                    title: 'MTU',
                                    value: this.formatMtu(this.networkDetails.mtu)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    this.observeComponentCreation2((w, x) => {
                        If.create();
                        if (this.networkDetails.type === 'Wi-Fi' && this.networkDetails.ssid) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((u1, v1) => {
                                        if (v1) {
                                            let w1 = new SectionHeader(this, { title: 'Wi-Fi 信息' }, undefined, u1, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 324, col: 15 });
                                            ViewPU.create(w1);
                                            let x1 = () => {
                                                return {
                                                    title: 'Wi-Fi 信息'
                                                };
                                            };
                                            w1.paramsGenerator_ = x1;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(u1, {
                                                title: 'Wi-Fi 信息'
                                            });
                                        }
                                    }, { name: "SectionHeader" });
                                }
                                this.DataDescription.bind(this)('显示 Wi-Fi 网络的详细信息。');
                                {
                                    this.observeComponentCreation2((q1, r1) => {
                                        if (r1) {
                                            let s1 = new InfoCard(this, {
                                                title: 'SSID',
                                                value: this.networkDetails.ssid
                                            }, undefined, q1, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 327, col: 15 });
                                            ViewPU.create(s1);
                                            let t1 = () => {
                                                return {
                                                    title: 'SSID',
                                                    value: this.networkDetails.ssid
                                                };
                                            };
                                            s1.paramsGenerator_ = t1;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(q1, {
                                                title: 'SSID',
                                                value: this.networkDetails.ssid
                                            });
                                        }
                                    }, { name: "InfoCard" });
                                }
                                this.observeComponentCreation2((k1, l1) => {
                                    If.create();
                                    if (this.networkDetails.signalStrength > 0) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((m1, n1) => {
                                                    if (n1) {
                                                        let o1 = new InfoCard(this, {
                                                            title: '信号强度',
                                                            value: `${this.networkDetails.signalStrength} dBm`
                                                        }, undefined, m1, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 333, col: 17 });
                                                        ViewPU.create(o1);
                                                        let p1 = () => {
                                                            return {
                                                                title: '信号强度',
                                                                value: `${this.networkDetails.signalStrength} dBm`
                                                            };
                                                        };
                                                        o1.paramsGenerator_ = p1;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(m1, {
                                                            title: '信号强度',
                                                            value: `${this.networkDetails.signalStrength} dBm`
                                                        });
                                                    }
                                                }, { name: "InfoCard" });
                                            }
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                        });
                                    }
                                }, If);
                                If.pop();
                                this.observeComponentCreation2((e1, f1) => {
                                    If.create();
                                    if (this.networkDetails.frequency > 0) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((g1, h1) => {
                                                    if (h1) {
                                                        let i1 = new InfoCard(this, {
                                                            title: '频段',
                                                            value: this.formatFrequency(this.networkDetails.frequency)
                                                        }, undefined, g1, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 340, col: 17 });
                                                        ViewPU.create(i1);
                                                        let j1 = () => {
                                                            return {
                                                                title: '频段',
                                                                value: this.formatFrequency(this.networkDetails.frequency)
                                                            };
                                                        };
                                                        i1.paramsGenerator_ = j1;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(g1, {
                                                            title: '频段',
                                                            value: this.formatFrequency(this.networkDetails.frequency)
                                                        });
                                                    }
                                                }, { name: "InfoCard" });
                                            }
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                        });
                                    }
                                }, If);
                                If.pop();
                                this.observeComponentCreation2((y, z) => {
                                    If.create();
                                    if (this.networkDetails.linkSpeed > 0) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            {
                                                this.observeComponentCreation2((a1, b1) => {
                                                    if (b1) {
                                                        let c1 = new InfoCard(this, {
                                                            title: '连接速度',
                                                            value: this.formatLinkSpeed(this.networkDetails.linkSpeed)
                                                        }, undefined, a1, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 347, col: 17 });
                                                        ViewPU.create(c1);
                                                        let d1 = () => {
                                                            return {
                                                                title: '连接速度',
                                                                value: this.formatLinkSpeed(this.networkDetails.linkSpeed)
                                                            };
                                                        };
                                                        c1.paramsGenerator_ = d1;
                                                    }
                                                    else {
                                                        this.updateStateVarsOfChildByElmtId(a1, {
                                                            title: '连接速度',
                                                            value: this.formatLinkSpeed(this.networkDetails.linkSpeed)
                                                        });
                                                    }
                                                }, { name: "InfoCard" });
                                            }
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                        });
                                    }
                                }, If);
                                If.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    {
                        this.observeComponentCreation2((s, t) => {
                            if (t) {
                                let u = new SectionHeader(this, { title: '带宽信息' }, undefined, s, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 355, col: 13 });
                                ViewPU.create(u);
                                let v = () => {
                                    return {
                                        title: '带宽信息'
                                    };
                                };
                                u.paramsGenerator_ = v;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(s, {
                                    title: '带宽信息'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('显示当前网络连接的理论上行和下行带宽。某些网络类型（如模拟器环境）可能不提供带宽信息。实际网速可能因网络环境、信号强度等因素而有所不同。');
                    {
                        this.observeComponentCreation2((o, p) => {
                            if (p) {
                                let q = new InfoCard(this, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                }, undefined, o, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 358, col: 13 });
                                ViewPU.create(q);
                                let r = () => {
                                    return {
                                        title: '上行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                    };
                                };
                                q.paramsGenerator_ = r;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(o, {
                                    title: '上行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkUpBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((k, l) => {
                            if (l) {
                                let m = new InfoCard(this, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                }, undefined, k, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 363, col: 13 });
                                ViewPU.create(m);
                                let n = () => {
                                    return {
                                        title: '下行带宽',
                                        value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                    };
                                };
                                m.paramsGenerator_ = n;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k, {
                                    title: '下行带宽',
                                    value: this.formatBandwidth(this.networkDetails.linkDownBandwidth)
                                });
                            }
                        }, { name: "InfoCard" });
                    }
                    {
                        this.observeComponentCreation2((g, h) => {
                            if (h) {
                                let i = new SectionHeader(this, { title: '说明' }, undefined, g, () => { }, { page: "entry/src/main/ets/pages/NetworkPage.ets", line: 369, col: 13 });
                                ViewPU.create(i);
                                let j = () => {
                                    return {
                                        title: '说明'
                                    };
                                };
                                i.paramsGenerator_ = j;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(g, {
                                    title: '说明'
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.DataDescription.bind(this)('网络信息通过 @ohos.net.connection API 获取。IP 配置、DNS、网关等信息用于网络诊断和故障排查。MAC 地址是网卡的物理地址，MTU 是最大传输单元。');
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((e, f) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(24);
                        Column.borderRadius(12);
                        Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((c, d) => {
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
