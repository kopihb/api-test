
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
                    "name": consumerObj.name,
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

            it('Get provider schedule / successful case ', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });

        });

        describe('HTTP responce code - 401', function () {});

        describe('HTTP responce code - 400', function () {
            it('Get provider schedule / Invalid providerId', function (done) {
                api.get('/providers/' + ProviderIdForPatch +'sdf'+ '/schedule')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
        });
    });


    /*-------------------Create      ---------------------------------------------------------------------------------------------------- */

    describe('Create provider schedule', function () {
        describe('HTTP responce code - 200', function () {

            /*-------------------      schedule           ---------------------------------------------------------------------------------------------------- */
            it('Provider schedule generation / successful case', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-01",
                        "endDate": "2018-03-01",
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                      console.log(res.body);
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

        });
        describe('HTTP responce code - 400', function () {

            /*-------------------      schedule          ---------------------------------------------------------------------------------------------------- */
            it('Provider schedule generation / time slot conflicts', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-01",
                        "endDate": "2018-03-01",
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / start date -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": 0,
                        "endDate": "2018-03-07",
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / start date -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": null,
                        "endDate": "2018-03-07",
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / start date -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": true,
                        "endDate": "2018-03-07",
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / end date -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": true,
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / end date -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": null,
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / end date -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": 0,
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / end date -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": 0,
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Provider schedule generation / validation for parameter type / "anchorDate" -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": "2018-03-09",
                        "anchorDate": 0,
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / "anchorDate" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": "2018-03-09",
                        "anchorDate": null,
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter type / "anchorDate" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": "2018-03-09",
                        "anchorDate": true,
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter format / "anchorDate"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-07",
                        "endDate": "2018-03-09",
                        "anchorDate": "2018-03-9",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Provider schedule generation / validation for parameter format / Start date', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-0",
                        "endDate": "2018-03-09",
                        "anchorDate": "2018-03-9",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Provider schedule generation / validation for parameter format / End date', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-03-0",
                        "endDate": "2018-03-0",
                        "anchorDate": "2018-03-9",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


        });
        describe('HTTP responce code - 401', function () {


            /*-------------------      schedule  ---------------------------------------------------------------------------------------------------- */
            it('Provider schedule generation / validation for parameter format / End date', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .send({

                        "startDate": "2018-03-0",
                        "endDate": "2018-03-0",
                        "anchorDate": "2018-03-9",
                        "scheduleTemplateId": ScheduleIdForProviders

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });



        });
        /*-------------------      schedule---------------------------------------------------------------------------------------------------- */
        describe('HTTP responce code - 404', function () {
            it('Provider schedule generation / Not found scheduleTemplateId', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "startDate": "2018-03-03",
                        "endDate": "2018-03-04",
                        "anchorDate": "2018-03-01",
                        "scheduleTemplateId": "5b4dd36f4e1be3000ff0030f"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        expect(res.body).to.exist;
                        done();
                    })
            });


        });
    });

    /*-------------------   Get List        ---------------------------------------------------------------------------------------------------- */

    describe('Get list provider schedule-templates object', function () {
        describe('HTTP responce code - 200', function () {});
        describe('HTTP responce code - 400', function () {});
        describe('HTTP responce code - 401', function () {});
        describe('HTTP responce code - 404', function () {});
    });

    /*-------------------     Patch         ---------------------------------------------------------------------------------------------------- */

    describe('Patch provider schedule template', function () {
        describe('HTTP responce code - 200', function () {


        });


        describe('HTTP responce code - 400', function () {




        });
        describe('HTTP responce code - 401', function () {



        });
        describe('HTTP responce code - 404', function () {


        });
    });

    /*-------------------      Delete  ---------------------------------------------------------------------------------------------------- */

    describe('Delete provider schedule template', function () {
        describe('HTTP responce code - 200', function () {

        });

        describe('HTTP responce code - 401', function () {

        });
        describe('HTTP responce code - 404', function () {

        });
    });
})