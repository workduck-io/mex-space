import styled from 'styled-components';

/* eslint-disable-next-line */
export interface MexComponentsProps {
  className?: string;
}

const StyledMexComponents = styled.div`
  color: pink;
`;

export function MexComponents({ className }: MexComponentsProps) {
  return (
    <StyledMexComponents className={className ?? 'shit'}>
      <h1>Welcome to MexComponents!</h1>
    </StyledMexComponents>
  );
}

export default MexComponents;
