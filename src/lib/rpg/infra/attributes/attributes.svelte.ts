import { objectToOrdered, orderedToObject, type OrderedMap } from "$lib/db";

export type Attributes<T> = { [name: string]: T };

export class AttributeManager<T> {
    _attrs: Attributes<T> = $state({})

    constructor(attrs?: Attributes<T>) {
        if (attrs) this._attrs = attrs;
    }

    get entries() {
        return Object.entries(this._attrs);
    }

    get keys() {
        return Object.keys(this._attrs)
    }

    get values() {
        return Object.values(this._attrs)
    }

    get(name: string) {
        return this._attrs[name];
    }    

    set(name: string, value: T) {
        this._attrs[name] = value;
    }

    remove(name: string) {
        delete this._attrs[name];
    }

    static fromList<T>(names: string[], value: T): AttributeManager<T> {
        const attrs = new AttributeManager<T>();
        for (const name of names) attrs.set(name, value);
        return attrs;
    }

    serialize() {
        return objectToOrdered(this._attrs);
    }

    static deserialize<T>(omap: OrderedMap<string, T>): AttributeManager<T> {
        return new AttributeManager(orderedToObject(omap));
    }
}