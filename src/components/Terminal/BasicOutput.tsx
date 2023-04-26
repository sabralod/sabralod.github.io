import { Wrapper } from "./Output.styled";

type Props = {
  children: string;
};

const BasicOutput: React.FC<Props> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);
export default BasicOutput;
