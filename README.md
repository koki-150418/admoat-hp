# 合同会社AdMoat コーポレートサイト

店舗集客・採用に強いWEB広告代理店「合同会社AdMoat」の公式ホームページです。
ビルド不要・依存パッケージなしの**静的サイト**（HTML / CSS / JavaScript）として構築しており、
GitHub Pages・Netlify・Vercel・Cloudflare Pages など、どこにでもそのまま公開できます。

## サイト構成

| ファイル | 内容 |
|---|---|
| `index.html` | トップページ（ヒーロー・お悩み・サービス・選ばれる理由・理念・実績・CTA） |
| `services.html` | サービス（Meta広告 伴走支援 / 買い切り教科書 / 比較表） |
| `about.html` | 会社概要・代表挨拶・ミッション |
| `works.html` | 実績・お客様の声（※準備中プレースホルダー） |
| `faq.html` | よくある質問（FAQ構造化データ付き） |
| `contact.html` | お問い合わせ（mailto送信式・サーバー不要） |
| `privacy.html` | プライバシーポリシー |
| `legal.html` | 特定商取引法に基づく表記（教材販売に必要） |
| `blog/index.html` | お役立ち記事（SEO記事）一覧 |
| `blog/*.html` | 各SEO記事 |
| `sitemap.xml` / `robots.txt` | 検索エンジン向け設定 |
| `404.html` | エラーページ |
| `CNAME` | 独自ドメイン（admoat.net）設定（GitHub Pages用） |
| `assets/css/style.css` | デザイン一式 |
| `assets/js/main.js` | 動き（メニュー・スクロール演出・FAQ・フォーム） |
| `assets/img/` | ロゴ・OGP画像（提供PDFのベクターデータから再構築） |

## ローカルでの確認方法

```bash
# このフォルダ内で簡易サーバーを起動
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

## SEO記事（ブログ）の追加方法

記事は今後たくさん追加する想定です。最も簡単な方法は、既存記事をコピーして編集することです。

1. `blog/meta-ads-budget.html` などをコピーして `blog/新しいスラッグ.html` を作成
2. ファイル冒頭の `<title>` `description` `canonical` `og:*`、本文（`<h1>`〜）を書き換え
3. `blog/index.html` の `post-grid` 内にカードを1枚追加
4. `sitemap.xml` に新しいURLを1行追加

> ヒント：見出しは `<h2 id="...">`、目次は `.toc` の `<a href="#id">` と対応させると目次リンクが効きます。
> 強調枠は `<div class="callout">`、表は `.dl-table` クラスが使えます。

## 公開（デプロイ）方法 ― GitHub Pages の例

1. GitHub リポジトリの **Settings → Pages**
2. **Source** を `Deploy from a branch` にし、対象ブランチ（例：`main`）と `/ (root)` を選択
3. 独自ドメインを使う場合は **Custom domain** に `admoat.net` を入力（`CNAME` ファイル同梱済み）
4. DNS 側で `admoat.net` を GitHub Pages 向けに設定

Netlify / Vercel / Cloudflare Pages の場合は、このリポジトリを連携し
「ビルドコマンドなし・公開ディレクトリ＝ルート」で公開できます。

## 公開前に差し替えたい箇所（プレースホルダー）

- **会社概要**（`about.html`）：所在地・設立日など
- **特定商取引法に基づく表記**（`legal.html`）：所在地・電話番号・支払/返品条件（販売前に必須）
- **実績・お客様の声**（`works.html`）：事例が揃い次第
- **代表者写真**（`about.html` の `profile-photo`）：現状はロゴ調プレースホルダー
- **OGP画像**：`assets/img/ogp.svg`（必要に応じてPNG画像に差し替え推奨）
- **SNSリンク**：開設後、各ページフッターと `index.html` の構造化データ `sameAs` に追加

## メモ

- ロゴ（`assets/img/logo.svg` / `logo-white.svg`）は、ご提供いただいた Illustrator/PDF データの
  ベクターパスを抽出して SVG として再構築したものです（拡大しても劣化しません）。
- お問い合わせフォームは、サーバー不要の `mailto:` 方式です。将来的に自動返信や
  スプレッドシート連携が必要になれば、Googleフォーム埋め込みや Formspree 等への
  差し替えが可能です。
