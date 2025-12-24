import path from 'path';
import type { GenericDefinition } from '../types/definition.types';
import { SpeciesManager } from './species.manager';

const basePath = 'src/lib/data/';
const speciesPath = path.join(basePath, 'species');

export class ObjectLink<V, T extends object = object> {
    root: T
    link: string

    constructor(root: T, link: string) {
        this.root = root
        this.link = link
    }

    set(value: V): V | null {
        return ObjectLink.linkToValue(this.root, this.link, value);
    }

    get(): V | null {
        return ObjectLink.linkToValue(this.root, this.link);
    }
    
    public static linkToValue<T>(obj: any, link: string, newValue?: any): T | null {
        const keys = link.replace(/ /g, '').split('.');
        const searchKey =  keys.shift()!;
        if (searchKey in obj) {
            if (keys.length === 0 || typeof obj[searchKey] !== 'object') {
                if (newValue) obj[searchKey] = newValue;
                return obj[searchKey] as T;
            } else {
                return this.linkToValue(obj[searchKey], keys.join('.'), newValue);
            }
        }
        return null;
    }
}

export class DataManager {
    private static instance?: DataManager;
    species: SpeciesManager;

    private constructor() {
        this.species = new SpeciesManager(speciesPath);
    }
    
    public static joinObjects<T extends GenericDefinition>(a: any, b: any, overwrite: boolean = false): T {
        if (!a) return a;
        for (const key in b) {
            // if key is not in a, add it
            if (typeof a[key] == 'object') {
                // if it's an array, add to the end of the array
                if (Array.isArray(a[key])) {
                    a[key].push(...b[key] as any);
                } else {
                    this.joinObjects(a[key] as any, b[key] as any, overwrite);
                }
            } else if (!(key in a) || overwrite) {
                a[key] = b[key];
            }
        }
        return a as T;
    }

    public static get() {
        if (!this.instance)
            this.instance = new DataManager()
        return this.instance;
    }
}