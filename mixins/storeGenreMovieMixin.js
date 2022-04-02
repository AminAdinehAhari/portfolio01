import {mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            genreMap: state => state?.data?.genre?.map,
        }),
    },
    methods: {
        getGenreName(id){
            if (id in this.genreMap){
               return this.genreMap[id];
            }else{
                return "";
            }
        }
    }
}
