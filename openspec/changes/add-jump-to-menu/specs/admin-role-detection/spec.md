## ADDED Requirements

### Requirement: Backend /api/user/me returns user roles
The GET `/api/user/me` endpoint SHALL return the current user's information including their assigned roles. The response data MUST include a `roles` array with each role containing at least `id` and `name` fields.

#### Scenario: User has roles
- **WHEN** an authenticated user calls GET `/api/user/me`
- **THEN** the response includes `data.roles` array containing objects with `{ id: string, name: string }`

#### Scenario: User has no roles
- **WHEN** a user with no assigned roles calls GET `/api/user/me`
- **THEN** the response includes `data.roles` as an empty array `[]`

#### Scenario: Unauthenticated request
- **WHEN** a request without valid Authorization header calls GET `/api/user/me`
- **THEN** the response returns 401 status code

### Requirement: Frontend admin role detection
The App.vue component SHALL provide a reactive `isAdmin` ref that is true when the current user has a role named `"admin"`. This ref SHALL be populated on mount by calling `getApiUserMe()`. The admin status SHALL control visibility of admin-only UI elements.

#### Scenario: Admin user sees admin features
- **WHEN** the current user has a role with `name === "admin"`
- **THEN** `isAdmin` ref equals `true`
- **THEN** admin-only UI elements (e.g., "跳转菜单" context menu item) are visible

#### Scenario: Non-admin user does not see admin features
- **WHEN** the current user has no role with `name === "admin"`
- **THEN** `isAdmin` ref equals `false`
- **THEN** admin-only UI elements are hidden

#### Scenario: Not logged in
- **WHEN** no user is logged in (no valid token)
- **THEN** `isAdmin` ref equals `false`
