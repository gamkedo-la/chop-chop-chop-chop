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
    var num = (''+char).charCodeAt(0)-65; // a-z
    if (char==' ') num = 0;
    if (char=='.') num = 26;
    if (char==',') num = 27;
    if (char=='?') num = 28;
    if (char=='!') num = 29;
    if (char=='-') num = 40;
    if (char==':') num = 41;
    if (char=='"') num = 42;
    if (isNumeric(char)) num += 47;
    var column = (num % 8);
    //console.log(char+' num:'+num+' col:'+column);
    return column * pixelfont_w;
}
function pixelfont_dy(char) {
    var num = (''+char).charCodeAt(0)-65; // a-z
    if (char==' ') num = 0;
    if (char=='.') num = 26;
    if (char==',') num = 27;
    if (char=='?') num = 28;
    if (char=='!') num = 29;
    if (char=='-') num = 40;
    if (char==':') num = 41;
    if (char=='"') num = 42;
    if (isNumeric(char)) num += 47;
    var row = Math.floor((num / 8));
    //console.log(char+' num:'+num+' row:'+row);
    return row * pixelfont_h;
}

function measurePixelfont(str) {
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

function drawPixelfontCentered(str, x, y) {
    drawPixelfont(str, x - Math.round(measurePixelfont(str) / 2), y);
}

function drawPixelfont(str, x, y) {
    
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
    var sx = 0;
    var sy = 0;
    var index = 0;

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
        }
        else if (str[c] == "$") {
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
            }
            else // normal letter
            {
                sw = pixelfont_w;
                sx = pixelfont_dx(str[c]);
                sy = pixelfont_dy(str[c]);

                // debug! (ps the game starts at frame 1)
                // if (frame_count==1) console.log('txt: index:'+index+'=['+str[c]+'] '+sx+','+sy+' width='+sw)

                // draw it
                canvasContext.drawImage(fontmap,
                    sx,
                    sy,
                    sw,
                    pixelfont_h,
                    pixelfont_x,
                    pixelfont_y,
                    sw,
                    pixelfont_h);

                // move to next position
                pixelfont_x = pixelfont_x + sw + pixelfont_overlap_x;
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
        }
        else if (str[c] == "$") {
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

// animate the letters of a string if now is within range
function npcText(message, x, y, starttime, endtime, faceImage) {

    if (!message || !message.length) return; // sanity
    x = Math.round(x);
    y = Math.round(y);
    var now = performance.now(); // timestamp
    var count = 0; // how many characters to draw this frame
    var percent = 1; // where are we in the animation
    var bubbleWidth = measurePixelfont(message);

    if (now < starttime) {
        count = 0; // draw nothing and wait to start
    }
    else if (now > endtime) {
        count = message.length; // done animating, draw it all
    }
    else if (now >= starttime && now <= endtime) // partway done
    {
        percent = (now - starttime) / (endtime - starttime);
        count = Math.floor(message.length * percent);
    }

    // now render however many chars we want
    message = message.substring(0, count); // FIXME: we need to SKIP (include all the) $emote chars


    if (!faceImage) // word bubble mode
    {
        canvasContext.globalAlpha = 0.25;
        // draw the word bubble left side
        canvasContext.drawImage(sprites.UI.pixelFont, // see imgPayload.js
            0, // sx
            0, // sy
            bubbleWidth, // sw
            32, // sh
            x - 6, // dx
            y - 6, // dy
            bubbleWidth, // dw
            32); // dh

        // draw the word bubble right side (for liquid layout to fit text)
        canvasContext.drawImage(gamePics.fontSheet, // see ImageLoading.js
            252, // sx
            0, // sy
            4, // sw
            32, // sh
            x - 6 + bubbleWidth, // dx
            y - 6, // dy
            4, // dw
            32); // dh

        canvasContext.globalAlpha = 1.0;
    }

    //console.log("npc_text:["+message+"] pos:"+x+","+y+" "+~~starttime+" to "+~~endtime+" now="+~~now+" percent:"+~~percent*100);
    drawPixelfont(message, x, y);
}

// a word bubble
function npcWordBubble(message, x, y, starttime, endtime) {
    npcText(message, x + (-1 * Math.round(measurePixelfont(message) / 2)), y, starttime, endtime);
}

const NPC_FOOTER_TEXT_X = 52; // pixels from the left of the screen
const NPC_FOOTER_TEXT_Y = 48; // pixels from the *BOTTOM* of the screen
const NPC_FOOTER_HEIGHT = 56; // height of entire footer bg image
const NPC_FOOTER_FACEX = 8;
const NPC_FOOTER_FACEY = 52; // from bottom

// a jrpg subtitles footer bar
function npcTextFooter(message, faceImage, starttime, endtime) {
    //console.log('npcTextFooter!');

    //canvasContext.globalAlpha = 0.25;

    // draw the footer bar left side
    canvasContext.drawImage(gamePics.fontSheet,
        0, // sx
        56, // sy of source pixels
        8, // sw
        NPC_FOOTER_HEIGHT, // sh
        0, // dx
        canvas.height - NPC_FOOTER_HEIGHT, // dy
        8, // dw
        NPC_FOOTER_HEIGHT); // dh

    // stretch the footer bar middle
    canvasContext.drawImage(gamePics.fontSheet, // see imgPayload.js
        8, // sx
        56, // sy of source pixels
        240, // sw
        NPC_FOOTER_HEIGHT, // sh
        8, // dx
        canvas.height - NPC_FOOTER_HEIGHT, // dy
        canvas.width - 8 - 8, // dw
        NPC_FOOTER_HEIGHT); // dh

    // draw the footer bar right side
    canvasContext.drawImage(gamePics.fontSheet, // see imgPayload.js
        248, // sx
        56, // sy of source pixels
        8, // sw
        NPC_FOOTER_HEIGHT, // sh
        canvas.width - 8, // dx
        canvas.height - NPC_FOOTER_HEIGHT, // dy
        8, // dw
        NPC_FOOTER_HEIGHT); // dh

    //canvasContext.globalAlpha = 1.0;

    // draw the face portrait
    if (faceImage) {
        canvasContext.drawImage(faceImage, NPC_FOOTER_FACEX, canvas.height - NPC_FOOTER_FACEY);
    }
    else {
        console.log("Warning: missing faceImage in npcGUI")
    }

    npcText(message, NPC_FOOTER_TEXT_X, canvas.height - NPC_FOOTER_TEXT_Y, starttime, endtime, faceImage);
}
