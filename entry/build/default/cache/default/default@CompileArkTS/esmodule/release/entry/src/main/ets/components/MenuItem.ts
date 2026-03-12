if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SysInfoMenuItem_Params {
    title?: string;
    subtitle?: string;
    onTap?: () => void;
}
export class SysInfoMenuItem extends ViewPU {
    constructor(g1, h1, i1, j1 = -1, k1 = undefined, l1) {
        super(g1, i1, j1, l1);
        if (typeof k1 === "function") {
            this.paramsGenerator_ = k1;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(h1.title, this, "title");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(h1.subtitle, this, "subtitle");
        this.onTap = undefined;
        this.setInitiallyProvidedValue(h1);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(f1: SysInfoMenuItem_Params) {
        if (f1.title === undefined) {
            this.__title.set('');
        }
        if (f1.subtitle === undefined) {
            this.__subtitle.set('');
        }
        if (f1.onTap !== undefined) {
            this.onTap = f1.onTap;
        }
    }
    updateStateVars(e1: SysInfoMenuItem_Params) {
        this.__title.reset(e1.title);
        this.__subtitle.reset(e1.subtitle);
    }
    purgeVariableDependenciesOnElmtId(d1) {
        this.__title.purgeDependencyOnElmtId(d1);
        this.__subtitle.purgeDependencyOnElmtId(d1);
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
    set title(c1: string) {
        this.__title.set(c1);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>;
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(b1: string) {
        this.__subtitle.set(b1);
    }
    private onTap?: () => void;
    initialRender() {
        this.observeComponentCreation2((z, a1) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.borderRadius(12);
            Row.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.onClick(() => {
                if (this.onTap) {
                    this.onTap();
                }
            });
        }, Row);
        this.observeComponentCreation2((x, y) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((v, w) => {
            Text.create(this.title);
            Text.fontSize(16);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((r, s) => {
            If.create();
            if (this.subtitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((t, u) => {
                        Text.create(this.subtitle);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.width('100%');
                        Text.margin({ top: 2 });
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
