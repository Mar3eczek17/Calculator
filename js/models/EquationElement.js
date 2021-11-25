/**
 * Typ elementu - cyfra.
 * 
 * @const string
 */
export const DIGIT_EQUATION_ELEMENT_TYPE = 'digit';

/**
 * Typ elementu - operator.
 * 
 * @const string
 */
export const OPERATOR_EQUATION_ELEMENT_TYPE = 'operator';

/**
 * Typ elementu równania - przecinek.
 * 
 * @const string
 */
export const DOT_EQUATION_ELEMENT_TYPE = 'dot';

/**
 * @typedef {string[]} EQUATION_ELEMENT__TYPES
 */
export const EQUATION_ELEMENT__TYPES = [
    DIGIT_EQUATION_ELEMENT_TYPE,
    OPERATOR_EQUATION_ELEMENT_TYPE,
    DOT_EQUATION_ELEMENT_TYPE,
];

/**
 * Model elementu równania.
 */
export class EquationElement {
    /**
     * Typ elementu równania
     * 
     * @type string
     */
    type;

    /**
     * Wartość elementu równania
     * 
     * @type string
     */
    value;

    /**
     * @param {string} type Typ elementu równania 
     * @param {*} value Wartość elementu równania
     */
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
