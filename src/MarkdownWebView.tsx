// tslint:disable-next-line: no-reference
/// <reference path="./@types/react-native-webview-autoheight/index.d.ts" />

import React from "react";
import WebView, { WebViewProps } from "react-native-webview-autoheight";
import makeMarkdown from "./makeMarkdown";

export interface IMarkdownWebViewProps extends WebViewProps {
  content: string;
  highlight?: boolean;
  innerRef?: React.Ref<WebView>;
}

class MarkdownWebView extends React.Component<IMarkdownWebViewProps> {
  render() {
    const { content, highlight, innerRef } = this.props;

    return (
      <WebView
        ref={innerRef}
        source={{
          html: makeMarkdown(content, highlight)
        }}
        useWebKit={true}
        {...this.props}
      />
    );
  }
}

export default React.forwardRef(
  (props: IMarkdownWebViewProps, ref: React.Ref<WebView>) => (
    <MarkdownWebView innerRef={ref} {...props} />
  )
);
