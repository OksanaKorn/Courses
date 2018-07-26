module('Validator');

/*
Your task is to create a set of "Constraint" classes that validate given input based on various parameters.
Consider this an utility set of classes that will be used to validate user input in forms.

All constraints must subclass the base Constraint or one of other Constraints.

  Constraint class is the base class and accepts only one property in configuration object
    if the input is optional or not. If no configuration provided, field is required (not optional).
  Constructor: Constraint(config)
    where config can be undefined, {}, {optional: true/false}
  Methods:
    isValid(input) - returns true if input satisfies the constraint and false otherwise

  StringConstraint class must check if input is a string and its length is between min and max characters in config
  Constructor: StringConstraint(config)
    where config can have additional "min" and/or "max" properties: {min: 2} or {max: 30} or {min: 2, max: 30}

  NumberConstraint class must check if input is a number and it is greater or equal to min and lesser than max
  Constructor: NumberConstraint(config)
    where config can have additional "min" and/or "max" properties: {min: 0} or {max: 100} or {min: 0, max: 100}

  PhoneConstraint class must check if input is a valid phone number (a string that consists only digits, spaces, round braces and dashes)
  Constructor: PhoneConstraint(config)

  EmailConstraint class must check if input is a valid email (a string that has only one "@" symbol and at least one dot)
  Constructor: EmailConstraint(config)


  SchemaConstraint class that will validate object with multiple properties according to defined schema.
  Constructor: Validator(config)
    where config must have additional "schema" property that lists which Constraints must be enforced on which properties.
    It must correctly process nested objects.
    For example:
      {
        optional: false,
        schema: {
          name: new StringConstraint({min: 2, max: 30}),
          phone: new PhoneConstraint(),
          address: {
            firstStreetLine: new StringConstraint({min: 3, max: 255}),
            secondStreetLine: new StringConstraint({optional: true})
          }
        }
      }
  Methods:
    isValid(inputObject)

  See usage in test cases

  Main point of this task is to build correct inheritance chain, maximizing code reusage across classes.
  Feel free to create additional classes and/or private methods to achieve this goal.
*/

// Write your classes here
function Constraint(config) {
  this._config = config || {};
}

Constraint.prototype.isValid = function(input) {
  if (!!(this._config.optional && input === undefined)) {
    return true;
  }
  return this._validate(input);
}

Constraint.prototype._validate = function(input) {
  if (!this._config.optional && input === undefined) {
    return false;
  }
  return true;
}

function TypeConstraint(config) {
  Constraint.call(this, config);
}

TypeConstraint.prototype = Object.create(Constraint.prototype);
TypeConstraint.prototype.constructor = TypeConstraint;


TypeConstraint.prototype._validate = function(input) {
  if (!Constraint.prototype._validate.call(this, input)) {
    return false;
  }
  if (typeof input !== this._config.type) {
    return false;
  }
  return true;
}


function StringConstraint(config) {
  TypeConstraint.call(this, config);
  this._config.type = 'string';
};

StringConstraint.prototype = Object.create(TypeConstraint.prototype);
StringConstraint.prototype.constructor = StringConstraint;

StringConstraint.prototype._validate = function(input) {
    if (!TypeConstraint.prototype._validate.call(this, input)) return false;
    if ((this._config.min !== undefined && input.length >= this._config.min) || this._config.min === undefined) {
      if ((this._config.max !== undefined && input.length <= this._config.max) || this._config.max === undefined) {
        return true;
      }
      return false;
    }
    else return false;
}


function NumberConstraint(config) {
  TypeConstraint.call(this, config);
  this._config.type = 'number';
}

NumberConstraint.prototype = Object.create(TypeConstraint.prototype);
NumberConstraint.prototype.constructor = NumberConstraint;

NumberConstraint.prototype._validate = function(input) {
    if (!TypeConstraint.prototype._validate.call(this, input)) return false;
    else if ((this._config.min !== undefined && input >= this._config.min) || this._config.min === undefined) {
      if ((this._config.max !== undefined && input <= this._config.max) || this._config.max === undefined) {
        return true;
      }
      return false;
    } 
    else return false;
}

function PhoneConstraint(config) {
  StringConstraint.call(this, config);
}

PhoneConstraint.prototype = Object.create(StringConstraint.prototype);
PhoneConstraint.prototype.constructor = PhoneConstraint;

PhoneConstraint.prototype._validate = function(input) {
    if (!StringConstraint.prototype._validate.call(this, input)) return false;
    var phoneCheck = /([0-9])\s\(([0-9])([0-9])([0-9])\)\s([0-9])([0-9])([0-9])\-([0-9])([0-9])\-([0-9])([0-9])/;
    var phoneCheck_2 = /([0-9])\s\(([0-9])([0-9])([0-9])\)\s([0-9])([0-9])([0-9])\s([0-9])([0-9])\s([0-9])([0-9])/;
    if ((input.match(phoneCheck) !== null) || (input.match(phoneCheck_2) !== null)) {
      return true;
    }
    return false;
}

function EmailConstraint(config) {
  StringConstraint.call(this, config);
}

EmailConstraint.prototype = Object.create(StringConstraint.prototype);
EmailConstraint.prototype.constructor = EmailConstraint;

EmailConstraint.prototype._validate = function(input) {
  if (!StringConstraint.prototype._validate.call(this, input)) return false;
  var emailCheck = /\S+@\S+\.\S+/;
  if (input.match(emailCheck) !== null) {
    return true;
  }
  return false;
}

function SchemaConstraint(validator) {
  
  this.schema = validator.schema;
}

SchemaConstraint.prototype.constructor = SchemaConstraint;

SchemaConstraint.prototype.isValid = function(input) {
  if (this.schema.title.isValid(input.title) &&
      this.schema.firstName.isValid(input.firstName) &&
      this.schema.lastName.isValid(input.lastName) &&
      this.schema.age.isValid(input.age) &&
      this.schema.phoneNumber.isValid(input.phoneNumber) &&
      this.schema.email.isValid(input.email) 
      ) return true;
    return false;
}

test('Constraint', function () {
  if (typeof Constraint !== 'function') {
    ok(false, 'Constraint is not defined');
    return;
  }

  var optionalConstraint = new Constraint({optional: true});
  var requiredConstraint = new Constraint();

  equal(optionalConstraint.isValid(undefined), true);
  equal(optionalConstraint.isValid(false), true);
  equal(optionalConstraint.isValid(123), true);
  equal(optionalConstraint.isValid('input'), true);

  equal(requiredConstraint.isValid(undefined), false);
  equal(requiredConstraint.isValid(false), true);
  equal(requiredConstraint.isValid(123), true);
  equal(requiredConstraint.isValid('input'), true);
});

test('StringConstraint', function () {
  if (typeof StringConstraint !== 'function') {
    ok(false, 'StringConstraint is not defined');
    return;
  }

  var optionalConstraint = new StringConstraint({optional: true, min: 3, max: 6});
  var requiredConstraint = new StringConstraint({min: 3, max: 6});

  equal(optionalConstraint.isValid(undefined), true);
  equal(optionalConstraint.isValid(true), false);
  equal(optionalConstraint.isValid(10000), false);
  equal(optionalConstraint.isValid('input'), true);
  equal(optionalConstraint.isValid('a'), false);
  equal(optionalConstraint.isValid('aaaaaaaaaa'), false);

  equal(requiredConstraint.isValid(undefined), false);
  equal(requiredConstraint.isValid(true), false);
  equal(requiredConstraint.isValid(10000), false);
  equal(requiredConstraint.isValid('input'), true);
  equal(requiredConstraint.isValid('a'), false);
  equal(requiredConstraint.isValid('aaaaaaaaaa'), false);
});

test('NumberConstraint', function () {
  if (typeof NumberConstraint !== 'function') {
    ok(false, 'NumberConstraint is not defined');
    return;
  }

  var optionalConstraint = new NumberConstraint({optional: true, min: 0, max: 100});
  var requiredConstraint = new NumberConstraint({min: 0});


  equal(optionalConstraint.isValid(undefined), true);
  equal(optionalConstraint.isValid('50'), false);
  equal(optionalConstraint.isValid(true), false);
  equal(optionalConstraint.isValid(50), true);
  equal(optionalConstraint.isValid(-1), false);
  equal(optionalConstraint.isValid(101), false);

  equal(requiredConstraint.isValid(undefined), false);
  equal(requiredConstraint.isValid('50'), false);
  equal(requiredConstraint.isValid(true), false);
  equal(requiredConstraint.isValid(50), true);
  equal(requiredConstraint.isValid(-1), false);
  equal(requiredConstraint.isValid(101), true);
});

test('PhoneConstraint', function () {
  if (typeof PhoneConstraint !== 'function') {
    ok(false, 'PhoneConstraint is not defined');
    return;
  }

  var optionalConstraint = new PhoneConstraint({optional: true});
  var requiredConstraint = new PhoneConstraint();


  equal(optionalConstraint.isValid(undefined), true);
  equal(optionalConstraint.isValid('8 (800) 555-35-35'), true);
  equal(optionalConstraint.isValid('test@example.com'), false);
  equal(optionalConstraint.isValid(true), false);
  equal(optionalConstraint.isValid(-1), false);

  equal(requiredConstraint.isValid(undefined), false);
  equal(requiredConstraint.isValid('8 (800) 555-35-35'), true);
  equal(requiredConstraint.isValid('test@example.com'), false);
  equal(requiredConstraint.isValid(true), false);
  equal(requiredConstraint.isValid(-1), false);
});

test('EmailConstraint', function () {
  if (typeof EmailConstraint !== 'function') {
    ok(false, 'EmailConstraint is not defined');
    return;
  }

  var optionalConstraint = new EmailConstraint({optional: true});
  var requiredConstraint = new EmailConstraint();

  equal(optionalConstraint.isValid(undefined), true);
  equal(optionalConstraint.isValid('test@example.com'), true);
  equal(optionalConstraint.isValid('8 (800) 555-35-35'), false);
  equal(optionalConstraint.isValid(true), false);
  equal(optionalConstraint.isValid(-1), false);

  equal(requiredConstraint.isValid(undefined), false);
  equal(requiredConstraint.isValid('test@example.com'), true);
  equal(requiredConstraint.isValid('8 (800) 555-35-35'), false);
  equal(requiredConstraint.isValid(true), false);
  equal(requiredConstraint.isValid(-1), false);
});

test('SchemaConstraint', function () {
  var constructors = [
    typeof Constraint,
    typeof StringConstraint,
    typeof NumberConstraint,
    typeof PhoneConstraint,
    typeof EmailConstraint,
    typeof SchemaConstraint
  ];

  for (var i = 0; i < constructors.length; i++) {
    if (constructors[i] !== 'function') {
      ok(false, 'Constructors are not defined');
      return;
    }
  }

  // Tests start here

  var schema = {
    title: new StringConstraint({optional: true}),
    firstName: new StringConstraint({min: 2, max: 30}),
    lastName: new StringConstraint({min: 2, max: 30}),
    age: new NumberConstraint({min: 18}),
    phoneNumber: new PhoneConstraint({optional: true}),
    email: new EmailConstraint({optional: true})
  };

  var validator = new SchemaConstraint({schema: schema});

  var correctFullData = {
    title: 'Mr.',
    firstName: 'Daniel',
    lastName: 'Weaver',
    age: 22,
    phoneNumber: '8 (800) 555 35 35',
    email: 'test@example.com'
  };

  var correctOptionalData = {
    firstName: 'Daniel',
    lastName: 'Weaver',
    age: 22
  };

  var incorrectTypeData = {
    title: true,
    firstName: 'Daniel',
    lastName: 'Weaver',
    age: 22
  };

  var incorrectLengthData = {
    firstName: 'DanielDanielDanielDanielDanielDanielDanielDanielDaniel',
    lastName: 'Weaver',
    age: 22
  };

  var incorrectOptionalData = {
    title: 'Mr.',
    firstName: 'Daniel',
    lastName: 'Weaver',
    age: 22,
    phoneNumber: 'testtestest',
    email: 'nothingtoseehere'
  };

  equal(validator.isValid(correctFullData), true, 'correctFullData');
  equal(validator.isValid(correctOptionalData), true, 'correctOptionalData');
  equal(validator.isValid(incorrectTypeData), false, 'incorrectTypeData');
  equal(validator.isValid(incorrectLengthData), false, 'incorrectLengthData');
  equal(validator.isValid(incorrectOptionalData), false, 'incorrectOptionalData');
});

test('SchemaConstraint handles nested objects recursively', function () {
  var constructors = [
    typeof Constraint,
    typeof StringConstraint,
    typeof NumberConstraint,
    typeof PhoneConstraint,
    typeof EmailConstraint,
    typeof SchemaConstraint
  ];

  for (var i = 0; i < constructors.length; i++) {
    if (constructors[i] !== 'function') {
      ok(false, 'Constructors are not defined');
      return;
    }
  }

  // Tests start here

  var schema = {
    title: new StringConstraint({optional: true}),
    firstName: new StringConstraint({min: 2, max: 30}),
    lastName: new StringConstraint({min: 2, max: 30}),
    age: new NumberConstraint({min: 18}),
    address: {
      city: new StringConstraint({min: 2, max: 50}),
      firstStreetLine: new StringConstraint({min: 3, max: 255}),
      secondStreetLine: new StringConstraint({optional: true})
    }
  };

  var validator = new SchemaConstraint({schema: schema});

  var correctFullData = {
    title: 'Mr.',
    firstName: 'Daniel',
    lastName: 'Weaver',
    age: 22,
    address: {
      city: 'Toronto',
      firstStreetLine: '375 Sullivan Circle',
      secondStreetLine: 'apt. 50'
    }
  };

  var correctOptionalData = {
    firstName: 'Daniel',
    lastName: 'Weaver',
    age: 22,
    address: {
      city: 'Toronto',
      firstStreetLine: '375 Sullivan Circle apt. 50'
    }
  };

  var incorrectData = {
    title: true,
    firstName: 'Daniel',
    lastName: 'Weaver',
    age: 22,
    address: {
      city: '',
      firstStreetLine: '375 Sullivan Circle'
    }
  };

  equal(validator.isValid(correctFullData), true);
  equal(validator.isValid(correctOptionalData), true);
  equal(validator.isValid(incorrectData), false);
});