var app = angular.module('TicTacToe', [])

function generateBoard() {
	var board = []
	for (var i = 0; i < 3; i++){
		row = []
		for (var j = 1; j < 4; j++) {
			row.push({'val': null, 'index': j + (3* i)});
		}
		board.push(row);
	}
		return board;
}


app.controller("BoardCtrl", function($scope) {

	function initBoard(){
		$scope.winner = null;
		$scope.cat = false;
		$scope.board = generateBoard();
		$scope.onX = true;
	}
	
	//Initialize the board
	initBoard();

	var gasps = [
		new Audio('assets/gasp1.wav'), 
		new Audio('assets/gasp2.wav'), 
		new Audio('assets/gasp3.wav')
	]

	var board = document.getElementById("board");

	$scope.reset = function(){
		initBoard();
		board.classList.remove("disabled");
	}

	$scope.changeVal = function(cell) {
		if (!cell.val){
			
			if ($scope.onX) {
				cell.val = 'X';
				$scope.onX = false;
			}
			else {
				cell.val = 'O';
				$scope.onX = true;
			}

			checkForVictor(function (){
					gasps[Math.floor((Math.random() * 3))].play();
				});
		}
		
	};

	function checkForVictor(cb) {
		var winner = testSolutions();
		if (winner) {
			$scope.winner = winner;
			board.classList.add("disabled");
			var audio = (audio) ? audio : new Audio('assets/applause.mp3');
			audio.play();
		}
		else {
			var cat = testCat();
			if (cat){
				$scope.cat = true;
				var catAudio = (catAudio) ? catAudio : new Audio('assets/cat.wav');
				catAudio.play();
			}
			else{
				cb();
			}
		}
		
	}

	function testSolutions() {
		for (var i = 0; i < possibleVictories.length; i++){
			var solRow = possibleVictories[i];
			var first_val = getVal(solRow[0][0], solRow[0][1]);
			if (first_val) {
				if (first_val == getVal(solRow[1][0], solRow[1][1]) && first_val == getVal(solRow[2][0], solRow[2][1])){
					return first_val;
				}
			}
		}
		return false;
	}

	function testCat() {
		var emptyCell = false;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if ($scope.board[i][j].val == null) {
					return false;
				}
			}
		}
		return true;
	}

	function getVal(row, col){
		return $scope.board[row][col].val
	}
});


var possibleVictories = [
	[[0, 0], [0, 1], [0, 2]],
	[[1, 0], [1, 1], [1, 2]],
	[[2, 0], [2, 1], [2, 2]], 
	[[0, 0], [1, 0], [2, 0]],
	[[0, 1], [1, 1], [2, 1]],
	[[0, 2], [1, 2], [2, 2]], 
	[[0, 0], [1, 1], [2, 2]], 
	[[0, 2], [1, 1], [2, 0]]
]
