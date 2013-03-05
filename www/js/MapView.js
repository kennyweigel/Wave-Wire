

var MapView = function() {
	
	this.initialize = function() {
		this.el = $('<div/>');
		//this.el.on('click', '.add-location-btn', this.addLocation);
		//this.el.on('click', '.add-contact-btn', this.addToContacts);
		//this.el.on('click', '.change-pic-btn', this.changePicture);
	};

	this.render = function() {
	    this.el.html(MapView.template());
	    return this;
	};
	
	this.initialize();
}

MapView.template = Handlebars.compile($('#map-tpl').html());