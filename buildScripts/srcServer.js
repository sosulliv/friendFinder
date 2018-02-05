import express from 'express';
import fs from 'fs';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
//import webpack from 'webpack';
//import config from '../webpack.config.dev';
import exphbs from 'express-handlebars';
//import  from './src/api/surveyApi.js'



/* eslint-disable no-console*/

const port = 3005;
const url = 'http://localhost:';
const app = express();
//const compiler = webpack(config);
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

/*

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
*/

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/survey', function (req, res) {
	res.render('survey');
});



/*
app.get('/api/friends', function(req,res){
	res.sendFile(path.join(__dirname,'../src/friends.html'));
});
*/

app.get("/api/friends",

	function (req, res) {
		fs.readFile(

			'./src/api/db.json', 'utf8', (err, data) => {
				let sample = JSON.parse(data).users;
				if (err) throw err;
				//	console.log(data);
				//	console.log(sample);
				//	res.send(sample);
				res.render("friends", { variable: sample });

			}

		)

	});

app.post("/api/friends", function (req, res) {
	// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
	// It will do this by sending out the value "true" have a table


	console.log(req.body);
	const score = 'scores[]';
	console.log(req.body.scores);
	const goal = req.body.scores.reduce((a, b) => a + b, 0);
	var name;
	var photo;
	var sample_final = {};
	//console.log(JSON.parse(req).body);
	//console.log(req.body.'scores[]');


	fs.readFile(
		'./src/api/db.json', 'utf8', (err, data) => {
			let sample = JSON.parse(data).users;
			if (err) throw err;
			//	console.log(data);
			//	console.log(sample);
			//	res.send(sample);
			//console.log(sample);
			var curr_diff = 0;
			var calc_diff = 0;

			for (var i = 0; i < sample.length; i++) {
				//console.log(sample[i].scores)
				// console.log(sample[i].scores.reduce((a, b) => a + b, 0));
				var user_score = sample[i].scores.reduce((a, b) => a + b, 0);

				//  console.log(sample[i].name);
				//console.log(user_score);

				if (i === 0) {

					//console.log( Math.abs(user_score-goal));
					curr_diff = Math.abs(user_score - goal);
					name = sample[i].name;
					photo = sample[i].photo;
					sample_final = sample[i];


					//console.log("intial_State " + curr_diff);

				} else {

					calc_diff = Math.abs(user_score - goal);
					//console.log(i+"calc:state:" + curr_diff);

					if (calc_diff < curr_diff) {
						curr_diff = calc_diff;
						//console.log("Revised_state: "+ curr_diff);
						name = sample[i].name;
						photo = sample[i].photo;
						sample_final = sample[i];
						res.json({ status: 'OK', name: name, photo: photo });

					}

				}

			}
			console.log("hello:" + name + photo);
		}

	)


	//res.json(true);


});


app.listen(port, function (err) {
	if (err) { console.log(err); }
	else {
		open(url + port);
	}
})

