# Frontend Generation Rules

Load when creating a feature, page, component, Hook, form, or Service.

- Feature: generate only the needed `ui`, `services`, `state`, `schemas`, `types`, mocks, and tests.
- Page: generate Page Component, Types, Mock Data, and Test.
- Form: generate Form Component, Zod Schema, Form Type, validation messages, and Test.
- Service: generate Service, Request Type, Response Type, Mock Data, and Test.
- Hook: generate a Hook and Mock Data/Test as needed.
- Add meaningful Vitest tests for components, Hooks, Services, and Utilities; avoid trivial tests.

Generate only files relevant to the request, but keep the result buildable without manual file creation. If the scope is unclear, ask first; do not generate every related file by default.