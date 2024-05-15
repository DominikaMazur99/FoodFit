<template>
    <div class="week-range">
        <v-btn icon @click="previousWeek" class="button">
            <svg-icon
                type="mdi"
                :path="pathToBackBtn"
                class="icon"
                color="gray"
            ></svg-icon>
        </v-btn>

        <span>{{ currentWeekRange }}</span>

        <v-btn icon @click="nextWeek" class="button" color="gray">
            <svg-icon type="mdi" :path="pathToNextBtn" class="icon"></svg-icon>
        </v-btn>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

export default {
    components: {
        SvgIcon,
    },
    props: {
        currentWeekRange: {
            type: Object,
            required: true,
        },
        nextWeek: {
            type: Function,
            required: true,
        },
        previousWeek: {
            type: Function,
            required: true,
        }, // Przyjmujemy funkcję previousWeek jako props
    },
    data() {
        return {
            pathToBackBtn: mdiChevronLeft,
            pathToNextBtn: mdiChevronRight,
        };
    },
    computed: {
        weekStart() {
            return this.currentWeekRange.weekStart;
        },
        weekEnd() {
            return this.currentWeekRange.weekEnd;
        },
    },
};
</script>

<style>
.button >>> .v-btn {
    border: none !important;
}
</style>
