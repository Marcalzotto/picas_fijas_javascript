var generateNumber = function(){
    var numberMaster = shuffle(Array.from(Array(10).keys()));
    return numberMaster;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

var splitNumber = function(attempt){
    output = [],
    sNumber = attempt.toString();
    for (var i = 0, len = sNumber.length; i < len; i += 1) {
        output.push(+sNumber.charAt(i));
    }
    console.log(output);
    return output;

}

var findRepeat = function(attempt){
    attempt = splitNumber(attempt);
    var sorted_arr = attempt.slice().sort(); // You can define the comparing function here.
                                         // JS by default uses a crappy string compare.
                                         // (we use slice to clone the array so the
                                         // original array won't be modified)
    var results = [];
    for (var i = 0; i < attempt.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    console.log(results);
    if (results.length == 0) {
        return attempt;
    }else{
        return false;
    }
}
var validation = function(attempt){
    var repeats = findRepeat(attempt);
    console.log (repeats)
    if (repeats != false && repeats.length == 4){
        console.log("true")
        return true;
    }else {
        {
        console.log("false")
        return false;
        }
    }

}


$(document).ready(function(){
    numberMaster = generateNumber();
    $(document).keypress(function(e){
        if (e.which == 13) {
            var attempt = $(".number input").val();
            validation(attempt);
            // if attempt.length != 4 &&
        }
    })
});
