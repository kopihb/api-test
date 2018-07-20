
var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest = global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;
var emailForProviders = global.emailForProvidersShedule;
var centre = global.centreShedule;
var consumerObj = global.consumerObjShedule;
var ClinicIDForProvider = global.ClinicIDForProvider;
var ConsumerIDForProvider = global.ConsumerIDForProvider;
var ProviderIdForPatch = global.ProviderIdForPatch;
var WorkingDayId = global.WorkingDayId;
var ScheduleIdForProviders = global.ScheduleIdForProviders;
var randomValueName = global.randomValueNameShedule;


describe('Schedule-Templates', function () {
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
    });

    /*-------------------      Get List       ---------------------------------------------------------------------------------------------------- */

    describe('Get list provider schedule-templates', function () {

        describe('HTTP responce code - 200', function () {
            it('Get list of provider days-off ', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });


            it('Get list of provider days-off / Not found provider Id ', function (done) {
                api.get('/providers/' + ConsumerIDForProvider + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });

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

        describe('HTTP responce code - 401', function () {
            it('Get list of provider days-off  / Unauthenticated', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });


        });

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

    describe('Create provider schedule template', function () {
        describe('HTTP responce code - 200', function () {
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
            it('Create provider schedule template / change name', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName + "dgdfgdf456",
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });


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
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

 /*-------------------      schedule/time-slots           ---------------------------------------------------------------------------------------------------- */
            it('Post provider schedule time slot / successful case', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-01T00:00:00.000Z",
                        "endTime": "2018-01-01T01:00:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

/*-------------------      schedule/discounts          ---------------------------------------------------------------------------------------------------- */
            it('Create new provider discount /with consumerID', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 5,
                        "personal": true,
                        "consumerIds": [
                            ConsumerIDForProvider
                        ]

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create new provider discount / No consumerId', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 7,
                        "personal": false

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

        });
        describe('HTTP responce code - 400', function () {
            it('Create provider schedule template / Duplicate name', function (done) {
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
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create provider schedule template / validation for parameter type / name -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":null,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create provider schedule template / validation for parameter type / name -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":true,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });



            it('Create provider schedule template / validation for parameter type / name -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":0,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
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

            /*-------------------      schedule/time-slots           ---------------------------------------------------------------------------------------------------- */
            it('Post provider schedule time slot / time slot conflicts (the same date/time)', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-01T00:00:00.000Z",
                        "endTime": "2018-01-01T01:00:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Post provider schedule time slot / Start date/time must be less than end date/time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-01T00:00:00.000Z",
                        "endTime": "2018-01-01T00:00:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Post provider schedule time slot / Dates are not the same', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-01T00:00:00.000Z",
                        "endTime": "2018-01-02T00:00:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Post provider schedule time slot / Invalid centre ID', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider+'fsdf',
                        "startTime": "2018-01-01T00:00:00.000Z",
                        "endTime": "2018-01-02T00:00:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post provider schedule time slot / must be 5 minutes x', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-03T04:02:00.000Z",
                        "endTime": "2018-01-03T05:08:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post provider schedule time slot / validation for parameter format / start Time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-3T04:02:00.000Z",
                        "endTime": "2018-01-03T05:08:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post provider schedule time slot / validation for parameter format / end Time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-3T04:02:00.000Z",
                        "endTime": "2018-01-3T05:08:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Post provider schedule time slot / validation for parameter type / start Time -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": true,
                        "endTime": "2018-01-3T05:08:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post provider schedule time slot / validation for parameter type / start Time -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": 0,
                        "endTime": "2018-01-3T05:08:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });



            it('Post provider schedule time slot / validation for parameter type / start Time -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": null,
                        "endTime": "2018-01-3T05:08:00.000Z"

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post provider schedule time slot / validation for parameter type / end Time -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-3T04:02:00.000Z",
                        "endTime": null

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post provider schedule time slot / validation for parameter type / end Time -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-3T04:02:00.000Z",
                        "endTime": true

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post provider schedule time slot / validation for parameter type / end Time -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-3T04:02:00.000Z",
                        "endTime": 0

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            /*-------------------      schedule/discounts          ---------------------------------------------------------------------------------------------------- */

            it('Create new provider discount/ time slot conflicts (the same date/time)', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T00:00:00.000Z",
                        "percent": 1,
                        "personal": true,
                        "consumerIds": [
                            ConsumerIDForProvider
                        ]

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Create new provider discount/ Start date/time must be less than end date/time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-01-01T23:59:59.999Z",
                        "endDate": "2018-01-01T00:00:00.000Z",
                        "percent": 1,
                        "personal": true,
                        "consumerIds": [
                            ConsumerIDForProvider
                        ]

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Post new provider discount/ Invalid date - MONTH', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-12-01T00:00:00.000Z",
                        "endDate": "2018-13-01T23:59:59.999Z",
                        "percent": 7,
                        "personal": false

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });



            it('Post new provider discount /Invalid time format', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-11-01T00:00:00.000Z",
                        "endDate": "2018-12-01T23:59:61.999Z",
                        "percent": 7,
                        "personal": false

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create new provider discount/Invalid discount format(min value)', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-11-01T00:00:00.000Z",
                        "endDate": "2018-12-01T23:59:59.999Z",
                        "percent":0,
                        "personal": false


                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create new provider discount/Invalid discount format(max value)', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-11-01T00:00:00.000Z",
                        "endDate": "2018-12-01T23:59:59.999Z",
                        "percent":101,
                        "personal": false


                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });



            it('Create new provider discount/No ConsumerId mentioned if "personal:true"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-11-01T00:00:00.000Z",
                        "endDate": "2018-12-01T23:59:59.999Z",
                        "percent":2,
                        "personal": true


                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });



            it('Create new provider discount/ ConsumerId is incorrect', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 5,
                        "personal": true,
                        "consumerIds": [
                            ConsumerIDForProvider+ '1'
                        ]

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Create new provider discount/ ConsumerId is invalid', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 5,
                        "personal": true,
                        "consumerIds": [
                            "llllnbjbjbjbbkb"
                        ]

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });


            it('Create new provider discount/ ConsumerIds are duplicated', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/discounts')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 5,
                        "personal": true,
                        "consumerIds": [
                            ConsumerIDForProvider,
                            ConsumerIDForProvider
                        ]

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });




        });
        describe('HTTP responce code - 401', function () {
            it('Create provider schedule template / Unauthenticated', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .send({
                        "name":randomValueName,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });

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

            /*-------------------      schedule/time-slots           ---------------------------------------------------------------------------------------------------- */
            it('Post provider schedule time slot / validation for parameter type / end Time -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                    .set('Accept', 'aplication/json')
                    .send({

                        "centreId": ClinicIDForProvider,
                        "startTime": "2018-01-3T04:02:00.000Z",
                        "endTime": "2018-01-3T04:02:00.000Z"

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


            // it('Post provider schedule time slot / Not found providerId', function (done) {
            //     api.post('/providers/' + ProviderIdForPatch +'sdfioiojkl79nlkj' + '/schedule/time-slots')
            //         .set('Accept', 'aplication/json')
            //         .set('Authorization', 'Bearer ' + token)
            //         .send({
            //
            //             "centreId": ClinicIDForProvider,
            //             "startTime": "2018-01-01T00:00:00.000Z",
            //             "endTime": "2018-01-01T01:00:00.000Z"
            //
            //         })
            //         .end(function (err, res) {
            //             expect(res.statusCode).to.equal(404);
            //             expect(res.body).to.exist;
            //             done();
            //         })
            // });

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
            it('Patch provider schedule template object / without any changes', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
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

                        done();
                    })
            });
            it('Patch provider schedule template object / change name parameter', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName +"sdfsdf23561",
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        console.log(res.body);
                        console.log(WorkingDayId);
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;

                        done();
                    })
            });


            // it('Patch provider schedule template object / change working day ID', function (done) {
            //     api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
            //         .set('Accept', 'aplication/json')
            //         .set('Authorization', 'Bearer ' + token)
            //         .send({
            //             "name":randomValueName +"sdfsdf23561",
            //             "workingDayIds": [
            //                 WorkingDayId
            //             ]
            //         })
            //         .end(function (err, res) {
            //             console.log(res.body);
            //             console.log(WorkingDayId);
            //             expect(res.statusCode).to.equal(200);
            //             expect(res.body).to.exist;
            //
            //             done();
            //         })
            // });



        });


        describe('HTTP responce code - 400', function () {



            /* новий    */
            it('Patch provider schedule template object / Invalid id working days', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName +"sdfsdf23561",
                        "workingDayIds": [
                            WorkingDayId + "1"
                        ]
                    })
                    .end(function (err, res) {
                        console.log(res.body);
                        console.log(WorkingDayId);
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;

                        done();
                    })
            });



            /* новий    */
            it('Patch provider schedule template object / validation for parameter type / "name"-> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":null,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        console.log(res.body);
                        console.log(WorkingDayId);
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;

                        done();
                    })
            });

            /* новий    */
            it('Patch provider schedule template object / validation for parameter type / "name"-> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":0,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        console.log(res.body);
                        console.log(WorkingDayId);
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;

                        done();
                    })
            });



            /* новий    */
            it('Patch provider schedule template object / validation for parameter type / "name"-> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":true,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        console.log(res.body);
                        console.log(WorkingDayId);
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;

                        done();
                    })
            });

        });
        describe('HTTP responce code - 401', function () {
            /* новий    */
            it('Patch provider schedule template object / Unauthenticated', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .send({
                        "name":randomValueName,
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });


        });
        describe('HTTP responce code - 404', function () {


        });
    });

    /*-------------------      Delete  ---------------------------------------------------------------------------------------------------- */

    describe('Delete provider schedule template', function () {
        describe('HTTP responce code - 200', function () {
            /* новий    */
            it('Delete provider schedule template object / successful case', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });
        });

        describe('HTTP responce code - 401', function () {
            /* новий    */
            it('Delete provider schedule template object / successful case', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'application/json')
                    .expect(401,done)
            });
        });
        describe('HTTP responce code - 404', function () {
            /* новий    */
            it('Delete provider schedule template object / successful case', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });
        });
    });
})