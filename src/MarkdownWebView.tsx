import React from "react";
import WebView, { WebViewProps } from "react-native-webview-autoheight";
import makeMarkdown from "./makeMarkdown";

export default class MarkdownWebView extends React.Component<
  WebViewProps & { content: string; highlight: boolean }
> {
  render() {
    return (
      <WebView
        useWebKit={true}
        source={{
          html: makeMarkdown(this.props.content, this.props.highlight)
        }}
        {...this.props}
      />
    );
  }
}
