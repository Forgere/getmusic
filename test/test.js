const assert = require('assert');
const fs = require('fs')
const path = require('path')
const getmusic = require('../index')

const your_donwload_path = path.join(__dirname, "./down")

describe('Functions', function () {
    describe('#getmusic', function () {
        this.timeout(5000);
        it('我曾.mp3 should exist file', function (done) {
            getmusic.download('我曾', your_donwload_path).then(() => {
                if (!fs.existsSync(path.join(__dirname, '/down/我曾.mp3'))) {
                    done("我曾.mp3 File Does Not Exist");
                }
                done()
            }).catch(err => done(err))
        });

        it('多想在平庸的生活拥抱你.mp3 should exist file', function (done) {
            getmusic.downloadFilter('多想在平庸的生活拥抱你', your_donwload_path, "隔壁老樊").then(() => {
                if (!fs.existsSync(path.join(__dirname, '/down/多想在平庸的生活拥抱你.mp3'))) {
                    done("多想在平庸的生活拥抱你.mp3 File Does Not Exist");
                }
                done()
            }).catch((err) => done(err))
        });

        it('should return string', function (done) {
            getmusic.downloadLyric('稻香', '周杰伦').then((lyric) => {
                //do something
                done()
            }).catch(err => console.log(err))
        });
    });
});