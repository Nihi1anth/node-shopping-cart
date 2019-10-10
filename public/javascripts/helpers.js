var register = function(Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    foo: function(){
        return "FOO";
    },
    bar: function(){
        return "BAR";
    },
    math: function(lvalue, operator, rvalue, option) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);

      return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
      }[operator];
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
      // just return helpers object if we can't register helpers here
      return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);  