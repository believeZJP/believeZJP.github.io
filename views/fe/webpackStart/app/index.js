//引用css
//require("./main.css");

//引用sass
require("./main.scss");


var sub = require('./sub');
var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());
document.body.appendChild(app);