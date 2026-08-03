# Codex Cloudを使ったサイト運用

この文書は、GitHub Issues、Codex Cloud、Pull Request、GitHub Mobile、Vercel Previewを使い、スマートフォン中心で安全にサイトを更新するための手順です。Codexは変更案をPRまで作成しますが、本番公開のMergeは行いません。

## このリポジトリの実構成

| 項目 | 調査結果 |
|---|---|
| Default / Production branch | GitHubのdefaultは `main`。README上、`main`反映でGitHub Pagesの本番が更新される構成 |
| Framework / runtime | frameworkなし。ホームページビルダーの `dc-runtime`形式を使う静的HTMLサイト |
| Package manager / lockfile | なし |
| Install command | なし |
| Production build | 対象scriptなし。HTML、CSS、JavaScript、画像等をそのまま公開 |
| Validation | CIの標準PythonによるHTML内ローカル参照、sitemap XML、必須公開ファイルの検査 |
| 公開先 | READMEではGitHub Pages＋独自domain `admoat.net` |
| Vercel / Preview | repository内に `vercel.json` 等はなく、VercelのGit連携・Production Branch・Preview・build/output/root・環境変数は未確認。初回PRではVercel checkは表示されず、既存のNetlify Deploy Preview checkが失敗した |

主要ページはrootの `index.html` と `*.dc.html`、共通パーツは `Header.dc.html` / `Footer.dc.html`、runtimeは `support.js`、モバイル調整は `responsive.css` です。トップページだけ `index.html` で、他ページは `.dc.html` のURLを使います。

### 記事管理

- 一覧表示データは `blog.dc.html` の `/* POSTS:START */`〜`/* POSTS:END */` にあります。
- 記事本文は `post-*.dc.html` の個別HTMLです。
- `sitemap.xml`にも記事URLを追加する必要があります。
- repository内の `.claude/skills/blog-draft/SKILL.md` は、外部のGoogle Sheets「ブログ」tabをsource of truthとし、同期でHTMLへ反映する運用を説明しています。Google Apps ScriptやSheet自体はこのrepositoryにないため、実際の同期設定・権限・命名生成処理は未確認です。記事追加時はSheet運用との競合を必ず確認してください。
- 現在のカテゴリ例は「運用ノウハウ」「店舗集客」「採用広告」です。tag専用ページはありません。
- 個別記事には表示上のカテゴリと日付がありますが、一般的なfront matterはありません。公開日・著者・category・slugをCodexに推測させないでください。
- OGP、RSS、JSON-LD等の構造化データは調査範囲では確認できませんでした。依頼なしに新設しません。

## スマートフォンからサイト修正を依頼する

1. GitHub Mobileまたはブラウザでrepositoryの「Issues」を開きます。
2. 「New issue」から「サイト修正依頼」を選びます。
3. 対象URL、変更前、確定済みの変更後、変更可否範囲を入力します。
4. Issue作成後、次のコメントを投稿します。

```text
@codex このIssueの内容を実装してください。既存デザインを維持し、検証後にPull Requestを作成してください。本番ブランチへ直接Push・Mergeしないでください。
```

## スマートフォンから記事追加を依頼する

1. 「New issue」から「記事追加依頼」を選びます。
2. 読者、目的、キーワード、根拠のある事実、禁止情報、確定CTA、内部リンク候補を入力します。
3. 外部Google Sheets同期を使っている場合は、どちらをsource of truthにするか明記します。
4. Issue作成後、次のコメントを投稿します。

```text
@codex このIssueを基に記事を追加してください。既存記事の構造とデザインを踏襲し、メタデータ、内部リンク、モバイル表示、ビルドを確認してPull Requestを作成してください。本番ブランチへ直接Push・Mergeしないでください。
```

## PR通知が届いた後の確認と公開

1. GitHub MobileのPR通知を開き、「Files changed」で変更対象が依頼範囲内か確認します。
2. 特に料金、割引、実績、住所、連絡先、URL、CTA、CNAME、計測関連のdiffを確認します。
3. 「Checks」が成功していることを確認します。このrepositoryではbuild scriptがないため、静的ファイル・内部リンク・sitemap検査がProduction validationです。
4. ConversationまたはChecksにVercel Previewが表示されている場合は開き、スマートフォンで対象ページ、CTA、リンク、フォーム、横スクロール、文字切れを確認します。表示されなければMergeせず、手動設定を確認します。
5. 修正が必要ならPRへ具体的にコメントします。

```text
@codex 375px幅でCTAが2行になっています。文言は変更せず、既存の余白ルール内で1行表示に修正してください。修正後に再検証し、Mergeはしないでください。
```

6. 内容、Checks、Previewを確認できた場合だけ、承認者本人がGitHub MobileまたはWebの「Merge pull request」を実行します。CodexへMergeを依頼しません。
7. Merge後、GitHubのDeployments/ActionsとVercelのProduction deploymentを確認し、実際の公開URLでも対象箇所を確認します。

## 緊急時

- CIまたはdeployが失敗したら、新しい変更を重ねず、まず失敗したPR/commitと影響範囲を確認します。
- Vercelを本番に利用している場合は、Vercel管理画面で対象Projectを開き、Deploymentsから直前の正常なProduction deploymentを選び、メニュー内のRollbackまたはPromote相当の操作を確認します。Vercelの画面名や導線は変更される可能性があるため、対象domainとdeployment commitを確認してから実行してください。
- GitHub Pagesが本番の場合は、直前の正常commitを打ち消すrevert PRを作り、内容を確認してからMergeします。履歴を書き換えるforce pushはしません。
- secret、DNS、domain、決済、計測タグ、環境変数に関する変更依頼はスマートフォン上で即時承認せず、値を表示しない状態で影響を確認します。
- 料金、実績、連絡先、CTAのdiffは必ず人が原文と突き合わせます。

## Codexが毎回実行する確認

```text
Install: なし
Lint: なし
Typecheck: なし
Test: なし
Production build: 対象scriptなし
代替検証: Python標準libraryでHTML内ローカル参照・sitemap・必須公開ファイルを確認
ローカル表示: python3 -m http.server 8000
```

外部Vercel設定、Codex Cloud接続、repository rulesetはrepositoryファイルだけでは断定しません。初回PRで検出したNetlify連携を含む未確認項目は `docs/MANUAL_SETUP_CHECKLIST.md` で設定・確認します。
