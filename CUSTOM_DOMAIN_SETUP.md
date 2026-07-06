# BODY PALETTE LP 独自ドメイン設定メモ

## 方針

`body-palette.com` は既存の本番サイトとして稼働しているため、ルートドメインは変更しない。

メルマガ・セミナーLPは、以下のサブドメインで運用する。

```text
https://lp.body-palette.com/
```

今回のページは以下のURLで共有する想定。

```text
https://lp.body-palette.com/kenko-2027-0729/
```

## DNS設定

Route 53など、`body-palette.com` のDNS管理画面で以下を追加する。

```text
Type: CNAME
Name: lp
Value: body-palette.github.io
TTL: 300
```

注意: `body-palette.com` のAレコードや `www.body-palette.com` は変更しない。

## GitHub Pages設定

DNS反映後、GitHub PagesのCustom domainに以下を設定する。

```text
lp.body-palette.com
```

その後、HTTPS enforcementを有効化する。

## 確認コマンド

```bash
dig +short CNAME lp.body-palette.com
curl -I https://lp.body-palette.com/kenko-2027-0729/
```

## 現在の状態

- GitHub Pages: 稼働中
- パス公開準備: 完了
- DNS設定: 未実施
- GitHub Pages Custom domain設定: 未実施
