// ==UserScript==
// @name         NPC- Pet Planner Helper
// @namespace    http://tampermonkey.net/
// @version      0.03
// @description  Downloads HTML from a userlookup with pet names & images for use in my pet planner template.
// @author       plushies
// @include      https://www.neopetsclassic.com/userlookup/?user=*
// @include      https://neopetsclassic.com/userlookup/?user=*
// @icon         https://www.google.com/s2/favicons?domain=neopetsclassic.com
// @grant        none
// ==/UserScript==

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
    {
        window.navigator.msSaveOrOpenBlob(file, filename);
    }
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}


// Container & Button & Function
 var buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttonsDiv";
    buttonsDiv.style = "width:600px;";
    document.getElementsByClassName("content")[0].appendChild(buttonsDiv);

var button0 = document.createElement("BUTTON");
    button0.id = "button0"
    button0.innerHTML = "Download HTML";
    button0.style.marginRight = "20px";
    buttonsDiv.appendChild(button0);
    document.getElementById("button0").addEventListener("click", makeHTML);

var username = document.getElementsByClassName("loggedIn");
    username = username[0].getElementsByTagName("font")[0].innerText;
    username = username.split(": ")[1];
    console.log(username);

var petList = `<h1><b>${username}</b></h1>
`;

function makeHTML()
{
    var petDivs = document.getElementsByClassName("userLookupPet");

    for (let i = 0; i < petDivs.length; i++)
    {

        var imgUrl = petDivs[i].getElementsByTagName("img")[0].getAttribute("src");
        //console.log(imgUrl);

        var petName = petDivs[i].getElementsByTagName("a")[0].getAttribute("href")
        petName = petName.split("=");
        petName = petName[1];
        //console.log(petName);

        var petHTML =`
        <div id="pet"> 
            <img src="${imgUrl}">
            <br>${petName} 
        </div> 
        `;

        petList += petHTML
    }

    download(petList, "pets", "txt")
}









