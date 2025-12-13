export interface CascaderOption {
  label: string;
  value: any;
  disabled?: boolean;
  children?: CascaderOption[];
  // Allow any other properties
  [key: string]: any;
}
