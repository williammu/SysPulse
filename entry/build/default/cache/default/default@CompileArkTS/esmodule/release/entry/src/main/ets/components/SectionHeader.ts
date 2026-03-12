if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SectionHeader_Params {
    title?: string;
}
export class SectionHeader extends ViewPU {
    constructor(l2, m2, n2, o2 = -1, p2 = undefined, q2) {
        super(l2, n2, o2, q2);
        if (typeof p2 === "function") {
            this.paramsGenerator_ = p2;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(m2.title, this, "title");
        this.setInitiallyProvidedValue(m2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(k2: SectionHeader_Params) {
        if (k2.title === undefined) {
            this.__title.set('');
        }
    }
    updateStateVars(j2: SectionHeader_Params) {
        this.__title.reset(j2.title);
    }
    purgeVariableDependenciesOnElmtId(i2) {
        this.__title.purgeDependencyOnElmtId(i2);
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
    set title(h2: string) {
        this.__title.set(h2);
    }
    initialRender() {
        this.observeComponentCreation2((f2, g2) => {
            Text.create(this.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.width('100%');
            Text.margin({ top: 24, bottom: 12 });
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
