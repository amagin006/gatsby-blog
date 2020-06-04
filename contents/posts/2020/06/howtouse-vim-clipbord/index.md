---
title: 'VScodeのVimでクリップボードにコピー、連続入力の方法'
date: '2020-06-03'
tags: ["VSCode"]
thumbnail: ./thumbnail0603.png
---

簡単な備忘録です。
環境はMacです。

## VSCodeのVimのヤンクをクリップボードにコピー

VSCodeが便利すぎて普段から使っていますが、キーバインディングはVimのExtensionをいれて使用しています。

ただデフォルトではVimのキーでヤンク（コピー）してもシステムのクリップボードにコピーしてくれません。

変更は非常に簡単。  
- `⌘,` か　`Code > 基本設定 > 設定` で設定を開いて、
`useSystemClipboard`を検索するとVimのExtensionの設定が出てくるので有効にするだけ。

これでシステムのクリップボードにコピーしてくれます。


## VSCodeのVimで押しっぱなしの連続入力ができない問題

Vimを使う上で`j`や`k`など移動キーは押しっぱなしで移動することがよくあります。なぜかVimのExtensionでそれがきかなくて何回もキーを連打しないといけない状態でした。これは非常につかいにくい。

と思ったらDocumentationに書いてありました。
[VSCode -Vim Installation](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)

> Mac
> To enable key-repeating execute the following in your Terminal and restart VS Code:

下のコマンドをターミナルに打ち込むだけ。
```
$ defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false 
$ defaults write com.microsoft.VSCodeInsiders ApplePressAndHoldEnabled -bool false
```

それからMacのメニューバーから環境設定で`keyboad`で`リピートまでの入力認識までの時間`を短く設定するのがおすすめらしい。

これで移動も早くなりました。

いやVSCode便利ですね。