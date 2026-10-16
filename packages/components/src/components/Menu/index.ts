export interface MenuItem {
    id: string;
    name: string;
    label: string;
    path: string;
    icon?: string;
    hasChildren?: boolean;
    isLeaf?: boolean;
    children?: MenuItem[];
    /** 建议学习时长（分钟），0/缺省 = 未设置 */
    suggestedMinutes?: number;
    /** 已学习时长（分钟，非叶子 = 子树总和） */
    studiedMinutes?: number;
    [key: string]: unknown;
}


export type MenuMode = 'inline' | 'vertical';

