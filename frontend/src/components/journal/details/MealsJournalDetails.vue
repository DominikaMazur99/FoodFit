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
                            <p>{{ data[item.value][0]?.calories }} kcl</p>
                        </div>
                    </v-list-item>
                </div>
            </template>
            <v-list lines="one">
                <v-list-item
                    v-for="item in data[item.value][0]?.ingredients"
                    :key="item.name"
                    :title="item.name"
                    :subtitle="`${item.calories} kcl, ${item.gram} g`"
                ></v-list-item>
            </v-list>
        </v-list-group>
    </v-list>
    <reusable-modal :dialog="dialog" :closeModal="closeModal">
        <reusable-select
            name="products"
            label="produkty"
            minWidth="180px"
            :options="this.indgredientsOptions || []"
            v-model="ingredientSelected"
            @change="updateIndgredientsOptions"
        ></reusable-select>
        <input-field
            name="weight"
            label="waga(g)"
            type="number"
            v-model="weight"
            @change="updateWeight"
        ></input-field>
        <submit-button
            name="Dodaj"
            @click="addIngredientToMealsList"
        ></submit-button>
        <v-list lines="one">
            <p>Dodane produkty:</p>
            <v-list-item
                v-for="product in productList"
                :key="`${product.name}/${product.calories}`"
                :title="product.name"
                :subtitle="`${product.calories}kcal, ${product.gram}g`"
            ></v-list-item>
        </v-list>
    </reusable-modal>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import ReusableModal from "../../modals/ReusableModal.vue";
import InputField from "../../inputComponents/InputField.vue";
import ReusableSelect from "../../inputComponents/ReusableSelect.vue";
import SubmitButton from "../../buttons/SubmitButton.vue";

import { getTodayDate } from "../../../../helpers/helpersFunctions";

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
        "reusable-select": ReusableSelect,
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
            user: "",
            productList: [],
        };
    },
    methods: {
        showModalToAddMeals(meal) {
            this.mealType = meal;
            this.dialog = true;
        },
        updateIndgredientsOptions(event) {
            const selectedValue = JSON.parse(event.target.value);
            this.ingredientSelected = selectedValue;
        },
        updateWeight(event) {
            const inputValue = event.target.value;
            this.weight = inputValue;
        },
        addIngredientToMealsList() {
            const calories =
                (Number(this.weight) *
                    Number(this.ingredientSelected.calories_on_hundred_gram)) /
                100;
            const meal = {
                user: this.user,
                name: this.ingredientSelected.label,
                calories: calories,
                gram: this.weight,
                date: getTodayDate(),
            };
            console.log(meal, this.mealType);
            this.productList.push(meal);
        },
        closeModal() {
            this.dialog = false;
        },
    },
    async mounted() {
        console.log("props", this.data);
        try {
            const userLogin = localStorage.getItem("login");
            this.user = userLogin;
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
