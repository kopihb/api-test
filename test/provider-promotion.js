
var global = require('./global-variable');
var expect = global.expect;
var api = global.api;
var token = global.token;
var emailForProviders = global.emailForProvidersWorkingDay;
var centre = global.centreCLinicsPromo;
var consumerObj = global.consumerObjPromotions;
var ClinicIDForProvider = global.ClinicIDForProviderWorkingDay;
var ConsumerIDForProvider = global.ConsumerIDForProviderWorkingDay;
var ProviderIdForPatch = global.ProviderIdForPatchWorkingDay;
var ServiceId = global.ServiceId;
var ProviderPromotionID = global.ProviderPromotionID;


var TEMP_service_ID = "5b508e8c8c3606000f40dcf6";

describe('Provider  promotion', function () {



    describe('Create provider for auto test fot promotion', function () {
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

                    "email": "promo" + emailForProviders,
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


        it('Create new Provider/ SERVICE ID', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/services')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                        "name": "service_" + centre.name,
                        "currency": "string",
                        "providerId": ProviderIdForPatch,
                        "tags": [
                        "string"
                    ],
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01",
                        "restrictions": [
                        {
                            "startTime": "1970-01-01T00:00:00.000Z",
                            "endTime": "1970-01-01T16:00:00.000Z",
                            "weekDays": [2, 4, 6]
                        }
                    ]


                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    ServiceId = res.body.res._id;
                    done();
                });
        });



    })



    describe('Get lis provider promotion ', function () {
        describe('HTTP responce code - 200', function () {
            it('Get list of provider services', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });
            it('Get provider promotions / successful case', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });
            it('Get provider promotions / No Auth', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });
        });
        describe('HTTP responce code - 400', function () {
            it('GGet provider promotions / Invalid providerId', function (done) {
                api.get('/providers/' + ProviderIdForPatch + "invalid" + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 401', function () {  });
        describe('HTTP responce code - 404', function () {  });
    });

    describe('Create provider promotion', function () {
        describe('HTTP responce code - 200', function () {
            it('Create new provider promotion / successful case  + get ID', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "creatprom" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 6,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        ProviderPromotionID= res.body.res.id;
                        done();
                    })
            });
            it('Create new provider promotion / successful case -> no "serviceIds"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "creatpromnoserid" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 6,
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / successful case -> no "weekDays"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "noworkday" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 6,
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / "percent" = 0.1', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "percent" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 0.1,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / "percent" = 100', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "percentfull" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 100,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / "weekDays" -> array', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "arraysa" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                          0, 5, 6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / "weekDays" should be <= 6', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "notseven" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            6
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
            it('Create new provider promotion / duplicate name', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "creatprom" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 6,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / missed "percent" parameter', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "mispersen" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "percent" -> string', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "strin" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": "9",
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "percent" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "perBool" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": true,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        console.log(ProviderIdForPatch);
                        console.log(ServiceId);
                        console.log(res.body);
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        describe('HTTP responce code - 401', function () {
            it('Create new provider promotion / Unauthenticated', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .send({
                        "name": "notok" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 6,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            0
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        describe('HTTP responce code - 404', function () {  });
    });


});