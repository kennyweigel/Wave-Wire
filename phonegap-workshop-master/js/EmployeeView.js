var EmployeeView = function() {
	
	this.initialize = function() {
		this.el = $('<div/>');
	};

	this.initialize();

	this.render = function() {
	    this.el.html(EmployeeView.template(employee));
	    return this;
	};



}

EmployeeView.template = Handlebars.complile($('#employee-tpl').html());