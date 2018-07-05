











describe('Patch Consumer object',  function ()  {

    describe('HTTP responce code - 200 ', function () {

        it('Patch Consumer object / change name param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "change name patch",
                        "phone": "phone patch",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change phone param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change "receiveNotification" param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change "dontSentAdv" param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": true,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change "signedUp" param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "entityStart": "2018-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change Start date param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "entityStart": "2017-01-01",
                        "entityEnd": "2018-01-01"
                    })
                .expect(200,done)
        });

        it('Patch Consumer object / change End date param', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch",
                        "phone": "phone patch",
                        "receiveNotification": false,
                        "dontSentAdv": false,
                        "signedUp": false,
                        "entityStart": "2017-01-01",
                        "entityEnd": "2019-02-02"
                    })
                .expect(200,done)
        });


        it('Patch Consumer object / change all parameters', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch all",
                        "phone": "phone patch all",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                .expect(200,done)
        });
    })


    describe('HTTP responce code - 400 ', function () {

        it('Patch Consumer object / Invalid clinic ID', function(done) {
            api.patch('/consumers/IdConsumer' )
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch all",
                        "phone": "phone patch all",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                .expect(400,done)
        });
    })

})





describe('Patch Consumer object ', function () {


    describe('HTTP responce code - 404 ', function () {

        it('Patch Consumer object / Not found', function(done) {
            api.patch('/consumers/' + ConsumerID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        "name": "name patch all",
                        "phone": "phone patch all",
                        "receiveNotification": true,
                        "dontSentAdv": true,
                        "signedUp": true,
                        "entityStart": "2020-03-03",
                        "entityEnd": "2021-04-04"
                    })
                .expect(404,done)
        });

    })

})


describe('GET Clinic object - ', function () {

    describe('HTTP responce code - 200 ', function () {

        it('GET clinic object/successful case', function(done) {
            api.get('/clinics/' + ClinicID)
                .set('Accept', 'application/json')
                .expect(200,done)
                // .end(function(err, res) {
                //     expect(res.body.name).to.equal("new clinic");
                //     done();
                // });
        });

    })

    describe('HTTP responce code - 400 ', function () {

        it('GET clinic object/Invalid clinic ID', function(done) {
            api.get('/clinics/' + ClinicID + ClinicID)
                .set('Accept', 'application/json')
                .expect(400,done)
        });

    })

    describe('HTTP responce code - 404 ', function () {

        it('Delete clinic/not found', function (done) {
            api.get('/clinics/' + ClinicID )
                .set('Accept', 'application/json')
                .expect(404,done)
        });

    })

})




describe('GET Consumer object - ', function () {

    describe('HTTP responce code - 200 ', function () {

        it('GET consumer object/successful case', function(done) {
            api.get('/consumers/' + IdConsumer)
                .set('Accept', 'application/json')
                .expect(200,done)

    })

    describe('HTTP responce code - 400 ', function () {

        it('GET consumer object/Invalid clinic ID', function(done) {
            api.get('/consumers/5b3a354e9c62b00010dd63bf-f')
                .set('Accept', 'application/json')
                .expect(400,done)
        });

    })

    describe('HTTP responce code - 404 ', function () {

        it('Get consumer/not found', function (done) {
            api.get('/consumers/5b30f037de19bd000f1241ea')
                .set('Accept', 'application/json')
                .expect(404,done)
        });

    })

})
    })

describe('Patch clinic object', function () {

        describe('HTTP responce code - 200 ', function () {

            it('Patch clinic object/change name', function(done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
                .send(
                    {
                        name : 'patch'
                    })
                .expect(200,done)
            });



            it('Patch clinic object/name - empty', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            name : ' '
                        })
                    .expect(200,done)

            });

            it('Patch clinic object/change latitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            latitude : 1
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/change longitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            longitude: 1
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/change longitude', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            confirmed: false
                        })
                    .expect(200,done)
            });


            it('Patch clinic object/name - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
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
                    .send(
                        {
                            name: 'patch',
                            longitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });

            it('Patch clinic object/longitude - missed parameter', function(done) {
                api.patch('/clinics/' + ClinicID)
                    .set('Accept', 'aplication/json')
                    .send(
                        {
                            name: 'patch',
                            latitude: 0,
                            confirmed: true
                        })
                    .expect(200,done)
            });
        })

    describe('HTTP responce code - 400 ', function () {

        it('Patch clinic object/name - validation for param type: boolean', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
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
                .send(
                    {
                        name: 'patch',
                        latitude: true,
                        longitude: 0,
                        confirmed: true
                    })
                .expect(400, done)
        });

        it('Patch clinic object/longitude - validation for param type: boolean', function (done) {
            api.patch('/clinics/' + ClinicID)
                .set('Accept', 'aplication/json')
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
                .expect(400, done)
        });


    })

    describe('HTTP responce code - 404 ', function () {

        it('Patch clinic object/Not found', function (done) {
            api.patch('/clinics/5b30f32ede19bd000f1241ee')
                .set('Accept', 'aplication/json')
                .expect(404, done)
        });

    })


})
