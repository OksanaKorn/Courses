module('Data Model');

/*
Create a base DataModel class that automatically creates getters and setters for a list of properties defined
on subclasses' constructors.
It must not overwrite already present getters or setters.
It must also automatically set data from object passed to constructor with setters.

Additional task:
  .changed() method must return true if current object state differs from original one, passed to constructor
    (i.e. some of properties were modified after object was created)
  .save() method must save current state of object as new original for further comparison
*/


// Modify this to solve the task --------
function DataModel(data) {
  
}

// ---------------------------------------

// Person --------------------------------


function Person(data) {
  DataModel.call(this, data);
}

Person.fields = ['age', 'firstName', 'lastName'];

Person.prototype = Object.create(DataModel.prototype);
Person.prototype.constructor = Person;

Person.prototype.setAge = function(age) {
  this._age = age > 0 ? age : NaN;
};
// Person --------------------------------

// Student -------------------------------
function Student(data) {
  Person.call(this, data);
}

Student.fields = ['isicId'];

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
// Student -------------------------------

test('Direct subclass', function() {
  var person = new Person({
    age: 21,
    firstName: 'Daniel',
    lastName: 'Weaver'
  });

  // DataModel prototype must not have getters and setters of subclass
  equal(DataModel.prototype.getAge, undefined);
  equal(DataModel.prototype.setAge, undefined);
  equal(DataModel.prototype.getFirstName, undefined);
  equal(DataModel.prototype.setFirstName, undefined);
  equal(DataModel.prototype.getLastName, undefined);
  equal(DataModel.prototype.setLastName, undefined);

  // Instead, subclass must have them defined
  equal(person.getAge(), 21);
  equal(person.getFirstName(), 'Daniel');
  equal(person.getLastName(), 'Weaver');

  person.setFirstName('David');
  equal(person.getFirstName(), 'David');

  // Already present setter must work correctly
  person.setAge(-1);
  equal(Number.isNaN(person.getAge()), true);
});

test('Constructor uses setters', function() {
  var person = new Person({
    age: -1,
    firstName: 'Daniel',
    lastName: 'Weaver'
  });

  equal(Number.isNaN(person.getAge()), true);
  person.setAge(21);
  equal(person.getAge(), 21);
});

test('Complex subclassing works correctly', function() {
  var person = new Person({
    age: 21,
    firstName: 'Daniel',
    lastName: 'Weaver'
  });

  var student = new Student({
    age: 18,
    firstName: 'David',
    lastName: 'Weaver',
    isicId: 'S 123 456 789 912 A'
  });

  // Parent class must not have subclass getters and setters
  equal(person.getIsicId, undefined);
  equal(person.setIsicId, undefined);

  // Subclass must have both parents' and own getters and setters

  equal(student.getAge(), 18);
  equal(student.getFirstName(), 'David');
  equal(student.getLastName(), 'Weaver');
  equal(student.getIsicId(), 'S 123 456 789 912 A');
  student.setIsicId('S 123 456 789 912 B');
  equal(student.getIsicId(), 'S 123 456 789 912 B');
});

test('changed and save', function() {
  var student = new Student({
    age: 18,
    firstName: 'David',
    lastName: 'Weaver',
    isicId: 'S 123 456 789 912 A'
  });

  equal(student.changed(), false);

  student.setAge(19);
  equal(student.changed(), true);

  student.setAge(18);
  equal(student.changed(), false);

  student.setFirstName('Daniel');
  student.setLastName('Stevenson');
  equal(student.changed(), true);

  student.setFirstName('David');
  equal(student.changed(), true);

  student.setLastName('Weaver');
  equal(student.changed(), false);

  student.setAge(19);
  student.save();
  equal(student.changed(), false);

  student.setAge(18);
  equal(student.changed(), true);
});
