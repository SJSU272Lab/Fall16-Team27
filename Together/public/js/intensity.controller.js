var app = angular.module("togetherApp");

function intensityControllerFn($scope,$http) {
	
	var vm = this;

	console.log("Intensity Home controller loaded");

	$http.get('/getPlayers').
	then(function(response){

		//console.log(response);

		vm.players = response.data;

		$http.get('/getRunningIntensityData').
		then(function(intensityResponse){

				playerIntensityPoints = intensityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.runningIntensityPointsArray = _.findWhere(playerIntensityPoints,{"name":player.playerName});
								console.log(player.runningIntensityPointsArray);
								player.runningIntensityPoints =0;

								angular.forEach(player.runningIntensityPointsArray.data,function(intensityObj){

										player.runningIntensityPoints += intensityObj.runningIntensityPoint;


										//console.log(player.playerName + player.runningIntensityPoints);
								});

								

						})

		})


		$http.get('/getWeightingIntensityData').
		then(function(intensityResponse){

				playerIntensityPoints = intensityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.weightIntensityPointsArray = _.findWhere(playerIntensityPoints,{"name":player.playerName});
								console.log(player.weightIntensityPointsArray);
								player.weightIntensityPoints =0;

								angular.forEach(player.weightIntensityPointsArray.data,function(intensityObj){

										player.weightIntensityPoints += intensityObj.weightingIntensityPoint;

										
										//console.log(player.playerName + player.runningIntensityPoints);
								});

								

						})

		})





	})



}

app.controller("intensityController",intensityControllerFn);