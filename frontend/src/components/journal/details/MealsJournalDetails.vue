<template>
    <v-list>
        <v-list-group
            v-for="(item, index) in open"
            :key="index"
            :value="item.value"
        >
            <template v-slot:activator="{ props }">
                <div class="icon-wrapper">
                    <button
                        @click="showModalToAddMeals(item.value)"
                        class="icon-button"
                    >
                        <svg-icon
                            type="mdi"
                            :path="path"
                            class="icon"
                            color="grey"
                        ></svg-icon>
                    </button>
                    <v-list-item v-bind="props" class="list-item">
                        <div class="text">
                            <span>{{ item.name }}</span>
                            <p>{{ data[item.value].calories }}kcl</p>
                        </div>
                    </v-list-item>
                </div>
            </template>
            <v-list-item
                :key="item.value"
                :title="data[item.value].name"
                :value="data[item.value].name"
            ></v-list-item>
        </v-list-group>
    </v-list>
    <reusable-modal :dialog="dialog">
        <select-component
            name="products"
            label="produkty"
            minWidth="180px"
            :options="this.indgredientsOptions || []"
            v-model="ingredientSelected"
            @change="updateIndgredientsOptions"
        ></select-component>
        <input-field
            name="weight"
            label="waga(g)"
            type="number"
            v-model="weight"
            @change="updateWeight"
        ></input-field>
        <submit-button name="Dodaj"></submit-button>
    </reusable-modal>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import ReusableModal from "../../modals/ReusableModal.vue";
import InputField from "../../inputComponents/InputField.vue";
import SelectComponent from "../../inputComponents/SelectComponent.vue";
import SubmitButton from "../../buttons/SubmitButton.vue";

import { mdiPlus } from "@mdi/js";
import { ref } from "vue";
import { fetchData } from "../../../../helpers/api";

export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    components: {
        SvgIcon,
        "reusable-modal": ReusableModal,
        "select-component": SelectComponent,
        "input-field": InputField,
        "submit-button": SubmitButton,
    },
    data() {
        return {
            open: [
                { value: "breakfast", name: "Śniadanie" },
                { value: "second_breakfast", name: "II śniadanie" },
                { value: "dinner", name: "Obiad" },
                { value: "dessert", name: "Podwieczorek" },
                { value: "supper", name: "Kolacja" },
            ],
            path: mdiPlus,
            dialog: false,
            indgredientsOptions: [],
            ingredientSelected: ref(""),
            weight: ref(""),
            mealType: "",
        };
    },
    methods: {
        showModalToAddMeals(meal) {
            console.log("jestem");
            this.mealType = meal;
            this.dialog = true;
        },
        updateIndgredientsOptions(event) {
            const selectedValue = event.target.value;
            this.ingredientSelected = selectedValue;
        },
        updateWeight(event) {
            const inputValue = event.target.value;
            this.weight = inputValue;
        },
    },
    async mounted() {
        try {
            const response = await fetchData(
                "http://localhost:3010/api/ingredients",
                "GET",
                {}
            );
            console.log(response);
            this.indgredientsOptions = response;
        } catch (error) {
            console.error("Error fetching ingredients:", error);
            // Handle error if needed
        }
    },
};
</script>

<style scoped>
.list-item {
    padding: 0;
}

.icon-wrapper {
    display: flex;
    align-items: center;
}

.icon-button {
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
}

.icon {
    margin-right: 8px;
}

.text {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.text p {
    margin-left: 8px;
    justify-self: flex-end;
    color: grey;
    font-style: italic;
}

.v-list-item {
    color: #2f7d28;
}
.v-list-item--variant-text .v-list-item__overlay {
    color: grey;
}

.icon-button:hover {
    scale: 1.1;
    cursor: pointer;
}
</style>
