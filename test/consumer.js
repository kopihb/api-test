var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest =global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;


var consumerObj = global.consumerObj;

var ConsumerID = global.ConsumerID;




describe('Version - 1.0.0 ' +
    'Consumers ' +
    ' Auto create and get  ID for test ', function () {

    it('Create new consumer/Successfull case + get ID', function (done) {
        api.post('/consumers')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "email": consumerObj.email,
                "firstName": "name_auto",
                "lastName": "name_auto",
                "phone": "phone ",
                "receiveNotification": true,
                "dontSentAdv": true,
                "signedUp": true,
                "receiveNewsLetters": true,
                "entityStart": "2020-03-03",
                "entityEnd": "2021-04-04"
            })
            .end(function (err, res) {
                 
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                ConsumerID = res.body.res.id;
                done();
            })
        addContext(this, 'we do it');
    });

})






describe('CONSUMER', function () {


    describe('GET list - ', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Should return 200 responce - /consumers', function (done) {
                api.get('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });



        })


    })

    describe('Create consumer', function () {


        describe('HTTP responce code - 200 ', function () {


            it('Create new Consumer/Successfull case/Several words for "name"', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "new" + consumerObj.email,
                        "firstName": consumerObj.firstName +" " + "sever words",
                        "lastName": consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/Successfull case/cyrillic name parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "qaz" + consumerObj.email,
                        "firstName":  "кирилиця",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/Successfull case/name parameter with numbers', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "n" + consumerObj.email,
                        "firstName": "4546456",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/Successfull case/name parameter with symbols', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "s" + consumerObj.email,
                        "firstName": "!&^%$$#",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/ "receiveNotification" false', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "fa" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": false,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/ missed Start date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "fvfbgb" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": false,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });



            it('Create new Consumer/ missed End date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "vgbi" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": false,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                    })
                    .expect(200, done)
            });

            it('Create new Consumer/ "dontSentAdv" false', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "dd" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/ "signedUp" false', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "sds" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/ spaces for name parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "sdsgh" + consumerObj.email,
                        "firstName": "    ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/ empty for name parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "sdfsdf345" + consumerObj.email,
                        "firstName": "",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/ empty phone parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "sszz" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });

            it('Create new Consumer/ missed "signedUp" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "xxsse" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "456456",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });

            it('Create new Consumer/ missed "dontSentAdv" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "ertert" + consumerObj.email,
                        "firstName": "name" +consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "456456456",
                        "receiveNotification": false,
                        "signedUp": false,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });


            it('Create new Consumer/ end date before start date', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "efertt1" + consumerObj.email,
                        "firstName": "orumqw" + consumerObj.firstName,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "receiveNewsLetters": true,
                        "entityStart": "2010-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200, done)
            });




        })

        describe('HTTP responce code - 400 ', function () {

            it('Create new Consumer with the same email parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ incorrect format for EMAIL parameter/ spaces ', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "dsdfsdfsdf ",
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ empty for EMAIL parameter/ spaces ', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": " ",
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ empty start date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "fp" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": " ",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ empty end date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "cvb" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "  "
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ missed email parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ missed name parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName":"naa" + consumerObj.email,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ missed phone parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"phn" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ NULL for email param', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": null,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ NULL for name param', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"nnnamm" + consumerObj.email,
                        "firstName": null,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ NULL for Phone param', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"dvc" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": null,
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ NULL "receiveNotification" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"ccc" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": null,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ NULL "dontSentAdv" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"xcbbb" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": null,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ NULL "signedUp" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"dcvbc" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": null,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-04-04",
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ NULL Start date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"rffg" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": null,
                        "entityEnd": "2022-04-04"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ NULL End date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":"xcb" + consumerObj.email,
                        "firstName": "name ",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2022-04-04",
                        "entityEnd": null
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ boolean for email parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email":true,
                        "firstName": "name mm",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2022-04-04",
                        "entityEnd": "2023-03-03"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ boolean for name parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "cvb" + consumerObj.email,
                        "firstName": true,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2022-04-04",
                        "entityEnd": "2023-03-03"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ boolean for Start date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "dddd" + consumerObj.email,
                        "firstName": "dcdvv",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": true,
                        "entityEnd": "2023-03-03"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ boolean for phone parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "vvvv4" + consumerObj.email,
                        "firstName": "dcdvv",
                        "lastName":  consumerObj.lastName,
                        "phone": true,
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2021-03-03",
                        "entityEnd": "2023-03-03"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ boolean for end date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "vcvcv" + consumerObj.email,
                        "firstName": "dcdvv",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2018-03-03",
                        "entityEnd": true
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ number for email parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": 0,
                        "firstName": "dcdvv",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2018-03-03",
                        "entityEnd":  "2019-05-05"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ number for name parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "mkla" + consumerObj.email,
                        "firstName": 0,
                        "lastName":  consumerObj.lastName,
                        "phone": "phone ",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2018-03-03",
                        "entityEnd": "2019-05-05"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ number for phone parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "mklxvvvs" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": 0,
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2018-03-03",
                        "entityEnd": "2019-05-05"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ number for "receiveNotification" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "mkl" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": 0,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2018-03-03",
                        "entityEnd": "2019-05-05"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ number for "dontSentAdv" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "mklxx" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": 0,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2018-03-03",
                        "entityEnd": "2019-05-05"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ number for "signedUp" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "cvvv" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": 0,
                        "receiveNewsLetters": true,
                        "entityStart": "2018-03-03",
                        "entityEnd": "2019-05-05"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ number for Start date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "vfvfd" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": 0,
                        "receiveNewsLetters": true,
                        "entityEnd": "2019-05-05"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ number for End date parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "vvwwq" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-05",
                        "entityEnd": 0
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ string for "receiveNotification" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "xdoo" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": "dfgdfgdfgd",
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-05",
                        "entityEnd": "2019-04-03"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ string for "dontSentAdv" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "dfdfb" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": "dfgdfgdfgd",
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-05",
                        "entityEnd": "2019-04-03"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ string for "dontSentAdv" parameter', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "iop" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": "dfgdfgdfgd",
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-05",
                        "entityEnd": "2019-04-03"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ string for "signedUp" parameter ', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "vbnn" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": "dfgdfgdfgd",
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-05",
                        "entityEnd": "2019-04-03"
                    })
                    .expect(400, done)
            });


            it('Create new Consumer/ string for "signedUp" parameter ', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "vbnnsdf" + ".com",
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-05",
                        "entityEnd": "2019-04-03"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ incorrect format for Start date param ', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "rbp" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-0",
                        "entityEnd": "2019-04-03"
                    })
                    .expect(400, done)
            });

            it('Create new Consumer/ incorrect format for End date param ', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": "cc" + consumerObj.email,
                        "firstName": " fvcvc",
                        "lastName":  consumerObj.lastName,
                        "phone": "2151515",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2019-05-01",
                        "entityEnd": "2019-04-0"
                    })
                    .expect(400, done)
            });

        })


    })

    describe('GET Consumer object - ', function () {

        describe('HTTP responce code - 200 ', function () {

            it('GET consumer object/successful case', function(done) {
                api.get('/consumers/' + ConsumerID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)

            });

            describe('HTTP responce code - 400 ', function () {

                it('GET consumer object/Invalid centre ID', function(done) {
                    api.get('/consumers/5b3a354e9c62b00010dd63bf-f')
                        .set('Accept', 'application/json')
                        .set('Authorization', 'Bearer ' + token)
                        .expect(400,done)
                });

            })

            describe('HTTP responce code - 404 ', function () {

                it('Get consumer/not found', function (done) {
                    api.get('/consumers/5b30f037de19bd000f1241ea')
                        .set('Accept', 'application/json')
                        .set('Authorization', 'Bearer ' + token)
                        .expect(404,done)
                });

            })

        })
    })

    describe('Patch Consumer object',  function ()  {

        describe('HTTP responce code - 200 ', function () {


            it('Patch Consumer object / without any changes', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": "name_auto",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });

            it('Patch Consumer object / change name param', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "change name patch",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2018-01-01",
                            "entityEnd": "2018-01-01"
                        })
                    .expect(200,done)
            });

            it('Patch Consumer object / change phone param', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2018-01-01",
                            "entityEnd": "2018-01-01"
                        })
                    .expect(200,done)
            });

            it('Patch Consumer object / change "receiveNotification" param', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch",
                            "receiveNotification": false,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2018-01-01",
                            "entityEnd": "2018-01-01"
                        })
                    .expect(200,done)
            });

            it('Patch Consumer object / change "dontSentAdv" param', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch",
                            "receiveNotification": false,
                            "dontSentAdv": false,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2018-01-01",
                            "entityEnd": "2018-01-01"
                        })
                    .expect(200,done)
            });

            it('Patch Consumer object / change "signedUp" param', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch",
                            "receiveNotification": false,
                            "dontSentAdv": false,
                            "signedUp": false,
                            "receiveNewsLetters": true,
                            "entityStart": "2018-01-01",
                            "entityEnd": "2018-01-01"
                        })
                    .expect(200,done)
            });

            it('Patch Consumer object / change Start date param', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch",
                            "receiveNotification": false,
                            "dontSentAdv": false,
                            "signedUp": false,
                            "receiveNewsLetters": true,
                            "entityStart": "2017-01-01",
                            "entityEnd": "2018-01-01"
                        })
                    .expect(200,done)
            });

            it('Patch Consumer object / change End date param', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch",
                            "receiveNotification": false,
                            "dontSentAdv": false,
                            "signedUp": false,
                            "receiveNewsLetters": true,
                            "entityStart": "2017-01-01",
                            "entityEnd": "2019-02-02"
                        })
                    .expect(200,done)
            });


            it('Patch Consumer object / change all parameters', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch all",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(200,done)
            });

            it('Patch consumer object / Name param - empty', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": "",
                        "lastName":  consumerObj.lastName,
                        "phone": "phone",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });

            it('Patch consumer object / Phone param - empty', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": consumerObj.firstName,
                        "lastName":  consumerObj.lastName,
                        "phone": "",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });


            it('Patch consumer object / Name param - missed', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName":  consumerObj.lastName,
                        "phone": "cvxcv",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });

            it('Patch consumer object / Phone param - missed', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": consumerObj.firstName,
                        "lastName":  consumerObj.lastName,
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });

            it('Patch consumer object / Phone param - missed', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": consumerObj.firstName,
                        "lastName":  consumerObj.lastName,
                        "phone": "sdfsdfsd",
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });

            it('Patch consumer object / "dontSentAdv" -> missed', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "cvxcv",
                        "receiveNotification": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });


            it('Patch consumer object / "signedUp" -> missed', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "cvxcv",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });


            it('Patch consumer object / Start date -> missed', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "cvxcv",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityEnd": "2021-04-04"
                    })
                    .expect(200,done)
            });

            it('Patch consumer object / End date -> missed', function (done) {
                api.patch('/consumers/' + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "firstName": consumerObj.name,
                        "lastName":  consumerObj.lastName,
                        "phone": "cvxcv",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "receiveNewsLetters": true,
                        "entityStart": "2020-03-03",
                    })
                    .expect(200,done)
            });
        })


        describe('HTTP responce code - 400 ', function () {

            it('Patch Consumer object / Invalid centre ID', function(done) {
                api.patch('/consumers/IdConsumer' )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch all",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(400,done)
            });

            it('Patch consumer object / validation for parameter type / Name -> Number', function(done) {
                api.patch('/consumers/'  + ConsumerID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": 0,
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch all",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(400,done)
            });

            it('Patch consumer object / validation for parameter type / Phone -> Number', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": 0,
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / "receiveNotification" -> Number', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": 0,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / "dontSentAdv" -> Number', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": 0,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / "signedUp" -> Number', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": 0,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / Start date -> Number', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": 0,
                            "entityEnd": "2021-04-04"
                        })
                    .expect(400,done)
            });

            it('Patch consumer object / validation for parameter type / End date -> Number', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2021-04-04",
                            "entityEnd": 0
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / "receiveNotification" -> string', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": "string",
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2021-04-04",
                            "entityEnd": "2023-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / "dontSentAdv" -> string', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": "string",
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2021-04-04",
                            "entityEnd": "2023-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / "signedUp" -> string', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": "string",
                            "receiveNewsLetters": true,
                            "entityStart": "2021-04-04",
                            "entityEnd": "2023-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter format / Start date - incorrect format', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "string",
                            "entityEnd": "2023-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter format / End date - incorrect format', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-04",
                            "entityEnd": "string"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter format / Start date - incorrect format 2', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-0",
                            "entityEnd": "2020-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter format / End date - incorrect format 2', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-04",
                            "entityEnd": "2020-04-0"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / Name -> boolean (true)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": true,
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-04",
                            "entityEnd": "2020-04-04"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / Name -> boolean (false)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": false,
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-04",
                            "entityEnd": "2020-04-04"
                        })
                    .expect(400,done)
            });

            it('Patch consumer object / validation for parameter type / Phone -> boolean (true)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": true,
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-04",
                            "entityEnd": "2020-04-03"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / Phone -> boolean (false)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": false,
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-04",
                            "entityEnd": "2020-04-03"
                        })
                    .expect(400,done)
            });



            it('Patch consumer object / validation for parameter type / Start date -> boolean (true)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdfg",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "entityStart": true,
                            "receiveNewsLetters": true,
                            "entityEnd": "2020-04-03"
                        })
                    .expect(400,done)
            });

            it('Patch consumer object / validation for parameter type / Start date -> boolean (false)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdfg",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": false,
                            "entityEnd": "2020-04-03"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / End date -> boolean (true)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdfg",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-03",
                            "entityEnd": true
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / End date -> boolean (false)', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdfg",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-03",
                            "entityEnd": false
                        })
                    .expect(400,done)
            });

            it('Patch consumer object / validation for parameter type / Name -> null', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": null,
                            "lastName":  consumerObj.lastName,
                            "phone": "dfgdfgdfg",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-03",
                            "entityEnd": "2020-05-03"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / Phone -> null', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "sdfdf",
                            "lastName":  consumerObj.lastName,
                            "phone": null,
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-03",
                            "entityEnd": "2020-05-03"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / receiveNotification -> null', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "sdfdf",
                            "lastName":  consumerObj.lastName,
                            "phone": "dsdfsdfsdf",
                            "receiveNotification": null,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-03",
                            "entityEnd": "2020-05-03"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / dontSentAdv -> null', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "sdfdf",
                            "lastName":  consumerObj.lastName,
                            "phone": "dsdfsdfsdf",
                            "receiveNotification": true,
                            "dontSentAdv": null,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-03",
                            "entityEnd": "2020-05-03"
                        })
                    .expect(400,done)
            });


            it('Patch consumer object / validation for parameter type / signedUp -> null', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "sdfdf",
                            "lastName":  consumerObj.lastName,
                            "phone": "dsdfsdfsdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": null,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-04-03",
                            "entityEnd": "2020-05-03"
                        })
                    .expect(400,done)
            });



            it('Patch consumer object / validation for parameter type / Start date  -> null', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "sdfcccdf",
                            "lastName":  consumerObj.lastName,
                            "phone": "dsdfsdfsdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": null,
                            "entityEnd": "2020-05-03"
                        })
                    .expect(400,done)
            });




            it('Patch consumer object / validation for parameter type / End date  -> null', function(done) {
                api.patch('/consumers/'  + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "sdssfdf",
                            "lastName":  consumerObj.lastName,
                            "phone": "dsdfsdfsdf",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-05-03",
                            "entityEnd": null
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
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });
        })

        describe('HTTP responce code - 400 ', function () {

            it('Delete Consumer / Invalid Consumer ID', function (done) {
                api.del('/consumers/consumersdfsd345')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400,done)
            });
        })

        describe('HTTP responce code - 404 ', function () {

            it('Delete Consumer/not found', function (done) {
                api.del('/consumers/' + ConsumerID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });
        })

    })

    describe('Patch Consumer object Not found', function () {


        describe('HTTP responce code - 404 ', function () {

            it('Patch Consumer object / Not found', function(done) {
                api.patch('/consumers/' + ConsumerID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "firstName": "name patch all",
                            "lastName":  consumerObj.lastName,
                            "phone": "phone patch all",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "receiveNewsLetters": true,
                            "entityStart": "2020-03-03",
                            "entityEnd": "2021-04-04"
                        })
                    .expect(404,done)
            });

        })

    })




})

