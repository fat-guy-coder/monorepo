import { createVNode, render, reactive, type VNode, type CSSProperties } from 'vue';
import MessageComponent from './index.vue';


type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface MessageOptions {
  type?: MessageType;
  content?: string;
  duration?: number;
  onClose?: () => void;
  style?: CSSProperties;
  key?: string;
}

interface MessageInstance {
  id: string;
  vnode: VNode;
  vm: any; // Component public instance
  props: any;
  top: number;
}

const instances: MessageInstance[] = reactive([]);
let seed = 1;
let messageContainer: HTMLDivElement | null = null;

const createMessageContainer = () => {
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    document.body.appendChild(messageContainer);
  }
};

const message = (options: MessageOptions | string): MessageInstance => {
  createMessageContainer();

  if (typeof options === 'string') {
    options = { content: options };
  }

  const id = `message_${seed++}`;
  const userOnClose = options.onClose;

  let topOffset = options.style?.top ? parseFloat(options.style.top as string) : 20;
  instances.forEach(instance => {
    topOffset += (instance.vnode.el?.offsetHeight || 0) + 16; // 16px gap
  });

  const props = {
    ...options,
    id,
    top: topOffset,
    onClose: () => {
      close(id, userOnClose);
    },
    onDestroy: () => {
        const idx = instances.findIndex(inst => inst.id === id);
        if (idx !== -1) {
            const instance = instances[idx];
            if (instance.vnode.el) {
                render(null, instance.vnode.el.parentElement as Element);
            }
            instances.splice(idx, 1);
            recalculatePositions();
        }
    },
  };

  const vnode = createVNode(MessageComponent, props);
  const container = document.createElement('div');
  render(vnode, container);
  if (container.firstElementChild) {
    messageContainer!.appendChild(container.firstElementChild);
  }


  const instance = {
    id,
    vnode,
    vm: vnode.component!,
    props: vnode.props,
    top: topOffset,
  };

  instances.push(instance);
  return instance;
};

const close = (id: string, userOnClose?: () => void) => {
  const idx = instances.findIndex(inst => inst.id === id);
  if (idx === -1) return;

  const instance = instances[idx];

  if (userOnClose) {
    userOnClose();
  }

  if (instance.vm.exposed) {
    instance.vm.exposed.close();
  }
};

const recalculatePositions = () => {
  let topOffset = 20;
  instances.forEach(instance => {
    instance.top = topOffset;
    if (instance.vm.props) {
        instance.vm.props.top = topOffset;
    }
    topOffset += (instance.vnode.el?.offsetHeight || 0) + 16;
  });
};


(['success', 'warning', 'info', 'error'] as MessageType[]).forEach(type => {
  (message as any)[type] = (options: string | MessageOptions) => {
    if (typeof options === 'string') {
      return message({ type, content: options });
    }
    return message({ type, ...options });
  };
});


interface MessageApi extends Function {
    (options: MessageOptions | string): MessageInstance;
    success: (options: string | MessageOptions) => MessageInstance;
    warning: (options: string | MessageOptions) => MessageInstance;
    info: (options: string | MessageOptions) => MessageInstance;
    error: (options: string | MessageOptions) => MessageInstance;
}

export default message as MessageApi;
