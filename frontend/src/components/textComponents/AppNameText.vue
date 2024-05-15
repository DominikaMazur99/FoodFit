<template>
    <router-link to="/menu" class="router-link">
        <div class="app-name">
            <div class="first-part">Food</div>
            <div class="second-part">Fit</div>
        </div>
    </router-link>
</template>

<script>
//TODO: router-link ma działać jeśli użytkownik jest zalogowany
export default {};
</script>

<style>
.app-name {
    font-size: 64px;
    display: flex;
    align-items: center; /* Align items vertically */
}
.first-part {
    font-weight: mixed; /* I assume "mixed" is a custom value, you can replace it with an appropriate value */
}
.second-part {
    font-weight: lighter;
}
.router-link {
    text-decoration: none; /* Usuwa podkreślenie */
    color: inherit; /* Dziedziczy kolor tekstu */
    font-weight: inherit; /* Dziedziczy grubość czcionki */
}
</style>
