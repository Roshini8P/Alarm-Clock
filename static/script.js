const alarmSound = new Audio("/static/alarm.mp3");
alarmSound.load();

let alarmTime = null;
let alarmTriggered = false;

const clock = document.getElementById("clock");
const alarmInput = document.getElementById("alarmTime");
const button = document.getElementById("setAlarm");
const alarmMessage = document.getElementById("alarmMessage");


function updateClock() {
    const now = new Date();

    // Show live time
    clock.innerHTML = now.toLocaleTimeString();

    // Current time in HH:MM format
    const currentTime =
        now.getHours().toString().padStart(2, "0") + ":" +
        now.getMinutes().toString().padStart(2, "0");

    console.log("Current:", currentTime, "| Alarm:", alarmTime);


    if (alarmTime === currentTime && !alarmTriggered) {

        alarmTriggered = true;

        alarmMessage.innerHTML = "⏰ Alarm! Wake up!";

        alarmSound.currentTime = 0;

        alarmSound.play()
            .then(() => {
                console.log("✅ Alarm sound playing");
            })
            .catch((error) => {
                console.error("❌ Audio Error:", error);
            });

        alert("⏰ Alarm! Wake up!");
    }
}


// Start clock
updateClock();
setInterval(updateClock, 1000);


// Set alarm button
button.addEventListener("click", function () {

    alarmTime = alarmInput.value;
    alarmTriggered = false;

    alarmMessage.innerHTML = "Alarm set for: " + alarmTime;


    // Unlock browser audio permission
    alarmSound.play()
        .then(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;
            console.log("✅ Audio unlocked");
        })
        .catch((error) => {
            console.log("Audio unlock error:", error);
        });


    console.log("Alarm set:", alarmTime);
});