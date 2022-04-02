<template>
    <e-row class="bg-p-background min-h-screen h-fit ">
        <e-col>
            <e-row class="bg-p-green h-48"></e-row>
            <e-row>
                <e-main class="p-2" >
                    <nuxt/>
                </e-main>
            </e-row>
        </e-col>
    </e-row>
</template>

<script>
    import ERow from "../components/e-row";
    import ECol from "../components/e-col";
    import EMain from "../components/e-main";

    export default {
        components:{
            EMain,
            ERow,
            ECol
        },
    }
</script>
