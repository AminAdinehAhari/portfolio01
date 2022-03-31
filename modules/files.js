import files from "../consts/files";


const filesModule = {
    /**
     * get file route
     * @param {string} key
     * @returns {null|*}
     */
    getFile(key){
        if (key in files)
            return files[key];
        else
            return null;
    }
};



const filesPlugin = {
    install(Vue, options) {
        Vue.mixin({
            methods: filesModule
        });
    },
};




export {filesModule,filesPlugin};
