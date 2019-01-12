declare module "react-native-webview-autoheight" {
  import React from "react";
  import {
    WebView as RNWebView,
    WebViewProps as RNWebViewProps
  } from "react-native";

  export interface WebViewProps extends RNWebViewProps {
    autoHeight?: boolean;
    width?: number;
    defaultHeight?: number;
  }

  export default class WebView extends React.Component<WebViewProps> {}
}
