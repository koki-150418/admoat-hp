# 将来検討用: 定期記事作成の設計案

この文書は設計案だけです。workflow、`openai/codex-action`、定期実行、記事生成、deploy、auto mergeは実装・有効化していません。

## 有効化前の条件

- API利用料、月間上限、1回あたりのtoken上限、停止責任者を決める。
- `OPENAI_API_KEY`を使う場合はGitHub Secretに保存し、Issue、PR、log、fileへ実値を出さない。権限と利用Projectを分離する。
- 自動化の到達点はDraft PRまでとし、Production branchへのpush、auto merge、本番公開を禁止する。
- theme sourceを承認済みIssue、編集calendar、または確認済みkeyword listに限定する。
- `blog.dc.html`、個別記事HTML、外部Google Sheetsのどれをsource of truthにするか先に確定する。

## 必須guardrail

- 既存title、main keyword、slug、検索意図を照合してduplicateを防ぐ。
- 価格、割引、実績、口コミ、住所、連絡先、公開日、著者、CTAを生成modelに推測させない。
- 事実は承認済みsource URLと取得日をPRへ記録し、根拠が取れない主張は削除する。
- 無許諾画像、転載、医療・健康・美容の保証表現を禁止する。
- 既存記事の構造、カテゴリ、命名、内部リンク、モバイルUIを踏襲する。
- 1回の実行本数、文字数、API費用、実行時間、再試行回数に上限を設ける。

## 停止条件

- source of truthが競合または同期状態が不明
- 根拠資料、確定CTA、公開日、著者、slugのいずれかが必要だが未指定
- 同一または近似themeの記事が存在
- CI、リンク検査、Preview、モバイル確認が失敗
- API費用またはrun上限を超過
- secret、個人情報、外部設定変更が必要

停止時はDraft PRをMergeせず、Issueへ不足情報と再開条件だけを記録します。
