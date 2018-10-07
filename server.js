const express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();

app.set('view engine', 'hbs');
//we can access all the files in this dir from browser like /help.html
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
	// return 123;
});

hbs.registerHelper('scremIt',(text) => {
	return text.toUpperCase();
});


app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});


app.use((req,res,next)=>{
	var time = new Date().toString();
	fs.appendFile('server.log', time + '\n', (err) => {
	  	if (err) {
	  		// throw err;
	  		console.log('Unable to write date to server.log file');
	  	}
	  		
	  	// console.log('The "data to append" was appended to file!');
	});
	console.log(`${time}: ${req.method} ${req.url}` );
	next();
});

app.get('/',(req, res)=>{
	// res.send('<h1>hello world</h1>');
	// res.send({
	// 	name:'Harry',
	// 	likes:[
	// 		'bikes',
	// 		'mountains'
	// 	]
	// });
	res.render('home.hbs',{
		pageTitle:'Home page',
		welcomeMessage:'Hey you are welcomed'
	});
});

app.get('/about', (req, res)=>{
	// res.send('This is about page.');
	res.render('about.hbs',{
		pageTitle:'About page'
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		error : 'Error occured.'
	});
});

app.listen(8000, () => {
	//sometimes server can take some time to come up, it is called when server is ready
	console.log('server is up');
});
