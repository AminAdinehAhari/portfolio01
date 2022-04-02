<template>
    <div :class="classObj">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "e-row",
        computed: {
            classObj() {
                const base = {
                    'e-row': true,
                    'flex': true,
                    'flex-wrap': true,
                    'flex-auto': true,
                    'w-full': true,
                };

                base['flex-' + this.direction] = true;
                base['justify-' + this.justify] = true;
                base['items-' + this.align] = true;


                return base;
            }
        },
        props: {
            direction: {
                type: String,
                default: function () {
                    return 'row'
                }
            },
            justify: {
                type: String,
                default: function () {
                    return 'start'
                }
            },
            align: {
                type: String,
                default: function () {
                    return 'start'
                }
            }
        }
    }
</script>

<style scoped>

</style>
