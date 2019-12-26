const getmusic = require('./src/music')

const your_donwload_path = "/Users/ali/Downloads"

getmusic.downloadFilter('我曾', your_donwload_path, "隔壁老樊").then(() => {
    //do something
}).catch(err => console.log(err))

module.exports = getmusic;