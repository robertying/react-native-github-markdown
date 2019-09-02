import React from 'react';
import AutoHeightWebView from './AutoHeightWebView';
import makeMarkdown from './makeMarkdown';
import WebView, {WebViewProps} from 'react-native-webview';

export interface MarkdownWebViewProps extends WebViewProps {
  content: string;
  highlight?: boolean;
  innerRef?: React.Ref<WebView>;
}

const MarkdownWebView: React.FC<MarkdownWebViewProps> = props => {
  const {content, highlight, innerRef, ...restProps} = props;

  return (
    <AutoHeightWebView
      ref={innerRef}
      source={{
        html: makeMarkdown(content, highlight),
      }}
      {...restProps}
    />
  );
};

export default React.forwardRef<WebView, MarkdownWebViewProps>((props, ref) => (
  <MarkdownWebView innerRef={ref} {...props} />
));
