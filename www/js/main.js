
var app = {

    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
    },

    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (hash.match(this.homeURL)) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            }
            else {
                this.homePage = new HomeView().render();
                this.slidePage(this.homePage);
            }
            return;
        }
        
        if (hash.match(this.mapURL)) {
            if (this.mapPage) {
                this.slidePage(this.mapPage);
            } 
            else {
                this.mapPage = new MapView().render();
                this.slidePage(this.mapPage);
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

    slidePage: function(page) {
     
        var currentPageDest,
            self = this;
     
        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }
     
        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();
     
        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }
     
        $('body').append(page.el);
     
        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });
    },
};

app.initialize();