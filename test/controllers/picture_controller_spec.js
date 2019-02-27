'use strict';

// dependencies
const path = require('path');
const faker = require('faker');
const expect = require('chai').expect;
const albumCtrl = require(path.join(__dirname, '..', '..', 'app', 'controllers', 'album_controller'));
const pictureCtrl = require(path.join(__dirname, '..', '..', 'app', 'controllers', 'picture_controller'));


describe('Picture Controller', function () {

    describe('Create Picture', function () {
        let albumId;
        before('create album', function (done) {
            const payload = {
                title: faker.lorem.words(2),
            }
            albumCtrl
                .create(payload)
                .then(result => {
                    albumId = result.id;
                    done();
                });
        });

        it('should successfully create picture', function (done) {
            const payload = {
                uri: faker.random.uuid(),
                album: albumId
            }
            pictureCtrl
                .create(payload)
                .then(result => {
                    expect(result.uri).to.equal(payload.uri);
                    done();
                });
        });

        it('should fail to create picutre without album', function (done) {
            const payload = {
                uri: faker.random.uuid(),
            }
            pictureCtrl
                .create(payload)
                .catch(error => {
                    expect(error).to.exist;
                    done();
                });
        });
    });
})