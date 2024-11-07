document.addEventListener('DOMContentLoaded', function() {
    var countrySelect = document.getElementById('country');
    var stateContainer = document.getElementById('state-container');
    var stateSelect = document.getElementById('state');
    
    // Handle country selection and update state options dynamically
    countrySelect.addEventListener('change', function() {
        var country = countrySelect.value;
        stateSelect.innerHTML = '';  // Clear existing options

        // Populate state dropdown based on selected country
        if (country === 'Australia') {
            populateStateSelect(['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ACT', 'NT']);
        } else if (country === 'United States') {
            populateStateSelect([
                "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
                "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
                "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
                "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
                "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
            ]);
        } else {
            stateContainer.style.display = 'none';  // Hide state dropdown if country is neither Australia nor US
            return;
        }

        stateContainer.style.display = 'block';  // Show state dropdown if a valid country is selected
    });

    /**
     * Populates the state dropdown with options.
     *
     * @param {Array} states - An array of state abbreviations to populate the dropdown with.
     * @return void
     */
    function populateStateSelect(states) {
        var defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'SELECT STATE:';
        stateSelect.appendChild(defaultOption);  // Add default option to the top

        states.forEach(function(state) {
            var option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);  // Add each state as an option
        });
        stateSelect.style.display = 'block';  // Ensure the dropdown is displayed
    }
});
