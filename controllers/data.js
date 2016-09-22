var info={
	times:0,
	name:"",
	table:[[12,25],[11,26],[10,27],[09,28],[08,29],[07,30],[06,31],[05,32],[04,33],[03,34],[02,35],[01,36],[00,38]],
};

var chartConfiguration={
    type: 'bar',
    data: {
        labels: [""],
        datasets: [{
            label: '',
            data: [0],
            backgroundColor:"rgba(51, 122, 183, 1)",
            borderColor:"rgba(51, 122, 183, 1)",
            hoverBackgroundColor:"rgba(68, 157, 68, 1)",
            hoverBorderColor:"rgba(68, 157, 68, 1)",
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