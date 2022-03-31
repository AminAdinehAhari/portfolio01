
import configs from "../consts/configs";


const configsModule = {
    /**
     * get config value
     * @param {string} key
     * @returns {string|*}
     */
    getConfig(key){
        if (key in configs)
            return configs[key];
        else
            return "";
    }
};


const configsPlugin = {
    install(Vue, options) {
        Vue.mixin({
            methods: configsModule
        });
    },
};



export {configsModule , configsPlugin};
