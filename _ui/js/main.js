if (typeof window.NOMS !== 'undefined') {
    throw 'NOMS already in use.';
}

window.NOMS = {
    init: function () {
        var self = this;

        self.events.parent = this;

        // PROPERTIES

        self.width = 640;
        self.height = 400;

        // SETUP

        // SVG Setup
        self.svg = d3.select("body").append("svg");
        self.svg.attr('width', self.width);
        self.svg.attr('height', self.height);

        // Get data
        self.fetchData();
    },
    events: {
        dataFetched: function (event) {
            var self = this.parent;

            self.db = self.modelData(event.data);
            self.draw();
        }
    },
    fetchData: function () {
        var self = this;

        $.ajax({
            url: '_ui/json/feeder.json',
            type: 'GET',
            dataType: 'json',
            complete: function(xhr, textStatus) {
                console.log('fetchData complete');
            },
            success: function(data, textStatus, xhr) {
                self.events.dataFetched({data: data});
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error('fetchData failed ', errorThrown);
            }
        });
    },
    modelData: function (data) {
        var self = this,
            sanitized;

        sanitized = {
            heartbeats: [],
            motions: [],
            feeds: []
        };

        data.forEach(function (item) {
            switch (item.event_type) {
                case 'heartbeat':
                    sanitized.heartbeats.push(new Date(item.event_timestamp));
                break;
                case 'motion':
                    sanitized.motions.push(new Date(item.event_timestamp));
                break;
                case 'feed':
                    sanitized.feeds.push(new Date(item.event_timestamp));
                break;
            }
        });

        return sanitized;
    },
    draw: function () {
        var self = this,
            dataset = self.db.feeds,
            circles;

        circles = self.svg.selectAll("circle").data(dataset).enter().append("circle");

        circles.attr("fill", "#50C4DE");

        circles.attr("cx", function(d, i) {
            return d.getHours() * (self.width / 24);
        });

        circles.attr("cy", function(d, i) {
            return self.height * Math.random();
        });

        circles.attr("r", function(d) {
            return Math.random() * 10;
        });
    }
};

$(document).ready(function () {
    NOMS.init();
});