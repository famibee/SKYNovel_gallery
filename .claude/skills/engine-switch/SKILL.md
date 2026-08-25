---
name: engine-switch
description: このプロジェクト（sn_gallery）が依存するエンジン（本家skynovel_esm ⇔ bluesnovel）をローカルで一時的に切り替えて実機比較する。「本家版と見比べたい」「bluesnovelで動かして確認したい」「エンジン切り替えて」等の依頼で使う。
allowed-tools: Bash(bun:*) Bash(git:*) Bash(cat:*) Bash(ls:*) Bash(ps:*)
---

# エンジン切り替え（本家skynovel_esm ⇔ bluesnovel）

このプロジェクトは `package.json` の `dependencies["@famibee/skynovel_esm"]` が指す先で、
本家（pixi.jsベース、`../skynovel_esm`）・bluesnovel（DOM/Reactベース、`../bluesnovel`）の
どちらでも動く。実機比較や不具合の切り分けで頻繁に切り替えるので、**必ずローカルの一時的な
変更として行い、作業後は元へ戻す**。

**このスキルはローカル確認専用**。commit・push は行わない（ユーザーから明示の指示がない限り）。

## 前提

- vite dev サーバーは既に `localhost:8082` 等で起動している想定
  （`ps aux | grep vite` で確認。無ければユーザーに起動を確認する）
- 起動中の vite プロセスは **kill しない**。依存切替後は playwright-cli 等で
  `reload` すれば足りる（dev サーバー再起動なしで反映されることを確認済み。
  反映されない場合のみ `rm -rf node_modules/.vite` を検討する）

## 現在どちら向きか確認する

```bash
cat node_modules/@famibee/skynovel_esm/package.json | head -3
```
`"name": "@famibee/skynovel_esm"` なら本家、`"name": "@famibee/bluesnovel"` なら bluesnovel。

```bash
git diff package.json
```
で今どちらへ変更中か（`file:../skynovel_esm` か `file:../bluesnovel` か）も分かる。

## 切り替え手順

1. `package.json` の該当行を書き換える

   ```json
   "@famibee/skynovel_esm": "file:../skynovel_esm",   // 本家
   "@famibee/skynovel_esm": "file:../bluesnovel",      // bluesnovel
   ```

2. `bun install` する（このプロジェクト直下で）

3. ブラウザをリロードして確認する（playwright-cli スキルがあればそれを使う）。
   コンソールエラー・スクショで比較する

4. **確認が終わったら必ず本家へ戻す**（`file:../skynovel_esm` + `bun install`）。
   `git status --short` で `package.json`/`bun.lock` の差分が切替前と同じ内容
   （＝本家向けの未コミット差分のみ）に戻っていることを確認する

## プラグイン本体（3D/Live2D等）がDOM版⇔pixi版で書き換わっている場合

`src/plugin/<name>/` 配下のプラグイン実装自体が、DOM版（bluesnovel向け）と
pixi版（本家向け）とで非互換なことがある（例: `3d_layer/ThreeDLayer.ts` は
`this.ctn.style.…` とDOM前提でアクセスするが、本家 `Layer.ctn` は pixi.js の `Sprite`
なので `.style` が無く `TypeError` になる）。

現在ワーキングツリーに **未コミットのDOM化** が乗っている場合、そのファイルだけを
`git stash` で退避すれば一時的に pixi 版（＝直近コミット時点の実装）へ戻せる。

```bash
# pixi版（本家）で見たい：DOM化差分を一時退避
git stash push -m "一時退避:本家版確認用" -- src/plugin/<name>/<File>.ts

# 確認が終わったらDOM版に戻す
git stash pop
```

**退避したまま他の作業へ進まない**（stash に積んだままセッションが終わると変更を見失う）。
`git stash list` で残っていないか都度確認する。

## スクショの保存先

`playwright-cli screenshot --filename=<path>` 等で撮る。比較用に一時保存したいだけなら
プロジェクトルート直下でよいが、コミットに含めないよう `git status` で確認する。
ファイル名は `<機能名>_<本家/bluesnovel>版.png` のように区別できる名前にする。

## チェックリスト（作業完了時）

- [ ] `package.json`・`bun.lock` が本家向け（`file:../skynovel_esm`）に戻っている
- [ ] `git stash list` に退避したままの変更が残っていない
- [ ] 一時スクショをコミットに含めていない
