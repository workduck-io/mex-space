import styled, { css } from 'styled-components';

export const SILinkRoot = styled.span`
  display: inline-block;
  line-height: 1.2;
`;

interface SILinkProps {
  focused: boolean;
  archived?: boolean;
}

export const SILink = styled.span<SILinkProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /* color: ${({ theme, archived }) =>
    archived ? theme.colors.fade : theme.colors.secondary}; */
  cursor: pointer;
  .ILink_decoration {
    color: ${({ theme }) => theme.colors.gray[6]};
    &_left {
    }
    &_right {
      margin-left: ${({ theme }) => theme.spacing.tiny};
    }
    &_value {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${({ theme, focused }) =>
    focused
      ? css`
          color: ${theme.colors.primary};
          background-color: ${theme.colors.gray[8]};
          border-radius: ${({ theme }) => theme.borderRadius.tiny};
          .ILink_decoration {
            color: ${({ theme }) => theme.colors.gray[4]};
          }
        `
      : ''}
`;
