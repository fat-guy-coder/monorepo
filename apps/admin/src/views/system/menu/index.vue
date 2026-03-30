<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import type { MenuItem } from "@/api/menu";
import { getApiMenus, getApiMenusId, postApiMenus, putApiMenusId, deleteApiMenusId, getApiMenusIdChildren } from "@/api/menu";

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
const treeRef = ref();
const expandedKeys = ref<string[]>([]); // 保存展开的节点

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
    const res = await getApiMenus({ project: currentProject.value, root: "true" });
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
  try {
    const res = await getApiMenus({ project: currentProject.value, flat: "true" });
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
    const res = await getApiMenusIdChildren(node.data.id);
    if (res.code === 200) {
      resolve(res.data);
    } else {
      resolve([]);
    }
  } catch (e) {
    resolve([]);
  }
}

// 保存展开的节点
function onNodeExpand(data: MenuItem) {
  if (!expandedKeys.value.includes(data.id)) {
    expandedKeys.value.push(data.id);
  }
}

// 父级菜单搜索
const parentMenuOptions = ref<MenuItem[]>([]);
const parentMenuLoading = ref(false);

async function searchParentMenus(query: string) {
  // 如果没有输入内容且没有选中的父节点，不查询
  if (!query || query.trim() === '') {
    // 如果已有选中的父节点，保留它在选项中
    if (menuForm.value.parentId) {
      // 确保选中的父节点在选项中
      if (!parentMenuOptions.value.some(item => item.id === menuForm.value.parentId)) {
        // 选项中没有，需要加载
        await loadParentMenuOption(menuForm.value.parentId);
      }
    } else {
      parentMenuOptions.value = [];
    }
    return;
  }
  parentMenuLoading.value = true;
  try {
    // 传入 search 参数，后端模糊搜索
    const res = await getApiMenus({ project: currentProject.value, flat: "true", search: query });
    if (res.code === 200) {
      // 添加"无父级"选项在最前面
      parentMenuOptions.value = [
        { id: '', name: '', label: '无父级', project: '' } as MenuItem,
        ...res.data
      ];
    }
  } catch (e) {
    // 静默失败
  } finally {
    parentMenuLoading.value = false;
  }
}

// 打开编辑对话框时，如果该节点有父节点，需要加载父节点信息
async function loadParentMenuOption(parentId: string | undefined) {
  if (!parentId) return;
  // 检查父节点是否已在选项中
  if (parentMenuOptions.value.some(item => item.id === parentId)) return;
  // 如果选项为空，先查询一次获取父节点
  const res = await getApiMenus({ project: currentProject.value, flat: "true" });
  if (res.code === 200) {
    const parent = res.data.find((menu: MenuItem) => menu.id === parentId);
    if (parent) {
      parentMenuOptions.value = [
        { id: '', name: '', label: '无父级', project: '' } as MenuItem,
        parent,
        ...parentMenuOptions.value.filter(item => item.id !== '' && item.id !== parentId)
      ];
    }
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
  allMenusFlat.value = []; // 清空搜索数据，重新按需加载
  fetchRootMenus();
}

// 打开新增对话框
async function openAddDialog(parentId?: string) {
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
  // 清空父级菜单选项
  parentMenuOptions.value = [];
  // 如果有父节点，需要加载父节点信息用于显示
  if (parentId) {
    await loadParentMenuOption(parentId);
  }
  dialogVisible.value = true;
}

// 打开编辑对话框
async function openEditDialog(row: MenuItem) {
  dialogTitle.value = "编辑菜单";
  isEdit.value = true;
  menuForm.value = { ...row };
  // 清空父级菜单选项
  parentMenuOptions.value = [];
  // 如果有父节点，需要加载父节点信息用于显示
  if (row.parentId) {
    await loadParentMenuOption(row.parentId);
  }
  dialogVisible.value = true;
}

// 提交表单
async function handleSubmit() {
  try {
    // 确保 parentId 为 null 而不是空字符串
    const submitData = {
      ...menuForm.value,
      parentId: menuForm.value.parentId || null
    };
    const res = isEdit.value
      ? await putApiMenusId(menuForm.value.id!, submitData as any)
      : await postApiMenus(submitData as any);

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? "更新成功" : "创建成功");
      dialogVisible.value = false;

      if (treeRef.value) {
        if (isEdit.value) {
          // 编辑：获取旧节点
          const node = treeRef.value.getNode(menuForm.value.id);
          if (node) {
            const oldParentId = node.parent?.data?.id;
            const newParentId = submitData.parentId;
            if (oldParentId !== newParentId) {
              // 移动了父节点
              // 保存子节点数据
              const childNodesData = node.childNodes?.map((child: any) => child.data) || [];
              // 从旧父节点移除
              treeRef.value.remove(menuForm.value.id);
              if (newParentId) {
                const newParentNode = treeRef.value.getNode(newParentId);
                if (newParentNode && newParentNode.expanded) {
                  // 根据是否有子节点决定是否带 children
                  const dataToAppend = childNodesData.length > 0
                    ? { ...res.data, children: childNodesData }
                    : { ...res.data, children: undefined };
                  treeRef.value.append(dataToAppend, newParentNode);
                }
              }
            } else {
              Object.assign(node.data, submitData);
            }
          }
        } else {
          // 新增：追加到父节点
          const parentId = submitData.parentId;
          if (parentId) {
            const parentNode = treeRef.value.getNode(parentId);
            if (parentNode && parentNode.expanded) {
              treeRef.value.append(res.data, parentNode);
            }
          } else {
            // 顶级菜单刷新根菜单
            fetchRootMenus();
          }
        }
      }
      // 刷新扁平数据（搜索和父级菜单用）
      fetchAllMenusFlat();
    } else {
      ElMessage.error(res.message || "操作失败");
    }
  } catch (e: any) {
    ElMessage.error(e?.message || "操作失败");
  }
}

// 删除菜单
async function handleDelete(row: MenuItem) {
  try {
    await ElMessageBox.confirm(`确定删除菜单 "${row.label}" 及其所有子菜单吗？`, "提示", {
      type: "warning"
    });
    const res = await deleteApiMenusId(row.id);
    if (res.code === 200) {
      ElMessage.success("删除成功");
      // 从树中移除该节点
      if (treeRef.value) {
        treeRef.value.remove(row.id);
      }
      // 刷新扁平数据（搜索和父级菜单用）
      fetchAllMenusFlat();
    } else {
      ElMessage.error(res.message || "删除失败");
    }
  } catch (e: any) {
    // 用户取消或操作失败
    if (e !== "cancel") {
      ElMessage.error(e?.message || "删除失败");
    }
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
            <el-option v-for="item in projects" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <el-input v-model="searchQuery" placeholder="搜索菜单" class="w-56" clearable :prefix-icon="Search" />

          <el-button type="primary" @click="openAddDialog()">
            新增菜单
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 菜单列表 -->
    <el-card shadow="never">
      <!-- 搜索模式：表格展示扁平结果 -->
      <el-table v-if="isSearchMode" v-loading="loading" :data="searchResults" border stripe class="w-full">
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
      <el-tree ref="treeRef" v-else v-loading="loading" :data="rootMenus"
        :props="{ label: 'label', children: 'children', isLeaf: 'isLeaf' }" node-key="id" :expand-on-click-node="false"
        :expanded-keys="expandedKeys" @node-expand="onNodeExpand" lazy :load="loadChildren" class="w-full">
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
          <span style="color: #909399; font-size: 12px;">{{ menuForm.path || '自动生成' }}</span>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menuForm.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="menuForm.order" :min="0" />
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-select
            v-model="menuForm.parentId"
            placeholder="输入搜索父级菜单"
            clearable
            filterable
            remote
            reserve-keyword
            :remote-method="searchParentMenus"
            :loading="parentMenuLoading"
            class="w-full"
          >
            <el-option v-for="item in parentMenuOptions" :key="item.id" :label="item.label" :value="item.id" />
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
