const currencies = {
    EUR: { currency: 'EUR', symbol: '€' },
    USD: { currency: 'USD', symbol: '$' },
    AUD: { currency: 'AUD', symbol: '$' },
    GBP: { currency: 'GBP', symbol: '£' },
    CAD: { currency: 'CAD', symbol: '$' },
    HKD: { currency: 'HKD', symbol: '$' },
    CNY: { currency: 'CNY', symbol: '¥' },
}
let url = 'https://api.exchangeratesapi.io/latest?base=USD'
let highest = null;

let date = document.querySelector('.date');
let dateNow = new Date();
date.textContent = dateNow;

function getCurrencyRates() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let [key, value] of Object.entries(currencies)) {
                // a fix for missing EUR base in api
                // https://api.exchangeratesapi.io/latest?base=EUR
                if ((data.rates[key]) === undefined) {
                    value.rate = 1.000.toFixed(3);
                } else {
                    // add rate property to objects
                    value.rate = data.rates[key].toFixed(3);
                }
            }
            // force async function to happen befere renderWithHighest()
            renderWithHighest()
        });
}

function setBarHeights(select) {
    if (select.value) { selected = select.value; }
    url = 'https://api.exchangeratesapi.io/latest?base=' + selected;
    if (url !== 'https://api.exchangeratesapi.io/latest?base=undefined') {
        // update rates against base rate
        getCurrencyRates();
        // reset highest rate
        highest = null;
    }
};

function renderWithHighest() {
    // get highest rate
    for (let [key, value] of Object.entries(currencies)) { if (value.rate > highest) { highest = value.rate; } }
    // add height class to bars
    // add textContent to bars
    for (let [key, value] of Object.entries(currencies)) {
        let output = document.querySelector('.BarChart-bar-' + key);
        let height = value.rate / highest * 700;
        output.style.height = height + 'px';
        output.textContent = `${key} ${value.rate} ${currencies[key]['symbol']}`
    }
}

// onClick for bars
function removeBar(currency) {
    let output = document.querySelector('.BarChart-bar-' + currency);
    output.style.display = 'none';
    delete currencies[currency];
    // rerender bars 
    setBarHeights(selected);
};

