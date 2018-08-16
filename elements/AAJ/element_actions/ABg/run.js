function(instance, properties, context) {


    if (instance.data.input_box_id) {
    
      // Reset the input box and the match arrays
      $("#" + instance.data.input_box_id).val('');
      instance.publishState('match_array', null);
      instance.publishState('match_scores_array', null);
    
    }


}