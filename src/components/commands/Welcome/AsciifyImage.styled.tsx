import styled, {keyframes} from "styled-components";

const loadingBlur = keyframes`
    0% { filter: 'blur(10px)' }
    25% { filter: 'blur(8px)' }
    50% { filter: 'blur(4px)' }
    75% { filter: 'blur(2px)' }
    100% { filter: '' }
`;


export const PreImg = styled.div`
  margin-top: 0.5rem;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 40%;
`;


