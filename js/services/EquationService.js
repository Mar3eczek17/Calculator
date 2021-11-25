import { EquationElement, EQUATION_ELEMENT__TYPES, DIGIT_EQUATION_ELEMENT_TYPE, OPERATOR_EQUATION_ELEMENT_TYPE, DOT_EQUATION_ELEMENT_TYPE } from '../models/EquationElement.js';
import('../models/EquationElement.js').EQUATION_ELEMENT__TYPES;

/**
 * Serwis obsługujący równanie.
 */
export class EquationService {
    /**
     * Elementy równania.
     * 
     * @type EquationElement[]
     */
    elements = [];

    /**
     * Dodawanie elementu do równania.
     * 
     * @param {string} type Typ elementu równania. Dozwolone wartości są zdefiniowane w tablicy
     *                      `EQUATION_ELEMENT__TYPES`.
     * @param {string} value Wartość elementu równania.
     */
    addElement(type, value) {
        if (!this.validateInput(type)) {
            return;
        }

        if (!this.elements.length){
            this.elements.push(new EquationElement(type, value));
            
            return;
        }

        if (
            this.elements[this.elements.length - 1].type === OPERATOR_EQUATION_ELEMENT_TYPE &&
            type === OPERATOR_EQUATION_ELEMENT_TYPE
        ) {
            this.elements[this.elements.length - 1].value = value;

            return;
        }

        if (
            this.elements.length &&
            this.elements[this.elements.length - 1].type ===
            DIGIT_EQUATION_ELEMENT_TYPE &&
            type === DIGIT_EQUATION_ELEMENT_TYPE
        ) {
            this.elements[this.elements.length - 1].value += value;

            return;
        }

        this.elements.push(new EquationElement(type, value));
        
    }

    /**
     * Pobieranie równania na podstawie jego elementów.
     * 
     * @returns string
     */
    getEquationAsString(){
        var result = '';

        this.elements.forEach((equationElement) => {
            result += ` ${equationElement.value} `;
        });

        return result;
    }



    /**
     * Pobieranie wartości równania na podstawie jego elementów.
     * 
     * @returns string
     */
    getValueAsString(){
        if (!this.elements.length) {
            return 'NaN';
        }

        var lastValue = 0;

        var iterationIndex = 0;

        while (iterationIndex < this.elements.length) {
            if (iterationIndex === 0) {
                lastValue = parseInt(this.elements[iterationIndex].value);
            }

            if (
                this.elements[iterationIndex].type === OPERATOR_EQUATION_ELEMENT_TYPE &&
                this.elements.length > iterationIndex + 1
            ) {
                switch (this.elements[iterationIndex].value) {
                    case '+':
                        lastValue = lastValue + parseInt(this.elements[iterationIndex + 1].value);
                        
                        break;
                    case '-':
                        lastValue = lastValue - parseInt(this.elements[iterationIndex + 1].value);
                        
                        break;
                    case '*':
                        lastValue = lastValue * parseInt(this.elements[iterationIndex + 1].value);
                        
                        break;
                    case '/':
                        lastValue = lastValue / parseInt(this.elements[iterationIndex + 1].value);
                        
                        break;
                    case '%':
                        lastValue = lastValue % parseInt(this.elements[iterationIndex + 1].value);

                        break;
                }
                iterationIndex++;
            }

            iterationIndex++;
        }

        return lastValue.toString();
    }

    validateInput(type) {
        if (!EQUATION_ELEMENT__TYPES.includes(type)) {
            return false;
        }

        if (!this.elements.length && type === OPERATOR_EQUATION_ELEMENT_TYPE) {
            return false;
        }

        if (!this.elements.length && type === DOT_EQUATION_ELEMENT_TYPE) {
            return false;
        }

        if (
            this.elements.length &&
            this.elements[this.elements.length - 1].type === OPERATOR_EQUATION_ELEMENT_TYPE &&
            type === DOT_EQUATION_ELEMENT_TYPE
        ) {
            return false;
        }

        if (
            this.elements.length &&
            this.elements[this.elements.length - 1].type === DOT_EQUATION_ELEMENT_TYPE &&
            type === OPERATOR_EQUATION_ELEMENT_TYPE
        ) {
            return false;
        }

        if (
            this.elements.length &&
            this.elements[this.elements.length - 1].type === DOT_EQUATION_ELEMENT_TYPE &&
            type === DOT_EQUATION_ELEMENT_TYPE
        ) {
            return false;
        }

        if (
            this.elements.length > 1 &&
            this.elements[this.elements.length - 2].type === DOT_EQUATION_ELEMENT_TYPE &&
            type === DOT_EQUATION_ELEMENT_TYPE
        ) {
            return false;
        }

        return true;
    }
}
