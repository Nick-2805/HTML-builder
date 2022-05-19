const fs = require('fs');
const path = require('path');
const pathToFiles = path.join(__dirname, 'secret-folder')

fs.readdir(pathToFiles, {withFileTypes: true}, (err, files) => {
   if(err) throw err; 
   
	for(let i = 0; i < files.length; i++) {
		 if(files[i].isFile()) {
			 const fileName = files[i].name.split('.')[0] 
			 const fileType = path.extname(files[i].name).slice(1)
			 const pathToFile = pathToFiles + '\\' + files[i].name;

			fs.stat(pathToFile, function(err, stats) {
				const sizeFile = stats["size"]
				 console.log(`${fileName} - ${fileType} - ${sizeFile}b`);
			})
		}
	}
});
