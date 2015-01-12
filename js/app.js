$(document).ready(function(){
    var objOfData = {};
    $('#checking-button').attr('disabled', 'disabled');
//Events

    $('#question-button').on('click', function() {
        $('.questions').css('display', 'block');
        $('#checking-button').removeAttr("disabled");
        $('.information').css('display', 'none');
        $('.checking').css('display', 'none');
        $('.option').css('display', 'none');
        $('.question').html('');
        $('.no-validation').html(" ");
        objOfData.arrayToShowing = createQuestions();
        for(var i=0; i<10; i++){
            var tmp = '<p>';
            tmp += objOfData.arrayToShowing[i][0];
            tmp += '</p><input type="number" min="1"><br>';
            $('.question').append(tmp);
        }
    });

    $('#checking-button').on('click', function() {
        $('#checking-button').attr('disabled', 'disabled');
        $('.checked').html('');
        $('.option').css('display', 'none');
        var arrayOfAnswers = $('.question input'),
            countOfTrue = 0,
            flag = 0;


        arrayOfAnswers.each(function(index){
            var number = +this.value;
            if(number <= 0 || parseInt(number)-number != 0){
                $('.no-validation').html(" ");
                $('.no-validation').append("<p class='error'>Check your answer</p>");
                $('#checking-button').removeAttr("disabled");
                flag = 1;
                return false;
            }
            else {
                if(number == objOfData.arrayToShowing[index][1]){
                    countOfTrue++;

                }
            }
        });


        if(flag == 0){
            $('.questions').css('display', 'none');
            $('.checking').css('display', 'block');
            var tmp = '<p class="result"> Your result is <br>';
            tmp += countOfTrue;
            tmp += "/10</p>"
            $('.checked').append(tmp);
        }
    });

    $('#option-button').on('click', function(){
        $('.option').css('display', 'block');
        $('.information').css('display', 'none');
        $('.checking').css('display', 'none');
        $('.questions').css('display', 'none');
        $('#checking-button').attr('disabled', 'disabled');
    });

});


//Help functions
function checkTypes(){
    var arrayOfTypes = ['+', '-', '*', '/'],
        choosenTypes = [],
        nodesOfTypes = $('.option input');

    nodesOfTypes.each(function(index){
        if(this .checked){
            choosenTypes.push(arrayOfTypes[index]);
        }
    });

    return choosenTypes;
}

function createQuestions() {

    var objOfTasks = {
            '+': function (a, b){
                return a+b;
            },
            '-':function(a,b){
                return a-b;
            },
            '*':function(a,b){
                return a*b;
            },
            '/':function(a,b){
                return a/b;
            }
        },
        arrayOfTypes = checkTypes(),
        maxValue = arrayOfTypes.length- 1,
        arrayOfQuestions = [],
        count =0;

    while(count <10){
        var type = arrayOfTypes[getRandomInt(0, maxValue)],
            a = getRandomInt(1, 20),
            b = getRandomInt(1, 20),
            answer = objOfTasks[type](a,b);


        if(answer<=0 || (parseInt(answer)-answer) != 0) continue;
        else{
            var question = a + type + b + " = ",
                tmpArray = [];
            tmpArray.push(question);
            tmpArray.push(answer);
            arrayOfQuestions.push(tmpArray);
            count++;

        }
    }
    return arrayOfQuestions;

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}