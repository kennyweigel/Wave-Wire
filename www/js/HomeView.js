var HomeView = function() {

  this.render = function() {
      this.el.html(HomeView.template());
    return this;
  }

  this.initialize = function() {
    // Define a div wrapper for the view. The div wrapper is used to attach events.
    this.el = $('<div/>');
    this.registerEvents();
  }
  
  this.registerEvents = function() {
    this.el.on('submit','#test',validateBuoy);
  }
  
  this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());

function validateBuoy() {
  //form input value
  var input = $('#mainSearch');
  var inputVal = input.val().toUpperCase();
  //checks if buoy is already a favorite
  if (jQuery.inArray(inputVal, favorites) != -1) {
    app.showAlert(inputVal + ' is already a favorite','TITLE');
    input.val('');
  }
  else {
    //checks if buoy matches any buoy ids
    var idExists = 0;
    for (var i = 0; i<buoys.length; i++) {
      if (buoys[i].id == inputVal) {
        addFormBuoy(input,inputVal);
        idExists = 1;
        break;
      }
    }
    if (!idExists) {
      app.showAlert(inputVal + ' does not exist','TITLE DNE');
      input.val('');
    }
  }
}

function addFormBuoy(input,inputVal) {
  //gets number of direct children aka num favBuoys
  var n = $('#favBuoys > div').size();
  //appends a new accordion widget to list
  $("<div class='accordion-group'> \
    <div class='accordion-heading'> \
      <a class='accordion-toggle' data-toggle='collapse' data-parent='#favBuoys' href='#"+n+"'>" +
        inputVal +
      "</a> \
    </div> \
    <div id='"+n+"' class='accordion-body collapse'> \
      <div class='accordion-inner'> \
        Anim pariatur cliche... \
      </div> \
    </div> \
  </div>").appendTo('#favBuoys');
  //sets input field back to blank
  input.val('');
}