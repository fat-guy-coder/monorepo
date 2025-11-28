import { createVNode, render, reactive, type VNode, type CSSProperties } from 'vue';
import MessageComponent from './index.vue';


type MessageType = 'info' | 'success' | 'warning' | 'error';

interface MessageOptions {
  type?: MessageType;
  content?: string;
  duration?: number;
  onClose?: () => void;
  style?: CSSProperties;
  topOffset?: number;
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

  let topOffset = options.topOffset || parseFloat(options.style?.top as string) || 200; // Initial top offset
  instances.forEach(instance => {
    topOffset += instance.vnode.el!.offsetHeight + 16; // 16px gap
  });

  const props = {
    ...options,
    id,
    top: topOffset,
    onClose: () => {
      close(id, userOnClose);
    },
    onDestroy: () => {
      // This will be called by the component when it's fully gone
      const idx = instances.findIndex(inst => inst.id === id);
      if (idx !== -1) {
        render(null, instances[idx].vnode.el!.parentElement!)
        instances.splice(idx, 1);
        recalculatePositions();
      }
    },
  };

  const vnode = createVNode(MessageComponent, props);
  const container = document.createElement('div');
  render(vnode, container);
  messageContainer!.appendChild(container.firstElementChild!);

  const instance = {
    id,
    type: options.type,
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
  const removedHeight = instance.vnode.el!.offsetHeight;
  instances.splice(idx, 1);

  // Recalculate positions for remaining messages
  recalculatePositions();

  if (userOnClose) {
    userOnClose();
  }

  // Let the component handle its own destruction animation
  if (instance.vm.exposed) {
    instance.vm.exposed.close();
  }
};

const recalculatePositions = () => {
  let topOffset = 20;
  instances.forEach(instance => {
    instance.top = topOffset;
    instance.vm.props.top = topOffset;
    topOffset += instance.vnode.el!.offsetHeight + 16;
  });
};

// Add helper methods
(['success', 'warning', 'info', 'error'] as MessageType[]).forEach(type => {
  message[type as MessageType] = (content: string, duration?: number) => {
    return message({ type, content, duration });
  };
});

export default message as unknown as typeof message & {
  success: (content: string, duration?: number) => MessageInstance;
  warning: (content: string, duration?: number) => MessageInstance;
  info: (content: string, duration?: number) => MessageInstance;
  error: (content: string, duration?: number) => MessageInstance;
};
