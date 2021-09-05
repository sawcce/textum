const { Lexer } = require('chevrotain');
const tokens = require('./tokens');

module.exports = new Lexer(tokens.all, {
	positionTracking: 'onlyOffset',
});
