const pool = require('./db');

//GET (ALL)
async function getMessages() {
	const result = await pool.query(
		"SELECT * FROM messages_log ORDER BY created_at ASC"
	);
	return result.rows;
}
//GET
async function getMessagesByTime(since) {
	const result = await pool.query(
	"SELECT * FROM messages_log WHERE created_at > $1 ORDER BY created_at ASC",
		[since],
	);
	return result.rows;
}

//POST
async function addMessage(author, content) {
	const result = await pool.query(
		"INSERT INTO messages_log (author, content) VALUES ($1, $2) RETURNING id",
		[author, content]
	);
	return result.rows[0].id; 
}

module.exports = {
	getMessages,
	getMessagesByTime,
	addMessage
};
