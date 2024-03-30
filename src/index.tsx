import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewSharedProps } from 'react-native-webview/src/WebViewTypes';

import katexStyle from './katex-style';
import katexScript from './katex-script';

export interface KatexOptions {
  displayMode?: boolean;
  output?: 'html' | 'mathml' | 'htmlAndMathml';
  leqno?: boolean;
  fleqn?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: any;
  minRuleThickness?: number;
  colorIsTextColor?: boolean;
  maxSize?: number;
  maxExpand?: number;
  strict?: boolean | string;
  trust?: boolean;
  globalGroup?: boolean;
}

export interface ContentOptions extends KatexOptions {
  inlineStyle?: string;
  expression?: string;
  viewport?: string;
}

function getContent({ inlineStyle, expression, viewport, ...options }: ContentOptions) {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="${JSON.stringify(viewport)}"/>
<style>
${katexStyle}
${inlineStyle}
</style>
<script>
window.onerror = e => document.write(e);
window.onload = () => katex.render(${JSON.stringify(expression)}, document.body, ${JSON.stringify(options)});
${katexScript}
</script>
</head>
<body>
</body>
</html>
`;
}

const defaultStyle = StyleSheet.create({
  root: {
    height: 40,
  },
});

const defaultInlineStyle = `
html, body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  margin: 0;
  display: flex;
}
`;

export interface KatexProps extends ContentOptions, Omit<WebViewSharedProps, 'source'> {}

export default function Katex({
  inlineStyle,
  expression,
  viewport,
  displayMode,
  output,
  leqno,
  fleqn,
  throwOnError,
  errorColor,
  macros,
  minRuleThickness,
  colorIsTextColor,
  maxSize,
  maxExpand,
  strict,
  trust,
  globalGroup,
  ...webViewProps
}: KatexProps) {
  return (
    <WebView
      {...webViewProps}
      source={{
        html: getContent({
          inlineStyle,
          expression,
          viewport,
          displayMode,
          output,
          leqno,
          fleqn,
          throwOnError,
          errorColor,
          macros,
          minRuleThickness,
          colorIsTextColor,
          maxSize,
          maxExpand,
          strict,
          trust,
          globalGroup,
        }),
      }}
    />
  );
}

Katex.defaultProps = {
  expression: '',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  displayMode: false,
  throwOnError: false,
  errorColor: '#f00',
  inlineStyle: defaultInlineStyle,
  style: defaultStyle,
  macros: {},
  colorIsTextColor: false,
};
