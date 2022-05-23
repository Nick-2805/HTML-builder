const path = require('path')
const fs = require('fs')

const path_to_dist = path.join(__dirname, 'project-dist')
const path_to_styles = path.join(__dirname, 'styles')
// const path_to_dist = path.join(__dirname, 'test-files')
// const path_to_styles_from_testFiles = path.join(__dirname, 'test-files', 'styles')
let arr_with_styles = [];

fs.readdir(path_to_styles, {withFileTypes: true}, (err, files)=> {

	if(err) {
		console.error(err)
		return
	}
	for(let i = 0; i < files.length; i++) {
		const fileType = path.extname(files[i].name).slice(1)
		
		if(fileType == 'css') {
			const path_to_fileCss = path.join(path_to_styles, files[i].name);
			// console.log(path_to_fileCss)
			fs.readFile(path_to_fileCss, 'utf8', (err, fileCss)=> {
				arr_with_styles.push(fileCss)
	
				fs.writeFile(
					path.join(path_to_dist, 'bundle.css'),
					arr_with_styles.join(''),
					(err) => {
						if (err) throw err;
						// console.log('Файл был создан');
					}
				);
			})
		}
	}

})