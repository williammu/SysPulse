if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface InfoCardWithDesc_Params {
    title?: string;
    value?: string;
    conceptId?: string;
    onInfoClick?: () => void;
}
interface InfoHeader_Params {
    title?: string;
    subtitle?: string;
    conceptId?: string;
    onInfoClick?: () => void;
}
interface InfoButton_Params {
    conceptId?: string;
    isPressed?: boolean;
    onInfoClick?: () => void;
}
export class InfoButton extends ViewPU {
    constructor(w2, x2, y2, z2 = -1, a3 = undefined, b3) {
        super(w2, y2, z2, b3);
        if (typeof a3 === "function") {
            this.paramsGenerator_ = a3;
        }
        this.__conceptId = new SynchedPropertySimpleOneWayPU(x2.conceptId, this, "conceptId");
        this.__isPressed = new ObservedPropertySimplePU(false, this, "isPressed");
        this.onInfoClick = undefined;
        this.setInitiallyProvidedValue(x2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(v2: InfoButton_Params) {
        if (v2.conceptId === undefined) {
            this.__conceptId.set('');
        }
        if (v2.isPressed !== undefined) {
            this.isPressed = v2.isPressed;
        }
        if (v2.onInfoClick !== undefined) {
            this.onInfoClick = v2.onInfoClick;
        }
    }
    updateStateVars(u2: InfoButton_Params) {
        this.__conceptId.reset(u2.conceptId);
    }
    purgeVariableDependenciesOnElmtId(t2) {
        this.__conceptId.purgeDependencyOnElmtId(t2);
        this.__isPressed.purgeDependencyOnElmtId(t2);
    }
    aboutToBeDeleted() {
        this.__conceptId.aboutToBeDeleted();
        this.__isPressed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __conceptId: SynchedPropertySimpleOneWayPU<string>;
    get conceptId() {
        return this.__conceptId.get();
    }
    set conceptId(s2: string) {
        this.__conceptId.set(s2);
    }
    private __isPressed: ObservedPropertySimplePU<boolean>;
    get isPressed() {
        return this.__isPressed.get();
    }
    set isPressed(r2: boolean) {
        this.__isPressed.set(r2);
    }
    private onInfoClick?: () => void;
    initialRender() {
        this.observeComponentCreation2((o2, p2) => {
            Button.createWithChild();
            Context.animation({
                duration: 100,
                curve: Curve.EaseInOut
            });
            Button.width(24);
            Button.height(24);
            Button.backgroundColor('transparent');
            Button.opacity(this.isPressed ? 0.6 : 1);
            Button.scale({ x: this.isPressed ? 0.9 : 1, y: this.isPressed ? 0.9 : 1 });
            Context.animation(null);
            Button.onTouch((q2) => {
                if (q2.type === TouchType.Down) {
                    this.isPressed = true;
                }
                else if (q2.type === TouchType.Up || q2.type === TouchType.Cancel) {
                    this.isPressed = false;
                }
            });
            Button.onClick(() => {
                if (this.onInfoClick) {
                    this.onInfoClick();
                }
            });
        }, Button);
        this.observeComponentCreation2((m2, n2) => {
            Text.create('ⓘ');
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class InfoHeader extends ViewPU {
    constructor(g2, h2, i2, j2 = -1, k2 = undefined, l2) {
        super(g2, i2, j2, l2);
        if (typeof k2 === "function") {
            this.paramsGenerator_ = k2;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(h2.title, this, "title");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(h2.subtitle, this, "subtitle");
        this.__conceptId = new SynchedPropertySimpleOneWayPU(h2.conceptId, this, "conceptId");
        this.onInfoClick = undefined;
        this.setInitiallyProvidedValue(h2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(f2: InfoHeader_Params) {
        if (f2.title === undefined) {
            this.__title.set('');
        }
        if (f2.subtitle === undefined) {
            this.__subtitle.set('');
        }
        if (f2.conceptId === undefined) {
            this.__conceptId.set('');
        }
        if (f2.onInfoClick !== undefined) {
            this.onInfoClick = f2.onInfoClick;
        }
    }
    updateStateVars(e2: InfoHeader_Params) {
        this.__title.reset(e2.title);
        this.__subtitle.reset(e2.subtitle);
        this.__conceptId.reset(e2.conceptId);
    }
    purgeVariableDependenciesOnElmtId(d2) {
        this.__title.purgeDependencyOnElmtId(d2);
        this.__subtitle.purgeDependencyOnElmtId(d2);
        this.__conceptId.purgeDependencyOnElmtId(d2);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__subtitle.aboutToBeDeleted();
        this.__conceptId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(c2: string) {
        this.__title.set(c2);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>;
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(b2: string) {
        this.__subtitle.set(b2);
    }
    private __conceptId: SynchedPropertySimpleOneWayPU<string>;
    get conceptId() {
        return this.__conceptId.get();
    }
    set conceptId(a2: string) {
        this.__conceptId.set(a2);
    }
    private onInfoClick?: () => void;
    initialRender() {
        this.observeComponentCreation2((y1, z1) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 24, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((w1, x1) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((u1, v1) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((s1, t1) => {
            Row.create();
            Row.width(4);
            Row.height(20);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(2);
            Row.margin({ right: 12 });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((q1, r1) => {
            Text.create(this.title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((i1, j1) => {
            If.create();
            if (this.conceptId && this.onInfoClick) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((o1, p1) => {
                        __Common__.create();
                        __Common__.margin({ left: 8 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((k1, l1) => {
                            if (l1) {
                                let m1 = new InfoButton(this, {
                                    conceptId: this.conceptId,
                                    onInfoClick: this.onInfoClick
                                }, undefined, k1, () => { }, { page: "entry/src/main/ets/components/InfoButton.ets", line: 65, col: 13 });
                                ViewPU.create(m1);
                                let n1 = () => {
                                    return {
                                        conceptId: this.conceptId,
                                        onInfoClick: this.onInfoClick
                                    };
                                };
                                m1.paramsGenerator_ = n1;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(k1, {
                                    conceptId: this.conceptId
                                });
                            }
                        }, { name: "InfoButton" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((e1, f1) => {
            If.create();
            if (this.subtitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((g1, h1) => {
                        Text.create(this.subtitle);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 4, left: 16 });
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
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class InfoCardWithDesc extends ViewPU {
    constructor(y, z, a1, b1 = -1, c1 = undefined, d1) {
        super(y, a1, b1, d1);
        if (typeof c1 === "function") {
            this.paramsGenerator_ = c1;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(z.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(z.value, this, "value");
        this.__conceptId = new SynchedPropertySimpleOneWayPU(z.conceptId, this, "conceptId");
        this.onInfoClick = undefined;
        this.setInitiallyProvidedValue(z);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(x: InfoCardWithDesc_Params) {
        if (x.title === undefined) {
            this.__title.set('');
        }
        if (x.value === undefined) {
            this.__value.set('');
        }
        if (x.conceptId === undefined) {
            this.__conceptId.set('');
        }
        if (x.onInfoClick !== undefined) {
            this.onInfoClick = x.onInfoClick;
        }
    }
    updateStateVars(w: InfoCardWithDesc_Params) {
        this.__title.reset(w.title);
        this.__value.reset(w.value);
        this.__conceptId.reset(w.conceptId);
    }
    purgeVariableDependenciesOnElmtId(v) {
        this.__title.purgeDependencyOnElmtId(v);
        this.__value.purgeDependencyOnElmtId(v);
        this.__conceptId.purgeDependencyOnElmtId(v);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__conceptId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(u: string) {
        this.__title.set(u);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(t: string) {
        this.__value.set(t);
    }
    private __conceptId: SynchedPropertySimpleOneWayPU<string>;
    get conceptId() {
        return this.__conceptId.get();
    }
    set conceptId(s: string) {
        this.__conceptId.set(s);
    }
    private onInfoClick?: () => void;
    initialRender() {
        this.observeComponentCreation2((q, r) => {
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
        this.observeComponentCreation2((o, p) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((m, n) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((k, l) => {
            Text.create(this.title);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((c, d) => {
            If.create();
            if (this.conceptId && this.onInfoClick) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((i, j) => {
                        __Common__.create();
                        __Common__.margin({ left: 4 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((e, f) => {
                            if (f) {
                                let g = new InfoButton(this, {
                                    conceptId: this.conceptId,
                                    onInfoClick: this.onInfoClick
                                }, undefined, e, () => { }, { page: "entry/src/main/ets/components/InfoButton.ets", line: 106, col: 13 });
                                ViewPU.create(g);
                                let h = () => {
                                    return {
                                        conceptId: this.conceptId,
                                        onInfoClick: this.onInfoClick
                                    };
                                };
                                g.paramsGenerator_ = h;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(e, {
                                    conceptId: this.conceptId
                                });
                            }
                        }, { name: "InfoButton" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((a, b) => {
            Text.create(this.value);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
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
