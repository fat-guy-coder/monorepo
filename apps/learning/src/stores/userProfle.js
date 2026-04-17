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
import { ref } from 'vue';
import { defineStore } from 'pinia';
export var useUserStore = defineStore('user', function () {
    var user = ref({
        name: 'Guest',
        email: '',
        process: [],
    });
    function setUser(userParams) {
        user.value = __assign(__assign({}, user.value), userParams);
    }
    function setProcess(process) {
        user.value.process = process;
    }
    return { user: user, setUser: setUser, setProcess: setProcess };
});
