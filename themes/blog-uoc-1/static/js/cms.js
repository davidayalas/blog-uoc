/**
 * JavaScript Get URL Parameter
 * 
 * @param String prop The specific URL parameter you want to retreive the value for
 * @return String|Object If prop is provided a string value is returned, otherwise an object of all properties is returned
 */
function getUrlParams( prop ) {
    var params = {};
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var definitions = search.split( '&' );

    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );

    return ( prop && prop in params ) ? params[ prop ] : params;
}

if(getUrlParams("cms")==="true"){
	console.log("loading cms objects...")

    var currentHost = window.location.host;
    var path = window.location.pathname;
    path = path.split("/").filter(function(value){
        if(value){
            return value;
        }
    });
    
    if(currentHost.indexOf(":")>-1){
        currentHost = currentHost.slice(0, currentHost.indexOf(":"));
    }

    $("a").each(function() {
        if(this.hostname===currentHost && this.href.indexOf("/admin/#/")===-1){
            this.href = this.href + "?cms=true";
        }
    })

    var strpagesection = "pàgina";
    var collection = path[1]+"_"+path[0];
    var entry = path[2]+"."+path[0];

    if(path.length>1){
        var editlink = $("#cms-editor-link-edit").attr("href").replace("@@collection@@", collection);
        if(path.length>2){
            $("#cms-editor-link-edit").css("display","block");
            editlink = editlink.replace("@@entry@@", entry);
        }else{
            $("#cms-editor-link-add").css("display","block");
            var addlink = $("#cms-editor-link-add").attr("href").replace("@@collection@@", collection);
            $("#cms-editor-link-add").attr("href", addlink);
            $("#cms-editor-link-edit").css("display","none");
        }
    }else{
        //home
        collection = "posts"+"_"+path[0];
        var addlink = $("#cms-editor-link-add").attr("href").replace("@@collection@@", collection);
        $("#cms-editor-link-add").attr("href", addlink);
        $("#cms-editor-link-edit").css("display","none");
        $("#cms-editor-link-add").css("display","block");
    }

    $("#cms-editor-link-edit").attr("href", editlink);
    var link_text = $("#cms-editor-link-edit-text").text();
    $("#cms-editor-link-edit-text").text(link_text.replace("@@pagesection@@", strpagesection));
    $("#cms-editor").css("display","block");
}