function Getday() {
    const dayelement = document.getElementById("age");
    const resultelement = document.getElementById("result");
    switch (dayelement.value.toUppercase()){
        case "sunday":
            resultelement.innerHTML = "weekday";
            break;
        case "monday":
            resultelement.innerHTML = "jobday";
            break;
        case "tuesday":
            resultelement.innerHTML = "jobday";
            break;
        case "wednesday":
            resultelement.innerHTML = "jobday";
            break;
        case "thursday":
            resultelement.innerHTML = "jobday";
            break;
        case "friday":
            resultelement.innerHTML = "weekend";
            break;
        case "saturday":
            resultelement.innerHTML = "weekend";
            break;
        default:
            resultelement.innerHTML = "invalidday";

    }
}
// case "friday":
// case "saturday":
// case "sunday":
//     resultelement.innerHTML = "weekend";
// break;

