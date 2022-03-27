var maps,maplist,_mapname,mapjson,_mapdiff,_mapbuilders,_maplength;
loadJSON(function(response) {maps = JSON.parse(response);
      maplist = maps["maps"]
      var q = true;
      while(q) {
      _mapname = maplist[Math.floor(Math.random() * maplist.length)];
      mapjson = maps[_mapname.toLowerCase()]
      _mapdiff = mapjson.diff;
      if ((read_cookie(`diff${_mapdiff}`) == "true") || (read_cookie(`diff${_mapdiff}`) == null)) q = false;
    }
     _mapbuilders = mapjson.creators;
     _maplength = _mapname.split("").length;
    //console.log(_mapname)
   });

var guesses = 0;
var result = "";

function read_cookie(key)
{
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'maps.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }


 function CreateRow(b1,b2,b3,b4) {

//[false,"guessoff","▼"]
var div = document.createElement("div");
div.id = `row${guesses}`
var button1= document.createElement("button")
button1.className = `button hint guessfont ${b1[0]}`
var button2= document.createElement("button")
button2.className = `button hint guessfont ${b2[1]}`
var button3= document.createElement("button")
button3.className = `button hint guessfont ${b3[1]}`
var button4= document.createElement("button")
button4.className = `button hint guessfont ${b4[0]}`
button1.innerText=b1[1]
button2.innerText=b2[2]
button3.innerText=b3[2]
button4.innerText=b4[1]
div.appendChild(button1)
div.appendChild(document.createTextNode (" "));
div.appendChild(button2)
div.appendChild(document.createTextNode (" "));
div.appendChild(button3)
div.appendChild(document.createTextNode (" "));
div.appendChild(button4)
document.getElementById("hints").appendChild(div)

 }

 document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        SubmitAnswer();
    }
});

function SubmitAnswer() {
   var text =document.getElementById("GuessText").value.toString().toLowerCase()

    

    if (maps[text] == undefined) {
        window.alert("Invalid map!")
        return;
    }
    
    if(text == _mapname.toLowerCase()) {
        window.alert("Congratulations!")
        result += `🟩🟩🟩🟩`
        CreateRow(["guessed"," "],[true,"guessed",""],[true,"guessed",""],["guessed",""])
        EndGame()
        return;
    }
    
    var _currmap = maps[text]
    //Builders Check
    var _currbuilders = _currmap.creators
    var buildercoincidences = 0;
    for (var i = 0; i < _currbuilders.length; i++) {
        if (_mapbuilders.includes(_currbuilders[i])) buildercoincidences += 1;
    }
    if(buildercoincidences == 0) {buildercoincidences = ["guesswrong",""];result += "⬛"} else if(buildercoincidences != _mapbuilders.length) {buildercoincidences = ["guessoff",buildercoincidences]; result += "🟧"} else {{buildercoincidences = ["guessed"," "];result += "🟩"}}

    //Diff Check
    var _currdiff = _currmap.diff
    var diffcheck = [(_mapdiff == _currdiff),"guessed",""];
    if (!diffcheck[0]) {if(_currdiff > _mapdiff) {diffcheck = [false,"guessoff","v"];result += "🔽"} else {diffcheck = [false,"guessoff","^"];result += "🔼"}} else {result += "🟩"}
    
    //Name Length Check
    var _currlength = text.split("").length;
    var lengthcheck = [(_currlength == _maplength),"guessed",""];
    if (!lengthcheck[0]) {if(_currlength > _maplength) {lengthcheck = [false,"guessoff","v"];result += "🔽"} else {lengthcheck = [false,"guessoff","^"];result += "🔼"}} else {result += "🟩"}

     //Alphabetical Order Check
     var aoc = [text,_mapname.toLowerCase()]
     aoc = aoc.sort()

    var arrows = [">","<","➡️","⬅️"]
    if (read_cookie("alpha") == "false") arrows = ["^","v","⬆️","⬇️"]

     if (aoc[0] == text) {aoc = arrows[0]; result += arrows[2]} else {aoc = arrows[1]; result += arrows[3]}
     //Var Changes
    CreateRow(buildercoincidences,diffcheck,lengthcheck,["guessoff",aoc])

    var guessdiv = document.createElement('div')
    guessdiv.innerText = _currmap.name
    guessdiv.className = `difficulty${_currdiff}`
    guessdiv.style.fontWeight = 'bold'
    document.getElementById(`hints`).appendChild(guessdiv)
    
    document.getElementById("GuessText").value = ""
    if (guesses == 7) {

        window.alert("You lost!")
        EndGame()
    }

    guesses += 1
    result += `\n`
    

   


}

function EndGame() {
    document.getElementById("GuessText").remove();
    document.getElementById("GuessBtn").remove();


    var txt = document.createElement("div")
    txt.innerText = `The map was ${_mapname}!`
    var btn = document.createElement("button")
    btn.className = `button guessbutton coolblue`
    btn.innerText = `Copy Game`
    var btn2 = document.createElement("button")
    btn2.className = `button guessbutton coolblue`
    btn2.innerText = `New Game`
    btn.onclick = function(){GameToClipboard()}
    btn2.onclick = function(){location.href='/parkourle/'}
    document.getElementById("GameOver").appendChild(txt)
    document.getElementById("GameOver").appendChild(document.createTextNode (" "));
    document.getElementById("GameOver").appendChild(btn)
    document.getElementById("GameOver").appendChild(document.createTextNode (" "));
    document.getElementById("GameOver").appendChild(btn2)
}

function GameToClipboard() {
    navigator.clipboard.writeText(`&& Parkourle ${guesses}/8\n${result}\nhttps://inktest.github.io/parkourle/`);
    window.alert("Game copied to clipboard!")
}
