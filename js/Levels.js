var mountainBase = {
	layout: [ 
	325,326,324,326,324,324,326,325,324,326,326,324,325,326,324,326,324,326,326,324,325,326,326,325,326,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,801,000,000,000,
	000,000,000,200,200,200,000,000,000,000,203,000,000,400,400,400,400,400,000,200,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,400,400,400,804,400,000,000,000,000,000,000,000,
	000,000,000,000,000,000,113,112,000,000,000,000,000,400,400,400,400,000,000,000,000,000,000,000,000,
	000,000,000,000,104,000,111,114,000,000,132,131,000,400,400,400,400,000,000,000,000,000,000,000,000,
	000,000,129,000,124,125,000,000,000,000,131,130,000,400,803,400,400,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,115,117,000,130,802,000,400,400,400,400,000,000,000,000,000,805,000,000,
	000,000,000,000,000,000,115,119,120,000,000,000,000,000,000,000,000,000,000,000,126,000,000,000,000,
	000,000,000,000,200,000,118,119,120,000,000,000,000,000,000,201,000,000,000,000,000,127,000,000,000,
	000,000,000,000,103,000,121,122,123,000,000,000,000,200,103,000,000,000,000,000,000,000,128,000,000,
	000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,204,000,202,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,103,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,200,000,000,
	000,000,000,104,105,106,107,108,109,110,000,000,000,000,000,000,000,000,000,000,000,800,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,806,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,200,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,300,301,301,301,301,301,301,301,301,301,301,302,
	000,000,000,000,000,000,000,000,000,000,000,000,000,307,000,000,000,000,000,000,201,000,000,000,303,
	000,000,000,316,317,317,317,318,000,000,000,000,000,307,000,000,000,000,000,201,000,201,000,000,303,
	000,000,000,323,000,000,000,319,000,000,000,000,000,306,000,000,000,000,000,000,200,000,000,000,303,
	000,000,000,323,000,001,000,319,000,000,000,000,200,201,000,000,000,000,000,000,000,000,000,000,303,
	000,000,000,323,000,000,000,320,100,000,100,000,000,000,000,000,000,000,000,000,000,000,000,000,303,
	000,000,000,323,000,000,000,000,000,100,000,000,000,000,000,000,000,000,000,000,000,000,000,000,303,
	000,000,000,322,000,000,000,000,100,000,100,000,000,000,000,000,000,000,000,000,000,000,000,000,303,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,400,400,400,303,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,308,301,401,402,403,313,
	000,000,000,000,200,000,000,000,000,000,000,000,000,000,000,000,000,000,000,303,400,400,400,400,400,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,303,400,400,400,400,400,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,303,400,400,400,400,400,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,303,400,400,400,400,400,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,303,400,400,400,400,400,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,303,400,400,400,400,400,
	305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,304,400,400,400,400,400],
	originalLayout: null,
	columns: 25,
	rows: 40,
	name: "mountainBase"
};

var testLevel = {
	layout: [
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,001,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,200,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,200,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,200,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	],
	originalLayout: null,
	columns: 25,
	rows: 20,
	name: 'testLevel'
}

function setOriginalLayouts() {
	if (firstTime) {
		mountainBase.originalLayout = mountainBase.layout.slice();
		testLevel.originalLayout = testLevel.layout.slice();
	}
	firstTime = false;
}


var randomForest = sproutRandomTrees(mountainBase);

// When adding a level, make sure to add the level to the allLevels array in World.js


function sproutRandomTrees(old) { // adds trees to an existing level
    const CHANCE_OF_A_TREE = 0.05; // 0.1 means a 10% chance per empty tile
    var lvl = { columns:old.columns, rows:old.rows, layout: Array.from(old.layout) };
    for (var i=0; i<old.layout.length; i++) {
        //lvl.layout[i] = old.layout[i];
        if (lvl.layout[i]==0) { // empty tile?
            if (Math.random()<CHANCE_OF_A_TREE) {
                lvl.layout[i]=100; // not defined yet: TILE_TREE;
            }
        }
    }
    return lvl;
}