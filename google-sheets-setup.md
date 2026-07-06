# Google Sheets転記設定メモ

## いまの状態

LP側は、Google Apps ScriptのWebアプリURLへ申込内容を送る実装に変更済みです。

`app.js` の `sheetEndpoint` には、デプロイ済みのGoogle Apps Script WebアプリURLを設定済みです。申込内容はスプレッドシートへ転記されます。

## 管理URL

- スプレッドシート: https://docs.google.com/spreadsheets/d/175biha_rd58pC8ixceY0nOM7ZLWS6AfSVoxVQqu0MYk/edit
- Apps Script: https://script.google.com/d/1T7lMUzoDo7Y3weLtbteVaB_jsnrbB9YnsaqiN1mtX1iZMwRapUhMlljZ/edit
- WebアプリURL: https://script.google.com/macros/s/AKfycbxNUg3_9CzA5sZ-adgnFrmIwjfrKvGEdn_nMbkxubbHANGCLzHpF7TU1B4RzqhMLCujWw/exec

## 仕組み

1. LPの申込フォームで「申し込む」を押す
2. `app.js` が入力内容をJSONでApps Scriptへ送信
3. Apps Scriptの `doPost` が `申込一覧` シートに1行追加
4. 念のため、ブラウザ内にもバックアップ保存

## 設定手順

1. Googleスプレッドシートを作成する
2. スプレッドシートで `拡張機能` → `Apps Script` を開く
3. `gas/Code.js` の内容をApps Scriptの `Code.gs` に貼り付ける
4. Apps Scriptの `プロジェクトの設定` で `appsscript.json` を表示する
5. `gas/appsscript.json` の内容を貼り付ける
6. `デプロイ` → `新しいデプロイ` → 種類を `ウェブアプリ` にする
7. 実行ユーザーを `自分`、アクセスできるユーザーを `全員` にする
8. 発行されたWebアプリURLを `app.js` の `sheetEndpoint` に貼り付ける
9. GitHubへ反映する

## 転記される列

`送信日時`, `対応状況`, `キャンペーンID`, `セミナー名`, `開催日時`, `会社名`, `部署名`, `お名前`, `メールアドレス`, `電話番号`, `従業員規模`, `認定への取り組み状況`, `気になっているテーマ`, `事前に聞きたいこと`, `UTM Source`, `UTM Medium`, `UTM Campaign`, `申込ページURL`, `個人情報同意`

## 注意

WebアプリURLは、フォーム送信用の入口です。スプレッドシート本体の編集URLとは別物です。
