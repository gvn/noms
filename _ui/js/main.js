if (typeof window.CFV !== 'undefined') {
    throw 'CFV already in use.';
}

window.CFV = {
    init: function () {
        var self = this;
    },
    fetchData: function () {
    	var self = this;

    	$.ajax({
			url: '_ui/json/feeder.json',
			type: 'GET',
			dataType: 'json',
			complete: function(xhr, textStatus) {},
			success: function(data, textStatus, xhr) {
				self.db = data;
			},
			error: function(xhr, textStatus, errorThrown) {
				console.error('fetchData failed ', errorThrown);
			}
    	});
    }
};

$(document).ready(function () {
    CFV.init();
});