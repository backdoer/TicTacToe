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

	$scope.winner = null;
	$scope.board = generateBoard();
	$scope.onX = true;

	var board = document.getElementById("board");

	$scope.reset = function(){
		$scope.board = generateBoard();
		$scope.winner = null;
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
			checkForVictor();
		}
		
	};

	function checkForVictor() {
		var winner = testSolutions();
		if (winner) {
			$scope.winner = winner;
			board.classList.add("disabled");
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
