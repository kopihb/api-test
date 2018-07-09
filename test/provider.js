
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');

let token={ 'test' : 'test' };


    describe('Version - 1.0.0 ' +
    'Provider ' +
    ' Auto create and get  ID for test ', function () {


})


describe('PROVIDER', function () {

    describe('GET list -', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Should return 200 responce - /providers', function (done) {
                api.get('/providers')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });
        })
    })

})