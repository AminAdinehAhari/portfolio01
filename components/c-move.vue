<template>
    <div :class="classObj">
        <nuxt-link :to="movieDetailPage" :class="classCardObj">
            <e-row class="h-full">
                <e-col :col="5" class="relative h-full">
                    <img :src="getConfig('SERVICE_IMAGE_URL')+item.poster_path"
                         :alt="item.title"
                         class="w-full h-full object-cover"
                    >
                </e-col>
                <e-col :col="7" class="p-2 h-full">
                    <e-row direction="col h-full">
                        <h2 class="font-sans flex-1 w-full mb-auto font-bold text-base text-black">{{item.title}}</h2>

                        <e-row class="max-h-7" align="center">
                            <img src="@/assets/icons/calender.svg" alt="calender" class="mr-1 max-h-5"/>
                            <span class="font-normal text-xs">{{item.release_date}}</span>
                        </e-row>
                        <e-row class="max-h-fit flex-initial text-justify">
                            <span class="font-normal text-xs mr-2" v-for="(genre,index) in genres" :key="`genre-${index}`">
                                {{genre}}
                                <span class="w-1 h-1 min-w-1 min-h-1 my-auto bg-black inline-block rounded-full"></span>
                            </span>
                        </e-row>
                    </e-row>
                </e-col>
            </e-row>
        </nuxt-link>
    </div>
</template>

<script>
    import ERow from "./e-row";
    import ECol from "./e-col";
    import storeGenreMovieMixin from "../mixins/storeGenreMovieMixin";

    export default {
        name: "c-move",
        mixins:[
            storeGenreMovieMixin
        ],
        components: {
            ERow,
            ECol
        },
        computed: {
            classObj() {
                const base = {
                    'c-move': true,
                    'w-full' : true,
                    'flex': true,
                    'justify-center' : true,
                    'align-center' : true,
                    'py-3' : true,

                };

                return base;
            },
            classCardObj(){
                const base = {
                    'c-move__card': true,
                    'w-c-move' : true,
                    'max-w-full' : true,
                    'bg-c-move' : true,
                    'min-h-c-move' : true,
                    'rounded-c-move' : true,
                    'overflow-hidden' : true,
                    'border-2 border-c-move-dark' : true,
                    'm-1' : true,
                    'hover:bg-c-move-dark' : true,
                };

                return base;
            },

            movieDetailPage(){
                return `/movie/${this.item?.id}`
            },


            genres(){
                return this.item.genre_ids.map(it=>this.getGenreName(it))
            }
        },
        props:{
            item:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
