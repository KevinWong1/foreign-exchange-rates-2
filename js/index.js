let currencies = {
    EUR: {
        currency: 'EUR',
        symbol: '€'
    },
    USD: { currency: 'USD', symbol: '$' },
    AUD: { currency: 'AUD', symbol: '$' },
    GBP: { currency: 'GBP', symbol: '£' },
    CAD: { currency: 'CAD', symbol: '$' },
    HKD: { currency: 'HKD', symbol: '$' },
    CNY: { currency: 'CNY', symbol: '¥' },
}

let selected = null;
let url = 'https://api.exchangeratesapi.io/latest?base=USD'
let highest = null;

function getCurrencyRates() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let [key, value] of Object.entries(currencies)) {
                // a fix for missing EUR base in api
                // https://api.exchangeratesapi.io/latest?base=EUR
                let output = document.querySelector('.BarChart-bar-' + key);
                if ((data.rates[key]) === undefined) {
                    value.rate = 1.000;
                    output.textContent = `${key} 1.000 €`;
                } else {
                    // add rate property to objects
                    value.rate = data.rates[key];
                    output.textContent = `${key} ${data.rates[key].toFixed(3)} ${currencies[key]['symbol']}`
                }
            }
        });
}

function setBarHeights(select) {
    if (select.value) {
        selected = select.value;
    }
    url = 'https://api.exchangeratesapi.io/latest?base=' + selected;
    if (url !== 'https://api.exchangeratesapi.io/latest?base=undefined') {
        getCurrencyRates();
        renderWithHighest();
        highest = null;
    }
};

function remove(currency) {
    let output = document.querySelector('.BarChart-bar-' + currency);
    output.style.display = 'none';
    delete currencies[currency];
    setBarHeights(selected);
};

function renderWithHighest() {
    getCurrencyRates();
    for (let [key, value] of Object.entries(currencies)) {
        if (value.rate > highest) {
            highest = value.rate;
        }
    }
    for (let [key, value] of Object.entries(currencies)) {
        let output = document.querySelector('.BarChart-bar-' + key);
        let height = value.rate / highest * 700;
        output.style.height = height + 'px';
    }
}

let date = document.querySelector('.date');
let dateNow = new Date();
date.textContent = dateNow;
