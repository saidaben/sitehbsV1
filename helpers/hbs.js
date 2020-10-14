const hbs = require("hbs");
const moment = require("moment");

// CUSTOM HELPERS

// function below: add the ternary operator functionnality to .hbs files
// usage : {{ternary true "yay" "nay "}} => prints yay
// usage : {{ternary NaN "yay" "nay "}} => prints nay
hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<"}}
awesome, 1 is less thant 10 !!!
{{/compare}}

*/

hbs.registerHelper("compare", function(lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function(l, r) {
      return l == r;
    },
    "===": function(l, r) {
      return l === r;
    },
    "!=": function(l, r) {
      return l != r;
    },
    "<": function(l, r) {
      return l < r;
    },
    ">": function(l, r) {
      return l > r;
    },
    "<=": function(l, r) {
      return l <= r;
    },
    ">=": function(l, r) {
      return l >= r;
    },
    typeof: function(l, r) {
      return typeof l == r;
    }
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}); 




// 
hbs.registerHelper("preventParticipation", function (eventDate) {
  // return eventDate < actualDate ? true : false;
  // actualDate = moment().format('Do MMMM YYYY, h:mm a'); // September 25th 2020, 1:05:37 pm
  console.log("DATE NON FORMATE : >>>>>",eventDate)
  const date = moment(eventDate).format("MMM Do YY");  
  console.log("juste la date>>>>>>>>>>>",date)
  // const rightNow = moment(actualDate).format('Do MMMM YYYY, h:mm a')
  //console.log("eventDate", date);
  // console.log("actualDate", actualDate);
  // console.log("rightNow", rightNow );
  //const date =  "12/05/2014"
  // utilise la fonction suivante de moment
  // https://momentjs.com/docs/#/query/s
  console.log("true || false  >>>>>>> de la date", moment(eventDate).isBefore());
  return !moment(eventDate).isBefore()

})



hbs.registerHelper("format", function(date_inscription){
  return moment(date_inscription).format('DD-MM-YYYY')
});

hbs.registerHelper("formatage", function(date){
  return moment(date).format('DD-MM-YYYY')
});


hbs.registerHelper("compare", function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
      return typeof l == r;
    }
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// ex usage : {{setCheckedbox "user" user.role }}
hbs.registerHelper("setCheckedbox", function (checkboxValue, searchedValue) {
  return checkboxValue.toString() === searchedValue.toString() ? "checked" : "";
});

// ex usage : {{setSelected this._id ../product.category}}
hbs.registerHelper("setSelected", function (optionValue, searchedValue) {
  return optionValue.toString() === searchedValue.toString() ? "selected" : "";
});

hbs.registerHelper("isParticipating", function(participants){
  if(participants){
    return true
  }else{
  return false
  }
});

