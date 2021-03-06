
var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest = global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;
var emailForProviders = global.emailForProvidersProvider;
var centre = global.centreProvider;
var consumerObj = global.consumerObjProvider;
var ClinicIDForProvider = global.ClinicIDForProvider;
var ConsumerIDForProvider = global.ConsumerIDForProvider;
var ProviderIdForPatch = global.ProviderIdForPatch;
var ClinicIDForProviderPatch = global.ClinicIDForProviderPatch;
var ConsumerIDForProviderPatch = global.ConsumerIDForProviderPatch;
var ProviderIdForPatchAnyChanges = global.ProviderIdForPatchAnyChanges;



describe('Version - 1.0.0 ' +
    'Provider ' +
    ' Auto create and get  ID for test ', function () {


});


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

            }).timeout(40000 );


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

            it('Create new centre/Successfull case + get ID for patch to provider', function (done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : 'patch' + centre.name,
                        latitude : centre.latitude,
                        longitude: centre.longitude,
                        confirmed: centre.confirmed

                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        ClinicIDForProviderPatch= res.body.res.id;
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
            it('Create new consumer/Successfull case + get ID for patch to provider', function (done) {
                api.post('/consumers')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "email": 'patch' + consumerObj.email,
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
                        //   
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;

                        ConsumerIDForProviderPatch = res.body.res.id;
                        done();
                    })
                addContext(this, 'we do it');
            });
        })


    });

    describe('GET object -', function () {
        it('Should return 200 responce - /provider', function (done) {
            api.get('/providers/')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });

        }).timeout(40000 );

    });


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

                it('Create new Provider/ Successful case for patch any changes', function (done) {
                    api.post('/providers')
                        .set('Accept', 'aplication/json')
                        .set('Authorization', 'Bearer ' + token)
                        .send({

                            "email": "anyPatch" + emailForProviders,
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
                            ProviderIdForPatchAnyChanges = res.body.res.id;
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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

            it('Create new Provider / missed default centre ID', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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




        });
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Create new Provider / missed centre Ids', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
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

            it('Create new Provider / missed centre Ids', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
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

            it('Create new Provider with Invalid default centre id', function (done) {
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
                        "defaultCentreId": 1 + ClinicIDForProvider,
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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

            it('Create new Provider with different centre id and centreIds', function (done) {
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
                        "defaultCentreId": 1 + ClinicIDForProvider,
                        "centreIds": [
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / NULL for default centre ID', function (done) {
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
                        "defaultCentreId": null,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / NULL for centre Ids', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "defaultCentreId" -> number', function (done) {
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
                        "defaultCentreId": 1234567890,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "centreIds" -> number', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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

            it('Create new Provider / validation for parameter type / "centreIds" -> number', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "defaultCentreId" -> boolean', function (done) {
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
                        "defaultCentreId": false,
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Create new Provider / validation for parameter type / "centreIds" -> boolean', function (done) {
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });



        });
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
                        expect(res.statusCode).to.equal(401);
                        done();
                    });
            });

        })
    });




    describe('GET  provider', function () {

        describe('HTTP responce code - 200', function () {

                it('GET Provider object/successful case', function (done) {
                    api.get('/providers/'+ ProviderIdForPatch )
                        .set('Accept', 'aplication/json')
                        .set('Authorization', 'Bearer ' + token)
                        .end(function(err, res) {
                            expect(res.statusCode).to.equal(200);
                            done();
                        });

                });


        });
        describe('HTTP responce code - 400', function () {
            it('GET Provider object/successful case', function (done) {
                api.get('/providers/'+ ProviderIdForPatch + 1)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
        });
        describe('HTTP responce code - 401', function () { })
    });






    describe('Patch  provider', function () {
        describe('HTTP responce code - 200', function () {


            it('Create new Provider/ Successful case', function (done) {
                api.patch('/providers/' + ProviderIdForPatchAnyChanges)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
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
                        done();
                    });
                addContext(this, 'test is well');
            });


            it('Patch provider/ all parameters changed', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Patch provider/ change "waitingSlots"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": false,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Patch provider/ change "instantBooking', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": false,
                        "sponsored": false,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Patch provider/ change "bookingConfirmation"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": false,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

            it('Patch provider/ change "sponsored"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
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
                        "entityStart": "2019-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Patch provider/ change "minScheduleStep"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-01-01",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Patch provider/ change "entityStart"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2019-01-01"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Patch provider/ change "entityEnd"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Patch provider/ change "defaultCentreId" and "centreIds"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProviderPatch,
                        "centreIds": [
                            ClinicIDForProviderPatch
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
            it('Patch provider/ change "instantBookingConsumerIds"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProviderPatch
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });

        })
        describe('HTTP responce code - 400', function () {

            it('Patch Provider object / Invalid Provider ID', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + "dfgdg")
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "instantBooking" Number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": 456456,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "bookingConfirmation" Number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": 456456,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "sponsored" Number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": 456456332,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "entityStart" Number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": 0,
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "entityEnd" Number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-08",
                        "entityEnd": 2

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter format / "entityStart" incorrect format', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-0",
                        "entityEnd": "2021-05-03"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter format / "entityEnd" incorrect format', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-0"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider / invalid "defaultCentreId"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider + "!!!!____!",
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider / invalid "centreIds"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider + "!!!!____!"
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider / invalid "instantBookingConsumerIds"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider + "!!!!____!"
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

            it('Patch provider / "defaultCentreId" do not exist"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ConsumerIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider / different ID in "defaultCentreId" and "centreIds" parameters', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ConsumerIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                           
                        done();
                    });
            });
            it('Patch provider / "centreIds" do not exist"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ConsumerIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider / "instantBookingConsumerIds" do not exist"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ClinicIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "waitingSlots" -> string', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": "sdfsdf",
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "instantBooking" -> string', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": "dfgfdg",
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "bookingConfirmation" -> string', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": "dfgfdg",
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "sponsored" -> string', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": "dfgfdg",
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "minScheduleStep" -> string', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": "sdfsdfs",
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / "minScheduleStep" < 5', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 4,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "waitingSlots" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": true,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 7,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "minScheduleStep" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": true,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2020-05-01",
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "entityStart" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 7,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": true,
                        "entityEnd": "2021-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "entityEnd" -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 7,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2021-05-02",
                        "entityEnd": true

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "waitingSlots" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": null,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 7,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2021-05-02",
                        "entityEnd":  "2022-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "minScheduleStep" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": null,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2021-05-02",
                        "entityEnd":  "2022-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "entityStart" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": null,
                        "entityEnd":  "2022-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "entityEnd" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2022-05-02",
                        "entityEnd":  null

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "instantBooking" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": null,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2022-05-02",
                        "entityEnd":  "2023-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "bookingConfirmation" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": null,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2022-05-02",
                        "entityEnd":  "2023-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "sponsored" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": null,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2022-05-02",
                        "entityEnd":  "2023-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "defaultCentreId" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": null ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2022-05-02",
                        "entityEnd":  "2023-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "centreIds" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            null
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2022-05-02",
                        "entityEnd":  "2023-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider object / validation for parameter type / "instantBookingConsumerIds" -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 1,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 8,
                        "defaultCentreId": ClinicIDForProvider ,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            null
                        ],
                        "entityStart": "2022-05-02",
                        "entityEnd":  "2023-05-02"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });


        });





        describe('HTTP responce code - 401', function () {

            it('Patch Provider / Unauthenticated', function (done) {
                api.patch('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });
            });
        });

        describe('HTTP responce code - 404', function () {
            it('Patch Provider object / Not found provider ID', function (done) {
                api.patch('/providers/' + ClinicIDForProvider)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "waitingSlots": 3,
                        "instantBooking": true,
                        "bookingConfirmation": true,
                        "sponsored": true,
                        "minScheduleStep": 9,
                        "defaultCentreId": ClinicIDForProvider,
                        "centreIds": [
                            ClinicIDForProvider
                        ],
                        "instantBookingConsumerIds": [
                            ConsumerIDForProvider
                        ],
                        "entityStart": "2019-04-05",
                        "entityEnd": "2020-05-08"

                    })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });

        })






    });






    describe('Delete  provider', function () {
        describe('HTTP responce code - 200', function () {
            it('Delete Provider / successful case', function (done) {
                api.del('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });

        });
        describe('HTTP responce code - 400', function () {
            it('Delete Provider / Invalid provider ID', function (done) {
                api.del('/providers/' + ProviderIdForPatch + 1)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400,done)
            });
        });
        describe('HTTP responce code - 401', function () {
            it('Delete Provider / Invalid provider ID', function (done) {
                api.del('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'application/json')
                    .expect(401,done)
            });

        });
        describe('HTTP responce code - 404', function () {
            it('Delete Provider / Not found provider ID', function (done) {
                api.del('/providers/' + ProviderIdForPatch)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });
        })

    });




    describe('Patch  provider/Not Found', function () {
        describe('HTTP responce code - 200', function () { });
        describe('HTTP responce code - 400', function () { });
        describe('HTTP responce code - 401', function () { })
    });

});

