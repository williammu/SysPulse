if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SimpleChart_Params {
    data?: number[];
    maxValue?: number;
    color?: string;
    title?: string;
}
export class SimpleChart extends ViewPU {
    constructor(d1, e1, f1, g1 = -1, h1 = undefined, i1) {
        super(d1, f1, g1, i1);
        if (typeof h1 === "function") {
            this.paramsGenerator_ = h1;
        }
        this.__data = new SynchedPropertyObjectOneWayPU(e1.data, this, "data");
        this.__maxValue = new SynchedPropertySimpleOneWayPU(e1.maxValue, this, "maxValue");
        this.__color = new SynchedPropertySimpleOneWayPU(e1.color, this, "color");
        this.__title = new SynchedPropertySimpleOneWayPU(e1.title, this, "title");
        this.setInitiallyProvidedValue(e1);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(c1: SimpleChart_Params) {
        if (c1.data === undefined) {
            this.__data.set([]);
        }
        if (c1.maxValue === undefined) {
            this.__maxValue.set(100);
        }
        if (c1.color === undefined) {
            this.__color.set('#007DFF');
        }
        if (c1.title === undefined) {
            this.__title.set('');
        }
    }
    updateStateVars(b1: SimpleChart_Params) {
        this.__data.reset(b1.data);
        this.__maxValue.reset(b1.maxValue);
        this.__color.reset(b1.color);
        this.__title.reset(b1.title);
    }
    purgeVariableDependenciesOnElmtId(a1) {
        this.__data.purgeDependencyOnElmtId(a1);
        this.__maxValue.purgeDependencyOnElmtId(a1);
        this.__color.purgeDependencyOnElmtId(a1);
        this.__title.purgeDependencyOnElmtId(a1);
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        this.__maxValue.aboutToBeDeleted();
        this.__color.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __data: SynchedPropertySimpleOneWayPU<number[]>;
    get data() {
        return this.__data.get();
    }
    set data(z: number[]) {
        this.__data.set(z);
    }
    private __maxValue: SynchedPropertySimpleOneWayPU<number>;
    get maxValue() {
        return this.__maxValue.get();
    }
    set maxValue(y: number) {
        this.__maxValue.set(y);
    }
    private __color: SynchedPropertySimpleOneWayPU<string>;
    get color() {
        return this.__color.get();
    }
    set color(x: string) {
        this.__color.set(x);
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(w: string) {
        this.__title.set(w);
    }
    initialRender() {
        this.observeComponentCreation2((u, v) => {
            Column.create();
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((q, r) => {
            If.create();
            if (this.title) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((s, t) => {
                        Text.create(this.title);
                        Text.fontSize(14);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ bottom: 8 });
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
        this.observeComponentCreation2((o, p) => {
            Row.create();
            Row.width('100%');
            Row.height(100);
            Row.alignItems(VerticalAlign.Bottom);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((e, f) => {
            ForEach.create();
            const g = (j, k: number) => {
                const l = j;
                this.observeComponentCreation2((m, n) => {
                    Column.create();
                    Column.width(4);
                    Column.height(`${Math.min(100, (l / this.maxValue) * 100)}%`);
                    Column.backgroundColor(this.color);
                    Column.margin({ right: 2 });
                }, Column);
                Column.pop();
            };
            this.forEachUpdateFunction(e, this.data, g, (h: number, i: number) => i.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((a, b) => {
            If.create();
            if (this.data.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((c, d) => {
                        Text.create(`当前: ${this.data[this.data.length - 1].toFixed(1)}%`);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
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
