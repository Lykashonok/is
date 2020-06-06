export class Item {
    public id: number = 0;
    public description: string = '';
    public image: string = '';
    public stars: number = 0;
    public name: string = '';
    public created_date: number = 0;
    public seller_id: number = 0;
    public price: number = 0;

    getId() : number {
        return this.id
    }

    constructor(id?: number, description?: string, image?: string, stars?: number, created_date?: number, seller_id?: number, name?: string, price?: number) {
        this.id = id || 0;
        this.description = description || '';
        this.image = image || '';
        this.stars = stars || 0;
        this.created_date = created_date || 0;
        this.seller_id = seller_id || 0;
        this.name = name || '';
        this.price = price || 0;
    }
}

// export class ItemCountable extends ItemRaw {

// }

// export class ItemEntire extends ItemRaw {

// }

// export type Item = ItemCountable | ItemEntire