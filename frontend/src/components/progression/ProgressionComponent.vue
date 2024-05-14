<template>
  <div class="common-box">
    <Bar
      id="my-chart-id"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      activities: []
    }
  },
  computed: {
    chartData() {
      const dailyCalories = Array(31).fill(0);

      this.activities.forEach(activity => {
        const activityDate = new Date(activity.date);
        const year = activityDate.getFullYear();
        const month = activityDate.getMonth();
        const day = activityDate.getDate();

        if (year === new Date().getFullYear() && month === 4) { // maj ma indeks 4
          dailyCalories[day - 1] += activity.calories;
        }
      });

      return {
        labels: Array.from({ length: 31 }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Spalone kalorie w ciągu dnia',
            data: dailyCalories,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 1000
          }
        }
      };
    }
  },
  async mounted() {
    const user = localStorage.getItem("login");
    try {
      const response = await fetch(
        `http://localhost:3010/api/user-activities?userName=${user}`
      );
      const data = await response.json();
      console.log("User activities:", data);
      
      if (!data.activities || !Array.isArray(data.activities)) {
        console.error("Invalid activities data:", data.activities);
        return;
      }

      this.activities = data.activities;
      console.log("Chart data:", this.chartData.datasets[0].data);

      // No need to force update as computed properties will reactively update the chart
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  }
}
</script>

<style scoped>
.common-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 370px; /* Minimalna szerokość */
    min-height: 400px; /* Minimalna wysokość */
    width: 70%; /* Szerokość jako procent okna przeglądarki */
    max-width: 800px; /* Maksymalna szerokość */
    display: flex;
    flex-direction: column; /* Ustawienie kierunku flexbox na kolumnę */
    align-items: center; /* Wyśrodkowanie elementów w pionie */
    justify-content: center; /* Wyśrodkowanie elementów w poziomie */
    opacity: 0.85;
}
</style>
