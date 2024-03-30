import React from 'react';
import { WebViewSharedProps } from 'react-native-webview/src/WebViewTypes';
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
export interface KatexProps extends ContentOptions, Omit<WebViewSharedProps, 'source'> {
}
declare function Katex({ inlineStyle, expression, viewport, displayMode, output, leqno, fleqn, throwOnError, errorColor, macros, minRuleThickness, colorIsTextColor, maxSize, maxExpand, strict, trust, globalGroup, ...webViewProps }: KatexProps): React.JSX.Element;
declare namespace Katex {
    var defaultProps: {
        expression: string;
        viewport: string;
        displayMode: boolean;
        throwOnError: boolean;
        errorColor: string;
        inlineStyle: string;
        style: {
            root: {
                height: number;
            };
        };
        macros: {};
        colorIsTextColor: boolean;
    };
}
export default Katex;
