<template>
    <e-row >
        <e-col :col="12">
            <ul class="w-full l-pagination flex flex-wrap justify-center items-center">
                <li class="px-2 flex flex-wrap justify-center items-center">
                    <button
                            @click="changePage(value - 1)"
                            :class="{
                        'text-p-blue cursor-pointer' : value - 1 > 0,
                        'cursor-default opacity-20' : value - 1 <= 0,
                        'capitalize' : true
                    }"
                            :disabled="value - 1 < 0"
                    >{{getLabel("PREVIOUS_PAGE")}}</button>
                </li>
                <li v-for="(page,index) in pageList"
                    :key="`page-${index}`"
                    class="px-2 flex flex-wrap justify-center items-center">
                    <button
                            @click="changePage(page)"
                            :class="{
                        'text-p-blue opacity-60 cursor-default' : page == value,
                        'text-current cursor-pointer' : page != value &&  page !== '...',
                        'cursor-default' : page === '...'
                    }"
                            :disabled="page === '...' || page == value"
                    >{{page}}</button>
                </li>
                <li class="px-2 flex flex-wrap justify-center items-center">
                    <button
                            @click="changePage(value + 1)"
                            :class="{
                        'text-p-blue cursor-pointer' : value + 1 < total,
                        'cursor-default opacity-20' : value + 1 >= total,
                        'capitalize' : true
                    }"
                            :disabled="value + 1 > total"
                    >{{getLabel("NEXT_PAGE")}}</button>
                </li>
            </ul>
        </e-col>
        <e-col :col="12" class="flex flex-wrap justify-center items-center mt-2">
            <p class="text-gray-400 text-sm font-thin">{{getText("PAGINATION_RESULT_TEXT",{
                'from' :(((value-1)*20)+1).toString(),
                'to' :(value*20).toString()})}}</p>
        </e-col>
    </e-row>
</template>

<script>
    import ERow from "./e-row";
    import ECol from "./e-col";

    export default {
        name: "l-pagination",
        components: {
            ERow,
            ECol,
        },
        props: {
            total: {
                type: Number,
                default: function () {
                    return 1
                }
            },
            value: {
                type: Number,
                default: function () {
                    return 1
                }
            }
        },
        model: {
            prop: 'value',
            event: 'input'
        },
        computed: {
            inputVal: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            },
            pageList() {
                let page = [];

                if (this.value - 2 > 1){
                    for (let i = 1; i <= 2; i++) {
                        if (i > 0 && i<= this.value - 5) {
                            page.push(i);
                        }
                    }

                    page.push("...");
                }


                for (let i = this.value - 2; i <= this.value + 2; i++) {
                    if (i > 0 && i<= this.total) {
                        page.push(i);
                    }
                }

                if (this.value + 2 < this.total - 2){
                    page.push("...");
                }

                for (let i = this.total - 2; i <= this.total; i++) {
                    if (this.value + 2 < i){
                        page.push(i);
                    }
                }

                return page
            }
        },
        methods:{
            changePage(num){
                if (num > 0 && num !== this.value && num !== '...'){
                    this.$emit('input', num);
                }
            }
        }
    }
</script>

<style scoped>

</style>
