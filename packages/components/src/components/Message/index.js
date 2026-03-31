var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createVNode, render, reactive } from 'vue';
import MessageComponent from './index.vue';
var instances = reactive([]);
var seed = 1;
var messageContainer = null;
var createMessageContainer = function () {
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.body.appendChild(messageContainer);
    }
};
var message = function (options) {
    var _a;
    createMessageContainer();
    if (typeof options === 'string') {
        options = { content: options };
    }
    var id = "message_".concat(seed++);
    var userOnClose = options.onClose;
    var topOffset = ((_a = options.style) === null || _a === void 0 ? void 0 : _a.top) ? parseFloat(options.style.top) : 20;
    instances.forEach(function (instance) {
        var _a;
        topOffset += (((_a = instance.vnode.el) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0) + 16; // 16px gap
    });
    var props = __assign(__assign({}, options), { id: id, top: topOffset, onClose: function () {
            close(id, userOnClose);
        }, onDestroy: function () {
            var idx = instances.findIndex(function (inst) { return inst.id === id; });
            if (idx !== -1) {
                var instance_1 = instances[idx];
                if (instance_1.vnode.el) {
                    render(null, instance_1.vnode.el.parentElement);
                }
                instances.splice(idx, 1);
                recalculatePositions();
            }
        } });
    var vnode = createVNode(MessageComponent, props);
    var container = document.createElement('div');
    render(vnode, container);
    if (container.firstElementChild) {
        messageContainer.appendChild(container.firstElementChild);
    }
    var instance = {
        id: id,
        vnode: vnode,
        vm: vnode.component,
        props: vnode.props,
        top: topOffset,
    };
    instances.push(instance);
    return instance;
};
var close = function (id, userOnClose) {
    var idx = instances.findIndex(function (inst) { return inst.id === id; });
    if (idx === -1)
        return;
    var instance = instances[idx];
    if (userOnClose) {
        userOnClose();
    }
    if (instance.vm.exposed) {
        instance.vm.exposed.close();
    }
};
var recalculatePositions = function () {
    var topOffset = 20;
    instances.forEach(function (instance) {
        var _a;
        instance.top = topOffset;
        if (instance.vm.props) {
            instance.vm.props.top = topOffset;
        }
        topOffset += (((_a = instance.vnode.el) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0) + 16;
    });
};
['success', 'warning', 'info', 'error'].forEach(function (type) {
    message[type] = function (options) {
        if (typeof options === 'string') {
            return message({ type: type, content: options });
        }
        return message(__assign({ type: type }, options));
    };
});
export default message;
