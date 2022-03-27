document.addEventListener("DOMContentLoaded", function(event) {
    load();
  });

function load() {
document.getElementById("EasyCb").checked = (read_cookie("diff0") == "true") || (read_cookie("diff0") == null);
document.getElementById("MediumCb").checked = (read_cookie("diff1") == "true") || (read_cookie("diff1") == null);
document.getElementById("HardCb").checked = (read_cookie("diff2") == "true") || (read_cookie("diff2") == null);
document.getElementById("ExpertCb").checked = (read_cookie("diff3") == "true") || (read_cookie("diff3") == null);
document.getElementById("InsaneCb").checked = (read_cookie("diff4") == "true") || (read_cookie("diff4") == null);
document.getElementById("AlphabetCb").checked = (read_cookie("alpha") == "true") || (read_cookie("alpha") == null);
}

function read_cookie(key)
{
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
}

function SaveCookies() {
    var cb1 = document.getElementById("EasyCb").checked;
    var cb2 = document.getElementById("MediumCb").checked;
    var cb3 = document.getElementById("HardCb").checked;
    var cb4 = document.getElementById("ExpertCb").checked;
    var cb5 = document.getElementById("InsaneCb").checked;
    var ab = document.getElementById("AlphabetCb").checked;

    if(!(cb1 || cb2 || cb3 || cb4 || cb5)) {
        window.alert("Please select at least one difficulty!")
        return;
    }

    document.cookie = `diff0=${cb1}`
    document.cookie = `diff1=${cb2}`
    document.cookie = `diff2=${cb3}`
    document.cookie = `diff3=${cb4}`
    document.cookie = `diff4=${cb5}`
    document.cookie = `alpha=${ab}`
   
    window.alert("Saved!")

}
