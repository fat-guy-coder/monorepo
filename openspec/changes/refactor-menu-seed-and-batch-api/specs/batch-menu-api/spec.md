## ADDED Requirements

### Requirement: Batch create menus
The endpoint `POST /api/menus/batch` SHALL accept a JSON body with `{ project, parentId, items }` where `items` is a tree structure. It SHALL recursively create all menus within a database transaction.

#### Scenario: Create a 3-level menu tree
- **WHEN** POST to `/api/menus/batch` with a parent stage and child topics
- **THEN** all parent menus and their children are created
- **THEN** paths are auto-generated following the parent path chain
- **THEN** the response includes `{ created: N, skipped: M, details: [...] }`

#### Scenario: Duplicate names are skipped
- **WHEN** a menu with the same name already exists under the same parent
- **THEN** that item is skipped (not duplicated)
- **THEN** the response counts it as `skipped`

#### Scenario: Transaction rollback on failure
- **WHEN** any item in the batch fails to create (e.g., invalid parentId reference)
- **THEN** ALL items created in this batch are rolled back
- **THEN** no partial data is left in the database

### Requirement: Batch delete menus
The endpoint `DELETE /api/menus/batch` SHALL support two modes: delete by parentId (removes all descendants, keeps parent) and delete by ids (removes specified menus and all their descendants).

#### Scenario: Delete all children of a parent
- **WHEN** DELETE to `/api/menus/batch` with `{ parentId: "xxx" }`
- **THEN** all menus with parentId matching "xxx" are deleted
- **THEN** all nested descendants are recursively deleted
- **THEN** the parent menu itself is NOT deleted
- **THEN** response includes `{ deleted: N }`

#### Scenario: Delete by list of IDs
- **WHEN** DELETE to `/api/menus/batch` with `{ ids: ["id1", "id2"] }`
- **THEN** menus with id1 and id2 and all their descendants are deleted
- **THEN** response includes `{ deleted: N }`

### Requirement: Fix single DELETE recursive cascade
The endpoint `DELETE /api/menus/:id` SHALL recursively delete all descendant menus, not just direct children.

#### Scenario: Delete a menu with 3-level nesting
- **WHEN** deleting a stage menu that has 10 child topics, each with their own sub-topics
- **THEN** all descendants at all levels are deleted
- **THEN** no orphan records remain in the database
