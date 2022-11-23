"use strict";

var lista = [2, 4, 6, 7, 8];
lista.map(function (x) {
  return x * x;
}).forEach(function (x) {
  return console.log(x);
});
