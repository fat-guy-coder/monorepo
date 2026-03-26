<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import type { MenuItem } from "@/api/menu";
import { getRootMenus, getMenuById, createMenu, updateMenu, deleteMenu } from "@/api/menu";

defineOptions({
  name: "SystemMenu"
});

// 项目列表
const projects = [
  { label: "前端学习", value: "front_learning" },
  { label: "后台管理", value: "admin" },
  { label: "主站", value: "main" }
];

// 状态
const loading = ref(false);
const searchQuery = ref("");
const currentProject = ref("front_learning");
const allMenusFlat = ref<MenuItem[]>([]); // 扁平数据，用于搜索（按需加载）
const rootMenus = ref<MenuItem[]>([]); // 顶级菜单，用于树形
const dialogVisible = ref(false);
const dialogTitle = ref("新增菜单");
const isEdit = ref(false);
const formRef = ref();

// 表单数据
const menuForm = ref<Partial<MenuItem>>({
  name: "",
  label: "",
  path: "",
  icon: "",
  order: 0,
  parentId: undefined
});

// 加载顶级菜单（用于树形）
async function fetchRootMenus() {
  loading.value = true;
  try {
    const res = await getRootMenus({ root: "true" });
    if (res.code === 200) {
      rootMenus.value = res.data;
    } else {
      ElMessage.error(res.message || "获取菜单失败");
    }
  } catch (e) {
    ElMessage.error("获取菜单失败");
  } finally {
    loading.value = false;
  }
}

// 加载所有菜单扁平数据（用于搜索，按需加载）
async function fetchAllMenusFlat() {
  if (allMenusFlat.value.length > 0) return; // 已有数据，不再请求
  try {
    const res = await getRootMenus({ flat: "true" });
    if (res.code === 200) {
      allMenusFlat.value = res.data;
    }
  } catch (e) {
    // 静默失败
  }
}

// 懒加载子菜单
async function loadChildren(node: any, resolve: (data: MenuItem[]) => void) {
  // 如果没有有效的 node.data.id，返回空
  if (!node || !node.data || !node.data.id) {
    resolve([]);
    return;
  }
  try {
    const res = await getMenuById(node.data.id);
    if (res.code === 200) {
      const children = res.data.map((item: MenuItem) => ({
        ...item,
        children: undefined
      }));
      resolve(children);
    } else {
      resolve([]);
    }
  } catch (e) {
    resolve([]);
  }
}

// 递归过滤（用于扁平数据搜索）
function filterMenus(menus: MenuItem[], query: string): MenuItem[] {
  const lowerQuery = query.toLowerCase();
  return menus.filter(menu =>
    menu.label.toLowerCase().includes(lowerQuery) ||
    menu.name.toLowerCase().includes(lowerQuery)
  );
}

// 搜索模式
const isSearchMode = computed(() => searchQuery.value.trim().length > 0);

// 搜索结果（触发按需加载）
const searchResults = computed(() => {
  if (isSearchMode.value) {
    fetchAllMenusFlat(); // 按需加载搜索数据
  }
  if (!isSearchMode.value) return [];
  return filterMenus(allMenusFlat.value, searchQuery.value);
});

// 项目切换
function handleProjectChange() {
  searchQuery.value = "";
  fetchRootMenus();
  fetchAllMenusFlat();
}

// 打开新增对话框
function openAddDialog(parentId?: string) {
  dialogTitle.value = "新增菜单";
  isEdit.value = false;
  menuForm.value = {
    name: "",
    label: "",
    path: "",
    icon: "",
    order: 0,
    parentId: parentId || undefined
  };
  dialogVisible.value = true;
}

// 打开编辑对话框
function openEditDialog(row: MenuItem) {
  dialogTitle.value = "编辑菜单";
  isEdit.value = true;
  menuForm.value = { ...row };
  dialogVisible.value = true;
}

// 提交表单
async function handleSubmit() {
  try {
    const res = isEdit.value
      ? await updateMenu(menuForm.value.id!, menuForm.value)
      : await createMenu(menuForm.value);

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? "更新成功" : "创建成功");
      dialogVisible.value = false;
      fetchRootMenus();
      fetchAllMenusFlat();
    } else {
      ElMessage.error(res.message || "操作失败");
    }
  } catch (e) {
    ElMessage.error("操作失败");
  }
}

// 删除菜单
async function handleDelete(row: MenuItem) {
  try {
    await ElMessageBox.confirm(`确定删除菜单 "${row.label}" 及其所有子菜单吗？`, "提示", {
      type: "warning"
    });
    const res = await deleteMenu(row.id);
    if (res.code === 200) {
      ElMessage.success("删除成功");
      fetchRootMenus();
      fetchAllMenusFlat();
    } else {
      ElMessage.error(res.message || "删除失败");
    }
  } catch (e) {
    // 用户取消
  }
}

onMounted(() => {
  fetchRootMenus();
});
</script>

<template>
  <div class="p-4">
    <!-- 顶部搜索和工具栏 -->
    <div class="mb-4">
      <el-card shadow="never">
        <div class="flex flex-wrap gap-4 items-center">
          <el-select v-model="currentProject" @change="handleProjectChange" class="w-40">
            <el-option
              v-for="item in projects"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-input
            v-model="searchQuery"
            placeholder="搜索菜单"
            class="w-56"
            clearable
            :prefix-icon="Search"
          />

          <el-button type="primary" @click="openAddDialog()">
            新增菜单
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 菜单列表 -->
    <el-card shadow="never">
      <!-- 搜索模式：表格展示扁平结果 -->
      <el-table
        v-if="isSearchMode"
        v-loading="loading"
        :data="searchResults"
        border
        stripe
        class="w-full"
      >
        <el-table-column prop="label" label="菜单名称" min-width="120" />
        <el-table-column prop="name" label="路由名称" min-width="120" />
        <el-table-column prop="order" label="排序" width="80" align="center" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <div class="flex gap-2">
              <el-button size="small" type="primary" link @click="openAddDialog(row.id)">
                添加
              </el-button>
              <el-button size="small" type="primary" link @click="openEditDialog(row)">
                编辑
              </el-button>
              <el-button size="small" type="danger" link @click="handleDelete(row)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 树形懒加载模式 -->
      <el-tree
        v-else
        v-loading="loading"
        :data="rootMenus"
        :props="{ label: 'label', children: 'children', hasChildren: 'hasChildren' }"
        node-key="id"
        :expand-on-click-node="false"
        :expand-first-node-only="true"
        lazy
        :load="loadChildren"
        class="w-full"
      >
        <template #default="{ data }">
          <span class="flex items-center justify-between w-full">
            <span class="font-medium">{{ data.label }}</span>
            <span class="flex items-center gap-2">
              <span class="text-xs text-gray-400">{{ data.name }}</span>
              <el-button size="small" type="primary" link @click.stop="openAddDialog(data.id)">
                添加
              </el-button>
              <el-button size="small" type="primary" link @click.stop="openEditDialog(data)">
                编辑
              </el-button>
              <el-button size="small" type="danger" link @click.stop="handleDelete(data)">
                删除
              </el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="450px">
      <el-form ref="formRef" :model="menuForm" label-width="80px">
        <el-form-item label="菜单名称" required>
          <el-input v-model="menuForm.label" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="路由名称" required>
          <el-input v-model="menuForm.name" placeholder="请输入路由名称" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="menuForm.path" placeholder="请输入路径" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menuForm.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="menuForm.order" :min="0" />
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-select v-model="menuForm.parentId" placeholder="请选择" clearable class="w-full">
            <el-option
              v-for="item in parentMenuOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
