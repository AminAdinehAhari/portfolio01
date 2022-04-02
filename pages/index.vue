<template>
    <e-row>
        <e-col :col="12" class="my-7 bg-f-release-search py-3 px-3 rounded-md">
            <f-release-search :init="releaseDate" @submit="searchByRelease"/>
        </e-col>
        <e-col :col="12" v-show="loading">
            <e-row justify="center" align="middle">
                <span class="transform scale-150">
                     <e-loader color="p-blue"/>
                </span>
            </e-row>
        </e-col>
        <e-col :col="12" class="mb-5" v-show="!loading">
            <e-row justify="center" v-show="!error">
                <e-col :col="12" :md="4" v-for="(item,index) in resultList" :key="`move-${index}`">
                    <c-move :item="item"/>
                </e-col>
            </e-row>
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
            <e-row justify="center" align="center" class="my-4 px-2">
                <l-pagination v-model="resultPage" :total="resultTotalPage"/>
            </e-row>
        </e-col>
    </e-row>
</template>

<script>
    import EMain from "../components/e-main";
    import ERow from "../components/e-row";
    import ECol from "../components/e-col";
    import ELoader from "../components/e-loader";
    import CMove from "../components/c-move";
    import FReleaseSearch from "../components/f-release-search";
    import LPagination from "../components/l-pagination";
    import {discoverMovie} from "../api/movie";
    import saveGenreMovieMixin from "../mixins/saveGenreMovieMixin";

    export default {
        name: 'IndexPage',
        components: {
            EMain,
            ERow,
            ELoader,
            ECol,
            CMove,
            LPagination,
            FReleaseSearch
        },
        mixins: [
            saveGenreMovieMixin
        ],
        data() {
            return {
                releaseDate: {},

                loading: false,
                error : false,
                errorText : null,

                resultList: [],
                resultTotalPage: 1,
                resultPage: 1,
            }
        },
        methods: {
            /**
             *  1- provide search param
             *  2- save search param in store
             *  3- connect to api
             *  4- update page state
             *  5- save page total in store
             *  6- check error connection
             */
            getMovieList() {
                this.loading = true;
                let params = {};
                params['page'] = this.resultPage;

                if (!!this.releaseDate.startDateFormat && !!this.releaseDate.endDateFormat) {
                    params['release_date.gte'] = this.releaseDate.startDateFormat.replace(/\//g, '-').split("-").reverse().join("-");
                    params['release_date.lte'] = this.releaseDate.endDateFormat.replace(/\//g, '-').split("-").reverse().join("-");
                }

                this.$store.commit("state/home_page/setResultPage", this.resultPage);
                this.$store.commit("state/home_page/setReleaseDate", this.releaseDate);

                this.$service(discoverMovie, {params: params})
                    .then((res) => {
                        this.resultTotalPage = res?.data?.total_pages;
                        if (!!!this.resultTotalPage) {
                            this.resultTotalPage = 1;
                        }
                        this.$store.commit("state/home_page/setResultTotalPage", this.resultTotalPage);


                        this.resultList = res?.data?.results;
                        if (!!!this.resultList) {
                            this.resultList = [];
                        }


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
             * save releaseDate and change page to first page , get movie list
             */
            searchByRelease(date) {
                this.releaseDate = date;
                if (this.resultPage > 1) {
                    this.resultPage = 1;
                } else {
                    this.resultPage = 1;
                    this.getMovieList();
                }
            }

        },
        watch: {
            /** change page state get movie list
             * @param nv - new state
             */
            resultPage(nv) {
                this.getMovieList();
            }
        },
        /**
         * get and save genre movie list in store ,
         * update state by store (spa redirect , fix page search and page)
         */
        created() {
            this.saveGenreMovieList();
            this.loading = true;

            const rd = this.$store.state.state.home_page.releaseDate;
            const rtp = this.$store.state.state.home_page.resultTotalPage;
            const rp = this.$store.state.state.home_page.resultPage;
            this.releaseDate = rd;
            this.resultTotalPage = rtp;
            this.resultPage = rp;
        },
        /**
         * get all movie list
         */
        mounted() {
            this.getMovieList();
        }
    }
</script>
