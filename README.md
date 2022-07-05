# 株式会社ゆめみ フロントエンドコーディング試験

## 概要

React.js / TypeScript をベースに構築した Web アプリケーションで、自分のレベル感の確認のために制作しました。  
課題の内容は[「フロントエンドコーディング試験」](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d)をご参照ください。

## リポジトリ

<https://github.com/un-T-ieda/220704.resas>

## 公開 URL

<https://220705-resas.netlify.app/>

## 開発コマンド

`$yarn dev` : Vite の開発サーバーとモックのレスポンスを返す JSON Server が立ち上がります。  
`$yarn build` : TypeScript による型チェックとファイルビルドが行われます。ビルドファイルは `dist` に出力されます。API リクエスト先がモックの JSON Server から本 RESAS API に変更されます。  
`$yarn preview` : `dist` のファイルを確認するためのサーバーが立ち上がります。  
`$yarn mockapi`: JSON サーバーが立ち上がります。`yarn dev` コマンドで並列実行されるので、こちらのコマンドを直で使用する機会はほぼない想定です。

## 使用技術

### ベース環境

- [React.js](https://ja.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://ja.vitejs.dev/)
- [Emotion](https://emotion.sh/docs/introduction)
- [Storybook](https://storybook.js.org/)
- [Highcharts](https://www.highcharts.com/)

### 整形・静的解析

- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### テスト・CI

- [Jest](https://jestjs.io/ja/)
- [husky](https://typicode.github.io/husky/#/)

### その他

- [RESAS API](https://opendata.resas-portal.go.jp/)
- [JSON Server](https://github.com/typicode/json-server)
- [REST Client VSCode Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## 開発環境について

### React / TypeScript on Vite

Vite 環境で React / TypeScript を使用しています。  
主な選定理由は以下の通りです。

- Create React App よりパフォーマンスが良く、TypeScript を含めた初期の環境構築が容易であること
- シンプルな SPA の構築要件に対し、Next.js, Gatsby.js は不要な機能が多くなる可能性が高いこと
- ノーバンドルの dev server による開発体験の良さ

### Emotion

Emotion の CSS Props をメインで使用します。  
styled-components での記述と比較して

- 命名によるコストを抑えられること
- styled-components の記述と比較してマークアップとスタイリングのコード上での記述位置が近く、構造を把握しやすいこと
- TSX のコンポーネントと styled-components が、コード上で見分けがつきにくくなる問題を抑えられること
- Tailwind CSS と比較では、ユーティリティクラスの記法を確認するためにドキュメントを行き来する必要がないこと

が優位性としてあげられます。反面、

- コンポーネントを記述する上での行数が膨れ上がる
- ある程度ルールを設定して記述しなければ、スタイリングのルールがばらつく可能性がある

といった点には留意し、適切なサイズでコンポーネントや共通スタイルを切り分けるのがよさそうです。

### JSON Server

開発サーバーでは JSON Server を使用しています。  
モックデータは `mockapi.json`、`routes.json` によって管理されています。  
北海道、青森、岩手の 3 都道府県のみ総人口のモック用 JSON データを登録しており、他都道府県選択時はレスポンスが返却されないことに留意してください。  
また、ローカルサーバーで立ち上がるため、外部端末から Vite 開発サーバーの Network URL でアクセスした場合もモックデータの取得ができません。

### REST Client（VSCode Extension）

HTTP リクエストとレスポンスの確認用に、REST Client（VSCode Extension） を使用しています。  
`rest-client.http` でカーソル位置を合わせ `command + option + R` を押下することでレスポンスの確認を行うことができます。  
API Key の リモートリポジトリへのアップロードを避けるため、認証情報はローカルの `setting.json`（VSCode）にて管理をしています。

## Test

husky で pre-commit を設定しています。  
コミット時に Jest の実行と ESlint のチェックが行われます。

---

## 思考メモ

### デザイン、ユーザビリティ面

- ボタンは最低限の大きさ（[Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/foundations/layout/) を参考に、最低でも 44px 基準）を確保し、押しやすく
  - そのまま出すとボタンのエリアが縦長になり、変更が反映されているかどうか気付きにくい。
    - モバイル端末でもファーストビューにグラフが入るようにしておきたい
- キーボード操作時にフォーカスが当たるように。色覚異常も考慮して色を選定
  - ボタンとフォーカスリングの色を PhotoShop の色覚異常校正で確認
- レスポンシブ挙動は [EveryLayout](https://every-layout.dev/) のレイアウトプリミティブを参考に、ブレークポイントでのハードコーディングは極力行わない方向で調整
- TODO: 縦スクロールのエリアは端末によってはスクロール可/不可が伝わりにくくなってしまうので、simpleBar を使用するなどでスクロール可能なエリアであることを明示したい

### テスト

- pre-commit で毎回テストを走らせるのはやりすぎ？
  - コミット時の挙動が重いが、ミスには速く気付くことができる
  - push 時にチェックされる CI を採用しているところが多い印象
  - TODO: Vite 環境なので [Vitest](https://vitest.dev/) を使ってみる？
    - 食い合わせ良さそう

### セキュリティ観点

- 現状実装されているのは .env と Vite の import による API Key の隠蔽
  - GitHub に .env と dist ファイルをアップしない、という方針
  - ただし本番環境のソースから `X-API-KEY` を検索した場合、API Key が取得できてしまう
- 他に考えうる方法は？
  - SSG
    - ビルド時にデータを先に取得しておくことで、API Key を本番環境のコード上から除去する
  - API Key を入力したらリクエストができる仕様に変更する
    - [ゆめみのフロントエンドコーディング試験の題材で React の勉強をしました](https://bufferings.hatenablog.com/entry/2022/06/11/232314) という記事を先日見つけてしまった。今回の用件のような SPA でセキュリティを担保するならこれが正解な気がする。
    - 自分で思いついていない方法を課題でそのまま真似するのはフェアでないので、今後の実装方法のアイデアとして自分の中に留めておく。

### パフォーマンス観点

- 現状 fetch で必要に応じて取得する仕様
  - TODO: 一度取得した情報は再度リクエストを行わなくてもデータが取得できるよう、キャッシュする処理を追加したい
    - 簡易的なものを独自実装する？
    - ReactQuery を使う？
- 他に考えうる方法は？
  - SPA
    - 初期表示のタイミングで必要なデータを一度に取得してしまう方法
    - 初期表示がどのくらい重くなる？要検証
  - SSG
    - 47 都道府県分くらいの情報であれば、ビルド時に一度に取得してしまってもよさそう。
    - 初期表示時に HTML にすでにレスポンスのデータが埋め込まれているので、ページ表示のタイミングで API を叩いてデータ取得を行うよりも [CLS](https://web.dev/i18n/ja/cls/)（レイアウトシフト）・[FCP](https://web.dev/i18n/ja/fcp/)（ページの初期表示時間）の観点で優位性がある

## 個人的な結論

- この用件だと Next.js, Nuxt.js で SSG がセキュリティ観点・パフォーマンス観点での優位性がある
  - SSG 前提で進めるのであれば、Next.js を採用してもよかったかも。
