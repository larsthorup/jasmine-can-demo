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

        describe('when a key is pressed that generates a match', function () {
            var keypressEvent;

            beforeEach(function () {
                spyOn(autoComplete, 'match').andReturn('mister');
                keypressEvent = spyOnEvent('#name', 'keypress');
                $('#name').trigger($.Event('keypress', {charCode: 109})); // Note: 'm'
            });

            it('should invoke the match function', function () {
                expect(autoComplete.match).toHaveBeenCalled();
            });

            it('should cancel the key event', function () {
                expect(keypressEvent).toHaveBeenPrevented();
            });

            it('should replace the value of the input field with the match', function () {
                expect($('#name')).toHaveValue('mister');
            });

        });

        describe('when a key is pressed that does not generate a match', function () {
            var keypressEvent;

            beforeEach(function () {
                spyOn(autoComplete, 'match').andReturn(null);
                keypressEvent = spyOnEvent('#name', 'keypress');
                $('#name').trigger($.Event('keypress', {charCode: 109})); // Note: 'm'
            });

            it('should not cancel the key event', function () {
                expect(keypressEvent).not.toHaveBeenPrevented();
            });
            it('should not change the value of the input field', function () {
                expect($('#name')).toHaveValue(''); // Note: keypress event has not changed the value yet
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