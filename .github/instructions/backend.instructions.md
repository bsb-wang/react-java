# API Instructions

## 1. Project Overview

This project is an enterprise business application built with:

- Java 8
- Spring Boot 2.7.16
- Maven
- MyBatis 2.3.1
- PostgreSQL
- Lombok
- JUnit 5
- Mockito

## 2. General Development Rules

- Respond in Japanese.
- Write clean, maintainable, enterprise-grade code.
- Follow existing project patterns whenever possible.
- Do not make assumptions about database schema or business rules.
- Ask for clarification if required information is missing.
- Prioritize readability and maintainability over clever implementations.

## 3. Java Rules

### 3.1 Java Version

- Target Java version: Java 8.
- Do not generate code using features introduced after Java 8.
- Use Java 8-compatible alternatives.

The following features are forbidden:

- `record`
- `var`
- Switch expressions
- Text blocks
- Sealed classes
- `Stream.toList()`
- `Optional.or()`
- `Map.of()`

### 3.2 Naming Conventions

| Component | Naming convention |
|---|---|
| Controller | `XxxController` |
| Service | `XxxService` |
| Mapper | `XxxMapper` |
| DTO | `XxxDto` |
| Entity | `XxxEntity` |
| Constants | `XxxConstants` |
| Custom exception | `XxxException` |

Entity file names and class names must use the `XxxEntity` format. For example:

```text
CompanyEntity.java
CompanyEntity
```

### 3.3 JavaDoc

- Write JavaDoc comments in Japanese for all Java classes, interfaces, enums, and public or protected methods.
- Describe the purpose, responsibility, behavior, and relevant business constraints so that the implementation intent is clear without reading its callers.
- For methods with parameters, document every parameter with `@param`.
- Document return values with `@return` when applicable.
- Document thrown exceptions with `@throws` when applicable.
- For DTO fields and methods, document the meaning and usage of values when they are not self-evident from the name.
- For complex processing, document assumptions, validation rules, side effects, and error conditions.
- Do not add comments that only restate the code.

## 4. Project Structure

```text
src/
├── main/
│   ├── java/scm/shi/skillnav/
│   │   ├── common/
│   │   ├── config/
│   │   ├── consts/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── mapper/
│   │   ├── service/
│   │   ├── ServletInitializer.java
│   │   └── SkillnavApplication.java
│   └── resources/
│       ├── messages/
│       │   ├── messages_en.properties
│       │   ├── messages_ja.properties
│       │   └── messages_zh.properties
│       ├── META-INF/
│       │   └── additional-spring-configuration-metadata.json
│       ├── mybatis/
│       │   ├── mapper/
│       │   └── mybatis-config.xml
│       ├── static/
│       ├── templates/
│       ├── application-dev.properties
│       ├── application-prod.properties
│       ├── application-stg.properties
│       ├── application.properties
│       ├── logback-spring-dev.xml
│       ├── logback-spring-prod.xml
│       └── logback-spring-stg.xml
└── test/java/scm/shi/skillnav/
```

### 4.1 Folder Responsibilities

#### `common/`

Contains shared utility classes, helper methods, common models, base classes, and reusable components. Business logic must not be implemented here.

Examples:

- `DateUtil`
- `StringUtil`
- `CommonResponse`
- `CustomException`

#### `consts/`

Contains constants used throughout the application. Avoid hard-coded values in source code.

Examples:

- `MessageConstants`
- `SystemConstants`
- `ApiConstants`

#### `controller/`

Contains REST API controllers.

Responsibilities:

- Receive HTTP requests.
- Validate request parameters.
- Call the Service layer.
- Return API responses.

Rules:

- Define request paths with standard Spring annotations such as `@GetMapping`, `@PostMapping`, `@PutMapping`, and `@DeleteMapping`.
- Explicitly specify the `value` attribute for `@GetMapping` and `@PostMapping`, such as `@GetMapping(value = "/users")`.
- Add a Japanese JavaDoc comment describing the purpose of each public Controller handler method.
- Do not include request parameters in mapping paths, such as `/{id}` or `/{shiId}`.
- Do not use `@PathVariable` in Controllers.
- Receive request parameters with `@RequestParam` or the request body instead.
- Explicitly set `required = true` in `@RequestParam` when a parameter is required by the specification.
- Explicitly set `required = false` in `@RequestParam` when a parameter is optional.
- Use `ApiResponse<T>` as the return type for all Controller methods.

#### `dto/`

Contains Data Transfer Objects. DTOs must not contain business logic.

Responsibilities:

- Request DTOs.
- Response DTOs.
- Data transfer between layers.

#### `entity/`

Contains database entity classes.

- Generate entities strictly according to the database specification.
- Do not add undefined columns.
- Represent table structures and map database columns to Java fields.

#### `mapper/`

Contains MyBatis Mapper interfaces and XML files.

Responsibilities:

- Execute database operations.
- Define SQL mappings.

Rules:

- SQL must be implemented in Mapper XML.
- Do not write SQL in Java code.
- Avoid `SELECT *`.

#### `service/`

Contains all business logic.

Responsibilities:

- Process business rules.
- Coordinate transactions.
- Call the Mapper layer.
- Transform DTOs and Entities.

## 5. Layer and Dependency Rules

The layer dependency direction is:

```text
Controller
    -> Service
        -> Mapper
            -> Database
```

Allowed dependencies:

```text
Controller -> Service
Service -> Mapper
```

Not allowed:

```text
Controller -> Mapper
Controller -> Entity
Mapper -> Controller
```

### Dependency Injection

- Inject Service, Mapper, and other Spring-managed dependencies using `@Autowired`.
- Do not manually instantiate Spring-managed dependencies with `new`.
- Apply the same `@Autowired` injection style consistently in Controllers, Services, and other Spring components.

## 6. MyBatis Rules

### 6.1 Mapper XML

- Store complex SQL statements in `src/main/resources/mybatis/mapper/` as Mapper XML files.
- Keep SQL out of Java Mapper interfaces.
- Reference XML statements from the corresponding Mapper interface.
- Use the file name format `<MapperName>.xml`, for example `CompanyMapper.xml`.
- When creating a Mapper XML file, register every required Entity as a type alias in `mybatis/mybatis-config.xml`.

### 6.2 Type Aliases

`mybatis/mybatis-config.xml` contains MyBatis settings and type alias definitions for Entities used by Mapper XML files.

Add each required Entity to the `<typeAliases>` section using the `XxxEntity` class name and its fully qualified class name.

## 7. Message Management

- When adding messages for a feature, add the same message key to all locale files under `src/main/resources/messages/`:
  - `messages_ja.properties`
  - `messages_en.properties`
  - `messages_zh.properties`
- Use feature-specific message keys in the format `<feature>.<message-name>`, such as `login.unauthorized`.
- Do not hard-code messages in Java source files.
- Obtain messages through the common `MessageService` and use the resolved message in the source code.
- Use the locale resolved from the request by `MessageService`.
- Do not specify a locale directly unless the specification explicitly requires it.

## 8. Database Rules

### 8.1 Database and Schema

- Database: PostgreSQL.
- The database schema is `skillnav`.

```text
skillnav
```

### 8.2 Table Specifications

Table definitions are located under `db/tables/`.

```text
db/tables/
├── m_company（会社マスタ）.md
├── m_org（部署マスタ）.md
├── m_user_org（ユーザ所属マスタ）.md
└── m_user（ユーザマスタ）.md
```

Always refer to the Table Specifications before generating Entity, DTO, Repository, Service, or SQL code.

- Never invent columns.
- Never assume missing fields.
- Do not infer column names, data types, or constraints.
- Use only definitions described in the table specification.
- Primary keys, foreign keys, indexes, and nullable constraints must follow the table definition documents.
- Generate Java fields strictly based on the Table Specifications.

### 8.3 Type Mapping

| Table Specifications type | PostgreSQL type | Java 8 type |
|---|---|---|
| シリアル | `serial` | `Integer` |
| 文字列 | `character varying(n)` | `String` |
| テキスト | `text` | `String` |
| JSON | `json` | `String` |
| 数字（桁数は9以内、または桁数未指定） | `integer` | `Integer` |
| 数字（桁数は10桁の場合） | `integer` | `Long` |
| 数字（桁数は10桁を超え、18桁以内） | `numeric(p, 0)` | `Long` |
| 数字（桁数は19以上） | `numeric(p, 0)` | `BigDecimal` |
| boolean | `boolean` | `Boolean` |
| 日付 | `timestamp(6) without time zone` | `LocalDate` |
| 日時 | `timestamp(6) without time zone` | `LocalDateTime` |

Additional rules:

- `シリアル` は必ず `serial` とする。
- Use `java.sql.Date` or `java.sql.Timestamp` only when required by an existing MyBatis or JDBC interface. Otherwise, use `LocalDate` or `LocalDateTime`.

## 9. Database Development Rules

### 9.1 Table Definitions

- Generate Entity classes based on the table definition document.
- Preserve column names and comments defined in the specification.
- Use appropriate Java types according to the database column types.

### 9.2 SQL Generation Rules

- Generate SQL using the table and column names defined in the table specification.
- When generating `CREATE TABLE` statements, always refer to the Type Mapping in the Database Rules to determine PostgreSQL data types.
- Do not create columns that are not defined in the specification.
- Always verify relationships using the table definition documents.
- Store table `CREATE` statements under `db/ddl/`.
- Use the file name format `create_<table_name>.sql`, for example `db/ddl/create_m_company.sql`.
- Always specify the schema defined in the Database Schema section explicitly in SQL.
- Qualify table names using `<schema>.<table_name>` for `CREATE`, `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and `ALTER` statements.
- Always explicitly specify target column names in `INSERT` statements.
- Do not use `SELECT *`.

Example:

```sql
CREATE TABLE <schema>.m_company (
    company_id serial not null,
    company_name character varying(200) NOT NULL,
    enable boolean NOT NULL DEFAULT true,
    careate_at timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (company_id)
);
```

For queries, use the same schema-qualified table name:

```sql
SELECT * FROM <schema>.m_company;
```

Valid `INSERT` example:

```sql
INSERT INTO products (product_no, name, price) VALUES (1, 'Cheese', 9.99);
```

Forbidden `INSERT` example:

```sql
INSERT INTO products VALUES (1, 'Cheese', 9.99);
```

## 10. Unit Test Structure

- Place all unit tests under `src/test/java`.
- The package structure of test classes must mirror the production code structure.
- Test classes must have the suffix `Test`.

### 10.1 Package Structure

```text
src/main/java/scm/shi/skillnav
├── controller
├── service
├── mapper
├── dto
└── entity

src/test/java/scm/shi/skillnav
├── controller
├── service
├── mapper
└── util
```

Examples:

```text
src/main/java/scm/shi/skillnav/service/UserService.java
    -> src/test/java/scm/shi/skillnav/service/UserServiceTest.java

src/main/java/scm/shi/skillnav/controller/UserController.java
    -> src/test/java/scm/shi/skillnav/controller/UserControllerTest.java
```

### 10.2 Test Frameworks and Style

Use:

- JUnit 5
- Mockito
- AssertJ (optional)

Follow the AAA pattern:

1. Arrange
2. Act
3. Assert

Each test should verify a single behavior.

### 10.3 Service Tests

Mock all Mapper dependencies using Mockito.

Test the following cases:

- Normal cases
- Error cases
- Boundary cases

Business logic coverage is required.

### 10.4 Controller Tests

Use `@WebMvcTest` and verify:

- Request validation
- HTTP status
- Response body

### 10.5 Mapper Tests

Use `@MapperTest` or `@SpringBootTest` and verify:

- SQL execution
- Result mapping
- Parameter mapping

### 10.6 Test Method Naming

Use the following format:

```text
methodName_shouldExpectedResult_whenCondition
```

Examples:

```text
findUser_shouldReturnUser_whenUserExists
findUser_shouldThrowException_whenUserNotFound
```
