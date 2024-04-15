<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script setup></script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap');

/* Resetowanie marginesów dla body */
body {
  margin: 0;
  padding: 0;
  font-family: 'Jost', sans-serif; /* Ustawienie czcionki dla całej strony */
}

/* Ustawienie obrazka tła */
#app {
  background-image: url('./assets/background_image.png');
  background-size: cover; /* Dopasowuje obrazek tak, aby wypełniał całe tło */
  background-position: center; /* Wyśrodkowuje obrazek */
  background-repeat: no-repeat; /* Zapobiega powtarzaniu obrazka */
  width: 100vw; /* Szerokość będzie równa szerokości okna przeglądarki */
  height: 100vh; /* Wysokość będzie równa wysokości okna przeglądarki */
}

/* Dodatkowe style dla czcionki Jost */
@font-face {
  font-family: 'Jost';
  src: url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap') format('truetype');
  /* Dodaj tutaj inne formaty czcionki, jeśli są dostępne */
}

</style>
