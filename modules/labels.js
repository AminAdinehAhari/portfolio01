import labels from "../consts/labels";


const labelsModule = {

    /**
     * get label value
     * @param {string} key
     * @returns {string|*}
     */
    getLabel(key) {
        if (!!labels && key in labels)
            return labels[key];
        else
            return "";
    },

};


const labelsPlugin = {
    install(Vue, options) {
        Vue.mixin({
            methods: labelsModule
        });
    },
};


export {labelsModule,labelsPlugin};
