require('dotenv').config();
const { version } = require("./package.json");
const express = require("express");
const messages = require("./messages");
const API_prefix = "/api/v2";
var app = express();

// parse JSON bodies
app.use(express.json());

//GET (ALL || Timestamped) 
app.get(`${API_prefix}/messages`, async function(req, res) {
	const since = req.query.since;
	let data;
	if (!since) {
		data = await messages.getMessages();
	} else {
		data = await messages.getMessagesByTime(since);
	}
	res.json(data);
});

//POST
app.post(`${API_prefix}/messages`, async function(req, res) {
	const author = req.body.author;
	const content = req.body.content;
	const id = await messages.addMessage(author, content);
	res.json({"message": "Success", "id": id });
})

app.get("/version", function(req, res) {
  res.json({ version });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Error. Better luck next time :((" });
});

const port = process.env.PORT || 4000
app.listen(port, () => {
 console.log("Server Started!");
});
