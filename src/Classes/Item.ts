abstract class ItemRaw {
    description: string;
    image: string;
    constructor(description: string, image: string) {
        this.description = description
        this.image = image
    }
}

export class ItemCountable extends ItemRaw {

}

export class ItemEntire extends ItemRaw {

}

export type Item = ItemCountable | ItemEntire