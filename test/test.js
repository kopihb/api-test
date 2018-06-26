var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');

/*Global variable
*
* Change the settings for a new pass test
*
* */
var clinic = {
    name: 'globalTest',
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
    it('Should return 200 responce - Clinic', function (done) {
        api.get('/clinics')
            .set('Accept', 'aplication/json')
            //.expect(200,done);
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('Should return 200 responce - Consumers', function (done) {
        api.get('/consumers')
            .set('Accept', 'aplication/json')
            .expect(200,done)
    });
    it('Should return 200 responce - Providers', function (done) {
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
            .send( {
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
            .send( {
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
            .send( {
                name : '',
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

