// ==== STATE ====
let startTime = null;
let elapsed = 0;
let interval = null;
let running = false;

// ====FORMAT TIME ====
function format(ms){
    let totalSeconds = Math.floor(ms/1000);

    let hours = String(Math.floor(totalSeconds/3600)).padStart(2, '0');
    let minutes = String(Math.floor((totalSeconds%3600) / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
// ====UPDATE DISPLAY====
function update(){
    let now = Date.now();
    let diff = now - startTime;

    document.getElementById("timer").innerText = format(diff);
}

//====START====
    function start(){
        if(running) return;

        startTime = Date.now() - elapsed;
        interval = setInterval(update, 1000);

        running = true;
    }
//====RESET====
function reset(){
    clearInterval(interval);

    startTime = null;
    elapsed = 0;
    running = false;

    document.getElementById("timer").innerText = "00:00:00";
}
//====PAUSE====
function pause(){
    if(!running) return;

    elapsed = Date.now() - startTime;
    clearInterval(interval);

    running = false;
}
//====SAVE SESSION====
function save(){
    if(!startTime) return;

    let end = Date.now();
    let duration = running ? (end - startTime) : elapsed;

    let session = {
        time: new Date().toLocaleString(),
        duration: duration
    };
    let data = JSON.parse(localStorage.getItem("sessions")) || [];
    data.push(session);

    localStorage.setItem("sessions",JSON.stringify(data));

    showHistory();
}

//====SHOW HISTORY====
function showHistory(){
    let data = JSON.parse(localStorage.getItem("sessions")) || [];

    let list = document.getElementById("history");
    list.innerHTML = "";

    data.forEach(element => {
        let li = document.createElement("li");
        li.innerText=`${element.time} - ${format(element.duration)}`;
        list.appendChild(li);
    });
}

//====LOAD ON START ====
showHistory();

