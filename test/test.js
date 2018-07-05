var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');




/*Start create random value*/
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

var randomValueName = randomString(5);
var randomValueMail = randomString(7);
/*End create random value*/


/*Test data - clinic and consumer*/
var clinic = {
    name: randomValueName,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

var consumerObj = {
    email: randomValueMail + '@mail.com',
    name: randomValueName,
    phone: 'phone patch all',
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: '2020-03-03',
    entityEnd: '2021-04-04'
}
/*End test data - clinic and consumer*/

var ConsumerID = "";
var ClinicID = "";











describe('Get  ID for test', function () {

    it('Create new consumer/Successfull case + get ID', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": consumerObj.email,
                    "name": "name_auto",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .end(function (err, res) {
                    console.log(res.body);
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    //expect(res.body).to.equal({});
                    //expect(res.body.res.name).to.equal("namex");
                    ConsumerID = res.body.res.id;
                    done();
                })
            addContext(this, 'we do it');
        });


    it('Create new clinic/Successfull case + get ID', function (done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send({

                        name : clinic.name + 'several',
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed

            })
            .end(function (err, res) {
                console.log(res.body);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                //expect(res.body).to.equal({});
                //expect(res.body.res.name).to.equal("namex");
                ClinicID = res.body.res.id;
                done();
            })
    });


})




describe('Create consumer', function () {


    describe('HTTP responce code - 200 ', function () {


        it('Create new Consumer/Successfull case/Several words for "name"', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "new" + consumerObj.email,
                    "name": consumerObj.name +" " + "sever words",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/Successfull case/cyrillic name parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "qaz" + consumerObj.email,
                    "name":  "кирилиця",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/Successfull case/name parameter with numbers', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "n" + consumerObj.email,
                    "name": "4546456",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/Successfull case/name parameter with symbols', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "s" + consumerObj.email,
                    "name": "!&^%$$#",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/ "receiveNotification" false', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "fa" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "phone ",
                    "receiveNotification": false,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/ missed Start date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "fvfbgb" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "phone ",
                    "receiveNotification": false,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });



        it('Create new Consumer/ missed End date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "vgbi" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "phone ",
                    "receiveNotification": false,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                })
                .expect(200, done)
        });

        it('Create new Consumer/ "dontSentAdv" false', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "dd" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "phone ",
                    "receiveNotification": false,
                    "dontSentAdv": false,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/ "signedUp" false', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "sds" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "phone ",
                    "receiveNotification": false,
                    "dontSentAdv": false,
                    "signedUp": false,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/ spaces for name parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "sdsgh" + consumerObj.email,
                    "name": "    ",
                    "phone": "phone ",
                    "receiveNotification": false,
                    "dontSentAdv": false,
                    "signedUp": false,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/ empty for name parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "sdfsdf345" + consumerObj.email,
                    "name": "",
                    "phone": "phone",
                    "receiveNotification": false,
                    "dontSentAdv": false,
                    "signedUp": false,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


        it('Create new Consumer/ empty phone parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "sszz" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "",
                    "receiveNotification": false,
                    "dontSentAdv": false,
                    "signedUp": false,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });

        it('Create new Consumer/ missed "signedUp" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "xxsse" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "456456",
                    "receiveNotification": false,
                    "dontSentAdv": false,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });

        it('Create new Consumer/ missed "dontSentAdv" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "ertert" + consumerObj.email,
                    "name": "name" +consumerObj.name,
                    "phone": "456456456",
                    "receiveNotification": false,
                    "signedUp": false,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(200, done)
        });


    })

    describe('HTTP responce code - 400 ', function () {

        it('Create new Consumer with the same email parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ incorrect format for EMAIL parameter/ spaces ', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "dsdfsdfsdf ",
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ empty for EMAIL parameter/ spaces ', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": " ",
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2020-03-03",
                    "entityEnd": "2021-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ empty start date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "fp" + consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": " ",
                    "entityEnd": "2021-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ empty end date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "cvb" + consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "  "
                })
                .expect(400, done)
        });


        it('Create new Consumer/ missed email parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ missed name parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"naa" + consumerObj.email,
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ missed phone parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"phn" + consumerObj.email,
                    "name": "name ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ NULL for email param', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": null,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ NULL for name param', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"nnnamm" + consumerObj.email,
                    "name": null,
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ NULL for Phone param', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"dvc" + consumerObj.email,
                    "name": "name ",
                    "phone": null,
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ NULL "receiveNotification" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"ccc" + consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": null,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ NULL "dontSentAdv" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"xcbbb" + consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": null,
                    "signedUp": true,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ NULL "signedUp" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"dcvbc" + consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": null,
                    "entityStart": "2021-04-04",
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ NULL Start date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"rffg" + consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": null,
                    "entityEnd": "2022-04-04"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ NULL End date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":"xcb" + consumerObj.email,
                    "name": "name ",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2022-04-04",
                    "entityEnd": null
                })
                .expect(400, done)
        });


        it('Create new Consumer/ boolean for email parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email":true,
                    "name": "name mm",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2022-04-04",
                    "entityEnd": "2023-03-03"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ boolean for name parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "cvb" + consumerObj.email,
                    "name": true,
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2022-04-04",
                    "entityEnd": "2023-03-03"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ boolean for Start date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "dddd" + consumerObj.email,
                    "name": "dcdvv",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": true,
                    "entityEnd": "2023-03-03"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ boolean for phone parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "vvvv4" + consumerObj.email,
                    "name": "dcdvv",
                    "phone": true,
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2021-03-03",
                    "entityEnd": "2023-03-03"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ boolean for end date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "vcvcv" + consumerObj.email,
                    "name": "dcdvv",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2018-03-03",
                    "entityEnd": true
                })
                .expect(400, done)
        });

        it('Create new Consumer/ number for email parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": 0,
                    "name": "dcdvv",
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2018-03-03",
                    "entityEnd":  "2019-05-05"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ number for name parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "mkla" + consumerObj.email,
                    "name": 0,
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2018-03-03",
                    "entityEnd": "2019-05-05"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ number for phone parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "mklxvvvs" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": 0,
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2018-03-03",
                    "entityEnd": "2019-05-05"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ number for "receiveNotification" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "mkl" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": 0,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2018-03-03",
                    "entityEnd": "2019-05-05"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ number for "dontSentAdv" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "mklxx" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": 0,
                    "signedUp": true,
                    "entityStart": "2018-03-03",
                    "entityEnd": "2019-05-05"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ number for "signedUp" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "cvvv" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": 0,
                    "entityStart": "2018-03-03",
                    "entityEnd": "2019-05-05"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ number for Start date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "vfvfd" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": 0,
                    "entityEnd": "2019-05-05"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ number for End date parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "vvwwq" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2019-05-05",
                    "entityEnd": 0
                })
                .expect(400, done)
        });

        it('Create new Consumer/ string for "receiveNotification" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "xdoo" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": "dfgdfgdfgd",
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2019-05-05",
                    "entityEnd": "2019-04-03"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ string for "dontSentAdv" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "dfdfb" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": "dfgdfgdfgd",
                    "signedUp": true,
                    "entityStart": "2019-05-05",
                    "entityEnd": "2019-04-03"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ string for "dontSentAdv" parameter', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "iop" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": "dfgdfgdfgd",
                    "signedUp": true,
                    "entityStart": "2019-05-05",
                    "entityEnd": "2019-04-03"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ string for "signedUp" parameter ', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "vbnn" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": "dfgdfgdfgd",
                    "entityStart": "2019-05-05",
                    "entityEnd": "2019-04-03"
                })
                .expect(400, done)
        });


        it('Create new Consumer/ string for "signedUp" parameter ', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "vbnnsdf" + ".com",
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2019-05-05",
                    "entityEnd": "2019-04-03"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ incorrect format for Start date param ', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "rbp" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2019-05-0",
                    "entityEnd": "2019-04-03"
                })
                .expect(400, done)
        });

        it('Create new Consumer/ incorrect format for End date param ', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .send({
                    "email": "cc" + consumerObj.email,
                    "name": " fvcvc",
                    "phone": "2151515",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2019-05-01",
                    "entityEnd": "2019-04-0"
                })
                .expect(400, done)
        });

    })


})


describe('Patch Consumer object',  function ()  {

    describe('HTTP responce code - 200 ', function () {

        it('Patch Consumer object / change name param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "change name patch",
                        "phone": "phone patch",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change phone param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change "receiveNotification" param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change "dontSentAdv" param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change "signedUp" param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change Start date param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "entityStart": "2017-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change End date param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "entityStart": "2017-01-01",
                        "entityEnd": "2019-02-02"
                    })
                .expect(200,done)
        });


        it('Patch Consumer object / change all parameters', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch all",
                        "phone": "phone patch all",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                .expect(200,done)
        });
    })


    describe('HTTP responce code - 400 ', function () {

        it('Patch Consumer object / Invalid clinic ID', function(done) {
            api.patch('/consumers/IdConsumer' )
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch all",
                        "phone": "phone patch all",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                .expect(400,done)
        });
    })

})



describe('Delete Consumer object',  function ()  {

    describe('HTTP responce code - 200 ', function () {
        it('Delete Consumer ID/ Successfull case', function (done) {
            api.del('/consumers/' + ConsumerID)
                .set('Accept', 'application/json')
                .expect(200,done)
        });
    })

    describe('HTTP responce code - 400 ', function () {

        it('Delete Consumer / Invalid Consumer ID', function (done) {
            api.del('/consumers/consumersdfsd345')
                .set('Accept', 'application/json')
                .expect(400,done)
        });
    })

    describe('HTTP responce code - 404 ', function () {

        it('Delete Consumer/not found', function (done) {
            api.del('/consumers/' + ConsumerID)
                .set('Accept', 'application/json')
                .expect(404,done)
        });
    })

})

describe('Patch Consumer object ', function () {


    describe('HTTP responce code - 404 ', function () {

        it('Patch Consumer object / Not found', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch all",
                        "phone": "phone patch all",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                .expect(404,done)
        });

    })

})



describe('Create clinic', function () {


    describe('HTTP responce code - 200 ', function () {

        it('Create new clinic/Successfull case', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(clinic)
                .expect(200,done)

        });


        it('Create new clinic/cyrillic name parameter', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : 'кирилиця' + clinic.name,
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(200,done)
        });

        it('Create new clinic/name parameter with numbers', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 123658,
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(200,done)
        });

        it('Create new clinic/name parameter with symbols', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + '!%$_^',
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(200,done)
        });

        it('Create new clinic/confirmed "false', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: false
                    })
                .expect(200,done)
        });

    })



    describe('HTTP responce code - 400', function () {

        it('Create new clinic/with the same title', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(clinic)
                .expect(400,done)
        });

        it('Create new clinic/with empty title', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : '',
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(400,done)
        });

        it('Create new clinic/with missed name parameter', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(400,done)
        });

        it('Create new clinic/incorrect format for latitude', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(400,done)
        });

        it('Create new clinic/with missed longitude', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : clinic.latitude,
                        confirmed: clinic.confirmed
                    })
                .expect(400,done)
        });

        it('Create new clinic/incorrect format for title/number instead of string', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : 0,
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(400,done)
        });

        it('Create new clinic/incorrect format for name parameter/null', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : null,
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed
                    })
                .expect(400,done)
        });



        it('Create new clinic/confirmed - validation for parameter type number', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: 0
                    })
                .expect(400,done)
        });


        it('Create new clinic/confirmed - validation for parameter type text', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: 'text'
                    })
                .expect(400,done)
        });

        it('Create new clinic/latitude - null instead of num', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : null,
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400,done)
        });

        it('Create new clinic/longitude - null instead of num', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : 0,
                        longitude: null,
                        confirmed: true
                    })
                .expect(400,done)
        });

        it('Create new clinic/"confirmed" - null instead of boolean', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : 0,
                        longitude: 0,
                        confirmed: null
                    })
                .expect(400,done)
        });

        it('Create new clinic/incorrect format for latitude', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : '',
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400,done)
        });

        it('Create new clinic/incorrect format for longitude', function(done) {
            api.post('/clinics')
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : clinic.name + 'word',
                        latitude : 0,
                        longitude: '',
                        confirmed: true
                    })
                .expect(400,done)
        });
    })
})

describe('GET list - ', function () {

    describe('HTTP responce code - 200 ', function () {

        it('Should return 200 responce - /clinics', function (done) {
            api.get('/clinics')
                .set('Accept', 'aplication/json')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                });

        });
        it('Should return 200 responce - /consumers', function (done) {
            api.get('/consumers')
                .set('Accept', 'aplication/json')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('Should return 200 responce - /providers', function (done) {
            api.get('/providers')
                .set('Accept', 'aplication/json')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

    })

    describe('HTTP responce code - 400 ', function () {


    })

})

describe('GET Clinic object - ', function () {

    describe('HTTP responce code - 200 ', function () {

        it('GET clinic object/successful case', function(done) {
            api.get('/clinics/' + ClinicID)
                .set('Accept', 'application/json')
                .expect(200,done)
                // .end(function(err, res) {
                //     expect(res.body.name).to.equal("new clinic");
                //     done();
                // });
        });

    })

    describe('HTTP responce code - 400 ', function () {

        it('GET clinic object/Invalid clinic ID', function(done) {
            api.get('/clinics/' + ClinicID + ClinicID)
                .set('Accept', 'application/json')
                .expect(400,done)
        });

    })

    describe('HTTP responce code - 404 ', function () {

        it('Delete clinic/not found', function (done) {
            api.get('/clinics/' + ClinicID )
                .set('Accept', 'application/json')
                .expect(404,done)
        });

    })

})

describe('Delete clinic ', function () {

    describe('HTTP responce code - 200 ', function () {


    })
    describe('HTTP responce code - 400 ', function () {

        it('Delete clinic/not found', function (done) {
            api.del('/clinics/clinicId')
                .set('Accept', 'application/json')
                .expect(400,done)
        });

    })
    describe('HTTP responce code - 404 ', function () {

        it('Delete clinic/not found', function (done) {
            api.del('/clinics/5b30f037de19bd000f1241ea')
                .set('Accept', 'application/json')
                .expect(404,done)
        });

    })

})


describe('GET Consumer object - ', function () {

    describe('HTTP responce code - 200 ', function () {

        it('GET consumer object/successful case', function(done) {
            api.get('/consumers/' + IdConsumer)
                .set('Accept', 'application/json')
                .expect(200,done)

    })

    describe('HTTP responce code - 400 ', function () {

        it('GET consumer object/Invalid clinic ID', function(done) {
            api.get('/consumers/5b3a354e9c62b00010dd63bf-f')
                .set('Accept', 'application/json')
                .expect(400,done)
        });

    })

    describe('HTTP responce code - 404 ', function () {

        it('Get consumer/not found', function (done) {
            api.get('/consumers/5b30f037de19bd000f1241ea')
                .set('Accept', 'application/json')
                .expect(404,done)
        });

    })

})
    })

describe('Patch clinic object', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Patch clinic object/change name', function(done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : 'patch'
                    })
                .expect(200,done)
            });



            it('Patch clinic object/name - empty', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            name : ' '
                        })
                    .expect(200,done)

            });

            it('Patch clinic object/change latitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            latitude : 1
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/change longitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            longitude: 1
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/change longitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            confirmed: false
                        })
                    .expect(200,done)
            });


            it('Patch clinic object/name - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            latitude: 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/latitude - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            name: 'patch',
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/longitude - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });
        })

    describe('HTTP responce code - 400 ', function () {

        it('Patch clinic object/name - validation for param type: boolean', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: true,
                        latitude: 0,
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/latitude - validation for param type: boolean', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: true,
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/longitude - validation for param type: boolean', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: 0,
                        longitude: true,
                        confirmed: true
                    })
                .expect(400, done)
        });


        it('Patch clinic object/"confirmed" - validation for parameter type - "string"', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: 0,
                        longitude: 0,
                        confirmed: 'patch'
                    })
                .expect(400, done)
        });

        it('Patch clinic object/"confirmed" - validation for parameter type - null', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: 0,
                        longitude: 0,
                        confirmed: null
                    })
                .expect(400, done)
        });

        it('Patch clinic object/longitude - validation for parameter type - null', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: 0,
                        longitude: null,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/latitude - validation for parameter type - null', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: true,
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/name - validation for parameter type - null', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: null,
                        latitude: 0,
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/"confirmed" - validation for parameter type', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: 0,
                        longitude: 0,
                        confirmed: 0
                    })
                .expect(400, done)
        });

        it('Patch clinic object/longitude - validation for parameter type', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: 0,
                        longitude: 'qwerty',
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/latitude - validation for parameter type', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 'patch',
                        latitude: 'qwerty',
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/Name - validation for parameter type', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name: 0,
                        latitude: 0,
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/Invalid clinic ID', function (done) {
            api.patch('/clinics/' + ClinicID + ClinicID)
                .set('Accept', 'aplication/json')
                .expect(400, done)
        });


    })

    describe('HTTP responce code - 404 ', function () {

        it('Patch clinic object/Not found', function (done) {
            api.patch('/clinics/5b30f32ede19bd000f1241ee')
                .set('Accept', 'aplication/json')
                .expect(404, done)
        });

    })


})
