<template>
    <div class="f-release-search w-full flex justify-start items-center">

        <p class="text-sm font-semibold mr-1">{{getText('LABEL_RELEASE_DATE')}}</p>
        <div class="w-80 max-w-md flex">
            <date-range-picker
                    class="w-full"
                    opens="center"
                    :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
                    :singleDatePicker="false"
                    :timePicker="false"
                    :showWeekNumbers="true"
                    :showDropdowns="true"
                    :autoApply="true"
                    v-model="dateRange"
            >
                <template v-slot:input="picker" style="min-width: 350px;">
                    {{ dateFormat(picker.startDate) }} - {{ dateFormat(picker.endDate) }}
                </template>
            </date-range-picker>

            <button class="w-3 flex justify-center items-center" @click="resetDate" v-if="!!dateRange.startDate">
                <img src="@/assets/icons/close.svg" class="max-w-full"/>
            </button>
        </div>

        <div class="ml-auto">
            <button @click="submitForm"
                    :class="{
                        'bg-p-blue px-2 py-1 text-white rounded-3xl cursor-pointer' : true,
                        'opacity-50 cursor-default' : !!!dateRange.startDate
                    }"

            >{{getLabel('SEARCH')}}
            </button>
        </div>

    </div>
</template>

<script>
    import DateRangePicker from 'vue2-daterange-picker'

    export default {
        name: "f-release-search",
        components: {
            DateRangePicker
        },
        data() {
            return {
                dateRange: {
                    startDate: null,
                    endDate: null
                },
            }
        },
        methods: {
            dateFormat(date) {
                if (!!date) {
                    const dt = new Date(date);
                    return dt.toLocaleDateString("en-GB");
                } else {
                    return ""
                }

            },

            resetDate() {
                this.dateRange = {
                    startDate: null,
                    endDate: null
                };
                this.submitForm();
            },

            submitForm() {
                this.$emit("submit", {
                    ...this.dateRange,
                    startDateFormat: this.dateFormat(this.dateRange.startDate),
                    endDateFormat: this.dateFormat(this.dateRange.endDate)
                })
            }
        }
    }
</script>

<style scoped>

</style>
