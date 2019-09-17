/* eslint-disable react-native/no-inline-styles */

import React, {useRef} from 'react';
import {SafeAreaView, View, Text, ScrollView, Linking} from 'react-native';
import MarkdownWebView from '../src';

const testMD = `
# Primer CSS

## Migrating

**If you currently use the \`primer\` or \`primer-\`-prefixed npm packages, please read [the migration guide](MIGRATING.md)!**

## Install

This repository is distributed with [npm]. After [installing npm][install-npm], you can install \`@primer/css\` with this command:

\`\`\`sh
$ npm install --save @primer/css
\`\`\`

## Usage

The included source files are written in [Sass] using SCSS syntax. After [installing](#install) with npm, you can add your project's \`node_modules\` directory to your Sass [include paths](https://github.com/sass/node-sass#includepaths) (AKA [load paths](http://technology.customink.com/blog/2014/10/09/understanding-and-using-sass-load-paths/) in Ruby), then import it like this:

\`\`\`scss
@import '@primer/css/index.scss';
\`\`\`

You can import individual Primer modules directly from the \`@primer/css\` package:

\`\`\`scss
@import '@primer/css/core/index.scss';
@import '@primer/css/product/index.scss';
@import '@primer/css/marketing/index.scss';
\`\`\`

## Development

See [DEVELOP.md](./DEVELOP.md) for development docs.

## Releasing (for GitHub staff)

You can find docs about our release process in [RELEASING.md](./RELEASING.md).

## Documentation

The [Primer CSS docs site](https://primer.style/css) is deployed from this repo with [primer/deploy](https://github.com/primer/deploy). See [the development docs](DEVELOP.md#docs-site) for more info.

## License

[MIT](./LICENSE) &copy; [GitHub](https://github.com/)

[install-npm]: https://docs.npmjs.com/getting-started/installing-node
[npm]: https://www.npmjs.com/
[primer]: https://primer.style
[sass]: http://sass-lang.com/
`;

const App = () => {
  const webViewRef = useRef(null);

  const onNavigationStateChange = e => {
    if (e.navigationType === 'click') {
      if (webViewRef.current) {
        webViewRef.current.stopLoading();
      }
      Linking.openURL(e.url);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{height: 100}}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: '600',
              fontSize: 20,
              margin: 30,
            }}>
            React Native GitHub Markdown Test
          </Text>
        </View>
        <MarkdownWebView
          ref={webViewRef}
          content={testMD}
          highlight
          onNavigationStateChange={onNavigationStateChange}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
