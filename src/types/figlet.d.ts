// src/types/figlet.d.ts

// Extended type definitions for figlet 1.2
// Project: https://github.com/patorjk/figlet.js
// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as figlet from "figlet";

declare global {
  export namespace figlet {
    /*
     * Parses data from a FIGlet font file and places it into the figFonts object.
     */
    function parseFont(fontName: string, data: string): FontOptions;

    declare module "figlet/importable-fonts/*" {
      const value: string;
      export default value;
    }
  }
}

// Important to have this line (even if empty...)
declare module "figlet" {}
