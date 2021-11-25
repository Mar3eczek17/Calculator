import { KeyboardController } from "./controllers/KeyboardController.js";
import { ResultController } from "./controllers/ResultController.js";
import { EquationService } from "./services/EquationService.js";

/**
 * Kernel aplikacji kalkulatora.
 */
export class Kernel {
    /**
     * Serwis równania.
     * 
     * @type EquationService
     */
    equationService;

        /**
     * Kontroler wyniku.
     * 
     * @type ResultController
     */
    resultController;

    /**
     * Kontroler klawiatury.
     * 
     * @type KeyboardController
     */
    keyboardController;

    constructor(){ 
        this.equationService = new EquationService();
        this.resultController = new ResultController(this.equationService);
        this.keyboardController = new KeyboardController(this.equationService, this.resultController);
    }

    /**
     * Inicjalizacja kernela aplikacji kalkulatora.
     */
    init(){
        this.keyboardController.bindKeybordEvents();
        this.resultController.bindDisplay();
        this.resultController.bindButtonEvents();
    }
}