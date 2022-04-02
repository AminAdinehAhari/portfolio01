<template>
    <e-row class="page-movie-detail">
        <e-col :col="12" class="my-7 bg-f-release-search py-3 px-3 rounded-md flex flex-wrap items-center">
            <nuxt-link to="/"
                       class="flex items-center bg-p-blue px-2 py-1 text-white rounded-3xl cursor-pointer"
            >
                <img src="@/assets/icons/arrow-left.svg" class="h-3 mr-3" />
                <span class="my-auto capitalize text-sm	font-extralight ">{{getLabel('BACK')}}</span>
            </nuxt-link>

            <div class="flex-1 ml-5">
                <e-row v-if="!!movieDetail">
                    <e-col :col="12"><h1 class="font-bold text-xl">{{movieDetail.title}}</h1></e-col>
                    <e-col :col="12"><p class="font-normal text-sm">All heroes start somewhere</p></e-col>
                </e-row>
            </div>
        </e-col>
        <e-col :col="12" v-show="loading">
            <e-row justify="center" align="middle">
                <span class="transform scale-150">
                     <e-loader color="p-blue"/>
                </span>
            </e-row>
        </e-col>
        <e-col :col="12" class="mb-5" v-show="!loading">
            <e-row justify="center" v-show="error" class="p-2 bg-red-500 text-red-200 rounded-c-move">
                <e-col :col="12" class="capitalize font-extrabold text-2xl">
                    <h1>{{getLabel("ERROR")}} : </h1>
                </e-col>
                <e-col :col="12" v-if="!!errorText" class="text-lg">
                    <p v-for="(eT,eIndex) in errorText" :key="`error-${eIndex}`">{{eT}}</p>
                </e-col>
                <e-col :col="12" v-else class="text-lg">
                    {{getText("ERROR_GET_API")}}
                </e-col>
            </e-row>

            <e-row v-if="!error && !!movieDetail" class="mt-8">
                <e-col :col="4">
                    <img :src="getConfig('SERVICE_IMAGE_URL')+movieDetail.poster_path"
                         :alt="movieDetail.title"
                         class="w-full rounded-md"
                    >
                </e-col>
                <e-col :col="8" >
                    <e-row class="h-full" justify="center" align="center">
                        <table class="w-9/12">
                            <tr class="pb-3">
                                <td class="font-bold text-base  leading-10">{{getLabel("BUDGET")}}</td>
                                <td class="text-right">${{movieDetail.budget}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-base  leading-10">{{getLabel("REVENUE")}}</td>
                                <td class="text-right">${{movieDetail.revenue}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-base  leading-10">{{getLabel("RELEASE_DATE")}}</td>
                                <td class="text-right">{{movieDetail.release_date}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-base  leading-10">{{getLabel("RUNTIME")}}</td>
                                <td class="text-right">{{movieDetail.runtime}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-base  leading-10">{{getLabel("SCORE")}}</td>
                                <td class="text-right">
                                    <awesome-vue-star-rating
                                            :star="movieRate"
                                            :disabled="true"
                                            :maxstars="5"
                                            :starsize="'xs'"
                                            :hasresults="false"
                                            :hasdescription="false"
                                            :ratingdescription="false" />
                                    {{movieDetail.vote_average}} ({{movieDetail.vote_count}} {{getLabel('VOTES')}})</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-base  leading-10">{{getLabel("GENRES")}}</td>
                                <td class="text-right">{{genresText}}</td>
                            </tr>
                            <tr>
                                <td class="font-bold text-base  leading-10">{{getLabel("IMDB_LINK")}}</td>
                                <td class="text-right">
                                    <a :href="movieDetail.homepage" class="text-p-blue">{{getLabel('LINK')}}</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="font-bold text-base  leading-10">{{getLabel("HOMEPAGE_Link")}}</td>
                                <td class="text-right">
                                    <a :href="movieDetail.homepage" class="text-p-blue">{{getLabel('LINK')}}</a>
                                </td>
                            </tr>
                        </table>
                    </e-row>
                </e-col>
                <e-col :col="12" class="mt-7">
                    <p class="text-lg font-light">{{movieDetail.overview}}</p>
                </e-col>
                <e-col :col="12" class="mt-5 mb-7" v-if="!!credits">
                    <h1 class="font-semibold text-lg">{{getLabel('CREDIT')}} :</h1>
                    <p class="text-justify text-base font-light">{{creditsText}}</p>
                </e-col>
            </e-row>
        </e-col>
    </e-row>
</template>

<script>
    import EMain from "../../../components/e-main";
    import ERow from "../../../components/e-row";
    import ELoader from "../../../components/e-loader";
    import ECol from "../../../components/e-col";
    import CMove from "../../../components/c-move";
    import LPagination from "../../../components/l-pagination";
    import FReleaseSearch from "../../../components/f-release-search";
    import saveGenreMovieMixin from "../../../mixins/saveGenreMovieMixin";
    import {creditsMovie, detailMovie} from "../../../api/movie";
    import AwesomeVueStarRating from 'awesome-vue-star-rating'

    export default {
        name: "index",
        components: {
            EMain,
            ERow,
            ELoader,
            ECol,
            CMove,
            LPagination,
            FReleaseSearch,
            AwesomeVueStarRating
        },
        mixins: [
            saveGenreMovieMixin
        ],
        data() {
            return {
                loading: false,
                error : false,
                errorText : null,

                movieId:null,
                movieDetail:null,
                credits : null,
                creditsText : null,
            }
        },
        computed:{
            /**
             * change genres to of array<object> to text
             * */
            genresText(){
                return this.movieDetail?.genres.map(it=>it.name).join(" , ")
            },

            /**
             * provide movie rate for rate component
             * */
            movieRate(){
                let rate = this.movieDetail?.vote_average;
                if (!!rate){
                    return Math.floor(rate/2);
                }else{
                    return 1;
                }
            }
        },
        methods:{
            /**
             * 10 popular cast members (sorted by popularity)
             * */
            setCreditsText(){
                this.creditsText = this.credits?.cast.sort((a,b)=>{
                    return a.popularity > b.popularity ? -1 : 1;
                })
                    .filter((it,index)=>index<10)
                    .map(it=>it.name)
                    .join(" , ")
            },
            /**
             * get movie detail
             * */
            getMovieDetail(){
                this.loading = true;

                this.$service(detailMovie, {route: {id:this.movieId}})
                    .then((res) => {
                        this.movieDetail = res.data;
                        this.loading = false;
                        this.error = false;
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.error = true;
                        this.errorText = error.response?.data?.errors;
                    })
            },

            /**
             * get credit list
             * */
            getCredits(){
                this.$service(creditsMovie, {route: {id:this.movieId}})
                    .then((res) => {
                        this.credits = res.data;
                        this.setCreditsText()
                    })
                    .catch((error) => {

                    })
            }
        },
        created() {
            this.saveGenreMovieList();
            this.loading = true;
        },
        mounted() {
            this.movieId = this.$route.params.id;
            this.getMovieDetail();
            this.getCredits();
        }
    }
</script>

<style lang="scss">

</style>
