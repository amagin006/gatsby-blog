---
title: 'React NativeでHeaderの戻るボタンのタイトルを消す ReactNavigationv4'
date: '2020-03-14'
tags: ['React Native', 'Expo']
thumbnail: ./thumbnail0314.png
---

React Native で Header のバックボタンの表示を消したい。もしくは任意の名前に変えたい。

- expoSDK - "expo": "~36.0.0"
- react-navigation - "^4.0.10",
- react - react: "~16.9.0",

###　今回やりたかったこと

![headerBackButton](./headerBackButton1.png)

### navigationOption の設定

このヘッダーは createStackNavigator で screen を stack して重ねていった時に表示されます。
なので stackNavigator の設定もしくはその screen で navigationOption の設定をしてやります。

```javascript:title=Navigator.js
const homeStackNavigator = createStackNavigator(
  {
    home: { screen: homeScreen },
    screen2: { screen: screen2 },
    screen3: { screen: screen3 },
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
    },
  }
);
```

`headerBackTitleVisible` を `false` にするだけ。

`defaultNavigationOptions`でまとめて全部のスクリーンに適応できます。

これで矢印の戻るだけになります。
というかドキュメントにバッチリ書いてあります。簡単。

ちなみに個別のページで設定する場合。

class Component の場合は static で navigation の設定をしてあげます。

```javascript:title=screen1.js
class Screen1 extends React.Component {
  static navigationOptions = () => ({
    title: 'Screen1',
    headerBackTitleVisible: true,
  });
  // ...以下略
}
```

functional Component の場合は Component に navigation の設定をしてあげます。

```javascript:title=screen1.js
const Screen1 = () => {
  // ...以下略
};

Screen1.navigationOptions = () => ({
  title: 'Screen1',
  headerBackTitleVisible: true,
});

export default Screen1;
```

この時に Navigation.js などで`defaultNavigationOptions`を有効にしているとそちらが優先されますので反映されません。
なので default を切って設定します。

### その他

`headerBackTitle`で文字列を変更できます。デフォルトは前のスクリーンの名前。もし文字が入りきらない場合は自動で`Back`にしてくれます。

`headerBackTitleVisible`でタイトルの表示、非表示

`headerBackTitleVisible`で文字列を変更できますが、文字が入らなくても省略しないで表示します。なので長ければ他のものに被ります。

ほかにもたくさんオプションがありすぎてドキュメントを読むのが大変で全部は読んでませんが（読め）とりあえずいろいろできるみたいです。
