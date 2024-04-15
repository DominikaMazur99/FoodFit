<template>
    <div class="select-field">
        <div class="box">
            <label class="label" :for="name">{{ label }}</label>
            <select
                class="input"
                :id="name"
                v-model="selectedValue"
                @change="emitChange"
            >
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
        options: {
            type: Array,
            default: () => [],
        },
        value: {
            // Prop to pass the initial selected value
            required: false,
        },
    },
    data() {
        return {
            selectedValue: this.value || null, // Initialize selected value
        };
    },
    methods: {
        emitChange() {
            // Emit change event with the selected value
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
}

.box {
    position: relative;
}

.select-field label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2f7d28;
    font-weight: lighter;
    text-align: left;
}

.select-field select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
    height: auto;
    min-width: 150px;
    border-radius: 10px;
}
</style>
