const getmusic = require('getmusic')

const your_donwload_path = "/Users/forgere/Downloads"

getmusic.download('我曾', your_donwload_path).then(()=>{
    //do something
})

getmusic.downloadFilter('我曾', your_donwload_path, "隔壁老樊").then(() => {
    //do something
}).catch(err => console.log(err))

getmusic.downloadLyric('稻香', '周杰伦').then((lyric) => {
    //do something
    console.log(lyric)
}).catch(err => console.log(err))