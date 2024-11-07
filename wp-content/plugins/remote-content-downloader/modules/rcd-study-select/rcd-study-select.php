<?php
/*
Plugin Name: RCD Tracts Select
Description: A form to select and retrieve a study from an external API.
Version: 1.1
Author: Your Name
*/

// Define constants
define('RCD_STUDY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RCD_STUDY_PLUGIN_URL', plugin_dir_url(__FILE__));

// Register shortcode and enqueue scripts
add_shortcode('rcd_study_select', 'rcd_study_select_form');
add_action('wp_enqueue_scripts', 'rcd_study_check_enqueue_scripts');



// Shortcode function for rendering the form
function rcd_study_select_form($atts) {
    // Include the form rendering file
    include_once RCD_STUDY_PLUGIN_DIR . 'includes/rcd-study-form-renderer.php';
    include_once RCD_STUDY_PLUGIN_DIR . 'includes/rcd-link-render-dynamic.php'; // Corrected constant

    // Set default attributes and merge with incoming attributes
    $atts = shortcode_atts(array(
        'study' => 'community' // Default study type
    ), $atts, 'rcd_study_select');

    // Render the form with the specified type
    return rcd_render_study_form($atts['type']);
}

// Enqueue scripts and styles only when the shortcode is present
function rcd_study_check_enqueue_scripts() {
    global $post;

    // Ensure $post is available before checking for the shortcode
    if ($post && has_shortcode($post->post_content, 'rcd_study_select')) {
        // Enqueue jQuery if not already included
        wp_enqueue_script('jquery');

        // Enqueue jQuery UI Dialog for modal functionality
        wp_enqueue_script('jquery-ui-dialog');
        wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');

        // Enqueue custom JavaScript and CSS for the form
        wp_enqueue_script(
            'rcd-study-form-options',
            RCD_STUDY_PLUGIN_URL . 'js/rcd-study-form-options.js',
            array('jquery'),
            null,
            true
        );

        // Pass AJAX URL and nonce to the script
        wp_localize_script('rcd-study-form-options', 'myScriptData', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'wp_nonce'   => wp_create_nonce('rcd_link_render_dynamic_nonce')
        ));

        wp_enqueue_style('rcd-study-select-css', RCD_STUDY_PLUGIN_URL . 'css/rcd-study-select.css');
    }
}

// Include the AJAX handler file and define the actions
include_once RCD_STUDY_PLUGIN_DIR . 'includes/rcd-link-render-dynamic.php'; // Moved to ensure it is always loaded

// Hook the AJAX actions
add_action('wp_ajax_rcd_link_render_dynamic', 'rcd_link_render_dynamic');
add_action('wp_ajax_nopriv_rcd_link_render_dynamic', 'rcd_link_render_dynamic');
