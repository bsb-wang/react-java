# API Testing Rules

- Use JUnit 5 and Mockito; AssertJ is optional.
- Place tests under `src/test/java`; match the production package structure; test classes must end with `Test`.
- Use AAA (Arrange, Act, Assert); each test verifies one behavior.
- Method name format: `methodName_shouldExpectedResult_whenCondition`.
- Service: mock dependencies and cover normal, error, and boundary cases.
- Controller: use `@WebMvcTest` and verify validation, HTTP status, and response body.
- Mapper: use `@MapperTest` or `@SpringBootTest` and verify SQL execution, result mapping, and parameter mapping.