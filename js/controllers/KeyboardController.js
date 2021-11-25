import { DIGIT_EQUATION_ELEMENT_TYPE, OPERATOR_EQUATION_ELEMENT_TYPE, DOT_EQUATION_ELEMENT_TYPE } from '../models/EquationElement.js';
import { EquationService } from '../services/EquationService.js';
// import { ResultController } from './ResultController.js';

/**
 * Słownik klawiszy. Klucze odpowiadają identyfikatorom elementów DOM, natomiast wartości to typy klawiszy.
 */
const KEYBOARD_DICTIONARY = {
    'digit-0-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-1-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-2-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-3-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-4-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-5-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-6-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-7-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-8-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'digit-9-key': DIGIT_EQUATION_ELEMENT_TYPE,
    'operation-add-key': OPERATOR_EQUATION_ELEMENT_TYPE,
    'operation-subtract-key': OPERATOR_EQUATION_ELEMENT_TYPE,
    'operation-multiply-key': OPERATOR_EQUATION_ELEMENT_TYPE,
    'operation-divide-key': OPERATOR_EQUATION_ELEMENT_TYPE,
    'operation-modulo-key': OPERATOR_EQUATION_ELEMENT_TYPE,
    'dot-key': DOT_EQUATION_ELEMENT_TYPE,
};

/**
 * Kontroler obsługujący klawiaturę kalkulatora. Bazuje na zdarzeniach klikniecia w zdefiniowane elementy DOM.
 */
export class KeyboardController {
    /**
     * Serwis równania.
     * 
     * @type EquationService 
     * */
    equationService;

    /**@type ResultController */
    resultController;

    /**
    * @param {EquationService} equationService Serwis rónania
    */
    constructor(equationService, resultController){
        this.equationService = equationService;
        this.resultController = resultController;
    }

    /**
    * Przypisanie zdarzeń do przycisków klawiatury.
    */
    bindKeybordEvents() {
        Object.getOwnPropertyNames(KEYBOARD_DICTIONARY).forEach(
            (keyboardDictionaryElement) => {
                const methodName = KEYBOARD_DICTIONARY[keyboardDictionaryElement];
                
                // błędne podejście - zmiana kontekstu this na zdarzenie
                // document.getElementById(element).addEventListener('click', this[methodName]);

                // poprawne podejście - kontekst this pozostaje jako obiekt
                document.getElementById(keyboardDictionaryElement).addEventListener('click', (event) => {
                    this.onKeyClick(event, KEYBOARD_DICTIONARY[keyboardDictionaryElement]);
                });                
            }
        );
    }

    /**
     * Reakcja na zdarzenie wciśnięcia przycisku na klawiaturze.
     * 
     * @param {MouseEvent} event Zdarzenie wciśnięcia przycisku.
     * @param {string} keyType Typ wciśniętego przycisku.
     */
     onKeyClick(event, keyType) {
        this.equationService.addElement(keyType, event.target.innerText);

        this.resultController.updateContent();
    }

    clearOutput(event, keyType){
        this.equationService.clearOutput(keyType, event.target.innerText);
        this.resultController.updateContent();
    }
}