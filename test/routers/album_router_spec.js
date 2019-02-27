'use strict';

//dependencies
const path = require('path');
const app = require(path.join(__dirname, '..', '..', 'app', 'application'));
const faker = require('faker');
let request = require('supertest');
request = require('superagent-defaults')(request(app));
const expect = require('chai').expect;



describe('Album Router', function () {

    describe('Create Album', function () {

        it('should successfully create album', function (done) {
            const payload = {
                title: faker.lorem.words(2),
            }
            request
                .post('/albums')
                .send(payload)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.title).to.equal(payload.title);
                })
                .end(done);
        });
    });


    describe('Filter Album', function () {
        before('create album', function (done) {
            const payload = [
                { "title": "Fashion show", },
                { "title": "coffee and cream", },
                { "title": "Kilimanjaro Marathon" },
                { "title": "Baking a cake" }
            ]
            request
                .post('/albums')
                .send(payload)
                .end(done);
        });

        it(`should retrieve album with keyword fashion in it's album title`, function (done) {
            request
            .get('/albums/search?q=fashion')
            .expect(200)
            .expect(function (res) {
                expect(res.body).to.have.lengthOf(1);
            })
            .end(done);
        })
    });


});
