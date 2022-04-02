

/**
 * build service in mode dev
 * @param {object} apiInfo
 * @param {{params: null, body: null, headers: null}} option
 * @returns {*}
 */
const buildServiceInModeDev = function (apiInfo, option) {
    let axs = apiInfo.connection();

    return apiInfo.api(axs, option)
};


//--------------------------------------------------------------
//----- modules ------------------------------------------------
//--------------------------------------------------------------
/**
 * $service
 * @param apiInfo
 * @param {{params: ?object, body: ?object, headers: ?object}} option
 * @returns {*}
 */
const serviceModule = (apiInfo, option = {params: null, body: null, headers: null}) => {
    if (!('connection' in apiInfo) || !!!apiInfo.connection) {
        throw "not use connection in apiInfo";
    }
    if (!('api' in apiInfo) || !!!apiInfo.api) {
        throw "not use api in apiInfo";
    }


    if (process.env.NODE_ENV !== 'production') {
        if (!!apiInfo.optionValidate) {
            apiInfo.optionValidate(option)
        }
    }
    return buildServiceInModeDev.call(this, apiInfo, option);


};


const servicePlugin = {
    install(Vue) {
        Vue.mixin({
            methods: {
                /**
                 * $service
                 * @param apiInfo
                 * @param {{params: ?object, body: ?object, headers: ?object}} option
                 * @returns {*}
                 */
                $service: serviceModule
            }
        });
    }

};


export {servicePlugin, serviceModule};
