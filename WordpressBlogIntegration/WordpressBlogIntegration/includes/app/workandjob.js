jQuery(document).ready(function ($) {

    const RESTURL = 'https://www.careerguide.com/career/wp-json/'

    var app = {
        
        init : function() {
            
            this.getSiteData()
            this.loadPosts()
           // this.loadCategories()
            this.loadEvents()
            
        },
        
        loadEvents : function() {
            
            $( '#workand-job' ).on( 'click', '.blog-post h3', this.loadSinglePost )
            $( '#workand-job' ).on( 'click', '.blog-post .thumbnail', this.loadSinglePost )
            
        },
        
        getSiteData : function() {
            
            $.get( RESTURL )
                .done( function( response ) {
                    $( '.site-title' ).html( response.name )
                    $( '.description' ).html( response.description )
                })
                .fail( function() {
                    alert( 'failed to call specified URL' )
                })

        },
        
        loadPosts : function() {
            
            var url = RESTURL +'wp/v2/posts?_embed&&categories=8792,45156,9198&per_page=100'
           
            $.get( url )
                .done( function( response ) {
                    
                    var posts = {
                        posts: response
                    }
                    
                    var template = $( '#blog-post-template4' ).html()
                    var output = $( '#workand-job' )
                                        
                    var result = Mustache.to_html( template, posts )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load posts' )
                })
            
        },
        
        loadCategories : function() {
            
            //var url = RESTURL + //'wp/v2/categories'
            
            $.get( url )
                .done( function( response ) {
                    
                    var categories = {
                        categories : response
                    }
                    
                    var template = $( '#blog-categories-template1' ).html()
                    var output = $( '#categories' )
                                        
                    var result = Mustache.to_html( template, categories )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load categories' )
                })
            
        },
        
        loadSinglePost : function() {
            
            var id = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/posts/' + id + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output = $( '#workand-job' )
                                        
                    var result = Mustache.to_html( template, response )
                    output.html( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load post' )
                })
            
        }
   
        
    }

    app.init();

});
