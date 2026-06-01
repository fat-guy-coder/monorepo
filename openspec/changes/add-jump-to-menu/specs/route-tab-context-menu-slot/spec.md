## ADDED Requirements

### Requirement: RouteTab context menu supports custom items via slot
The RouteTab component SHALL provide a named slot `contextMenuItems` in its right-click context menu, allowing the parent component to inject additional menu items alongside the default items (关闭左侧, 关闭右侧, 关闭其他).

#### Scenario: Parent provides custom context menu item
- **WHEN** parent component renders RouteTab with content in the `contextMenuItems` slot
- **THEN** the custom items are rendered inside the context-menu div, after the default three items

#### Scenario: Parent does not provide slot content
- **WHEN** parent component renders RouteTab without the `contextMenuItems` slot
- **THEN** only the default three context menu items are displayed (backward compatible)

#### Scenario: Custom item click emits event
- **WHEN** user clicks a custom menu item provided via slot
- **THEN** the click event is handled by the parent component's slot content, not intercepted by RouteTab
