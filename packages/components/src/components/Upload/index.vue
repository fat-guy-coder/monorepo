<template>
  <div class="upload-wrapper">
    <div
      class="upload-trigger"
      :class="{ 'is-dragover': isDragOver, 'is-disabled': disabled }"
      @click="handleClick"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input
        ref="inputRef"
        type="file"
        class="upload-input"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="handleFileChange"
      />
      <slot>
        <div class="default-trigger">
          <span class="upload-icon">📤</span>
          <span class="upload-text">点击或拖拽文件到此区域上传</span>
        </div>
      </slot>
    </div>
    <div v-if="$slots.tip" class="upload-tip">
      <slot name="tip"></slot>
    </div>
    <ul v-if="fileList.length > 0" class="upload-file-list">
      <li v-for="file in fileList" :key="file.uid" class="file-item" :class="`status--${file.status}`">
        <div class="file-info">
          <span class="file-name">📄 {{ file.name }}</span>
          <span v-if="file.status === 'uploading'" class="file-progress">{{ file.percentage }}%</span>
        </div>
        <div v-if="file.status === 'uploading'" class="progress-bar">
          <div class="progress-bar-inner" :style="{ width: `${file.percentage}%` }"></div>
        </div>
        <button class="remove-btn" @click="handleRemove(file)">×</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface UploadFile {
  uid: number;
  name: string;
  size: number;
  type: string;
  percentage?: number;
  status: 'ready' | 'uploading' | 'success' | 'error';
  raw: File;
  response?: any;
}

const props = withDefaults(defineProps<{
  action: string;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
}>(), {
  multiple: false,
  disabled: false,
});

const emit = defineEmits<{ 
  (e: 'change', file: UploadFile, fileList: UploadFile[]): void;
  (e: 'success', response: any, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'error', error: any, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'progress', event: ProgressEvent, file: UploadFile, fileList: UploadFile[]): void;
  (e: 'remove', file: UploadFile, fileList: UploadFile[]): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);
const fileList = ref<UploadFile[]>([]);

const handleClick = () => {
  if (props.disabled) return;
  inputRef.value?.click();
};

const handleDragOver = () => {
  if (props.disabled) return;
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (e: DragEvent) => {
  if (props.disabled) return;
  isDragOver.value = false;
  const files = e.dataTransfer?.files;
  if (files) {
    uploadFiles(files);
  }
};

const handleFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    uploadFiles(files);
  }
};

const uploadFiles = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i];
    const uploadFile: UploadFile = {
      uid: Date.now() + i,
      name: rawFile.name,
      size: rawFile.size,
      type: rawFile.type,
      status: 'ready',
      raw: rawFile,
    };
    fileList.value.push(uploadFile);
    emit('change', uploadFile, fileList.value);
    post(uploadFile);
  }
};

const post = (file: UploadFile) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('file', file.raw);

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      file.status = 'uploading';
      file.percentage = Math.round((e.loaded / e.total) * 100);
      emit('progress', e, file, fileList.value);
    }
  };

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      file.status = 'success';
      file.response = JSON.parse(xhr.responseText);
      emit('success', file.response, file, fileList.value);
    } else {
      file.status = 'error';
      emit('error', new Error(xhr.statusText), file, fileList.value);
    }
  };

  xhr.onerror = (e) => {
    file.status = 'error';
    emit('error', e, file, fileList.value);
  };

  xhr.open('POST', props.action, true);
  xhr.send(formData);
};

const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex(f => f.uid === file.uid);
  if (index > -1) {
    fileList.value.splice(index, 1);
    emit('remove', file, fileList.value);
  }
};

</script>

<style lang="less" scoped>
.upload-wrapper {
  width: 100%;
}

.upload-trigger {
  border: 2px dashed var(--color-border);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &.is-dragover {
    border-color: var(--color-primary);
    background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.upload-input {
  display: none;
}

.default-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
}

.upload-icon {
  font-size: 2.5rem;
}

.upload-text {
  font-size: 0.9rem;
}

.upload-tip {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--color-text-tertiary);
}

.upload-file-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background-soft);
  margin-bottom: 0.5rem;
  transition: background-color 0.3s;

  &.status--success {
    background-color: color-mix(in srgb, var(--color-success) 15%, transparent);
  }
  &.status--error {
    background-color: color-mix(in srgb, var(--color-error) 15%, transparent);
    .file-name { color: var(--color-error); }
  }
}

.file-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.file-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-progress {
  font-size: 0.8rem;
  color: var(--color-primary);
}

.progress-bar {
  flex: 1;
  height: 4px;
  background-color: var(--color-fill-tertiary);
  border-radius: 2px;
  margin: 0 1rem;
}

.progress-bar-inner {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  
  &:hover {
    color: var(--color-error);
  }
}
</style>
