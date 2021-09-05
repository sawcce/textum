const chevrotain = require('chevrotain');

const createToken = chevrotain.createToken;

const Section = createToken({ name: 'Section', pattern: /\{[a-zA-Z]+\}/ });
const Expression = createToken({
	name: 'Expression',
	pattern: /\$[a-zA-Z]+/,
});
const Nothing = createToken({
	name: 'Nothing',
	pattern: /[\n\ ]+/,
});
const Text = createToken({
	name: 'Text',
	pattern: /[^${]+/,
});

module.exports = {
	all: [Section, Expression, Text],
	Section,
	Expression,
	Nothing,
	Text,
};
