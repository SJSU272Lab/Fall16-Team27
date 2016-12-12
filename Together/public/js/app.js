var app = angular.module("togetherApp",[]);

app.directive('hcChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    scope: {
                        options: '='
                    },
                    link: function (scope, element) {
                        Highcharts.chart(element[0], scope.options);
                    }
                };
            })
            // Directive for pie charts, pass in title and data only    
app.directive('hcPieChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: scope.title
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: scope.data,
                responsive:{
                	rules:[{
                		condition: {
                    		maxWidth: 300
                		}
                	}
               		]
                }
            });
        }
    };
})


app.service("communication",function() {
    var playerName;
    return{
        get: function() {
             return window.localStorage.getItem("playerName");
        },
        getId: function() {
             return window.localStorage.getItem("playerId");
        },

        set:function(m) {
            window.localStorage.setItem("playerName",m);
            //msg = m;
        },
        setId:function(m){
            window.localStorage.setItem("playerId",m);
        }
    }
})