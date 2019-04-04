import styled from 'styled-components';

export function fullHeight(el: HTMLElement) {
  const windowH = window.innerHeight;
  const top = el.getBoundingClientRect().top;
  const totalHeight = windowH - top;
  el.style.height = totalHeight + 'px';
}

export function camelCaseToDashed(str: string) {
  return str.replace(/[A-Z]/g, match => {
    return '-' + match.toLowerCase();
  });
}

export function withAdditionalStyles(component: any) {
  let StyledWithAdditionalStyles = styled(component)`
    ${props => {
      if (props.additionalStyles) {
        return Object.keys(props.additionalStyles).map(
          // @ts-ignore
          prop => camelCaseToDashed(prop) + ':' + props.additionalStyles[prop] + ';'
        );
      }

      return '';
    }}
  `;

  return StyledWithAdditionalStyles;
}
