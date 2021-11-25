export class ResultController {
    equationDisplay;

    valueDisplay;

    /**@type EquationService */
    equationService;

    /**
    * @param {EquationService} equationService 
    */
    constructor(equationService){
        this.equationService = equationService;
    }

    bindDisplay() {
        this.equationDisplay = document.getElementById('equation-display');
        this.valueDisplay = document.getElementById('value-display');
    }

    resetEquation() {
        alert("cokolwiek");
        this.equationDisplay.innerHTML.replace='';
    }

    updateContent() {
        this.updateEquationDisplayContent();
        this.updateValueDisplayContent();
    }

    updateEquationDisplayContent() {
        this.equationDisplay.innerText = this.equationService.getEquationAsString();
    }

    updateValueDisplayContent(value){
        this.valueDisplay.innerText = this.equationService.getValueAsString(); //odpowiedzialne za wyświetlanie
    }

    bindButtonEvents() {
        document.getElementById('clear-key').addEventListener('click', (event) => {
            this.equationDisplay.innerHTML='';// TODO wywolanie metody resetujacej elementy w EquationService
        });
        }
}