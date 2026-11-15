// Weather Message Generator - starter
//
// 1. Select the elements we need (once, at the top)
const weatherSelect = document.getElementById("weather");
const messageButton = document.getElementById("messageButton");
const msgEl = document.getElementById("msg");

// 2. The function that does the work
function showMessage() {
    // TODO 1: read the selected weather: weatherSelect.value
    const selectedWeather = weatherSelect.value;
    let message = "";

    // TODO 2: choose a message with if / else if / else
    if (selectedWeather === "Sunny") {
        message = "Perfect day for a walk!";
    } else if (selectedWeather === "Rainy") {
        message = "Don't forget your umbrella!";
    } else if (selectedWeather === "Snowy") {
        message = "Stay warm and drive carefully!";
    } else if (selectedWeather === "Windy") {
        message = "Hold on to your hat!";
    } else if (selectedWeather === "Foggy") {
        message = "Drive slowly and keep your lights on!";
    } else {
        message = "Have a wonderful day!";
    }

    // TODO 3: display it: msgEl.textContent = message;
    msgEl.textContent = message;
}

// 3. Connect the function to the button's click event
messageButton.addEventListener("click", showMessage);

// GUIDED STEP 6: also update the message as soon as the selection changes
weatherSelect.addEventListener("change", showMessage);