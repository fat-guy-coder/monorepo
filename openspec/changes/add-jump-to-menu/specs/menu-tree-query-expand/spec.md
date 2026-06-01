## ADDED Requirements

### Requirement: Menu management page supports expandPath query parameter
The System/menu.vue page SHALL accept an optional `expandPath` query parameter. When provided, the page SHALL automatically expand the Tree nodes along the parent chain of the specified menu path, so that the target menu item's parent level is visible and the target item is scrolled into view.

#### Scenario: expandPath provided with valid menu path
- **WHEN** navigating to System/menu.vue with `?expandPath=/front/CoreSkills/JavaScript`
- **THEN** the page calls the menu search API with the path to find the parent chain
- **THEN** all parent nodes of the target menu are expanded in the Tree
- **THEN** the target menu item is scrolled into view

#### Scenario: expandPath not provided
- **WHEN** navigating to System/menu.vue without the `expandPath` query parameter
- **THEN** the Tree renders normally with no nodes pre-expanded (existing behavior preserved)

#### Scenario: expandPath does not match any menu
- **WHEN** navigating to System/menu.vue with `?expandPath=/nonexistent/path`
- **THEN** the search API returns no results
- **THEN** the Tree renders normally with no nodes pre-expanded
- **THEN** no error message is shown to the user
