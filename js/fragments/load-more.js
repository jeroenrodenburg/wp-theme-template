/**
 *  Load More JS
 */

/**
 *  Enter jQuery selector to activate the loadMore function
 */
$('').on('click', loadMore);

/**
 *  Load more with ajax
 *  @param {Event} event
 */
function loadMore(event) {

 $.ajax({
  type: "POST",
  dataType: "html",
  url: ajax.url,
  data: {
    action: 'load_ajax',
  },
  success: function(data){
   var $data = $(data);
   if($data){
     // Do something with $data
   } else {
     // Do something if there is no data
   }
  },
  error : function(jqXHR, textStatus, errorThrown) {
   throw new Error(jqXHR + " :: " + textStatus + " :: " + errorThrown);
  }
 });

 event.preventDefault();

}
