import React, {
  useRef,
  useState,
} from "react";
import {
  WelcomeContainer,
  PreName,
  PreWrapper,
  PreNameMobile,
  Seperator,
  Cmd,
  PreImg,
} from "./Welcome.styled";
import { getFiglet } from "../../../utils/functions";
import selfPic1 from "../../../assets/self_pic_1.png";

const Welcome: React.FC = () => {
  return (
    <WelcomeContainer>
      <div className="info-section">
        <PreName>
          {getFiglet("sabralod.github.io", {
            font: "Big",
            verticalLayout: "default",
            horizontalLayout: "default",
            whitespaceBreak: true,
            width: 100,
          })}
        </PreName>
        <PreWrapper>
          <PreNameMobile>
            {getFiglet("sabralod.github.io", {
              font: "Small",
              verticalLayout: "controlled smushing",
              horizontalLayout: "controlled smushing",
              whitespaceBreak: true,
              width: 32,
            })}
          </PreNameMobile>
        </PreWrapper>
        <div>Welcome to sabralod.github.io in version 0.0.1</div>
        <Seperator>----</Seperator>
        <div>
          For a list of available commands, type `<Cmd>help</Cmd>`.
        </div>
      </div>
      <div className="illu-section">
        <PreImg>
          <img src={selfPic1} width={500} />
        </PreImg>
      </div>
    </WelcomeContainer>
  );
};

export default Welcome;
