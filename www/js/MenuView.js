var MenuView = function(store) {

  this.initialize = function() {
    this.el = $("<div id='testingDiv'/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("swipe",".menuBuoy",this.favListSwipe);
    this.el.on("click",".deleteBtn",app.removeFavorite);
    this.el.on("click","#menuAddBuoy",this.hashChangeSearch);

    //DEBUG
    this.el.on("dblclick",".menuBuoy",this.favListSwipe);
  }

  this.render = function() {
    this.el.html(MenuView.template(store.getFavorites()));
    return this;
  }

  
  //STILL WORKING ON THIS FUNCTION
  
  this.favListSwipe = function() {
    var currentId = $(this).attr('id').substring(0,5);
    
    //adds delete button to swiped tr
    $("#"+currentId+"-li").append("<button id='"+currentId+"-delete' class='deleteBtn btn btn-danger pull-right'>Delete</button>");
    
    console.log(app.menuPage.el);
    console.log($("#testingDiv"));
    //remove all event handlers
    $("#testingDiv").off();
      
    //adds handler specific to delete button  
    $("#testingDiv").on("touchstart click", function() { 
      //if element that 
      console.log("add new event handler");
      if ($(this).hasClass("deleteBtn")) {
        $(".deleteBtn").remove();
        app.removeFavorite();
        $("#testingDiv").off();
        app.menuPage.registerEvents();
      }
      else {
        $("#testingDiv").off();
        app.menuPage.registerEvents();
      }   
    });
    
    
  }

  this.resizeElements = function() {
    $("#buoyTable").width(app.screenWidth - 20);
  }

  var _deleteBtnExists = function() {
    if ($(".deleteBtn").length) {
      return 1;
    }
    else {
      return 0;
    }
  }

  this.hashChangeSearch = function() {
    window.location.hash = "search";
  }

  this.initialize();
}

MenuView.template = Handlebars.compile($("#menu-tpl").html());