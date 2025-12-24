import { DataManager } from "./data.manager";
import { Parser } from "../parser";
import path from 'path';
import type { SpeciesDefinition, CapabilityDefinition, GenericDefinition } from "../types/definition.types";

export class SpeciesManager {
    private definitions: Map<string, SpeciesDefinition>;
    private defaults: Map<string, Partial<SpeciesDefinition>>;
    private capabilities: Map<string, CapabilityDefinition>;

    public get getDefinitions() { return this.definitions };
    public get getDefaults() { return this.defaults };
    public get getCapabilities() { return this.capabilities };

    public constructor(folderpath: string) {
        this.definitions = Parser.parseFolder<SpeciesDefinition>(folderpath);
        this.defaults = Parser.parseFolder<SpeciesDefinition>(path.join(folderpath, 'defaults'));
        this.capabilities = Parser.parseFolder<CapabilityDefinition>(path.join(folderpath, 'capabilities'));

        this.definitions.entries().forEach(([key, definition]) => {
            SpeciesManager.includeSpeciesDefaults(definition, structuredClone(this.defaults));
            SpeciesManager.includeSpeciesCapabilities(definition, structuredClone(SpeciesManager.getValidCapabilities(definition, this.capabilities)));
        });
    }

    public static includeSpeciesDefaults(e: SpeciesDefinition, defaults: Map<string, Partial<SpeciesDefinition>>) {
        const defaultsObj = Object.fromEntries(defaults.entries());
        DataManager.joinObjects(e, defaultsObj);
        return e;
    }

    public static getValidCapabilities(e: SpeciesDefinition, capabilities: Map<string, CapabilityDefinition>) {
        return new Map(capabilities
            .entries()
            .filter(([key, _]) => {
                const r = e.capabilities && key in e.capabilities && e.capabilities[key];
                return r;
            }))
    }

    public static includeSpeciesCapabilities(e: SpeciesDefinition, capabilities: Map<string, CapabilityDefinition>) {
        capabilities
            .entries()
            .forEach(([key, capability]) => {
                // TODO: check requirements
                const capabilityRequirements = capability.requirements?.capabilities
                if (capabilityRequirements) {
                    Object.entries(capabilityRequirements).every(([cap, isRequired]) => {
                        const found = capabilities.keys().some(otherCap => cap === otherCap)
                        if (!found && isRequired) {
                            throw Error(`${cap} expected in ${e.name}, but not found`)
                        } else if (found && !isRequired) {
                            throw Error(`${cap} not expected in ${e.name}, but found`)
                        }
                    })
                }

                e.capabilities[key] = capability;
                DataManager.joinObjects(e, capability, true)
                delete e.requirements;
                delete e.usage;
        });
        return e;
    }
}