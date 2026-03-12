if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface InfoCard_Params {
    title?: string;
    value?: string;
}
export class InfoCard extends ViewPU {
    constructor(l, m, n, o = -1, p = undefined, q) {
        super(l, n, o, q);
        if (typeof p === "function") {
            this.paramsGenerator_ = p;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(m.title, this, "title");
        this.__value = new SynchedPropertySimpleOneWayPU(m.value, this, "value");
        this.setInitiallyProvidedValue(m);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(k: InfoCard_Params) {
        if (k.title === undefined) {
            this.__title.set('');
        }
        if (k.value === undefined) {
            this.__value.set('');
        }
    }
    updateStateVars(j: InfoCard_Params) {
        this.__title.reset(j.title);
        this.__value.reset(j.value);
    }
    purgeVariableDependenciesOnElmtId(i) {
        this.__title.purgeDependencyOnElmtId(i);
        this.__value.purgeDependencyOnElmtId(i);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(h: string) {
        this.__title.set(h);
    }
    private __value: SynchedPropertySimpleOneWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(g: string) {
        this.__value.set(g);
    }
    initialRender() {
        this.observeComponentCreation2((e, f) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.borderRadius(12);
            Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((c, d) => {
            Text.create(this.title);
            Text.fontSize(14);
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((a, b) => {
            Text.create(this.value);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ top: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
