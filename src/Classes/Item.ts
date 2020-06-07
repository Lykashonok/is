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


export class Item extends Component {
    public id: number = 0;
    public description: string = '';
    public image: string = '';
    public stars: number = 0;
    public name: string = '';
    public created_date: number = 0;
    public seller_id: number = 0;
    public price: number = 0;
    public items: string = '';

    getId() : number {
        return this.id
    }

    public operation(): string {
        return JSON.stringify(
            {}
        );
    }

    constructor(id?: number, description?: string, image?: string, stars?: number, created_date?: number, seller_id?: number, name?: string, price?: number, items?: string) {
        super()
        this.id = id || 0;
        this.description = description || '';
        this.image = image || '';
        this.stars = stars || 0;
        this.created_date = created_date || 0;
        this.seller_id = seller_id || 0;
        this.name = name || '';
        this.price = price || 0;
        this.items = items || ''
    }
}

export class CompositeItem extends Component {
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

    constructor() {
        super()
    }
}