import { defineEmits } from 'vue';
export var usePushByName = function (value) {
    if (!value)
        return;
    var emit = defineEmits(['goToByRouteName']);
    emit('goToByRouteName', value);
    return {
        emit: emit
    };
};
