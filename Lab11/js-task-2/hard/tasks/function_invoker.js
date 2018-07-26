
module('Function invoker');

/*
Write a function that invokes given function
with its arguments taken from object

invoker(function(a, b, c) {}, {a: 1, b: 2, c: 3})
Must call supplied function as (1, 2, 3)

invoker(function(a, b, c, d) {}, {a: 1, b: 2, d: 4})
Must call supplied function as (1, 2, undefined, 4)
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
    equal(z, args.z, 'z');
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
