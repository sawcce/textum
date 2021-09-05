const fs = require('fs');
const docx = require('docx');
const { Document, Paragraph, TextRun, Packer, UnderlineType } = docx;

let config = {
	default: {
		font: 'Calibri',
		color: '#000000',
		size: 24,
	},

	sections: {
		title: {
			size: 56,
		},
		header: {
			size: 40,
			bold: true,
			underline: {
				type: UnderlineType.SINGLE,
				color: '#000000',
			},
		},
		definition: {
			color: '#c9140e',
			size: 28,
			underline: {
				type: UnderlineType.SINGLE,
				color: '#c9140e',
			},
		},
		notice: {
			color: '#ffe600',
		},
		paragraph: {},
		footer: {
            italics: true,
            size: 20,
        },
	},
};

function expression(expression) {
	console.log(expression);
	switch (expression) {
		case 'date':
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			today = mm + '/' + dd + '/' + yyyy;
			return today;
	}
}

function mapContent(content) {
	let final = '';

	content.map((el) => {
		if (el[0] == '$') {
			final += expression(el.slice(1));
			return;
		}

		final += el;
	});

	return final.trim();
}

function generate(document, _title = 'doc') {
	let title = _title;
	let children = [];

	document.map((section) => {
		let header = section.header.slice(1, -1);
		let content = mapContent(section.content);

		switch (header) {
			case 'footer':
				children.push(new Paragraph({}));
				break;
		}

		children.push(
			new Paragraph({
				children: [
					new TextRun({
						text: content,
						...config.default,
						...config.sections[header],
					}),
				],
			})
		);

		switch (header) {
			case 'title':
				title = content.replace(/\//g, ',');
				children.push(new Paragraph({}));
				break;
		}
	});

	const doc = new Document({
		sections: [
			{
				properties: {},
				children,
			},
		],
	});

	// Used to export the file into a .docx file
	Packer.toBuffer(doc).then((buffer) => {
		fs.writeFileSync(`${title}.docx`, buffer);
	});
}

module.exports = generate;
