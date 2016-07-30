//引用css
//require("./main.css");

//引用sass
require("./main.scss");

//https://vikingmute.gitbooks.io/webpack-for-fools/content/entries/chapter-1.html
var sub = require('./sub');
var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());
document.body.appendChild(app);