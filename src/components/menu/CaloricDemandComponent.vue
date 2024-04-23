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
                fontWeight: 'lighter',
            }"
        >
            Kalkulator kalorii
        </div>
        <div
            :style="{
                fontSize: '24px',
                color: '#black',
                alignSelf: 'flex-start',
                fontWeight: 'lighter',
            }"
        >
            Uzupełnij dane, a my obliczymy Twoje zapotrzebowanie kaloryczne:
        </div>
        <div class="sex-select">
            <select-component
                name="sex"
                placeholder="płeć"
                :options="this.sexOptions"
            ></select-component>
        </div>
        <div class="input-box">
            <input-field name="age" label="wiek"></input-field>
            <input-field
                name="weight"
                label="waga (kg)"
                type="number"
            ></input-field>
            <input-field
                name="height"
                label="wzrost (cm)"
                type="number"
            ></input-field>
        </div>
        <div class="select-box">
            <select-component
                name="work_activity_level"
                placeholder="poziom aktywności w pracy"
                minWidth="300px"
            ></select-component>
            <select-component
                name="freetime_activity_level"
                placeholder="poziom aktywności w wolnym czasie"
                minWidth="300px"
            ></select-component>
            <select-component
                name="diet_goal"
                placeholder="cel diety"
                minWidth="300px"
            ></select-component>
        </div>
        <div>
            <submit-button
                name="Oblicz"
                minWidthBtn="104px"
                minHeightBtn="43px"
            ></submit-button>
        </div>
        <div
            :style="{
                alignItems: 'center',
                marginTop: '1rem',
                fontWeight: 'lighter',
                fontSize: '24px',
            }"
        >
            Twoje zapotrzebowanie kaloryczne:
        </div>

        <div
            :style="{
                alignItems: 'center',
                fontWeight: 'lighter',
                fontSize: '32px',
            }"
        >
            1500 kcl
        </div>
    </div>
</template>

<script>
import AppNameText from "../textComponents/AppNameText.vue";
import SelectComponent from "../inputComponents/SelectComponent.vue";
import InputField from "../inputComponents/InputField.vue";
import SubmitButton from "../buttons/SubmitButton.vue";

export default {
    components: {
        "app-name": AppNameText,
        "select-component": SelectComponent,
        "input-field": InputField,
        "submit-button": SubmitButton,
    },
    data() {
        return {
            sexOptions: [
                { label: "mężczyzna", value: "male" },
                { label: "kobieta", value: "female" },
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
</style>
