describe('AutoComplete', function () {
    var autoComplete;

    beforeEach(function () {
        // ToDo:
        // jasmine.configure();
        autoComplete = new AutoComplete(null, {
            list: ['lars', 'matt', 'mike', 'nick', 'kin']
        });
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