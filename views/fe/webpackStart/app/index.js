/*//引用css
//require("./main.css");

//引用sass
require("./main.scss");

//https://vikingmute.gitbooks.io/webpack-for-fools/content/entries/chapter-1.html
var sub = require('./sub');

//引用jquery和moment
var $ = require('jquery');
var moment = require('moment');


var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);
app.appendChild(sub());

$('body').append('<p>look at me! now is '+moment().format()+'</p>');
*/

import './main.scss';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number) => {
	$('body').append('<p>promise result is '+ number +'now is '+moment().format()+'</p>');
});
app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);
app.appendChild(generateText())