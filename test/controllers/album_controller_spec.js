'use strict';

// dependencies
const path = require('path');
const faker = require('faker');
const expect = require('chai').expect;
const albumCtrl = require(path.join(__dirname, '..', '..', 'app', 'controllers', 'album_controller'));


describe('Album Controller', function () {

    describe('Create Album', function () {
        it('should successfully create album', function (done) {
            const payload = {
                title: faker.lorem.words(2),
            }
            albumCtrl
                .create(payload)
                .then(result => {
                    expect(result.title).to.equal(payload.title);
                    done();
                });
        });

        it('should fail to create album when title is not provided', function (done) {
            const payload = {
                description: faker.lorem.words(5),
            }
            albumCtrl
                .create(payload)
                .catch(error => {
                    expect(error).to.exist;
                    done();
                });
        });
    });


    describe('Filter Albums', function () {
        before('create albums', function (done) {
            const payload = [
                { "title": "Coffee Shopping", },
                { "title": "coffee and cream",},
                { "title": "Kilimanjaro Marathon" },
                { "title": "Baking a cake" }
            ]
            albumCtrl
                .create(payload)
                .then(() => {
                    done();
                });
        });

        
        it(`should retrieve album with keyword coffee in it's album title`, function (done) {
            albumCtrl
            .search('coffee')
            .then(result => {
                expect(result).to.have.lengthOf(2);
                done();
            });
        });
    });

    // describe('Filter Pictures', function () {
    //     before('create albums', function (done) {
    //         const payload = [
    //             { "title": faker.random.words(), pictures: {name: "Coffee Shopping"} },
    //             { "title": faker.random.words(), pictures: {name: "coffee and cream"}},
    //             { "title": , pictures: {name: "Kilimanjaro Marathon"} },
    //             { "title": "Baking a cake" }
    //         ]
    //         albumCtrl
    //             .create(payload)
    //             .then(() => {
    //                 done();
    //             });
    //     });

        
    //     it(`should retrieve album with keyword coffee in it's album title`, function (done) {
    //         albumCtrl
    //         .search('coffee')
    //         .then(result => {
    //             expect(result).to.have.lengthOf(2);
    //             done();
    //         });
    //     });
    // });


});
