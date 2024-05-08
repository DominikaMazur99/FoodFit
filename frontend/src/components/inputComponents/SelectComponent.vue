<template>
    <div class="select-field">
        <div class="box">
            <label class="label" :for="name">{{ label }}</label>
            <select
                class="input"
                :id="name"
                v-model="selectedValue"
                @change="emitChange"
                :style="{ minWidth: computedMinWidth }"
            >
                <option :value="placeholder" disabled selected>
                    {{ placeholder }}
                </option>

                <option
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option.value"
                >
                    {{ option.label }}
                </option>
            </select>
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
        placeholder: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: () => [],
        },
        value: {
            // Prop to pass the initial selected value
            required: false,
        },
        minWidth: {
            type: String,
            default: "150px",
        },
    },
    data() {
        return {
            selectedValue: this.value || this.placeholder,
        };
    },
    computed: {
        computedMinWidth() {
            return this.minWidth;
        },
    },
    methods: {
        emitChange() {
            this.$emit("change", this.selectedValue);
        },
    },
};
</script>

<style scoped>
.select-field {
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

.select-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2f7d28;
    font-weight: 300;
    text-align: left;
}

/* Styl dla koloru placeholdera */
.select-field select::placeholder {
    color: #2f7d28;
    font-weight: light;
    opacity: 0.5; /* Możesz dostosować przezroczystość według potrzeb */
}

.select-field select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
    min-height: auto;
    width: 100%; /* Take up full width available in the parent container */
    border-radius: 10px;
    color: #2f7d28;
    font-weight: light;
}
</style>
