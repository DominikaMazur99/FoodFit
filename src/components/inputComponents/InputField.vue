<template>
    <div class="input-field">
        <div class="box">
            <label class="label" :for="name">{{ label }}</label>
            <input
                class="input"
                :id="name"
                :type="type"
                :placeholder="placeholder"
                v-model="inputValue"
                @input="emitInput"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "",
        },
        value: {
            // Prop do przekazania początkowej wartości pola wejściowego
            required: false,
        },
    },
    data() {
        return {
            inputValue: this.value || "", // Inicjalizacja wartości pola wejściowego
        };
    },
    methods: {
        emitInput() {
            // Emitowanie zdarzenia input z aktualną wartością pola wejściowego
            this.$emit("input", this.inputValue);
        },
    },
};
</script>

<style scoped>
.input-field {
    margin-bottom: 1rem;
    align-items: center; /* Wyśrodkowanie w pionie */
    display: flex; /* Ustawienie kontenera jako flexbox */
    justify-content: center; /* Wyśrodkowanie w poziomie */
    flex-direction: column; /* Ustawienie kierunku flexbox na kolumnę */
}

.box {
    position: relative;
}

.input-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2f7d28;
    font-weight: lighter;
    text-align: left;
}

.input-field input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
    height: 46px;
    width: 230px;
    border-radius: 10px;
}
</style>
