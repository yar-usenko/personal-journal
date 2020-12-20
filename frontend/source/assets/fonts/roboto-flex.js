import { createGlobalStyle } from 'styled-components';
import RobotoFlexFont from './roboto-flex.woff2';

// https://web.dev/variable-fonts/
// https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/

const RobotoFlex = createGlobalStyle`
  @font-face {
    font-family: 'Roboto Flex';
    src: url(${RobotoFlexFont}) format('woff2 supports variations'),
         url(${RobotoFlexFont}) format('woff2-variations');
    font-weight: 100 1000;
    font-stretch: 25% 151%;
  }

  html {
    font-family: 'Roboto Flex';
  }
`;

export default RobotoFlex;
