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
                        @click="handleClick"
                        class="icon-button"
                    >
                        <svg-icon
                            type="mdi"
                            :path="path"
                            class="icon"
                            color="grey"
                        ></svg-icon>
                    </button>
                    <v-list-item
                        v-bind="props"
                        class="list-item"
                    >
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
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlus } from '@mdi/js';

export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    components: {
        SvgIcon,
    },
    data() {
        return {
            open: [
                { value: 'breakfast', name: 'Śniadanie' },
                { value: 'second_breakfast', name: 'II śniadanie' },
                { value: 'dinner', name: 'Obiad' },
                { value: 'dessert', name: 'Podwieczorek' },
                { value: 'supper', name: 'Kolacja' },
            ],
            path: mdiPlus,
        };
    },
    methods: {
        handleClick() {
            console.log('click');
        },
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
