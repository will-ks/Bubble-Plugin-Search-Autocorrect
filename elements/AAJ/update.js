function(instance, properties, context) {


    // declare instance variables
    instance.data.data_source = properties.data_source;
    instance.data.string_to_match = properties.string_to_match;
    instance.data.dictionary = [];
    instance.data.input_box_id = properties.input_box_id;



    if (properties.data_source) {
        var len = properties.data_source.length();
        instance.data.len = len;
    } else {
        console.log("Search & Autocorrect: Data source not defined");
    }


    // keys array, for fuse.js options. Fuse will search in these keys, so this adds a different key for each Field To Search that has been set.
    var keys = [];
    if (properties.search_field) {
        keys.push("word1");
    }
    if (properties.search_field_2) {
        keys.push("word2");
    }
    if (properties.search_field_3) {
        keys.push("word3");
    }
    if (properties.search_field_4) {
        keys.push("word4");
    }
    if (properties.search_field_5) {
        keys.push("word5");
    }


    // Get data source into value_pairs objects with id number and search terms. Add objects to dictionary array.

    function makearray() {

        for (i = 0; i < len; i++) {
            var current_object = properties.data_source.get(0, len)[i];

            var value_pairs = {
                id: i,
                word1: current_object.get(properties.search_field),
                word2: (properties.search_field_2) ? current_object.get(properties.search_field_2) : "Empty",
                word3: (properties.search_field_3) ? current_object.get(properties.search_field_3) : "Empty",
                word4: (properties.search_field_4) ? current_object.get(properties.search_field_4) : "Empty",
                word5: (properties.search_field_5) ? current_object.get(properties.search_field_5) : "Empty"
            };

            instance.data.dictionary.push(value_pairs);

        }

    }

    if (properties.data_source) {
        makearray();
    }

  
    // Load fuse.js options

    instance.data.options = {
        shouldSort: true,
        includeScore: true,
        threshold: properties.threshold,
        caseSensitive: properties.case_sensitive,
        location: properties.location,
        distance: properties.distance,
        maxPatternLength: properties.match_pattern_length,
        tokenize: properties.tokenize,
        matchAllTokens: properties.match_all_tokens,
        findAllMatches: properties.find_all_matches,
        keys: keys
    };



  
      var result;
  
   // getResults function, same as in function initialize. Here it runs if the user has set a "Text To Match" value, on update.
  
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
  
  
  
  // Run getResults if string_to_match is set and the "use #SearchInput" checkbox is not checked

          if (!properties.search_type && properties.string_to_match) {
            
            var fuse = new Fuse(instance.data.dictionary, instance.data.options);
            result = fuse.search(properties.string_to_match);
            getResults();
            
          } else if (!properties.search_type && !properties.string_to_match) {
             instance.publishState("match_array", null);
             instance.publishState("match_scores_array", null); 
        }
       




}