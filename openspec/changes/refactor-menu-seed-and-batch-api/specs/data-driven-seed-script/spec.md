## ADDED Requirements

### Requirement: Seed script accepts JSON config file
The seed script SHALL read menu tree data from an external JSON configuration file specified via `--config <path>` parameter. The script SHALL be a generic batch importer independent of any specific learning roadmap.

#### Scenario: Import GO roadmap from config file
- **WHEN** running `bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json`
- **THEN** the script reads the JSON file and creates all stages and topics under the specified parentId
- **THEN** existing menus with the same name are skipped (idempotent)

#### Scenario: Dry-run mode
- **WHEN** running with `--dry-run` flag
- **THEN** the script prints the menu tree that would be created without making any API calls
- **THEN** no menus are created or modified

#### Scenario: Clean mode
- **WHEN** running with `--clean` flag
- **THEN** the script first calls DELETE /api/menus/batch with the parentId to remove all existing children
- **THEN** recreates all menus from the config file

### Requirement: Menu config JSON schema
The JSON configuration SHALL have the structure `{ project: string, parentId: string, stages: [...] }` where each stage has `{ name, label, icon, order, topics: [{ name, label, order }] }`.

#### Scenario: Valid config file
- **WHEN** the JSON file matches the expected schema
- **THEN** the script successfully creates all menus

#### Scenario: Missing required fields
- **WHEN** the JSON file is missing `project` or `parentId`
- **THEN** the script exits with a clear error message indicating which field is missing
