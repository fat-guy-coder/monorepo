# API 生成脚本 (`gen-api`)

该脚本根据后端的 OpenAPI v3 `swagger.yaml` 规范，自动生成前端 API 客户端文件 (`.ts`)。

---

##  运行模式

脚本支持两种主要运行模式：

1.  **默认（所有模块）**：扫描指定目录下的所有 `*/swagger.yaml` 文件，并为每个文件生成对应的 API 客户端。
2.  **单个模块**：仅为指定的单个模块生成 API 客户端。

---

## 使用方法

推荐通过 `package.json` 中定义的 npm 脚本来运行此脚本。

### 1. 生成所有 API 客户端

这是默认模式。它会扫描 `server/api/v2/` 目录下所有包含 `swagger.yaml` 文件的模块，并在 `ui2/src/api/` 目录中生成相应的 `.ts` 文件。

```bash
pnpm gen:api
```

### 2. 生成单个 API 模块

使用 `--module` 标志来指定要生成的模块。请注意，当使用 `pnpm` 时，你需要使用 `--` 来向底层脚本传递参数。

```bash
# 使用 pnpm 传递参数的正确方式
pnpm gen:api -- --module permission
```

此命令将仅处理 `server/api/v2/permission/swagger.yaml` 文件，并生成 `ui2/src/api/permission.ts`。

---

## 命令行参数

| 参数 | 描述 | 示例 |
|:---|:---|:---|
| `--apiV2Dir <dir>` | 扫描包含 `swagger.yaml` 文件的模块目录。 | `../server/api/v2` (默认) |
| `--outDir <dir>` | 生成的 `.ts` 文件的输出目录。 | `src/api` (默认) |
| `--module <name>` | 仅为特定模块生成（`apiV2Dir` 下的文件夹名称）。 | `permission` |
| `--swagger <path>` | 从指定的 `swagger.yaml` 文件生成。此选项会覆盖 `--module`。 | `../server/api/v2/user/swagger.yaml` |
| `--outFile <file>` | 指定输出文件名。此选项会覆盖默认的 `<module>.ts`。 | `user-api.ts` |
| `--serverBase <base>` | 覆盖 API 的基础路径。如果未提供，则从 swagger 文件的 `servers[0].url` 中读取。 | `/api/v2` |

### 高级用法示例

从一个特定的 swagger 文件生成 API 客户端，将其命名为 `perms.ts`，并放置在 `src/generated/api` 目录中：

```bash
pnpm gen:api -- --swagger ../server/api/v2/permission/swagger.yaml --outDir src/generated/api --outFile perms.ts
```
