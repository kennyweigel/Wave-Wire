var SearchView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    //this.el.on("click",".collapseBtn",this.AKTest);
    this.el.on("click",".searchRegion",this.regionCollapsible);
    this.el.on("submit","#test",app.validateBuoy);
    this.el.on("click","#searchBackBtn",this.hashChangeBack);
  }

  this.regionCollapsible = function() {
    var newTableHtml;
    //if region is already expanded reset the table to default
    if ($(this).hasClass("regionExpanded")) {
      newTableHtml = SearchView.searchTable(regions);
      $("#searchTableContainer").html(newTableHtml);
    }

    else {
      //if any other regions are expanded
      if ($("tr").hasClass("regionExpanded")) {
        newTableHtml = SearchView.searchTable(regions);
        $("#searchTableContainer").html(newTableHtml);
      }
      
      var testing;
      testing = $(this).attr('id');
      newTableHtml = SearchView.tableBuoys(window[testing]);
      //console.log($(this).attr('id'));
      console.log(newTableHtml);
      $(this).after(SearchView.tableBuoys(newTableHtml);
    }
  }

/*
  this.AKTest = function() {
    console.log("AKTest");
    
    var selectedRegion = $(this).attr('id');
    //$(".collapseDiv").remove(".table");
    //$(".collapseDiv").html("");

    if ($(this).hasClass("expandedRegion")) {
      $(this).removeClass("expandedRegion");

    }

    else {

    }

    switch (selectedRegion) {
      case "listAlaskaBtn":
        $("#collapseGroup>.in").html("");
        $("#listAlaskaDiv").html(SearchView.listBuoys(listAlaska));
        $("#collapseGroup>.in").collapse("toggle");
        $('#listAlaskaDiv').collapse("toggle");
        //$("#searchBuoyTable").width(app.screenWidth - 20);
        break;
      case "listCaribbeanBtn":
        $("#collapseGroup>.in").html("");
        $("#listCaribbeanDiv").html(SearchView.listBuoys(listCaribbean));
        $("#collapseGroup>.in").collapse("toggle");
        $('#listCaribbeanDiv').collapse("toggle");
        break;
    }
  }
*/

  this.render = function() {
    this.el.html(SearchView.template());
    $("body").html(this.el);
    $("#searchTableContainer").html(SearchView.searchTable(regions));
  }

  this.favListSwipe = function() {
    var currentId = $(this).attr('id').substring(0,5);
    if (_deleteBtnExists()) {
      $(".deleteBtn").remove();
    }
    else {
      $("#"+currentId+"-li>h3").append("<button id='"+currentId+"-delete' class='deleteBtn btn btn-danger pull-right'>Delete</button>");
    }
  }

  this.resizeElements = function() {
    $(".form-search").width(app.screenWidth - 20);
    $(".search-query").width(app.screenWidth - 116);
    $("#searchBuoyTable").width(app.screenWidth - 20);
  }

  var _deleteBtnExists = function() {
    if ($(".deleteBtn").length) {
      return 1;
    }
    else {
      return 0;
    }
  }

  this.hashChangeBack = function() {
    window.location.hash = app.previousHash;
  }

  this.initialize();
}

SearchView.template = Handlebars.compile($("#search-tpl").html());
SearchView.searchTable = Handlebars.compile($("#searchTable-tpl").html());
SearchView.tableBuoys = Handlebars.compile($("#tableBuoys-tpl").html());