# Me mudei docs

Documentação para boas praticas no projeto

## Padrões de nomeclatura

- file (kebab-case)
- class (PascalCase)
- function (camelCase)
- attribute (snake_case)
- variable (camelCase)
- constant (UPPER_CASE)
- graphql type def (snake_case)
- db attribute (snake_case)

## Branch Naming

[type]/[id]-[short-label]

## Padrões de commits

[type]: [TaskID] - [short summary]
  │--------│-------------│
  │--------│-------------└─⫸ Summary in present tense. Not capitalized. No period at the end.
  │--------│
  │--------└─⫸ TaskID: Required, Notion task id. For example: #abc2de
  │
  └─⫸ Commit Type: feat|fix|docs|style|refactor|test|chore|perf|ci|build|temp

## Padrões de Pull Requests

Title: Type: ID - Short label
Description: link to task in Notion

## Rodar local
