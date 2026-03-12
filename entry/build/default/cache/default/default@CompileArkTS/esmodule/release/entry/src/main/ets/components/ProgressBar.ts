if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProgressBar_Params {
    progress?: number;
    total?: number;
    barHeight?: number;
    color?: ResourceColor;
}
export class ProgressBar extends ViewPU {
    constructor(z1, a2, b2, c2 = -1, d2 = undefined, e2) {
        super(z1, b2, c2, e2);
        if (typeof d2 === "function") {
            this.paramsGenerator_ = d2;
        }
        this.__progress = new SynchedPropertySimpleOneWayPU(a2.progress, this, "progress");
        this.__total = new SynchedPropertySimpleOneWayPU(a2.total, this, "total");
        this.__barHeight = new SynchedPropertySimpleOneWayPU(a2.barHeight, this, "barHeight");
        this.__color = new SynchedPropertyObjectOneWayPU(a2.color, this, "color");
        this.setInitiallyProvidedValue(a2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(y1: ProgressBar_Params) {
        if (y1.progress === undefined) {
            this.__progress.set(0);
        }
        if (y1.total === undefined) {
            this.__total.set(100);
        }
        if (y1.barHeight === undefined) {
            this.__barHeight.set(8);
        }
        if (y1.color === undefined) {
            this.__color.set('#007DFF');
        }
    }
    updateStateVars(x1: ProgressBar_Params) {
        this.__progress.reset(x1.progress);
        this.__total.reset(x1.total);
        this.__barHeight.reset(x1.barHeight);
        this.__color.reset(x1.color);
    }
    purgeVariableDependenciesOnElmtId(w1) {
        this.__progress.purgeDependencyOnElmtId(w1);
        this.__total.purgeDependencyOnElmtId(w1);
        this.__barHeight.purgeDependencyOnElmtId(w1);
        this.__color.purgeDependencyOnElmtId(w1);
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__total.aboutToBeDeleted();
        this.__barHeight.aboutToBeDeleted();
        this.__color.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __progress: SynchedPropertySimpleOneWayPU<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(v1: number) {
        this.__progress.set(v1);
    }
    private __total: SynchedPropertySimpleOneWayPU<number>;
    get total() {
        return this.__total.get();
    }
    set total(u1: number) {
        this.__total.set(u1);
    }
    private __barHeight: SynchedPropertySimpleOneWayPU<number>;
    get barHeight() {
        return this.__barHeight.get();
    }
    set barHeight(t1: number) {
        this.__barHeight.set(t1);
    }
    private __color: SynchedPropertySimpleOneWayPU<ResourceColor>;
    get color() {
        return this.__color.get();
    }
    set color(s1: ResourceColor) {
        this.__color.set(s1);
    }
    initialRender() {
        this.observeComponentCreation2((q1, r1) => {
            Stack.create({ alignContent: Alignment.Start });
            Stack.width('100%');
        }, Stack);
        this.observeComponentCreation2((o1, p1) => {
            Row.create();
            Row.width('100%');
            Row.height(this.barHeight);
            Row.borderRadius(this.barHeight / 2);
            Row.backgroundColor('#E5E6EB');
        }, Row);
        Row.pop();
        this.observeComponentCreation2((m1, n1) => {
            Row.create();
            Row.width(`${(this.progress / this.total) * 100}%`);
            Row.height(this.barHeight);
            Row.borderRadius(this.barHeight / 2);
            Row.backgroundColor(ObservedObject.GetRawObject(this.color));
        }, Row);
        Row.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
