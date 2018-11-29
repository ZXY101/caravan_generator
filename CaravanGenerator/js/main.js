let statementType = document.getElementById('statement-type');
let branchAddTo = document.getElementById('branch-add-to');
let conversationType = document.getElementById('conversation-create');
let branchType = document.getElementById('branch-create');
let copyButton = document.getElementById('copyText');

completeBranchButton = document.getElementById('completeBranch');
let cancelBtn = document.getElementById('cancel');
let createBranchButton = document.getElementById('link');
let createConversationButton = document.getElementById('newConvo');
let completeButton = document.getElementById('complete');
let varExpButtons = document.getElementById('btn-mar');
let conversationOutput = document.getElementById('conversationOutput');
let branchOutput = document.getElementById('branchOutput');
let finalOutput = document.getElementById('finalOutput');
let statements = '';
let currentConversation = '';
let conversationList = [];
let destinationConvoList = [];
let suggestedConvos = [];
let variableNames = ['Money', 'Gender'];


let varButton = document.getElementById('var');
let expButton = document.getElementById('exp');
let varMenu = document.getElementById('varMenu');
let expMenu = document.getElementById('expMenu');
let addVarBtn = document.getElementById('addVar');
let addExpBtn = document.getElementById('addExp');
let varValue = document.getElementById('value');


let showOnCom = document.getElementById('showOnEnd');
let branchPlus = document.getElementById('branchPlus');

branchPlus.style.display = 'none';
statementType.style.display = 'none';
branchAddTo.style.display = 'none';
branchType.style.display = 'none';
showOnCom.style.display = 'none';
completeButton.style.display = 'none';
varMenu.style.display = 'none';
expMenu.style.display = 'none';
cancelBtn.style.display = 'none';



window.onload = conversationOutput.value = '';
window.onload = finalOutput.value = '';
window.onload = branchOutput.value = '';



conversationType.addEventListener('submit', newConversation);
statementType.addEventListener('submit', newStatement);
branchType.addEventListener('submit', newBranch);


createBranchButton.addEventListener('click', createBranch);
completeButton.addEventListener('click', completeConversation);
createConversationButton.addEventListener('click', createConversation);
copyButton.addEventListener('click', copyText);
expButton.addEventListener('click', newExp);
varButton.addEventListener('click', newVar);
completeBranchButton.addEventListener('click', addToBranch);
cancelBtn.addEventListener('click', cancelVarExp);
varMenu.addEventListener('submit', appendVar);
expMenu.addEventListener('submit', appendExp);



function cancelVarExp() {
    expMenu.style.display = 'none';
    varMenu.style.display = 'none';
    cancelBtn.style.display = 'none';
    varExpButtons.style.display = 'block';
    cancelBtn.style.display = 'none';
    resetValues();
}

let operation = document.getElementById('operation');
let variable = document.getElementById('variable');
let value = document.getElementById('value');

let comparison = document.getElementById('comparison');
let leftHand = document.getElementById('leftHand');
let rightHand = document.getElementById('rightHand');

let branchExtras = '';
function appendVar(e) {
    e.preventDefault();
    if (variable.value === '') {
        alert('Variable name cannot be null')
        return false;
    }
    if (!variableNames.includes(variable.value)) {
        variableNames.push(variable.value);
    }
    branchExtras += `
    ${operation.value}{variable{${variable.value}} value{${value.value}}}
    `;
    branchOutput.value = `branch
{
    homeConvo{${homeConvo.value}}
    destinationConvo{${destinationConvo.value}}
    ${
        (() => {
            if (displayName.value == '') {
                return ``;
            } else {
                return `displayName{${displayName.value}}`;
            }
        })()
        }
    ${branchExtras}
}

`;
    cancelVarExp();
}

function appendExp(e) {
    e.preventDefault();
    if (leftHand.value === '') {
        alert('Left hand variable cannot be null')
        return false;
    }
    if (!variableNames.includes(leftHand.value)) {
        variableNames.push(leftHand.value);
    }
    branchExtras += `
    expression
    {
        lefthand{${leftHand.value}}
        righthand{${rightHand.value}}
        comparison{${comparison.value}}
    }   
`;
    branchOutput.value = `branch
{
    homeConvo{${homeConvo.value}}
    destinationConvo{${destinationConvo.value}}
    ${
        (() => {
            if (displayName.value == '') {
                return ``;
            } else {
                return `displayName{${displayName.value}}`;
            }
        })()
        }
    ${branchExtras}
}

`;
    cancelVarExp();
}

function resetValues() {
    operation.value = 'set';
    variable.value = '';
    value.value = 0;

    comparison.value = 'eql';
    leftHand.value = '';
    rightHand.value = 0;
}

function newExp() {
    varExpButtons.style.display = 'none';
    expMenu.style.display = 'block';
    cancelBtn.style.display = 'block';

}

function newVar() {
    varExpButtons.style.display = 'none';
    varMenu.style.display = 'block';
    cancelBtn.style.display = 'block';

}

function copyText() {
    finalOutput.select();
    document.execCommand('copy');
    alert("Text Copied");
}

function createConversation() {
    conversationType.style.display = 'block';
    showOnCom.style.display = 'none';
}

function completeConversation() {
    document.getElementById('sceneName').value = '';
    finalOutput.value += conversationOutput.value;
    conversationOutput.value = '';
    showOnCom.style.display = 'inline'

    statementType.style.display = 'none';
    completeButton.style.display = 'none';
}


function newConversation(e) {
    e.preventDefault();
    let inputTitle = document.getElementById('title').value;
    currentConversation = inputTitle;
    for (let convos of conversationList) {
        if (convos == currentConversation) {
            alert('A conversation with the name ' + currentConversation + ' already exists.');
            return false;
        }
    }

    if (!conversationList.includes(currentConversation)) {
        conversationList.push(currentConversation);
    }

    if (currentConversation == '') {
        alert('Conversation title cannot be null');
        return false;
    }

    for (i = 0; i < suggestedConvos.length; i++) {
        if (suggestedConvos[i] == currentConversation) {
            suggestedConvos.splice(i, 1);
        }
    }
    statementType.style.display = 'block';
    conversationType.style.display = 'none';
    showOnCom.style.display = 'none'
    document.getElementById('current-conversation').innerHTML = currentConversation;
    document.getElementById('conversationOutput').value = '';
    statements = '';
    resetValues();

}

function newStatement(e) {
    e.preventDefault();

    let speaker = document.getElementById('speaker').value;
    let background = document.getElementById('background').value;
    document.getElementById('background').value = 'none';
    let sprite1 = document.getElementById('sprite1').value;
    let sprite2 = document.getElementById('sprite2').value;
    let dialogue = document.getElementById('dialogue').value;
    if (dialogue == '') {
        alert('Dialogue cannot be null.');
        return false;
    }
    completeButton.style.display = 'inline';

    let scene = document.getElementById('sceneName').value;
    document.getElementById('dialogue').value = '';

    statements += `statement
    {
        ${
        (() => {
            if (speaker == 'none') {
                return ``;
            } else {
                return `speaker{${speaker}}`;
            }
        })()
        }
        ${
        (() => {
            if (background == 'none') {
                return ``;
            } else {
                return `background{${background}}`;
            }
        })()
        }
        ${
        (() => {
            if (sprite1 == 'none') {
                return ``;
            } else {
                return `sprite{${sprite1}}`;
            }
        })()
        }
        ${
        (() => {
            if (sprite2 == 'none') {
                return ``;
            } else {
                return `sprite{${sprite2}}`;
            }
        })()
        }
        dialogue{${dialogue}}
    }
    `;
    conversationOutput.value = `conversation
{
    title{${currentConversation}}
    ${
        (() => {
            if (scene == '') {
                return ``;
            } else {
                return `scene{${scene}}`;
            }
        })()
        }
    ${statements.replace(/^\s*[\r\n]/gm, "")}
}

`;

}


function createBranch() {
    showOnCom.style.display = 'none';
    branchType.style.display = 'block';
    statementType.style.display = 'none';
    document.getElementById('homeConvo').value = currentConversation;
    document.getElementById('destinationConvo').value = '';
    document.getElementById('displayName').value = '';

}

function addToBranch(e) {
    e.preventDefault();
    branchAddTo.style.display = 'none';
    showOnCom.style.display = 'block';
    branchPlus.style.display = 'none';
    finalOutput.value += branchOutput.value;
    branchOutput.value = '';
    resetValues();
    branchExtras = '';
    varMenu.style.display = 'none';
    expMenu.style.display = 'none';
    cancelBtn.style.display = 'none';
}
let homeConvo = document.getElementById('homeConvo');
let destinationConvo = document.getElementById('destinationConvo');
let displayName = document.getElementById('displayName');

function newBranch(e) {
    e.preventDefault();

    if (homeConvo.value == '') {
        alert('Home Convo cannot be null')
        return false;
    }
    if (destinationConvo.value == '') {
        alert('Destination Convo cannot be null')
        return false;
    }

    branchType.style.display = 'none';
    branchAddTo.style.display = 'block';

    if (!destinationConvoList.includes(destinationConvo.value)) {
        destinationConvoList.push(destinationConvo.value);
    }

    if (!conversationList.includes(destinationConvo.value)) {
        suggestedConvos.push(destinationConvo.value);
    }

    document.getElementById('current-home-convo').innerHTML = homeConvo.value;
    document.getElementById('current-destination-convo').innerHTML = destinationConvo.value;
    document.getElementById('current-display-name').innerHTML = displayName.value;
    branchPlus.style.display = 'block';
    varExpButtons.style.display = 'block';

    branchOutput.value += `branch
{
    homeConvo{${homeConvo.value}}
    destinationConvo{${destinationConvo.value}}
    ${
        (() => {
            if (displayName.value == '') {
                return ``;
            } else {
                return `displayName{${displayName.value}}`;
            }
        })()
        }
}

`;

}

function autocomplete(inp, arr) {

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById('homeConvo'), conversationList);
autocomplete(document.getElementById('destinationConvo'), conversationList);
autocomplete(document.getElementById('title'), suggestedConvos);
autocomplete(document.getElementById('variable'), variableNames);
autocomplete(document.getElementById('leftHand'), variableNames);




