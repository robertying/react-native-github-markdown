import React, {useMemo} from 'react';
import AutoHeightWebView, {AutoHeightWebViewProps} from './AutoHeightWebView';
import makeMarkdown from './makeMarkdown';
import WebView from 'react-native-webview';

export interface MarkdownWebViewProps extends AutoHeightWebViewProps {
  content: string;
  highlight?: boolean;
  darkMode?: boolean;
}

export default React.forwardRef<WebView, MarkdownWebViewProps>((props, ref) => {
  const {content, highlight, darkMode, ...restProps} = props;

  const html = useMemo(() => makeMarkdown(content, highlight, darkMode), [
    content,
    highlight,
    darkMode,
  ]);

  return <AutoHeightWebView ref={ref} source={{html}} {...restProps} />;
});
