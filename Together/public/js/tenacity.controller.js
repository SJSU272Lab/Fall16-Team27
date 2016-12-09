var app = angular.module("togetherApp");

function tenacityControllerFn($scope,$http) {
	
	var vm = this;

	console.log("Tenacity Home controller loaded");

	$http.get('/getPlayers').
	then(function(response){

		//console.log(response);

		vm.players = response.data;

		$http.get('/getRunningTenacityData').
		then(function(tenacityResponse){

				playerTenacityPoints = tenacityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.runningTenacityPointsArray = _.findWhere(playerTenacityPoints,{"name":player.playerName});
								//console.log(player.runningTenacityPointsArray);
								player.runningTenacityCount =0;

								angular.forEach(player.runningTenacityPointsArray.data,function(tenacityObj){

										player.runningTenacityCount += tenacityObj.runningSteps;
										player.avgRunningTenacity= player.runningTenacityCount/player.runningTenacityPointsArray.data.length

										player.avgRunningTenacity= Math.round(player.avgRunningTenacity*100)/100; 
										//console.log(player.playerName + player.avgRunningTenacity);
								});

								

						})

		})


		$http.get('/getWeightingTenacityData').
		then(function(tenacityResponse){

				playertenacityPoints = tenacityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.weightTenacityPointsArray = _.findWhere(playertenacityPoints,{"name":player.playerName});
								//console.log(player.weightIntensityPointsArray);
								player.weightTenacityCount =0;

								angular.forEach(player.weightTenacityPointsArray.data,function(tenacityObj){

										player.weightTenacityCount += tenacityObj.weightingSteps;

										player.avgWeightTenacity = player.weightTenacityCount/player.weightTenacityPointsArray.data.length;

										player.avgWeightTenacity = Math.round(player.avgWeightTenacity*100)/100;
										
										//console.log(player.playerName + player.runningIntensityPoints);
								});

								

						})

		})





	})



}

app.controller("tenacityController",tenacityControllerFn);