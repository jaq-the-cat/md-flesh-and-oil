import type { InventoryDefinition } from "$lib/dataProcessor/types/definition.types";
import { Item } from "./item.svelte";
import '$lib/extensions/object.extension';

export class Inventory {
    slots: { [slotName: string]: Item | null } = {}
    constructor(definition: InventoryDefinition) {
        this.slots = Object.filterMap(definition.slots,
            ([slotName, enabled]) => {
                if (!enabled) return null;
                return [slotName, null];
            });
    }
}