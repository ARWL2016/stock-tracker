"use strict"; 

function fetchPricesBySymbol(req, res) {
  const id = req.params.id;
  console.log('fetch prices by sym: ', id);
  res.status(200).json({symbol: id});
}

module.exports = {
  fetchPricesBySymbol
}