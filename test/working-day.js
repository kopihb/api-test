
var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest = global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;
var randomValueName = global.randomValueNameWorkingDay; /*use for name*/
var emailForProviders = global.emailForProvidersWorkingDay;
var centre = global.centreWorkingDay;
var consumerObj = global.consumerObjWorkingDay;
var ClinicIDForProvider = global.ClinicIDForProviderWorkingDay;
var ConsumerIDForProvider = global.ConsumerIDForProviderWorkingDay;
var ProviderIdForPatch = global.ProviderIdForPatchWorkingDay;
var WorkingDayId = global.WorkingDayIdWorkingDay;
var WorkingDayIdDublicateName = global.WorkingDayIdDublicateName;
var ClinicIDForProvider2 = global.ClinicIDForProvider2WorkingDay;



describe('Working-day', function () {

    describe('Create provider for auto test fot working day', function () {
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

        it('Create new centre/Successfull case + get ID for attachment to provider', function (done) {
            api.post('/centres')
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    name : centre.name + centre.name,
                    latitude : centre.latitude,
                    longitude: centre.longitude,
                    confirmed: centre.confirmed

                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.exist;
                    ClinicIDForProvider2= res.body.res.id;
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



    })

    describe('Get list provider working-day', function () {


        describe('HTTP responce code - 200', function () {
            it('Get list of provider working days', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/working-days')
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
            it('Get list of provider working days / Unauthenticated', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });


        });
        describe('HTTP responce code - 404', function () { });
    });

    describe('Create provider working days', function () {
        describe('HTTP responce code - 200', function () {
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

            it('Create provider working day for check duplicate patch name + get ID/ successful case', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": "dublicate" + randomValueName,
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
                        WorkingDayIdDublicateName = res.body.res._id;
                        done();
                    });

            });


            it('Create provider working day / end Time before start Time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "12cv",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1969-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });


            it('Create provider working day / change date into the day-off date', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "1",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "2018-01-01T08:00:00.000Z",
                                    "endTime": "2018-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });
        })
        describe('HTTP responce code - 400', function () {
            it('Create provider working day / The clinic ids is not assigned to provider', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider2,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });

            it('Create provider working day / validation for parameter type / name -> empty', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": "",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });

            it('Create provider working day / duplicate name', function (done) {
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter format / start Time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "strtimewww",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-0T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter format / end Time', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "endtimewww",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": "1970-01-0T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter type / end Time -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "endteee5ime",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": true
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter type / end Time -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "endtim111e",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": null
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter type / start Time -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "endtidgdfgdssme",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": null,
                                    "endTime": "1970-01-02T09:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter type / start Time -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "endtidfgme",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": true,
                                    "endTime": "1970-01-02T09:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter type / name -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": true,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": "1970-01-02T09:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });

            it('Create provider working day / validation for parameter type / name -> number', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": 45645645,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": "1970-01-02T09:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter type / name -> empty', function (done) {
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
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / validation for parameter type / name -> null', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": null,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": "1970-01-02T09:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / Invalid providerId', function (done) {
                api.post('/providers/' + ProviderIdForPatch + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "456546",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": "1970-01-02T09:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create provider working day / Invalid id Clinic', function (done) {
                api.post('/providers/' + ProviderIdForPatch +  '/working-days')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "en33333dtidfgme",
                            "timeSlots": [
                                {
                                    "centreId": ProviderIdForPatch + ProviderIdForPatch,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-02T09:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
        })
        describe('HTTP responce code - 401', function () {
            it('Create provider working day / Unauthenticated', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/working-days')
                    .set('Accept', 'aplication/json')
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
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });
        })
    })




    describe("Patch provider working day", function () {
        describe("HTTP responce code - 200", function () {

            it('Create provider working day / successful case', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
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
                        done();
                    });

            });

            it('Patch provider working day /end time is before start time', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });

            it('Patch provider working day / change date into day-off date', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-02T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });

            it('Patch provider working day / change "name"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "change22",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });

        });
        describe("HTTP responce code - 400", function () {

            it('Patch provider working day / change start Time', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chang333eds",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "197-01-01T09:00:00.000Z",
                                    "endTime": "1970-01-03T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / name - > duplicate key error', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": "dublicate" + randomValueName,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T09:00:00.000Z",
                                    "endTime": "1970-01-03T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / change end Time', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "345tg",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "197-01-01T09:00:00.000Z",
                                    "endTime": "1970-01-03T14:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });

            it('Patch provider working day / validation for parameter type / name -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": true,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / validation for parameter type / name -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": 65465465456,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / validation for parameter type / name -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": null,
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / validation for parameter type / start time -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chansdfsdfge22",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": true,
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / validation for parameter type / start time -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chgsdfge22",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": 5,
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / start time = end time', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chg2",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T16:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider working day / validation for parameter type / end time -> number', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chg2ssqqq",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": 0
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider working day / validation for parameter type / end time -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chssg2qqq",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": true
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider working day / validation for parameter type / end time -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chssfsdswwg2",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": null
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider working day / validation for parameter format / end time', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chssfsdfgdfdsg2",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-0T08:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });

        });
        describe("HTTP responce code - 401", function () {
            it('Patch provider working day / change "name"', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            "name": randomValueName + "chansssge22",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });
        });
        describe("HTTP responce code - 404", function () {
            it('Patch provider working day / Not found workingDayId', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + ProviderIdForPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "change22",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });

            });
        });
    })



    describe('Delete provider working-day', function () {

        describe('HTTP responce code - 200', function () {
            it('Delete provider working day / Successful case', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 400', function () {
            it('Delete provider day-off / Invalid provider Id', function (done) {
                api.del('/providers/' + ProviderIdForPatch +"invalid"+ '/working-days/' + WorkingDayId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Delete provider day-off / Invalid workingDayId', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId +"invalid")
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 401', function () {
            it('Delete provider working day / Unauthenticated', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId )
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 404', function () {
            it('Delete provider working day / Not found workingDayId', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
        });



    });

    describe("Patch after delete provider working day", function () {

        describe('HTTP responce code - 200', function () {
            it('Delete centre ID / Successful case', function (done) {
                api.del('/centres/' + ClinicIDForProvider )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });

        describe('HTTP responce code - 404', function () {
            it('Patch provider working day / Clinic don t exist', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chansdfsdge22",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });

            });

        });
        
        describe('HTTP responce code - 200', function () {
            it('Delete not assigned centre  / Successful case', function (done) {
                api.del('/centres/' + ClinicIDForProvider2 )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });

        describe('HTTP responce code - 200', function () {
            it('Patch provider working day / The clinic ids is not assigned to provider', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/working-days/' + WorkingDayId)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "name": randomValueName + "chansdfsdge22",
                            "timeSlots": [
                                {
                                    "centreId": ClinicIDForProvider2,
                                    "startTime": "1970-01-01T08:00:00.000Z",
                                    "endTime": "1970-01-01T16:00:00.000Z"
                                }
                            ]
                        })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });

            });

        })

    })

});