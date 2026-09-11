# API Development Rules

## Technology Stack

Java 21, Spring Boot 3.5.x, Maven, MyBatis 3.x, PostgreSQL 42.x, Lombok, JUnit 5, Mockito.

## Java

- Use Java 21; use `record`, `var`, Text Blocks, and `Stream.toList()` when appropriate.
- Do not use preview features.
- Use SLF4J; `System.out.println` is forbidden.
- Log exceptions with `log.error`; roll back failed update operations.

## Layering

The dependency direction is fixed: `Controller -> Service -> Mapper -> Database`.

- Controller must not directly depend on Mapper or Entity.
- Mapper must not depend on Controller.
- Service handles 業務ロジック, transaction coordination, and DTO/Entity conversion.

## Spring and Controller

- Inject Spring Beans with `@Autowired`; do not instantiate Spring Beans with `new`.
- All Controller methods must return `ApiResponse<T>`.
- Do not use `@PathVariable`; use `@RequestParam` or `@RequestBody`.
- Controller only receives requests, validates parameters, calls Service, and returns responses.

## MyBatis

- Write SQL only in Mapper XML, never in Java.
- `SELECT *` is forbidden.
- Register Entity in `mybatis-config.xml`.

## Messages

- Store all user-facing messages in properties files.
- Hard-coded messages in Java are forbidden; retrieve them through `MessageService`.
- Do not specify locale directly.