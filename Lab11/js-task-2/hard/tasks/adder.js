
module('Adder');

/*
Create a function that behaves this way:
var result = adder(1)(2)(3)(4)(5);
console.log(result); // => 15

It must be able to chain indefinitely
*/

function adder() {
  var sum;
  for (var i = 0; i < arguments.length; i++) {
  sum += arguments[i] + arguments[i + 1];
  }
  alert(sum);
}

test('adder', function() {
  equal(adder(1), 1, '1');
  equal(adder(1)(1), 2, '2');
  equal(adder(1)(10)(-2), 9, '9');
  equal(adder(10)(20)(30)(40)(50), 150, '150');
});
