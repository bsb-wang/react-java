# Copilot Instructions

## 1. 共通ルール

- 説明は必ず日本語で記述する。
- ソースコードのコメントは日本語で記述する。
- 実装時はセキュリティを考慮する。

## 2. 開発環境の起動

Javaデバッグモードが使用できない場合があるため、開発環境は手動で起動する。

### 起動前の確認

- 使用するポート番号が他のプロセスと競合している場合は、起動済みのプロセスを停止する。

### Webアプリケーションの起動

1. カレントディレクトリを `web` フォルダへ移動する。
2. `npm install` を実行する。
3. `npm run dev` を実行する。

### APIの起動

1. カレントディレクトリを `api` フォルダへ移動する。
2. `application.properties` を編集する。
3. `spring.profiles.active=dev` を有効にする。
4. `spring.profiles.active=stg` と `spring.profiles.active=prod` を無効にする。
5. 次の形式でJavaアプリケーションを起動する。

```text
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -cp <クラスパス> scm.shi.skillnav.SkillnavApplication
```

## 3. 開発環境の停止

1. API側で使用しているポート番号のサービスを停止する。
2. Web側で使用しているポート番号のサービスを停止する。

## 4. デプロイ用WARの作成

各コマンドがエラーなく完了した場合は、追加の確認を行わず次の手順へ進む。

### 4.1 検証環境

次の手順を記載順に実行する。

1. カレントディレクトリを `web` フォルダへ移動する。
2. `npm run build` を実行する。
3. カレントディレクトリを `api` フォルダへ移動する。
4. `application.properties` を編集する。
5. `spring.profiles.active=stg` を有効にする。
6. `spring.profiles.active=dev` と `spring.profiles.active=prod` を無効にする。
7. `mvn clean package -DskipTests` を実行する。
8. `api/target` フォルダにWARファイルが生成されていることを確認する。

### 4.2 本番環境

次の手順を記載順に実行する。

1. カレントディレクトリを `web` フォルダへ移動する。
2. `npm run build:prod` を実行する。
3. カレントディレクトリを `api` フォルダへ移動する。
4. `application.properties` を編集する。
5. `spring.profiles.active=prod` を有効にする。
6. `spring.profiles.active=dev` と `spring.profiles.active=stg` を無効にする。
7. `mvn clean package -DskipTests` を実行する。
8. `api/target` フォルダにWARファイルが生成されていることを確認する。
