import { h } from 'vue';
export var useWorker = function () {
    var worker = new Worker(new URL('./worker.ts', import.meta.url));
    import('@/menu/menu.json').then(function (e) {
        worker.postMessage({ menu: e.default, render: h.toString() });
    });
    return { worker: worker, postMessage: worker.postMessage, onmessage: worker.onmessage };
};
