var mainMenu = {
	layout: [ 
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,400,400,400,400,400,400,400,400,
	000,000,103,000,131,132,130,000,000,000,000,000,000,000,000,000,000,400,400,400,400,400,400,400,400,
	000,132,131,132,131,130,000,000,132,130,000,103,201,000,000,000,000,000,000,000,000,000,000,400,400,
	000,130,132,131,201,000,103,000,130,131,000,000,000,000,000,000,000,000,200,000,000,000,200,400,400,
	000,131,131,132,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,400,400,
	000,000,000,000,000,109,000,000,000,000,000,000,104,104,000,104,000,000,000,000,200,105,000,400,400,
	000,000,000,103,000,000,000,201,000,132,000,000,104,000,104,000,000,000,000,105,108,000,000,400,400,
	000,201,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,400,400,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,207,000,000,000,000,000,000,000,000,000,000,000,000,000,129,000,203,000,102,
	000,000,000,100,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,101,112,000,129,000,
	000,000,207,000,000,000,100,000,000,000,104,000,000,000,000,000,000,000,000,000,000,000,000,000,101,
	000,000,100,000,000,000,000,000,000,000,000,104,104,000,000,000,101,000,203,000,129,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,104,000,000,000,000,129,000,102,000,000,000,000,000,
	000,207,000,000,100,000,000,207,000,000,000,000,000,104,000,000,000,000,000,000,101,000,203,129,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,111
	],
	playerStartArrayIndex: 285,
	treesToCut: 5,
	columns: 25,
	rows: 19,
	name: "Main Menu"
};

var mountainBase = {
	layout: [ 
	400,400,400,400,400,400,315,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,310,000,000,000,000,000,303,003,003,003,003,307,000,000,000,
	400,400,400,400,400,400,000,000,000,102,000,201,000,000,000,101,200,000,000,200,203,102,000,203,000,315,310,000,000,000,000,303,500,000,000,501,307,000,000,000,
	400,400,400,400,400,000,000,201,000,000,000,000,000,000,000,000,000,000,000,511,000,000,000,101,000,000,315,310,000,000,000,303,500,000,000,104,307,000,000,000,
	400,400,400,400,000,000,000,000,000,000,000,000,101,000,000,000,000,000,000,000,000,000,000,000,000,000,000,315,310,000,000,303,104,104,104,501,307,000,000,000,
	400,400,400,000,000,000,000,000,000,000,200,000,000,000,203,000,000,000,511,000,000,000,201,000,000,000,100,000,315,301,301,313,104,000,104,104,315,301,301,310,
	400,400,000,000,504,502,502,502,505,000,000,000,100,000,000,000,511,000,000,000,000,000,000,000,000,102,000,000,000,000,000,000,500,000,000,501,100,203,101,307,
	301,302,000,000,500,000,000,000,511,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,510,000,000,501,000,000,000,307,
	311,303,000,000,500,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,501,000,000,000,307,
	303,303,000,000,500,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,501,000,200,000,307,
	303,303,000,000,500,000,000,000,508,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,509,000,000,501,000,101,000,307,
	303,303,000,000,507,503,503,503,506,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,500,000,000,501,000,000,000,307,
	303,303,000,200,000,000,000,000,000,000,000,200,000,000,000,000,203,000,000,000,200,000,000,000,000,000,000,000,000,000,203,000,500,000,000,501,000,000,000,307,
	304,303,000,000,000,000,000,000,201,000,000,000,000,100,000,000,000,000,000,000,000,000,000,000,000,000,000,000,203,000,000,000,500,000,000,501,000,203,000,307,
	000,303,111,112,000,112,000,000,000,000,100,000,802,000,000,100,000,000,000,000,000,000,201,101,000,127,000,000,103,000,000,000,500,000,000,501,000,000,000,307,
	119,303,119,111,000,000,000,000,000,000,000,103,000,000,000,000,100,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,500,000,000,501,000,200,000,307,
	113,303,113,113,114,112,000,000,000,000,100,000,100,000,103,000,000,000,000,000,000,000,200,000,000,000,000,101,203,000,000,000,500,000,000,501,000,000,000,307,
	000,314,305,305,305,305,305,305,305,311,000,000,000,000,000,000,100,000,000,000,000,109,000,000,000,000,000,000,000,000,200,000,500,000,000,501,000,000,100,307,
	305,305,305,305,305,305,305,305,311,314,305,305,305,305,311,000,000,000,000,000,000,000,000,000,000,115,116,116,116,117,000,000,500,000,000,501,000,201,000,307,
	305,305,305,305,305,305,305,311,314,305,305,305,305,311,314,311,000,000,000,000,000,000,000,100,000,118,119,119,119,120,000,000,500,000,000,501,000,000,000,307,
	305,305,305,305,305,305,311,314,305,305,305,305,311,315,302,314,305,305,305,305,311,000,000,800,000,118,119,119,119,120,103,000,500,000,000,501,000,100,000,307,
	000,000,000,000,000,203,314,305,305,305,305,311,314,311,306,305,305,305,305,311,314,305,311,000,000,121,122,122,122,123,000,000,500,000,000,501,201,000,203,307,
	000,000,000,000,000,000,000,000,000,000,000,314,311,314,305,305,305,305,311,314,305,311,303,000,000,000,000,000,206,206,206,000,500,000,000,501,000,202,000,307,
	203,000,203,000,000,000,000,000,000,203,000,000,314,305,305,305,305,311,314,305,311,303,303,000,000,000,000,000,400,400,400,205,500,000,000,501,000,000,200,307,
	000,000,000,000,000,000,000,000,000,000,000,000,000,203,000,000,000,314,305,311,303,303,303,000,000,000,125,205,400,400,400,504,510,000,000,511,505,000,000,307,
	000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,303,303,303,303,000,000,205,400,400,400,400,400,500,000,000,000,000,501,000,000,307,
	000,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,203,000,303,303,303,303,000,000,206,400,400,400,400,400,500,000,000,000,000,501,000,000,307,
	000,000,203,000,000,000,203,000,000,000,000,000,203,000,000,203,000,000,000,303,303,303,303,000,000,000,132,400,400,400,400,500,806,000,000,000,501,000,000,307,
	000,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,303,303,303,303,000,000,132,400,400,400,803,400,507,503,503,503,503,506,000,000,307,
	000,000,000,000,000,000,000,000,000,000,308,301,301,301,301,301,301,301,301,313,303,303,303,000,000,132,400,400,400,400,400,400,400,400,400,400,400,131,125,307,
	000,203,000,000,000,000,000,000,000,000,303,308,301,301,301,301,301,301,301,301,313,303,303,000,000,132,400,400,400,400,400,400,400,400,400,400,400,205,000,307,
	000,000,000,000,000,203,000,203,000,000,303,303,308,301,301,301,301,301,301,301,301,313,303,000,000,130,131,400,400,400,400,400,400,400,400,400,130,000,000,307,
	000,000,000,000,000,000,000,000,000,000,303,303,303,113,111,114,112,119,119,000,112,112,303,113,000,000,000,132,400,400,400,400,400,206,130,131,000,000,000,307,
	000,000,203,000,000,000,000,000,000,000,303,303,303,112,119,111,113,111,113,113,114,501,303,112,113,000,000,000,206,000,206,000,206,000,000,000,000,000,114,306,
	000,000,000,000,000,000,000,000,203,000,303,303,303,112,114,112,111,119,114,111,112,501,303,111,112,113,119,000,000,114,112,113,000,114,111,114,113,111,112,111,
	000,000,000,000,000,000,000,000,000,000,303,303,303,114,111,111,113,112,114,119,114,114,303,113,114,111,111,000,112,112,113,114,111,114,112,111,111,114,119,111,
	000,000,000,000,000,000,000,000,000,000,303,303,303,111,112,119,113,114,111,111,114,501,303,113,113,111,113,000,111,113,000,111,119,119,119,111,119,113,114,000,
	000,000,000,000,000,203,000,000,000,000,303,303,303,113,111,113,119,114,112,125,112,114,303,113,113,114,114,112,114,113,114,114,111,114,112,000,111,111,113,113,
	000,203,000,000,000,000,000,000,000,000,303,303,303,113,113,114,114,112,114,111,000,112,303,112,114,113,113,119,113,113,000,125,113,000,119,111,114,000,113,000,
	000,000,000,000,000,000,000,203,000,000,303,303,303,112,111,113,111,114,114,112,114,501,303,112,119,113,113,000,112,113,112,112,111,111,113,114,111,119,119,111,
	000,000,000,000,000,000,000,000,000,000,303,303,303,111,111,000,119,111,111,119,111,501,303,114,114,112,125,112,111,119,119,119,111,114,111,119,119,000,111,125
	],
	playerStartArrayIndex: 326,
	treesToCut: 35,
	columns: 40,
	rows: 40,
	name: "Mountain Base"
};

var mountainTop = {
	layout: [ 
	000,000,000,334,000,000,000,000,000,000,000,000,000,000,000,336,000,333,336,000,000,000,336,324,326,324,326,326,326,326,324,324,326,326,324,326,325,326,326,324,326,324,324,331,112,114,111,112,113,112,112,111,307,113,113,400,400,400,111,308,
	000,333,000,000,333,000,000,335,000,333,000,000,334,000,336,336,000,000,000,335,000,000,331,000,000,000,207,000,000,000,000,000,000,207,000,000,000,000,000,000,000,000,107,203,000,000,000,114,113,112,114,113,307,119,111,400,400,400,113,303,
	336,000,000,334,000,000,336,000,000,000,000,000,000,000,333,000,000,335,000,000,000,334,330,000,000,000,000,000,000,000,114,000,000,000,000,000,000,000,000,000,000,000,000,000,000,113,000,000,112,119,112,114,307,112,112,400,400,400,112,303,
	333,326,324,326,324,326,324,326,324,326,326,325,324,326,324,324,326,325,324,325,326,324,325,000,000,000,000,000,000,000,000,000,000,000,000,000,203,000,109,000,000,000,000,000,000,000,000,000,000,111,119,113,307,119,114,400,400,400,114,303,
	330,000,203,000,000,000,000,203,000,101,000,000,000,203,000,000,000,000,000,000,000,000,203,000,000,000,000,000,207,000,000,000,000,000,000,000,000,000,000,000,000,000,207,000,113,000,000,000,000,112,111,112,307,114,113,400,400,400,114,303,
	330,000,000,124,000,000,000,000,000,000,203,000,000,000,000,000,000,000,101,000,000,000,000,000,000,000,000,101,000,000,201,000,101,000,125,000,000,000,000,000,101,000,000,000,000,000,000,112,000,111,114,112,307,113,111,400,400,400,112,303,
	331,000,000,000,202,000,801,000,000,000,000,000,132,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,113,307,112,114,400,400,400,114,303,
	332,000,132,000,000,000,000,203,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,206,000,000,306,305,305,401,402,403,305,304,
	330,000,000,000,000,000,000,000,000,207,000,000,201,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,111,000,000,000,000,000,000,000,000,000,000,000,000,101,000,000,000,000,125,000,205,504,510,400,400,400,400,400,400,
	331,000,201,000,101,000,000,000,000,000,000,000,000,000,000,000,000,000,000,207,000,000,129,000,000,000,000,207,000,000,000,000,000,000,000,207,000,000,000,000,000,000,203,000,000,000,205,000,125,206,000,504,510,400,400,400,400,400,400,400,
	330,000,000,000,000,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,504,510,400,400,400,400,400,400,400,400,
	331,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,102,000,000,000,000,000,000,000,000,203,000,000,132,000,000,000,000,000,000,000,000,504,510,400,400,400,400,400,400,400,400,400,
	331,000,000,000,000,000,000,000,000,203,000,000,132,000,000,114,115,116,117,113,000,000,000,207,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,107,201,000,000,504,510,400,400,400,400,400,400,400,400,400,400,
	331,000,000,000,000,000,000,000,000,000,000,000,000,113,115,116,119,119,120,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,106,000,000,202,000,000,000,000,000,000,000,000,000,504,510,400,400,400,400,400,400,400,400,400,400,400,
	330,000,203,000,000,203,000,101,000,000,000,115,116,116,119,119,119,119,120,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,806,000,000,000,000,000,203,000,000,000,500,400,400,400,400,400,400,400,400,400,400,400,400,
	331,000,000,000,000,000,000,000,000,207,000,118,119,119,119,119,119,119,123,000,000,000,000,000,000,203,000,000,112,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,500,400,803,400,400,400,400,400,400,400,400,400,400,
	330,000,000,207,000,000,000,000,000,000,112,118,119,119,119,119,119,123,114,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,203,000,000,201,000,000,203,000,113,000,201,000,000,500,400,400,400,400,400,400,400,400,400,400,400,400,
	331,000,000,000,000,000,113,114,000,115,116,119,119,119,119,119,123,112,000,000,000,000,000,000,000,000,000,000,000,000,000,125,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,500,400,400,400,400,400,400,400,400,400,400,400,400,
	331,000,000,000,101,000,112,113,201,121,122,122,122,122,122,123,113,000,000,000,000,000,000,207,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,101,000,205,507,509,400,400,400,400,400,400,400,400,400,400,400,
	331,000,000,000,000,000,000,000,000,101,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,207,000,000,203,000,000,000,000,201,000,000,000,000,000,000,000,000,000,000,000,000,000,507,509,400,400,400,400,400,400,400,400,400,400,
	331,000,000,000,101,000,000,000,000,000,101,000,207,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,205,000,000,000,000,000,000,125,000,507,509,400,400,400,400,400,400,400,400,400,
	331,000,101,000,000,000,000,207,000,000,000,000,000,000,000,000,000,000,101,000,208,000,000,000,000,000,000,100,000,000,000,000,000,000,000,000,000,000,000,101,000,000,000,000,000,000,205,000,205,000,507,509,400,400,400,400,400,400,400,400,
	330,000,000,207,000,000,000,000,000,101,000,126,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,115,117,000,000,000,000,000,000,203,000,000,000,000,203,000,100,000,000,000,000,000,000,507,509,400,400,400,400,400,400,400,
	331,000,000,000,000,208,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,201,000,000,000,000,121,123,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,507,509,400,400,400,400,400,400,
	331,000,000,000,000,000,000,000,000,000,000,000,000,000,000,208,000,000,207,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,100,000,000,000,000,000,129,000,000,000,000,000,000,000,000,000,206,000,000,507,509,400,400,400,400,400,
	331,000,000,000,000,000,000,000,000,000,000,207,000,000,000,000,000,000,000,000,000,000,101,000,000,000,000,000,000,000,000,000,203,000,000,000,000,000,112,000,000,000,000,000,100,000,000,112,000,000,000,125,206,000,507,509,400,400,400,400,
	330,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,103,000,000,000,000,102,000,000,000,000,000,208,000,000,000,000,000,000,000,000,000,000,000,000,102,000,000,000,000,000,000,000,000,000,108,000,000,507,509,400,400,400,
	331,000,000,000,000,000,000,208,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,207,000,000,000,000,201,000,000,000,000,000,000,000,000,000,000,000,000,000,205,000,000,507,509,400,400,
	331,000,207,000,000,000,000,000,000,000,000,000,000,000,000,000,132,000,000,000,000,208,000,000,000,203,000,000,000,000,000,000,125,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,129,000,000,000,000,000,000,206,000,507,509,308,
	331,000,000,000,208,000,000,000,000,000,000,000,000,103,208,130,131,000,000,000,000,000,000,114,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,203,125,000,000,000,113,000,000,000,000,000,000,000,205,303,
	330,000,000,103,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,805,000,000,000,000,000,000,000,000,000,000,000,800,000,000,000,000,000,000,000,000,000,207,000,000,000,000,000,101,000,000,000,000,000,508,000,000,100,000,125,303,
	331,000,000,000,000,000,000,000,000,000,208,000,000,130,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,205,303,
	331,000,000,000,000,131,130,000,000,000,000,000,000,000,000,104,000,000,208,000,000,131,132,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,100,000,000,000,000,000,000,000,508,000,000,000,206,000,303,
	331,000,000,000,000,132,131,000,104,104,000,000,000,000,000,104,104,000,103,000,000,000,131,130,000,000,208,000,000,000,000,000,000,000,000,101,203,000,000,114,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,508,000,000,000,303,
	330,000,000,000,000,000,000,000,001,001,001,001,001,001,001,001,000,000,000,000,000,000,130,000,101,000,000,000,203,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,203,000,000,508,509,000,000,508,509,000,303,
	331,000,000,208,000,805,000,000,001,104,104,104,113,104,104,001,104,000,130,131,000,000,000,000,000,000,000,102,000,101,000,000,000,000,000,000,000,100,000,000,000,000,000,000,000,000,000,000,000,000,000,000,511,500,000,000,501,510,205,303,
	330,000,131,000,000,000,000,000,001,104,002,002,002,002,112,001,104,000,000,130,000,000,000,000,000,000,000,000,000,000,000,000,000,203,000,000,000,000,000,000,000,203,000,504,502,505,000,000,000,000,100,000,000,500,000,000,501,000,000,303,
	331,000,131,000,000,000,000,000,001,114,002,003,003,002,104,001,000,000,000,000,000,508,509,000,000,000,000,000,000,000,208,000,000,000,000,000,000,000,000,000,000,000,000,500,128,501,000,203,000,000,000,000,207,500,000,000,501,100,000,303,
	331,000,000,000,000,208,000,104,001,111,002,003,003,002,104,001,000,000,000,000,000,511,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,502,510,000,511,502,502,502,502,502,502,502,510,000,000,501,000,000,303,
	331,000,208,000,103,000,000,000,001,104,002,002,002,002,104,001,000,208,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,501,000,205,303,
	332,000,000,000,000,000,000,104,001,104,113,104,112,104,114,001,000,000,000,131,000,508,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,503,509,000,000,501,000,000,303,
	331,000,000,000,000,131,000,000,001,001,001,001,001,001,001,001,000,000,131,000,000,511,510,000,000,113,000,113,000,000,000,000,000,111,000,000,000,000,000,000,112,114,000,000,000,000,000,000,000,113,000,111,000,500,000,000,501,000,206,303,
	331,000,000,208,000,000,131,000,000,104,000,000,104,104,000,208,000,000,000,000,208,000,000,000,300,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,302,500,000,000,501,300,301,313,
	330,000,000,000,000,000,000,000,000,000,000,208,000,000,000,000,000,805,000,000,000,000,000,309,312,000,119,119,113,111,000,000,113,000,000,000,119,000,114,000,000,113,000,000,113,000,000,112,000,112,000,000,303,500,000,000,501,307,000,000,
	305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,312,000,111,112,000,000,111,113,119,000,111,111,111,111,000,112,113,000,119,112,112,113,111,119,111,113,119,111,113,303,500,000,000,501,307,000,000
	],
	playerStartArrayIndex: 2635,
	treesToCut: 85,
	columns: 60,
	rows: 45,
	name: "Mountain Top"
};

var moon = {
	layout: [ 
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,701,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,700,001,001,001,001,703,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,210,001,001,001,209,001,001,001,001,001,001,001,001,001,001,707,001,001,001,001,001,001,001,001,708,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,701,001,001,001,001,001,001,001,704,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,702,001,001,001,001,001,001,001,001,702,001,706,705,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,703,001,001,001,001,709,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,204,001,001,001,211,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,702,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,703,001,001,001,700,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,702,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,704,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,212,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001
	],
	playerStartArrayIndex: 326,
	treesToCut: 1, //30,
	columns: 40,
	rows: 40,
	name: "Moon"
};

/*blank layout: [ 
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
	000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000
	],*/

var moonMainMenu = [ 
	001,001,001,001,001,001,001,001,001,001,001,001,001,002,002,002,002,002,002,002,002,002,002,002,002,
	001,001,001,001,001,001,001,701,001,001,001,001,001,001,002,002,002,002,002,002,002,002,002,002,002,
	001,001,001,001,001,001,210,001,001,001,001,001,001,001,001,002,002,002,002,002,002,002,002,002,002,
	001,001,700,001,001,001,001,001,001,001,001,001,001,001,001,001,002,002,002,002,002,002,002,002,002,
	001,001,001,001,001,001,706,001,703,001,001,001,001,001,001,001,001,001,002,002,002,002,002,002,002,
	001,001,210,001,705,001,001,001,001,001,001,001,001,001,001,209,001,001,001,002,002,002,002,002,002,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,701,001,001,001,001,209,002,002,002,002,
	001,001,001,001,001,001,001,001,001,001,001,001,001,707,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,209,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,702,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,704,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,212,001,001,001,001,702,001,001,001,001,001,001,001,701,001,001,700,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,212,001,001,001,001,001,001,001,001,001,001,001,211,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,212,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,703,001,001,001,
	001,001,001,001,001,001,001,701,001,001,001,001,001,001,001,001,001,001,001,702,001,001,001,211,001,
	001,700,001,001,001,001,001,001,001,001,001,001,704,001,001,001,001,001,001,001,001,001,001,001,001,
	001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001,001
];

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