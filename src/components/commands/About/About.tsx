import { getFiglet } from "../../../utils/functions";
import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
  PreName,
  PreWrapper,
  PreNameMobile,
} from "./About.styled";

const About: React.FC = () => {
  return (
    <AboutWrapper>
      <PreName>
        {getFiglet("About", {
          font: "Cyberlarge",
        })}
      </PreName>
      <PreWrapper>
        <PreNameMobile>
          {getFiglet("About", {
            font: "Cybersmall",
            width: 9,
          })}
        </PreNameMobile>
      </PreWrapper>
      <p>
        Hi, my name is <HighlightSpan>Simon Geyer</HighlightSpan>!
      </p>
      <p>
        I'm <HighlightAlt>a full-stack developer</HighlightAlt> based in
        Ratisbona, Germany
      </p>
      <p>
        I am passionate about writing codes and <br />
        developing web applications to solve real-life challenges.
      </p>
    </AboutWrapper>
  );
};

export default About;
