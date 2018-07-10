

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzA3ODA5NTEsImV4cCI6MTUzMzQyNzIwMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEB0ZXN0Iiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiJdfQ.6DspCe-Ds23yxhSql-9gZCrTGCaCjZH1FAwT1NSCQfo';
/*Start create random value*/
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


var randomValueName = randomString(5); /*use for name*/
var randomNameForDublicate = randomString(8);
//var randomValueMail = randomString(7); /*use for mail*/
/*End create random value*/


/*Test data - clinic*/
var clinic = {
    name: randomValueName,
    latitude: 0,
    longitude: 0,
    confirmed: true
}

/*End test data - clinic and consumer*/

var ClinicID = "";
var ClinicName = "";




describe('Version - 1.0.0 ' +
    ' Clinics ' +
    ' Auto create and get  ID for test ', function () {

    it('Create new clinic/Successfull case + get ID', function (done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name : clinic.name,
                latitude : clinic.latitude,
                longitude: clinic.longitude,
                confirmed: clinic.confirmed

            })
            .end(function (err, res) {
                console.log(res.body);
                console.log(res.error);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                //expect(res.body).to.equal({});
                //expect(res.body.res.name).to.equal("namex");
                ClinicID = res.body.res.id;
                done();
            })
    });

    it('Create new clinic/Successfull case + get name for check duplicate', function (done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .set('Authorization', 'Bearer ' + token)
            .send({

                name : randomNameForDublicate,
                latitude : clinic.latitude,
                longitude: clinic.longitude,
                confirmed: clinic.confirmed

            })
            .end(function (err, res) {
                console.log(res.body);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                //expect(res.body).to.equal({});
                //expect(res.body.res.name).to.equal("namex");
                ClinicName = res.body.res.name;
                done();
            })
    });

})




describe('CLINIC', function () {


    describe('GET list - ', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Should return 200 responce - /clinics', function (done) {
                api.get('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });
        })


    })

    describe('Create clinic', function () {


        describe('HTTP responce code - 200 ', function () {


            it('Create new clinic/ several name parameter', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'several',
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(200,done)
            });


            it('Create new clinic/cyrillic name parameter', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : 'кирилиця' + clinic.name,
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(200,done)
            });

            it('Create new clinic/name parameter with numbers', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 123658,
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(200,done)
            });

            it('Create new clinic/name parameter with symbols', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + '!%$_^',
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(200,done)
            });

            it('Create new clinic/confirmed "false', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: false
                        })
                    .expect(200,done)
            });




        })



        describe('HTTP responce code - 400', function () {

            it('Create new clinic/ spaces for name parameter', function(done) {
                api.post('/clinics')
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


            it('Create new clinic/with empty title', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : '',
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new clinic/with the same title', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : clinic.name,
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed                    })
                    .expect(400,done)
            });

            it('Create new clinic/with missed name parameter', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new clinic/incorrect format for latitude', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new clinic/with missed longitude', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : clinic.latitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new clinic/incorrect format for title/number instead of string', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : 0,
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(400,done)
            });

            it('Create new clinic/incorrect format for name parameter/null', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : null,
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(400,done)
            });



            it('Create new clinic/confirmed - validation for parameter type number', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: 0
                        })
                    .expect(400,done)
            });


            it('Create new clinic/confirmed - validation for parameter type text', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: 'text'
                        })
                    .expect(400,done)
            });

            it('Create new clinic/latitude - null instead of num', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : null,
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400,done)
            });

            it('Create new clinic/longitude - null instead of num', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : 0,
                            longitude: null,
                            confirmed: true
                        })
                    .expect(400,done)
            });

            it('Create new clinic/"confirmed" - null instead of boolean', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : 0,
                            longitude: 0,
                            confirmed: null
                        })
                    .expect(400,done)
            });

            it('Create new clinic/incorrect format for latitude', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : '',
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(400,done)
            });

            it('Create new clinic/incorrect format for longitude', function(done) {
                api.post('/clinics')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name + 'word',
                            latitude : 0,
                            longitude: '',
                            confirmed: true
                        })
                    .expect(400,done)
            });


        })
    })

    describe('GET Clinic object - ', function () {

        describe('HTTP responce code - 200 ', function () {

            it('GET clinic object/successful case', function(done) {
                api.get('/clinics/' + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });

        })

        describe('HTTP responce code - 400 ', function () {

            it('GET clinic object/Invalid clinic ID', function(done) {
                api.get('/clinics/' + ClinicID + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400,done)
            });

        })

        describe('HTTP responce code - 404 ', function () {

            it('Delete clinic/not found', function (done) {
                api.get('/clinics/5b30f037de19bd000f1241ea'  )
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });

        })

    })

    describe('Patch clinic object', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Patch clinic object/without any changes', function (done) {
                api.patch('/clinics/' + ClinicID  )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        name : clinic.name,
                        latitude : clinic.latitude,
                        longitude: clinic.longitude,
                        confirmed: clinic.confirmed

                    })
                    .expect(200,done)
            });

            it('Patch clinic object / change all parameters', function (done) {
                api.patch('/clinics/' + ClinicID  )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({

                        name : clinic.name + 'changed',
                        latitude : 5,
                        longitude: 5,
                        confirmed: false

                    })
                    .expect(200,done)
            });


            it('Patch clinic object/change latitude', function(done) {
                api.patch('/clinics/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            latitude : 1
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/change longitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            longitude: 1
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/change longitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            confirmed: false
                        })
                    .expect(200,done)
            });


            it('Patch clinic object/name - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/latitude - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: clinic.name + 'changed',
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/longitude - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name: clinic.name + 'chafgfgnged',
                            latitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });


            it('Patch clinic object/change name', function(done) {
                api.patch('/clinics/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {

                            name : clinic.name

                        })
                    .expect(200,done)
            });


            it('Patch clinic object/name - check for duplicated clinics', function(done) {
                api.patch('/clinics/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : clinic.name,
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(200,done)
            });


        })

        describe('HTTP responce code - 400 ', function () {


            it('Patch clinic object/name - check for duplicated clinics', function(done) {
                api.patch('/clinics/' + ClinicID )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(
                        {
                            name : ClinicName,
                            latitude : clinic.latitude,
                            longitude: clinic.longitude,
                            confirmed: clinic.confirmed
                        })
                    .expect(400,done)
            });


            it('Patch clinic object/ spaces for "name" parameter', function(done) {
                api.patch('/clinics/' + ClinicID )
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

            it('Patch clinic object/name - empty', function(done) {
                api.patch('/clinics/' + ClinicID )
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



            it('Patch clinic object/name - validation for param type: boolean', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/latitude - validation for param type: boolean', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/longitude - validation for param type: boolean', function (done) {
                api.patch('/clinics/' + ClinicID)
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


            it('Patch clinic object/"confirmed" - validation for parameter type - "string"', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/"confirmed" - validation for parameter type - null', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/longitude - validation for parameter type - null', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/latitude - validation for parameter type - null', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/name - validation for parameter type - null', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/"confirmed" - validation for parameter type', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/longitude - validation for parameter type', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/latitude - validation for parameter type', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/Name - validation for parameter type', function (done) {
                api.patch('/clinics/' + ClinicID)
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

            it('Patch clinic object/Invalid clinic ID', function (done) {
                api.patch('/clinics/' + ClinicID + ClinicID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400, done)
            });
        })
    })

    describe('Delete clinic ', function () {

        describe('HTTP responce code - 200 ', function () {
            it('Delete clinic/Successfull', function (done) {
                api.del('/clinics/' + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200,done)
            });

        })
        describe('HTTP responce code - 400 ', function () {

            it('Delete clinic/not found', function (done) {
                api.del('/clinics/clinicId')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(400,done)
            });

        })
        describe('HTTP responce code - 404 ', function () {

            it('Delete clinic/not found', function (done) {
                api.del('/clinics/' + ClinicID)
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404,done)
            });

        })

    })

    describe('Patch clinic object/Not found', function () {

        describe('HTTP responce code - 404 ', function () {

            it('Patch clinic object/Not found', function (done) {
                api.patch('/clinics/5b30f32ede19bd000f1241ee')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(404, done)
            });

        })

    })

})

