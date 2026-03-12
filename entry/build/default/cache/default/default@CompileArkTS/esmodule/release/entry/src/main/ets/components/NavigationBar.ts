if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NavigationBarWithArrow_Params {
    title?: string;
    onBack?: () => void;
}
interface NavigationBar_Params {
    title?: string;
    onBack?: () => void;
}
export class NavigationBar extends ViewPU {
    constructor(i1, j1, k1, l1 = -1, m1 = undefined, n1) {
        super(i1, k1, l1, n1);
        if (typeof m1 === "function") {
            this.paramsGenerator_ = m1;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(j1.title, this, "title");
        this.onBack = undefined;
        this.setInitiallyProvidedValue(j1);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(h1: NavigationBar_Params) {
        if (h1.title === undefined) {
            this.__title.set('');
        }
        if (h1.onBack !== undefined) {
            this.onBack = h1.onBack;
        }
    }
    updateStateVars(g1: NavigationBar_Params) {
        this.__title.reset(g1.title);
    }
    purgeVariableDependenciesOnElmtId(f1) {
        this.__title.purgeDependencyOnElmtId(f1);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(e1: string) {
        this.__title.set(e1);
    }
    private onBack?: () => void;
    initialRender() {
        this.observeComponentCreation2((c1, d1) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 4, right: 4 });
            Row.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((a1, b1) => {
            Row.create();
            Row.width(48);
            Row.height(48);
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                if (this.onBack) {
                    this.onBack();
                }
            });
        }, Row);
        this.observeComponentCreation2((y, z) => {
            Text.create('←');
            Text.fontSize(28);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((w, x) => {
            Text.create(this.title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.layoutWeight(1);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((u, v) => {
            Row.create();
            Row.width(48);
            Row.height(48);
        }, Row);
        Row.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class NavigationBarWithArrow extends ViewPU {
    constructor(o, p, q, r = -1, s = undefined, t) {
        super(o, q, r, t);
        if (typeof s === "function") {
            this.paramsGenerator_ = s;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(p.title, this, "title");
        this.onBack = undefined;
        this.setInitiallyProvidedValue(p);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(n: NavigationBarWithArrow_Params) {
        if (n.title === undefined) {
            this.__title.set('');
        }
        if (n.onBack !== undefined) {
            this.onBack = n.onBack;
        }
    }
    updateStateVars(m: NavigationBarWithArrow_Params) {
        this.__title.reset(m.title);
    }
    purgeVariableDependenciesOnElmtId(l) {
        this.__title.purgeDependencyOnElmtId(l);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(k: string) {
        this.__title.set(k);
    }
    private onBack?: () => void;
    initialRender() {
        this.observeComponentCreation2((i, j) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 4, right: 4 });
            Row.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((g, h) => {
            Row.create();
            Row.width(48);
            Row.height(48);
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                if (this.onBack) {
                    this.onBack();
                }
            });
        }, Row);
        this.observeComponentCreation2((e, f) => {
            Text.create('←');
            Text.fontSize(28);
            Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((c, d) => {
            Text.create(this.title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.layoutWeight(1);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((a, b) => {
            Row.create();
            Row.width(48);
            Row.height(48);
        }, Row);
        Row.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
