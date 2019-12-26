# getmusic

just a node package for downloading music

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