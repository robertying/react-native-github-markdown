// tslint:disable-next-line: no-reference
/// <reference path="./@types/react-native-webview-autoheight/index.d.ts" />

import React from "react";
import WebView, { WebViewProps } from "react-native-webview-autoheight";
import makeMarkdown from "./makeMarkdown";

export interface IMarkdownWebViewProps extends WebViewProps {
  content: string;
  highlight?: boolean;
}

export default class MarkdownWebView extends React.Component<
  IMarkdownWebViewProps
> {
  render() {
    const { content, highlight } = this.props;

    return (
      <WebView
        source={{
          html: makeMarkdown(content, highlight)
        }}
        useWebKit={true}
        {...this.props}
      />
    );
  }
}
