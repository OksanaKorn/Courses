
module('Function invoker');

/*
Write a function that invokes given function
with its arguments taken from object by their respective names.
If an argument with given name doesn't exist in parameters object, you must pass an undefined value

  invoker(function(a, b, c) {}, {c: 1, a: 2, b: 3})

Must call supplied function as (2, 3, 1)

  invoker(function(c, a, b, d) {}, {d: 1, b: 2, a: 4})

Must call supplied function as (undefined, 4, 2, 1)
*/

function invoker(fn, args) {
  
  fn(); // Replace with valid code
}

test('First case', function() {
  var args = {
    a: 'string',
    b: true,
    y: 42,
    z: null
  };

  function fn(a, b, x, y, z) {
    equal(a, args.a, 'a');
    equal(b, args.b, 'b');
    equal(x, args.x, 'x');
    equal(y, args.y, 'y');
    equal(z, args.a, 'z');
  }

  invoker(fn, args);
});

test('Second case', function() {
  var args = {
    arg: 'string',
    'argNamed42': 42,
    anotherArg: []
  };

  function fn(arg, argNamed42, anotherArg) {
    equal(arg, args.arg, 'arg');
    equal(argNamed42, args['argNamed42'], 'argNamed42');
    equal(anotherArg, args.anotherArg, 'x');
  }

  invoker(fn, args);
});
