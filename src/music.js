const crawl = require('./crawl')
const getmusic =  {

    search: function(target){
        return new Promise((resolve, reject) => {
            if (target.sth) {
                crawl.search(target.sth)
                    .then(data=> {
                        resolve({
                            mes: 'success',
                            code: 200,
                            data
                        })
                    })
                    .catch(err=>{
                        reject({
                            err: err,
                            code: 403
                        })
                    })
            } else {
                resolve({
                    mes: 'error',
                    data: '',
                    code: 401
                })
            }
            
        })
    },

    download: function(source, save){
        return crawl.down(source, save)
    },

    downloadFilter: function(source, save, filter){
        return crawl.down(source, save, filter)
    },

    add: function(){
        console.log('add')
    },

    show: function(){
        console.log('show')
    }
}

module.exports = getmusic