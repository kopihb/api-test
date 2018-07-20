var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest =global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;



var centre = global.centreDayOff;
var emailForProviders = global.emailForProvidersDayOff;
var dublicateData = global.dublicateData;
var consumerObj = global.consumerObjDayOff;
var DayOffId = global.DayOffIdDayOff;


var ClinicIDForProvider = global.ClinicIDForProviderDayOff;
var ConsumerIDForProvider = global.ConsumerIDForProviderDayOff;
var ProviderIdForPatch = global.ProviderIdForPatchDayOff;







describe('Days-off', function () {


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

    describe('Get list provider deys-off', function () {


        describe('HTTP responce code - 200', function () {
            it('Get list of provider days-off ', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });

            it('Get list of provider days-off / Not found provider Id ', function (done) {
                api.get('/providers/' + ConsumerIDForProvider + '/days-off')
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
            it('Get list of provider days-off / Invalid provider Id ', function (done) {
                api.get('/providers/' + ProviderIdForPatch + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
        });


        describe('HTTP responce code - 401', function () {
            it('Get list of provider days-off  / Unauthenticated', function (done) {
                api.get('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });


        });
        describe('HTTP responce code - 404', function () { });
    });

    describe('Create days-off', function () {


        describe('HTTP responce code - 200', function () {
            it('Create new provider day-off / Successful case', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": dublicateData
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        DayOffId = res.body.res._id;
                        done();
                    });

            });
        })

        describe('HTTP responce code - 400', function () {

            it('Create new provider day-off / Duplicate date', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": dublicateData
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create new provider day-off / validation for parameter format / "date" ', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2018-02-0"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create new provider day-off / validation for parameter type / "date"  -> null ', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": null
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create new provider day-off / validation for parameter type / "date"  -> boolean', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": true
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Create new provider day-off / Invalid provider Id', function (done) {
                api.post('/providers/' + ProviderIdForPatch + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2018-02-05"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });

        })


        describe('HTTP responce code - 401', function () {
            it('Create new provider day-off / Unauthenticated', function (done) {
                api.post('/providers/' + ProviderIdForPatch + '/days-off')
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            "date": "2018-05-20"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });
        })

        describe('HTTP responce code - 404', function () {
            it('Create new provider day-off / Unauthenticated', function (done) {
                api.post('/providers/' + ConsumerIDForProvider + '/days-off')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2018-05-20"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });

            });
        })


    });

    describe('Patch provider day-off', function () {

        describe('HTTP responce code - 200', function () {


            it('Patch provider day-off / set date', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2015-02-03"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });
            it('Patch provider day-off / without any changes', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2015-02-03"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });
        })
        describe('HTTP responce code - 400', function () {

            it('Patch provider day-off / Invalid provider Id', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + "invalid" + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2015-02-05"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider day-off / Invalid day-off Id', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId + "invalid" )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2015-02-05"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider day-off / validation for parameter format / date', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2015-02-0"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider day-off / validation for parameter type / date -> boolean', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": true
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });
            it('Patch provider day-off / validation for parameter type / date -> null', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": null
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });



        })
        describe('HTTP responce code - 401', function () {

            it('Patch provider day-off / Unauthenticated', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            "date": "2015-02-03"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });

            });


        })
        describe('HTTP responce code - 404', function () {
            it('Patch provider day-off / Not found provider Id', function (done) {
                api.patch('/providers/' + DayOffId + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2015-02-03"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });

            });

            it('Patch provider day-off / Not found day-off Id', function (done) {
                api.patch('/providers/' + ProviderIdForPatch + '/days-off/' + ProviderIdForPatch )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            "date": "2015-02-03"
                        })
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });

            });
        })

    })

    describe('Delete provider day-off', function () {

        describe('HTTP responce code - 200', function () {
            it('Delete provider day-off / successful case', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 400', function () {
            it('Patch provider day-off / Invalid provider Id', function (done) {
                api.del('/providers/' + ProviderIdForPatch +"invalid"+ '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
            it('Patch provider day-off / Invalid day-off Id', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId +"invalid")
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 401', function () {
            it('Delete provider day-off / Unauthenticated', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    });
            });
        });
        describe('HTTP responce code - 404', function () {
            it('Delete provider day-off / Not found dayOffId', function (done) {
                api.del('/providers/' + ProviderIdForPatch + '/days-off/' + DayOffId )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(404);
                        done();
                    });
            });
        });



    });


})