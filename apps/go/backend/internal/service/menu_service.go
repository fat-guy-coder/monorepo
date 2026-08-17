// service 包 — 业务逻辑层
//
// 第 1 阶段：业务逻辑很薄，主要是透传 + 构建树
// 第 4 阶段：在这里加权限判断、参数校验、事务等
//
// 对照学习：go-1-13-methods-interfaces.vue（接口抽象，为第 4 阶段做准备）
package service

import (
	"github.com/monorepo/go/backend/internal/model"
	"github.com/monorepo/go/backend/internal/repository"
)

// MenuService 组合 repository，对外暴露业务方法
type MenuService struct {
	repo *repository.MenuRepository
}

// NewMenuService 构造函数
func NewMenuService(repo *repository.MenuRepository) *MenuService {
	return &MenuService{repo: repo}
}

// ListMenus 获取菜单列表，支持 flat / tree 两种返回
// flat=true 返回扁平列表，否则返回树形（和 Bun backend 的 ?flat=true 一致）
func (s *MenuService) ListMenus(project string, tree bool) any {
	if tree {
		return s.repo.BuildTree(project)
	}
	return s.repo.List(project)
}

// GetMenu 查单个
func (s *MenuService) GetMenu(id string) (*model.Menu, bool) {
	return s.repo.Get(id)
}

// CreateMenu 新增
func (s *MenuService) CreateMenu(name, label string, parentID *string, order int, project string) *model.Menu {
	if project == "" {
		project = "learning"
	}
	return s.repo.Create(name, label, parentID, order, project)
}

// UpdateMenu 更新
func (s *MenuService) UpdateMenu(id string, label *string, order *int) (*model.Menu, bool) {
	return s.repo.Update(id, label, order)
}

// DeleteMenu 删除
func (s *MenuService) DeleteMenu(id string) bool {
	return s.repo.Delete(id)
}
