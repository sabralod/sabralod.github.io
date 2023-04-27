import _ from "lodash";
import theme from "../styles/themes";
await import("jimp/browser/lib/jimp.js");
import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard.js";
import big from "figlet/importable-fonts/Big.js";
import small from "figlet/importable-fonts/Small.js";
import banner from "figlet/importable-fonts/Banner.js";
import cybersmall from "figlet/importable-fonts/Cybersmall.js";
import cyberlarge from "figlet/importable-fonts/Cyberlarge.js";
import React from "react";

figlet.parseFont("Standard", standard);
figlet.parseFont("Big", big);
figlet.parseFont("Small", small);
figlet.parseFont("Cybersmall", cybersmall);
figlet.parseFont("Banner", banner);
figlet.parseFont("Cyberlarge", cyberlarge);

export const asciify = (
  src: string,
  callback: (value: React.SetStateAction<string>) => void,
): void => {
  const chars = ' .,:;i1tfLCG08@'
  const num_c = chars.length - 1;
  const { Jimp } = window as typeof window & { Jimp: any };
  const loadImage = async () => {
    const jimpImage = await Jimp.read(src);
    jimpImage.scaleToFit(100, 200);

    let ascii: string = "";
    const norm = (255 * 4 / num_c);

    let j, i, c;
    for (j = 0; j < jimpImage.bitmap.height; j++) {
      for (i = 0; i < jimpImage.bitmap.width; i++) {

        for (c = 0; c < 2; c++) {

          const color = Jimp.intToRGBA(jimpImage.getPixelColor(i, j));
          const intensity = color.r + color.g + color.b + color.a;


          const next = chars.charAt(Math.round(intensity / norm));
          ascii += next;
        }

      }
      if (j != jimpImage.bitmap.height - 1) ascii += '\n';

    }

    console.log(ascii);
    callback(ascii);
  }
}


/**
 * Return fidget styled string using textSync function
 * @param {string} inputVal - current input value
 * @param {figlet.Options} - options for fidget
 * @returns {string} fidget styled string
 */
export const getFiglet = (
  inputVal: string,
  options: figlet.Options
): string => {
  return figlet.textSync(inputVal, options);
};

/**
 * Generates html tabs
 * @param {number} num - The number of tabs
 * @returns {string} tabs - Tab string
 */
export const generateTabs = (num = 0): string => {
  let tabs = "\xA0\xA0";
  for (let i = 0; i < num; i++) {
    tabs += "\xA0";
  }
  return tabs;
};

/**
 * Check arg is valid
 * @param {string[]} arg - The arg array
 * @param {string} action - The action to compare | "go" | "set"
 * @param {string[]} options - Option array to compare | "dark" | "1"
 * @returns {boolean} boolean
 */
export const isArgInvalid = (
  arg: string[],
  action: string,
  options: string[]
) => arg[0] !== action || !_.includes(options, arg[1]) || arg.length > 2;

/**
 * Transform current cmd & arg into array
 * then return back the array
 * @param {string[]} history - The history array
 * @returns {string[]} array of cmd string
 */
export const getCurrentCmdArry = (history: string[]) =>
  _.split(history[0].trim(), " ");

/**
 * Check current render makes redirect for theme
 * @param {boolean} rerender - is submitted or not
 * @param {string[]} currentCommand - current submitted command
 * @param {string[]} themes - the command of the function
 * @returns {boolean} redirect - true | false
 */
export const checkThemeSwitch = (
  rerender: boolean,
  currentCommand: string[],
  themes: string[]
): boolean =>
  rerender && // is submitted
  currentCommand[0] === "themes" && // current command starts with 'themes'
  currentCommand[1] === "set" && // first arg is 'set'
  currentCommand.length > 1 && // current command has arg
  currentCommand.length < 4 && // if num of arg is valid (not `themes set light sth`)
  _.includes(themes, currentCommand[2]); // arg last part is one of id

/**
 * Perform advanced tab actions
 * @param {string} inputVal - current input value
 * @param {(value: React.SetStateAction<string>) => void} setInputVal - setInputVal setState
 * @param {(value: React.SetStateAction<string[]>) => void} setHints - setHints setState
 * @param {hintsCmds} hintsCmds - hints command array
 * @returns {string[] | undefined} hints command or setState action(undefined)
 */
export const argTab = (
  inputVal: string,
  setInputVal: (value: React.SetStateAction<string>) => void,
  setHints: (value: React.SetStateAction<string[]>) => void,
  hintsCmds: string[]
): string[] | undefined => {
  // 1) if input is 'themes '
  if (inputVal === "themes ") {
    setInputVal(`themes set`);
    return [];
  }

  // 2) if input is 'themes s'
  else if (
    _.startsWith("themes", _.split(inputVal, " ")[0]) &&
    _.split(inputVal, " ")[1] !== "set" &&
    _.startsWith("set", _.split(inputVal, " ")[1])
  ) {
    setInputVal(`themes set`);
    return [];
  }

  // 3) if input is 'themes set '
  else if (inputVal === "themes set ") {
    setHints(_.keys(theme));
    return [];
  }

  // 4) if input starts with 'themes set ' + theme
  else if (_.startsWith(inputVal, "themes set ")) {
    _.keys(theme).forEach(t => {
      if (_.startsWith(t, _.split(inputVal, " ")[2])) {
        hintsCmds = [...hintsCmds, t];
      }
    });
    return hintsCmds;
  }

  // // 5) if input is 'projects' or 'socials'
  // else if (inputVal === "projects " || inputVal === "socials ") {
  //   setInputVal(`${inputVal}go`);
  //   return [];
  // }

  // // 6) if input is 'projects g' or 'socials g'
  // else if (inputVal === "projects g" || inputVal === "socials g") {
  //   setInputVal(`${inputVal}o`);
  //   return [];
  // }

  // // 7) if input is 'socials go '
  // else if (_.startsWith(inputVal, "socials go ")) {
  //   ["1.Github", "2.Dev.to", "3.Facebook", "4.Instagram"].forEach(t => {
  //     hintsCmds = [...hintsCmds, t];
  //   });
  //   return hintsCmds;
  // }

  // // 8) if input is 'projects go '
  // else if (_.startsWith(inputVal, "projects go ")) {
  //   [
  //     "1.Sat Naing's Blog",
  //     "2.Haru Fashion",
  //     "3.Haru API",
  //     "4.AstroPaper Blog Theme",
  //   ].forEach(t => {
  //     hintsCmds = [...hintsCmds, t];
  //   });
  //   return hintsCmds;
  // }
};
