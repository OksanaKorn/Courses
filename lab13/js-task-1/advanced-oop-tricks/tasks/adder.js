module('Adder');

/*
Create a function that behaves this way:

  var result = adder(1)(2)(3)(4)(5);
  console.log(result); // => 15

It must be able to chain indefinitely
*/

function adder(a) {

  var currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}


// Basic test case
 
test('adder', function() {
  equal(adder(1), 1, '1');
  equal(adder(1)(1), 2, '2');
  equal(adder(1)(10)(-2), 9, '9');
  equal(adder(10)(20)(30)(40)(50), 150, '150');
});

/*
Advanced test case. The key difference lies in each "instance" being able to preserve its state
independent from other calls.
 */
test('branching adder', function() {
	var storedAdder = adder(1)(2);

	equal(storedAdder, 3, '3');
	equal(storedAdder(1), 4, '4');
	equal(storedAdder(1), 4, '4');
});
