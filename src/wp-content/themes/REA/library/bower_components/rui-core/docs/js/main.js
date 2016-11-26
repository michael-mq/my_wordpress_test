$(".rui-user-menu.logged-out").click(function(e){
  e.preventDefault();
  RUI.Cookies.create('lmdstok','c29tZWNyYXp5bG9uZ2VtYWlsYWRkcmVzc0B5b21vbWEuY29tOjM1MzA0MjU4NjEwMDI6YjFhOGRkNGZkNTVlNzYzMzRiNjQxMzU2NzEyNjlhMmM=');
  RUI.User.setUserType();
});
$(".rui-user-menu.logged-in .rui-account-menu .last").click(function(e){
  e.preventDefault();
  RUI.Cookies.remove('lmdstok');
  RUI.User.setUserType();
});
$(".rui-icon-save").on('click',function(){
  $(document).trigger("rui-property-saved-event");
});

$('#LoginToggler').on('click',function(){
  if(RUI.User.isSignedIn){
    RUI.Cookies.remove('lmdstok');
    RUI.User.setUserType();
  }else{
    RUI.Cookies.create('lmdstok','c29tZWNyYXp5bG9uZ2VtYWlsYWRkcmVzc0B5b21vbWEuY29tOjM1MzA0MjU4NjEwMDI6YjFhOGRkNGZkNTVlNzYzMzRiNjQxMzU2NzEyNjlhMmM=');
    RUI.User.setUserType();
  }
});

$(document).ready(function() {
  // Shouldn't need to do this but need to because of this bug:
  // https://git.realestate.com.au/rui/rui-grunt-config/issues/21
  RUI.User.init();
});

var cp = {
    "getFooter": function(){
        var that = this;
        $.get('html/footer.html', function(data){
            that.renderCopyPaster(data);
        });
    },
    "getHeader": function(){
        var that = this;
        $.get('html/header-responsive.html', function(data){
            that.renderCopyPaster(data);
        });
    },
    "renderCopyPaster":function(data){
        $("body").append("<div class='rui-copy-paste-light-box'> <div class='rui-copy-model-overlay'></div> <div class='rui-copy-model'><h1 class='rui-impact'>CMD + C to grab the contents!</h1> <textarea class='selectText rui-input'>"+ data +"</textarea> </div> </div>");
        $(".selectText").focus(function(){
            $(this).select();
        });
        $(".selectText").trigger("focus");
        $(".rui-copy-model-overlay").on("click touchstart",function(){
            $(".rui-copy-paste-light-box").remove();
        })

    }
};
