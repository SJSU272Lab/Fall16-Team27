var app = angular.module("togetherApp");

function coachHomeControllerFn($scope,$http,communication) {
	
	var vm = this;

	console.log("Coach Home controller loaded");

	$http.get('/getPlayers').
	then(function(response){

		console.log(response);

		vm.players = response.data;
	});

	vm.goToDetailsPage = function(pName) {
		communication.set(pName);
		window.location.assign("/sidebar.html");
	}

}

app.controller("coachHomeController",coachHomeControllerFn);