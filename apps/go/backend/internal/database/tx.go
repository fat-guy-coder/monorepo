// database 包 — 事务示例（ACID）
//
// 对照学习：
//   go-4-8-transactions（事务：Begin / Commit / Rollback / defer Rollback 兜底模式）
//   go-4-3-crud-basics（Exec + RowsAffected 判断影响行数）
//   核心模式：Begin → 一组操作 → 全成功 Commit / 任一失败 defer Rollback
package database

import (
	"database/sql"
	"errors"
	"fmt"
)

// TransferBalance 转账事务演示：扣款 + 入账必须同时成功或同时失败
//
// 需要的表（纯演示用，真实 backend 的菜单批量创建在 repository.CreateBatch 里用事务）：
//
//	CREATE TABLE account (
//	    id      text PRIMARY KEY,
//	    balance integer NOT NULL DEFAULT 0
//	);
//
// ACID 四个保证：
//   - 原子性：要么两步都成功，要么都回滚，不会出现「只扣不入」
//   - 一致性：钱不增不减（扣多少入多少，总量守恒）
//   - 隔离性：事务期间其他连接看不到中间状态
//   - 持久性：Commit 后数据真正落盘
func TransferBalance(db *sql.DB, fromID, toID string, amount int) error {
	if amount <= 0 {
		return errors.New("转账金额必须为正")
	}

	tx, err := db.Begin()
	if err != nil {
		return fmt.Errorf("开启事务失败: %w", err)
	}
	defer tx.Rollback() // 兜底：只要没 Commit 就回滚；Commit 成功后再 Rollback 返回 ErrTxDone（无害）

	// 扣款：WHERE balance >= $1 是「乐观锁」——余额不足时影响 0 行，可及时发现
	res, err := tx.Exec(`UPDATE account SET balance = balance - $1 WHERE id = $2 AND balance >= $1`, amount, fromID)
	if err != nil {
		return fmt.Errorf("扣款失败: %w", err)
	}
	affected, _ := res.RowsAffected()
	if affected == 0 {
		return errors.New("余额不足")
	}

	// 入账
	if _, err := tx.Exec(`UPDATE account SET balance = balance + $1 WHERE id = $2`, amount, toID); err != nil {
		return fmt.Errorf("入账失败: %w", err)
	}

	// 全部成功才提交（一旦到这里，defer Rollback 就是空操作了）
	return tx.Commit()
}
