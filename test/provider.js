
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzA3ODA5NTEsImV4cCI6MTUzMzQyNzIwMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEB0ZXN0Iiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiJdfQ.6DspCe-Ds23yxhSql-9gZCrTGCaCjZH1FAwT1NSCQfo';

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


var randomValueName = randomString(5); /*use for name*/
var randomValueMail = randomString(7); /*use for mail*/
var randomValueProviderMail = randomString(8); /*use for mail*/
/*End create random value*/




var   emailForProviders = randomValueProviderMail + '@mail.com';

//var randomValueMail = randomString(7); /*use for mail*/
/*End create random value*/


/*Test data - */
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

var ClinicIDForProvider = "5b44a799eddc6b000f68134e";
var ConsumerIDForProvider = "5b436953eddc6b000f6811be";


describe('Version - 1.0.0 ' +
    'Provider ' +
    ' Auto create and get  ID for test ', function () {


})


describe('PROVIDER', function () {

    describe('GET list -', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Should return 200 responce - /providers', function (done) {
                api.get('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });


                // it('Create new clinic/Successfull case + get ID for attachment to provider', function (done) {
                //     api.post('/clinics')
                //         .set('Accept', 'aplication/json')
                //         .set('Authorization', 'Bearer ' + token)
                //         .send({
                //             name : clinic.name,
                //             latitude : clinic.latitude,
                //             longitude: clinic.longitude,
                //             confirmed: clinic.confirmed
                //
                //         })
                //         .end(function (err, res) {
                //             console.log(res.body);
                //             expect(res.statusCode).to.equal(200);
                //             expect(res.body).to.exist;
                //             //expect(res.body).to.equal({});
                //             //expect(res.body.res.name).to.equal("namex");
                //             ClinicIDForProvider= res.body.res.id;
                //             done();
                //         })
                // });
                //
                // it('Create new consumer/Successfull case + get ID for attachment to provider', function (done) {
                //     api.post('/consumers')
                //         .set('Accept', 'aplication/json')
                //         .set('Authorization', 'Bearer ' + token)
                //         .send({
                //             "email": consumerObj.email,
                //             "name": consumerObj.name,
                //             "phone": "phone ",
                //             "receiveNotification": true,
                //             "dontSentAdv": true,
                //             "signedUp": true,
                //             "entityStart": "2016-03-03",
                //             "entityEnd": "2021-04-04"
                //         })
                //         .end(function (err, res) {
                //             console.log(res.body);
                //             expect(res.statusCode).to.equal(200);
                //             expect(res.body).to.exist;
                //             //expect(res.body).to.equal({});
                //             //expect(res.body.res.name).to.equal("namex");
                //             ConsumerIDForProvider = res.body.res.id;
                //             done();
                //         })
                //     addContext(this, 'we do it');
                // });


        })


    })


    describe('Create provider', function () {
        describe('HTTP responce code - 200', function () {
            it('Create new Provider/ Successful case', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": emailForProviders,
                        "waitingSlots": 0,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 7,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Create new Provider/ Successful case/ Schedule step=6', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "step" + emailForProviders,
                        "waitingSlots": 0,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Create new Provider/ Successful case/ "instantBooking": false', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "instbook" + emailForProviders,
                        "waitingSlots": 0,
                        "instantBooking": false,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Create new Provider/ Successful case/ "bookingConfirmation": false', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "bookin" + emailForProviders,
                        "waitingSlots": 0,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });


        it('Create new Provider/ Successful case/ "sponsored": false', function (done) {
        api.post('/providers')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({

                "email": "sponsor" + emailForProviders,
                "waitingSlots": 0,
                "instantBooking": false,
                "bookingConfirmation": false,
                "sponsored": false,
                "minScheduleStep": 8,
                "defaultClinicId": ClinicIDForProvider,
                "clinicIds": [
                    ClinicIDForProvider
                ],
                "instantBookingConsumerIds": [
                    ConsumerIDForProvider
                ],
                "entityStart": "2018-01-01",
                "entityEnd": "2018-01-01"

            })
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });



            it('Create new Provider/ Successful case/ email with numbers', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 564565756234 + emailForProviders,
                        "waitingSlots": 0,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Create new Provider/ Successful case/ "waitingSlots" = 1', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 123 + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });



        })
        describe('HTTP responce code - 400', function () {

            it('Create new Provider with duplicated email', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        answer = res.body;
                        done();
                    });
            });

        })
        describe('HTTP responce code - 401', function () { })
    })




    describe('GET  provider', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })






    describe('Patch  provider', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })






    describe('Delete  provider', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })




    describe('Patch  provider/Not Found', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })

})

