
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

// var ClinicIDForProvider = "5b44a799eddc6b000f68134e";
// var ConsumerIDForProvider = "5b436953eddc6b000f6811be";

var ClinicIDForProvider = "";
var ConsumerIDForProvider = "";



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


                it('Create new clinic/Successfull case + get ID for attachment to provider', function (done) {
                    api.post('/clinics')
                        .set('Accept', 'aplication/json')
                        .set('Authorization', 'Bearer ' + token)
                        .send({
                            name : clinic.name,
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
                            ClinicIDForProvider= res.body.res.id;
                            done();
                        })
                });

                it('Create new consumer/Successfull case + get ID for attachment to provider', function (done) {
                    api.post('/consumers')
                        .set('Accept', 'aplication/json')
                        .set('Authorization', 'Bearer ' + token)
                        .send({
                            "email": consumerObj.email,
                            "name": consumerObj.name,
                            "phone": "phone ",
                            "receiveNotification": true,
                            "dontSentAdv": true,
                            "signedUp": true,
                            "entityStart": "2016-03-03",
                            "entityEnd": "2021-04-04"
                        })
                        .end(function (err, res) {
                            console.log(res.body);
                            expect(res.statusCode).to.equal(200);
                            expect(res.body).to.exist;
                            //expect(res.body).to.equal({});
                            //expect(res.body.res.name).to.equal("namex");
                            ConsumerIDForProvider = res.body.res.id;
                            done();
                        })
                    addContext(this, 'we do it');
                });


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
            it('Create new Provider / validation for parameter type/ "waitingSlots" -> missed', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "11ssnullsdd23" + emailForProviders,
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
            it('Create new Provider with End date before the Start date', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 911 + emailForProviders,
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
                        "entityEnd": "2017-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Create new Provider / missed "instantBooking"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 9131 + emailForProviders,
                        "waitingSlots": 1,
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
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Create new Provider / missed "bookingConfirmation"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 977711 + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
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
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Create new Provider / missed "sponsored"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 91991 + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Create new Provider / missed default Clinic ID', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "4dfg8" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
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
            it('Create new Provider / missed "instantBookingConsumerIds"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "x99xxeed" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Create new Provider / missed "instantBookingConsumerIds"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "try67876" + emailForProviders,
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
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Create new Provider / missed "entityStart"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "erytruy697" +  emailForProviders,
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
                        done();
                    });
            });
            it('Create new Provider / missed Clinic Ids', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "69dsfjksfffhf" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / missed Clinic Ids', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "69dsfjksfffhf" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider with Invalid default clinic id', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "inval_clin" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": 1 + ClinicIDForProvider,
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
                        done();
                    });
            });

            it('Create new Provider / missed "minScheduleStep"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 911 + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });


            it('Create new Provider with Invalid "instantBookingConsumerIds"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "inval_cons" + emailForProviders,
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
                            1 + ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider with different clinic id and clinicIds', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "dif id" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultClinicId": 1 + ClinicIDForProvider,
                        "clinicIds": [
                            2 + ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / NULL for email', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": null,
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
                        done();
                    });
            });

            it('Create new Provider / NULL for "instantBooking"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "instnull" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": null,
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
                        done();
                    });
            });

            it('Create new Provider / NULL for "bookingConfirmation"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "bookconf" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": null,
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
                        done();
                    });
            });

            it('Create new Provider / NULL for "sponsored"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "spon" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
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
                        done();
                    });
            });

            it('Create new Provider / NULL for "minScheduleStep"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "minsh" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": null,
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
                        done();
                    });
            });

            it('Create new Provider / NULL for default Clinic ID', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "spon" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
                        "minScheduleStep": 8,
                        "defaultClinicId": null,
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
                        done();
                    });
            });

            it('Create new Provider / NULL for Clinic Ids', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ssssvv" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            null
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / NULL for "instantBookingConsumerIds"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ssdsd" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            null
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / NULL for "entityStart"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "dsr" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": null,
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / NULL for "entityEnd"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "wwcvb" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": null

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / incorrect email format', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "incor" ,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
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
                        done();
                    });
            });

            it('Create new Provider / "minScheduleStep" is < 5', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "small5" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
                        "minScheduleStep": 4,
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
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / email -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": 4554546,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": null,
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
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "instantBooking" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "sss" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": 22,
                        "bookingConfirmation": false,
                        "sponsored": null,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "bookingConfirmation" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "sdfsd" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": 33,
                        "sponsored": null,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "sponsored" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "dddtt" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": 433,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "defaultClinicId" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ddq2dtt" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 7,
                        "defaultClinicId": 1234567890,
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
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "clinicIds" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "rtg5" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 7,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            1234567890
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "clinicIds" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ddqqy2dtt" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 7,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            1234567890
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "entityStart" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ssss444rr" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 7,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": 1234567890,
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "entityEnd" -> number', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ssss4r44" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 7,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": 1234567890

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / email -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": true,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "minScheduleStep" -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "erter55" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": true,
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
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "defaultClinicId" -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "fgd99" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 8,
                        "defaultClinicId": false,
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
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "clinicIds" -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "fgd99" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            false
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "instantBookingConsumerIds" -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "fgss1d99" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 8,
                        "defaultClinicId": ClinicIDForProvider,
                        "clinicIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            true
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "entityStart" -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "4trt" + emailForProviders,
                        "waitingSlots": 1,
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
                        "entityStart": true,
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "entityEnd" -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "erte444" + emailForProviders,
                        "waitingSlots": 1,
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
                        "entityEnd": true

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "instantBooking" -> string', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ddd00" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": "sdfsdfsdfs",
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "bookingConfirmation" -> string', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ddxd00" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": "dfgdfgdfgvvv",
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / validation for parameter type / "sponsored" -> string', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "ddxd00rrr" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": true,
                        "sponsored": "dfgdfgdfgvvv",
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
                        done();
                    });
            });
            it('Create new Provider / validation for parameter type / "minScheduleStep" -> string', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "sdsd433" + emailForProviders,
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": "dfgdfgdfgvvv",
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
                        done();
                    });
            });
            it('Create new Provider / validation for parameter format / "entityEnd"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "3er5" + emailForProviders,
                        "waitingSlots": 1,
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
                        "entityEnd": "2018-01-0"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / validation for parameter format / "entityStart"', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "3ewerwrr5" + emailForProviders,
                        "waitingSlots": 1,
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
                        "entityStart": "2018-01-0",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / missed email', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "",
                        "waitingSlots": 1,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / "waitingSlots" = -1', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "112" + emailForProviders,
                        "waitingSlots": -1,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / validation for parameter type/ "waitingSlots" -> string', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "1123" + emailForProviders,
                        "waitingSlots": "dsdfsdf",
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / validation for parameter type/ "waitingSlots" -> boolean', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "11sss2r3" + emailForProviders,
                        "waitingSlots": true,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / validation for parameter type/ "waitingSlots" -> NULL', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "11ssnulls23" + emailForProviders,
                        "waitingSlots": null,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });



        })
        describe('HTTP responce code - 401', function () {
            it('Create new Provider / Unauthenticated', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .send({

                        "email": "no_token" + emailForProviders,
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
                        expect(res.statusCode).to.equal(401);
                        done();
                    });
            });

        })
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

