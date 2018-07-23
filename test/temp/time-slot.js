
var global = require('../global-variable');
var should = global.should;
var expect = global.expect;
var supertest = global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;



var emailForProviders = global.emailForProvidersSheduleTimeSlot;
var centre = global.centreSheduleTimeSlot;
var consumerObj = global.consumerObjSheduleTimeSlot;
var ClinicIDForProvider = global.ClinicIDForProviderForTimeSlot;
var ConsumerIDForProvider = global.ConsumerIDForProviderForTimeSlot;
var ProviderIdForPatch = global.ProviderIdForPatchForTimeSlot;
var WorkingDayId = global.WorkingDayId;
var TimeSlotsID = "";
var randomValueName = global.randomValueNameSheduleTimeSlot;

describe('Schedule Time Slot', function () {
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
        //
        // /*-------------------      schedule/time-slots           ---------------------------------------------------------------------------------------------------- */
        // it('Post provider schedule time slot / time slot conflicts (the same date/time) FIRST', function (done) {
        //     api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
        //         .set('Accept', 'aplication/json')
        //         .set('Authorization', 'Bearer ' + token)
        //         .send({
        //
        //             "centreId": ClinicIDForProvider
        //
        //         })
        //         .end(function (err, res) {
        //             expect(res.statusCode).to.equal(200);
        //             TimeSlotsID = res.body.res._id;
        //             done();
        //         })
        // });
    });
});
/*-------------------      Get List       ---------------------------------------------------------------------------------------------------- */

describe('Get list provider time slot', function () {

    describe('HTTP responce code - 200', function () {
        // it('Get provider schedule time slot / successful case ', function (done) {
        //     api.get('/providers/' + ProviderIdForPatch + '/schedule/time-slots/'+ TimeSlotsID)
        //         .set('Accept', 'aplication/json')
        //         .set('Authorization', 'Bearer ' + token)
        //         .end(function(err, res) {
        //             expect(res.statusCode).to.equal(200);
        //             expect(res.body).to.be.an('array');
        //             done();
        //         });
        //
        // });
    });

    describe('HTTP responce code - 401', function () {

    });


    describe('HTTP responce code - 400', function () {
        // it('Get provider schedule time slot / Invalid timeSlotId ', function (done) {
        //     api.get('/providers/' + ProviderIdForPatch + '/schedule/time-slots/'+ TimeSlotsID + 'sdf')
        //         .set('Accept', 'aplication/json')
        //         .set('Authorization', 'Bearer ' + token)
        //         .end(function(err, res) {
        //             expect(res.statusCode).to.equal(400);
        //             done();
        //         });
        //
        // });

        // it('Get provider schedule time slot / Invalid providerId ', function (done) {
        //     api.get('/providers/' + ProviderIdForPatch + 'sdfsd' + '/schedule/time-slots/'+ TimeSlotsID )
        //         .set('Accept', 'aplication/json')
        //         .set('Authorization', 'Bearer ' + token)
        //         .end(function(err, res) {
        //             expect(res.statusCode).to.equal(400);
        //             done();
        //         });
        //
        // });
    });

    describe('HTTP responce code - 404', function () {
        // it('Get provider schedule time slot / Not found timeSlotId ', function (done) {
        //     api.get('/providers/' + ProviderIdForPatch + '/schedule/time-slots/'+ TimeSlotsID )
        //         .set('Accept', 'aplication/json')
        //         .set('Authorization', 'Bearer ' + token)
        //         .end(function(err, res) {
        //             expect(res.statusCode).to.equal(404);
        //             done();
        //         });
        //
        // });
    });

});


/*-------------------Create      ---------------------------------------------------------------------------------------------------- */

describe('Create provider time slot', function () {
    describe('HTTP responce code - 200', function () {

        /*-------------------      schedule/time-slots           ---------------------------------------------------------------------------------------------------- */
        it('Post provider schedule time slot / time slot conflicts (the same date/time) FIRST', function (done) {
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
                    done();
                })
        });





    });
    describe('HTTP responce code - 400', function () {


        it('Post provider schedule time slot / time slot conflicts (the same date/time) DUPLICATE', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({

                    "centreId": ClinicIDForProvider,
                    "startTime": "2018-01-01T00:00:00.000Z",
                    "endTime": "2018-01-01T01:00:00.000Z"

                })
                .end(function (err, res) {
                    console.log(res.body);
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




    });
    describe('HTTP responce code - 401', function () {

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

    describe('HTTP responce code - 404', function () {

        /*-------------------      schedule/time-slots           ---------------------------------------------------------------------------------------------------- */
        it('Post provider schedule time slot / Not found providerId', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/schedule/time-slots')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({

                    "centreId": ProviderIdForPatch,
                    "startTime": "2018-01-01T00:00:00.000Z",
                    "endTime": "2018-01-01T01:00:00.000Z"

                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.exist;
                    done();
                })
        });

    });
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
        it('Clean provider schedule for period / start date before end date', function (done) {
            api.del('/providers/' + ProviderIdForPatch + '/schedule?startDate=2018-07-05&endDate=2018-07-06')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(200,done)
        });
    });

    describe('HTTP responce code - 400', function () {
        it('Clean provider schedule for period / missingProperty "startDate"', function (done) {
            api.del('/providers/' + ProviderIdForPatch + '/schedule?startDate=2018-07-07&endDate=2018-07-06')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(400,done)
        });

        it('Clean provider schedule for period / missingProperty "endDate"', function (done) {
            api.del('/providers/' + ProviderIdForPatch + '/schedule?startDate=2018-07-07&endDate=2018-07-06')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(400,done)
        });
    });

    describe('HTTP responce code - 401', function () {
        it('Clean provider schedule for period / Unauthenticated', function (done) {
            api.del('/providers/' + ProviderIdForPatch + '/schedule?startDate=2018-07-07&endDate=2018-07-07')
                .set('Accept', 'application/json')
                .expect(401,done)
        });
    });
    describe('HTTP responce code - 404', function () {

    });
});