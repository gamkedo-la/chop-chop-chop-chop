var AStarPathfinding = new AStarPathfindingClass();

function AStarPathfindingClass() {

	var currentPath = [];

	this.findPath = function(world, startX,startY, goalX,goalY) { // goal will usually be player 
		var unwalkableTiles = standardCollisionTiles // array found in AnimalClass.js

		var worldWidth = allLevels[currentLevelIndex].columns
		var worldHeight = allLevels[currentLevelIndex].rows

		var worldSize =	worldWidth * worldHeight;

		var distanceFunction = DiagonalDistance;
		var findNeighbours = DiagonalNeighbours;

		function DiagonalDistance(PointX, PointY, GoalX,GoalY) {
			return Math.max(Math.abs(PointX - GoalX), Math.abs(PointY - GoalY));
		}

		function canWalk(tileColumn,tileRow) {
			var arrayIndex = rowColToArrayIndex(tileColumn, tileRow);
			return ((worldGrid[arrayIndex] != null) && 
					(unwalkableTiles.indexOf(worldGrid[arrayIndex]) == -1)); 
		}

		function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
			if (myN) {
				if (myE && canWalk(E,N)) {
					result.push({x:E, y:N});
				}
				if (myW && canWalk(W,N)) {
					result.push({x:W, y:N});
				}
			}
			if (myS) {
				if (myE && canWalk(E,S)) {
					result.push({x:E, y:S});
				}
				if (myW && canWalk(W,S)) {
					result.push({x:W, y:S});
				}
			}
		}

		function locateNieghbours (tileColumn,tileRow) {
			var N = tileColumn - columns;
			var S = tileColumn + columns;
			var E = tileRow + 1;
			var W = tileRow - 1;
			var myN = N > -1 && canWalk(tileColumn, N);
			var myS = S < worldHeight && canWalk(tileColumn, S);
			var myE = E < worldWidth && canWalk(E, tileRow);
			var myW = W > -1 && canWalk(W, tileRow);
			var result = [];
			if (myN) {
				result.push({x: tileColumn, y: N});
			}
			if (myS) {
				result.push({x: tileColumn, y: S});
			}
			if (myE) {
				result.push({x: E, y: tileRow});
			}
			if (myW) {
				result.push({x: W, y: tileRow});
			}
			findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
			return result;
		}

		function Node (Parent, PointX,PointY) {
			var newNode = {
				Parent: Parent,
				value: PointX + (PointY * worldWidth),
				x: PointX,
				y: PointY,
				f:0,
				// the heuristic estimated cost
				// of an entire path using this node
				g:0
				// the distanceFunction cost to get
				// from the starting point to this node
			};
			return newNode;
		}

		function calculatePath() {
			var myPathStart = Node(null, startX, startY);
			var myPathGoal = Node(null, goalX, goalY);

			var AStar = new Array(worldSize);

			var Open = [myPathStart];
			var result = [];

			var myNeighbours;
			var myNode;
			var myPath;

			var length, max,min,i,j;

			while(length = Open.length) {
				max = worldSize;
				min = -1;
				for (i = 0; i < length; i++) {
					if (Open[i].f < max) {
						max = 
					}
				}
			}
		} // more to do: refer to Mage Hook for further example

}
