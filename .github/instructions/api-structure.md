# API Project Structure

```text
src/main/java/scm/shi/skillnav/
  common/       Shared utilities, models, and base classes; no 業務ロジック
  config/       Configuration
  consts/       Constants; avoid hard-coded values
  controller/   REST Controllers
  dto/          Request/response DTOs; no 業務ロジック
  entity/       Database Entities
  mapper/       Mapper interfaces and XML; database operations
  service/      業務ロジック, transactions, and layer conversion
  ServletInitializer.java
  SkillnavApplication.java
src/main/resources/
  messages/     Multilingual properties
  META-INF/
  mybatis/mapper/
  mybatis/mybatis-config.xml
  static/ templates/
  application*.properties
  logback-spring-*.xml
src/test/java/scm/shi/skillnav/
```

Use standard Spring annotations for Controller mappings and explicitly set `value`. Set `required = true/false` explicitly for `@RequestParam` according to the 仕様. See the corresponding files for layering, database, and naming rules.