const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function appendValue(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        let expression = display.value;
        let result = eval(expression);

        saveHistory(expression + " = " + result);
        display.value = result;
    }
    catch{
        display.value = "Error";
    }
}
function saveHistory(item){
    let history =
        JSON.parse(localStorage.getItem("calculatorHistory")) || [];

    history.unshift(item);
    if(history.length > 15){
        history.pop();
    }
    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );
    renderHistory();
}
function renderHistory(){
    let history =
        JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    historyList.innerHTML = "";
    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.textContent = item;
        div.onclick = () => {
            display.value = item.split("=")[0].trim();
        };
        historyList.appendChild(div);
    });
}
function clearHistory(){
    localStorage.removeItem("calculatorHistory");
    renderHistory();
}
document.addEventListener("keydown", (e)=>{
    const allowed = "0123456789+-*/().";
    if(allowed.includes(e.key)){
        appendValue(e.key);
    }
    if(e.key === "Enter"){
        calculate();
    }
    if(e.key === "Backspace"){
        display.value = display.value.slice(0,-1);
    }
});
renderHistory();