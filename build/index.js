"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
const katex_style_1 = __importDefault(require("./katex-style"));
const katex_script_1 = __importDefault(require("./katex-script"));
function getContent({ inlineStyle, expression, viewport, renderMessageDelay, ...options }) {
    return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="${JSON.stringify(viewport)}"/>
<style>
${katex_style_1.default}
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
    postRenderMessage();
    setTimeout(postRenderMessage, ${JSON.stringify(renderMessageDelay)});
};
${katex_script_1.default}
</script>
</head>
<body>
</body>
</html>
`;
}
const defaultStyle = react_native_1.StyleSheet.create({
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
function Katex({ inlineStyle = defaultInlineStyle, expression = '', viewport = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0', renderMessageDelay = 50, displayMode = false, output, leqno, fleqn, throwOnError = false, errorColor = '#f00', macros = {}, minRuleThickness, colorIsTextColor = false, maxSize, maxExpand, strict, trust, globalGroup, ...webViewProps }) {
    return (react_1.default.createElement(react_native_webview_1.WebView, { ...webViewProps, source: {
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
        } }));
}
exports.default = Katex;
//# sourceMappingURL=index.js.map