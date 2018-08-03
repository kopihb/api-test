
var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest =global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;
var emailForProvidersDiscountSub = global.emailForProvidersDiscountSub;
var centre = global.centreSubCLinics;
var ClinicIDForSubClinic = global.ClinicIDForSubClinic;
var ClinicIDForSubClinicOther = global.ClinicIDForSubClinicOther;
var ClinicIDForSubClinicDelete = global.ClinicIDForSubClinicDelete;
var SubClinicForClinic = global.SubClinicForClinic;
var consumerObjforSubcategory = global.consumerObjforSubcategory;
var tokenOfmailCOnsumer  = '';
var tokenOfmailProvider = '';
var ConsumerIDForProvider= '';
var jwt = require('jsonwebtoken');
var mailProvider2= '';
///////----------------Create Token For Consumer -----------------------------//////////////
function createTokenForConsumer (email) {
    var tokenforConsumerNew = jwt.sign({
        "iss": "Online JWT Builder",
        "iat": 1533050900,
        "exp": 1564586900,
        "aud": "www.example.com",
        "sub": "jrocket@example.com",
        "email": email,
        "roles": [
            "CONSUMER",
            "CONSUMER"
        ]
    }, 'test_manul_key');
    return tokenforConsumerNew ;
};
function createTokenForProvider (email) {
    var tokenforConsumerNew = jwt.sign({
        "iss": "Online JWT Builder",
        "iat": 1533050900,
        "exp": 1564586900,
        "aud": "www.example.com",
        "sub": "jrocket@example.com",
        "email": email,
        "roles": [
            "PROVIDER",
            "PROVIDER"
        ]
    }, 'test_manul_key');
    return tokenforConsumerNew ;
}
describe('Version - 1.0.0 ' +
    ' centres ' +
    ' Auto create and get  ID for test ', function () {

    it('Create new centre/Successfull case ', function (done) {
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
                ClinicIDForSubClinic = res.body.res.id;
                done();
            });
        addContext(this, 'text' );
    });

    it('Create new consumer/Successfull case + get ID for attachment to provider', function (done) {
        api.post('/consumers')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "email": consumerObjforSubcategory.email,
                "firstName": consumerObjforSubcategory.firstName,
                "lastName": consumerObjforSubcategory.lastName,
                "phone": "phone ",
                "receiveNotification": true,
                "dontSentAdv": true,
                "signedUp": true,
                "entityStart": "2016-03-03",
                "entityEnd": "2021-04-04"
            })
            .end(function (err, res) {
                ConsumerIDForProvider = res.body.res.id;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                var mailCOnsumer = res.body.res.email;
                tokenOfmailCOnsumer = createTokenForConsumer(mailCOnsumer);
                done();
            })

    });

    it('Create new Provider/ Successful case', function (done) {
        api.post('/providers')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({

                "email": emailForProvidersDiscountSub+'sd',
                "waitingSlots": 0,
                "instantBooking": true,
                "bookingConfirmation": true,
                "sponsored": true,
                "minScheduleStep": 7,
                "defaultCentreId": ClinicIDForSubClinic,
                "centreIds": [
                    ClinicIDForSubClinic
                ],
                "instantBookingConsumerIds": [
                    ConsumerIDForProvider
                ],
                "entityStart": "2018-01-01",
                "entityEnd": "2018-01-02"

            })
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                mailProvider2 = res.body.res.email;
                tokenOfmailProvider = createTokenForProvider(mailProvider2);

                done();
            });
    });


    it('Create new centre/Successfull case  ID Other ', function (done) {
        api.post('/centres')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name : centre.name+'change',
                latitude : centre.latitude,
                longitude: centre.longitude,
                confirmed: centre.confirmed
            })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                ClinicIDForSubClinicOther = res.body.res.id;
                done();
            });
        addContext(this, 'text' );
    });

    it('Create new centre/Successfull case  ID FOR delete  ', function (done) {
        api.post('/centres')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name : centre.name+'delete',
                latitude : centre.latitude,
                longitude: centre.longitude,
                confirmed: centre.confirmed
            })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                ClinicIDForSubClinicDelete = res.body.res.id;
                done();
            });
        addContext(this, 'text' );
    });

    it('Delete centre/Successfull', function (done) {
        api.del('/centres/' + ClinicIDForSubClinicDelete)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200,done)
    });

});


describe('Subcategory', function () {


    describe('GET list - subcategory', function () {

        describe('HTTP responce code - 200 ', function () {
            it('Get list of subcategories', function (done) {
                api.get('/centres/'+ ClinicIDForSubClinic +'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });

            it('Get list of subcategories Successfull case /all roles can get list of categories', function (done) {
                api.get('/centres/'+ ClinicIDForSubClinic +'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });

            it('Get list of subcategories Unauthenticated', function (done) {
                api.get('/centres/'+ ClinicIDForSubClinicOther +'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });

            it('Get list of subcategories Not found/deleted centreId', function (done) {
                api.get('/centres/'+ ClinicIDForSubClinicDelete +'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    });

            });

        });

        describe('HTTP responce code - 400', function () {
            it('Get list of subcategories Not found/deleted centreId', function (done) {
                api.get('/centres/'+ ClinicIDForSubClinic+'sd' +'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    });

            });

        })

    });

    describe('Create subcategory', function () {


        describe('HTTP responce code - 200 ', function () {

            it('Create new subcategory /Successfull case', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "LOr"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        SubClinicForClinic = res.body.res.id;
                        console.log(SubClinicForClinic);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new subcategory/cyrillic name parameter', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "Лор"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new subcategory/name parameter with numbers', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "Лор33"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create new subcategory/name parameter with symbols', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "Лор33;.(-;№%,"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new Subcategory/with empty title', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": ""
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new Subcategory/with spaces', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": " "
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });



        describe('HTTP responce code - 400', function () {
            it('Create new Subcategory/with the same title', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "ЛорNew",
                        "latitude": 0,
                    "longitude": 0,
                    "confirmed": true
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create new Subcategory/with incorrect format of name field - boolean or int value', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": 122
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new Subcategory/with incorrect format of name field - null', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": null
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new subcategory/Invalid centre id', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic + 'sdfsd'+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "Logoped"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });

        describe('HTTP responce code - 401', function () {
            it('Create Create new Subcategory / Unauthenticated', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .send({
                        "name": "ЛорNew2"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new Subcategory/GUEST, BOOKING_USER, PROVIDER roles', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + tokenOfmailProvider)
                    .send({
                        "name": "ЛорNew2"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(403);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            describe('HTTP responce code - 403', function () {
            it('Create new Subcategory/CONSUMER roles', function (done) {
                api.post('/centres/'+ ClinicIDForSubClinic+'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + tokenOfmailCOnsumer)
                    .send({
                        "name": "LOrsdf"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(403);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        });
        describe('HTTP responce code - 404', function () {
            it('Create new subcategory/Not found centre id', function (done) {
                api.post('/centres/'+ '5b6025d1f75e01001024f900' +'/subcategories')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "Led"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        expect(res.body).to.exist;
                        done();
                    })
            });

        });

    });


    describe('Patch subcategory object', function () {

        describe('HTTP responce code - 200 ', function () {
            it('Patch subcategory/without any changes', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "originalName"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch subcategory/change `name` parameters', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "originalName2"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Patch subcategory/ (SUPER_ADMIN roles)', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "centerVika1"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

        });

        describe('HTTP responce code - 400 ', function () {
            it('Patch subcategory /Invalid subcategory ID', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "originalName323"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch subcategory/ Name - validation for parameter type', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": 32
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch subcategory/  parameter type null', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": null
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch subcategory/ name - empty', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": ""
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });


        describe('HTTP responce code - 401', function () {

            it('Patch subcategory/change `name` parameters', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .send({
                        "name": "originalName2"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });



        describe('HTTP responce code - 403', function () {
        it('Patch subcategory/CONSUMER roles', function (done) {
            api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                .set('Accept', 'aplication/json')
                .set('Authorization', 'Bearer ' + tokenOfmailCOnsumer)
                .send({
                    "name": "originalName2"
                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(403);
                    expect(res.body).to.exist;
                    done();
                })
        });
            it('Patch subcategory/GUEST roles', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + tokenOfmailProvider)
                    .send({
                        "name": "originalNamsd"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(403);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });

        describe('HTTP responce code - 404', function () {
            it('Patch subcategory/Not found', function (done) {
                api.patch('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ '5b603a34f75e010000000000')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        "name": "originalName32"
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(404);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });

    });

    describe('Delete centre ', function () {


        describe('HTTP responce code - 401 ', function () {
            it('Delete subcategory/CONSUMER roles', function (done) {
                api.del('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + tokenOfmailCOnsumer)
                    .expect(403,done)
            });
            it('Delete subcategory/GUEST roles', function (done) {
                api.del('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + tokenOfmailProvider)
                    .expect(403,done)
            });
            it('Delete subcategory/ PROVIDER and BOOKING_USER roles', function (done) {
                api.del('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + tokenOfmailProvider)
                    .expect(403,done)
            });

        });

        describe('HTTP responce code - 200 ', function () {
            it('Delete subcategory/successfull case', function (done) {
                api.del('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });

        });
        describe('HTTP responce code - 400 ', function () {
            it('Delete subcategory /Invalid subcategory ID', function (done) {
                api.del('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic + 'sdf')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400,done)
            });
        });

        describe('HTTP responce code - 401 ', function () {
            it('Delete subcategory / Unauthenticated', function (done) {
                api.del('/centres/'+ ClinicIDForSubClinic+'/subcategories/'+ SubClinicForClinic)
                    .set('Accept', 'application/json')
                    .expect(401,done)
            });
        });

        describe('HTTP responce code - 404 ', function () {
            it('Delete subcategory /not found', function (done) {
                api.del('/centres/'+ ClinicIDForSubClinicDelete +'/subcategories/'+ SubClinicForClinic )
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });
        })

    });

    describe('Patch centre object/Not found', function () {

        describe('HTTP responce code - 404 ', function () {

        })

    })

});

