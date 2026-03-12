if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatusCard_Params {
    title?: string;
    value?: string;
    status?: 'normal' | 'warning' | 'critical';
    pulseScale?: number;
}
interface TechCard_Params {
    title?: string;
    value?: string;
    unit?: string;
    trend?: number;
    glowIntensity?: number;
}
interface InfoCard_Params {
    title?: string;
    value?: string;
    subtitle?: string;
    icon?: string;
    isPressed?: boolean;
}
export class InfoCard extends ViewPU {
    constructor(k3, l3, m3, n3 = -1, o3 = undefined, p3) {
        super(k3, m3, n3, p3);
        if (typeof o3 === "function") {
            this.paramsGenerator_ = o3;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(l3.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(l3.value, this, "value");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(l3.subtitle, this, "subtitle");
        this.__icon = new SynchedPropertySimpleOneWayPU(l3.icon, this, "icon");
        this.__isPressed = new ObservedPropertySimplePU(false, this, "isPressed");
        this.setInitiallyProvidedValue(l3);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(j3: InfoCard_Params) {
        if (j3.title === undefined) {
            this.__title.set('');
        }
        if (j3.value === undefined) {
            this.__value.set('');
        }
        if (j3.subtitle === undefined) {
            this.__subtitle.set('');
        }
        if (j3.icon === undefined) {
            this.__icon.set('');
        }
        if (j3.isPressed !== undefined) {
            this.isPressed = j3.isPressed;
        }
    }
    updateStateVars(i3: InfoCard_Params) {
        this.__title.reset(i3.title);
        this.__value.reset(i3.value);
        this.__subtitle.reset(i3.subtitle);
        this.__icon.reset(i3.icon);
    }
    purgeVariableDependenciesOnElmtId(h3) {
        this.__title.purgeDependencyOnElmtId(h3);
        this.__value.purgeDependencyOnElmtId(h3);
        this.__subtitle.purgeDependencyOnElmtId(h3);
        this.__icon.purgeDependencyOnElmtId(h3);
        this.__isPressed.purgeDependencyOnElmtId(h3);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__subtitle.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
        this.__isPressed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(g3: string) {
        this.__title.set(g3);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(f3: string) {
        this.__value.set(f3);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>;
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(e3: string) {
        this.__subtitle.set(e3);
    }
    private __icon: SynchedPropertySimpleOneWayPU<string>;
    get icon() {
        return this.__icon.get();
    }
    set icon(d3: string) {
        this.__icon.set(d3);
    }
    private __isPressed: ObservedPropertySimplePU<boolean>;
    get isPressed() {
        return this.__isPressed.get();
    }
    set isPressed(c3: boolean) {
        this.__isPressed.set(c3);
    }
    initialRender() {
        this.observeComponentCreation2((z2, a3) => {
            Column.create();
            Context.animation({
                duration: 150,
                curve: Curve.EaseInOut
            });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.borderRadius(16);
            Column.border({
                width: 1,
                color: { "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" }
            });
            Column.shadow({
                radius: 8,
                color: 'rgba(0, 212, 255, 0.1)',
                offsetX: 0,
                offsetY: 4
            });
            Column.scale({ x: this.isPressed ? 0.98 : 1, y: this.isPressed ? 0.98 : 1 });
            Context.animation(null);
            Column.onTouch((b3) => {
                if (b3.type === TouchType.Down) {
                    this.isPressed = true;
                }
                else if (b3.type === TouchType.Up || b3.type === TouchType.Cancel) {
                    this.isPressed = false;
                }
            });
        }, Column);
        this.observeComponentCreation2((x2, y2) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((v2, w2) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((t2, u2) => {
            Text.create(this.title);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((r2, s2) => {
            Text.create(this.value);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((n2, o2) => {
            If.create();
            if (this.icon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((p2, q2) => {
                        Text.create(this.icon);
                        Text.fontSize(24);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.opacity(0.8);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((j2, k2) => {
            If.create();
            if (this.subtitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((l2, m2) => {
                        Text.create(this.subtitle);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 8 });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class TechCard extends ViewPU {
    constructor(d2, e2, f2, g2 = -1, h2 = undefined, i2) {
        super(d2, f2, g2, i2);
        if (typeof h2 === "function") {
            this.paramsGenerator_ = h2;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(e2.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(e2.value, this, "value");
        this.__unit = new SynchedPropertySimpleOneWayPU(e2.unit, this, "unit");
        this.__trend = new SynchedPropertySimpleOneWayPU(e2.trend, this, "trend");
        this.__glowIntensity = new ObservedPropertySimplePU(0.5, this, "glowIntensity");
        this.setInitiallyProvidedValue(e2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(c2: TechCard_Params) {
        if (c2.title === undefined) {
            this.__title.set('');
        }
        if (c2.value === undefined) {
            this.__value.set('');
        }
        if (c2.unit === undefined) {
            this.__unit.set('');
        }
        if (c2.trend === undefined) {
            this.__trend.set(0);
        }
        if (c2.glowIntensity !== undefined) {
            this.glowIntensity = c2.glowIntensity;
        }
    }
    updateStateVars(b2: TechCard_Params) {
        this.__title.reset(b2.title);
        this.__value.reset(b2.value);
        this.__unit.reset(b2.unit);
        this.__trend.reset(b2.trend);
    }
    purgeVariableDependenciesOnElmtId(a2) {
        this.__title.purgeDependencyOnElmtId(a2);
        this.__value.purgeDependencyOnElmtId(a2);
        this.__unit.purgeDependencyOnElmtId(a2);
        this.__trend.purgeDependencyOnElmtId(a2);
        this.__glowIntensity.purgeDependencyOnElmtId(a2);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__unit.aboutToBeDeleted();
        this.__trend.aboutToBeDeleted();
        this.__glowIntensity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(z1: string) {
        this.__title.set(z1);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(y1: string) {
        this.__value.set(y1);
    }
    private __unit: SynchedPropertySimpleOneWayPU<string>;
    get unit() {
        return this.__unit.get();
    }
    set unit(x1: string) {
        this.__unit.set(x1);
    }
    private __trend: SynchedPropertySimpleOneWayPU<number>;
    get trend() {
        return this.__trend.get();
    }
    set trend(w1: number) {
        this.__trend.set(w1);
    }
    private __glowIntensity: ObservedPropertySimplePU<number>;
    get glowIntensity() {
        return this.__glowIntensity.get();
    }
    set glowIntensity(v1: number) {
        this.__glowIntensity.set(v1);
    }
    aboutToAppear() {
        setInterval(() => {
            this.glowIntensity = this.glowIntensity === 0.5 ? 0.8 : 0.5;
        }, 2000);
    }
    initialRender() {
        this.observeComponentCreation2((t1, u1) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.borderRadius(16);
            Column.border({
                width: 1,
                color: { "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" }
            });
            Column.shadow({
                radius: 12,
                color: `rgba(0, 212, 255, ${0.1 * this.glowIntensity})`,
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        this.observeComponentCreation2((r1, s1) => {
            Row.create();
            Context.animation({
                duration: 2000,
                curve: Curve.EaseInOut,
                iterations: -1,
                playMode: PlayMode.Alternate
            });
            Row.width('100%');
            Row.height(2);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.opacity(this.glowIntensity);
            Context.animation(null);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((p1, q1) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
        }, Row);
        this.observeComponentCreation2((n1, o1) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((l1, m1) => {
            Text.create(this.title);
            Text.fontSize(13);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(1);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((j1, k1) => {
            Row.create();
            Row.alignItems(VerticalAlign.Bottom);
        }, Row);
        this.observeComponentCreation2((h1, i1) => {
            Text.create(this.value);
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((d1, e1) => {
            If.create();
            if (this.unit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((f1, g1) => {
                        Text.create(this.unit);
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ left: 4 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((x, y) => {
            If.create();
            if (this.trend !== 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((b1, c1) => {
                        Column.create();
                        Column.padding(8);
                        Column.backgroundColor(this.trend > 0 ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 71, 87, 0.1)');
                        Column.borderRadius(8);
                    }, Column);
                    this.observeComponentCreation2((z, a1) => {
                        Text.create(this.trend > 0 ? '▲' : '▼');
                        Text.fontSize(12);
                        Text.fontColor(this.trend > 0 ? { "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" } : { "id": 16777237, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class StatusCard extends ViewPU {
    constructor(r, s, t, u = -1, v = undefined, w) {
        super(r, t, u, w);
        if (typeof v === "function") {
            this.paramsGenerator_ = v;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(s.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(s.value, this, "value");
        this.__status = new SynchedPropertySimpleOneWayPU(s.status, this, "status");
        this.__pulseScale = new ObservedPropertySimplePU(1, this, "pulseScale");
        this.setInitiallyProvidedValue(s);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(q: StatusCard_Params) {
        if (q.title === undefined) {
            this.__title.set('');
        }
        if (q.value === undefined) {
            this.__value.set('');
        }
        if (q.status === undefined) {
            this.__status.set('normal');
        }
        if (q.pulseScale !== undefined) {
            this.pulseScale = q.pulseScale;
        }
    }
    updateStateVars(p: StatusCard_Params) {
        this.__title.reset(p.title);
        this.__value.reset(p.value);
        this.__status.reset(p.status);
    }
    purgeVariableDependenciesOnElmtId(o) {
        this.__title.purgeDependencyOnElmtId(o);
        this.__value.purgeDependencyOnElmtId(o);
        this.__status.purgeDependencyOnElmtId(o);
        this.__pulseScale.purgeDependencyOnElmtId(o);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__pulseScale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(n: string) {
        this.__title.set(n);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(m: string) {
        this.__value.set(m);
    }
    private __status: SynchedPropertySimpleOneWayPU<'normal' | 'warning' | 'critical'>;
    get status() {
        return this.__status.get();
    }
    set status(l: 'normal' | 'warning' | 'critical') {
        this.__status.set(l);
    }
    private __pulseScale: ObservedPropertySimplePU<number>;
    get pulseScale() {
        return this.__pulseScale.get();
    }
    set pulseScale(k: number) {
        this.__pulseScale.set(k);
    }
    aboutToAppear() {
        if (this.status !== 'normal') {
            setInterval(() => {
                this.pulseScale = this.pulseScale === 1 ? 1.2 : 1;
            }, 1000);
        }
    }
    getStatusColor(): ResourceColor {
        switch (this.status) {
            case 'warning':
                return { "id": 16777244, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" };
            case 'critical':
                return { "id": 16777237, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" };
            default:
                return { "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" };
        }
    }
    initialRender() {
        this.observeComponentCreation2((i, j) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(12);
            Row.border({
                width: 1,
                color: { "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((g, h) => {
            Column.create();
            Context.animation({
                duration: 1000,
                curve: Curve.EaseInOut,
                iterations: -1,
                playMode: PlayMode.Alternate
            });
            Column.width(12);
            Column.height(12);
            Column.backgroundColor(this.getStatusColor());
            Column.borderRadius(6);
            Column.scale({ x: this.pulseScale, y: this.pulseScale });
            Context.animation(null);
            Column.shadow({
                radius: 8,
                color: this.getStatusColor() as string,
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((e, f) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((c, d) => {
            Text.create(this.title);
            Text.fontSize(13);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((a, b) => {
            Text.create(this.value);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
