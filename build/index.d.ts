import React from 'react';
import { WebViewSharedProps, IOSWebViewProps, AndroidWebViewProps } from 'react-native-webview/src/WebViewTypes';
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
export interface KatexProps extends ContentOptions, Omit<WebViewSharedProps & IOSWebViewProps & AndroidWebViewProps, 'source'> {
}
export default function Katex({ inlineStyle, expression, viewport, renderMessageDelay, suppressRenderMessages, testHtml, displayMode, output, leqno, fleqn, throwOnError, errorColor, macros, minRuleThickness, colorIsTextColor, maxSize, maxExpand, strict, trust, globalGroup, ...webViewProps }: KatexProps): React.JSX.Element;
