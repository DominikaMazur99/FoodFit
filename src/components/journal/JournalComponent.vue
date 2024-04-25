<template>
    <div class="common-box">
        <app-text-component></app-text-component>
        <v-tabs v-model="tab" align-tabs="left" color="#2f7d28">
            <v-tab :value="meals" max-width="400">Posiłki</v-tab>
            <v-tab :value="activity">Aktywności</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item :value="melas"
                ><meals-journal></meals-journal
            ></v-window-item>
            <v-window-item :value="activity">
                <activity-journal></activity-journal
            ></v-window-item>
        </v-window>
    </div>
</template>

<script>
import AppNameText from "../textComponents/AppNameText.vue";
import ActivityJournalComponent from "../journal/ActivityJournalComponent.vue";
import MealsJournalComponent from "../journal/MealsJournalComponent.vue";

export default {
    components: {
        "app-text-component": AppNameText,
        "activity-journal": ActivityJournalComponent,
        "meals-journal": MealsJournalComponent,
    },
    data: () => ({
        tab: null,
    }),
};
</script>

<style>
@import "../styles/common-style.css";

.v-window {
    max-width: 700px;
}

</style>
