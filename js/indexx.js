
let currencies = {
    EUR: { currency: 'EURR', rate: 1.000 },
    USD: { currency: 'USD' },
    AUD: { currency: 'AUD' },
    GBP: { currency: 'GBP' },
    CAD: { currency: 'CAD' },
    HKD: { currency: 'HKD' },
}

let url = 'https://api.exchangeratesapi.io/latest?base=USD'

doFetch()

let highest = null;
function doFetch() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let [key, value] of Object.entries(currencies)) {
                let output = document.querySelector('.BarChart-bar-' + key);
                // if (data.rates[key] > highest) {
                //     highest = data.rates[key];
                //     // console.log(highest);
                // }
                // a fix for missing EUR base in api
                // https://api.exchangeratesapi.io/latest?base=EUR
                if (data.rates[key] === undefined) {
                    output.textContent = `${key} 1.000`;
                } else {
                    // add property to objects
                    value.rate = data.rates[key];
                    output.textContent = `${key} ${data.rates[key].toFixed(3)} `
                }
            }
        });
}

console.log(currencies);


function getBaseCurrency(select) {
    base = select.value;
    url = 'https://api.exchangeratesapi.io/latest?base=' + base;
    for (let [key, value] of Object.entries(currencies)) {

        if (value.rate > highest) {
            highest = value.rate;
            // console.log(highest);
        }
        let output = document.querySelector('.BarChart-bar-' + key);
        // console.log('object');
        // console.log(`rate ${value.rate}`);
        let height = value.rate / highest * 800;
        output.style.height = height + 'px';

    }
    doFetch();
    highest = 0;
};
