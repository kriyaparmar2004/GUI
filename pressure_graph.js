const xlabels = [];
const ytemps = [];

chartIt();

async function chartIt() {
  const ctx = document.getElementById('pressure_graph').getContext('2d'); // Get the 2D rendering context

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Pressure',
        data: ytemps,
        // fill: false,
        borderWidth: 1
      }]
    }
  });
// const xlabels = [];
// const ytemps = [];

// chartIt();

// async function chartIt() {
//   const ctx = document.getElementById('pressure_graph').getContext('2d'); // Get the 2D rendering context

//   const chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: xlabels,
//       datasets: [{
//         label: 'Pressure',
//         data: ytemps,
//         fill: false,
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true, // Allow the chart to be responsive
//       maintainAspectRatio: false, // Prevent maintaining aspect ratio
//       // Set the width and height explicitly
//       width: 400,
//       height: 400,
//     }
//   });

//   // Rest of your code remains unchanged
//   // ...
// }


  setInterval(async () => {
    await updateChart(chart);
  }, 3000);
}

async function updateChart(chart) {
  try {
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const newData = await response.text();
    
    // console.log(newData);

    const rows = newData.split('\n').slice(1); 
    rows.forEach(elt => {
      const row = elt.split(',');
      const year = row[0];
      xlabels.push(year);
      const pressure = row[10];
      ytemps.push(pressure );
    //   console.log(year, pressure);
    });

   
    chart.data.labels = xlabels;
    chart.data.datasets[0].data = ytemps;
    chart.update(); // Update the chart
  } catch (error) {
    console.error('Error fetching or updating data:', error);
  }
}