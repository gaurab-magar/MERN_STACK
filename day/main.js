function Getday(){
    const dayElement = document.getElementById("clash")
    const nightElement = document.getElementById("clans")
    
    if(dayElement.value == "sunday" ||
       dayElement.value =="monday" ||
       dayElement.value == "tuesday" ||
       dayElement.value ==  "wednesday" ||
       dayElement.value == "thursday"){
        nightElement.innerHTML="working"
    }else if(dayElement.value == "friday" ||
             dayElement.value == "saturday"){
        nightElement.innerHTML="leaveday"
    }else{
        nightElement.innerHTML="InvalidDay"
    }
}