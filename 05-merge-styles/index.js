const path = require('path')
const fs = require('fs')

const path_to_dist = path.join(__dirname, 'project-dist')
const path_to_styles = path.join(__dirname, 'styles')
let arr_with_tyles = [];

fs.readdir(path_to_styles, {withFileTypes: true}, (err, files)=> {

	if(err) {
		console.error(err)
		return
	}
	for(let i = 0; i < files.length; i++) {
		const fileType = path.extname(files[i].name).slice(1)
		
		if(fileType == 'css') {
			const path_to_fileCss = path.join(path_to_styles, files[i].name);
			console.log(path_to_fileCss)
			fs.readFile(path_to_fileCss, 'utf8', (err, fileCss)=> {
				arr_with_tyles.push(fileCss)
	
				fs.writeFile(
					path.join(path_to_dist, 'bundle.css'),
					arr_with_tyles.join(''),
					(err) => {
						if (err) throw err;
						console.log('Файл был создан');
					}
				);
			})
		}
	}

})