
var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest = global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;


var emailForProviders = global.emailForProvidersSheduleOne;
var centre = global.centreSheduleOne;
var consumerObj = global.consumerObjSheduleOne;
var ClinicIDForProvider = global.ClinicIDForProvider;
var ConsumerIDForProvider = global.ConsumerIDForProvider;
var ProviderIdForPatch = global.ProviderIdForPatch;
var WorkingDayId = global.WorkingDayId;
var ScheduleIdForProviders = global.ScheduleIdForProvidersOne;
var randomValueName = global.randomValueNameSheduleOne;
var forError = '';

describe('Schedule', function () {
    /*-------------------      Create auto data       ---------------------------------------------------------------------------------------------------- */

    describe('Create provider for auto test', function () {
        it('Create new centre/Successfull case + get ID for attachment to provider', function (done) {
            api.post('/centres')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name : centre.name,
                    latitude : centre.latitude,
                    longitude: centre.longitude,
                    confirmed: centre.confirmed

                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    ClinicIDForProvider = res.body.res.id;
                    done();
                })
        });
        it('Create new consumer/Successfull case + get ID for attachment to provider', function (done) {
            api.post('/consumers')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    "email": consumerObj.email,
                    "firstName": consumerObj.firstName,
                    "lastName": consumerObj.lastName,
                    "phone": "phone ",
                    "receiveNotification": true,
                    "dontSentAdv": true,
                    "signedUp": true,
                    "entityStart": "2016-03-03",
                    "entityEnd": "2021-04-04"
                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    ConsumerIDForProvider = res.body.res.id;
                    done();
                })

        });
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
                    "defaultCentreId": ClinicIDForProvider,
                    "centreIds": [
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
                    ProviderIdForPatch = res.body.res.id;
                    done();
                });
        });
        it('Create provider working day / successful case', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/working-days')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send(
                    {
                        "name": randomValueName,
                        "timeSlots": [
                            {
                                "centreId": ClinicIDForProvider,
                                "startTime": "1970-01-01T08:00:00.000Z",
                                "endTime": "1970-01-01T16:00:00.000Z"
                            }
                        ]
                    })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    WorkingDayId = res.body.res._id;
                    done();
                });

        });


        it('Create provider schedule template / successful case', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/schedule-templates')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    "name":randomValueName,
                    "workingDayIds": [
                        WorkingDayId
                    ]
                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    ScheduleIdForProviders = res.body.res.id;
                    done();
                })
        });
    });

    /*-------------------      Get List       ---------------------------------------------------------------------------------------------------- */

    describe('Get list provider schedule', function () {

        describe('HTTP responce code - 200', function () {

            it('TESTS', function (done) {
                api.post('/providers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "email": "11ssnulls23" + emailForProviders,
                        "waitingSlots": 32,
                        "instantBooking": false,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"

                    })
                    .end(function(err, res) {
                        res.text = JSON.parse(res.text);
                        if (res.text.error) {
                            describe(res.text.error.message[0].dataPath + ' ' + res.text.error.message[0].message);
                            res.text = ' ';
                        }
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });


            it('TESTS2', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                    .end(function(err, res) {
                        res.text = JSON.parse(res.text);
                        if (res.text.error) {
                            describe(res.text.error.message[0].dataPath + ' ' + res.text.error.message[0].message);
                            console.log(res.text.error.message[0].dataPath + ' ' + res.text.error.message[0].message);
                        }
                    });
            });
        });
    });
});