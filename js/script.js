import { Kernel } from './Kernel.js';

/**
 * Kernel aplikacji kalkulatora.
 * 
 * @type Kernel
 */
const kernel = new Kernel();

window.onload = function () {
    kernel.init();
}

