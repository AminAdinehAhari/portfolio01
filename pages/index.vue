<template>
    <e-row>
        <e-col :col="12" class="my-7 bg-f-release-search py-3 px-3 rounded-md">
            <f-release-search @submit="searchByRelease"/>
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
            getMovieList() {
                this.loading = true;
                let params = {};
                params['page'] = this.resultPage;

                if (!!this.releaseDate.startDateFormat && !!this.releaseDate.endDateFormat) {
                    params['release_date.gte'] = this.releaseDate.startDateFormat.replace(/\//g, '-').split("-").reverse().join("-");
                    params['release_date.lte'] = this.releaseDate.endDateFormat.replace(/\//g, '-').split("-").reverse().join("-");
                }

                this.$service(discoverMovie, {params: params})
                    .then((res) => {
                        this.resultTotalPage = res?.data?.total_pages;
                        if (!!!this.resultTotalPage) {
                            this.resultTotalPage = 1;
                        }

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
            resultPage(nv) {
                this.getMovieList();
            }
        },
        created() {
            this.saveGenreMovieList();
            this.loading = true;
        },
        mounted() {
            this.getMovieList();
        }
    }
</script>
