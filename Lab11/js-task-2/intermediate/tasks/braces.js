
module('Braces');

/*
Write a function that validates a series of braces.
*/

function validSequence(braces) {
  var opened = ["[", "{", "(", "<"];
  var closed = ["]", "}", ")", ">"];
  
  var arr = [];
  var matched, j;
  
  for (var i = 0; i < braces.length; i++) {
    j = braces[i];

    if (closed.includes(j)) {
      matched = opened[closed.indexOf(j)];
      if (arr.length == 0 || (arr.pop() != matched)) {
        return false;
      }
    } 
    else {
      arr.push(j);
    }
  }
  return (arr.length == 0);
}

test('Simple valid cases', function() {
  equal(validSequence(''), true, 'empty string validates');
  equal(validSequence('[]'), true, 'square braces');
  equal(validSequence('()'), true, 'round braces');
  equal(validSequence('{}'), true, 'figure braces');
  equal(validSequence('<>'), true, 'brackets');
});

test('Simple invalid cases', function() {
  equal(validSequence('}'), false, 'invalid case');
  equal(validSequence('({'), false, 'invalid case');
  equal(validSequence('[<]'), false, 'invalid case');
  equal(validSequence('({)}'), false, 'invalid case');
});

test('Final cases', function() {
  equal(validSequence('([](<{}>))'), true, 'valid case');
  equal(validSequence('({[](<{}>}))'), false, 'invalid case');
});
