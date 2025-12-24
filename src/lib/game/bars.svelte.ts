export type AttributeValues<T> = {
    [name: string]: T | [0, T]
}