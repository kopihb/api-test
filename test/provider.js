

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://159.100.241.121:5002');
const addContext = require('mochawesome/addContext');



describe('Version - 1.0.0 ' +
    'Provider ' +
    ' Auto create and get  ID for test ', function () {

    // it('Create new provider/Successfull case + get ID', function (done) {
    //     api.post('/consumers')
    //         .set('Accept', 'aplication/json')
    //         .send({
    //             "email": consumerObj.email,
    //             "name": "name_auto",
    //             "phone": "phone ",
    //             "receiveNotification": true,
    //             "dontSentAdv": true,
    //             "signedUp": true,
    //             "entityStart": "2020-03-03",
    //             "entityEnd": "2021-04-04"
    //         })
    //         .end(function (err, res) {
    //             console.log(res.body);
    //             expect(res.statusCode).to.equal(200);
    //             expect(res.body).to.exist;
    //             //expect(res.body).to.equal({});
    //             //expect(res.body.res.name).to.equal("namex");
    //             ConsumerID = res.body.res.id;
    //             done();
    //         })
    //     addContext(this, 'we do it');
    // });

})


describe('PROVIDER', function () {

    describe('GET list -', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Should return 200 responce - /providers', function (done) {
                api.get('/providers')
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