# Contact Form 7 設定テンプレート

WordPressで `Contact Form 7` を使う場合の設定テンプレートです。

## フォーム名

```text
健康経営優良法人認定2027 セミナー申込
```

## フォーム本文

Contact Form 7 の「フォーム」タブに貼り付けます。

`認定への取り組み状況` は、1つだけ選べる必須項目にするため、`checkbox*` に `exclusive` を付けています。

```text
[hidden campaign-id "kenko-2027-seminar-0729"]

<label>会社名 <span class="bp-required">必須</span>
[text* company autocomplete:organization]</label>

<label>部署名
[text department autocomplete:organization-title]</label>

<label>お名前 <span class="bp-required">必須</span>
[text* your-name autocomplete:name]</label>

<label>メールアドレス <span class="bp-required">必須</span>
[email* your-email autocomplete:email]</label>

<label>電話番号 <span class="bp-required">必須</span>
[tel* phone autocomplete:tel]</label>

<label>従業員規模
[select employee-size include_blank "1-49名" "50-299名" "300-999名" "1,000名以上"]</label>

<label>認定への取り組み状況 <span class="bp-required">必須</span>
[checkbox* certification-status exclusive use_label_element "初めて申請予定" "更新予定" "申請するか検討中" "情報収集中"]</label>

<label>気になっているテーマ
[checkbox interests use_label_element "最新要件" "申請スケジュール" "証跡管理" "社内巻き込み" "効果検証" "取得後の運用改善"]</label>

<label>事前に聞きたいこと
[textarea message placeholder "申請準備で不安なこと、確認したい項目があればご記入ください"]</label>

[acceptance privacy-consent] 個人情報の取り扱いに同意します [/acceptance]

[submit "申し込む"]
```

## メール設定

Contact Form 7 の「メール」タブに設定します。

### 送信先

まずは既存で使っているメールアドレスを指定します。

```text
info3@fractal-workout.jp
```

BODY PALETTE専用の受信先がある場合は、そちらに差し替えてください。

### 送信元

`body-palette.com` と同じドメインのメールアドレスにするのが安全です。

```text
BODY PALETTE <wordpress@body-palette.com>
```

`wordpress@body-palette.com` が存在しない場合でも送れることがありますが、メール到達率を考えると実在アドレスか送信用アドレスを作るのが理想です。

### 題名

```text
[セミナー申込] 健康経営優良法人認定2027 / [company] / [your-name]
```

### 追加ヘッダー

```text
Reply-To: [your-email]
```

### メッセージ本文

```text
健康経営優良法人認定2027 セミナー申込がありました。

■ 会社名
[company]

■ 部署名
[department]

■ お名前
[your-name]

■ メールアドレス
[your-email]

■ 電話番号
[phone]

■ 従業員規模
[employee-size]

■ 認定への取り組み状況
[certification-status]

■ 気になっているテーマ
[interests]

■ 事前に聞きたいこと
[message]

■ キャンペーンID
[campaign-id]

■ 送信元ページ
[_url]

■ 送信日時
[_date] [_time]

■ 送信者IP
[_remote_ip]
```

## 自動返信メールを使う場合

申込者本人にも控えを返す場合は「メール (2)」を有効化します。

### 送信先

```text
[your-email]
```

### 送信元

```text
BODY PALETTE <wordpress@body-palette.com>
```

### 題名

```text
【BODY PALETTE】セミナー申込を受け付けました
```

### メッセージ本文

```text
[your-name] 様

この度は、健康経営優良法人認定2027に向けた準備セミナーへお申し込みいただきありがとうございます。

担当者より参加方法をご案内いたします。

---
BODY PALETTE
Fractal Workout Inc.
```

## 保存もしたい場合

Contact Form 7は、標準では送信内容をWordPress内に保存しません。

送信履歴も残したい場合は、`Flamingo` プラグインを追加します。

## スプレッドシート連携したい場合

最初はメール通知だけで始め、運用が固まってから以下のどちらかを足すのがおすすめです。

- Contact Form 7 + FlamingoでWordPress内に保存
- Contact Form 7用Google Sheets連携プラグイン、またはMake/ZapierでGoogle Sheetsへ転記

いきなりスプレッドシート連携まで入れると、Googleアカウント認証やプラグイン相性で詰まりやすいので、まずはメール通知で受けるのが安全です。
