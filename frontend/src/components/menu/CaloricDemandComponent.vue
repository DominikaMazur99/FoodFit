<template>
    <div class="common-box">
        <div class="app-name">
            <app-name></app-name>
        </div>
        <div
            :style="{
                fontSize: '24px',
                color: '#2f7d28',
                alignSelf: 'flex-start',
                fontWeight: 300,
            }"
        >
            Kalkulator kalorii
        </div>
        <div
            :style="{
                fontSize: '24px',
                color: '#black',
                alignSelf: 'flex-start',
                fontWeight: 200,
            }"
        >
            Uzupełnij dane, a my obliczymy Twoje zapotrzebowanie kaloryczne:
        </div>
        <div class="sex-select">
            <select-component
                name="sex"
                placeholder="płeć"
                :options="this.sexOptions"
                v-model="sex"
                @change="updateSex"
            ></select-component>
        </div>
        <div class="input-box">
            <input-field
                name="age"
                label="wiek"
                type="number"
                v-model="age"
                @change="updateAge"
            ></input-field>
            <input-field
                name="weight"
                label="waga (kg)"
                type="number"
                v-model="weight"
                @change="updateWeight"
            ></input-field>
            <input-field
                name="height"
                label="wzrost (cm)"
                type="number"
                v-model="height"
                @change="updateHeight"
            ></input-field>
        </div>
        <div class="select-box">
            <select-component
                name="work_activity_level"
                placeholder="poziom aktywności w pracy"
                minWidth="300px"
                :options="this.workActivityLevelOptions"
                v-model="workActivityLevel"
                @change="updateWorkActivityLevel"
            ></select-component>
            <select-component
                name="freetime_activity_level"
                placeholder="poziom aktywności w wolnym czasie"
                minWidth="300px"
                :options="this.freeTimeActivityLevelOptions"
                v-model="freetimeActivityLevel"
                @change="updateFreetimeActivityLevel"
            ></select-component>
            <select-component
                name="diet_goal"
                placeholder="cel diety"
                minWidth="300px"
                :options="this.dietGoalOptions"
                v-model="dietGoal"
                @change="updateDietGoal"
            ></select-component>
        </div>
        <div>
            <submit-button
                name="Oblicz"
                minWidthBtn="104px"
                minHeightBtn="43px"
                @click="calculate"
            ></submit-button>
        </div>
        <div
            :style="{
                alignItems: 'center',
                marginTop: '1rem',
                fontWeight: 300,
                fontSize: '24px',
            }"
        >
            Twoje zapotrzebowanie kaloryczne:
        </div>
        <div
            :style="{
                alignItems: 'center',
                fontWeight: 300,
                fontSize: '32px',
            }"
        >
            {{ caloricDemand }} kcal
        </div>

        <!--
            <div>
            <error-box
                :errors=this.errors
                errorMessageVisible="errorMessageVisible"
                >
            </error-box>
        </div>
        -->

        <div class>
            <div class="overlay" v-if="errorMessageVisible"></div>
            <div class="error-message-container" v-if="errorMessageVisible">
                <div>
                    <p class="error-close-button" @click="hideErrorMessage">
                        ×
                    </p>
                    <p
                        v-if="Object.values(errors).some((err) => err !== '')"
                        class="error-message-heading"
                    >
                        Uzupelnij brakujące informacje:
                    </p>
                    <p class="error-message" v-for="erorr in this.errors">
                        {{ erorr }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppNameText from "../textComponents/AppNameText.vue";
import SelectComponent from "../inputComponents/SelectComponent.vue";
import InputField from "../inputComponents/InputField.vue";
import SubmitButton from "../buttons/SubmitButton.vue";
import { ref } from "vue";

export default {
    components: {
        "app-name": AppNameText,
        "select-component": SelectComponent,
        "input-field": InputField,
        "submit-button": SubmitButton,
    },

    methods: {
        calculate() {
            if (this.validateFields() === true) {
                this.calculateCaloricDemand();
            }
        },
        calculateCaloricDemand() {
            let basalMetabolicRate;
            if (this.sex === "female") {
                basalMetabolicRate =
                    655.1 +
                    9.563 * this.weight +
                    1.85 * this.height -
                    4.676 * this.age;
            } else if (this.sex === "male") {
                basalMetabolicRate =
                    66.473 +
                    13.752 * this.weight +
                    5.003 * this.height -
                    6.775 * this.age;
            }
            let totalMetabolism =
                basalMetabolicRate * this.calculateActivityFactor();
            console.log("poziom aktywnosci", this.calculateActivityFactor());
            //zaleznosc od celu diety:
            if (this.dietGoal === "deficit") {
                this.caloricDemand = Math.round(
                    totalMetabolism - totalMetabolism * 0.15
                );
            } else if (this.dietGoal === "surplus") {
                console.log("nadwyzke");
                this.caloricDemand = Math.round(
                    totalMetabolism + totalMetabolism * 0.15
                );
            } else if (this.dietGoal === "maintenance") {
                console.log("maintenance");
                this.caloricDemand = Math.round(totalMetabolism);
            }
            console.log("zapotrzebowanie kaloryczne: ", this.caloricDemand);

            fetch("http://localhost:3010/api/calculator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: 1,
                    caloric_demand: this.caloricDemand,
                }),
            }); //GET bez method
        },
        calculateActivityFactor() {
            //tablica dwuwymiarowa ze współczynnikami aktywnosci fizycznej
            let activityFactor = [
                [1.4, 1.5, 1.6, 1.7],
                [1.5, 1.6, 1.7, 1.8],
                [1.6, 1.7, 1.8, 1.9],
                [1.7, 1.8, 1.9, 2.1],
                [1.9, 2.0, 2.2, 2.3],
            ];

            let i = this.mapActivityLevel(this.freetimeActivityLevel);
            let j = this.mapActivityLevel(this.workActivityLevel);
            return activityFactor[i][j];
        },
        mapActivityLevel(activityLevel) {
            switch (activityLevel) {
                case "sedentary":
                    return 0;
                case "lowActive":
                    return 1;
                case "active":
                    return 2;
                case "veryActive":
                    return 3;
                case "extremelyActive":
                    return 4;
            }
        },
        validateFields() {
            let correct = true;
            if (this.sex == "") {
                this.errors.sex = "płeć";
                correct = false;
            } else {
                this.errors.sex = "";
            }
            if (this.age == "") {
                this.errors.age = "wiek";
                correct = false;
            } else {
                this.errors.age = "";
            }
            if (this.weight == "") {
                this.errors.weight = "waga";
                correct = false;
            } else {
                this.errors.weight = "";
            }
            if (this.height == "") {
                this.errors.height = "wzrost";
                correct = false;
            } else {
                this.errors.height = "";
            }
            if (this.workActivityLevel == "") {
                this.errors.workActivityLevel = "poziom aktywności w pracy";
                correct = false;
            } else {
                this.errors.workActivityLevel = "";
            }
            if (this.freetimeActivityLevel == "") {
                this.errors.freetimeActivityLevel =
                    "poziom aktywności w wolnym czasie";
                correct = false;
            } else {
                this.errors.freetimeActivityLevel = "";
            }
            if (this.dietGoal == "") {
                this.errors.dietGoal = "cel diety";
                correct = false;
            } else {
                this.errors.dietGoal = "";
            }

            if (Object.values(this.errors).some((err) => err !== "")) {
                this.showErrorMessage();
            }
            return correct;
        },
        updateAge(event) {
            this.age = Number(event.target.value);
        },
        updateWeight(event) {
            this.weight = Number(event.target.value);
        },
        updateHeight(event) {
            this.height = Number(event.target.value);
        },
        updateSex(event) {
            this.sex = event.target.value;
        },
        updateWorkActivityLevel(event) {
            this.workActivityLevel = event.target.value;
        },
        updateFreetimeActivityLevel(event) {
            this.freetimeActivityLevel = event.target.value;
        },
        updateDietGoal(event) {
            this.dietGoal = event.target.value;
        },
        showErrorMessage() {
            this.errorMessageVisible = true;
        },
        hideErrorMessage() {
            this.errorMessageVisible = false;
        },
    },

    data() {
        return {
            caloricDemand: 0,
            age: ref(""),
            weight: ref(""),
            height: ref(""),
            sex: ref(""),
            workActivityLevel: ref(""),
            freetimeActivityLevel: ref(""),
            dietGoal: ref(""),
            errorMessageVisible: false,
            errors: {
                age: "",
                weight: "",
                height: "",
                sex: "",
                workActivityLevel: "",
                freetimeActivityLevel: "",
                dietGoal: "",
            },
            sexOptions: [
                { label: "mężczyzna", value: "male" },
                { label: "kobieta", value: "female" },
            ],
            workActivityLevelOptions: [
                {
                    label: "bardzo lekka - np. praca przed komputerem, kierowca",
                    value: "sedentary",
                },
                {
                    label: "lekka - np. lekka praca przemysłowa, sprzedaż",
                    value: "lowActive",
                },
                {
                    label: "umiarkowana - np. sprzątanie, praca w kuchni",
                    value: "active",
                },
                {
                    label: "ciężka - np. przemysł, prace budowlane lub rolnictwo",
                    value: "veryActive",
                },
            ],
            freeTimeActivityLevelOptions: [
                {
                    label: "bardzo lekka - brak aktywności w wolnym czasie",
                    value: "sedentary",
                },
                {
                    label: "lekka - np. raz w tygodniu spaceruje, pracuję w ogródku",
                    value: "lowActive",
                },
                {
                    label: "umiarkowana - reguralnie ćwiczę min. raz w tygodniu ",
                    value: "active",
                },
                {
                    label: "duża - reguralnie ćwiczę więcej niż raz w tygodniu",
                    value: "veryActive",
                },
                {
                    label: "intensywna - ciężka aktywności fizyczna kilka razy w tygodniu",
                    value: "extremelyActive",
                },
            ],
            dietGoalOptions: [
                { label: "chcę schudnąć", value: "deficit" },
                { label: "chcę utrzymać wagę", value: "maintenance" },
                { label: "chcę przytyć", value: "surplus" },
            ],
        };
    },
};
</script>

<style>
@import "../styles/common-style.css";

.sex-select {
    align-items: center;
    justify-content: center;
}
.input-box {
    display: flex; /* Use flexbox to arrange the input fields */
    justify-content: space-between; /* Distribute space between input fields */
    margin-top: 20px; /* Add some top margin for spacing */
}

.input-field {
    flex: 1; /* Allow input fields to grow and shrink as needed */
    margin-right: 10px; /* Add right margin to create space between input fields */
}

.input-field:last-child {
    margin-right: 0; /* Remove right margin from the last input field */
}
.select-box {
    display: flex;
    flex-direction: column;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999; /* Wysoki indeks z-index, aby był na wierzchu */
    backdrop-filter: blur(8px);
    border-radius: 10px;
}

.error-message-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f4bbbb; /* Tło komunikatu błędu */
    padding: 10px;
    border-radius: 10px;
    z-index: 1000; /* Wyższy indeks z-index, aby był nad tłem */
    min-width: 300px;
    border: 3px solid #e29696;
}

.error-close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    margin-right: 20px;
}

.error-message-heading {
    font-weight: 500;
    margin-left: 20px;
}

.error-message {
    margin-left: 30px;
    font-weight: 300;
}
</style>
