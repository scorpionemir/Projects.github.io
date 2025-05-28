//declaration
const reset = document.querySelector("#reset");
const timer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");
const originText = document.querySelector("#origin-text p").innerHTML;
let theTime = [0,0,0,0]; //یک مقدار اولیه برای تایمر در نظر میگیریم تا به وسیله آن بتوانیم زمان را مدیریت کنیم(دقیقه،ثانیه،صدم ثانیه و هزارم ثانیه(که هزارم ثانیه نمایش داده نمیشود فقط برای بیان تنظیم زمان است))
var interval;
var startingTimer = false;

//function
function start() {
    let textEnteredindex = testArea.value.length; //دریافت مقدار اولیه ورودی جهت استارت تایمر
    if (textEnteredindex === 0 && !startingTimer) {
        startingTimer = true;
        interval = setInterval(runTimer, 10); //ایجاد یک تاخیر زمانی برای تایمر
    }
}
function runTimer() {
    let mainTime = zero(theTime[0]) + ":" + zero(theTime[1]) + ":" + zero(theTime[2]);
    timer.innerHTML = mainTime; //دادن مقدار main time به عنوان مقدار زمان
    theTime[3]++;

    // تنظیم زمان مناسب با حالت اصلی با استفاده از تابع math.floor برای رند کردن اعداد
    theTime[0] = Math.floor((theTime[3]/100)/60); //زمان مربوط به دقیقه
    theTime[1] = Math.floor((theTime[3]/100) - (theTime[0]*60)); //زمان مربوط به ثانیه
    theTime[2] = Math.floor((theTime[3]) - (theTime[1]*100) - (theTime[0]*6000)); //زمان مربوط به صدم ثانیه
}
function spellCheck() {
    let textEntered = testArea.value; // دریافت مقدار وارد شده به باکس
    let originTextMatch = originText.substring(0 , textEntered.length); //مقایسه مقدار وارد شده به باکس با مقدار موجود نوشته شده
    //بررسی شرط متن
    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#40E0D0";
    } else{
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#FF8C00";
        } else{
            testWrapper.style.borderColor = "#4b134f";
        }
    } 
}
function resetAll() {
    clearInterval(interval);
    interval = null; // برای ایجاد یک تایمر جدید
    alert("reset everything");
    testArea.value = "";
    startingTimer = false;
    theTime = [0,0,0,0];
    timer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

}
function zero(time) { //قرار دادن صفر در زمان مخصوصا برای زمانی که اعداد ثانیه و دقیقه در زمان کمتر یا مساوی با 9 قرار دارند
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
} // اضافه کردن تابع به تابع runTimer

//events
testArea.addEventListener("keypress" , start);
testArea.addEventListener("keyup" , spellCheck);
reset.addEventListener("click" , resetAll);