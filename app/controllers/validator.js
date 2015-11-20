

//data validation strategy
module.exports = {

  //error messages
  errMessages: {
    username: 'Invalid username',
    name: 'Invalid first or last name',
    email: 'Invalid email',
    password: 'Invalid password',
    role: 'Invalid role'
  },
  validators: {

    //validate username
    username: function(str) {
      var val = /\S/.test(str);
      return val;
    },

    //validate name
    name: function(obj) {
      if (!obj.first || !obj.last) {
        return false;
      } else {
        var val = /\D\S/.test(obj.first + obj.last);
        return val;
      }
    },

    //validate email
    email: function(email) {
      var val = /\w+@/.test(email);
      return val;
    },

    //validate password
    password: function(password) {
      var val = /\S/.test(password);
      return val;
    },

    //validate role
    role: function(role) {
      var val;
      if (role !== 'user' && role !== 'stylist') {
        val = false;

      } else {
        val = true;
      }
      return val;
    }

  },

  /**
   * [checkStatus check data provided for each field]
   * @param  {} field [form field]
   * @param  {} value [provided value]
   * @return {string or number}       [error if error, else 0]
   */
  checkStatus: function(field, value) {
    if (!value) {
      return this.errMessages[field];
    } else {
      var isValid = this.validators[field](value);

      if (!isValid) {
        return this.errMessages[field];
      } else {
        return 0;
      }
    }
  },

  /**
   * [validate provided data]
   * @param  {object} data [user data]
   * @return {array}      [errors if any]
   */
  validate: function(data) {
    var errors = [];
    for (var field in this.errMessages) {

      //check if all required details are provided
      if (!data.hasOwnProperty(field)) {
        errors.push(this.errMessages[field]);

      } else {
        //check values for each property
        var status = this.checkStatus(field, data[field]);
        if (status !== 0) {
          errors.push(status);
        }
      }
    }

    return errors;
  }
};
