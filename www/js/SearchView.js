var SearchView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
  }

  this.registerEvents = function() {
    this.el.on("click",".collapseBtn",this.AKTest);
    this.el.on("submit","#test",app.validateBuoy);
  }

  this.AKTest = function() {
    console.log("AKTest");
    
    var selectedRegion = $(this).attr('id');
    //$(".collapseDiv").remove(".table");
    //$(".collapseDiv").html("");

    switch (selectedRegion) {
      case "listAlaskaBtn":
        $("#collapseGroup>.in").html("");
        $("#listAlaskaDiv").html(SearchView.listAlaska(listAlaska));
        $("#collapseGroup>.in").collapse("toggle");
        $('#listAlaskaDiv').collapse("toggle");
        break;
      case "listCaribbeanBtn":
        $("#collapseGroup>.in").html("");
        $("#listCaribbeanDiv").html(SearchView.listCaribbean(listCaribbean));
        $("#collapseGroup>.in").collapse("toggle");
        $('#listCaribbeanDiv').collapse("toggle");
        break;
    }
  }

  this.render = function() {
    this.el.html(SearchView.template());

    return this;
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
  }

  var _deleteBtnExists = function() {
    if ($(".deleteBtn").length) {
      return 1;
    }
    else {
      return 0;
    }
  }

  this.initialize();
}

SearchView.template = Handlebars.compile($("#search-tpl").html());

SearchView.listAlaska = Handlebars.compile($("#listAlaska-tpl").html());
SearchView.listCaribbean = Handlebars.compile($("#listCaribbean-tpl").html());
SearchView.listChile = Handlebars.compile($("#listChile-tpl").html());
SearchView.listFlorida = Handlebars.compile($("#listFlorida-tpl").html());
SearchView.listFrance = Handlebars.compile($("#listFrance-tpl").html());
SearchView.listGreatLakes = Handlebars.compile($("#listGreatLakes-tpl").html());
SearchView.listHawaiianIslands = Handlebars.compile($("#listHawaiianIslands-tpl").html());
SearchView.listNortheastUsa = Handlebars.compile($("#listNortheastUsa-tpl").html());
SearchView.listNorthwestUsa = Handlebars.compile($("#listNorthwestUsa-tpl").html());
SearchView.listNovaScotia = Handlebars.compile($("#listNovaScotia-tpl").html());
SearchView.listSouthPacific = Handlebars.compile($("#listSouthPacific-tpl").html());
SearchView.listSoutheastUsa = Handlebars.compile($("#listSoutheastUsa-tpl").html());
SearchView.listSouthwestUsa = Handlebars.compile($("#listSouthwestUsa-tpl").html());
SearchView.listTropicalAtlantic = Handlebars.compile($("#listTropicalAtlantic-tpl").html());
SearchView.listUnitedKingdom = Handlebars.compile($("#listUnitedKingdom-tpl").html());
SearchView.listWesternAtlantic = Handlebars.compile($("#listWesternAtlantic-tpl").html());
SearchView.listWesternPacific = Handlebars.compile($("#listWesternPacific-tpl").html());


