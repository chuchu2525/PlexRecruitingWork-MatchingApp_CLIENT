# PlexRecruitingWork-MatchingApp

Rails の api モード、next.js をフロントにした以下の web アプリを作成したいです。
api の作り方
next からの api の叩き方（表示のさせ方を手順に沿って教えて）

作りたいアプリ
学生生と企業のインターンをマッチングさせるアプリ

要件
・学生、企業が登録できる。
→ 学生：登録時には、名前、メール、学年、大学、学部、自己 PR、これまでの経験を入力が求められる。
→ 企業：登録時に、企業名、メール、会社概要、事業説明、職種説明の入力が求められる。

・企業が募集を掲載できる。
→ 企業は、掲載時に、募集名、インターン内容の説明が求められる。
・学生が募集に対して、応募できる。
→ 掲載された募集に、応募できる。
・学生と企業がメッセージのやり取りができる。
→ 学生：応募後、企業に対して、登録時の情報が送信される。
→ 企業：学生からの応募時の情報を受け取れる。
→ それぞれが、メッセージのやり取りを行える。

-----Rails----
・親ディレクトリを作成
mkdir PlexRecruitingWork-MatichingApp
・移動
cd PlexRecruitingWork-MatichingApp
・Rails の雛形を作成
rails new api_InternMatch --api -T
※--api：api モード、-T：test フレームワークなし

・ディレクトリに移動
cd api_InternMatch

・Rails サーバーの起動
rails s -p 3002
※-p：ポート番号を指定して起動

-----Next.js--

-----Git------
・Git 概念図 1. Working Directory
手元 2. Staging Index
1 を「git add」するとここになる。 3. Local Repository
「git commit」すると履歴として管理できる 4. Remote Repository
「push」でローカルリポジトリの内容をリモートリポジトリに反映

・Git コマンド
WorkTree →① Stage →② Local →③ Remote
①add ②commit ③push

WorkTree ①← Stage ← Local ③← Remote
①reset ③fetch

WorkTree ← Local
reset [commit]

・よく使うコマンド
git log
リポジトリにコミットされたログを確認する

git diff
今回のコミットが前回のコミットとどのような差分があるのか確認
git commit する前に確認する癖をつける

git checkout -b
ブランチを作成して、切り替え

・branch と merge,pull request の関係
基本ルートブランチは「master」
→ これを全員が「pull」して「local」で作業をするので、「master」は変えたくない。
→ そのために、branch と pull request を使用する
手順：
feature branch を作成 → 変更を加えたら、「feature」に「push」
→ 「feature」を「master」にマージしていいかどうかのリクエスト
= pull request
