const xlabels = [];
const ytemps = [];

chartIt();

async function chartIt() {
  const ctx = document.getElementById('temp_graph').getContext('2d'); // Get the 2D rendering context

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Temperature',
        data: ytemps,
        // fill: false,
        borderWidth: 1
      }]
    }
  });
  

  setInterval(async () => {
    await updateChart(chart);
  }, 1000);
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
      const temp = row[1];
      ytemps.push(parseFloat(temp) + 14);
    //   console.log(year, temp);
    });

   
    chart.data.labels = xlabels;
    chart.data.datasets[0].data = ytemps;
    chart.update(); // Update the chart
  } catch (error) {
    console.error('Error fetching or updating data:', error);
  }
}
