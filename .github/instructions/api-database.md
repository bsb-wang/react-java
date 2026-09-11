# API Database Rules

- Use PostgreSQL with the `skillnav` schema.
- Use only table definitions under `db/tables/`; テーブル、カラム、型、制約、リレーションを推測して作成してはいけない。
- Follow PK, FK, index, and Nullable definitions exactly; preserve column names and comments.
- Generate Entity only from table definitions.
- Use schema-qualified table names: `skillnav.<table_name>`.
- List INSERT columns explicitly; `SELECT *` is forbidden.
- Store DDL in `db/ddl/create_<table_name>.sql`.

## Type Mapping

| Definition | PostgreSQL | Java |
|---|---|---|
| serial | serial | Integer |
| varchar(n) | varchar(n) | String |
| text | text | String |
| json | json | String |
| 数字（9桁以下） | integer | Integer |
| 数字（10～18桁） | bigint / numeric | Long |
| 数字（19桁以上） | numeric | BigDecimal |
| boolean | boolean | Boolean |
| date | date | LocalDate |
| timestamp | timestamp | LocalDateTime |