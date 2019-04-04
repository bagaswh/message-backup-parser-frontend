import styled from 'styled-components';
import { withAdditionalStyles } from '../../helpers/ui-helpers';

type StyledFlexboxProp = {
  justifyContent?: string;
  alignContent?: string;
  additionalStyles?: { [index: string]: string };
};

const Flexbox = withAdditionalStyles(styled.div<StyledFlexboxProp>`
  display: flex;
  justify-content: ${props => props.justifyContent || ''};
  align-items: ${props => props.alignContent || ''};

  & > .col-1 {
    width: calc(1 / 12 * 100%);
  }
  & > .col-2 {
    width: calc(2 / 12 * 100%);
  }
  & > .col-3 {
    width: calc(3 / 12 * 100%);
  }
  & > .col-4 {
    width: calc(4 / 12 * 100%);
  }
  & > .col-5 {
    width: calc(5 / 12 * 100%);
  }
  & > .col-6 {
    width: calc(6 / 12 * 100%);
  }
  & > .col-9 {
    width: calc(9 / 12 * 100%);
  }
`);

export default Flexbox;
