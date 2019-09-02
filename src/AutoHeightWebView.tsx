import React, {useState} from 'react';
import WebView, {WebViewProps} from 'react-native-webview';
import {WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';

const injectedScript = `
  function waitForBridge() {
    if (!window.ReactNativeWebView.postMessage) {
      setTimeout(waitForBridge, 200);
    } else {
      window.ReactNativeWebView.postMessage(
        Math.max(
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.body.clientHeight,
          document.body.scrollHeight
        )
      );
    }
  }
  waitForBridge();
  true;
`;

export interface AutoHeightWebViewProps extends WebViewProps {
  defaultHeight?: number;
}

export default React.forwardRef<WebView, AutoHeightWebViewProps>(
  (props, ref) => {
    const {defaultHeight, ...restProps} = props;

    const [height, setHeight] = useState(defaultHeight || 500);

    const onMessage = (e: WebViewMessageEvent) => {
      setHeight(parseInt(e.nativeEvent.data, 10));
    };

    return (
      <WebView
        ref={ref}
        injectedJavaScript={injectedScript}
        onMessage={onMessage}
        javaScriptEnabled={true}
        {...restProps}
        style={[{height}, props.style]}
      />
    );
  },
);
