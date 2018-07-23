
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
            it('Create new provider promotion / invalid Provider ID in body', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "errdfgdfgserv" + centre.name,
                        "providerId": 2222 + ProviderIdForPatch + 1111,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-03T23:59:59.999Z",
                        "weekDays": [
                            1, 4
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
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "percent" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "null" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": null,
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
            it('Create new provider promotion / validation for parameter type / "percent" -> 101', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "101" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 101,
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
            it('Create new provider promotion / validation for parameter type / "percent" -> 0', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "0" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 0,
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
            it('Create new provider promotion / validation for parameter type / "weekDays" -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "0dd" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": 2
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "weekDays" -> string', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "strinwee" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": "sdfdf"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "weekDays" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "weboo" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": true
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "weekDays" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "wenull" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": null
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "name" -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": 123456,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
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
            it('Create new provider promotion / validation for parameter type / "name" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": true,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
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
            it('Create new provider promotion / validation for parameter type / "name" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": null,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
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
            it('Create new provider promotion / validation for parameter format / "startDate"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "stardattte" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-0T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-0T00:00:00.000Z",
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
            it('Create new provider promotion / validation for parameter format / "endDate"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "endddat" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-0T23:59:59.999Z",
                        "percent": 77,
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
            it('Create new provider promotion / validation for parameter format / "dayStartTime"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "strtimedate" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-0T00:00:00.000Z",
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
            it('Create new provider promotion / validation for parameter format / "dayEndTime"', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "enddrtimedate" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-0T23:59:59.999Z",
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
            it('Create new provider promotion / "weekDays" = 7', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "weeseven" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            7
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / "weekDays" = -1', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "minone" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            -1
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "startDate" -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "minone3333" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": 456456,
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "startDate" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "mindfg6one" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": true,
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "startDate" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "xxccc" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": null,
                        "endDate": "2018-01-01T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "endDate" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "xxccc33" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": true,
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "endDate" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "xxccc33null" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": null,
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "endDate" -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "num44ber" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": 454545,
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "dayStartTime" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "num44berwwww" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": true,
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "dayStartTime" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "num44bernull" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": null,
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "dayStartTime" -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "num44bernull345" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": 45345345,
                        "dayEndTime": "2018-01-02T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / Start date/time must be less than end date/time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "num44bernull34sdfs5" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T23:59:59.999Z",
                        "dayEndTime": "2018-01-01T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "dayEndTime" -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "mghjg" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": true,
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "dayEndTime" -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "mghjg222" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": 45444,
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / validation for parameter type / "dayEndTime" -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "mghjg222null" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": null,
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new provider promotion / Services ids  do not exist', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "errserdddv" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ProviderIdForPatch
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-03T23:59:59.999Z",
                        "weekDays": [
                            1, 4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create new provider promotion / invalid Provider ID in url', function (done) {
                api.post('/providers/' + 1231321 + ProviderIdForPatch + 12121 + '/promotions')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "errdfgdfgserv" + centre.name,
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-02T23:59:59.999Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-03T23:59:59.999Z",
                        "weekDays": [
                            1, 4
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


    describe('Get lis provider promotion object', function () {
        describe('HTTP responce code - 200', function () {
            it('Get provider promotion object / successful case', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/promotions/' + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Get provider promotion object / No Auth', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/promotions/' + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

        });
        describe('HTTP responce code - 400', function () {
            it('Get provider promotion object / Invalid providerId', function (done) {
                api.get('/providers/' + "invalid" + ProviderIdForPatch + '/promotions/' + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Get provider promotion object / Invalid promotionId', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/promotions/' + "invalid" + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 404', function () {
            it('Get provider promotion object / Not found provider ID', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/promotions/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
        });
    });


    describe('Delete  provider promotion object', function () {
        describe('HTTP responce code - 200', function () {
            it('Delete provider promotion object / successful case', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/promotions/' + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 400', function () {  });
        describe('HTTP responce code - 401', function () {
            it('Delete provider promotion object / Unauthenticated', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/promotions/' + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 404', function () {
            it('Delete provider promotion object / Unauthenticated', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/promotions/' + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        console.log(res.body);
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });

        });
    });



});