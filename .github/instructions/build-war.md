# WAR Build Rules

Load only when the user explicitly requests a WAR for the target environment. Before building, confirm the current directory and configuration-file state; do not enable multiple profiles simultaneously.

| Environment | Web build | Profile | Disabled profiles |
|---|---|---|---|
| Staging | Run `npm run build` in `web` | `stg` | `dev`, `prod` |
| Production | Run `npm run build:prod` in `web` | `prod` | `dev`, `stg` |

Then:

1. Enter `api`; enable the target `spring.profiles.active` in `application.properties` and disable all other profiles.
2. Run `mvn clean package -DskipTests`.
3. Confirm that a WAR file is generated under `api/target`.