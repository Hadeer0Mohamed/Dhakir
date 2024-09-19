const vscode = require('vscode');

let sessionStartTime;
let timerInterval;

// Array of break reminder messages
const breakMessages = [
    "عدت ساعة وانت شغال! خدلك بريك 5 وأرجع كمل",
    " بررريك تااايم! اشرب مية وريح شوية.",
    "عدت ساعة! ريح عينك شوية واقعد بعيد عن الشاشة.",
    " ! قوم أتحرك وأعملك شوية تمارين .",
    "عدت  كمان ساعة !  محتاج تاكل حاجة.",
    "افتكر تاخد بريك كل ما تشتغل فترة طويلة. صحتك أهم!",
    "كل ساعة شغل محتاج استراحة قصيرة. خد بريك دلوقتي!",
    "ماتنساش تاخد بريك وتشرب حاجة عشان دماغك ترتاح وتنتعش.",
];

let messageIndex = 0;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Store the time when the user starts the session
    sessionStartTime = Date.now();
    
    // Check every minute if an hour has passed
    timerInterval = setInterval(checkForHourlyReminder, 60000); // 60000ms = 1 minute
    
    // Show an initial activation message
    vscode.window.showInformationMessage('Break Timer Activated');
}

// Function to check if an hour has passed since the session started
function checkForHourlyReminder() {
    const currentTime = Date.now();
    const timeElapsed = currentTime - sessionStartTime;
    const timeElapsedInMinutes = timeElapsed / 1000 / 60;

    // If 60 minutes (1 hour) have passed, show reminder and reset the timer
    if (timeElapsedInMinutes >= 60) {
        showReminder();
        sessionStartTime = Date.now(); // Reset the session start time
    }
}

// Function to show a different reminder message each hour
function showReminder() {
    // Show the current message from the array
    vscode.window.showInformationMessage(breakMessages[messageIndex]);

    // Update the message index to show the next one in the array
    messageIndex = (messageIndex + 1) % breakMessages.length; // Rotate through the messages
}

// This function is called when the extension is deactivated
function deactivate() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

module.exports = {
    activate,
    deactivate
};
