
module('Function object');

/*
Write a function "callableConstructor(fn)" that takes a constructor as an argument and
generates a new constructor which makes the created object callable - behave both like a function and a class.
Do not break prototypal inheritance.

obj() == obj.callable()
*/

function callableConstructor(fn) {
  return fn;
}

test('Function object', function() {
  function Rectangle(width, height) {
    this.width = width;
    this.height = height;
  }

  Rectangle.prototype.callable = function() {
    return this.width * this.height;
  }

  function Square(side) {
    Rectangle.call(this, side, side);
  }

  Square.prototype = Object.create(Rectangle.prototype);
  Square.prototype.constructor = Square;

  var square = new Square(5);
  var CallableSquareConstructor = callableConstructor(Square);
  var callableSquare = new CallableSquareConstructor(5);

  ok(square.callable() == callableSquare.callable(), 'Direct method call works normally');
  ok(callableSquare instanceof Square, 'Inheritance not broken');
  ok(callableSquare instanceof Rectangle, 'Inheritance not broken');
  ok(callableSquare() == callableSquare.callable(), 'Can be called as a function');
  throws(function () {
    square();
  }, undefined, 'Original constructor wasnt modified');
});
