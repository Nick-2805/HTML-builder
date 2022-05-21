const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
// New links
const path_to_projectDst = path.join(__dirname, 'project-dist')
const path_to_newStyleCss = path.join(path_to_projectDst, 'style.css')
const path_to_newIndexHtml = path.join(path_to_projectDst, 'index.html')
const path_to_newAssets = path.join(path_to_projectDst, 'assets')

//Old links
const path_to_styles = path.join(__dirname, 'styles')
const path_to_oldHTML = path.join(__dirname, 'template.html')
const path_to_componentsHTML = path.join(__dirname, 'components')
const path_to_oldAssets = path.join(__dirname, 'assets')

// Проверка на папку "project-dist"
fs.access(path_to_projectDst, err =>{
	if(err) {
		// console.log('Папки нет')
		fs.mkdir(path_to_projectDst, err => {
			if(err) throw err
			// console.log('Папки создана')
		})
	}else (
		console.log("Папка уже имеется")
	)
})

fs.readdir(path_to_projectDst, {withFileTypes: true}, (err, files)=> {
	if(err) {
		console.log('Папка пуста')
	} else {

		// Очищаем папку "project-dist"
			for(let item of files){
				if(!item.isFile()) {
					fs.rmdir(path_to_projectDst + `\\${item.name}`, () => { 
					})
				}
				if(item.isFile()) {
					fs.unlink(path_to_projectDst +`\\${item.name}`, err=>{
						if(err) {
							// console.log("Файла нет")
							console.error('str 52: ', err)
						}
						// console.log(`Старый файл ${item.name} успешно удален`);
					})
				}
		}
	}
	//Создал файлы 'style.css' 
	fs.writeFile(path_to_newStyleCss, '', err =>{if(err) throw err; })
})

function copy_file_css() {
	fs.readdir(path_to_styles, {withFileTypes:true}, (err, style_files) => {
		if(err) throw console.error('str 67: ', err);
		for(style of style_files) {
			const path_to_style = path.join(path_to_styles, style.name)
			const fileType = path.extname(path_to_style)
			if(fileType === '.css'){
				fs.readFile(path_to_style, 'utf-8', (err, contentCss)=> {
					if(err) throw err
					fs.appendFile(path_to_newStyleCss, `${contentCss}`, err=>{
						if(err) throw err;
						// console.log('Файл дополнен')
					})
				})

			}
		}
	})
}
copy_file_css()	// CSS ГОТОВ	

async function create_new_HTML() {
	//Читаем 'template.html'
  let oldContent = await fsPromises.readFile(path_to_oldHTML, 'utf-8');
  //Читаем 'components'
  const componentsHTMLArr = await fsPromises.readdir(path_to_componentsHTML, { withFileTypes: true });

  for (let item of componentsHTMLArr) {
	  //Читаем каждый 'components'
	  const componentContent = await fsPromises.readFile(path.join(path_to_componentsHTML, `${item.name}`), 'utf-8');
	  //Создаем ключевое слово для замены
	  const regExp = new RegExp(`{{${(item.name).split('.')[0]}}}`, 'g');

	  oldContent = oldContent.replace(regExp, componentContent);
	  //Создаем новый HTML-файл
	  fs.writeFile(path_to_newIndexHtml, oldContent,  err =>{if(err) throw err; })
	}
}
create_new_HTML()

async function newDirAssets(oldDir, newDir) {
  await fsPromises.rm(newDir, { force: true, recursive: true });
  await fsPromises.mkdir(newDir, { recursive: true });

  const Arr_name_files = await fsPromises.readdir(oldDir, { withFileTypes: true });

  for (let file of Arr_name_files) {
    const path_to_oldFile = path.join(oldDir, file.name);
    const path_to_newFile = path.join(newDir, file.name);

    if (file.isDirectory()) {
      await fsPromises.mkdir(path_to_newFile, { recursive: true });
      await newDirAssets(path_to_oldFile, path_to_newFile);

    } else if (file.isFile()) {
      await fsPromises.copyFile(path_to_oldFile, path_to_newFile);
    }
  }
}
newDirAssets(path_to_oldAssets, path_to_newAssets);