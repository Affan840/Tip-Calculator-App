let msg = document.querySelector('.msg');
let inputs = document.querySelectorAll('input');
let peopleInput = document.querySelector('#people');
let tipInput = document.querySelector('#custom-tip');
let billInput = document.querySelector('#bill');
let resetBtn = document.querySelector('.reset');
let tipBtns = document.querySelectorAll('.tip-btn');
let tipAmount = document.querySelector('.tip-amount h1');
let billAmount = document.querySelector('.total h1');

inputs.forEach((e) => {
    e.addEventListener('blur', (e) => { 
        console.log(billInput.value, tipInput.value , peopleInput.value);
        
        tipCalculator(Number(billInput.value),0, Number(tipInput.value), Number(peopleInput.value))        
        if (e.target.id == 'people') {
               if (e.target.value < 1) {
                 msg.style.display = "block";
                 peopleInput.style.boxShadow = "inset 0 0 0 2px var(--Red)";
               } else {
                 msg.style.display = "none";
                 peopleInput.style.boxShadow = "0 0 0";
                 people = peopleInput.value;
               }
        }
    });
});

peopleInput.addEventListener('blur', (e) => {
    tipBtns.forEach((e) => {
        if (e.classList.contains("active")) {
          tipCalculator(
            Number(billInput.value), Number(e.textContent.slice(0, -1)), Number(tipInput.value), Number(peopleInput.value)
          );
        }
    });
});

billInput.addEventListener('blur', (e) => {
});


    tipBtns.forEach((tip) => {
        tip.addEventListener("click", (e) => {
            if (tipInput.value > 0) {
                tipInput.value = ''
            }
            tipBtns.forEach((tipBtns) => tipBtns.classList.remove("active"));
            e.preventDefault();
            tip.classList.add('active');
            tipCalculator(Number(billInput.value), Number(tip.textContent.slice(0, -1)), Number(tipInput.value), Number(peopleInput.value));
        });
    });


tipInput.addEventListener('blur', (e) => {
    if (e.target.value > 0) {
        tipBtns.forEach((tipBtns) => tipBtns.classList.remove("active"));
    }
})

function tipCalculator(bill,tip = 0,customtip, people) {
    let tipPerPerson;
    let total;
    if (bill > 0 && customtip > 0 && people > 0) {
        tipPerPerson = ((bill / 100) * customtip) / people;
        total = (bill + (tipPerPerson * people)) / people;
        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        billAmount.textContent = `$${total.toFixed(2)}`;
    }
    else if(bill > 0 && tip > 0 && people > 0){
        tipPerPerson = ((bill / 100) * tip) / people;
        total = (bill + tipPerPerson * people) / people;
        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        billAmount.textContent = `$${total.toFixed(2)}`; 
    }
}

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    tipInput.value = '';
    peopleInput.value = '';
    tipBtns.forEach((tipBtns) => tipBtns.classList.remove("active"));
tipAmount.textContent = `$0.00`;
billAmount.textContent = `$0.00`; 
});

