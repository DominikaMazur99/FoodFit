<template>
  <v-list>
      <v-list-group
          v-for="(item, index) in open"
          :key="index"
          :value="item.value"
      >
          <template v-slot:activator="{ props }">
              <v-list-item
                  v-bind="props"
              >
                  {{ item.name }}
              </v-list-item>
          </template>

          <v-list-item
              :key="item.value" 
              :title="data[item.value].name" 
              :value="data[item.value].name"
          >
          </v-list-item>
      </v-list-group>
  </v-list>
</template>

<script>
export default {
  props: {
      data: {
          type: Object, // Change the type to Object
          required: true,
      },
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
      };
  },
};
</script>
