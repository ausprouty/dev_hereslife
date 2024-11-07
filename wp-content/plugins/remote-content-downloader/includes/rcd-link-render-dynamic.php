<?php

// Define the callback function for the AJAX request
function rcd_link_render_dynamic() {
    writeLog('rcd_link_render_dynamic', $_POST);    
    error_log('rcd_link_render_dynamic was triggered');

     // Verify the nonce
     if (!isset($_POST['wp_nonce']) || !wp_verify_nonce($_POST['wp_nonce'], 'rcd_link_render_dynamic_nonce')) {
        wp_send_json_error('Invalid nonce'); // Send error if nonce fails
        wp_die(); // Terminate the request
    }
    // Sanitize incoming data
    $file = sanitize_text_field($_POST['file'] ?? '');
    $session = sanitize_text_field($_POST['session'] ?? '');
    $name = sanitize_text_field($_POST['name'] ?? '');
    $mail_lists = sanitize_text_field($_POST['mail_lists'] ?? '');

    // Construct and render the shortcode
    $shortcode = "[rcd_link_select file='$file' session='$session' name='$name' mail_lists='$mail_lists']";
    echo do_shortcode($shortcode);

    wp_die(); // Properly terminate the request
}

// Hook the AJAX action (for logged-in users)
add_action('wp_ajax_rcd_link_render_dynamic', 'rcd_link_render_dynamic');

// Hook the AJAX action (for non-logged-in users)
add_action('wp_ajax_nopriv_rcd_link_render_dynamic', 'rcd_link_render_dynamic');
