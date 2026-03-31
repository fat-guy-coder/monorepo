export interface BaseItem {
    id: string | number
  }
  
  export interface IListItem extends BaseItem {
    label: string
    value: string | number
  }
  
  // --- 类型定义 ---
  export interface IPlan extends BaseItem { id: string; type?: 'plan';time: string; name: string; desc: string }
  export interface ISmallCard extends BaseItem { id: string; type?: 'small-card'; title: string; items: string[] }
  export interface ITodo extends BaseItem { id: string; type?: 'todo'; label: string; completed: boolean }
  export interface ILink extends BaseItem { id: string; type?: 'link'; label: string; href: string; target?: string }
  export interface ITag extends BaseItem { id: string; type?: 'tag'; label: string; href: string }
  export interface IProgress extends BaseItem { id: string; type?: 'progress'; label: string; value: number }
  export interface ITip extends BaseItem { id: string; type?: 'tip'; text: string }
  
  export type ListItem = string | IListItem | ITodo | ILink | IPlan | IProgress | ITip| ISmallCard | ITag

  