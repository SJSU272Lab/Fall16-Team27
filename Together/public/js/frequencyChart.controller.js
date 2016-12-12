var app = angular.module("togetherApp");

function frequencyChartControllerFn($scope,$http) {
	var vm = this;

	var generateSeriesDataForRunFqChart = function(rawData) {
        var seriesData = [];

        angular.forEach(rawData,function(d) {
            var singlePlayerData = [];

            angular.forEach(d.data,function(pData) {
                singlePlayerData.push(pData.runningActivityCount);
            });
            seriesData.push({'name':d.name,'data':singlePlayerData});    
        });
        console.log(seriesData);
        return seriesData;
    }
    var generateSeriesDataForWFqChart = function(rawData) {
        var seriesData = [];

        angular.forEach(rawData,function(d) {
            var singlePlayerData = [];

            angular.forEach(d.data,function(pData) {
                singlePlayerData.push(pData.weightActivityCount);
            });
            seriesData.push({'name':d.name,'data':singlePlayerData});    
        });
        console.log(seriesData);
        return seriesData;
    }

	var getRunFreqData = function() {
        $http.get('/getWeeklyRunActivityCount').
        then(function (data) {
            vm.intensityData = data.data;
            var playerNames = [];
            var generatedSeriesData = generateSeriesDataForRunFqChart(data.data);
            angular.forEach(vm.intensityData.result,function(player) {
                playerNames.push(player.playerName);
            })
           

            $scope.runningFqBarChartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Running Frequency'
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
                        text: 'Runs'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} runs</b></td></tr>',
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

    getRunFreqData();

    var getWFreqData = function() {
        $http.get('/getWeeklyWeightActivityCount').
        then(function (data) {
            vm.intensityData = data.data;
            var playerNames = [];
            var generatedSeriesData = generateSeriesDataForWFqChart(data.data);
            angular.forEach(vm.intensityData.result,function(player) {
                playerNames.push(player.playerName);
            })
           

            $scope.wFqBarChartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Weignt Workout Frequency'
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
                        text: 'Workout(s)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} workout(s)</b></td></tr>',
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

    getWFreqData();

}


app.controller("frequencyChartController",frequencyChartControllerFn);