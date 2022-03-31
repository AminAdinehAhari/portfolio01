import texts from "../consts/texts";
import {labelsModule} from "./labels";


const textsModule =  {
    /**
     * get text by custom labels
     * @param {string} key
     * @param {object} label - {field : 'text|:label'}
     * @param {function} wrapper
     * @returns {*}
     */
    getText(key,label={},wrapper=(x,k)=>x){

        let text = "";
        if (!!texts && key in texts)
            text = texts[key];
        else
            text = "";

        for (let i in label){
            let reg = new RegExp(`:${i}`,'g');
            if (label[i][0] == ":"){
                let lb = label[i].substr(1);
                text = text.replace(reg,wrapper(labelsModule.getLabel(lb),lb));
            }else{
                text = text.replace(reg,wrapper(labelsModule.getLabel(i),i));
            }
        }
        return text;


    },


};




const textsPlugin = {
    install(Vue, options) {
        Vue.mixin({
            methods:textsModule
        });
    },
};





export {
    textsModule,
    textsPlugin
};
