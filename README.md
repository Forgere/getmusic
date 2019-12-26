# getmusic

just a node package for downloading music and lyric

1. ```npm install getmusic```

2.  
    ```
    const getmusic = require('getmusic')

    getmusic.download('我曾', your_donwload_path).then(()=>{
        //do something
    })
    ```

3. get music filter by singer

    ```
    getmusic.downloadFilter('我曾', your_donwload_path, "隔壁老樊").then(() => {
        //do something
    }).catch(err => console.log(err))
    ```

4. get lyric
    ```
    getmusic.downloadLyric('稻香', '周杰伦').then((lyric) => {
        //do something
        console.log(lyric)
    }).catch(err => console.log(err))
    ```