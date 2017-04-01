const express = require("express");
const app = express();

const cfg = require("./knexfile");
const env = process.env.NODE_ENV || "development";
const knex = require("knex")(cfg[env]);

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// var salvar = function() {
// 	knex("pessoa").insert({
// 		"pessoanome": document.getElementById('pnid').value,
// 		"pessoaendereco": document.getElementById('peid').value,
// 		"pessoatelefone": document.getElementById('ptid').value
// 	});
// 	console.log(knex("pessoa").select().where('pessoanome': document.getElementById('pnid')));
// };

app.use(express.static("public"));

app.post("/salvar", (req,res) => {
	let pessoa = req.body;
	knex("pessoa").insert(pessoa, "idpessoa").then((ret) => {
		pessoa.idpessoa = ret[0];
		res.send(pessoa);
	});
	console.log(pessoa);
});

app.listen("2017");