
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
var ScheduleIdForProviders2 = global.ScheduleIdForProviders2;
var ProviderIdForPatch2 = global.ProviderIdForPatch2;
var WorkingDayId2 = global.WorkingDayId2;
var WorkingDayId3 = global.WorkingDayId3;
var WorkingDayId4 = global.WorkingDayId4;
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


        it('Create new Provider/ Successful case FOR NEW', function (done) {
            api.post('/providers')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({

                    "email": emailForProviders+'er',
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
                    "entityStart": "2018-02-01",
                    "entityEnd": "2018-02-01"

                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    ProviderIdForPatch2 = res.body.res.id;
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

        it('Create provider working day / successful case FOR NEW', function (done) {
            api.post('/providers/' + ProviderIdForPatch2 + '/working-days')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send(
                    {
                        "name": randomValueName+'sd',
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
                    WorkingDayId4 = res.body.res._id;
                    done();
                });

        });
        it('Create provider working day / CHANGE', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/working-days')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send(
                    {
                        "name": randomValueName+'22',
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
                    WorkingDayId2 = res.body.res._id;
                    done();
                });

        });


        it('Create provider working day / FOR DELETE', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/working-days')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send(
                    {
                        "name": randomValueName+'322',
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
                    WorkingDayId3 = res.body.res._id;
                    done();
                });

        });


        it('Delete provider working day / Successful case', function (done) {
            api.del('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId3 )
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
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


            it('Create provider schedule template FOR DELETE', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/schedule-templates')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName+'dsfsd',
                        "workingDayIds": [
                            WorkingDayId
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        ScheduleIdForProviders2 = res.body.res.id;
                        done();
                    })
            });
            it('Delete provider schedule template object DELETE', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders2)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
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



        });

    /*-------------------   Get List        ---------------------------------------------------------------------------------------------------- */

    describe('Get list provider schedule-templates object', function () {
        describe('HTTP responce code - 200', function () {
            it('Get provider schedule template object / successful case', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {

                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });
        });
        describe('HTTP responce code - 400', function () {
            it('Get provider schedule template object / Invalid providerId', function (done) {
                api.get('/providers/' + ProviderIdForPatch+'sdfsdf' + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Get provider schedule template object / Invalid scheduleTemplateId', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders+'sdfsdf')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
        });
        describe('HTTP responce code - 401', function () {
            it('Get provider schedule template object / successful case', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });
        });
        describe('HTTP responce code - 404', function () {
            it('Get provider schedule template object / Not found scheduleTemplateId', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders2)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });

            });
        });
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
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;

                        done();
                    })
            });

            it('Patch provider schedule template object / change working day ID', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName,
                        "workingDayIds": [
                            WorkingDayId2
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;

                        done();
                    })
            });

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
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;

                        done();
                    })
            });
            it('Patch provider schedule template object / Working days is assigned to antoher provider', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName+'fds',
                        "workingDayIds": [
                            WorkingDayId4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider schedule template object / deleted working day ', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName+'fds',
                        "workingDayIds": [
                            WorkingDayId3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
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

            it('Patch provider schedule template object / for deleted schedule template', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/schedule-templates/' + ScheduleIdForProviders2)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name":randomValueName,
                        "workingDayIds": [
                            WorkingDayId2
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        expect(res.body).to.exist;

                        done();
                    })
            });

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
    });
    });