var info={
	times:0,
	name:"",
	data:{
		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
		datasets: [
			{
				label: "Kw Producidos",
				fillColor: "RoyalBlue",
				strokeColor: "RoyalBlue",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 5]
			},
		]
	},
	table:[[12,25],[11,26],[10,27],[09,28],[08,29],[07,30],[06,31],[05,32],[04,33],[03,34],[02,35],[01,36],[00,38]],
};

var chartConfiguration={
    type: 'line',
    data: {
        labels: [""],
        datasets: [{
            label: '',
            data: [0],
            backgroundColor:"rgba(255, 99, 132, 0.2)",
            borderColor:"rgba(255, 99, 132, 0.2)",
            hoverBackgroundColor:"rgba(54, 162, 235, 0.2)",
            hoverBorderColor:"rgba(54, 162, 235, 1)",
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        legend:{
            display:false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
};