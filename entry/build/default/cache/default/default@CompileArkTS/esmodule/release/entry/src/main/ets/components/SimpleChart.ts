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
    constructor(j8, k8, l8, m8 = -1, n8 = undefined, o8) {
        super(j8, l8, m8, o8);
        if (typeof n8 === "function") {
            this.paramsGenerator_ = n8;
        }
        this.__data = new SynchedPropertyObjectOneWayPU(k8.data, this, "data");
        this.__maxValue = new SynchedPropertySimpleOneWayPU(k8.maxValue, this, "maxValue");
        this.__color = new SynchedPropertySimpleOneWayPU(k8.color, this, "color");
        this.__title = new SynchedPropertySimpleOneWayPU(k8.title, this, "title");
        this.setInitiallyProvidedValue(k8);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(i8: SimpleChart_Params) {
        if (i8.data === undefined) {
            this.__data.set([]);
        }
        if (i8.maxValue === undefined) {
            this.__maxValue.set(100);
        }
        if (i8.color === undefined) {
            this.__color.set('#007DFF');
        }
        if (i8.title === undefined) {
            this.__title.set('');
        }
    }
    updateStateVars(h8: SimpleChart_Params) {
        this.__data.reset(h8.data);
        this.__maxValue.reset(h8.maxValue);
        this.__color.reset(h8.color);
        this.__title.reset(h8.title);
    }
    purgeVariableDependenciesOnElmtId(g8) {
        this.__data.purgeDependencyOnElmtId(g8);
        this.__maxValue.purgeDependencyOnElmtId(g8);
        this.__color.purgeDependencyOnElmtId(g8);
        this.__title.purgeDependencyOnElmtId(g8);
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
    set data(f8: number[]) {
        this.__data.set(f8);
    }
    private __maxValue: SynchedPropertySimpleOneWayPU<number>;
    get maxValue() {
        return this.__maxValue.get();
    }
    set maxValue(e8: number) {
        this.__maxValue.set(e8);
    }
    private __color: SynchedPropertySimpleOneWayPU<string>;
    get color() {
        return this.__color.get();
    }
    set color(d8: string) {
        this.__color.set(d8);
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(c8: string) {
        this.__title.set(c8);
    }
    initialRender() {
        this.observeComponentCreation2((a8, b8) => {
            Column.create();
            Column.width('100%');
            Column.padding(12);
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((w7, x7) => {
            If.create();
            if (this.title) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((y7, z7) => {
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
        this.observeComponentCreation2((u7, v7) => {
            Row.create();
            Row.width('100%');
            Row.height(100);
            Row.alignItems(VerticalAlign.Bottom);
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((k7, l7) => {
            ForEach.create();
            const m7 = (p7, q7: number) => {
                const r7 = p7;
                this.observeComponentCreation2((s7, t7) => {
                    Column.create();
                    Column.width(4);
                    Column.height(`${Math.min(100, (r7 / this.maxValue) * 100)}%`);
                    Column.backgroundColor(this.color);
                    Column.margin({ right: 2 });
                }, Column);
                Column.pop();
            };
            this.forEachUpdateFunction(k7, this.data, m7, (n7: number, o7: number) => o7.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((g7, h7) => {
            If.create();
            if (this.data.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((i7, j7) => {
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
