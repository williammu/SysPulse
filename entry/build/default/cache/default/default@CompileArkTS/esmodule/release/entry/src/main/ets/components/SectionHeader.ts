if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TechHeader_Params {
    title?: string;
    subtitle?: string;
    glowOpacity?: number;
}
interface SectionHeader_Params {
    title?: string;
    subtitle?: string;
}
export class SectionHeader extends ViewPU {
    constructor(a7, b7, c7, d7 = -1, e7 = undefined, f7) {
        super(a7, c7, d7, f7);
        if (typeof e7 === "function") {
            this.paramsGenerator_ = e7;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(b7.title, this, "title");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(b7.subtitle, this, "subtitle");
        this.setInitiallyProvidedValue(b7);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(z6: SectionHeader_Params) {
        if (z6.title === undefined) {
            this.__title.set('');
        }
        if (z6.subtitle === undefined) {
            this.__subtitle.set('');
        }
    }
    updateStateVars(y6: SectionHeader_Params) {
        this.__title.reset(y6.title);
        this.__subtitle.reset(y6.subtitle);
    }
    purgeVariableDependenciesOnElmtId(x6) {
        this.__title.purgeDependencyOnElmtId(x6);
        this.__subtitle.purgeDependencyOnElmtId(x6);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__subtitle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(w6: string) {
        this.__title.set(w6);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>;
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(v6: string) {
        this.__subtitle.set(v6);
    }
    initialRender() {
        this.observeComponentCreation2((t6, u6) => {
            Column.create();
            Column.width('100%');
            Column.margin({ top: 24, bottom: 12 });
        }, Column);
        this.observeComponentCreation2((r6, s6) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((p6, q6) => {
            Row.create();
            Row.width(4);
            Row.height(20);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(2);
            Row.margin({ right: 12 });
            Row.shadow({
                radius: 4,
                color: { "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 0
            });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((n6, o6) => {
            Text.create(this.title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((l6, m6) => {
            Row.create();
            Row.width(6);
            Row.height(6);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(3);
            Row.margin({ left: 8 });
            Row.opacity(0.6);
        }, Row);
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((h6, i6) => {
            If.create();
            if (this.subtitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((j6, k6) => {
                        Text.create(this.subtitle);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 4, left: 16 });
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
export class TechHeader extends ViewPU {
    constructor(b6, c6, d6, e6 = -1, f6 = undefined, g6) {
        super(b6, d6, e6, g6);
        if (typeof f6 === "function") {
            this.paramsGenerator_ = f6;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(c6.title, this, "title");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(c6.subtitle, this, "subtitle");
        this.__glowOpacity = new ObservedPropertySimplePU(0.5, this, "glowOpacity");
        this.setInitiallyProvidedValue(c6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(a6: TechHeader_Params) {
        if (a6.title === undefined) {
            this.__title.set('');
        }
        if (a6.subtitle === undefined) {
            this.__subtitle.set('');
        }
        if (a6.glowOpacity !== undefined) {
            this.glowOpacity = a6.glowOpacity;
        }
    }
    updateStateVars(z5: TechHeader_Params) {
        this.__title.reset(z5.title);
        this.__subtitle.reset(z5.subtitle);
    }
    purgeVariableDependenciesOnElmtId(y5) {
        this.__title.purgeDependencyOnElmtId(y5);
        this.__subtitle.purgeDependencyOnElmtId(y5);
        this.__glowOpacity.purgeDependencyOnElmtId(y5);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__subtitle.aboutToBeDeleted();
        this.__glowOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(x5: string) {
        this.__title.set(x5);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>;
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(w5: string) {
        this.__subtitle.set(w5);
    }
    private __glowOpacity: ObservedPropertySimplePU<number>;
    get glowOpacity() {
        return this.__glowOpacity.get();
    }
    set glowOpacity(v5: number) {
        this.__glowOpacity.set(v5);
    }
    aboutToAppear() {
        setInterval(() => {
            this.glowOpacity = this.glowOpacity === 0.5 ? 1 : 0.5;
        }, 2000);
    }
    initialRender() {
        this.observeComponentCreation2((t5, u5) => {
            Column.create();
            Column.width('100%');
            Column.margin({ top: 24, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((r5, s5) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((p5, q5) => {
            Column.create();
            Column.margin({ right: 12 });
        }, Column);
        this.observeComponentCreation2((n5, o5) => {
            Row.create();
            Context.animation({
                duration: 2000,
                curve: Curve.EaseInOut,
                iterations: -1,
                playMode: PlayMode.Alternate
            });
            Row.width(8);
            Row.height(8);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(4);
            Row.opacity(this.glowOpacity);
            Context.animation(null);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((l5, m5) => {
            Row.create();
            Row.width(2);
            Row.height(20);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.margin({ top: 4 });
            Row.opacity(0.6);
        }, Row);
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((j5, k5) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((h5, i5) => {
            Text.create(this.title);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.letterSpacing(2);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((d5, e5) => {
            If.create();
            if (this.subtitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((f5, g5) => {
                        Text.create(this.subtitle);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 4 });
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
        this.observeComponentCreation2((b5, c5) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((z4, a5) => {
            Row.create();
            Row.width(40);
            Row.height(1);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.opacity(0.4);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((x4, y4) => {
            Row.create();
            Row.width(6);
            Row.height(6);
            Row.backgroundColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(3);
            Row.margin({ left: 4 });
        }, Row);
        Row.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
