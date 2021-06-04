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

showAllAlarms();

fireAlarms();

// setting an alarm and adding it to the list of upcoming alarms
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

    let event = {
        label : givenLabel,
        time: alarmTime
    }
    
    let upcomingAlarms = localStorage.getItem('upcomingAlarms');

    if(upcomingAlarms == null){
        alarmsList = [];
    }else{
        alarmsList = JSON.parse(upcomingAlarms);
    }

    alarmsList.push(event);
    localStorage.setItem('upcomingAlarms',JSON.stringify(alarmsList));

    showAllAlarms();
    fireAlarms();
});

// deleting an alarm from upcoming alarms list
function deleteAlarm(index){
    let upcomingAlarms = localStorage.getItem('upcomingAlarms');
    let alarmsList = JSON.parse(upcomingAlarms);

    alarmsList.splice(index,1);

    localStorage.setItem('upcomingAlarms',JSON.stringify(alarmsList));

    showAllAlarms();
    fireAlarms();
}

// show all upcoming alarms list
function showAllAlarms(){
    let upcomingAlarms = localStorage.getItem('upcomingAlarms');

    if(upcomingAlarms == null){
        alarmsList = [];
    }else{
        alarmsList = JSON.parse(upcomingAlarms);
    }

    let html = '';
    let upcomingAlarmsList = document.getElementById('alarms_list');

    upcomingAlarmsList.innerHTML = html;

    alarmsList.forEach((event,index) =>{
        html += `<tr>
                    <td class="alarm_info">
                        <p style="margin: 5px;">${event.label}</p>
                        <p><i class="far fa-clock"></i> ${event.time}</p>
                    </td>
                    <td class="del_btn" onclick="deleteAlarm(${index})"><i class="fas fa-trash-alt fa-lg"></i></td>
                </tr>`
    });

    upcomingAlarmsList.innerHTML = html;
}

// firing the alarms from upcoming ones in the order
function fireAlarms(){
    let upcomingAlarms = localStorage.getItem('upcomingAlarms');

    if(upcomingAlarms == null){
        alarmsList = [];
    }else{
        alarmsList = JSON.parse(upcomingAlarms);
    }

    if(alarmsList.length != 0){
        let nextAlarm = alarmsList[0];
        console.log(nextAlarm);

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

            if(nextAlarm.time == current_Time){
                window.alert(nextAlarm.label);
                alarmsList.splice(0,1);
                localStorage.setItem('upcomingAlarms',JSON.stringify(alarmsList));
                showAllAlarms();
                fireAlarms();
            }
        },1000);
    }
}