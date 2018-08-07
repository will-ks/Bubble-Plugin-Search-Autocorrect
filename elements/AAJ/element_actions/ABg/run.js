function(instance, properties, context) {


  console.log('test');
  if (instance.data.input_box_id) {
    
    console.log("resetting search");
    $("#" + instance.data.input_box_id).val('');
    instance.publishState('match_array', null);
    instance.publishState('match_scores_array', null);
    instance.publishState('input_box_value', null);
    
  }



}
