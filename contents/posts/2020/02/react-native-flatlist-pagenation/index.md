---
title: 'React NativeのFlatlistでinstgramみたいなpagenaitionをつくる'
date: '2020-02-17'
tags: ["React Native", "Expo"]
thumbnail: ./thumbnail01.png
---

今回は意外にも簡単にReact Nativeでinstagramみたいなページネーションを実装できたので残しておきます。

### 今回やりたかったこと

こちらが完成品

![pagenationのgif](./pagenation1.gif)

今回は以前iOSのNativeで作った個人開発のアプリをReact Nativeで書き直しています。
そこでインスタグラムのようなUIで複数枚の写真を表示するのにページネーションをつけてみました。

- expoSDK - "expo": "~36.0.0"
- react-navigation - "^4.0.10",

ちなみにこういうのもあるのですが、  
[react-native-pagination](https://github.com/garrettmac/react-native-pagination#readme)  
[react-native-dots-pagination](react-native-dots-pagination)  
今回はシンプルなものでよかったので普通に実装します。

### Screenを作る

まずはScreenを作成していきましょう。ちなみにHooksで書いてます。

```javascript:title=ReportScreen.js
import React from 'react';
import { View, Text, ScrollView, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const ReportDetail = ({ navigation }) => {
  // 親Componentからnavigationのparamsでデータを渡してます
  const { user, item } = navigation.state.params

  const _renderPhoto = item => <Image source={{ uri: `${item.item.url}` }} style={styles.photo} />;
  const _keyExtractor = item => `${item.id}`;


  return (
    <ScrollView>
      <View style={styles.userWrapper}>
        <Image source={{ uri: `${user.userIcon}` }} style={styles.userIcon} />
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.date}>{`${date} ${startTime} ~ ${endTime}`}</Text>
        </View>
      </View>
      <FlatList
        data={item.item.photo}
        horizontal
        renderItem={_renderPhoto}
        keyExtractor={_keyExtractor}
      />
    </ScrollView>
  );
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userWrapper: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginVertical: 8,
  },
  nameWrapper: {
    marginLeft: 20,
  },
  name: {
    paddingVertical: 6,
    fontWeight: 'bold',
  },
  date: {
    color: '#9c9c9c',
  },
  photo: {
    width: width,
    height: width,
  },
  pagenationDotStyle: {
    marginVertical: 20,
  },
});
```

想定として親コンポーネントからnavigationで移動してきたときにparamsでデータを渡しています。

```:title:FAKEDATA
photo: [
        { id: '1', url: 'https://~' },
        { id: '2', url: 'https://~' },
        { id: '3', url: 'https://~' },
        { id: '4', url: 'https://~' },
      ]
```

みたいな感じです。

`Dementions.get('screen').width`で画面の横幅のサイズをとって正方形に写真のサイズを設定します。  
`horizontal`をtrueにすると水平でリストが並んでくれます。  

とりあえずはこれで横のスクロールで写真を並べられましたが、スクロールしてもピタッと止まってくれません。  
`pagingEnabled`をtrueにするとちゃんと1枚ずつ止まってくれます。  

次に下にスクロールバーが表示されてしまっているのでこちらを消します。
`showsHorizontalScrollIndicator={false}`  

これでだいぶそれっぽくなってきました。
  
```javascript:title=ReportScreen.js
// ~ 略 ~
    <FlatList
      data={item.item.photo}
      horizontal={true}
      renderItem={_renderPhoto}
      keyExtractor={_keyExtractor}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
// ~ 略 ~
```

### pagenationを作る

ページネーションを表示するには現在何枚目の画像を表示しているかのindexが必要です。

```javascript:title=ReportScreen.js
+  import React, { useState } from 'react';
// ~ 略 ~
+  const [viewableItemIndex, setViewableItemIndex] = useState(0);

   const _renderPhoto = item => <Image source={{ uri: `${item.item.url}` }} style={styles.photo} />;
   const _keyExtractor = item => `${item.id}`;

+  const onViewRef = React.useRef(({ viewableItems }) => {
+    setViewableItemIndex(viewableItems[0].index);
+  });
+  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

   return (
// ~ 略 ~
    <FlatList
      data={item.item.photo}
      horizontal={true}
      renderItem={_renderPhoto}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={_keyExtractor}
+     onViewableItemsChanged={onViewRef.current}
+     viewabilityConfig={viewConfigRef.current}
    />
// ~ 略 ~
```  

Flatlistが持っている`onViewableItemsChanged`が現在表示されているリストをreturnしてくれます。  

viewableItemsに表示されているオブジェクトがArrayの中に入っています。今回は常に1枚だけの表示なのでその最初indexをRefで参照しておきます。  
あと`viewabilityConfig`を設定しないとエラーがでてうまくいきませんでした。  
`Error: Changing viewabilityConfig on the fly is not supported`のエラーがでてました。

なのでviewabilityConfigもRefで設定します。  
`viewAreaCoveragePercentThreshold`はどのくらい画像が見えたら見えていると認識するかを0-100で設定します。多分。  

これでuseStateを使って現在の表示している画像のインデックスを保持します。  

### pagenationを設置する

```javascript:title=ReportScreen.js
// ~ 略 ~
function dotColor(index) {
  return index === foucsItemIndex ? styles.colorDot : styles.whiteDot;
}
// ~ 略 ~
return(
 // ~ 略 ~
    <FlatList
      data={item.item.photo}
      horizontal={true}
      renderItem={_renderPhoto}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={_keyExtractor}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
+   <View style={styles.dotWrapper}>
+     {item.item.photo.map((photo, index) => {
+       return <View key={index} style={[styles.dot, dotColor(index)]} />;
+     })}
+   </View>
// ~ 略 ~
const styles = StyleSheet.create({
// ~ 略 ~
+ dot: {
+   width: 8,
+   height: 8,
+   borderRadius: 5,
+    marginHorizontal: 3,
+  },
+  colorDot: {
+    backgroundColor: '#6BA3EF',
+  },
+  whiteDot: {
+    backgroundColor: '#E2E2E2',
+  },
})
```

やり方はいろいろあると思うのですが、表示してある画像とdotのインデックスが同じならbackgroundColorを変えるfanctionを作りました。styleで現在の画像であればdotの色を変更しています。

これで無事ページネーションが表示してるはず。
もっと効率的な方法があるとは思いますし、あとはアニメーションとかをつけたいと思ってますが今日はとりあえずここまで。

### できあがり

```javascript:title=ReportScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

import PagenationDot from '../../components/pagenation/pagenationDot';

const ReportDetail = ({ navigation }) => {
  const { user, item } = navigation.state.params;
  const [viewableItemIndex, setViewableItemIndex] = useState(0);
  const _renderPhoto = item => <Image source={{ uri: `${item.item.url}` }} style={styles.photo} />;
  const _keyExtractor = item => `${item.id}`;

  const onViewRef = React.useRef(({ viewableItems }) => {
    setViewableItemIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <ScrollView>
      <View style={styles.userWrapper}>
        <Image source={{ uri: `${user.userIcon}` }} style={styles.userIcon} />
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.date}>{`${date} ${startTime} ~ ${endTime}`}</Text>
        </View>
      </View>
      <FlatList
        data={item.item.photo}
        horizontal={true}
        renderItem={_renderPhoto}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={_keyExtractor}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.pagenationDotStyle}>
        <View style={styles.dotWrapper}>
          {item.item.photo.map((photo, index) => {
            return <View key={index} style={[styles.dot, dotColor(index)]} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userWrapper: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginVertical: 8,
  },
  nameWrapper: {
    marginLeft: 20,
  },
  name: {
    paddingVertical: 6,
    fontWeight: 'bold',
  },
  date: {
    color: '#9c9c9c',
  },
  photo: {
    width: width,
    height: width,
  },
  pagenationDotStyle: {
    marginVertical: 20,
  },
  dotWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  colorDot: {
    backgroundColor: '#6BA3EF',
  },
  whiteDot: {
    backgroundColor: '#E2E2E2',
  },
});

export default ReportDetail;
```