 let buffer = '0';
 let runningTotal = 0;
 let previousOperator;
const screen = document.querySelector(".display")
 
 
 
 function buttonClick(value){
     if (isNaN(parseInt(value))) {
        handleSymbol(value);
     }
    else{
        handleNumber(value);
    }
    rerender();
 }

function handleNumber(number){
    if (buffer === '0'){
        buffer = number;
    }
    else {
        buffer += number;
    }
    
}

function handleMath(value){
    if (buffer === '0'){
        return;
    }

    const intbuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intbuffer;
    } else {
        flushOperation(intbuffer);
    }

    previousOperator = value;
    buffer = '0';
}

function flushOperation (intbuffer){
    if (previousOperator === '+'){
        runningTotal += intbuffer;
    } else if (previousOperator === '-'){
        runningTotal -= intbuffer;
    } else if (previousOperator === 'x'){
        runningTotal *= intbuffer;
    } else{
        runningTotal /= intbuffer;
    }
}


function handleSymbol(symbol){
    switch (symbol){
        case 'C':
            buffer = '0';
            break;
        case '=':
            if (previousOperator=== null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1){
                buffer = 0;
            } else {
                buffer = buffer.substring(0, buffer.length-1)
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }

}


function init(){
    document
        .querySelector(".calculator")
        .addEventListener("click",function(event){
            buttonClick(event.target.innerText);
        });
}

function rerender(){
    screen.innerText = buffer;
}

init()