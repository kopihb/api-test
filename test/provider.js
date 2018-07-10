
var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzA3ODA5NTEsImV4cCI6MTUzMzQyNzIwMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImVtYWlsIjoidGVzdEB0ZXN0Iiwicm9sZXMiOlsiU1VQRVJfQURNSU4iLCJTVVBFUl9BRE1JTiJdfQ.6DspCe-Ds23yxhSql-9gZCrTGCaCjZH1FAwT1NSCQfo';


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
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });

            });
        })
    })


    describe('Create provider', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })




    describe('GET  provider', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })






    describe('Patch  provider', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })






    describe('Delete  provider', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })




    describe('Patch  provider/Not Found', function () {
        describe('HTTP responce code - 200', function () { })
        describe('HTTP responce code - 400', function () { })
        describe('HTTP responce code - 401', function () { })
    })

})

