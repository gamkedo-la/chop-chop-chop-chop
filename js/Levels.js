var levelOne = {
	layout: [
//  0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,01,//0
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//1
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,82,00,00,00,//2
    00,00,00,01,01,01,00,00,00,00,00,00,00,05,05,05,05,05,00,00,00,00,00,00,00,//3
    00,00,00,00,00,00,00,00,00,00,00,00,00,05,05,05,05,05,00,00,00,00,00,00,00,//4
    00,00,00,00,00,00,00,00,00,00,00,00,00,05,05,05,05,00,00,00,00,00,00,00,00,//5
    00,00,00,00,04,00,00,00,00,00,00,00,00,05,05,05,05,00,00,00,00,00,00,00,00,//6
    00,00,00,00,00,00,00,00,00,00,00,00,00,05,05,05,05,00,00,00,00,00,00,00,00,//7
    00,00,00,00,00,00,00,00,00,00,00,00,00,05,05,05,05,00,00,00,00,00,00,00,00,//8
    00,00,00,00,00,00,00,00,02,00,02,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//9
    00,00,00,00,01,00,00,00,00,02,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//10
    00,00,00,00,03,00,00,00,02,00,02,00,00,01,03,00,00,00,00,00,00,00,00,00,00,//11
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//12
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//13
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//14
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//15
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//16
    00,00,00,03,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//17
    00,00,00,00,00,06,07,08,09,10,11,12,13,00,00,00,00,00,00,00,00,81,00,00,00,//18
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//19
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//20
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//21
    00,00,00,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,//22
    00,00,00,00,00,00,00,00,00,00,00,00,00,14,15,15,15,15,15,15,15,15,15,15,16,//23
    00,00,00,00,00,00,00,00,00,00,00,00,00,21,00,00,00,00,00,00,01,00,00,00,17,//24
    00,00,00,22,23,23,23,24,00,00,00,00,00,21,00,00,00,00,00,01,00,01,00,00,17,//25
    00,00,00,29,00,00,00,25,00,00,00,00,00,20,00,00,00,00,00,00,01,00,00,00,17,//26
    00,00,00,29,00,00,00,25,00,00,00,00,01,00,00,00,00,00,00,00,00,00,00,00,17,//27
    00,00,00,29,00,00,00,26,02,00,02,00,00,00,00,00,00,00,00,00,00,00,00,00,17,//28
    00,00,00,29,00,00,00,00,00,02,00,00,00,00,00,00,00,00,00,00,00,00,00,00,17,//29
    00,00,00,28,00,00,00,00,02,00,02,00,00,00,00,00,00,00,00,00,00,00,00,00,17,//30
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,17,//31
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,14,19,18,//32
    00,00,00,00,01,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,17,05,05,//33
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,14,19,18,05,05,//34
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,17,05,05,05,05,//35
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,17,05,05,05,05,//36
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,14,18,05,05,05,05,//37
    00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,17,05,05,05,05,05,//38
    19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,05,05,05,05,05 //39
	],
	columns: 25,
	rows: 40
};

// When adding a level, make sure to add the level to the allLevels array in World.js
