import React from 'react';
import AutoHeightWebView, {AutoHeightWebViewProps} from './AutoHeightWebView';
import makeMarkdown from './makeMarkdown';
import WebView from 'react-native-webview';

export interface MarkdownWebViewProps extends AutoHeightWebViewProps {
  content: string;
  highlight?: boolean;
}

export default React.forwardRef<WebView, MarkdownWebViewProps>((props, ref) => {
  const {content, highlight, ...restProps} = props;

  return (
    <AutoHeightWebView
      ref={ref}
      source={{
        html: makeMarkdown(content, highlight),
      }}
      {...restProps}
    />
  );
});
