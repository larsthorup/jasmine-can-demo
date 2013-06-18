(function (window) {

    window.AutoComplete = can.Control({
    },
    {
        init: function () {

        },

        match: function (pattern) {
            var matches = [];
            can.each(this.options.list, function (key) {
                console.log(key);
                if (key.indexOf(pattern) === 0) {
                    matches.push(key);
                }
            });
            if (matches.length === 1) {
                return matches[0];
            } else {
                return null;
            }
        }
    });

})(window);