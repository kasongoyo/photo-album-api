'use strict';

//dependencies
const path = require('path');
const app = require(path.join(__dirname, '..', '..', 'app', 'application'));
const faker = require('faker');
let request = require('supertest');
request = require('superagent-defaults')(request(app));
const expect = require('chai').expect;



describe('Picture Router', function () {

    describe('Create Picture', function () {
        let albumId;
        before('create album', function (done) {
            const payload = {
                title: faker.lorem.words(2),
            }
            request
                .post('/albums')
                .send(payload)
                .end(function (err, res) {
                    albumId = res.body.id;
                    done();
                });
        });

        it('should successfully create picture', function (done) {
            const payload = {
                uri: faker.random.uuid(),
                album: albumId
            }
            request
                .post('/photos')
                .send(payload)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.uri).to.equal(payload.uri);
                })
                .end(done);
        });
    });


    describe('Filter Pictures', function () {
        let albumId;
        before('create album', function (done) {
            const payload = {
                title: faker.lorem.words(2),
            }
            request
                .post('/albums')
                .send(payload)
                .expect(200)
                .expect(function (res) {
                    albumId = res.body.id;
                })
                .end(done);
        });

        before('create photo', function (done) {
            const payload = {
                uri: faker.random.uuid(),
                description: 'Sugar industry',
                album: albumId
            }
            request
                .post('/photos')
                .send(payload)
                .end(done);
        });

        it(`should retrieve photo with keyword sugar in it's description`, function (done) {
            request
                .get('/photos/search?q=sugar')
                .expect(200)
                .expect(function (res) {
                    expect(res.body).to.have.lengthOf(1);
                })
                .end(done);
        })
    });


});
