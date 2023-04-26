import BasicOutput from "./BasicOutput";
import { OutputContainer, UsageDiv } from "./Output.styled";
import { termContext } from "./Terminal";
import { useContext } from "react";
import Welcome from "../commands/Welcome/Welcome";
import Help from "../commands/Help/Help";
import About from "../commands/About/About";
import Themes from "../commands/Themes/Themes";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg } = useContext(termContext);
  const specialCmds = ["projects", "socials", "themes", "echo"];

  // return 'Usage: <cmd>' if command arg is not valid
  // eg: about tt
  if (!specialCmds.includes(cmd) && arg.length > 0)
    return <UsageDiv>Usage: {cmd}</UsageDiv>;

  return (
    <OutputContainer>
      {
        {
          about: <About />,
          help: <Help />,
          welcome: <Welcome />,
          themes: <Themes />,
          pwd: <BasicOutput>/home/sabralod.github.io</BasicOutput>,
          whoami: <BasicOutput>visitor</BasicOutput>,
        }[cmd]
      }
    </OutputContainer>
  );
};

export default Output;
