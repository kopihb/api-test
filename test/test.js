var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');


describe('Clinics GET request', function () {
    it('Should return 200 responce', function (done) {
        api.get('/clinics')
            .set('Accept', 'aplication/json')
            .expect(200,done);
    });
})


describe('Clinics create', function () {
    it('Create new clinic/Successfull case', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send({
                name: 'myClinic2',
                latitude: 0,
                longitude: 0,
                confirmed: true
            })
            .expect(200,done)
    });

    it('Create new clinic/with several words', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send({
                name: 'my Clinic several words 2',
                latitude: 0,
                longitude: 0,
                confirmed: true
            })
            .expect(200,done)
    });

    it('Create new clinic/name parameter with numbers', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send({
                name: 'myClinic 12345 2',
                latitude: 0,
                longitude: 0,
                confirmed: true
            })
            .expect(200,done)
    });

    it('Create new clinic/with the same title', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send({
                name: 'myClinic !#$%#$',
                latitude: 0,
                longitude: 0,
                confirmed: true
            })
            .expect(200,done)
        // .end(function(err, res) {
        //     if (err) return done(err);
        //     done();
        // });
    });
    it('Create new clinic/with  dublicate ', function(done) {
        api.post('/clinics')
            .set('Accept', 'aplication/json')
            .send({
                name: 'myClinic !#$%#$',
                latitude: 0,
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
            .send({
                email: "string",
                name: "string",
                phone: "string",
                receiveNotification: true,
                dontSentAdv: true,
                signedUp: true,
                entityStart: "2018-01-01T00:00:00.000Z",
                entityEnd: "2018-01-01T00:00:00.000Z"
            })
            .expect(200,done)
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



describe('TEST POST CLINIC', function () {


    it('Create new clinic/with the same title', function(done) {
        api.post('/clinics')
        //.set('Accept', 'aplication/json')
            .send({
                name: 'myClinics !#$%#$',
                latitude: 0,
                longitude: 0,
                confirmed: true
            })
            .expect(200,done)
    });
})
