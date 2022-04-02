import configs from "../consts/configs";
import Axios from "Axios";

const option = ()=>{
    return{
        baseURL: configs.SERVICE_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: false,
        timeout: configs.SERVICE_DEFAULT_TIME_OUT,
    }
};


const defaultConnection = ()=>{
    return Axios.create(option())
};

export {
    option,

}



export default defaultConnection;

