import alfy from 'alfy';
import fs from 'fs';
let path = process.env.MyPKMPath + "/pages"

//loop through items in the file path
fs.readdir(path, (err, files) => {
    if (err) throw err;

    let items = files.map(file => {
        return {
            title: file,
            subtitle: 'hello',
            arg: file,
            icon: {
                path: path + '/' + file
            }
        }
    });

     items = alfy
	.inputMatches(files)
	.map(element => ({
		title: element,
		subtitle: element,
		arg: element, 
	}));
    alfy.output(items);
})

