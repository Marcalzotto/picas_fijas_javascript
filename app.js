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
    if (results.length == 0) {
        return attempt;
    }else{
        return false;
    }
}
var validation = function(attempt){
    var repeats = findRepeat(attempt);
    if (repeats != false && repeats.length == 4){
        return repeats;
    }else {
        {
        return false;
        }
    }

}
var compare = function(master,number){
    var results = [0 ,0];
    for(var i = 1 in number){
        for(var j = 1 in number){
            if (i == j && master[i] == number[j]){
                console.log("fija");
                results[0] += 1;                    //fijas
            }else if (master[i] == number[j]) {
                results[1] +=1;                     //picas
                console.log("pica");
            }
        }
    }
    return results;
}
var print = function(master){
    for (i = 0; i < 4;i++){
        console.log(master[i]);
    }
}

let openCandado = async () => {

 const url = '192.168.1.250/cm?cmnd=Power%20on'; 
  setTimeout(async () => {
    const result = await fetch(url);
    const catResult = await result.json();
    console.log(catResult);  
  }, 500);  
}


$(document).ready(function(){
    var template = Handlebars.compile($('#row-template').html());
    numberMaster = generateNumber();
    print(numberMaster);
    $(".button").on("click", function(e){
        $("tbody").empty();
        numberMaster = generateNumber();
        print(numberMaster);

    })
    $(document).keypress(function(e){
        if (e.which == 13) {
            var attempt = $(".number input").val();
            $(".number input").val("");
            attempt = validation(attempt);
            if(attempt != false){
                $("span").removeClass("alarm");
                var results = compare(numberMaster, attempt);
                var row = {
                    number: attempt,
                    picas: results[1],
                    fijas: results[0]
                }
                $("tbody").append(template(row));
                if (row.fijas == 4){
                    $('#modal').modal({
                        show: true
                    });
                    console.log("termino el juego probando");
                    openCandado();
                }
            }else{
                $("span").addClass("alarm");
            }

        }
    })
});
