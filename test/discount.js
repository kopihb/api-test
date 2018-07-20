
var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest = global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;


var emailForProviders = global.emailForProvidersDiscount;
var centre = global.centreProviderDiscount;
var consumerObj = global.consumerObjDiscount;

var ClinicIDForProvider = global.ClinicIDForProviderForDiscount;
var ConsumerIDForProvider = global.ConsumerIDForProviderForDiscount;

var ProviderIdForPatch = global.ProviderIdForPatchForDiscount;
var WorkingDayId = global.WorkingDayId;
var randomValueName = global.randomValueNameDiscount;
var Invalidtoken = global.Invalidtoken;

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
                        "name": "lkjkl" +randomValueName,
                        "timeSlots": [
                            {
                                "centreId": ClinicIDForProvider,
                                "startTime": "1970-01-01T08:00:00.000Z",
                                "endTime": "1970-01-01T16:00:00.000Z"
                            }
                        ]
                    })
                .end(function(err, res) {
                    console.log(res.body);
                    expect(res.statusCode).to.equal(200);
                    WorkingDayId = res.body.res._id;
                    done();
                });

        });
    });
});
/*-------------------      Get List       ---------------------------------------------------------------------------------------------------- */

describe('Get list provider schedule/discount', function () {

    describe('HTTP responce code - 200', function () {
        it('Get provider discount / successful case ', function (done) {
            api.get('/providers/' + ProviderIdForPatch + '/discounts')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                });

        });
    });
    describe('HTTP responce code - 400', function () {


    });
    describe('HTTP responce code - 401', function () {
        it('Get  provider discount  / Invalid token ', function (done) {
            api.get('/providers/' + ProviderIdForPatch + '/discounts')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + Invalidtoken)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(401);
                    done();
                });

        });


    });
    describe('HTTP responce code - 403', function () {

        // it('Get  provider discount  / Forbidden ', function (done) {
        //     api.get('/providers/' + ConsumerIDForProvider + '/discounts')
        //         .set('Accept', 'aplication/json')
        //         .set('Authorization', 'Bearer ' + token + '1')
        //         .end(function(err, res) {
        //             expect(res.statusCode).to.equal(403);
        //             done();
        //         });
        //
        // });

    });

});


/*-------------------Create      ---------------------------------------------------------------------------------------------------- */

describe('Create provider schedule template', function () {
    describe('HTTP responce code - 200', function () {


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



        /*-------------------    discounts          ---------------------------------------------------------------------------------------------------- */

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

        it('Create new provider discount / Enter invalid providerId and send the request ', function (done) {
            ProviderIdForPatch = 'FS';
            api.post('/providers/' + ProviderIdForPatch + '/discounts')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({

                    "startDate": "2018-01-01T00:00:00.000Z",
                    "endDate": "2018-01-01T23:59:59.999Z",
                    "percent": 33,
                    "personal": false

                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.exist;
                    done();
                })
        });

    });
    describe('HTTP responce code - 401', function () {

        it('Create new provider discount / Unauthenticated', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/discounts')
                .set('Accept', 'aplication/json')
                .send({

                    "startDate": "2018-01-01T00:00:00.000Z",
                    "endDate": "2018-01-01T23:59:59.999Z",
                    "percent": 33,
                    "personal": false

                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(401);
                    expect(res.body).to.exist;
                    done();
                })
        });

    });

    describe('HTTP responce code - 403', function () {

        // it('Create new provider discount / Enter existed providerId and Consumer role instead of Provider one', function (done) {
        //     api.post('/providers/' + ProviderIdForPatch + '/discounts')
        //         .set('Accept', 'aplication/json')
        //         .set('Authorization', 'Bearer ' + token)
        //         .send({
        //
        //             "startDate": "2018-01-01T00:00:00.000Z",
        //             "endDate": "2018-01-01T23:59:59.999Z",
        //             "percent": 33,
        //             "personal": false
        //
        //         })
        //         .end(function (err, res) {
        //             expect(res.statusCode).to.equal(403);
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