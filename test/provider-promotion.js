
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
var ServiceIdForChangePatch = global.ServiceIdForChangePatch;
var ProviderIdForPatch27 = global.ProviderIdForPatch27;
var SubClinicIDForProvider = global.SubClinicIDForProvider;
var unitNumberID = global.unitNumberID;
var unitNumberIDPatch = global.unitNumberIDPatch;
var unitNumberNamePatch = global.unitNumberNamePatch;
describe('Provider  promotion', function () {



    describe('Create provider for auto test fot promotion', function () {

        it('Create new MasterService(serviceUnitNumbers)/Successfull case + get ID for attachment to centre', function (done) {
            api.post('/master-services')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name : centre.name,
                    tags: [
                        "string"
                    ]
                })
                .end(function (err, res) {

                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    unitNumberID= res.body.res.unitNumber;
                    done();
                })
        });

        it('Create new MasterService(serviceUnitNumbers)/Successfull case + get ID for attachment to centre', function (done) {
            api.post('/master-services')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name : "patch" + centre.name,
                    tags: [
                        "ghj"
                    ]
                })
                .end(function (err, res) {

                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    unitNumberIDPatch= res.body.res.unitNumber;
                    unitNumberNamePatch = res.body.res.name;
                    // console.log(res.body.res.name);

                    done();
                })
        });

        it('Create new centre/Successfull case + get ID for attachment to provider', function (done) {
            api.post('/centres')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name : centre.name,
                    latitude : centre.latitude,
                    longitude: centre.longitude,
                    confirmed: centre.confirmed,
                    serviceUnitNumbers: [
                        unitNumberID,
                        unitNumberIDPatch
                     ]
                })
                .end(function (err, res) {

                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    ClinicIDForProvider= res.body.res.id;
                    done();
                })
        });


        it('Create new centre SUBCATEGORIES/Successfull case + get ID for attachment to provider', function (done) {
            api.post('/centres/' + ClinicIDForProvider + '/subcategories')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name : "subNameCli",

                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    SubClinicIDForProvider= res.body.res.id;
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
                    "receiveNewsLetters": true,
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
                    "entityEnd": "2018-01-03"

                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    ProviderIdForPatch = res.body.res.id;
                    done();
                });
        });
        it('Create new Provider/ Successful case FOR DELETE', function (done) {
            api.post('/providers')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({

                    "email": emailForProviders+ 'trtrtr',
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
                    ProviderIdForPatch27 = res.body.res.id;

                    done();
                });
        });


        it('Delete Provider / successful case', function (done) {
            api.del('/providers/' + ProviderIdForPatch27)
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(200,done)
        });

        it('Create new Provider/ SERVICE ID', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/services')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({

                    "name": centre.name,
                    "currency": "rterkk",
                    "centreId": ClinicIDForProvider,
                    "subcategoryId": SubClinicIDForProvider,
                    "unitNumber": unitNumberID,
                    "tags": [
                        "eer"
                    ],
                    "entityStart": "2018-01-01",
                    "entityEnd": "2020-01-03",
                    "restrictions": [
                        {
                            "startTime": "2017-01-01T00:00:00.000Z",
                            "endTime": "2018-01-03T23:59:59.000Z",
                            "weekDays": [
                                2,
                                4,
                                6
                            ]
                        }
                    ]

                })
                .end(function(err, res) {

                    expect(res.statusCode).to.equal(200);
                    ServiceId = res.body.res._id;
                    done();
                });
        });

        it('Create new Provider/ SERVICE ID  and get id for patch', function (done) {
            api.post('/providers/' + ProviderIdForPatch + '/services')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    "name": unitNumberNamePatch ,
                    "currency": "klkl",
                    "centreId": ClinicIDForProvider,
                    "subcategoryId": SubClinicIDForProvider,
                    "unitNumber": unitNumberIDPatch,
                    "tags": [
                        "rer"
                    ],
                    "entityStart": "2020-01-01",
                    "entityEnd": "2021-02-03",
                    "restrictions": [
                        {
                            "startTime": "2010-01-02T00:00:00.000Z",
                            "endTime": "2015-01-05T23:59:59.000Z",
                            "weekDays": [
                                2, 4, 5
                            ]
                        }
                    ]


                })
                .end(function(err, res) {
                   console.log (ProviderIdForPatch);
                    console.log (centre.name + 'ds');
                    console.log (ClinicIDForProvider);
                    console.log (SubClinicIDForProvider);
                    console.log (unitNumberIDPatch);
                    expect(res.statusCode).to.equal(200);
                    ServiceIdForChangePatch = res.body.res.id;
                    done();
                });
        });



    });



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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 6,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "name": centre.name + 'ds',
                        "providerId": ProviderIdForPatch,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 6,
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 6,
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 0.1,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 100,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:59:59.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-03T23:59:59.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 6,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": "9",
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": true,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": null,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 101,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 0,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-0T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-0T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-0T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-0T23:59:59.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": true,
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": null,
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": 45345345,
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T23:59:59.000Z",
                        "dayEndTime": "2018-01-01T23:59:59.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ProviderIdForPatch
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-03T23:59:59.000Z",
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
                        "endDate": "2018-01-02T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-03T23:59:59.000Z",
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
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 6,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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





    describe('Patch provider promotion object', function () {
        describe('HTTP responce code - 200', function () {
            it('Patch provider promotion object / without any changes step 1 with 2', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "forPatch" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 45,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
            it('Patch provider promotion object / without any changes step 2 with 2', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "forPatch" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-01T23:59:59.000Z",
                        "percent": 45,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-02T23:00:00.000Z",
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
            it('Patch provider promotion object /change all parameters correctly', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "allchange" + centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2018-01-03T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-08T23:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change name', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "changeName" + centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2018-01-03T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-08T23:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change "startDate"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "changeNameDa" + centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2018-01-03T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2016-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-08T23:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change "endDate"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "changeend" + centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2020-01-03T23:59:59.000Z",
                        "percent": 55,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2016-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-08T23:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change "percent"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "changeend" + centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2020-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2016-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-08T23:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change "serviceIds"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2020-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2016-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-08T23:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {

                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change "dayStartTime"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": centre.name + 'sd',
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2020-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-04T01:00:00.000Z",
                        "dayEndTime": "2018-01-08T23:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {

                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change "dayEndTime"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2020-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-04T01:00:00.000Z",
                        "dayEndTime": "2020-01-08T22:59:59.000Z",
                        "weekDays": [
                            2, 4, 6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / change "weekDays"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2020-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3,
                            6
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / dayEndTime before dayStartTime', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chanweek3" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceId
                        ],
                        "dayStartTime": "2021-01-09T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3
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
            it('Patch provider promotion object / Start date/time must be less than end date/time', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chanweek3" + centre.name,
                        "startDate": "2018-01-07T00:00:00.000Z",
                        "endDate": "2018-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / "percent" = 0', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chanssweek3" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 0,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / "percent" = 101', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chanssdddweek3" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 101,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / "weekDays" = 7', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chanssdddddweek3" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
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
            it('Patch provider promotion object / "weekDays" = -1', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chanssdfgdddddweek3" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
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
            it('Patch provider promotion object / Invalid Services ids', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chweek3" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            "invalid" + ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / Invalid promotionId', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' + "invalid" + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chweek32www" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                             ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "name" -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": 35345345,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "name" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": null,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "name" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": true,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "startDate" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chww" + centre.name,
                        "startDate": true,
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "startDate" -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chwwss" + centre.name,
                        "startDate": 5645645,
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "startDate" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chwwssnullll" + centre.name,
                        "startDate": null,
                        "endDate": "2018-01-05T23:59:59.000Z",
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "endDate" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chw11wssnullll" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": null,
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "endDate" -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "chwwsss44snullll" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": 45646,
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "endDate" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "cllaa" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": true,
                        "percent": 88,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "percent" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "cllavvad2" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": true,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "percent" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "cllavvcvva" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": null,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "percent" -> string', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "34vas" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": "dfgdfg",
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "dayStartTime" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "34vasss" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": null,
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "dayStartTime" -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "34vass1ss11" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": 45645645,
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "dayStartTime" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "310s111" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": true,
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "dayEndTime" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "310s11q1" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": true,
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "dayEndTime" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "310sssav11q1" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": null,
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "dayEndTime" -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "31s0sssav11q1" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": 8949494,
                        "weekDays": [
                            4
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "weekDays" -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v11q1" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-09T00:00:00.000Z",
                        "weekDays": 4
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "weekDays" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v11sq1" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-09T00:59:59.000Z",
                        "weekDays": null
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter type / "weekDays" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v11sq1dd" + centre.name,
                        "startDate": "2018-01-04T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-09T00:59:59.000Z",
                        "weekDays": true
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter format / "startDate"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v11sq1dwwd" + centre.name,
                        "startDate": "2018-01-0T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-09T00:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter format / "endDate"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v1r1sq1dwwd7" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-0T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2018-01-09T00:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter format / "dayStartTime"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v1r1sq88" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-0T00:00:00.000Z",
                        "dayEndTime": "2018-01-09T00:59:59.000Z",
                        "weekDays": [
                            3
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch provider promotion object / validation for parameter format / "dayEndTime"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v1r1sq88c" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-0T00:59:59.000Z",
                        "weekDays": [
                            3
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
            it('Patch provider promotion object / change "weekDays"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .send({
                        "name": "chanwssseek" + centre.name,
                        "startDate": "2018-01-02T00:00:00.000Z",
                        "endDate": "2020-01-03T23:59:59.000Z",
                        "percent": 77,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-04T00:00:00.000Z",
                        "dayEndTime": "2020-01-08T23:59:59.000Z",
                        "weekDays": [
                            3
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
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });

            it('Delete provider promotion object / Not found providerId', function (done) {
                api.del('/providers/' + ProviderIdForPatch27 + '/promotions/' + ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });

        });
    });


    describe('Patch provider promotion object after deleting ', function () {

        describe('HTTP responce code - 404', function () {
            it('Patch provider promotion object / validation for parameter format / "dayEndTime"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/promotions/' +  ProviderPromotionID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "v1r1sq88c" + centre.name,
                        "startDate": "2018-01-01T00:00:00.000Z",
                        "endDate": "2018-01-09T00:59:59.000Z",
                        "percent": 47,
                        "serviceIds": [
                            ServiceIdForChangePatch
                        ],
                        "dayStartTime": "2018-01-01T00:00:00.000Z",
                        "dayEndTime": "2018-01-09T00:59:59.000Z",
                        "weekDays": [
                            3
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
});



