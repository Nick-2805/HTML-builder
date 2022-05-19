const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

fs.writeFile(
	path.join(__dirname, 'text.txt'), '',
	(err) => {
		if(err) throw err;
})

stdout.write("Приветствую! Введите новый текст.\n")

stdin.on('data', chunk => {
		 fs.appendFile(
		path.join(__dirname, 'text.txt'),
		`${chunk}`,
		err => {
			if (err) throw err;
		}
		)
	}
)
  
rl.on('line', (input) => {
	if(input == 'exit') {
		console.log("Всего хорошего!!!"),
		process.exit()
	}
});