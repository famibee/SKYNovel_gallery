# Change Log

## v2.10.1
- fix: ライブラリ更新・SKYNovel 1.7.18
## v2.10.0
- fix: ライブラリ更新・SKYNovel を ESM版に変更
- fix: ライブラリ更新・SKYNovel 1.7.16
## v2.9.4
- fix: ライブラリ更新・SKYNovel 1.64.19
## v2.9.3
- fix: ライブラリ更新・SKYNovel 1.64.17
## v2.9.2
- fix: ライブラリ更新
	- SKYNovel 1.64.7
## v2.9.1
-fix: vite.config.ts 手直し、Github 公開に向けたフォルダ構成修正
## v2.9.0
-fix: vite.config.ts 手直し、更新リロードの修正
-fix: src/CustomHmr.ts 追加、.sn など更新リロード用
-fix: [wait_tsy] から【 chk_exist_tw=true】削除
- fix: ライブラリ更新
	- SKYNovel 1.63.0
## v2.8.2
- fix: ライブラリ更新
	- SKYNovel 1.62.2
## v2.8.1
- fix: ライブラリ更新
	- SKYNovel 1.62.1
## v2.8.0
- feat(ページ移動 サンプル): [page to] で oldest, newest, load ボタンやショートカット追加
- fix: ライブラリ更新
	- SKYNovel 1.62.0
- fix(画面を揺らす サンプル): 手直し
- fix(トゥイーンアニメを行なう サンプル): 手直し
- fix(効果音とBGM サンプル): 手直し
- fix(天球表示 サンプル): 表示されない不具合修正（ThreeDLayer.ts）
- test: これ以外も含め一通り動作確認
## v2.7.2
- chore: vite 開発コマンド整理
- fix: ライブラリ更新
	- @famibee/skynovel v1.61.20
	- vite v7.0.0
## v2.7.1
- fix: Github Pages で動作するよう修正
	- pixijs の ModernContext2D 定義を【letterSpacing: string】に手修正
		- 直してくれないので
		- https://github.com/pixijs/pixijs/issues/11044
## v2.7.0
- chore: webpack から vite へ移行
- fix: ライブラリ更新
	- SKYNovel 1.61.17
	- font-awesome 5.15.3 -> 6.7.2
	- bootstrap 4.5.0 -> 5.3.3
	- jquery 3.5.1 -> 削除
	- Effekseer for WebGL v1.61c -> v1.70e
	- ace 1.4.12 -> 1.37.1
- fix(【えもふりレイヤ】サンプル): エラーを修正
- 既知の問題
	- (【３Ｄレイヤ・天球】サンプル): ThreeDLayer で天球が表示されない
## v2.6.6
- fix: ライブラリ更新(SKYNovel v1.61.9)など
- fix: Layer クラス変更対応
## v2.6.5
- fix: ライブラリ更新(SKYNovel v1.61.2)など
- fix(core/webpack.config.js): 【Module not found: Error: Can't resolve 'url'〜】対策
	- angular14 - Module not found: Error: Can't resolve 'url' in webpack 5/Angular 14 - Stack Overflow https://stackoverflow.com/questions/72720744/module-not-found-error-cant-resolve-url-in-webpack-5-angular-14
## v2.6.4
- fix: ライブラリ更新(SKYNovel v1.60.2)など
## v2.6.3
- feat(ページ移動 サンプル): [page to=exit、load] ショートカット追加
- fix: ライブラリ更新(SKYNovel v1.58.0)など
## v2.6.2
- fix: ライブラリ更新(SKYNovel v1.57.0)など
## v2.6.1
- feat(【禁則処理】サンプル): ぶら下げ禁則のON/OFF切り替え追加
	- http://localhost:8082/index.html?cur=line_breaking_rules
- fix: ライブラリ更新(SKYNovel v1.54.1)など
## v2.5.4 -> v2.6.0
- add(【複数イベント待ち】サンプル): イベントテスト用サンプル追加
	- http://localhost:8082/index.html?cur=mul_ev
## v2.5.3
- fix: [set_cancel_skip]が廃止に付き削除
- fix(【画面を揺らす】サンプル): 既読スキップテストができるように
- fix(【３Ｄレイヤ・天球】サンプル): エラーを修正
- fix: ライブラリ更新(SKYNovel v1.53.10)
## v2.5.2
- fix: ギャラリー用の試作機能として、CSS の text-shadow 設定するためだけの filter 属性があったので修正対応（v1.50.1 までの仕様）
	- 旧 filter 属性記述を style='text-shadow: 〜'に修正
	- 対象は【トップ画面】、【スライドなプロジェクト】サンプル
- fix: ライブラリ更新(SKYNovel v1.53.9)
## v2.5.1
- fix: グレースケールの綴りミス修正（greyscale -> grayscale）
## v2.5.0
- feat(【フィルター】サンプル): 追加、[fg2]に最後に変化した立ち絵を目立たせる機能も
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=filter
- fix(【簡単立ち絵マクロ】サンプル): 更新、微修正
- fix(ext_fg.sn、ext_fg2.sn): 拡張機能更新
- fix: ライブラリ更新(SKYNovel v1.52.0)
## v2.4.11
- fix: 拡張機能更新、ただし引数説明記述のみ(ext_fg, ext_fg2)
## v2.4.10
- fix: ライブラリ更新(SKYNovel v1.49.2)
- refactor(core/plugin/3d_layer/ThreeDLayer.ts): 警告を消去
## v2.4.9
- fix: ライブラリ更新(SKYNovel v1.49.1)など
- fix(tsconfig.json): suppressImplicitAnyIndexErrors・newLine 削除（TypeScript 5.5 以降は完全に削除されるので）
## v2.4.8
- fix: ライブラリ更新(SKYNovel v1.48.15)など
- docs: コードブロックライセンス年更新
## v2.4.7
- fix: ライブラリ更新(SKYNovel v1.48.11)
## v2.4.6
- fix: ライブラリ更新(SKYNovel v1.48.10)
## v2.4.5
- fix: ライブラリ更新(SKYNovel v1.48.7)
## v2.4.4
- fix: ext_fg.sn、ext_fg2.sn を微更新
- fix: ライブラリ更新(SKYNovel v1.48.6)
## v2.4.3
- fix: 【if文タグ】コール・IFスタックのテスト追加と表示(SKYNovel v1.47.3)
## v2.4.2
- fix: 【ページ移動】修正、本文途中でページ移動時文字色設定変更を追加
- fix: ライブラリ更新(SKYNovel v1.47.0)
## v2.4.1
- fix: ライブラリ更新(SKYNovel v1.46.1)、プラグイン：３Ｄレイヤ・えもふりレイヤなど手直し
## v2.4.0
- fix: ライブラリ更新(SKYNovel v1.46.0)、全般的な動作確認
- fix: 【文字ボタン・リンク】ヒント表示設定を修正
- fix: 【トゥイーンアニメを行なう】不要になった [wait_tsy global=true] 指定を削除
- fix: 【レイヤ操作】で前髪素材のファイル名がミスで表示されなかった件
- fix: 【履歴と機能追加】正しく動作しなかったりエラーが出ていたのを修正
- fix: 【ページ移動】ボタン押下でエラーが出ていたのを修正
## v2.3.12
- fix: ext_fg.sn 更新
## v2.3.11
- fix: 【文字ボタン・リンク】サンプル：非ボタン、画像表示するだけの使い方を追加
## v2.3.10
- fix: ext_fg.sn などをテンプレ最新と合わせる
- fix: 【トゥイーンアニメを行なう】サンプル修正
## v2.3.9
- fix: ライブラリ更新(SKYNovel v1.43.0)など
## v2.3.8
- docs: コードブロックライセンス年更新
- fix: ライブラリ更新(SKYNovel v1.40.3)
## v2.3.7
- fix: core/webpack.config.js に永続的ビルドキャッシュ記述追加
- fix: 【禁則処理】サンプル更新、開発者環境で調整
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=line_breaking_rules
## v2.3.6
- fix: ライブラリ更新(SKYNovel v1.39.8)
- fix: webpack-dev-server のログ出力を 'info'→'warn' に
## v2.3.5
- fix: ライブラリ更新(SKYNovel v1.39.2)
## v2.3.4
- fix: ライブラリ更新(SKYNovel v1.39.1)
## v2.3.3
- fix: マクロ更新を反映（ext_fg.sn）
- fix: ライブラリ更新(SKYNovel v1.38.0)
## v2.3.2
- docs: マクロ説明を追加・手直し（ext_fg.sn、ext_fg2.sn、ext_for_call.sn）
- fix: ライブラリ更新(SKYNovel v1.36.1)
## v2.3.1
- fix: ライブラリ更新(SKYNovel v1.35.4)
## v2.3.0
- feat: 【ルビ記法】サンプル更新、@famibee/skynovel 1.35.1 対応
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=ruby
	- 文字とルビに、ルビ記法の特殊文字「｜《》」を含めたもの
	- 文字のみstyle(背景色)変更
	- ルビのみstyle(背景色)変更
	- 半角文字やSKYNovel特殊文字（半角空白、％、[、&、]）を含めたもの
	- ダミー属性に特殊文字「｜《》」を含めたもの
	- 傍点記法
	- 傍点記法（傍点を任意文字に変更）
	- [graph][tcy]の背景色、ルビ
	- [ch]でのみ、背景styleなどを一塊とする例
		- 以上を[span]区間に含めたもの
			- 以上を[link]区間に含めたもの
## v2.2.1
- fix: ライブラリ更新(SKYNovel v1.34.1)
## v2.2.0
- feat: 【ルビ記法】サンプル更新、@famibee/skynovel 1.33.0 対応
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=ruby
## v2.1.22
- fix: ライブラリ更新(SKYNovel v1.32.2)
## v2.1.21
- fix: 【効果音とBGM】サンプル更新、@famibee/skynovel 1.32.0 対応
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=sound
## v2.1.20
- fix: ライブラリ更新(SKYNovel v1.30.8)ほか
## v2.1.19
- fix: ライブラリ更新(SKYNovel v1.30.6)
## v2.1.18
- fix: トップページ：[link][span][ch]の表示確認記述変更(for SKYNovel 1.30.4)
## v2.1.17
- fix: トップページ：[link][span][ch]の表示確認記述追加(for SKYNovel 1.30.3)
- fix: トップページ：[link]ツールチップの確認部追加
## v2.1.16
- fix: トップページ：文字表示関連のテスト追加
- fix: [ch style]テスト追加
- fix: [r]を挟むと[span]色変更がキャンセルされるかテスト追加
- fix: ライブラリ更新
## v2.1.15
- fix: 【文字ボタン・リンク】サンプル、@famibee/skynovel 1.30.1 対応
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=ch_button
## v2.1.14
- fix: 【文字ボタン・リンク】サンプル、リンクの一つにルビを追加（挙動チェック用）
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=ch_button
- fix: ライブラリ更新
## v2.1.13
- fix: 【禁則処理】サンプル、縦書き横書き変更しやすく
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=line_breaking_rules
- fix: ライブラリ更新
## v2.1.12
- fix: 【フォント利用】サンプルのローカルフォントファイルが適用されていなかったのを修正
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=font
## v2.1.11
- fix: ライブラリ更新
- 既知の問題
	- SafariやFirefoxで【えもふりレイヤ】でボタンサイズが極端に大きく表示される。
		- 以下のエラーなどが大量に。
			- Unhandled Promise Rejection: NotFoundError: The object can not be found here.
			- cvsResize — web.js:74547
			WebGL: INVALID_OPERATION: uniformMatrix3fv: location not for current program
		- 【効果音とBGM】では正常。
## v2.1.10
- fix: ライブラリ更新
## v2.1.9
- fix: ext_fg2.sn 更新
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=ext_fg2
## v2.1.8
- fix: 【動画再生】サンプル冒頭、動画再生と同時に行う処理を[trans]か[tsy]か選べるように
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=tag_lay_mov
- fix: ライブラリ更新
## v2.1.7
- fix: ライブラリ更新
## v2.1.6
- fix: ext_fg2.sn、ext_for_call.sn 更新
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=ext_fg2
- fix: ライブラリ更新
## v2.1.5
- 【文字ボタン・リンク】サンプルに hint系テスト追加
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=ch_button
- fix: ライブラリ更新
## v2.1.4
- fix: ライブラリ更新
## v2.1.3
- upd: ライブラリ更新
## v2.1.2
- upd: ライブラリ更新
## v2.1.1
- upd: ライブラリ更新
## v2.1.0
- add: 【ページ移動】サンプル追加。本やWeb漫画のように手軽に前にも戻れる機能
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=tag_page
- upd: 【複数行タグやマクロ】に行番号テストコード追加
	- https://famibee.github.io/SKYNovel_gallery/index.html?cur=multiline
## v2.0.54
- fix: 【Error: TypeScript emitted no output for ...】エラーを解消
## v2.0.53
- upd: ライブラリ更新
## v2.0.52
- upd: ライブラリ更新
## v2.0.51
- upd: ライブラリ更新
## v2.0.50
- upd: プラグインソース改修
- fix: エラーなど修正
- upd: SKYNovelのみバンドルチャンク切り分け
- upd: ライブラリ更新
## v2.0.49
- upd: ライブラリ更新
## v2.0.48
- upd: ライブラリ更新（Electron 14 に更新）
## v2.0.47
- fix: tsconfig.json 更新　target, lib を es2021 に
- upd: ライブラリ更新
## v2.0.46
- upd: ライブラリ更新（SKYNovel v1.18.0 対応）
## v2.0.45
- upd: ライブラリ更新
## v2.0.44
- fix: ライブラリ更新（webpack-dev-server 4.0.0 対応）
## v2.0.43
- upd: ライブラリ更新
## v2.0.42
- upd: ライブラリ更新
## v2.0.41
- upd: ライブラリ更新
- fix: tsconfig.json 更新　es2019 →【"target": "es2021",】
## v2.0.40
- upd: ライブラリ更新
## v2.0.39
- fix: ライブラリ更新
- fix: tsconfig.json で【"target": "es2021",】に
## v2.0.38
- upd: ライブラリ更新
## v2.0.37
- upd: Effekseer型指定更新対応
	- https://github.com/effekseer/EffekseerForWebGL/issues/47
- upd: ライブラリ更新
## v2.0.36
- upd: pixi.js 6、webpack 5 に更新
- upd: ライブラリ更新
## v2.0.35
- upd: ライブラリ更新
## v2.0.34
- upd: ライブラリ更新
## v2.0.33
- fix: v2.0.22辺りからしばらくビルドされていなかった件
- upd: ライブラリ更新
## v2.0.32
- upd: ライブラリ更新
## v2.0.31
- upd: ライブラリ更新
## v2.0.30
- upd: ライブラリ更新
## v2.0.29
- upd: 【文字ボタン・リンク】サンプルに画像ボタンをもう一つ追加
- upd: 【スプライトシート】サンプルに回転時計をもう一つ追加
- upd: ライブラリ更新
## v2.0.28
- upd: ライブラリ更新
## v2.0.27
- fix: Licenseブロック年表記更新
- upd: ライブラリ更新
## v2.0.26
- upd: ライブラリ更新
## v2.0.25
- upd: ライブラリ更新
## v2.0.24
- upd: ライブラリ更新
## v2.0.23
- upd: tsconfig.json の target を es2019 に更新
- upd: ライブラリ更新
## v2.0.22
- upd: ライブラリ更新
## v2.0.21
- upd: EmoteLayer、player.mainTimelineLabels だけでなく player.diffTimelineLabels も参照して存在チェックするように
- upd: ライブラリ・フォント更新
## v2.0.20
- upd: ライブラリ更新
## v2.0.19
- upd: 【HTMLフレーム】サンプルフォーカス周り修正、ゲームパッド確認
- upd: ライブラリ更新
## v2.0.18
- upd: ライブラリ更新
## v2.0.17
- upd: 【文字ボタン・リンク】サンプルに文字リンクとフォーカス移動サンプル追加
- upd: 【文字出現演出】サンプル手直し
- upd: ライブラリ更新
## v2.0.16
- upd: SKYNovel更新（[button]style属性をCSS形式ではなくJSONに）対応
- upd: 【文字出現演出】サンプルにツールチップステスト用カスタム hint.png 追加
- upd: 【文字ボタン・リンク】サンプルに「背景なし文字ボタン」「画像ボタン」「縦書き横書きボタン」とツールチップ追加
## v2.0.15
- upd: 【既読スキップ】【文字出現演出】【画面を揺らす】サンプルに「既読情報クリア」ボタン追加
- upd: ライブラリ更新（@famibee/skynovel）対応、グローバルイベント待ちを有効に
- upd: ライブラリ更新
## v2.0.14
- upd: ライブラリ更新
## v2.0.13
- upd: ライブラリ更新
## v2.0.12
- upd: ライブラリ更新
## v2.0.11
- upd: ライブラリ更新
## v2.0.10
- upd: ライブラリ更新
## v2.0.9
- upd: ライブラリ更新
## v2.0.8
- upd: 【履歴と機能追加】サンプルで、履歴フレーム表示中は[call]ジャンプ状態で本文と違うキー予約をし、Enterキーなどで本文を読み進めさせないように
- add: 【履歴と機能追加】サンプルで、履歴フレームを上・Rキーでも表示、右クリック・R・Enterキーでも非表示にするように
- upd: ライブラリ更新
## v2.0.7
- upd: ライブラリ更新
## v2.0.6
- upd: ライブラリ更新
## v2.0.5
- fix: 簡易版ギャラリー向け修正
- upd: GLTFLoaderなどをES6版を使用するように
- upd: ライブラリ更新
## v2.0.4
- add: Effekseerエフェクト（仕様策定中）のサンプル追加
- upd: ライブラリ更新
## v2.0.3
- upd: サイドバー追加、スマホ向けにビューポートに収まるようにスクロールさせるように
- upd: ライブラリ更新
## v2.0.2
- upd: ライブラリ更新（SafariとFirefoxの不具合修正）
## v2.0.1
- upd: ライブラリ更新（スナップショット修正）
## v2.0.0
- upd: SKYNovel 1.0.0 対応・テンプレ変更
	- npm un skynovel && npm i @famibee/skynovel
	- core/web4webpack.js ... require('@famibee/skynovel/web');
    ほか
- upd: ライブラリ更新
## v1.7.19
- upd: argChk_Num, argChk_Boolean の import 修正
- upd: ライブラリ更新
## v1.7.18
- upd: コード表示で最初に開いたときに停止位置にスクロールするように
- upd: コード表示のテーマを「Dracula」→「tomorrow_night_bright」に変更
- upd: ライブラリ更新
## v1.7.17
- add: 効果音とBGMサンプルに属性start_ms、end_ms、ret_msテスト追加
## v1.7.16
- breaking change: SKYNovel v0.20.4（プラグイン用クラス定義追加と変更）対応
- breaking change: SKYNovel v0.20.3（webpackでumdモジュールバンドル化）対応
## v1.7.15
- add: 効果音とBGMサンプルに[xchgbuf]（再生トラックの交換）サンプルを追加
## v1.7.14
- add: ブレンドモードのサンプル追加
## v1.7.13
- chg: [break_macro]廃止に対応
- upd: ライブラリ更新
## v1.7.12
- upd: ライブラリ更新
## v1.7.11
- add: プレイデータのインポート・エクスポートサンプル追加
- upd: ソースビューのシンタックスハイライト対象タグ名を最新版に
- upd: ライブラリ更新
- bug: その他不具合修正
## v1.7.10
- upd: 複数行サンプルに行番号確認事項追加
- upd: ライブラリ更新
## v1.7.9
- upd: 複数行サンプルに事例追加
- upd: ライブラリ更新
## v1.7.8
- add: 効果音とBGMサンプルに m4a,ogg,aac,webm,flac,wav 再生ボタンを追加
## v1.7.7
- upd: ライブラリ更新
## v1.7.6
- upd: ライブラリ更新
## v1.7.5
- upd: ライブラリ更新
## v1.7.4
- upd: ライブラリ修正、一部アイコンが出ていなかったのを修正
- bug: PC版ギャラリーでナビバーが太くなっていたのを修正
## v1.7.4
- add: ギャラリーPWAアプリ、簡易版PWAアプリを分離
## v1.7.3
- add: 簡易版PWAアプリ追加
## v1.7.2
- chg: 横幅600px以下のページでも横二つのサムネイルを表示するように
- upd: ライブラリ更新
## v1.7.1
- bug: モバイルページで、内部的に二重起動になっていた件を修正
- bug: SKYNovelスライドプロジェクトで、表示済み文字の前に改行が発生する件、「・」が行頭禁則なので「●」に置換
- upd: ライブラリ更新
## v1.7.0
- new: PWAアプリ化
- bug: ウインドウサイズ変更時にタブ部分が小さくなる不具合修正
## v1.6.3
- upd: ライブラリ更新
## v1.6.2
- upd: ライブラリ更新
## v1.6.1
- upd: ライブラリ更新
## v1.6.0
- add: Service WorkerによるPWA化作成中
- upd: ライブラリ更新
## v1.5.9
- add: タブ【文字表示】に「禁則処理と文字詰め」サンプル追加
- upd: ライブラリ更新
## v1.5.8
- upd: ライブラリ更新
## v1.5.7
- upd: ライブラリ更新、年表記更新
## v1.5.6
- upd: topサンプルをダークモード対応・文字装飾を1px縁取りに
## v1.5.5
- upd: ライブラリ更新
## v1.5.4
- upd: ライブラリ更新
- upd: 「複数メッセージウインドウ」文字レイヤにボタン追加。enabled切り替えのサンプル
## v1.5.3
- upd: ライブラリ更新
## v1.5.2
- upd: ライブラリ更新
## v1.5.1
- upd: ライブラリ更新
## v1.5.0
- add: ギャラリー【スクリプト】にエスケープ文字サンプル追加
- chg: 「built_in_〜」系のフォルダ・プロジェクト名前置詞をやめ、削除
## v1.4.0
- add: ギャラリーにルビ揃え指定サンプル追加
## v1.3.33
- upd: ライブラリ更新
## v1.3.32
- add: サンプルに「履歴と機能追加」を追加
- upd: ライブラリ更新（新文字表示技術）
## v1.3.31
- upd: ライブラリ更新
## v1.3.30
- メッセージウインドウサンプル、名前表示とシステムボタンも
- 複数メッセージウインドウサンプル
- 文字ボタン・リンクサンプル（やや制作途中）
## v1.3.29
- add: HTMLフレームサンプル追加
## v1.3.28
- add: フォント利用サンプル追加
## v1.3.27
- add: 文字出現演出（制作中）
- upd: ライブラリ更新
## v1.3.26
- add: 文字出現演出（制作中）
- upd: ライブラリ更新
## v1.3.25
- upd: ライブラリ更新
## v1.3.24
- upd: ライブラリ更新
## v1.3.23
- upd: ライブラリ更新
## v1.3.22
- labo: 文字表示技術研究中
## v1.3.21
- 既読スキップサンプル追加
## v1.3.20
- 冒頭サンプルにFキースキップ追加
## v1.3.19
- 無名ラベルサンプル追加
## v1.3.18
- labo: 文字表示技術研究中
- upd: ライブラリ更新
## v1.3.17
- bug: フラグメントシェーダだけ見た目動作が変わってるので修正、モザイクサンプル追加
## v1.3.16
- upd: ライブラリ更新
## v1.3.15
- chg: ライブラリ更新
## v1.3.14
- chg: ライブラリ更新
## v1.3.13
- chg: ライブラリ更新
## v1.3.12
- 動画再生と[wv]サンプル追加
## v1.3.11
- 立ち絵を簡単に扱う拡張スクリプト ext_fg2.an 追加
## v1.3.10
- snファイルの中身が見える機能、見えなくなってる件を修正
## v1.3.9
- ３Ｄレイヤでエラーが出ていたのを修正
## v1.3.8
- prj.jsonからsearchセクション削除、ライブラリ更新、最新動作確認
## v1.3.7
- bug: 3Dレイヤとえもふりレイヤで発生していたエラー修正
- off: pixi5に更新して、Live2Dが現状使えないので、一時非表示に
## v1.3.6
- ブラウザ版全画面で内容が左に寄る件、CSSで対応
## v1.3.5
- えもふりレイヤ: 複数キャラ表示
- えもふりレイヤ: 普通のレイヤのように、一キャラ１レイヤで扱える構造に
- えもふりレイヤ: [tsy]で動かしてみる。
- えもふりレイヤ: サイズと位置指定
## v1.3.4
- えもふりレイヤ: 作り込み、レイヤクリア作成
## v1.3.3
- Live2D Cubismレイヤがエラーになってた件修正
- 【名前 '〜' が見つかりません。】対策
## v1.3.2
- ３Ｄレイヤ・モデル作成時重複チェック
- ３Ｄレイヤ・モデル削除（del=）
## v1.3.1
- ThreeDLayerの作り込み、リソースリークを修正
- ThreeDLayerの機能をtypeで切り分ける形に仕様変更
- ３Ｄレイヤ・glTFモデル表示、アニメ切り替え
## v1.3.0
- ３Ｄレイヤ・gltfモデル表示とアニメ（暫定版）
## v1.2.4
- Live2Dプラグインでキャッシュ対応
## v1.2.3
- えもふり使用サンプル終了時、エラーになる件対応
## v1.2.2
- 動くサンプルをGitHub Pagesで公開するように
## v1.2.1
- えもふりレイヤプラグイン: 表示されない不具合修正
## v1.2.0
- Live2D Cubismレイヤプラグイン追加（暫定版）
## v1.1.5
- えもふり開発元有限会社エムツーさんから指摘、【簡易的な許諾書(最初にお読みください.txt)をエンジンの使用者(開発者)が閲覧し確認できるよう】に同梱＆リンク、など
## v1.1.4
- えもふりレイヤプラグイン: Android・iOSのみEmotePlayer.maskMode を STENCIL に
## v1.1.3
- えもふりレイヤプラグイン: requestAnimationFrameをかますように
## v1.1.2
- えもふりレイヤプラグイン: 裏ページ無しとする変更
## v1.1.1
- えもふりレイヤプラグイン: destroy修正
## v1.1.0
- えもふりレイヤプラグイン追加
## v1.0.4
- 自動でブラウザ開く際に web.htm を直接開くように
## v1.0.3
- ライブラリ更新、３Ｄレイヤが画面外のホイールイベントも奪う不具合修正、Chrome表示異常文字削除
## v1.0.2
- プラグインにより3Dレイヤ追加
## v1.0.1
- 3Dレイヤ以外のサンプル追加
## v1.0.0
- Initial commit
