<template>
    <div class="input-field">
        <div class="box">
            <label class="label" :for="name">{{ label }}</label>
            <input
                class="input"
                :id="name"
                :type="type"
                :placeholder="placeholder"
                :value="modelValue"
                @input="updateInputValue($event.target.value)"
            />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

//jezeli zmienilibysmy nazwe z modelValue to przestanie działać
const props = defineProps([
    "modelValue",
    "name",
    "label",
    "type",
    "placeholder",
]);

//tu emitujemy zmianę pola, aby móc miec dostęp do wartości w miejscu hgdzie uzywamy komponentu
const emit = defineEmits(["update:modelValue"]);

const updateInputValue = (value) => {
    emit("update:modelValue", value);
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
