function(instance, context) {



    var result;

    function getResults() {
        // Check that result exists and is not empty before attempting to set properties to avoid errors. Reset matched states to null when no matches found

        if (result && result.length) {

            var resultsArray = [];
            var scoresArray = [];

            for (i = 0; i < result.length; i++) {
                var resultThing = instance.data.data_source.get(0, instance.data.len + 1)[result[i].item.id];
                resultsArray.push(resultThing);
                scoresArray.push(result[i].score);
            }

            instance.publishState("match_array", resultsArray);
            instance.publishState("match_scores_array", scoresArray);

        } else {
            instance.publishState("match_array", null);
            instance.publishState("match_scores_array", null);
        }

    }


    // Bind input change handler to #SearchInput. Run getResults function whenever input changes.


    $(document).ready(function() {
        if (instance.data.input_box_id && instance.data.search_type) {

            $("#" + instance.data.input_box_id).on("input", null, null, function() {

                if (instance.data.dictionary && instance.data.options) {

                    // Trim leading & trailing whitespace, then remove words shorter than exclude_under value
                    var searchTerm = $("#" + instance.data.input_box_id).val().trim();
                    searchTerm = searchTerm.split(' ').filter(function(str) {
                        var word = str.match(/(\w+)/);
                        return word && word[0].length >= instance.data.exclude_under;
                    }).join(' ');
                  
                    var fuse = new Fuse(instance.data.dictionary, instance.data.options);
                    result = fuse.search(searchTerm);
                    getResults();
                } else {
                    console.log("Search & Autocorrect: Instance variables not declared");
                }
              
              instance.publishState('input_box_value', $("#" + instance.data.input_box_id).val());
            });

        }

    });




}