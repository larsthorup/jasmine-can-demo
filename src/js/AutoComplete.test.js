describe('AutoComplete', function () {
    var autoComplete;

    beforeEach(function () {
        jasmine.configure();
        $('<input id="name" />').appendTo('#sandbox');
    });

    describe('when constructed with an explicit list', function () {

        beforeEach(function () {
            autoComplete = new AutoComplete('#name', {
                list: ['lars', 'matt', 'mike', 'nick', 'kin']
            });
        });

        it('should add class auto-complete', function () {
            expect($('#name')).toHaveClass('auto-complete');
        });

        describe('match', function () {
            var match;

            describe('when called with an empty string', function () {
                beforeEach(function () {
                    match = autoComplete.match('');
                });
                it('should return null', function () {
                    expect(match).toBeNull();
                });
            });

            describe('when called with a non-unique prefix', function () {
                beforeEach(function () {
                    match = autoComplete.match('m');
                });
                it('should return null', function () {
                    expect(match).toBeNull();
                });
            });

            describe('when called with a unique prefix', function () {
                beforeEach(function () {
                    match = autoComplete.match('mi');
                });
                it('should return the match', function () {
                    expect(match).toBe('mike');
                });
            });

        });

    });


    describe('when constructed with an ajax url', function () {

        describe('when the ajax request succeeds', function () {
            beforeEach(function () {
                can.fixture('/getNames', function (original, respondWith) {
                    respondWith({list: ['rachel', 'lakshmi']});
                });
                autoComplete = new AutoComplete('#name', {
                    listUrl: '/getNames'
                });
                jasmine.Clock.tick(can.fixture.delay);
            });

            it('should use the returned list of names', function () {
                expect(autoComplete.options.list).toEqual(['rachel', 'lakshmi']);
            });
        });

        describe('when the ajax request fails', function () {
            beforeEach(function () {
                can.fixture('/getNames', function (original, respondWith) {
                    respondWith(500);
                });
                autoComplete = new AutoComplete('#name', {
                    listUrl: '/getNames'
                });
                jasmine.Clock.tick(can.fixture.delay);
            });
            it('should use an empty list', function () {
                expect(autoComplete.options.list).toEqual([]);
            });
        });

    });

});