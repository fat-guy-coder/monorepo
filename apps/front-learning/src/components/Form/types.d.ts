// 验证规则类型
export interface Rule {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    validator?: (value: any, rule: Rule) => Promise<void> | void;
    trigger?: 'change' | 'blur' | ['change', 'blur'];
    min?: number;
    max?: number;
    len?: number;
    type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url';
    whitespace?: boolean;
    transform?: (value: any) => any;
  }
  
  // 字段配置
  export interface FieldConfig {
    value?: any;
    rules?: Rule[];
    validateTrigger?: string | string[];
  }
  
  // 表单配置
  export interface FormConfig {
    model?: Record<string, any>;
    rules?: Record<string, Rule[]>;
    validateTrigger?: string | string[];
    labelWidth?: number | string;
    labelPosition?: 'left' | 'right' | 'top';
    size?: 'small' | 'default' | 'large';
  }
  
  // 校验错误
  export interface ValidateError {
    field: string;
    message: string;
    value: any;
  }
  
  // useForm 返回值
  export interface FormInstance {
    model: Reactive<Record<string, any>>;
    rules: Reactive<Record<string, Rule[]>>;
    validate: (fields?: string | string[]) => Promise<any>;
    validateField: (field: string) => Promise<void>;
    resetFields: (fields?: string | string[]) => void;
    clearValidate: (fields?: string | string[]) => void;
    scrollToField: (field: string) => void;
    getFieldValue: (field: string) => any;
    setFieldValue: (field: string, value: any) => void;
    getFieldsValue: (fields?: string[]) => Record<string, any>;
    setFieldsValue: (values: Record<string, any>) => void;
    setFieldsDisabled: (fieldNames: string[], disabled: boolean) => void;
    isFieldDisabled: (fieldName: string) => boolean;
    submit: (callback?: (values: any) => void) => Promise<any>;
  }


  export interface FormContext {
    model: Reactive<Record<string, any>>;
    rules: Reactive<Record<string, Rule[]>>;
    disabled: ComputedRef<boolean>;
    size: ComputedRef<'small' | 'default' | 'large'>;
    labelWidth: ComputedRef<number | string>;
    labelPosition: ComputedRef<'left' | 'right' | 'top'>;
    colon: ComputedRef<boolean>;
    hideRequiredMark: ComputedRef<boolean>;
    registerField: (name: string, field: any) => void;
    unregisterField: (name: string) => void;
    validateField: (name: string) => Promise<void>;
    setFieldValue: (name: string, value: any) => void;
    getFieldValue: (name: string) => any;
    validateTrigger: ComputedRef<string | string[]>;
    validateErrors: Record<string, string>;
    isFieldDisabled: (name: string) => boolean;
    setFieldsDisabled?: (fieldNames: string[], disabled: boolean) => void;
    disabledFields?: ComputedRef<Set<string>>;
  }

  export interface FormItemContext {
    handleFieldEvent: (event: 'change' | 'blur') => void;
    disabled: ComputedRef<boolean>;
  }