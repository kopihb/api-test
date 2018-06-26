var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');

/*Global variable
*
* Change the settings for a new pass test
*
*/
var clinic = {
    name: 'Final',
    latitude: 0,
    longitude: 0,
    confirmed: true
}

var consumer = {
    email: "www@mail.com",
    name: "my@www.test",
    phone: "34534534",
    receiveNotification: true,
    dontSentAdv: true,
    signedUp: true,
    entityStart: "2018-01-01T00:00:00.000Z",
    entityEnd: "2018-01-01T00:00:00.000Z"
}
/*end global variable*/

describe('GET request', function () {
    it('Should return 200 responce - /clinics', function (done) {
        api.get('/clinics')
            .set('Accept', 'aplication/json')
            //.expect(200,done);
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('Should return 200 responce - /consumers', function (done) {
        api.get('/consumers')
            .set('Accept', 'aplication/json')
            .expect(200,done)
    });
    it('Should return 200 responce - /providers', function (done) {
        api.get('/providers')
            .set('Accept', 'aplication/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
})


describe('Clinics create', function () {

    it('Create new clinic/Successfull case', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(clinic)
            .expect(200,done)

    });

    it('Create new clinic/with several words', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                name : clinic.name + 'several',
                latitude : clinic.latitude,
                longitude: clinic.longitude,
                confirmed: clinic.confirmed
            })
            .expect(200,done)
        });

    it('Create new clinic/name parameter with numbers', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                name : clinic.name + 123658,
                latitude : clinic.latitude,
                longitude: clinic.longitude,
                confirmed: clinic.confirmed
            })
            .expect(200,done)
    });

    it('Create new clinic/with empty title', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                name : '',
                latitude : clinic.latitude,
                longitude: clinic.longitude,
                confirmed: clinic.confirmed
            })
            .expect(200,done)
    });

    it('Create new clinic/with missed name parameter', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                latitude : clinic.latitude,
                longitude: clinic.longitude,
                confirmed: clinic.confirmed
            })
            .expect(200,done)
    });

    it('Create new clinic/with  dublicate', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(clinic)
            .expect(200,done)
    });

    it('Create new clinic/incorrect format for latitude', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : '',
                    longitude: clinic.longitude,
                    confirmed: clinic.confirmed
                })
            .expect(200,done)
    });

    it('Create new clinic/with missed longitude', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : clinic.latitude,
                    longitude: '',
                    confirmed: clinic.confirmed
                })
            .expect(200,done)
    });

    it('Create new clinic/incorrect format for title/number instead of string', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : 0,
                    latitude : clinic.latitude,
                    longitude: clinic.longitude,
                    confirmed: clinic.confirmed
                })
            .expect(200,done)
    });

    it('Create new clinic/incorrect format for name parameter/null', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : null,
                    latitude : clinic.latitude,
                    longitude: clinic.longitude,
                    confirmed: clinic.confirmed
                })
            .expect(200,done)
    });

    it('Create new clinic/confirmed "false', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : clinic.latitude,
                    longitude: clinic.longitude,
                    confirmed: false
                })
            .expect(200,done)
    });

    it('Create new clinic/confirmed - validation for parameter type number', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : clinic.latitude,
                    longitude: clinic.longitude,
                    confirmed: 0
                })
            .expect(200,done)
    });

    it('Create new clinic/confirmed - validation for parameter type text', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : clinic.latitude,
                    longitude: clinic.longitude,
                    confirmed: 'text'
                })
            .expect(200,done)
    });

    it('Create new clinic/latitude - null instead of num', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : null,
                    longitude: 0,
                    confirmed: true
                })
            .expect(200,done)
    });

    it('Create new clinic/longitude - null instead of num', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : 0,
                    longitude: null,
                    confirmed: true
                })
            .expect(200,done)
    });

    it('Create new clinic/"confirmed" - null instead of boolean', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send(
                {
                    name : clinic.name + 'word',
                    latitude : 0,
                    longitude: 0,
                    confirmed: true
                })
            .expect(200,done)
    });

})

describe('Consumer create', function () {

    it('Create new consumer', function(done) {
        api.post('/consumers')
            .set('Accept', 'aplication/json')
            .send(consumer)
            .expect(200,done)
            // .end(function(err, res) {
            //     expect(res.body.name).to.equal(consumer.name);
            //     done();
            // });
    });

})



describe('Consumer check', function () {
    it('Check the name of the clinic for the ID number', function(done) {
        api.get('/clinics/5b23cbb99df54e58680a71a9')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body.name).to.equal("new clinic");
                done();
            });
    });

})

