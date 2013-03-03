var app = {
/*
    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },
*/

    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            $('body').html(new HomeView(self.store).render().el);
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