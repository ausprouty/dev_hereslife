<?php
/*
 * Plugin Name: RCD Spirit Select
 * Description: Fetches and displays languages in which the Spirit Filled life is available. When selected it will display the resource available in that language.
 */

// Register the shortcode
add_shortcode('rcd_spirit_select', 'rcd_spirit_select_shortcode');

/**
 * Shortcode to display the language select form for Spirit Filled life resources.
 */
function rcd_spirit_select_shortcode() {
    // Enqueue scripts and styles only when this shortcode is rendered
    rcd_spirit_enqueue_assets();
    // Establish the API endpoint for fetching the available languages
    $api_url = HL_API_ENDPOINT . '/spirit/titles';
    

    // Fetch the API data using `wp_remote_get`
    $response = wp_remote_get($api_url);

    // Check if the API request returned an error
    if (is_wp_error($response)) {
        return 'Unable to retrieve data from the API.';
    }

    // Retrieve the response body from the API call
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response from the API
    $data = json_decode($body, true);

    // Check for JSON decoding errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'Error decoding the JSON response.';
    }

    // Start output buffering to capture form HTML
    ob_start();
    
    // Check if data is available and output the form with the language select dropdown
    if (!empty($data)) {
        echo '<form id="spirit-form">';
        echo '<select id="spirit-select" name="language">';

        // Loop through each item in the API response and create an option element for each language
        foreach ($data as $item) {
            if (isset($item['languageName'])) {
                echo '<option value="' . esc_attr($item['languageName']) . '">' . esc_html($item['languageName']) . '</option>';
            }
        }
        
        echo '</select><br><br>';
        echo '<div class="wp-block-button">';
        echo '<button id="custom-button" type="submit" class="wp-block-button__link wp-element-button">View Resource</button>';
        echo '</div>';
        echo '</form>';
        echo '<div id="resource-container"></div>'; // This container will display the selected resource
    } else {
        echo 'No data available.';
    }

    // Return the generated HTML
    return ob_get_clean();
}

/**
 * Enqueue custom CSS and JS files for the plugin.
 */
function rcd_spirit_enqueue_assets() {
    // Enqueue custom CSS file
    wp_enqueue_style('rcd-spirit-select-css', 
        plugin_dir_url(__FILE__) . 'rcd-spirit-select.css', 
        array(), null, 'all');

    // Enqueue the JavaScript file for handling form submission and API interactions
    wp_enqueue_script(
        'rcd-spirit-select-script', 
        plugin_dir_url(__FILE__) . 'rcd-spirit-select.js', 
        array('jquery'), 
        null, 
        true
    );
}
?>
