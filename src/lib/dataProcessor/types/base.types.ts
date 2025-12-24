export type MathExpression = string
export type NumberValue = number | MathExpression;
export type NumberCheck = {
    min?: NumberValue
    max?: NumberValue
    eq?: NumberValue
};