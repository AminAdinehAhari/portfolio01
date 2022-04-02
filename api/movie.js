import defaultConnection from "../connections/defaultConnection";
import {configsModule} from "../modules/configs";


//---------------------------------------------------------------
// DiscoverMovie Service   --------------------------------------
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




export {
    discoverMovie
}
