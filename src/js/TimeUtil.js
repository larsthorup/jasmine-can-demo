window.TimeUtil = {
    durationInEnglish: function(then, now) {
        var durationInMilliseconds = now.getTime() - then.getTime();
        var durationInSeconds = durationInMilliseconds / 1000;
        if(durationInSeconds === 0) {
            return 'now';
        } else {
            return durationInSeconds + ' seconds ago';
        }
    }
};