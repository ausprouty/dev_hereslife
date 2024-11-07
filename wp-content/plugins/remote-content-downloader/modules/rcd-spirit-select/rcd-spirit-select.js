document.addEventListener('DOMContentLoaded', function() {
    /**
     * Handles form submission to retrieve resource data based on the selected language.
     * Prevents default form behavior, constructs the API URL, makes an AJAX call to fetch
     * the resource, and updates the resource container with the response.
     */
    
    // Get references to form, select dropdown, and resource container
    var form = document.getElementById('spirit-form');
    var select = document.getElementById('spirit-select');
    var container = document.getElementById('resource-container');

    // Form submission event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        var selectedValue = select.value;

        // Check if RCDSettings and apiEndpoint are defined
        if (typeof RCDSettings === 'undefined' || typeof RCDSettings.apiEndpoint === 'undefined') {
            console.error('RCDSettings or apiEndpoint is not defined');
            container.textContent = 'Error: apiEndpoint is not defined';
            return;
        }

        var apiEndpoint = RCDSettings.apiEndpoint;
        var url = apiEndpoint + '/spirit/text/' + selectedValue;

        // Fetch the resource data from the API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                container.innerHTML = data; // Update the resource container with the retrieved data
            })
            .catch(error => {
                console.error('Error:', error);
                container.textContent = 'Error: ' + error.message; // Display error in the container
            });
    });
});
