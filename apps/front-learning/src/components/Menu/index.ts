export interface MenuItem {
    id: string;
    name: string;
    label: string;
    path: string;
    icon?: string;
    hasChildren?: boolean;
    children?: MenuItem[];
    [key: string]: unknown;
}


export type MenuMode = 'inline' | 'vertical';

