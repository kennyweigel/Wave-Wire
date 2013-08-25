/*jslint browser: true*/
/*global $, app, Handlebars*/
var BuoyView = function () {
    "use strict";
    
    this.initialize = function () {
        this.el = $('<div/>');
        this.registerEvents();
    };

    this.registerEvents = function () {
        this.el.on("click", "#buoyBack", app.hashChangeBack);
    };

    this.render = function () {
        this.el.html(BuoyView.template({title: app.selectedBuoy}));
        return this;
    };
    
    this.initialize();
};

BuoyView.template = Handlebars.compile($("#buoy-tpl").html());