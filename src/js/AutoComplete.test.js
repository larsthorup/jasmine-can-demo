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

    });

});