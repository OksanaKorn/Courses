module('Deep comparison');

/*
Напишіть функцію, яка приймає два значення і повертає true, 
тільки якщо це два однакових значення або це об'єкти, властивості 
яких мають однакові значення 
*/

function deepEqual(a, b) {
    if (a === b) {
    return true;
  }
  
  else if (a == null || typeof a != "object" || b == null || typeof b != "object") {
    return false;
  }
  
  var propOfA = Object.keys(a), propOfB = Object.keys(b);

  if (propOfA.length != propOfB.length) {
    return false;
  }
  
  for (var key of propOfA) {
    if (!propOfB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

test('Deep comparison', function() {
  var obj = {here: {is: "an"}, object: 2};
  equal(deepEqual(obj, obj), true, "один об'єкт");
  
  equal(deepEqual(obj, {here: 1, object: 2}), false, "різні об'єкти");
  
  equal(deepEqual(obj, {here: {is: "an"}, object: 2}), true, "два однакових об'єкти");

  equal(deepEqual(13, 13), true, "прості типи");

  equal(deepEqual(13, "13"), false, "прості типи");
  
});