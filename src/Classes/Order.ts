// export class Order {
//     public id: number;
//     public 
//     item_id	user_id	seller_id	created_date	finished_date	state
// }

export class Order {
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
        this.id = id || 0;
        this.item_id = item_id || 0;
        this.user_id = user_id || 0;
        this.seller_id = seller_id || 0;
        this.created_date = created_date || 0;
        this.finished_date = finished_date || 0;
        this.state = state || '';
    }
}