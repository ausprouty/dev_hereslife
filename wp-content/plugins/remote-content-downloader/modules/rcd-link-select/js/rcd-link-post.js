jQuery(document).ready(function($) {
    // Open the download form when the link is clicked
    $('.resource-download-link').on('click', function(e) {
        e.preventDefault(); 

        // Check if the form already exists (using the correct ID #download-form)
        var existingForm = document.querySelector('#download-form');
        if (existingForm) {
            return;  // If the form is already present, don't add it again
        }

        // Open the download form in a modal dialog
        $('#download-form-container').dialog({
            modal: true, 
            title: 'Download Resource',
            width: 400
        });
    });

    // Send AJAX to verify email as soon as it is entered
    $('#email').on('blur', async function() {
        alert('Email entered');
        var email = $(this).val();
        if (email === '') return;  // Do not send empty email to the server

        // Validate the email format
        if (!validateEmail(email)) {
            $('#error').text('Please enter a valid email address.').show();
            return;
        }

        $('#error').hide();  
        
        // Generate the nonce before making the AJAX request
        const nonce = await generateWordpressNonce('verify_email');
        
        // Verify the email via AJAX call
        $.ajax({
            url: RCDSettings.apiEndpoint + '/user/verify',  // Replace with your endpoint
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + RCDSettings.hlApiKey
            },
            data: {
                action: 'verify_email',
                email: email,
                apiKey: RCDSettings.hlApiKey, 
                wpnonce: nonce
            },
            success: function(response) {
                if (response.cid == null) {
                    // If user is not verified, display additional fields
                    $('#conditional-fields').show();
                    if (response.showState) {
                        $('#state-container').css('visibility', 'visible');
                    }
                } else {
                    // If user is already verified, populate and hide unnecessary fields
                    sessionStorage.setItem('hlCid', response.cid);  // Store in sessionStorage

                    // Populate known data in the fields if it exists
                    if (response.first_name) {
                        $('#first_name').val(response.first_name);
                    }
                    if (response.country) {
                        $('#country').val(response.country);
                        $('#country').trigger('change');  // Trigger state selection if needed
                    }
                    if (response.state) {
                        $('#state').val(response.state);
                    }

                    // Hide fields since we already have the info
                    $('#conditional-fields').hide();
                    $('#state-container').css('visibility', 'hidden');
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
                $('#error').text('An unexpected error occurred. Please try again later.').show();
            }
        });
    });

    // Handle form submission for resource download
    $('#download-resource-button').on('click', function() {
        const apiEndpoint = RCDSettings.hlApiEndpoint;
        const hlApiKey = RCDSettings.hlApiKey;

        // Serialize form data
        var formData = $('#download-form').serializeArray();
        
        // Add file data
        var file = $('.resource-download-link').data('file');
        formData.push({ name: 'file', value: file });
        
        // Add API key
        formData.push({ name: 'apiKey', value: hlApiKey });

        const ajaxurl = apiEndpoint + '/materials/download';

        // Send form data to the server via AJAX
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'process_resource_download',
                formData: formData,
                _wpnonce: RCDSettings.nonce // Validation nonce for security
            },
            success: function(response) {
                if (response.success) {
                    window.location.href = response.file_url;
                    $('#download-form-container').dialog('close');
                } else {
                    $('#error').text(response.message).show();
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error: ', status, error);
                $('#error').text('An unexpected error occurred. Please try again later.').show();
            }
        });
    });

    // Validate email address
    function validateEmail(email) {
        var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
