const fs = require('fs');

// 读取文件
fs.readFile('../XSS/index.html', (err, data) => {
    console.log(err, data);
});

const getDir = async path => {
    console.log('getDir...', path, fs.path);
    return new Promise(resolve => {
        fs.readdir(path, (err, dir) => {
            if (!err) {
                console.log('dir...', dir);
                for (const dirent of dir) {
                    console.log(dirent);
                }
                resolve(dir);
            } else {
                console.error(err);
            }
        });
    });
};

module.exports = {
    getDir
};

