/* Clock */
const lines = document.querySelectorAll(".lines span");
for (line of lines) {
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.transform = `rotate(${i * 6}deg)`;
  }
}

/* Watch */
setInterval(function () {
  let newDate = new Date();
  const needleSecond = document.querySelector(".needles .second");
  const needleMinute = document.querySelector(".needles .minute");
  const needleHour = document.querySelector(".needles .hour");
  needleSecond.style.cssText += `transform: translate(-50%, -100%) rotate(${newDate.getSeconds() * 6}deg);`;
  needleMinute.style.cssText += `transform: translate(-50%, -100%) rotate(${newDate.getMinutes() * 6 + newDate.getSeconds() * 0.1}deg);`;
  needleHour.style.cssText += `transform: translate(-50%, -100%) rotate(${(newDate.getHours() % 12 || 12) * 30 + newDate.getMinutes() * 0.1}deg);`;
}, 1000);

/* Stop Watch */
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const timeHr = document.getElementById('watch-hr');
const timeMin = document.getElementById('watch-min');
const timeSec = document.getElementById('watch-sec');
const timeMs = document.getElementById('watch-ms');

let timer = false;
let hr = 0;
let min = 0;
let sec = 0;
let ms = 0;

startBtn.addEventListener("click", function () {
  if (timer == false) {
    timer = true;
    startBtn.querySelector("span").innerText = "Pause";
    startBtn.querySelector("img").src = "./assets/icon-pause.svg"
  } else {
    timer = false;
    startBtn.querySelector("span").innerText = "Resume";
    startBtn.querySelector("img").src = "./assets/icon-resume.svg"
  }
});

resetBtn.addEventListener("click", function () {
  timer = false;
  hr = 0;
  min = 0;
  sec = 0;
  ms = 0;

  timeMs.innerText = "0" + ms;
  timeSec.innerText = "0" + sec;
  timeMin.innerText = "0" + min;
  timeHr.innerText = "0" + hr;

  startBtn.querySelector("span").innerText = "Start";
  startBtn.querySelector("img").src = "./assets/icon-resume.svg";

  document.querySelector(".laps-wrapper").innerHTML = "";
});

setInterval(stopWatch, 10);

function stopWatch() {
  if (timer == true) {

    ms = ms + 1;

    if (ms == 100) {
      sec = sec + 1;
      ms = 0;

      if (sec == 60) {
        min = min + 1;
        sec = 0;

        if (min == 60) {
          hr = hr + 1;
          min = 0;
        }
      }
    }

    // Update stopwatch display
    timeMs.innerText = ms < 10 ? "0" + ms : ms;
    timeSec.innerText = sec < 10 ? "0" + sec : sec;
    timeMin.innerText = min < 10 ? "0" + min : min;
    timeHr.innerText = hr < 10 ? "0" + hr : hr;
  }
};

/* LAP */
document.getElementById("lap").addEventListener("click", function () {
  let lapsWrapper = document.querySelector(".laps-wrapper");
  let lapContent = document.querySelector(".watch-numbers");
  let lap = document.createElement("div");
  lap.className = "lap watch-numbers";

  lap.innerHTML = lapContent.innerHTML;
  let lapWrapper = document.createElement("div");
  lapWrapper.className = "lap-wrapper";
  lapsWrapper.appendChild(lapWrapper);
  lapWrapper.appendChild(lap);
  let dltLap = document.createElement("spam");
  dltLap.className = "delete-lap";
  lapWrapper.appendChild(dltLap)

  lapWrapper.querySelector(".delete-lap").addEventListener("click", function () {
    this.parentNode.parentNode.removeChild(this.parentNode);
  })
});