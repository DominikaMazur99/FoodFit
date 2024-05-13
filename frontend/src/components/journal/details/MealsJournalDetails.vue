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
                            <p>
                                {{
                                    data[item.value].calories
                                        ? data[item.value].calories
                                        : 0
                                }}
                                kcl
                            </p>
                        </div>
                    </v-list-item>
                </div>
            </template>
            <v-list lines="one">
                <div
                    class="item-wrapper"
                    v-for="item in data[item.value].data"
                    :key="item._id"
                >
                    <div class="meal-text">
                        <span :style="{ color: '#2f7d28' }">{{
                            item.name
                        }}</span>
                        <span :style="{ color: 'gray' }"
                            >{{ item.calories }} kcl, {{ item.gram }} g</span
                        >
                    </div>
                    <button class="icon-button" @click="removeMeal(item._id)">
                        <svg-icon
                            type="mdi"
                            :path="pathToRemove"
                            class="icon"
                            color="red"
                        ></svg-icon>
                    </button>
                </div>
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
        <div :style="{ textAlign: 'center' }">
            <submit-button
                name="Dodaj"
                @click="addIngredientToMealsList"
            ></submit-button>
        </div>
    </reusable-modal>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import ReusableModal from "../../modals/ReusableModal.vue";
import InputField from "../../inputComponents/InputField.vue";
import ReusableSelect from "../../inputComponents/ReusableSelect.vue";
import SubmitButton from "../../buttons/SubmitButton.vue";

import { mdiPlus, mdiClose } from "@mdi/js";
import { ref } from "vue";
import { fetchData } from "../../../../helpers/api";

export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
        selectedDate: {
            type: String,
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
            pathToRemove: mdiClose,
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
        async addIngredientToMealsList() {
            try {
                const calories =
                    (Number(this.weight) *
                        Number(
                            this.ingredientSelected.calories_on_hundred_gram
                        )) /
                    100;
                const date = this.selectedDate;

                const mealToPost = {
                    userName: this.user,
                    name: this.ingredientSelected.label,
                    calories: calories,
                    gram: Number(this.weight),
                    date: date,
                    type: this.mealType,
                };

                const response = await fetchData(
                    "http://localhost:3010/api/user-meals",
                    "POST",
                    mealToPost
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();

                this.productList.push(responseData);
            } catch (err) {
                console.error("Error adding ingredient to meals list:", err);
            } finally {
                this.dialog = false;
                this.$emit("ingredient-added");
            }
        },
        async removeMeal(id) {
            try {
                const response = await fetchData(
                    "http://localhost:3010/api/user-meals",
                    "DELETE",
                    {
                        userName: this.user,
                        mealId: id,
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error removing meal:", error);
                // Obsługa błędu, np. wyświetlenie komunikatu użytkownikowi
            }
        },

        closeModal() {
            this.dialog = false;
        },
    },
    async mounted() {
        try {
            const userLogin = localStorage.getItem("login");
            this.user = userLogin;
            const response = await fetchData(
                "http://localhost:3010/api/ingredients",
                "GET",
                {}
            );
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
.item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
}

.meal-text {
    display: flex;
    flex-direction: column;
}
</style>
