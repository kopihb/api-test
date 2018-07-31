
var global = require('./global-variable');
var should = global.should;
var expect = global.expect;
var supertest =global.supertest ;
var api = global.api;
var addContext =  global.addContext;
var token = global.token;
var randomNameForDublicate = global.randomString(8);
var centre = global.centreCLinics;
var ClinicID = global.ClinicID;
var ClinicIDForCentreToken = global.ClinicIDForCentreToken;
var ClinicName = global.ClinicName;


describe('Version - 1.0.0 ' +
    ' centres ' +
    ' Auto create and get  ID for test ', function () {

    it('Create new centre/Successfull case + get ID', function (done) {
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
                    ClinicID = res.body.res.id;
                    done();
                });
            addContext(this, 'text' );
    });
    it('Create new centre/Successfull case + get ID for delete without token', function (done) {
        api.post('/centres')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name : "token" + centre.name,
                latitude : centre.latitude,
                longitude: centre.longitude,
                confirmed: centre.confirmed
            })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                ClinicIDForCentreToken = res.body.res.id;
                done();
            });
        addContext(this, 'text' );
    });
    it('Create new centre/Successfull case + get name for check duplicate', function (done) {
        api.post('/centres')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({

                name : randomNameForDublicate,
                latitude : centre.latitude,
                longitude: centre.longitude,
                confirmed: centre.confirmed

            })
            .end(function (err, res) {
                
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                ClinicName = res.body.res.name;
                done();
            })
    });

})




describe('centre', function () {


    describe('GET list - ', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Should return 200 responce - /centres', function (done) {
                api.get('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });
            it('Get list of clinics / Unauthenticated', function (done) {
                api.get('/centres')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });
        })


    })

    describe('Create centre', function () {


        describe('HTTP responce code - 200 ', function () {


            it('Create new centre/ several name parameter', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'several',
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(200,done)
            });


            it('Create new centre/cyrillic name parameter', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : 'кирилиця' + centre.name,
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(200,done)
            });

            it('Create new centre/name parameter with numbers', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 123658,
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(200,done)
            });

            it('Create new centre/name parameter with symbols', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + '!%$_^',
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(200,done)
            });

            it('Create new centre/confirmed "false', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: false
                        })
                    .expect(200,done)
            });




        })



        describe('HTTP responce code - 400', function () {

            it('Create new centre/ spaces for name parameter', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : " ",
                            latitude : 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400,done)
            });


            it('Create new centre/with empty title', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : '',
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new centre/with the same title', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : centre.name,
                        latitude : centre.latitude,
                        longitude: centre.longitude,
                        confirmed: centre.confirmed                    })
                    .expect(400,done)
            });

            it('Create new centre/with missed name parameter', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new centre/incorrect format for latitude', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new centre/with missed longitude', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : centre.latitude,
                            confirmed: centre.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new centre/incorrect format for title/number instead of string', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : 0,
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new centre/incorrect format for name parameter/null', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : null,
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(400,done)
            });



            it('Create new centre/confirmed - validation for parameter type number', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: 0
                        })
                    .expect(400,done)
            });


            it('Create new centre/confirmed - validation for parameter type text', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: 'text'
                        })
                    .expect(400,done)
            });

            it('Create new centre/latitude - null instead of num', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : null,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400,done)
            });

            it('Create new centre/longitude - null instead of num', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : 0,
                            longitude: null,
                            confirmed: true
                        })
                    .expect(400,done)
            });

            it('Create new centre/"confirmed" - null instead of boolean', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : 0,
                            longitude: 0,
                            confirmed: null
                        })
                    .expect(400,done)
            });

            it('Create new centre/incorrect format for latitude', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : '',
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400,done)
            });

            it('Create new centre/incorrect format for longitude', function(done) {
                api.post('/centres')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name + 'word',
                            latitude : 0,
                            longitude: '',
                            confirmed: true
                        })
                    .expect(400,done)
            });


        })
    })

    describe('GET centre object - ', function () {

        describe('HTTP responce code - 200 ', function () {

            it('GET centre object/successful case', function(done) {
                api.get('/centres/' + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });
            it('GET clinic object/ Unauthenticated', function(done) {
                api.get('/centres/' + ClinicID)
                    .set('Accept', 'application/json')
                    .expect(200,done)
            });

        })

        describe('HTTP responce code - 400 ', function () {

            it('GET centre object/Invalid centre ID', function(done) {
                api.get('/centres/' + ClinicID + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400,done)
            });

        })

        describe('HTTP responce code - 404 ', function () {

            it('Delete centre/not found', function (done) {
                api.get('/centres/5b30f037de19bd000f1241ea'  )
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });

        })

    })

    describe('Patch centre object', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Patch centre object/without any changes', function (done) {
                api.patch('/centres/' + ClinicID  )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        name : centre.name,
                        latitude : centre.latitude,
                        longitude: centre.longitude,
                        confirmed: centre.confirmed

                    })
                    .expect(200,done)
            });

            it('Patch centre object / change all parameters', function (done) {
                api.patch('/centres/' + ClinicID  )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        name : centre.name + 'changed',
                        latitude : 5,
                        longitude: 5,
                        confirmed: false

                    })
                    .expect(200,done)
            });


            it('Patch centre object/change latitude', function(done) {
                api.patch('/centres/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            latitude : 1
                        })
                    .expect(200,done)
            });

            it('Patch centre object/change longitude', function(done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            longitude: 1
                        })
                    .expect(200,done)
            });

            it('Patch centre object/change longitude', function(done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            confirmed: false
                        })
                    .expect(200,done)
            });


            it('Patch centre object/name - missed parameter', function(done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            latitude: 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });

            it('Patch centre object/latitude - missed parameter', function(done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: centre.name + 'changed',
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });

            it('Patch centre object/longitude - missed parameter', function(done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: centre.name + 'chafgfgnged',
                            latitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });


            it('Patch centre object/change name', function(done) {
                api.patch('/centres/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {

                            name : centre.name

                        })
                    .expect(200,done)
            });


            it('Patch centre object/name - check for duplicated centres', function(done) {
                api.patch('/centres/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : centre.name,
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(200,done)
            });


        })

        describe('HTTP responce code - 400 ', function () {


            it('Patch centre object/name - check for duplicated centres', function(done) {
                api.patch('/centres/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : ClinicName,
                            latitude : centre.latitude,
                            longitude: centre.longitude,
                            confirmed: centre.confirmed
                        })
                    .expect(400,done)
            });


            it('Patch centre object/ spaces for "name" parameter', function(done) {
                api.patch('/centres/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : " ",
                            latitude: 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400,done)

            });

            it('Patch centre object/name - empty', function(done) {
                api.patch('/centres/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : "",
                            latitude: 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400,done)

            });



            it('Patch centre object/name - validation for param type: boolean', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: true,
                            latitude: 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/latitude - validation for param type: boolean', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'gjghjghjghjttu',
                            latitude: true,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/longitude - validation for param type: boolean', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            longitude: true,
                            confirmed: true
                        })
                    .expect(400, done)
            });


            it('Patch centre object/"confirmed" - validation for parameter type - "string"', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            longitude: 0,
                            confirmed: 'patch'
                        })
                    .expect(400, done)
            });

            it('Patch centre object/"confirmed" - validation for parameter type - null', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            longitude: 0,
                            confirmed: null
                        })
                    .expect(400, done)
            });

            it('Patch centre object/longitude - validation for parameter type - null', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            longitude: null,
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/latitude - validation for parameter type - null', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: true,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/name - validation for parameter type - null', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: null,
                            latitude: 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/"confirmed" - validation for parameter type', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            longitude: 0,
                            confirmed: 0
                        })
                    .expect(400, done)
            });

            it('Patch centre object/longitude - validation for parameter type', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            longitude: 'qwerty',
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/latitude - validation for parameter type', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 'patch',
                            latitude: 'qwerty',
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/Name - validation for parameter type', function (done) {
                api.patch('/centres/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: 0,
                            latitude: 0,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400, done)
            });

            it('Patch centre object/Invalid centre ID', function (done) {
                api.patch('/centres/' + ClinicID + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400, done)
            });
        });


        describe('HTTP responce code - 401', function () {
            it('Patch clinic object / Unauthenticated', function (done) {
                api.patch('/centres/' + ClinicID  )
                    .set('Accept', 'aplication/json')
                    .send({

                        name : centre.name,
                        latitude : centre.latitude,
                        longitude: centre.longitude,
                        confirmed: centre.confirmed

                    })
                    .expect(401,done)
            });
        });






    })

    describe('Delete centre ', function () {

        describe('HTTP responce code - 200 ', function () {
            it('Delete centre/Successfull', function (done) {
                api.del('/centres/' + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });

        })
        describe('HTTP responce code - 400 ', function () {

            it('Delete centre/invalid id', function (done) {
                api.del('/centres/' + ClinicID + "invalid")
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400,done)
            });

        })

        describe('HTTP responce code - 401 ', function () {
            it('Delete clinic / Unauthenticated', function (done) {
                api.del('/centres/' + ClinicIDForCentreToken)
                    .set('Accept', 'application/json')
                    .expect(401,done)
            });
        });

        describe('HTTP responce code - 404 ', function () {

            it('Delete centre/not found', function (done) {
                api.del('/centres/' + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });

        })

    })

    describe('Patch centre object/Not found', function () {

        describe('HTTP responce code - 404 ', function () {

            it('Patch centre object/Not found', function (done) {
                api.patch('/centres/5b30f32ede19bd000f1241ee')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404, done)
            });

        })

    })

});

