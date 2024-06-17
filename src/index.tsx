import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewSharedProps, IOSWebViewProps, AndroidWebViewProps } from 'react-native-webview/src/WebViewTypes';

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
  renderMessageDelay?: number;
  suppressRenderMessages?: boolean;
  testHtml?: string;
}

function getContent({ inlineStyle, expression, viewport, renderMessageDelay, suppressRenderMessages, testHtml, ...options }: ContentOptions) {

  if (testHtml!==undefined) {
    return testHtml;
  }

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

// To help in testing rendering on an element other than body
const targetElement = () => {
    return document.body;
};

// Send a messge with onMessge to the React Native WebView with the rendered element's dimensions
const postRenderMessage = () => {
    const windowBounds = document.documentElement.getBoundingClientRect();
    const bodyBounds = document.body.getBoundingClientRect();
    const bounds = targetElement().firstChild.getBoundingClientRect();
    window.ReactNativeWebView.postMessage(JSON.stringify({'katexRendered':{windowBounds:windowBounds,bodyBounds:bodyBounds,bounds:bounds}}));
};

// Send the message after element rendering is iniated (although it may not be fully completed
// So we may need to wait for a bit before sending the message after rendering is triggered)
window.onload = () => {
    katex.render(${JSON.stringify(expression)}, targetElement(), ${JSON.stringify(options)});
    if (!${suppressRenderMessages}) {
      postRenderMessage();
      setTimeout(postRenderMessage, ${JSON.stringify(renderMessageDelay)});
    }
};
${katexScript}
</script>
</head>
<body>
</body>
</html>
`;
}

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

export interface KatexProps extends ContentOptions, Omit<WebViewSharedProps & IOSWebViewProps & AndroidWebViewProps, 'source'> { }

export default function Katex({
  inlineStyle = defaultInlineStyle,
  expression = '',
  viewport = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  renderMessageDelay = 50,
  suppressRenderMessages = false,
  testHtml,
  displayMode = false,
  output,
  leqno,
  fleqn,
  throwOnError = false,
  errorColor = '#f00',
  macros = {},
  minRuleThickness,
  colorIsTextColor = false,
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
          renderMessageDelay,
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
