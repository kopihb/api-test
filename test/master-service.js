
var global = require('./global-variable');
var expect = global.expect;
var api = global.api;
var token = global.token;
var centre = global.centreCLinicsPromo;
var MasterServiceID = global.MasterServiceID;
var MasterServiceIDPatch = global.MasterServiceIDPatch;
var unitNumberID = global.unitNumberID;
var Invalidtoken = global.Invalidtoken;
var tokenConsumer = global.tokenConsumer;
var tokenProvider = global.tokenProvider;



describe('Master-service', function () {


    describe('Create master-service', function () {
        describe('HTTP responce code - 200', function () {
            it('Create new mastersevice/All fields/Successfull case+ get ID', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "masterService-" + centre.name,
                        tags: [
                            "string"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        unitNumberID= res.body.res.unitNumber;
                        MasterServiceID = res.body.res._id;
                        done();
                    })
            });
            it('Create new mastersevice/No tags field/Successfull case', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "34df-" + centre.name,
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/cyrillic name parameter', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "кирилиця"+ centre.name
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/name & tags parameter with numbers', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "5dd6trgh-" + centre.name,
                        tags: [
                            "stringdfsdf3444"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/name & tags parameter with symbols', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : ")(&(*^&*%&%$$#-" + centre.name,
                        tags: [
                            "&*^^%&^%&^"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

            it('Create new masterservice/ SUPER_ADMIN roles', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "345uioioo" + centre.name,
                        tags: [
                            "ertertr4"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });

        });
        describe('HTTP responce code - 400', function () {
            it('Create new masterservice/already created title', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "masterService-" + centre.name,
                        tags: [
                            "string"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/with missed name parameter', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        tags: [
                            "string"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/incorrect format for name parameter', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : 34534543,
                        tags: [
                            "string"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/incorrect format for tags parameter', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "4564-" + centre.name,
                        tags: [
                           45645645
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/incorrect format for name parameter/null', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : null,
                        tags: [
                            "retert"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/with empty title', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "",
                        tags: [
                            "rtyrtryhr"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/with space in the name & tags paramenter', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "",
                        tags: [
                            ""
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/incorrect format for tags parameter/null', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "dfgdfgr3" + centre.name,
                        tags: [
                            null
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/incorrect format for name parameter/boolean', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : true,
                        tags: [
                            null
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/incorrect format for tags parameter/boolean', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "dfgdfgr3ddd" + centre.name,
                        tags: [
                            true
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        describe('HTTP responce code - 401', function () {
            it('Create new masterservice/ Unauthenticated', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .send({
                        name : "345uioiooeee1" + centre.name,
                        tags: [
                            "ertertr4"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Create new masterservice/Invalid token', function (done) {
                api.post('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + Invalidtoken)
                    .send({
                        name : "345uioiooeee1" + centre.name,
                        tags: [
                            "ertertr4"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        describe('HTTP responce code - 404', function () {  });
    });





    describe('Get lis  master-service', function () {
        describe('HTTP responce code - 200', function () {
            it('Get list of masterservices/ (SUPER_ADMIN role)/successful case', function (done) {
                api.get('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    })
            });

        });
        describe('HTTP responce code - 400', function () {  });
        describe('HTTP responce code - 401', function () {
            it('Get list of masterservices / Unauthenticated', function (done) {
                api.get('/master-services')
                    .set('Accept', 'aplication/json')
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    })
            });

            it('Get list of masterservices/ PROVIDER role/successful case', function (done) {
                api.get('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + tokenProvider)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    })
            });

            it('Get list of masterservices / Unauthenticated - invalid token', function (done) {
                api.get('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + Invalidtoken)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(401);
                        done();
                    })
            });
        });
        describe('HTTP responce code - 403', function () {
            it('Get list of masterservices/ CONSUMER role/unsuccessful case', function (done) {
                api.get('/master-services')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + tokenConsumer)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(403);
                        done();
                    })
            });
        });
    });




    describe('Get lis master service object', function () {
        describe('HTTP responce code - 200', function () {
            it('Get masterservice object/(SUPER_ADMIN role)/successful case', function (done) {
                api.get('/master-services/' + MasterServiceID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        done();
                    })
            });

        });
        describe('HTTP responce code - 400', function () {
            it('Get masterservice object/Invalid masterservice ID', function (done) {
                api.get('/master-services/'+unitNumberID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(400);
                        done();
                    })
            });
        });
        describe('HTTP responce code - 401', function () {
            it('Get masterservice object/(PROVIDER role)', function (done) {
                api.get('/master-services/' + MasterServiceID)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + tokenProvider)
                    .end(function(err, res) {
                        console.log(res.body);
                        expect(res.statusCode).to.equal(401);
                        done();
                    })
            });
        });
        describe('HTTP responce code - 404', function () {

        });
    });





    describe('Patch master service', function () {
        describe('HTTP responce code - 200', function () {
            it('Create new masterservice/ for patch', function (done) {
                api.post('/master-services/')
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "patch" + centre.name,
                        tags: [
                            "testtest"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        MasterServiceIDPatch = res.body.res._id;
                        done();
                    })
            });

            it('Patch master service/without any changes', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "patch" + centre.name,
                        tags: [
                            "testtest"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/ change all parameters', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "change" + centre.name,
                        tags: [
                            "change"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/change name', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "chssssange" + centre.name,
                        tags: [
                            "change"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/change tag', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "chssssange" + centre.name,
                        tags: [
                            "dsfsdfsdf444"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master serviceclear name field and add some more tags', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        tags: [
                            "dsfsdfsdf444",
                            "dsfsdfsdfdgdfgdf444"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/clear tags field and leave just name field', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch)
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "ch" + centre.name,
                                            })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        describe('HTTP responce code - 400', function () {
            it('Patch master service/Invalid master service ID', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch + "invalid")
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "chssssangeddd" + centre.name,
                        tags: [
                            "dsfsdfsdf444"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/ Validation for name parameter type - null', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : null
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/ Validation for name parameter type - boolean', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : true
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/ Validation for tags parameter type - boolean', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "sdfsdfs"  + centre.name,
                        tags: [
                            true
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/ Validation for tags parameter type - boolean. One parameter type - boolean; one - string', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "sdfsdf55dddfg"  + centre.name,
                        tags: [
                            "dgdfffg",
                            true
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/ empty name field', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "",
                        tags: [
                            "dgdfffg"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
            it('Patch master service/ empty tags field', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch )
                    .set('Accept', 'aplication/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name : "",
                        tags: [
                            ""
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        describe('HTTP responce code - 401', function () {
            it('Patch master service/ Unauthenticated', function (done) {
                api.patch('/master-services/' + MasterServiceIDPatch)
                    .set('Accept', 'aplication/json')
                    .send({
                        name : "chsss6tyutyuange" + centre.name,
                        tags: [
                            "dsfsdfsdf444"
                        ]
                    })
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401);
                        expect(res.body).to.exist;
                        done();
                    })
            });
        });
        describe('HTTP responce code - 404', function () {  });
    });




});