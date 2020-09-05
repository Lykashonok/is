export class Order implements Memento {
    id: number;
    item_id: number;
    user_id: number;
    seller_id: number;
    created_date: number;
    finished_date: number;
    state: string;

    public mementoState: Order | null = null;

    getId(): number {
        return this.id;
    }
    
    getInfo(): Order {
        return this
    }
    constructor(id?: number, item_id?: number, user_id?: number, seller_id?: number, created_date?: number, finished_date?: number, state?: string, mementoState?: Order) {
        if (mementoState)
            this.mementoState = new Order(id, item_id, user_id, seller_id, created_date, finished_date, state)
        this.id = id || 0;
        this.item_id = item_id || 0;
        this.user_id = user_id || 0;
        this.seller_id = seller_id || 0;
        this.created_date = created_date || 0;
        this.finished_date = finished_date || 0;
        this.state = state || '';
    }

    public save(): Memento {
        console.log('saving memento state', this.mementoState!)
        return new ConcreteMemento(this.mementoState!);
    }

    public restore(memento: Memento): void {
        this.mementoState = memento.getState();
        console.log(`Originator: My state has changed to: ${this.state}`);
    }

    getState(): Order {
        return this.mementoState!
    }
    getName(): string {
        return this.state
    }
    getDate(): string {
        return Date()
    }
    
}

interface Memento {
    getState(): Order;

    getInfo(): Order;

    getDate(): string;
}

class ConcreteMemento implements Memento {
    private state: Order;

    private date: string;

    constructor(state: Order) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    public getState(): Order {
        return this.state;
    }
    public getInfo(): Order {
        return this.state.getInfo();
    }

    public getDate(): string {
        return this.date;
    }
}

export class Caretaker {
    private mementos: Memento[] = [];

    private originator: Order;

    constructor(originator: Order) {
        this.originator = originator;
        this.originator.mementoState = originator.mementoState
    }

    public registrateOriginator(originator: Order) {
        this.originator = originator;
        this.originator.mementoState = originator.mementoState
    }

    public backup(order?: Order): void {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(this.originator.save());
    }

    public undo(): Order | void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`Caretaker: Resto/ring state to: ${memento!.getInfo()}`);
        this.originator.restore(memento!);
        return this.originator
    }

    public showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getInfo());
        }
    }
}