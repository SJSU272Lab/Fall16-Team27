var app = angular.module("togetherApp");

function chartControllerFn($scope,$http) {
	
	var vm = this;
	vm.tab='fitness';

    var generateSeriesData = function(rawData) {
        var seriesData = [];

        angular.forEach(rawData,function(d) {
            seriesData.push({'name':d.playerName,'data':[d.day1,d.day2,d.day3,d.day4,d.day5,d.day6,d.day7]})    
        });
        console.log(seriesData);
        return seriesData;
    }

	$http.get('/getRunningIntensityData').
	then(function (data) {
            vm.intensityData = data.data;
            var playerNames = [];
            var generatedSeriesData = generateSeriesData(data.data.result);
            angular.forEach(vm.intensityData.result,function(player) {
                playerNames.push(player.playerName);
            })
			$scope.chartOptions = {
                    title: {
                        text: 'Temperature data'
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },

                    series: [{
                        data: data.data
                    }]
                };	

            $scope.columnChartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Intensity Points'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Points'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series:generatedSeriesData /*[{
                    name: 'Player 1',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0]

                }, {
                    name: 'Player 2',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0]

                }, {
                    name: 'Player 3',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0]

                }, {
                    name: 'Player 4',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6]

                },
                {
                    name: 'Player 5',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6]

                }]*/
            };	
	})




    $scope.columnChartOptionsSinglePlayer = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }]
    };
     $scope.pieData = [{
                        name: "Microsoft Internet Explorer",
                        y: 56.33
                    }, {
                        name: "Chrome",
                        y: 24.03,
                        sliced: true,
                        selected: true
                    }, {
                        name: "Firefox",
                        y: 10.38
                    }, {
                        name: "Safari",
                        y: 4.77
                    }, {
                        name: "Opera",
                        y: 0.91
                    }, {
                        name: "Proprietary or Undetectable",
                        y: 0.2
                }]
}

app.controller("chartController",chartControllerFn);


function dataServiceFn() {
	return [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];
}

app.factory("dataService",dataServiceFn);