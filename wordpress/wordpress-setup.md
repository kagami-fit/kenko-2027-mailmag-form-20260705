# WordPress貼り付け版 セットアップ手順

## 一言で言うと

今回のLPを、`body-palette.com` のWordPress固定ページ上で見られるようにするための手順です。

デザインは `wordpress-custom-html.html` を貼り付けて再現し、フォーム送信は `Contact Form 7` で既存メールアドレスへ通知します。

## おすすめ構成

```text
固定ページURL:
https://body-palette.com/seminar/kenko-2027-0729/

見た目:
カスタムHTMLブロック

フォーム:
Contact Form 7

通知先:
info3@fractal-workout.jp
```

## なぜ固定ページなのか

固定ページは、セミナーLP・問い合わせページ・サービスページのような「独立したページ」に向いています。

投稿ページでも作れますが、ブログ記事扱いになり、日付・カテゴリ・関連記事などが出ることがあります。メルマガから飛ばす申込ページなら、固定ページの方が自然です。

## 作業手順

### 1. Contact Form 7を入れる

WordPress管理画面で以下を開きます。

```text
プラグイン > 新規追加
```

`Contact Form 7` を検索して、インストール・有効化します。

すでに入っている場合はこの手順は不要です。

### 2. フォームを作る

WordPress管理画面で以下を開きます。

```text
お問い合わせ > 新規追加
```

フォーム名:

```text
健康経営優良法人認定2027 セミナー申込
```

フォーム本文・メール設定は、以下のファイルを見ながら貼り付けます。

```text
wordpress/contact-form-7-template.md
```

保存すると、以下のようなショートコードが表示されます。

```text
[contact-form-7 id="123" title="健康経営優良法人認定2027 セミナー申込"]
```

この `id="123"` の数字を控えます。

### 3. LP固定ページを作る

WordPress管理画面で以下を開きます。

```text
固定ページ > 新規追加
```

タイトル:

```text
健康経営優良法人認定2027 セミナー申込
```

URLスラッグ:

```text
seminar/kenko-2027-0729
```

もしスラッグに `/` が入れられない場合は、親ページとして `seminar` を作り、その子ページとして `kenko-2027-0729` を作ります。

### 4. カスタムHTMLブロックを追加する

本文エリアでブロックを追加します。

```text
カスタムHTML
```

そこに以下のファイルの中身を丸ごと貼り付けます。

```text
wordpress/wordpress-custom-html.html
```

### 5. Contact Form 7のIDを差し替える

貼り付けたHTML内の以下を探します。

```text
[contact-form-7 id="REPLACE_FORM_ID" title="健康経営優良法人認定2027 セミナー申込"]
```

`REPLACE_FORM_ID` を、Contact Form 7で作成したフォームIDに差し替えます。

例:

```text
[contact-form-7 id="123" title="健康経営優良法人認定2027 セミナー申込"]
```

### 6. プレビューする

WordPressのプレビューで以下を確認します。

- 画像が表示されている
- PCで左にLP本文、右にフォームが出ている
- スマホで1カラムになっている
- フォームが表示されている
- 必須項目が機能している

### 7. テスト送信する

自分のメールアドレスでテスト送信します。

以下を確認します。

- 管理者宛てメールが届く
- Reply-To が申込者のメールアドレスになっている
- 電話番号が必須になっている
- 送信元ページURLがメール本文に入っている

## メールが届かない場合

WordPressのメール送信は、サーバー設定によって迷惑メール扱いになることがあります。

その場合は、SMTP系プラグインを入れて、WordPressからの送信を安定させます。

候補:

- WP Mail SMTP
- SMTP Mailer
- FluentSMTP

## 送信内容を保存したい場合

Contact Form 7は、標準では送信内容をWordPressに保存しません。

保存したい場合は、`Flamingo` プラグインを追加します。

```text
プラグイン > 新規追加 > Flamingo
```

有効化すると、フォーム送信内容をWordPress管理画面内で確認できます。

## スプレッドシートにも入れたい場合

最初はメール通知で運用開始し、必要になったらGoogle Sheets連携を足すのがおすすめです。

方法は大きく3つあります。

```text
簡単:
Contact Form 7 + Google Sheets連携プラグイン

柔軟:
Contact Form 7 + Make/Zapier + Google Sheets

自作:
Contact Form 7送信後フック + Google Apps Script
```

最初からスプレッドシートまで入れると確認箇所が増えるため、まずはメール通知で動かしてから追加するのが安全です。

## 画像について

一旦版では、画像をGitHub Pages上のURLから読み込んでいます。

本番運用で完全にWordPress内に閉じたい場合は、画像をWordPressのメディアライブラリにアップロードし、`wordpress-custom-html.html` 内の画像URLを差し替えます。
