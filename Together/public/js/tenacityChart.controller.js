var app = angular.module("togetherApp");

function chartControllerFn($scope,$http) {
	
	var vm = this;
	vm.tab='fitness';

    var generateSeriesDataForIntensityChart = function(rawData) {
        var seriesData = [];

        angular.forEach(rawData,function(d) {
            var singlePlayerData = [];

            angular.forEach(d.data,function(pData) {
                singlePlayerData.push(pData.runningSteps);
            });
            seriesData.push({'name':d.name,'data':singlePlayerData});    
        });
        console.log(seriesData);
        return seriesData;
    }


    var generateSeriesDataForWeightIntensityChart = function(rawData) {
        var seriesData = [];

        angular.forEach(rawData,function(d) {
            var singlePlayerData = [];

            angular.forEach(d.data,function(pData) {
                singlePlayerData.push(pData.weightingSteps);
            });
            seriesData.push({'name':d.name,'data':singlePlayerData});    
        });
        console.log(seriesData);
        return seriesData;
    }

    var generateSeriesDataForAvgCaloryBurnChart = function(rawData) {
        var seriesData = [];

        angular.forEach(rawData,function(d) {
            var singlePlayerData = [];

            angular.forEach(d.data,function(pData) {
                console.log("pData",pData);
                singlePlayerData.push(pData.avgCaloriesRate);
            });
            seriesData.push({'name':d.name,'data':singlePlayerData});    
        });
        console.log("avg",seriesData);
        return seriesData;
    }

    var generateSeriesDataForAvgDistanceChart = function(rawData) {
        var seriesData = [];

        angular.forEach(rawData,function(d) {
            var singlePlayerData = [];

            angular.forEach(d.data,function(pData) {
                console.log("pData",pData);
                singlePlayerData.push(pData.avgDistanceRate);
            });
            seriesData.push({'name':d.name,'data':singlePlayerData});    
        });
        console.log("avg",seriesData);
        return seriesData;
    }

	var getIntensityData = function() {
        $http.get('/getRunningTenacityData').
        then(function (data) {
            vm.intensityData = data.data;
            var playerNames = [];
            var generatedSeriesData = generateSeriesDataForIntensityChart(data.data);
            angular.forEach(vm.intensityData.result,function(player) {
                playerNames.push(player.playerName);
            })
           

            $scope.runningIntensityBarChartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Running Tenacity Points'
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
                        '<td style="padding:0"><b>{point.y:.1f} points</b></td></tr>',
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
                series:generatedSeriesData 
            };  
     })

    }

    getIntensityData();


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
    }];

    var getWeightIntensityData = function() {
        $http.get('/getWeightingTenacityData').
        then(function (data) {
            vm.weightIntensityData = data.data;
            var playerNames = [];
            var generatedWeightSeriesData = generateSeriesDataForWeightIntensityChart(data.data);
            console.log("generatedWeightSeriesData",generatedWeightSeriesData);
           /* angular.forEach(vm.intensityData.result,function(player) {
                playerNames.push(player.playerName);
            });*/

            $scope.weightIntensityLineChartOptions = {
                title: {
                    text: 'Weight Tenacity Points(Weekly)',
                    x: -20 //center
                },
                subtitle: {
                    text: '',
                    x: -20
                },
                xAxis: {
                    categories: ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"]
                },
                yAxis: {
                    title: {
                        text: 'Points'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 'Points'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: generatedWeightSeriesData
            };
           

              
     })

    }
    getWeightIntensityData();
    var seriesData = [{
        name:"Very Low",data:[]
    },{name:"Low",data:[]},{name:"Medium",data:[]},{name:"High",data:[]}];
    var generateSeriesDataForDistributionChart = function(data) {
        var totalPlayes  = data.veryLow.length + data.low.length + data.medium.length + data.high.length; 
        var transformedPieData = [];
        angular.forEach(data,function(d,k) {
            var obj = {};
            var playerNames = [];
            angular.forEach(d,function(pName,key) {
                playerNames.push(pName);
                obj.name = playerNames;
                
            });
            obj.y = (d.length/totalPlayes)*100;
            if(obj.name)
               obj.name = obj.name.join();
            if(k=="low"){
                seriesData[0].data.push(obj);

            }
            if(k=="veryLow"){
                seriesData[1].data.push(obj);
            }
            if(k=="medium"){
                seriesData[2].data.push(obj);
            }
            if(k=="high"){
                seriesData[3].data.push(obj);
            }

        });
        console.log("seriesData",seriesData);
        return seriesData;
    }
    
    //pie chart
    var getRunningDistributionData = function() {
        $http.get('/getRunningTenacityDistribution').
        then(function (data) {
            vm.runningDistribution = data.data;
            var playerNames = [];
            var generatedWeightSeriesData = generateSeriesDataForDistributionChart(data.data);
            console.log("generatedWeightSeriesData",generatedWeightSeriesData);
           /* angular.forEach(vm.intensityData.result,function(player) {
                playerNames.push(player.playerName);
            });*/

       /* series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Microsoft Internet Explorer',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]*/
           $scope.pieDataChart = generatedWeightSeriesData;/*[{
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
    }];*/

              
     })

    }
    getRunningDistributionData();
    
}

app.controller("tenacityChartController",chartControllerFn);


