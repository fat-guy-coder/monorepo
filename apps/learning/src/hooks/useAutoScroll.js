import { message } from "components";
import { useTabStore } from "@/stores/tab";
export function useAutoScroll(to) {
    var tabList = useTabStore().tabList;
    var mainView = document.querySelector('#mainView');
    var tab = tabList.find(function (i) { return i.name === to.name; }) || null;
    if (tab && (tab === null || tab === void 0 ? void 0 : tab.scrollTop)) {
        if ((tab === null || tab === void 0 ? void 0 : tab.scrollTop) > 3000) {
            message.info({
                content: '页面过长，自动滚动至历史位置',
                duration: 1,
                key: 'autoScroll',
            });
            var timer_1 = setTimeout(function () {
                try {
                    mainView === null || mainView === void 0 ? void 0 : mainView.scrollTo({ top: tab === null || tab === void 0 ? void 0 : tab.scrollTop, behavior: 'smooth' });
                }
                catch (error) {
                    console.error(error);
                }
                clearTimeout(timer_1);
                mainView = null;
            }, 300);
            return;
        }
        mainView === null || mainView === void 0 ? void 0 : mainView.scrollTo({ top: tab === null || tab === void 0 ? void 0 : tab.scrollTop });
        mainView = null;
        return;
    }
    if ((mainView === null || mainView === void 0 ? void 0 : mainView.scrollTop) !== 0) {
        mainView === null || mainView === void 0 ? void 0 : mainView.scrollTo({ top: 0 });
        mainView = null;
    }
    tab = null;
}
