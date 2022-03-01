const formatShare = function (share) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "MM" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return share >= item.value;
  });

  return item ? (share / item.value).toFixed(2).replace(rx, "$1") + item.symbol : "0";
};

const formatCurrency = function(currency){
  return `$${(Number(currency)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

module.exports = {
  formatShare,
  formatCurrency
};