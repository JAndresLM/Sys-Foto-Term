var info={
	times:0,
    chartDisplay:"bar",
	name:""
};

var chartBarConfiguration={
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

var chartLineConfiguration={
    type: 'line',
    data: {
        labels: [""],
        datasets: [{
            label: '',
            data: [0],
            backgroundColor:"rgba(51, 122, 183, 0.8)",
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