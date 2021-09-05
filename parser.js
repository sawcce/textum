const { EmbeddedActionsParser } = require("chevrotain")
const {all, Section, Expression, Text} = require("./tokens");

class SelectParserEmbedded extends EmbeddedActionsParser {
  constructor() {
    super(all)

    const $ = this;
    
    $.RULE("document", () => {
        let document = [];

        $.OPTION({DEF: () => $.CONSUME(Text)})

        $.MANY(() => {
            document.push($.SUBRULE($.section));
        });

        return document;
    })

    $.RULE("section", () => {
        let header = $.CONSUME(Section).image;
        let content = $.SUBRULE($.text);

        return {header, content};
    })

    $.RULE("text", () => {
        let content = [];

        $.MANY(() => {
            $.OR([
                {ALT: () => {content.push($.CONSUME(Expression).image)}},
                {ALT: () => {content.push($.CONSUME(Text).image)}},
            ]);
        });

        return content;
    })

    $.performSelfAnalysis();
  }

}

const SelectLexer = require("./lexer");
const parser = new SelectParserEmbedded();

function parseInput(text) {
  const lexingResult = SelectLexer.tokenize(text)
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens
  return parser.document();

  if (parser.errors.length > 0) {
    throw new Error("sad sad panda, Parsing errors detected")
  }
}

module.exports = parseInput;