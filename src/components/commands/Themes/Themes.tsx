import { useContext, useEffect } from "react";
import _ from "lodash";
import { themeContext } from "../../../App";
import { Wrapper } from "../../Terminal/Output.styled";
import { ThemeSpan, ThemesWrapper } from "./Themes.styled";
import {
  checkThemeSwitch,
  getCurrentCmdArry,
  isArgInvalid,
} from "../../../utils/functions";
import { termContext } from "../../Terminal/Terminal";
import theme from "../../../styles/themes";
import Usage from "../../Terminal/Usage";

const myThemes = _.keys(theme);

const Themes: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);

  const themeSwitcher = useContext(themeContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  /* ===== check current command makes redirect ===== */
  useEffect(() => {
    if (checkThemeSwitch(rerender, currentCommand, myThemes)) {
      themeSwitcher?.(theme[currentCommand[2]]);
    }
  }, [arg, rerender, currentCommand]);

  /* ===== check arg is valid ===== */
  const checkArg = () =>
    isArgInvalid(arg, "set", myThemes) ? <Usage cmd="themes" /> : null;

  return arg.length > 0 || arg.length > 2 ? (
    checkArg()
  ) : (
    <Wrapper>
      <ThemesWrapper>
        {myThemes.map(myTheme => (
          <ThemeSpan key={myTheme}>{myTheme}</ThemeSpan>
        ))}
      </ThemesWrapper>
      <Usage cmd="themes" marginY />
    </Wrapper>
  );
};

export default Themes;
