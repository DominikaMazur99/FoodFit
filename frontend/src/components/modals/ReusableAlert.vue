<template>
    <v-alert :color="color" :icon="icon" :title="title" :text="text"></v-alert>
</template>

<script>
export default {
    props: {
        color: String,
        icon: String,
        title: String,
        text: String,
    },
};
</script>
