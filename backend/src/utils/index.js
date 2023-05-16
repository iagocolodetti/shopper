module.exports = {  
    fixTwoDecimals(n) {
        let num = n;
        let with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        return Number(with2Decimals);
    }
}
