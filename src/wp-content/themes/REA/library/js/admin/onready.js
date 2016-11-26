// ACF Setup fields, bug if called more than once, called on Window.load, it's a set timeout of milliseconds.
// On doc-ready, append data.attribute to relationship div. That'll append if before ACF has run setup_fields.   

$j = jQuery;
var _relationship = acf.fields.relationship;
/*
$j(document).on('acf/setup_fields', function(e, postbox){
    console.log('set fields triggered');
    $j(postbox).find('.acf_relationship').each(function(){
        var $div = $j(this);
        $j(document).trigger('acf/append', $div);
    });
});
*/
$j(document).on('acf/append', function(e, postbox){
    var tagID = getCatID($j(postbox));
    $j(postbox).attr('data-cat', tagID);
    console.log('append');
    //_relationship.update_results($j(postbox));
});

var getCatID = function($r){
    var UR = $r[0].baseURI;
        pattern = /tag_ID=[0-9]+/g;
        nums = /[0-9]+/g;
        matches = UR.match(pattern);
        str = matches.join("")
        tagID =  str.match(nums);
        tagID = tagID.join("");
        return tagID
};