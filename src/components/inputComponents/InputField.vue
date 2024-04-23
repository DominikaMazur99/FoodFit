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
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1; /* Allow input fields to grow and shrink as needed */
}

.box {
    position: relative;
}

.input-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2f7d28;
    font-weight: 300;
    text-align: left;

}

.input-field input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
    min-height: auto;
    width: 100%; /* Take up full width available in the parent container */
    border-radius: 10px;
}
</style>
