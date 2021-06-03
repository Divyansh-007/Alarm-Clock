// referencing all the elements
const currentTime = document.getElementById('current_time'); // current time element
const alarmLabel = document.getElementById('alarm_label'); // alarm label input 
const hoursMenu = document.getElementById('hours_menu'); // hours menu dropdown
const minutesMenu = document.getElementById('mins_menu'); // minutes menu dropdown
const secondsMenu = document.getElementById('secs_menu'); // seconds menu dropdown
const meridianMenu = document.getElementById('meridian_menu') // meridian menu dropdown
const setAlarm = document.getElementById('set_alarm'); // set alarm button

// to add zero infront of time values less than 10
function extraZero(value){
    return (value < 10) ? "0" + value : value;
}

// setting current time value
let time = setInterval(function(){
    let date = new Date(); // new date instance
	let hours = date.getHours(); // hour value
	let minutes = date.getMinutes(); // minutes value
	let seconds = date.getSeconds(); //seconds value
	let meridian = (date.getHours()) < 12 ? 'AM' : 'PM'; // meridian

    // handling hours checks
	if(hours <= 12){
        hours = hours 
    }else{
        hours = hours - 12;
    }

	currentTime.textContent = extraZero(hours) + ":" + extraZero(minutes) + ":" + extraZero(seconds) + "  " + meridian;
},1000);

// adding values to hours menu
function addHours() {
    let hours = 12;

    for(let i = 1; i <= hours; i++) {
		hoursMenu.options[hoursMenu.options.length] = new Option(extraZero(i),i);	
	}
}

addHours();

// adding values to minutes menu
function addMinutes() {
    let minutes = 59;

    for(let i = 0; i <= minutes; i++) {
		minutesMenu.options[minutesMenu.options.length] = new Option(extraZero(i),i);	
	}
}

addMinutes();

// adding values to seconds menu
function addSeconds() {
    let seconds = 59;

    for(let i = 0; i <= seconds; i++) {
		secondsMenu.options[secondsMenu.options.length] = new Option(extraZero(i),i);	
	}
}

addSeconds();

// setting an alarm
setAlarm.addEventListener('click',function(){
    let selectedHour = hoursMenu.value;
    let selectedMinutes = minutesMenu.value;
    let selectedSeconds = secondsMenu.value;
    let selectedMeridian = meridianMenu.value;
    let givenLabel = alarmLabel.value;

    if(givenLabel === ""){
        givenLabel = "Alarm"
    }
    
    // calculating the alarm time
    let alarmTime = extraZero(selectedHour) + ":" + extraZero(selectedMinutes) + ":" + extraZero(selectedSeconds) + "  " + selectedMeridian;
    
    console.log(`Setted an alarm for ${givenLabel} at ${alarmTime}`);

    // matching current time and the alarm time
    setInterval(function(){
        let date = new Date(); // new date instance
        let hours = date.getHours(); // hour value
        let minutes = date.getMinutes(); // minutes value
        let seconds = date.getSeconds(); //seconds value
        let meridian = (date.getHours()) < 12 ? 'AM' : 'PM'; // meridian
    
        // handling hours checks
        if(hours <= 12){
            hours = hours 
        }else{
            hours = hours - 12;
        }
    
        let current_Time = currentTime.textContent = extraZero(hours) + ":" + extraZero(minutes) + ":" + extraZero(seconds) + "  " + meridian;

        if(alarmTime == current_Time){
            window.alert(givenLabel);
        }
    },1000);
});