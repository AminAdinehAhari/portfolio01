import {genreMovieList} from "../api/genre";


export default {
    methods: {
        saveGenreMovieList() {

            const genreMap = this.$store.state.data.genre.map;

           if (Object.keys(genreMap).length === 0){
               this.$service(genreMovieList, {})
                   .then((res) => {
                       this.$store.commit("data/genre/saveGenreList", res.data?.genres);
                   })
                   .catch((error) => {})
           }


        }
    }
}
