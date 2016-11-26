;(function($){

	//Input the name of the new user type.
    var init = function() {
        selectChange('external-contributor');

        if($('#nickname')){
         forceDash();
        }

        $('#createuser .form-table:eq(0) tbody tr:eq(7)').prependTo('#createuser .form-table:eq(0) tbody');

        // Wait for ACF to load
        $(document).on('acf/setup_fields', function(e, div){

        	characterCounter( $('#postexcerpt') );
        	characterCounter( $('#acf-short_title') );

        });


    };

    var forceDash = function(){
        $('#nickname').on('blur', function(){

            var input = $(this).val();

            var slug = input.replace(/\s+/g, '-').toLowerCase();

            $(this).val(slug);

        })
    }

    //The on change event for the select
    var selectChange = function(userRole) {
    	$('#role').on('change', function(el){
    		var $selected = $("select option:selected").val();
	    	if($selected == userRole){
		    	hideFunc();
		    	validateForm();
	    	}else{
		    	showFunc();
	    	}
    	})
    };

    /* Showing and hiding functions on the form */
    var hideFunc = function(){
	    	$('.form-table tr:eq(1), .form-table tr:eq(2), .form-table tr:eq(6), .form-table tr:eq(7)').addClass('adminHide');
	    	var reqFields = "<span class='reqField description'>(required)</span>"
	   		$('.form-table tr:eq(3) th label, .form-table tr:eq(4) th label').append(reqFields);
	    }
    var showFunc = function(){
	    	$('.form-table tr:eq(0), .form-table tr:eq(1), .form-table tr:eq(1), .form-table tr:eq(5), .form-table tr:eq(6)').removeClass('adminHide');
	    	$('.reqField').hide();
	    }

	/* Get each of the inputs*/
	function getInputs(){
		var userDetails = new Array();
		$('.form-table .form-field').each(function(index, value) {
				if($(value).find('label span').hasClass('reqField')){
					var uVal = $(this).find('input').val()
					userDetails.push(uVal);
				}
			})
			return userDetails;
		};

	/* Fire an error if required items have not been input */
	var validateForm = function(){
			$('#createusersub').on('click', function(e){
				e.preventDefault();
				var inputArray = getInputs();
				console.log(inputArray);
				var userAr = $.inArray("", inputArray);
				if(userAr === -1){
					submitForm(inputArray);
				}else{
					alert('Missing Required Field');
				}
			})
		}

	var submitForm = function(uDetail){
		var fName = uDetail[0]; // User Firstname
		var lName = uDetail[1]; // User Lastname
		//Add User details to form
		$('.form-table tr:eq(1) td input').val(fName+' '+lName);
		$('.form-table tr:eq(2) td input').val(fName+'_'+lName+'@realestate.com.au');
		$('#pass1, #pass2').val(datePassword(fName));

		//Create Date Based Password
		function datePassword(uName){
			var d = new Date();
			var month = d.getMonth()+1;
			var day = d.getDate();
			var output = d.getFullYear() + '' + ((''+month).length<2 ? '0' : '') + month + '' + ((''+day).length<2 ? '0' : '') + day + d.getHours() + d.getMinutes() + uName;
			return output;
			}
		$("form#createuser").submit();
	}

	var characterCounter = function( $el ){

		var initCounter = function( $el ){

			var $box = $el.find('.hndle');

			// If it's an ACF field
			if($box.length == 0){
				$box = $el.find('.label');
			}

			// Find textarea
			var $textarea = $el.find('textarea');

			// If it's an input
			if($textarea.length == 0){
				$textarea = $el.find('input');
			}

			// Check if the count is already there?
			if( $box.find('.counter').length == 0 ){

				$box.append($('<div class="counter" style="float: right; position: relative; font-size: 12px; top: 4px; font-weight: normal; left: -12px;">Character count: <span>0</span></div>'));

			}

			var $counter = $box.find('.counter');

			var updateCounter = function(){

				var textLength = $textarea.val().length;
				$counter.find('span').html(textLength);

			}

			updateCounter();

			$textarea.on('keyup', function(){

				updateCounter();

			});

		}

		// Only run the conter if the element exists
		if($el.length > 0){

			initCounter( $el );

		}

	}

    $(init);

})(jQuery);




