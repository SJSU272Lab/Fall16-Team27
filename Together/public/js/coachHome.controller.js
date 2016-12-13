var app = angular.module("togetherApp");

function coachHomeControllerFn($scope,$http,communication) {
	
	var vm = this;

	console.log("Coach Home controller loaded");

	$http.get('/getPlayers').
	then(function(response){

		console.log(response);

		vm.players = response.data;
	});

	vm.goToDetailsPage = function(player) {
		communication.set(player.playerName);
		communication.setId(player._id);
		window.location.assign("/playerDetails.html");
	}

}

app.controller("coachHomeController",coachHomeControllerFn);