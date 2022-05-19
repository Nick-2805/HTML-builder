const fs = require('fs')
const path = require('path');

const file = 'files-copy';
const oldDir = __dirname + '\\files';
const newDir = __dirname + '\\files-copy';
// проверка существования файла
	fs.access(file, (err) => {
		if(err){
			fs.mkdir(__dirname + '/files-copy', () => { 
				console.log('Папка успешно создана')
			})
		}
		// console.log(`${file}: 'существует'}`);
	});

			//очистка новой дирректории
	fs.readdir(newDir, {withFileTypes: true}, (err, files) => {
				if (err) {
					// console.error('Папка пуста')
					return
				}
		for(let i = 0; i < files.length; i++) {
			// console.log('newDir', files[i])
						//Удаление файла
			fs.unlink(newDir + '\\' + files[i].name, (err) => {
				if (err) throw err;
				// console.log(files[i].name, 'Файл успешно удален');
			});
		}
	})

function copyDir() {
		//Чтение файла
		fs.readdir(oldDir, {withFileTypes: true}, (err, files) => {
		if (err) {
			console.error(err)
			return
		}
		for(let i = 0; i < files.length; i++) {
			const nameFile = files[i].name
			const typeFile = path.extname(files[i].name).slice(1)

			if(files[i].isFile()) {
				
		//   console.log(nameFile, 'and', typeFile)
				fs.copyFile(`${oldDir}/${nameFile}`, `${newDir}/${nameFile}`, err => {
					if(err) throw err; // не удалось скопировать файл
					// console.log('Файл успешно скопирован');
				});
			}
		}

	})
}
copyDir()