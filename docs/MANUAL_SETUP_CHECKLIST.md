# 外部サービスの手動設定チェックリスト

repository外の設定は、このPRで推測・上書きしません。管理者が現在の設定と競合しないことを確認し、項目ごとに実施してください。画面名はサービス更新により変わる場合があります。

## Codex Cloud / GitHub連携

- [ ] Codex CloudのGitHub接続で `koki-150418/admoat-hp` だけを対象repositoryとして許可する
- [ ] Cloud Environmentのbase branchをGitHubのdefault branch `main` にする
- [ ] Setup commandは原則不要にする。このrepositoryにはpackage manager、lockfile、install scriptがない
- [ ] 必要な環境変数は最小権限にする。現時点の静的検証にsecretは不要
- [ ] secretやAPI keyをIssue、PR、log、repository fileへ貼らない
- [ ] GitHub Issues/PRで `@codex` が反応し、`codex/<task-slug>` branchからDraft PRを作ることをtest用Issueで確認する
- [ ] Codex Code Review / Automatic Reviewsを有効にする場合、指示外コピー、公開情報、secret、リンク、モバイル、Vercel設定を重点確認する
- [ ] Automatic Reviewsを有効にしてもAutomatic Mergeは有効にしない
- [ ] `openai/codex-action`、`OPENAI_API_KEY`を使う定期workflow、自動記事生成、自動本番公開がないことを確認する

## GitHub Mobile通知

- [ ] GitHub Mobileで対象repositoryをWatchする
- [ ] 通知設定でDirect mentionsを有効にする
- [ ] Assignmentを有効にする
- [ ] Pull request review requestを有効にする
- [ ] Deployment approval / deployment status通知を有効にする
- [ ] 通知からPRのFiles changed、Checks、Conversation、Preview URLを開けることをtestする

## Repository Variableとlabels

- [ ] Settings → Secrets and variables → Actions → Variablesで `APPROVER_GITHUB_USERNAME` を作成し、承認者のGitHub usernameだけを設定する（`@`、email、tokenは不要）
- [ ] `codex-generated` labelを作成する
- [ ] `needs-mobile-approval` labelを作成する（通知workflowも存在しなければ作成する）
- [ ] `site-update` labelを作成する
- [ ] `article-request` labelを作成する
- [ ] Issue Form作成時に対応labelが付くことを確認する。labelが存在しない場合、フォーム自体は作成できても自動付与されないため先に作る

## Vercel

- [ ] Vercel ProjectがGitHub repository `koki-150418/admoat-hp` に接続されているか確認する
- [ ] Production Branchが `main` か確認する。現在のGitHub Pages公開と競合・二重公開にならないか確認する
- [ ] Pull RequestごとのPreview Deploymentを有効にする
- [ ] Preview用環境変数が必要か確認する。不要な本番secretをPreviewへ公開しない
- [ ] GitHub PRのConversationまたはChecksにVercelのcomment/checkとPreview URLが出ることを確認する
- [ ] Framework Preset、Build Command、Output Directory、Root Directoryを確認する。このrepositoryはrootを直接配信する静的サイトで、build scriptはないため、既存Project設定を優先し無理にNode化しない
- [ ] 本番domain、Preview domain、GitHub Pagesの `CNAME` が意図した構成か確認する
- [ ] Production deploymentの承認・rollback権限を必要最小限にする
- [ ] Vercel設定や既存Projectと競合する場合は変更せず、現状と判断理由をIssueに記録する

## Branch protection / Ruleset

- [ ] `main` に対する既存branch protection / rulesetを確認し、上書きせず不足分だけ追加する
- [ ] `main` への直接pushを禁止する
- [ ] Pull Request経由を必須にする
- [ ] CIの `Static production validation` をrequired checkにする（workflowが一度成功し、check名が選択可能になってから設定）
- [ ] force pushとbranch deletionを禁止する
- [ ] admin bypass / bypass listを最小限にする
- [ ] repositoryのAllow auto-mergeを無効のままにする
- [ ] 単独運用でPR作成者本人がself-approvalできず作業不能になる場合、required approvalsを無理に1にしない。review requestと手動Mergeの運用で補う
- [ ] GitHub PagesのSource branch / folderを確認し、Production branch `main` の認識と一致させる

## 現時点でrepositoryから確認できない項目

- Vercel Projectの有無、Git連携、Production Branch、Preview、build/output/root、環境変数
- GitHub Pagesの管理画面上のSource設定
- branch protection / ruleset / required checks
- Codex Cloud Environment、GitHub連携範囲、Automatic Reviews
- GitHub Mobileの個人通知設定
- 外部Google Sheets / Google Apps Scriptによるブログ同期の実体と権限

これらは未確認のままでもPR作成・レビューは可能ですが、Vercel Preview通知と本番保護を完成させるには管理画面での確認が必要です。
