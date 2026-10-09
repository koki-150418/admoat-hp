# 合同会社AdMoat コーポレートサイト

合同会社AdMoatの公式サイトです。ホームページビルダー（dc-runtime）で制作したデータを
そのまま配置した静的サイトで、GitHub Pages（独自ドメイン `admoat.net`）で公開しています。

## 仕組み

- 各ページは `xxx.dc.html` という自己完結型ファイルです。
- `support.js` がブラウザ側で読み込まれ、`<dc-import>`（ヘッダー/フッター）や
  テンプレート（`{{ }}` / `<sc-for>`）を組み立てて表示します。
- ヘッダー/フッターは `Header.dc.html` / `Footer.dc.html` を各ページが参照します。
- トップページのみ、`admoat.net/` で表示されるよう `index.html` として配置しています
  （ビルダー上の `index.dc.html` に相当）。

## ページ構成

| URL | ファイル | 内容 |
|---|---|---|
| `/` | `index.html` | トップ |
| `/services.dc.html` | サービス一覧（Meta広告伴走支援のみ。詳細は `/accompaniment-support.dc.html`） |
| `/case-soshin-omiya.dc.html` ・ `/case-interview-sofue.dc.html` | 伴走支援の事例・利用者インタビュー（手動管理。`works.dc.html` の `featured` 配列） |
| `/privacy.dc.html` | プライバシーポリシー |
| `/accompaniment-support.dc.html` | Meta広告伴走支援サービス詳細（旧 bansou.admoat.net の内容を移植。料金・特典・事例・FAQ） |
| `/banso/` | 旧・伴走支援LP → `/accompaniment-support.dc.html` へ転送 |
| `/store-ads/` | 旧・伴走支援LP → `/accompaniment-support.dc.html` へ転送 |
| `/service-detail.dc.html` | 旧・広告運用代行（受付終了）→ `/services.dc.html` へ転送 |
| `/ad-video-production.dc.html` | 旧・広告動画制作 → `/services.dc.html` へ転送 |
| `/spot-consulting.dc.html` | 旧・スポットコンサル → `/services.dc.html` へ転送 |
| `/course.dc.html` | 旧・広告マーケティングコース → `/services.dc.html` へ転送 |
| `/works.dc.html` | 事例（クリック可能なパネル形式） |
| `/case-detail.dc.html` | 事例詳細（ダミー・全パネル共通・`noindex`） |
| `/company.dc.html` | 会社概要 |
| `/message.dc.html` | 代表メッセージ |
| `/news.dc.html` | ニュース |
| `/recruit.dc.html` | 採用情報 |
| `/blog.dc.html` ・ `/blog-post.dc.html` | ブログ（一覧・記事） |
| `/column-*.dc.html` | 用語・計測コラム（10本。手動管理・スプレッドシート同期の対象外。一覧は `blog.dc.html` の `columns` 配列、sitemapは `COLUMNS (manual)` 欄） |
| `/faq.dc.html` | よくある質問 |
| `/contact.dc.html` | お問い合わせ |

その他：`Header.dc.html` / `Footer.dc.html`（共通パーツ）、`support.js`（ランタイム）、
`assets/`（ロゴ等）、`uploads/`（画像素材）、`sitemap.xml` / `robots.txt` / `404.html` / `CNAME`。

## 更新のしかた（ビルダーで作り直した場合）

1. ビルダーから一式をエクスポート（zip）
2. 既存の `*.dc.html` / `support.js` / `assets` を新しいものに差し替え
3. `index.dc.html` は `index.html` にリネーム
4. ページ内の `href="index.dc.html"` を `href="./"` に置換（トップをクリーンURLに）
5. 必要に応じて `sitemap.xml` を更新
6. `main` ブランチへ反映すると `admoat.net` が自動更新されます

> ⚠️ サービス詳細ページ群と `case-detail.dc.html` はビルダー側には無い、
> このリポジトリ側で追加したページです。ビルダーから再エクスポートして
> `services.dc.html` / `works.dc.html` を上書きすると、パネルのリンク先や
> デザインクラス（`.svcgrid` / `.casegrid` 等）が失われる可能性があります。
> 上書き後は、パネルのクリック導線と各詳細ページへのリンクが保たれているか確認してください。

## 未掲載（必要に応じて追加）

- 特定商取引法に基づく表記（有料サービス・教材を販売する場合は必須）

## ローカル確認

```bash
python3 -m http.server 8000
# http://localhost:8000 を開く（support.js が相対パスでパーツを取得します）
```
