if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SysInfoMenuItem_Params {
    title?: string;
    subtitle?: string;
    icon?: string;
    onTap?: () => void;
    isPressed?: boolean;
    isHovered?: boolean;
}
export class SysInfoMenuItem extends ViewPU {
    constructor(r4, s4, t4, u4 = -1, v4 = undefined, w4) {
        super(r4, t4, u4, w4);
        if (typeof v4 === "function") {
            this.paramsGenerator_ = v4;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(s4.title, this, "title");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(s4.subtitle, this, "subtitle");
        this.__icon = new SynchedPropertySimpleOneWayPU(s4.icon, this, "icon");
        this.onTap = () => { };
        this.__isPressed = new ObservedPropertySimplePU(false, this, "isPressed");
        this.__isHovered = new ObservedPropertySimplePU(false, this, "isHovered");
        this.setInitiallyProvidedValue(s4);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(q4: SysInfoMenuItem_Params) {
        if (q4.title === undefined) {
            this.__title.set('');
        }
        if (q4.subtitle === undefined) {
            this.__subtitle.set('');
        }
        if (q4.icon === undefined) {
            this.__icon.set('');
        }
        if (q4.onTap !== undefined) {
            this.onTap = q4.onTap;
        }
        if (q4.isPressed !== undefined) {
            this.isPressed = q4.isPressed;
        }
        if (q4.isHovered !== undefined) {
            this.isHovered = q4.isHovered;
        }
    }
    updateStateVars(p4: SysInfoMenuItem_Params) {
        this.__title.reset(p4.title);
        this.__subtitle.reset(p4.subtitle);
        this.__icon.reset(p4.icon);
    }
    purgeVariableDependenciesOnElmtId(o4) {
        this.__title.purgeDependencyOnElmtId(o4);
        this.__subtitle.purgeDependencyOnElmtId(o4);
        this.__icon.purgeDependencyOnElmtId(o4);
        this.__isPressed.purgeDependencyOnElmtId(o4);
        this.__isHovered.purgeDependencyOnElmtId(o4);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__subtitle.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
        this.__isPressed.aboutToBeDeleted();
        this.__isHovered.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(n4: string) {
        this.__title.set(n4);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>;
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(m4: string) {
        this.__subtitle.set(m4);
    }
    private __icon: SynchedPropertySimpleOneWayPU<string>;
    get icon() {
        return this.__icon.get();
    }
    set icon(l4: string) {
        this.__icon.set(l4);
    }
    private onTap: () => void;
    private __isPressed: ObservedPropertySimplePU<boolean>;
    get isPressed() {
        return this.__isPressed.get();
    }
    set isPressed(k4: boolean) {
        this.__isPressed.set(k4);
    }
    private __isHovered: ObservedPropertySimplePU<boolean>;
    get isHovered() {
        return this.__isHovered.get();
    }
    set isHovered(j4: boolean) {
        this.__isHovered.set(j4);
    }
    initialRender() {
        this.observeComponentCreation2((g4, h4) => {
            Row.create();
            Context.animation({
                duration: 150,
                curve: Curve.EaseInOut
            });
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Row.borderRadius(12);
            Row.border({
                width: 1,
                color: this.isPressed ? { "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" } : { "id": 16777236, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" }
            });
            Row.shadow({
                radius: this.isPressed ? 12 : 4,
                color: this.isPressed ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                offsetX: 0,
                offsetY: this.isPressed ? 4 : 2
            });
            Row.scale({ x: this.isPressed ? 0.98 : 1, y: this.isPressed ? 0.98 : 1 });
            Context.animation(null);
            Row.onTouch((i4) => {
                if (i4.type === TouchType.Down) {
                    this.isPressed = true;
                }
                else if (i4.type === TouchType.Up || i4.type === TouchType.Cancel) {
                    this.isPressed = false;
                }
            });
            Row.onClick(() => {
                this.onTap();
            });
        }, Row);
        this.observeComponentCreation2((e4, f4) => {
            Row.create();
            Row.layoutWeight(1);
        }, Row);
        this.observeComponentCreation2((a4, b4) => {
            If.create();
            if (this.icon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((c4, d4) => {
                        Text.create(this.icon);
                        Text.fontSize(20);
                        Text.fontColor({ "id": 16777225, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ right: 12 });
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
        this.observeComponentCreation2((y3, z3) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((w3, x3) => {
            Text.create(this.title);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((s3, t3) => {
            If.create();
            if (this.subtitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((u3, v3) => {
                        Text.create(this.subtitle);
                        Text.fontSize(12);
                        Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
                        Text.margin({ top: 2 });
                        Text.maxLines(1);
                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
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
        this.observeComponentCreation2((q3, r3) => {
            Text.create('›');
            Text.fontSize(24);
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.huawei.sysinfo", "moduleName": "entry" });
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
