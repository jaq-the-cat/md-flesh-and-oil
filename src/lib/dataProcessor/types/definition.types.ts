import type { NumberCheck, NumberValue } from "./base.types"

export type GenericData = string | string[] | NumberValue | NumberCheck | boolean | GenericDefinition
export type GenericDefinition = Partial<{
    [name: string]: GenericData
}>

export interface RequirementDefinition {
    requirements?: {
        capabilities: Record<string, boolean>
    }
}

export type UsageDefinition = RequirementDefinition & {
    requirements?: {
        bars?: Record<string, NumberCheck>
    }
    cost?: {
        bars: Record<string, number>
    }
}

export type CapabilityDefinition = GenericDefinition & RequirementDefinition;

export interface InventoryDefinition extends GenericDefinition {
    slots: {
        [slotName: string]: boolean
        handLeft: boolean
        handRight: boolean
        shoulderLeft: boolean
        shoulderRight: boolean
        front: boolean
        back: boolean
    }
}

export interface SpeciesDefinition extends GenericDefinition {
    name: string
    bars: Record<string, NumberValue>
    speed: Record<string, number>
    inventory: InventoryDefinition
    stats: string[]
    skills: Record<string, string | string[]>
    capabilities: Record<string, boolean | RequirementDefinition | UsageDefinition>
}