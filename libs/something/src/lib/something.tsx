import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SomethingProps {}

const StyledSomething = styled.div`
  color: pink;
`;

export function Something(props: SomethingProps) {
  return (
    <StyledSomething>
      <h1>Welcome to Something!</h1>
    </StyledSomething>
  );
}

export default Something;
