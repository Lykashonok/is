import { registrateItem, updateItem } from '../Networking/ServerRequest'
import { CompositeItem, Item} from './Item'

export type CommonUser = Customer | Seller | Admin

export abstract class User {
    private id: number;
    private type: string;
    private image: string;
    private email: string;
    private adress: string;
    private phone: string;
    private name: string;
    private token: string = '';

    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id
    }
    setToken(token: string) {
        this.token = token
    }
    setInfo(id?: number, type?: string, image?: string, email?: string, adress?: string, phone?: string, name?: string) {
        this.id = id || 0;
        this.type = type || '';
        this.image = image || '';
        this.email = email || '';
        this.adress = adress || '';
        this.phone = phone || '';
        this.name = name || '';
    }
    getInfo(): { id: number, type: string, image: string, email: string, adress: string, phone: string, name: string } {
        return {
            "id": this.id,
            "type": this.type,
            "image": this.image,
            "email": this.email,
            "adress": this.adress,
            "phone": this.phone,
            "name": this.name,
        }
    }
    abstract logIn(): void;
    abstract signUp(): void;
    constructor(id?: number, type?: string, image?: string, email?: string, adress?: string, phone?: string, name?: string) {
        this.id = id || 0;
        this.type = type || '';
        this.image = image || '';
        this.email = email || '';
        this.adress = adress || '';
        this.phone = phone || '';
        this.name = name || '';
    }
}

export class Customer extends User {

    logIn(): void {
        throw new Error("Method not implemented.");
    }
    signUp(): void {
        throw new Error("Method not implemented.");
    }
    makeOrder(): void {

    }
    createFeedback(): void {

    }
    constructor(id?: number, type?: string, adress?: string, phone?: string, email?: string, image?: string, name?: string) {
        super(id || 0, type || '', image || '', email || '',adress || '', phone || '', name || '');
    }
}

export class Seller extends User {
    logIn(): void {
        throw new Error("Method not implemented.");
    }
    signUp(): void {
        throw new Error("Method not implemented.");
    }
    public async createItem(item: Item, activityIndicator? : (value : boolean) => void ) : Promise<void>{
        try {
            if (activityIndicator) activityIndicator(true);
            let response = await registrateItem(item.stars, item.name, item.description, item.seller_id, item.price, item.image, item.items, item.created_date);
            if (response.code != 200) throw "Getting messages failed";
        } catch {
        } finally {
            if (activityIndicator) activityIndicator(false);
        }
    }
    public async editItem(item: Item, activityIndicator? : (value : boolean) => void ) : Promise<void>{
        try {
            if (activityIndicator) activityIndicator(true);
            let response = await updateItem(item.id, item.stars, item.name, item.description, item.seller_id, item.price, item.image, item.items, item.created_date);
            if (response.code != 200) throw "Getting messages failed";
        } catch {
        } finally {
            if (activityIndicator) activityIndicator(false);
        }
    }
    public async createCompositeItem(newItem: Item, pickers: {index: number, id: number}[], items: Item[], activityIndicator? : (value : boolean) => void ) : Promise<void>{
        try {
            if (activityIndicator) activityIndicator(true);
            let item = new CompositeItem()
            item.image = newItem.image
            item.items = newItem.items
            item.name = newItem.name
            item.price = newItem.price
            item.seller_id = this.getId()
            item.stars = newItem.stars
            for (let picker of pickers) {
                item.add(items.filter(item => item.id == Number(picker.id))[0])
            }
            item.items = item.operation()
            let response = await registrateItem(item.stars, item.name, item.description, item.seller_id, item.price, item.image, item.items, item.created_date);
            if (response.code != 200) throw "Create composite failed";
        } catch {
        } finally {
            if (activityIndicator) activityIndicator(false);
        }
    }
    // return await (this.props.user as Seller).createCompositeItem(this.state.pickers, this.state.items, (isLoading: boolean) => this.setState({isLoading}))
    deleteItem(): Item {
        return new Item();
    }
    constructor(id?: number, type?: string, adress?: string, phone?: string, email?: string, image?: string, name?: string) {
        super(id || 0, type || '', image || '', email || '', adress || '', phone || '', name || '');
    }
}

export class Admin extends User {
    logIn(): void {
        throw new Error("Method not implemented.");
    }
    signUp(): void {
        throw new Error("Method not implemented.");
    }
    createItem(): Item {
        return new Item();
    }
    constructor(id?: number, type?: string, adress?: string, phone?: string, email?: string, image?: string, name?: string) {
        super(id || 0, type || '', image || '', email || '', adress || '', phone || '', name || '');
    }
}