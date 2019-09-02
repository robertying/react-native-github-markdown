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
  innerRef?: React.Ref<WebView>;
}

const AutoHeightWebView: React.FC<AutoHeightWebViewProps> = props => {
  const {defaultHeight, innerRef, ...restProps} = props;

  const [height, setHeight] = useState(defaultHeight || 500);

  const onMessage = (e: WebViewMessageEvent) => {
    setHeight(parseInt(e.nativeEvent.data, 10));
  };

  return (
    <WebView
      ref={innerRef}
      injectedJavaScript={injectedScript}
      onMessage={onMessage}
      javaScriptEnabled={true}
      {...restProps}
      style={[{height}, props.style]}
    />
  );
};

export default React.forwardRef<WebView, AutoHeightWebViewProps>(
  (props, ref) => <AutoHeightWebView innerRef={ref} {...props} />,
);
