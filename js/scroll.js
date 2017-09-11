document.addEventListener("DOMContentLoaded",function(){
    var scroll=function(element){
        var href = element.getAttribute("href");
        var index = href.indexOf('#');
        var tag = href.substr(index);
        var offset = 72;
        if (window.innerWidth <= 770) {
            offset = 62;
        }
        var top = $(tag).offset().top - offset;
        $("html, body").animate({ scrollTop: top }, {duration: 400, easing: "easeOutSine"});

    },elements=document.querySelectorAll("a.scroll");

    var uri = document.baseURI;

    (function parse(index){

        var element=elements.item(index);
        var href = element.getAttribute("href");

        if (href && uri.indexOf(href) != -1) {
            scroll(element);
        }
        element.addEventListener("click",function(event){
            var from = uri;
            var to = event.currentTarget.href;

            var index0 = from.indexOf('#');
            var index1 = to.indexOf('#');

            if (index0 != -1) {
                from = from.substr(0, index0);
            }

            if (index1 != -1) {
                to = to.substr(0, index1);
            }

            if (from == to) {
                event.preventDefault();
                scroll(element);
            }
        });

        if(index>0) parse(index-1);

    })(elements.length-1);
});
