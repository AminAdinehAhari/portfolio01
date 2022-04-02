console.log(process.env);

const configs = {
    SERVICE_BASE_URL : process.env.BASE_URL,
    SERVICE_IMAGE_URL : process.env.IMAGE_URL,
    SERVICE_API_KEY_V3 : process.env.API_KEY_V3,
    SERVICE_API_KEY_V4 : process.env.API_KEY_V4,
    SERVICE_DEFAULT_TIME_OUT : 100000

};




export default configs;
