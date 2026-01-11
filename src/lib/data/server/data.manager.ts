import path from 'path';
import { SpeciesManager } from './species.manager';

const basePath = 'static/data/';
const speciesPath = path.join(basePath, 'species');

export class DataManager {
    private static instance?: DataManager;
    species: SpeciesManager;

    private constructor() {
        this.species = new SpeciesManager(speciesPath);
    }

    public static get() {
        if (!this.instance)
            this.instance = new DataManager()
        return this.instance;
    }
}