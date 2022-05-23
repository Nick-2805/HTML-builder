const fs = require('fs')
const path = require('path');
const fsPromises = require('fs/promises');


const oldDir = __dirname + '\\files';
const newDir = __dirname + '\\files-copy';


async function copyDir(oldDir, newDir) {
  await fsPromises.rm(newDir, { force: true, recursive: true });
  await fsPromises.mkdir(newDir, { recursive: true });

  const Arr_name_files = await fsPromises.readdir(oldDir, { withFileTypes: true });

  for (let file of Arr_name_files) {
    const path_to_oldFile = path.join(oldDir, file.name);
    const path_to_newFile = path.join(newDir, file.name);

    if (file.isDirectory()) {
      await fsPromises.mkdir(path_to_newFile, { recursive: true });
      await copyDir(path_to_oldFile, path_to_newFile);

    } else if (file.isFile()) {
      await fsPromises.copyFile(path_to_oldFile, path_to_newFile);
    }
  }
}
copyDir(oldDir, newDir);