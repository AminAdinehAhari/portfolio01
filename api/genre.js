import defaultConnection from "../connections/defaultConnection";
import {configsModule} from "../modules/configs";


//---------------------------------------------------------------
// GenreMovieList Service   -------------------------------------
//---------------------------------------------------------------
const genreMovieList = {

    path: "movie/discoverMovie",

    connection: defaultConnection,

    /**
     * Get the list of official genres for movies.
     * @param axios
     * @param option
     * @returns {*}
     */
    api: (axios, option={}) => {

        let params = {
            "api_key":configsModule.getConfig("SERVICE_API_KEY_V3"),
            "language":"en-US",
        };

        return axios.get(`/3/genre/movie/list`,{params:{...params}});
    },

};




export {
    genreMovieList
}
