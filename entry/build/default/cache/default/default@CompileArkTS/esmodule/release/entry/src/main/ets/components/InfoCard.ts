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
    constructor(q3, r3, s3, t3 = -1, u3 = undefined, v3) {
        super(q3, s3, t3, v3);
        if (typeof u3 === "function") {
            this.paramsGenerator_ = u3;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(r3.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(r3.value, this, "value");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(r3.subtitle, this, "subtitle");
        this.__icon = new SynchedPropertySimpleOneWayPU(r3.icon, this, "icon");
        this.__isPressed = new ObservedPropertySimplePU(false, this, "isPressed");
        this.setInitiallyProvidedValue(r3);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(p3: InfoCard_Params) {
        if (p3.title === undefined) {
            this.__title.set('');
        }
        if (p3.value === undefined) {
            this.__value.set('');
        }
        if (p3.subtitle === undefined) {
            this.__subtitle.set('');
        }
        if (p3.icon === undefined) {
            this.__icon.set('');
        }
        if (p3.isPressed !== undefined) {
            this.isPressed = p3.isPressed;
        }
    }
    updateStateVars(o3: InfoCard_Params) {
        this.__title.reset(o3.title);
        this.__value.reset(o3.value);
        this.__subtitle.reset(o3.subtitle);
        this.__icon.reset(o3.icon);
    }
    purgeVariableDependenciesOnElmtId(n3) {
        this.__title.purgeDependencyOnElmtId(n3);
        this.__value.purgeDependencyOnElmtId(n3);
        this.__subtitle.purgeDependencyOnElmtId(n3);
        this.__icon.purgeDependencyOnElmtId(n3);
        this.__isPressed.purgeDependencyOnElmtId(n3);
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
    set title(m3: string) {
        this.__title.set(m3);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(l3: string) {
        this.__value.set(l3);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>;
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(k3: string) {
        this.__subtitle.set(k3);
    }
    private __icon: SynchedPropertySimpleOneWayPU<string>;
    get icon() {
        return this.__icon.get();
    }
    set icon(j3: string) {
        this.__icon.set(j3);
    }
    private __isPressed: ObservedPropertySimplePU<boolean>;
    get isPressed() {
        return this.__isPressed.get();
    }
    set isPressed(i3: boolean) {
        this.__isPressed.set(i3);
    }
    getAdaptiveFontSize(g3: string): number {
        const h3 = g3.length;
        if (h3 <= 4)
            return 24;
        if (h3 <= 6)
            return 20;
        if (h3 <= 8)
            return 18;
        if (h3 <= 10)
            return 16;
        return 14;
    }
    initialRender() {
        this.observeComponentCreation2((d3, e3) => {
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
            Column.onTouch((f3) => {
                if (f3.type === TouchType.Down) {
                    this.isPressed = true;
                }
                else if (f3.type === TouchType.Up || f3.type === TouchType.Cancel) {
                    this.isPressed = false;
                }
            });
        }, Column);
        this.observeComponentCreation2((b3, c3) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((z2, a3) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((x2, y2) => {
            Text.create(this.title);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((v2, w2) => {
            Text.create(this.value);
            Text.fontSize(this.getAdaptiveFontSize(this.value));
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((r2, s2) => {
            If.create();
            if (this.icon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((t2, u2) => {
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
        this.observeComponentCreation2((n2, o2) => {
            If.create();
            if (this.subtitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((p2, q2) => {
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
    constructor(h2, i2, j2, k2 = -1, l2 = undefined, m2) {
        super(h2, j2, k2, m2);
        if (typeof l2 === "function") {
            this.paramsGenerator_ = l2;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(i2.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(i2.value, this, "value");
        this.__unit = new SynchedPropertySimpleOneWayPU(i2.unit, this, "unit");
        this.__trend = new SynchedPropertySimpleOneWayPU(i2.trend, this, "trend");
        this.__glowIntensity = new ObservedPropertySimplePU(0.5, this, "glowIntensity");
        this.setInitiallyProvidedValue(i2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(g2: TechCard_Params) {
        if (g2.title === undefined) {
            this.__title.set('');
        }
        if (g2.value === undefined) {
            this.__value.set('');
        }
        if (g2.unit === undefined) {
            this.__unit.set('');
        }
        if (g2.trend === undefined) {
            this.__trend.set(0);
        }
        if (g2.glowIntensity !== undefined) {
            this.glowIntensity = g2.glowIntensity;
        }
    }
    updateStateVars(f2: TechCard_Params) {
        this.__title.reset(f2.title);
        this.__value.reset(f2.value);
        this.__unit.reset(f2.unit);
        this.__trend.reset(f2.trend);
    }
    purgeVariableDependenciesOnElmtId(e2) {
        this.__title.purgeDependencyOnElmtId(e2);
        this.__value.purgeDependencyOnElmtId(e2);
        this.__unit.purgeDependencyOnElmtId(e2);
        this.__trend.purgeDependencyOnElmtId(e2);
        this.__glowIntensity.purgeDependencyOnElmtId(e2);
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
    set title(d2: string) {
        this.__title.set(d2);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(c2: string) {
        this.__value.set(c2);
    }
    private __unit: SynchedPropertySimpleOneWayPU<string>;
    get unit() {
        return this.__unit.get();
    }
    set unit(b2: string) {
        this.__unit.set(b2);
    }
    private __trend: SynchedPropertySimpleOneWayPU<number>;
    get trend() {
        return this.__trend.get();
    }
    set trend(a2: number) {
        this.__trend.set(a2);
    }
    private __glowIntensity: ObservedPropertySimplePU<number>;
    get glowIntensity() {
        return this.__glowIntensity.get();
    }
    set glowIntensity(z1: number) {
        this.__glowIntensity.set(z1);
    }
    aboutToAppear() {
        setInterval(() => {
            this.glowIntensity = this.glowIntensity === 0.5 ? 0.8 : 0.5;
        }, 2000);
    }
    getAdaptiveFontSize(x1: string): number {
        const y1 = x1.length;
        if (y1 <= 4)
            return 24;
        if (y1 <= 6)
            return 20;
        if (y1 <= 8)
            return 18;
        if (y1 <= 10)
            return 16;
        return 14;
    }
    initialRender() {
        this.observeComponentCreation2((v1, w1) => {
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
        this.observeComponentCreation2((t1, u1) => {
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
        this.observeComponentCreation2((r1, s1) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((p1, q1) => {
            Text.create(this.title);
            Text.fontSize(13);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(1);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((n1, o1) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Bottom);
        }, Row);
        this.observeComponentCreation2((l1, m1) => {
            Text.create(this.value);
            Text.fontSize(this.getAdaptiveFontSize(this.value));
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.flexShrink(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((h1, i1) => {
            If.create();
            if (this.unit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((j1, k1) => {
                        Text.create(this.unit);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ left: 4 });
                        Text.flexShrink(0);
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
        this.observeComponentCreation2((z, a1) => {
            If.create();
            if (this.trend !== 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((f1, g1) => {
                        Row.create();
                        Row.margin({ top: 4 });
                    }, Row);
                    this.observeComponentCreation2((d1, e1) => {
                        Text.create(this.trend > 0 ? '▲' : '▼');
                        Text.fontSize(10);
                        Text.fontColor(this.trend > 0 ? { "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" } : { "id": 16777237, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ right: 4 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((b1, c1) => {
                        Text.create(this.trend > 0 ? '上升' : '下降');
                        Text.fontSize(10);
                        Text.fontColor(this.trend > 0 ? { "id": 16777242, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" } : { "id": 16777237, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class StatusCard extends ViewPU {
    constructor(t, u, v, w = -1, x = undefined, y) {
        super(t, v, w, y);
        if (typeof x === "function") {
            this.paramsGenerator_ = x;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(u.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(u.value, this, "value");
        this.__status = new SynchedPropertySimpleOneWayPU(u.status, this, "status");
        this.__pulseScale = new ObservedPropertySimplePU(1, this, "pulseScale");
        this.setInitiallyProvidedValue(u);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(s: StatusCard_Params) {
        if (s.title === undefined) {
            this.__title.set('');
        }
        if (s.value === undefined) {
            this.__value.set('');
        }
        if (s.status === undefined) {
            this.__status.set('normal');
        }
        if (s.pulseScale !== undefined) {
            this.pulseScale = s.pulseScale;
        }
    }
    updateStateVars(r: StatusCard_Params) {
        this.__title.reset(r.title);
        this.__value.reset(r.value);
        this.__status.reset(r.status);
    }
    purgeVariableDependenciesOnElmtId(q) {
        this.__title.purgeDependencyOnElmtId(q);
        this.__value.purgeDependencyOnElmtId(q);
        this.__status.purgeDependencyOnElmtId(q);
        this.__pulseScale.purgeDependencyOnElmtId(q);
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
    set title(p: string) {
        this.__title.set(p);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(o: string) {
        this.__value.set(o);
    }
    private __status: SynchedPropertySimpleOneWayPU<'normal' | 'warning' | 'critical'>;
    get status() {
        return this.__status.get();
    }
    set status(n: 'normal' | 'warning' | 'critical') {
        this.__status.set(n);
    }
    private __pulseScale: ObservedPropertySimplePU<number>;
    get pulseScale() {
        return this.__pulseScale.get();
    }
    set pulseScale(m: number) {
        this.__pulseScale.set(m);
    }
    aboutToAppear() {
        if (this.status !== 'normal') {
            setInterval(() => {
                this.pulseScale = this.pulseScale === 1 ? 1.2 : 1;
            }, 1000);
        }
    }
    getAdaptiveFontSize(k: string): number {
        const l = k.length;
        if (l <= 4)
            return 18;
        if (l <= 6)
            return 16;
        if (l <= 8)
            return 14;
        return 12;
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
            Text.fontSize(this.getAdaptiveFontSize(this.value));
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
