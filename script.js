//Displaying audio

const audioList = [
    new Audio("audio/bocchi_desu.mp3"),
    new Audio("audio/bocchi_bwomp_slime.mp3"),
    new Audio("audio/aru_aru_aru.mp3"),
    new Audio("audio/ninja_beam.mp3")
];

for(const audio of audioList){
    audio.preload = "auto";
}


let firstBocchi = true;

//conditions
if (!localStorage.getItem("count")){
    localStorage.setItem("count", 0);
}

let temporaryCounter = parseInt(localStorage.getItem("count"));
const counterElement =  document.getElementById("counter");
const counterTimesElement = document.getElementById("counter-times");

displayCounter(temporaryCounter);


//Button section
function clickCounter(){
    ++temporaryCounter;
    displayCounter(temporaryCounter);
    localStorage.setItem("count", temporaryCounter);

    playBocchi();
    slimeBocchi();
}

function displayCounter(value){
    counterElement.innerText = value;
    counterTimesElement.innerText = value === 1 ? "time" : "times";
}

// execute on page load
window.addEventListener("load", () => {
    // Reset count to 0 when the page is loaded
    localStorage.setItem("count", 0);
    temporaryCounter = 0;
    displayCounter(temporaryCounter);
});


function playBocchi() {
    let audio;
  
    if (firstBocchi) {
      firstBocchi = false;
      audio = audioList[0].cloneNode();
    } else {
      const random = Math.floor(Math.random() * 3) + 1;
      audio = audioList[random].cloneNode();
    }
  
    audio.play()
    //   .catch(error => {
    //     // Autoplay was blocked, handle the error
    //     console.error("Failed to play audio:", error);
    //   });
    audio.addEventListener("ended", function () {
      this.remove();
    });
}

function slimeBocchi(){
    const counter_button = document.getElementById("counter-button");
    let id = null;

    const random = Math.floor(Math.random() * 2) + 1;
    const elem = document.createElement("img");
    elem.src = `img/bocchi${random}.gif`;
    elem.style.position = "absolute";
    elem.style.right = "-500px";
    elem.style.top = counter_button.getBoundingClientRect().bottom + window.scrollY - 430 + "px";
    elem.style.zIndex = "-1";
    document.body.appendChild(elem);

    let pos = -500;
    const limit = window.innerWidth + 500;
    clearInterval(id);
    id = setInterval(() => {
        if(pos >= limit){
            clearInterval(id);
            elem.remove();
        }else{
            pos += 20;
            elem.style.right = pos + 'px';
        }
    }, 12);

    //end counter btn
}