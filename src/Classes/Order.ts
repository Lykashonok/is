abstract class Component {
    protected parent: Component | null = null;

    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component {
        return this.parent!;
    }

    public add(component: Component): void { }

    public remove(component: Component): void { }

    public isComposite(): boolean {
        return false;
    }

    public abstract operation(): string;
}

export class Order extends Component {
    id: number;
    item_id: number;
    user_id: number;
    seller_id: number;
    created_date: number;
    finished_date: number;
    state: string;

    getId(): number {
        return this.id;
    }
    public operation(): string {
        return JSON.stringify(this.getInfo());
    }
    getInfo(): { id: number, item_id: number, user_id: number, seller_id: number, created_date: number, finished_date: number, state: string } {
        return {
            "id": this.id,
            "item_id": this.item_id,
            "user_id": this.user_id,
            "seller_id": this.seller_id,
            "created_date": this.created_date,
            "finished_date": this.finished_date,
            "state": this.state
        }
    }
    constructor(id?: number, item_id?: number, user_id?: number, seller_id?: number, created_date?: number, finished_date?: number, state?: string) {
        super()
        this.id = id || 0;
        this.item_id = item_id || 0;
        this.user_id = user_id || 0;
        this.seller_id = seller_id || 0;
        this.created_date = created_date || 0;
        this.finished_date = finished_date || 0;
        this.state = state || '';
    }
}

class CompositeOrder extends Component {
    protected children: Component[] = [];

    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }
        return `Branch(${results.join('+')})`;
    }
}

const tree = new CompositeOrder();
const branch1 = new CompositeOrder();
branch1.add(new Order());
branch1.add(new Order());
const branch2 = new CompositeOrder();
branch2.add(new Order());
tree.add(branch1);
tree.add(branch2);