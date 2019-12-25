var request = require("request");
var fs = require('fs')
 
var headers =
{ 'Postman-Token': 'bc7795f1-f5b3-4b91-b96b-6256076a8d53',
  'cache-control': 'no-cache',
  Cookie: 'Hm_lvt_4832a4717bd0c39cf6d1c1645fe420cb=1577084088; Hm_lpvt_4832a4717bd0c39cf6d1c1645fe420cb=1577086501',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  'Accept-Encoding': 'deflate',
  Referer: 'http://www.gequdaquan.net/gqss/douyin.html',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest',
  Origin: 'http://www.gequdaquan.net',
  Accept: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
  Connection: 'keep-alive' };

function parseJson(str){
    return JSON.parse(str)
}

const crawl = {
    down: function (target,save) {
        this.target = target
        return new Promise((resolve, reject) => {
            var options = { method: 'POST',
            url: 'http://www.gequdaquan.net/gqss/api.php',
            headers,
            body: 'types=search&count=10&source=netease&pages=1&name='+target };
            request(options, async function (error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    var result = parseJson(body)
                    //模拟下载第一个
                    await crawl.downAll(result[0], save)
                    resolve(result)
                }                
            });
            
        })
    },

    downAll: function(source, save){
        this.originSource = source
        return new Promise( async (resolve) => {
            const mp3 = await crawl.getMP3Url(source.url_id, source.source)
            await crawl.downMp3(mp3, source.name, save)
            // await crawl.downImg(source.pic_id)
            var result = {
                mes: 'success',
                code: 200,
            }
            resolve(result)
        })
    },

    getMP3Url: function(id, source){
        return new Promise((resolve, reject)=> {
            var options = { method: 'POST',
            url: 'http://www.gequdaquan.net/gqss/api.php',
            headers,
            body: `types=url&id=${id}&source=${source}` };
          
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var result = parseJson(body)
            resolve(result.url)
          })
        })
    },

    downMp3: function(url, name, dest = "/Users/ali/Downloads" ){
        console.log('下MP3')
        return new Promise( (resolve, reject) => {
            const location = dest+'/' + name +'.mp3'
            request({url}).pipe(fs.createWriteStream(location))
                .on('error', (error) => {
                    reject(error.message);
                })
                .on('close', async ()=>{
                    resolve('finish download mp3')
                })
        })
    },

    downImg: function(id){
        console.log('下图片')
        
        return new Promise((resolve, reject) => {
            var options = { method: 'GET',
                url: 'http://p2.music.126.net/A4uSU0kJZT0xpw-S0fGg2Q==/'+id+'.jpg',
                qs: { param: '300y300' },
                headers};
            
            request(options)
                .pipe(fs.createWriteStream(__dirname + '/a.jpg',{encoding: 'base64'}))
                .on('error', (error) => {
                    reject(error.message);
                })
                .on('close', async ()=>{
                    resolve('finish download img')
                }) 
        })
    },

    downLRC: function({id, source}){
        return new Promise((resolve, reject) => {
            if (id && source) {
                var options = {
                    method: 'POST',
                    url: 'http://www.gequdaquan.net/gqss/api.php',
                    headers,
                    body: `types=lyric&id=${id}&source=${source}`
                }
    
                request(options, (error, response, body) => {
                    if (error) {
                        reject(error)
                    } else {
                        if (body.trim()) {
                            resolve(JSON.parse(body).lyric)
                        } else {
                            reject("没有歌词")
                        }
                        
                    }
                    
                })
            } else {
                reject('error')
            }

        })
    }
}

module.exports = crawl