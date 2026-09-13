# Codex site operation rules

このリポジトリで作業するCodexおよび自動化は、以下を必ず守る。

## 作業手順

- 作業前にリポジトリ全体、default/production branch、公開方式、対象ページ、関連コンポーネント、既存の検証方法を確認する。
- default branchから `codex/<task-slug>` ブランチを作り、`main`、`master`、その他の本番branchへ直接pushしない。
- Issueまたは依頼に書かれた範囲だけを変更し、無関係な整形、リファクタリング、依存更新を混ぜない。
- 既存のUI、余白、配色、フォント、コンポーネント、ファイル構成を維持し、モバイル表示を優先して確認する。
- リポジトリで利用可能なinstall、lint、typecheck、test、production build、リンク検査をすべて実行する。存在しない検証はPRに明記する。
- 変更はPull Requestで提出する。Codexは本番branchへMergeせず、承認者へ通知した後に停止する。

## コンテンツルール

- 指示されていないコピーを追加・変更・削除しない。
- 価格、割引、実績、口コミ、所在地、営業時間、連絡先、CTAを推測・創作しない。既存表記と依頼元の確定情報だけを使う。
- 著作物を転載せず、無許諾画像を使用しない。画像の利用条件と出典を確認する。
- 医療・健康・美容に関する効果を保証・断定しない。依頼文に断定表現がある場合もリスクとして明示する。
- 既存記事のmetadata、命名、カテゴリ、表記ルールを踏襲する。公開日、著者、category、slugを推測しない。
- 内部リンクはリポジトリ内に実在するページだけを使い、リンク切れを確認する。

## セキュリティと外部設定

- secret、API key、token、個人情報、`.env` の実値を表示、保存、commitしない。
- 依頼なしに外部送信、ファイル削除、DNS、domain、決済、計測タグ、Vercel環境変数を変更しない。
- 大幅な依存更新、CMS移行、大規模リファクタリングを行わない。
- `git reset --hard`、強制push、広範囲の削除などの破壊的commandを使わない。

## Pull Request

- PR titleは日本語にする。
- PR本文に「概要」「対象」「確認内容」「テスト」「リスク」「Vercel Preview」を含める。
- 可能なら `codex-generated` と `needs-mobile-approval` labelsを付ける。承認者へ通知後、自動Mergeせず停止する。
- Preview URLや外部設定を確認できない場合は推測せず「未確認」と記載する。

## Code Review Rules

レビューでは、次を優先して指摘する。

- 本番branchへの直接反映または自動Merge
- 指示外のコピー、価格、実績、URL、CTAの変更
- secret、API key、個人情報、`.env` 実値の混入
- production build失敗、内部リンク切れ、モバイルの重大な表示崩れ
- Vercel環境変数、DNS、計測設定への不用意な変更

機械的なlint、format、単純な構文検査はCIへ任せ、人のレビューでは公開内容、安全性、依頼範囲、モバイル表示を重視する。
