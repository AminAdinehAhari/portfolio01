import defaultConnection from "../connections/defaultConnection";
import {configsModule} from "../modules/configs";


//---------------------------------------------------------------
// Discover Movie Service   -------------------------------------
//---------------------------------------------------------------
const discoverMovie = {

    path: "movie/discoverMovie",

    connection: defaultConnection,

    /**
     * Discover movies by different types of data like average rating, number of votes, genres and certifications.
     * @param axios
     * @param {{params: {page:?number,release_date.gte : ?string}}} option
     * @returns {*}
     */
    api: (axios, option) => {

        let params = {
            "api_key":configsModule.getConfig("SERVICE_API_KEY_V3"),
            "language":"en-US",
            "sort_by":"popularity.desc",
            "include_adult":false,
            "include_video":false,
            "page":1,
            "with_watch_monetization_types":"flatrate"
        };

        return axios.get(`/3/discover/movie`,{params:{...params,...option.params}});
    },

};



//---------------------------------------------------------------
// Detail Movie Service   ---------------------------------------
//---------------------------------------------------------------
const detailMovie = {

    path: "movie/detailMovie",

    connection: defaultConnection,

    /**
     * Get the primary information about a movie.
     * @param axios
     * @param {{route: {id: number}}} option
     * @returns {*}
     */
    api: (axios, option) => {

        let params = {
            "api_key":configsModule.getConfig("SERVICE_API_KEY_V3"),
            "language":"en-US"
        };

        return axios.get(`/3/movie/${option?.route?.id}`,{params:{...params}});
    },

};


//---------------------------------------------------------------
// Credits Movie Service   ---------------------------------------
//---------------------------------------------------------------
const creditsMovie = {

    path: "movie/creditsMovie",

    connection: defaultConnection,

    /**
     * Get the cast and crew for a movie.
     * @param axios
     * @param {{route: {id: number}}} option
     * @returns {*}
     */
    api: (axios, option) => {

        let params = {
            "api_key":configsModule.getConfig("SERVICE_API_KEY_V3"),
            "language":"en-US"
        };

        return axios.get(`3/movie/${option?.route?.id}/credits`,{params:{...params}});
    },

};




export {
    discoverMovie,
    detailMovie,
    creditsMovie
}
