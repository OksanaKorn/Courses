module('Memoize');

/*
Your task is to create a higher-order (wrapper) function that will speed up
generic repeatable calculations - recursive fibonacci and factorial functions.

Do not modify original functions, you may only generate new "wrapped" ones.
*/

var fibonacci = function(n) {
  if (n < 2) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

var factorial = function(n) {
  if (n < 1) {
    return 1;
  }

  return factorial(n - 1) * n;
};

// Modify this function to complete the task
// -------------
function memoizeWrapper(fn) {

}
// -------------

// Utilities -----------
var cycleCount = 100,
    seed = Math.floor((Math.random() * 10) + 20);
// Utilities -----------

test('Original functions work as expected', function() {
  equal(fibonacci(0), 0);
  equal(fibonacci(1), 1);
  equal(fibonacci(2), 1);
  equal(fibonacci(3), 2);
  equal(fibonacci(4), 3);
  equal(fibonacci(5), 5);
  equal(fibonacci(6), 8);
  equal(fibonacci(7), 13);
  equal(fibonacci(8), 21);
  equal(fibonacci(9), 34);
  equal(fibonacci(10), 55);

  equal(factorial(0), 1);
  equal(factorial(1), 1);
  equal(factorial(2), 2);
  equal(factorial(3), 6);
  equal(factorial(4), 24);
  equal(factorial(5), 120);
  equal(factorial(6), 720);
  equal(factorial(7), 5040);
  equal(factorial(8), 40320);
  equal(factorial(9), 362880);
  equal(factorial(10), 3628800);

  originalFibonacciTime = measureExecutionTime(cycleCount, function() {
    fibonacci(seed);
  });

  originalFactorialTime = measureExecutionTime(cycleCount, function() {
    factorial(seed);
  });
});

test('Wrapped functions work as expected', function() {
  fibonacci = memoizeWrapper(fibonacci);
  factorial = memoizeWrapper(factorial);

  equal(fibonacci(0), 0);
  equal(fibonacci(1), 1);
  equal(fibonacci(2), 1);
  equal(fibonacci(3), 2);
  equal(fibonacci(4), 3);
  equal(fibonacci(5), 5);
  equal(fibonacci(6), 8);
  equal(fibonacci(7), 13);
  equal(fibonacci(8), 21);
  equal(fibonacci(9), 34);
  equal(fibonacci(10), 55);

  equal(factorial(0), 1);
  equal(factorial(1), 1);
  equal(factorial(2), 2);
  equal(factorial(3), 6);
  equal(factorial(4), 24);
  equal(factorial(5), 120);
  equal(factorial(6), 720);
  equal(factorial(7), 5040);
  equal(factorial(8), 40320);
  equal(factorial(9), 362880);
  equal(factorial(10), 3628800);

  wrappedFibonacciTime = measureExecutionTime(cycleCount, function() {
    fibonacci(seed);
  });

  wrappedFactorialTime = measureExecutionTime(cycleCount, function() {
    factorial(seed);
  });
});

test('Wrapped functions are at least two times faster than their originals', function() {
  var wrappedFibonacciSpeedup = originalFibonacciTime / wrappedFibonacciTime;
  var wrappedFactorialSpeedup = originalFactorialTime / wrappedFactorialTime;

  console.log('Fibonacci original time:', originalFibonacciTime + 'ms');
  console.log('Fibonacci wrapped time:', wrappedFibonacciTime + 'ms');
  console.log('Fibonacci speedup:', wrappedFibonacciSpeedup, 'times');

  console.log('Factorial original time:', originalFactorialTime + 'ms');
  console.log('Factorial wrapped time:', wrappedFactorialTime + 'ms');
  console.log('Factorial speedup:', wrappedFactorialSpeedup, 'times');

  ok(wrappedFibonacciSpeedup > 2);
  ok(wrappedFactorialSpeedup > 2);
});

// Utilities -----------

var originalFibonacciTime, originalFactorialTime, wrappedFibonacciTime, wrappedFactorialTime;

function measureExecutionTime(cycles, fn) {
  var start = getNow();
  for (var i = 0; i < cycles; i++) {
    fn();
  }
  return getNow() - start;
}

function getNow() {
  if (typeof performance != 'undefined' && typeof performance.now == 'function') {
    return performance.now();
  }

  return Date.now();
}
