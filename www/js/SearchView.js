var SearchView = function(store) {

  this.initialize = function() {
    this.el = $("<div/>");
    this.registerEvents();
    //var self = this;
    //var that = this;
    //console.log(self);
    //console.log(this);
  }

  this.registerEvents = function() {
    //this.el.on("click",".collapseBtn",this.AKTest);
    this.el.on("click",".searchRegion", {data: this}, this.regionCollapsible);
    this.el.on("submit","#test",app.validateBuoy);
    this.el.on("click","#searchBackBtn",this.hashChangeBack);
    this.el.on("click",".searchId",this.selectId);
    //$(".searchRegion").on("click",".searchRegion",this.regionCollapsible);
  }

  this.selectId = function() {
    console.log('hi');
    console.log($(this).text().length);
  }

  this.regionCollapsible = function() {
    var newTableHtml;
    //console.log(that);
    //console.log(self);
    //console.log(this);
    console.log(event.data);
    //if selected region is already expanded reset the table to default
    if ($(this).hasClass("regionExpanded")) {
      $("#searchBuoyTable").html(SearchView.searchTable(regions));
      if (self.iscroll) {
        console.log('Refresh iScroll');
        self.iscroll.refresh();
      } 
      else {
        console.log('New iScroll');
        self.iscroll = new iScroll($('#searchContent', self.el)[0], {hScrollbar: false, vScrollbar: false });
      }
    }

    else {
      //if any other regions are expanded
      if ($("tr").hasClass("regionExpanded")) {
        //default
        var newTableHtml = SearchView.searchTable(regions);
        //index of selected region
        var indexRegion = newTableHtml.indexOf($(this).attr("id"));
        //index of end of class attribute for selected region
        var indexClass = newTableHtml.indexOf("searchRegion") + 12;
        //index of end of </tr> for selected region
        var indexCloseTr = newTableHtml.indexOf("</tr>",indexRegion) + 4;//19
      
        var html1 = newTableHtml.substring(0,indexClass);
        var html2 = newTableHtml.substring(indexClass,indexCloseTr);
        var html3 = newTableHtml.substring(indexCloseTr);

        $("#searchBuoyTable").html(html1 + " regionExpanded" + html2 + SearchView.tableBuoys(window[$(this).attr('id')]) + html3);
        if (self.iscroll) {
          console.log('Refresh iScroll');
          self.iscroll.refresh();
        } 
        else {
          console.log('New iScroll');
          self.iscroll = new iScroll($('#searchContent', self.el)[0], {hScrollbar: false, vScrollbar: false });
        }
      }
      
      else {
        $(this).after(SearchView.tableBuoys(window[$(this).attr('id')]));
        $(this).addClass("regionExpanded");
        if (self.iscroll) {
          console.log('Refresh iScroll');
          self.iscroll.refresh();
        } 
        else {
          console.log('New iScroll');
          self.iscroll = new iScroll($('#searchContent', self.el)[0], {hScrollbar: false, vScrollbar: false });
        }
      }
    }
  }

  this.render = function() {
    this.el.html(SearchView.template());
    $("body").html(this.el);
    $("#searchBuoyTable").html(SearchView.searchTable(regions));
    if (this.iscroll) {
      console.log('Refresh iScroll');
      this.iscroll.refresh();
    } 
    else {
      console.log('New iScroll');
      this.iscroll = new iScroll($('#searchContent', self.el)[0], {hScrollbar: false, vScrollbar: false });
    }
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