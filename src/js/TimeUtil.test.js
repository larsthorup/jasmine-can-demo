describe('TimeUtil', function () {
    describe('durationInEnglish', function () {
        it('now', function () {
            var t = new Date(2013, 10, 12, 7, 12, 14);
            expect(TimeUtil.durationInEnglish(t, t)).toBe('now');
        });

        it('seconds ago', function () {
            var then = new Date(2013, 10, 12, 7, 12, 10);
            var now = new Date(2013, 10, 12, 7, 12, 14);
            expect(TimeUtil.durationInEnglish(then, now)).toBe('4 seconds ago');
        });


    });
});