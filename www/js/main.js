
var app = {

    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
    },

    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (hash.match(this.homeURL)) {
            if (this.homePage) {
                $('body').html(this.homePage.el);
                //this.slidePage(this.homePage);
            }
            else {
                this.homePage = new HomeView().render();
                $('body').html(this.homePage.el);
                //this.slidePage(this.homePage);
            }
            return;
        }
        
        if (hash.match(this.mapURL)) {
            if (this.mapPage) {
                $('body').html(this.mapPage.el);
                //this.slidePage(this.mapPage);
            } 
            else {
                this.mapPage = new MapView().render();
                $('body').html(this.mapPage.el);
                //this.slidePage(this.mapPage);
            } 
            return;
        }
    },

    initialize: function() {
        var self = this;
        this.homeURL = '#home';
        this.mapURL = '#map';
        window.location.hash = this.homeURL;
        this.registerEvents();
        this.store = new LocalStorageStore(function() {
            self.route();
        });
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } 
        else {
            alert(title ? (title + ": " + message) : message);
        }
    },
};

app.initialize();