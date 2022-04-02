<template>
    <div :class="classObj">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "e-col",
        computed: {
            classObj() {
                const base = {
                    'e-col': true,
                };


                base[`flex-col-${this.col}`] = true;
                base[`max-w-col-${this.col}`] = true;

                if (!!this.sm) {
                    base[`sm:flex-col-${this.sm}`] = true;
                    base[`sm:max-w-col-${this.sm}`] = true;
                }

                if (!!this.md) {
                    base[`md:flex-col-${this.md}`] = true;
                    base[`md:max-w-col-${this.md}`] = true;
                }

                if (!!this.lg) {
                    base[`lg:flex-col-${this.lg}`] = true;
                    base[`lg:max-w-col-${this.lg}`] = true;
                }

                if (!!this.xl) {
                    base[`xl:flex-col-${this.xl}`] = true;
                    base[`xl:max-w-col-${this.xl}`] = true;
                }


                return base;
            }
        },
        props: {
            col: {
                type: Number,
                default: function () {
                    return 12
                }
            },
            sm: {
                type: Number,
                default: function () {
                    return null
                }
            },
            md: {
                type: Number,
                default: function () {
                    return null
                }
            },
            lg: {
                type: Number,
                default: function () {
                    return null
                }
            },
            xl: {
                type: Number,
                default: function () {
                    return null
                }
            }
        }
    }
</script>

<style scoped>

</style>
