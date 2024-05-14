<template>
    <div class="week-range">
        <v-btn icon class="no-border" @click="previousWeek">
            <svg-icon type="mdi" :path="pathToBack" color="gray"></svg-icon>
        </v-btn>

        <span>{{ currentWeekRange.weekStart }} - {{ currentWeekRange.weekEnd }}</span>
        
        <v-btn icon class="no-border" @click="nextWeek">
            <svg-icon type="mdi" :path="pathToNext" color="gray"></svg-icon>
        </v-btn>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    props: {
        currentWeekRange: {
            type: Object,
            required: true
        },
        nextWeek: {
            type: Function,
            required: true
        },
        previousWeek: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            pathToNext: mdiChevronRight,
            pathToBack: mdiChevronLeft
        };
    }
};
</script>

<style scoped>
.week-range {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-family: "Jost";
    margin-bottom: 5px;
    color: gray;
    font-style: italic;
}

.no-border {
    border: none !important;
    box-shadow: none !important;
}

.v-btn {
    padding: 0;
}
</style>
