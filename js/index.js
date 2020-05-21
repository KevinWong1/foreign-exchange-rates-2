let currencies = ['EUR', 'USD', 'AUD', 'GBP'];

// let currencies = { EUR: { currency: EUR }, USD: { currency: USD }, AUD: { currency: AUD }, GBP: { currency: GBP }, }
let url = 'https://api.exchangeratesapi.io/latest?base=USD'
// doFetch()

let base = "";
function doFetch() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (currency of currencies) {
                let output = document.querySelector('.BarChart-bar-' + currency);
                // console.log(currency);
                // a fix for missing EUR base in api
                // https://api.exchangeratesapi.io/latest?base=EUR
                if (data.rates[currency] === undefined) {
                    output.textContent = " EUR 1.000";
                } else {
                    output.textContent = `${currency} ${data.rates[currency].toFixed(3)}`
                }
                // let p = document.createElement('div')
                // p.textContent = data.rates[currency];
                // output.appendChild(p);
            }
        });
}

function getBaseCurrency(select) {
    base = select.value;
    url = 'https://api.exchangeratesapi.io/latest?base=' + base;
    doFetch()
};


let x = { EUR: { currency: 'EURR' }, USD: { currency: 'USD' }, AUD: { currency: 'AUD' }, GBP: { currency: 'GBP' }, }

for (let [key, value] of Object.entries(x)) {
    // console.log(`${key}: ${value}`);
    console.log(`${value.currency}`);
    value.hi = 2;
    for (let [keyy, valuee] of Object.entries(value)) {
        // console.log(`${keyy}: ${valuee}`);
        // console.log(key);
    }
}
console.log(x);

// let b = {
//     t: { y: 1 },
//     o: { y: 2 }
// }

// b.t.g = "3"

// console.log(b);