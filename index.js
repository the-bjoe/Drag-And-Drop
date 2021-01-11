var draggableObjects;
var draggedObjects;
var mouse;
var grabbedElement = null;
var caps = false;
var secure = false;
var mobile = false;

const lerp = (x, y, a) => x * (1 - a) + y * a;
const lerpSpeed = 0.005;
const distance = 15;

//----- every key that is draggable
class draggableElement {
    constructor(number, element) {
        this.number =  number;
        this.element = element;
        this.name = this.element.innerHTML;
        this.hovering = true;
        this.clicked = false;
        this.active = true;
        this.secure = false;

        this.rectX = this.element.offsetLeft;
        this.rectY = this.element.offsetTop;
        setTimeout(() => {this.element.style.position = "absolute";}, 10);
        this.element.style.top = this.rectY + "px";
        this.element.style.left = this.rectX + "px";
        this.element.style.zIndex = "2";

        this.element.addEventListener("mouseenter", this.EnteredDraggableObject.bind(this));
        this.element.addEventListener("mouseleave", this.LeavedDraggableObject.bind(this));
        this.element.addEventListener("mousedown", this.MouseDownObject.bind(this));
        window.addEventListener("mouseup", this.MouseUpObject.bind(this));
        this.element.addEventListener("touchstart", this.MouseDownObject.bind(this));
        window.addEventListener("touchend", this.MouseUpObject.bind(this));
        this.MouseMoveObject();
        window.addEventListener("resize", this.OnResize.bind(this));
    }

    EnteredDraggableObject() {
        this.hovering = true;
    }
    
    LeavedDraggableObject() {
        this.hovering = false;
    }

    MouseDownObject() {
        if (this.hovering) {
            this.clicked = true;
            grabbedElement = this;
            this.element.style.pointerEvents = "none";
        }
        else {
            grabbedElement = null;
        }
    }

    MouseUpObject() {
        this.clicked = false;
        this.element.style.pointerEvents = "all";
        setTimeout(() => {
            if (grabbedElement != null && this.active) {
                if (grabbedElement.number == this.number) {
                    this.element.style.top = this.rectY + "px";
                    this.element.style.left = this.rectX + "px";
                }
            }
        }, 5);

        setTimeout(() => {
            grabbedElement = null;
        }, 20);
    }

    MouseMoveObject() {
        if (this.clicked && this.active) {
            var boundingX = this.element.getBoundingClientRect().x;
            var boundingY = this.element.getBoundingClientRect().y;
            if (mobile) {
                this.element.style.top = "calc(" + lerp(boundingY, mouse.targetTouches[0].clientY - this.element.clientHeight / 2, lerpSpeed) + "px - 100%)";
                this.element.style.left = lerp(boundingX, mouse.targetTouches[0].clientX - this.element.clientWidth / 2, lerpSpeed) + "px";
            }
            else {
                this.element.style.top = "calc(" + lerp(boundingY, mouse.y - this.element.clientHeight / 2, lerpSpeed) + "px - 100%)";
                this.element.style.left = lerp(boundingX, mouse.x - this.element.clientWidth / 2, lerpSpeed) + "px";
            }
        }
        window.requestAnimationFrame(this.MouseMoveObject.bind(this));
    }

    OnResize() {
        this.element.style.position = "relative";
        this.element.style.top = "";
        this.element.style.left = "";
        setTimeout(() => {
            this.rectX = this.element.offsetLeft;
            this.rectY = this.element.offsetTop;
            setTimeout(() => {this.element.style.position = "absolute";}, 10);
            this.element.style.top = this.rectY + "px";
            this.element.style.left = this.rectX + "px";
        }, 50);
    }

    ResetPosition() {
        this.element.style.top = this.rectY + "px";
        this.element.style.left = this.rectX + "px";
    }

    UpdateCaps() {
        if (!this.secure) {
            if (!caps) {
                this.element.innerHTML = this.element.innerHTML.toLowerCase();
                // changes the capitalization for numbers and symbols
                switch(this.element.innerHTML) {
                    case "_":
                        this.element.innerHTML = "-";
                        break;
                    case "+":
                        this.element.innerHTML = "=";
                        break;
                    case "{":
                        this.element.innerHTML = "[";
                        break;   
                    case "}":
                        this.element.innerHTML = "]";
                        break;
                    case "|":
                        this.element.innerHTML = "\\";
                        break;
                    case ":":
                        this.element.innerHTML = ";";
                        break;    
                    case "\"":
                        this.element.innerHTML = "'";
                        break;
                    case "&lt;":
                        this.element.innerHTML = ",";
                        break;
                    case "&gt;":
                        this.element.innerHTML = ".";
                        break;
                    case "?":
                        this.element.innerHTML = "/";
                        break;
                    case "!":
                        this.element.innerHTML = "1";
                        break;
                    case "@":
                        this.element.innerHTML = "2";
                        break;
                    case "#":
                        this.element.innerHTML = "3";
                        break;
                    case "$":
                        this.element.innerHTML = "4";
                        break;
                    case "%":
                        this.element.innerHTML = "5";
                        break;
                    case "^":
                        this.element.innerHTML = "6";
                        break;
                    case "&":
                        this.element.innerHTML = "7";
                        break;
                    case "*":
                        this.element.innerHTML = "8";
                        break;
                    case "(":
                        this.element.innerHTML = "9";
                        break;
                    case ")":
                        this.element.innerHTML = "0";
                        break;
                    case "~":
                        this.element.innerHTML = "`";
                        break;
                }
            }
            else {
                this.element.innerHTML = this.element.innerHTML.toUpperCase();
                // changes the capitalization for numbers and symbols
                switch(this.element.innerHTML) {
                    case "-":
                        this.element.innerHTML = "_";
                        break;
                    case "=":
                        this.element.innerHTML = "+";
                        break;
                    case "[":
                        this.element.innerHTML = "{";
                        break;   
                    case "]":
                        this.element.innerHTML = "}";
                        break;
                    case "\\":
                        this.element.innerHTML = "|";
                        break;
                    case ";":
                        this.element.innerHTML = ":";
                        break;    
                    case "'":
                        this.element.innerHTML = "\"";
                        break;
                    case ",":
                        this.element.innerHTML = "&lt;";
                        break;      
                    case ".":
                        this.element.innerHTML = "&gt;";
                        break;
                    case "/":
                        this.element.innerHTML = "?";
                        break;
                    case "1":
                        this.element.innerHTML = "!";
                        break;
                    case "2":
                        this.element.innerHTML = "@";
                        break;
                    case "3":
                        this.element.innerHTML = "#";
                        break;
                    case "4":
                        this.element.innerHTML = "$";
                        break;
                    case "5":
                        this.element.innerHTML = "%";
                        break;
                    case "6":
                        this.element.innerHTML = "^";
                        break;
                    case "7":
                        this.element.innerHTML = "&";
                        break;
                    case "8":
                        this.element.innerHTML = "*";
                        break;
                    case "9":
                        this.element.innerHTML = "(";
                        break;
                    case "0":
                        this.element.innerHTML = ")";
                        break;
                    case "`":
                        this.element.innerHTML = "~";
                        break;
                }
            }
        }
    }

    InitializePassword() {
        var theString = "";
        if (this.element.innerHTML.toLowerCase() == "caps" || this.element.innerHTML.toLowerCase() == "enter" || this.element.innerHTML.toLowerCase() == "backspace") {
            this.element.innerHTML.split('').forEach(function(c) {
                theString += "*";
            });
        }
        else {
            theString = "*";
        }

        this.element.innerHTML = theString;
        this.secure = true;
    }

    UnInitializePassword() {
        this.element.innerHTML = this.name;
        this.secure = false;
    }
}

//----- every place where the draggable key goes
class draggedElement {
    constructor(number, element) {
        this.number = number;
        this.element = element;
        this.name = null;
        this.hovering = false;
        this.clicked = false;
        this.active = true;

        this.rectX = this.element.getBoundingClientRect().x;
        this.rectY = this.element.getBoundingClientRect().y;
        this.element.style.zIndex = "1";

        this.element.addEventListener("mouseenter", this.EnteredDraggedObject.bind(this));
        this.element.addEventListener("mouseleave", this.LeavedDraggedObject.bind(this));
        this.element.addEventListener("mousedown", this.MouseDownObject.bind(this));
        this.element.addEventListener("touchstart", this.MouseDownObject.bind(this));
        window.addEventListener("mouseup", this.MouseUpObject.bind(this));
        window.addEventListener("touchend", this.MouseUpObject.bind(this));
    }

    EnteredDraggedObject() {
        this.hovering = true;
    }

    LeavedDraggedObject() {
        this.hovering = false;
    }

    MouseDownObject() {
        if (this.hovering) {
            this.clicked = true;
        }
    }

    MouseUpObject() {
        this.clicked = false;
        if (grabbedElement != null && this.active) {
            var boundingX = grabbedElement.element.getBoundingClientRect().x + grabbedElement.element.clientWidth / 2;
            var boundingY = grabbedElement.element.getBoundingClientRect().y + grabbedElement.element.clientHeight / 2;
            var thisBoundingX = this.rectX + this.element.clientWidth / 2;
            var thisBoundingY = this.rectY + this.element.clientHeight / 2;
            if (Math.max(thisBoundingX, boundingX) - Math.min(boundingX, thisBoundingX) > distance || Math.max(thisBoundingY, boundingY) - Math.min(boundingY, thisBoundingY) > distance) {
                return 0;
            }
            //-- sets the position to the drag spot
            grabbedElement.element.style.top = "calc(" + this.rectY + "px - 100%)";
            grabbedElement.element.style.left = this.rectX + "px";

            //-- checks to see if it adds the next drag spot
            //-- if it is it makes a new draggedElement
            if (grabbedElement.element.id == "enterKey") {
                //location.reload();
                if (!secure) {
                    InitializePassword();
                }
                else {
                    UnInitializePassword();
                }
                return 0;
            }
            else if (grabbedElement.element.id == "capsKey") {
                caps = !caps;
                draggableObjects.forEach(element => element.UpdateCaps());
                return 0;
            }
            else if (grabbedElement.element.id == "backspaceKey") {
                if (this.number - 1 > -1) {
                    setTimeout(() => {
                        draggedObjects[this.number - 1].element.parentElement.removeChild(draggedObjects[this.number - 1].element);
                        draggedObjects.splice(this.number - 1, 1);
                        this.number--;
                    }, 20);
                }
                return 0;
            }
            else if (draggedObjects.lastIndexOf(this) == draggedObjects.length - 1) {
                var clone = this.element.cloneNode(true);
                this.element.parentElement.appendChild(clone);
                draggedObjects.splice(draggedObjects.length + 1, 0, new draggedElement(this.number + 1, clone));
            }

            //-- sets the current grabbed element to be not draggable
            //-- and it clones and removes it fron the draggableObjects list
            var clone = grabbedElement.element.cloneNode(true);
            if (secure) {
                clone.innerHTML = grabbedElement.name;
            }
            grabbedElement.element.parentElement.insertBefore(clone, grabbedElement.element.nextSibling);
            draggableObjects.splice(grabbedElement.number, 1, new draggableElement(grabbedElement.number, clone));
            if (secure) {
                draggableObjects[grabbedElement.number].InitializePassword();
            }
            var cloneClass = draggableObjects[grabbedElement.number];
            cloneClass.rectX = grabbedElement.rectX;
            cloneClass.rectY = grabbedElement.rectY;
            cloneClass.ResetPosition();
            
            //-- changes all the previous key to be inactive
            grabbedElement.element.className = "notDraggable";
            grabbedElement.element.style.left = "0px";
            grabbedElement.element.style.top = "0px";
            this.element.appendChild(grabbedElement.element);
            grabbedElement.clicked = false;
            grabbedElement.active = false;
            grabbedElement = null;
            this.active = false;
        }
    }
}

window.addEventListener("load", function() { setTimeout(Start, 100)});

function Start() {
    draggableObjects = document.getElementsByClassName("draggable");
    draggableObjects = [].slice.call(draggableObjects);
    for (var i = 0; i < draggableObjects.length; i++) {
        draggableObjects.splice(i, 1, new draggableElement(i, draggableObjects[i]));
    }

    draggedObjects = document.getElementsByClassName("dragged");
    draggedObjects = [].slice.call(draggedObjects);
    for (var i = 0; i < draggedObjects.length; i++) {
        draggedObjects.splice(i, 1, new draggedElement(i, draggedObjects[i]));
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.addEventListener("touchstart", function(event) {mouse = event;});
        window.addEventListener("touchmove", function(event) {mouse = event;});
        mobile = true;
    }
    else {
        window.addEventListener("mousemove", function(event) {mouse = event;});
    }
}

function InitializePassword() {
    LoadingScreen();

    setTimeout(() => {
        draggableObjects.forEach(element => element.name = element.name.toLowerCase())
        draggableObjects.forEach(element => element.InitializePassword());
        var info = document.getElementById("info");
        info.innerHTML = "Password:";
        var clone = draggedObjects[draggedObjects.length - 1].element.cloneNode(true);
        draggedObjects[draggedObjects.length - 1].element.parentElement.appendChild(clone);
        draggedObjects.forEach(element => element.element.parentElement.removeChild(element.element));
        draggedObjects.splice(0, draggedObjects.length);
        draggedObjects.splice(draggedObjects.length + 1, 0, new draggedElement(0, clone));
        secure = true;
    }, 1000);
}

function UnInitializePassword() {
    LoadingScreen();

    setTimeout(() => {
        draggableObjects.forEach(element => element.name = element.name.toLowerCase())
        draggableObjects.forEach(element => element.UnInitializePassword());
        var info = document.getElementById("info");
        info.innerHTML = "Username:";
        var clone = draggedObjects[draggedObjects.length - 1].element.cloneNode(true);
        draggedObjects[draggedObjects.length - 1].element.parentElement.appendChild(clone);
        draggedObjects.forEach(element => element.element.parentElement.removeChild(element.element));
        draggedObjects.splice(0, draggedObjects.length);
        draggedObjects.splice(draggedObjects.length + 1, 0, new draggedElement(0, clone));
        secure = false;
    }, 1000);
}

function LoadingScreen() {
    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "3";
    canvas.style.position = "absolute";

    var text = document.createElement("label");
    text.style.fontSize = "32px";
    text.style.zIndex = "4";
    text.innerHTML = "Loading.";
    text.style.position = "absolute";
    text.style.top = "50vh";
    text.style.left = "50vw";
    text.style.transform = "translate(-50%, -50%)";

    var c = canvas.getContext("2d");
    c.fillStyle = "#7B8CDE";
    c.fillRect(0, 0, canvas.width, canvas.height);
    document.body.insertBefore(canvas, document.body.firstChild);

    FadeIn(canvas, text);
}

var opacity = 0;
var speed = 0.1;
function FadeIn(canvas, text) {
    canvas.style.opacity = opacity;
    opacity += speed;
    if (opacity < 1) {
        window.requestAnimationFrame(() => {FadeIn(canvas, text);});
    }
    else {
        document.body.insertBefore(text, document.body.firstChild);
        LoadingAnimation(text);
        setTimeout(() => {
            FadeOut(canvas, text);
        }, 10000);
    }
}

function LoadingAnimation(text) {
    setTimeout(() => {
        if (text.parentElement != null) {
            if (text.innerHTML == "Loading.") {
                text.innerHTML = "Loading..";
            }
            else if (text.innerHTML == "Loading..") {
                text.innerHTML = "Loading...";
            }
            else if (text.innerHTML == "Loading...") {
                text.innerHTML = "Loading.";
            }
            LoadingAnimation(text);
        }
    }, 250);
}

function FadeOut(canvas, text) {
    if (text != null) {
        text.parentElement.removeChild(text);
        text = null;
    }
    canvas.style.opacity = opacity;
    opacity -= speed;
    if (opacity > 0) {
        window.requestAnimationFrame(() => {FadeOut(canvas, text);});
    }
    else {
        canvas.parentElement.removeChild(canvas);
    }
}