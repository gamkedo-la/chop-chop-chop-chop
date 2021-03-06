// quick n dirty pixel font using a spritesheet
// made for gamkedo with love from mcfunkypants

// this version is specific to the chop-chop-chop fontmap image
// which is on a 10x10 PIXEL grid as follows:
// ABCDEFGH
// IJKLMNOP
// QRSTUVWX
// YZ.,?!01
// 23456789

var pixelfont_x_margin = 0; // where the lines start
var pixelfont_overlap_x = -1; // kerning
var pixelfont_space_width = 5; // width of " " 
var pixelfont_x = 0; // where we last were
var pixelfont_y = 0; // current line
var pixelfont_line_height = 10; // pixels

// non-proportional 10px by 10px grid
var pixelfont_h = 10;
var pixelfont_w = 10;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function pixelfont_dx(char) {
    var num = ('' + char).charCodeAt(0) - 65; // a-z
    if (char == ' ') num = 0;
    if (char == '.') num = 26;
    if (char == ',') num = 27;
    if (char == '?') num = 28;
    if (char == '!') num = 29;
    if (char == '-') num = 40;
    if (char == ':') num = 41;
    if (char == '"') num = 42;
    if (char == "'") num = 43;
    if (char == '+') num = 44;
    if (char == '/') num = 45;
    if (isNumeric(char)) num += 47;
    var column = (num % 8);
    //console.log(char+' num:'+num+' col:'+column);
    return column * pixelfont_w;
}

function pixelfont_dy(char) {
    var num = ('' + char).charCodeAt(0) - 65; // a-z
    if (char == ' ') num = 0;
    if (char == '.') num = 26;
    if (char == ',') num = 27;
    if (char == '?') num = 28;
    if (char == '!') num = 29;
    if (char == '-') num = 40;
    if (char == ':') num = 41;
    if (char == '"') num = 42;
    if (char == "'") num = 43;
    if (char == '+') num = 44;
    if (char == '/') num = 45;
    if (isNumeric(char)) num += 47;
    var row = Math.floor((num / 8));
    //console.log(char+' num:'+num+' row:'+row);
    return row * pixelfont_h;
}

function measurePixelfont(str, pixelfont_w = 10) {
    var w = 0;
    var index = 0;
    var max = 0; // multiple lines count from 0

    // delete any "$emotes "
    str = stringWithoutEmotes(str);

    for (var c = 0, len = str.length; c < len; c++) {
        index = str.charCodeAt(c) - 32 - 1;
        w += pixelfont_w;
        if (str[c] == "\n") w = 0; // new line
        if (max < w) max = w;
    }
    return max;
}

// warning, gets called every frame that a npc chat text has an emote code in it
function handleEmote(emoteCode) {
    //console.log("handleEmote: "+emoteCode); // FIXME implement!
}

function drawPixelfontCentered(str, x, y, pixelfont_new_w = 10, pixelfont_new_h = 10) {
    drawPixelfont(str, x - Math.round(measurePixelfont(str) / 2, pixelfont_new_w), y, pixelfont_new_w, pixelfont_new_h);
}

function drawPixelfont(str, x, y, pixelfont_new_w = 10, pixelfont_new_h = 10) {

    str = str.toUpperCase(); // we only have caps in this font
    //console.log("drawPixelfont " + str + "," + x + "," + y);

    // sanity checks for globals init by the game engine
    if (!window.canvasContext) {
        console.log("pixelfont_draw: missing canvasContext");
        return;
    }

    var fontmap = gamePics.fontSheet;
    if (!fontmap) {
        console.log("pixelfont_draw: missing image!");
        return;
    }

    pixelfont_x_margin = x;
    pixelfont_x = x;
    pixelfont_y = y;
    var sw = 0;
    var sh = 0;
    var sx = 0;
    var sy = 0;
    var index = 0;

    var pfw = pixelfont_new_w;
    var pfh = pixelfont_new_h;

    var insideEmote = false;
    var skipThisChar = false;
    var emoteCode = "";

    for (var c = 0, len = str.length; c < len; c++) {
        index = str.charCodeAt(c) - 32 - 1;

        skipThisChar = false;
        if (insideEmote) {
            if (str[c] == " ") {
                insideEmote = false;
                skipThisChar = true; // avoid double space from where we delete the $code
                handleEmote(emoteCode);
            } else {
                emoteCode = emoteCode + str[c];
            }
        } else if (str[c] == "$") {
            insideEmote = true;
            emoteCode = "";
        }

        if (!insideEmote && !skipThisChar) {

            // linefeed?
            if (str[c] == "\n") {
                //console.log('TXT newline!');
                pixelfont_x = pixelfont_x_margin;
                pixelfont_y += pixelfont_line_height;
            }
            // space?
            else if (str[c] == " ") {
                pixelfont_x += pixelfont_space_width;
            } else // normal letter
            {
                sw = pixelfont_w;
                sh = pixelfont_h;
                sx = pixelfont_dx(str[c]);
                sy = pixelfont_dy(str[c]);

                // debug! (ps the game starts at frame 1)
                // if (frame_count==1) console.log('txt: index:'+index+'=['+str[c]+'] '+sx+','+sy+' width='+sw)

                // draw it
                canvasContext.drawImage(fontmap,
                    sx,
                    sy,
                    sw,
                    sh,
                    pixelfont_x,
                    pixelfont_y,
                    pfw,
                    pfh);

                // move to next position
                pixelfont_x = pixelfont_x + pfw + pixelfont_overlap_x;
            } // draw
        } // in not in an emote code
    } // char loop
    return sw; // returns pixel width of string
}

// count the chars in a string but ignore any word starting with $
function stringLengthWithoutEmotes(str) {
    return stringWithoutEmotes(str).length;
}

// strip out anything like "$code " from a string
function stringWithoutEmotes(str) {
    var insideEmote = false;
    var output = "";
    var insideEmote = false;
    var skipThisChar = false;
    var emoteCode = "";

    for (var c = 0; c < str.length; c++) {

        skipThisChar = false;
        if (insideEmote) {
            if ((str[c] == " ")) {
                insideEmote = false;
                skipThisChar = true;
            }
        } else if (str[c] == "$") {
            insideEmote = true;
            emoteCode = "";
        }

        if (!insideEmote && !skipThisChar) {
            output = output + str[c];
        }
    }

    //console.log('stringWithoutEmotes='+output);
    return output;
}

function NpcText() {
    /*
    - smol thing by kise 
    - does not support wrapping for now 
    - if not centred just add spaces to beginning/end of string lol someone can fix this if they want
    
    ps: some chars. in pixel font are measured differently, so expect varying left/right padding when using: w, m OR w, m with letters t, i, o, !, and some others
    */
    this.counter = 0;
    this.bubWidth = 0;

    var bubHeight = 35;
    var bubBorder = 10;
    var bubRadius = 5;
    var bubBuffX = 5;

    var textBuffY = bubHeight - bubHeight / 2 - 5;
    var textSpeed = 0.8;

    var lineHeight = 15;

    var arrowBuffY = bubHeight;
    
    this.drawBubble = function(bubbleX, bubbleY,  bubbleWidth, bubbleHeight, bubbleRadius, arrowX, arrowY) {
         roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, bubbleRadius, true, true);
         canvasContext.drawImage(gamePics["textTriangle"], arrowX, arrowY);
    }

    this.printWords = function (str, x, y) {
        var typewriterText, measureText, textWidth, halfBubWidth, bubX, bubWidth;
        if (this.counter <= str.length) {
            this.counter += textSpeed;
        }
        typewriterText = str.substr(0, this.counter);
        measureText = canvasContext.measureText(typewriterText);
        textWidth = measureText.width;
        
        while (this.bubWidth < textWidth + bubBorder) {
            this.bubWidth++;
        }
        halfBubWidth = this.bubWidth * 0.5;
        bubX = (x - halfBubWidth);
        bubWidth = (this.bubWidth + halfBubWidth) + (halfBubWidth + bubBorder);
        this.drawBubble(bubX - bubBuffX, y, bubWidth, bubHeight, bubRadius, x, y + arrowBuffY);
        drawPixelfont(typewriterText, bubX + bubBuffX, y + textBuffY, 10, 10);
    }

    this.resetLetters = function () {
        this.counter = 0;
        this.bubWidth = 0;
    }
}
