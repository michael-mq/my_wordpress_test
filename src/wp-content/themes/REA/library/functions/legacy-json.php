<?php

class functions_json
{
	var $json,
		$query;
		
	/*
	*  Constructor
	*
	*  @description: 
	*  @since 3.5.4
	*  @created: 28/11/12
	*/
	
	function __construct()
	{
		// filters
		add_action('template_redirect', array($this, 'template_redirect'), 1);
   	}
   	
   	/*
   	*  template_redirect
   	*
   	*  @description: 
   	*  @since: 3.5.7
   	*  @created: 14/01/13
   	*/
   	
   	function template_redirect()
   	{
   		$url = $_SERVER['REQUEST_URI'];

        if (strlen($url) <= 1) {
            return;
        }
   		
   		if(strpos($url,'?') !== false )
   		{	
   			$url = explode('?', $url);
   			$url = $url[0];
		}
		
		// turn into string without the '/' at start or end
		$url = explode('/', $url);
		$url = array_filter($url);
		$url = array_values($url);
		
		if($url) { 
			if($url[0] == 'blog'){
				
				array_shift($url);
				
			}
		}
		

		// json?
		if( isset($url[0], $url[1]) && $url[0] == 'json' )
		{    
			if(method_exists($this, $url[1]))
			{   
				// do not delete
				$this->json_init();
				call_user_func(array($this, $url[1]));
				$this->json_end();
			}
		}
		
		
	}
   	
   	   	
   	/*
   	*  json_init
   	*
   	*  @description: 
   	*  @since: 3.5.7
   	*  @created: 6/02/13
   	*/
   	
   	function json_init()
   	{
   		// set header
   		status_header( "200" );
   		
   		// json
   		$this->json = array(
   			'status' => 1
   		);
   		
   		// query
   		$this->query = array_merge(array(
   			'dev' => 0
   		), $_GET);
		
   	}
   	
   	
   	/*
   	*  json_end
   	*
   	*  @description: 
   	*  @since: 3.5.7
   	*  @created: 6/02/13
   	*/
   	
   	function json_end()
   	{
   		if( $this->query['dev'])
   		{
   			echo '<pre>';
	   			print_r(json_encode($this->json, JSON_PRETTY_PRINT));
	   		echo '</pre>';
   		}
   		else
   		{
	   		echo json_encode( $this->json );
   		}
   		die;

   	}   	
   	
   	/*
   	*  get_posts
   	*
   	*  @description: 
   	*  @created: 12/07/13
   	*
   	* SEND
   	*   - post_count [num]
   	*   - author [nicename]
   	*   - tags [nums]
   	*
   	*
	* RETURN
	*    - Title
	*    - Author
	*    - Hero Image URL
	*    - Thumbnail Image URL
	*    - Permalink
	*    - Excerpt
	*/
   	
   	function get_posts()
   	{
        
       	$options = $this->query;
       	
   		// defaults
   		$this->json['posts'] = array();
   		
   		// args
   		$args = array(
			'post_type' 		=> 'post',
			'posts_per_page' 	=> 10,
			'author' 			=> null,
			'tag_id' 			=> null,
			'cat' 				=> null,
			'paged'				=> 1,
 		);
 		
 		if(!empty($options['tag_id'])){
 		
            $args['tag_id'] = $options['tag_id'];
            
 		}
 		
 		if(!empty($options['cat'])){
 		
            $args['cat'] = $options['cat'];
            
 		}
 		
 		if(!empty($options['posts_per_page'])){
 		
 		    $args['posts_per_page'] = $options['posts_per_page']; 
 		    

        }
        
        if(!empty($options['author'])){
        
            $args['author'] = $options['author'];
            
        }
        
        if(!empty($options['page'])){
        
	        $args['paged'] = $options['page'];
	        
        }
 		
		// query
		$wp_query = new WP_Query($args);	
		
		// loop
		while( $wp_query->have_posts() )
		{
			
			$wp_query->the_post();
			
			global $paged;
			
			$attachment_id = get_field('feature_image', get_the_id());
            $hero = wp_get_attachment_image_src( $attachment_id, 'hero-image');
			
			$paged = get_query_var( 'paged' );
			
			$attachment_thumb = get_field('post_thumb', get_the_id());
            $post_thumb = wp_get_attachment_image_src($attachment_thumb, 'rea-post-thumbnail');

			$author_first = get_the_author_meta('first_name');
			$author_last = get_the_author_meta('last_name');

			$this->json['posts'][] = array(
			 'post-count'	=> $wp_query->found_posts,
			 'current-page'	=> get_query_var('paged'),
			 'title' 		=> get_the_title(),
			 'short-title' 	=> get_field('short_title', get_the_id()),
			 'permalink' 	=> get_permalink(),
			 'excerpt' 		=> get_the_excerpt(),
			 'author' 		=> $author_first.' '.$author_last,
			 'hero' 		=> $hero[0],
			 'thumbnail' 	=> $post_thumb[0],
			);
		}
		// Restore original Post Data
		wp_reset_postdata();
   	}
}

new functions_json();

?>