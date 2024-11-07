<?php

// Enqueue scripts and styles for the RCD Link Select plugin
function enqueue_rcd_scripts_and_styles() {
    // Check if the shortcode exists on the page
    global $post;
    if (
        has_shortcode($post->post_content, 'rcd_link_select') ||
        has_shortcode($post->post_content, 'rcd_tract_select') ) {
         // Enqueue jQuery (usually not necessary as it's often loaded by WordPress)
        if (!wp_script_is('jquery', 'enqueued')) {
            wp_enqueue_script('jquery');
        }

        // Enqueue jQuery UI Dialog for the popup functionality
        if (!wp_script_is('jquery-ui-dialog', 'enqueued')) {
            wp_enqueue_script('jquery-ui-dialog');
        }

        // Enqueue jQuery UI CSS from CDN
        if (!wp_style_is('jquery-ui-css', 'enqueued')) {
            wp_enqueue_style('jquery-ui-css', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
        }

        
        // Enqueue the external script for popup functionality that will appear next to link
        wp_enqueue_script('form-creator-js', RCD_LINK_PLUGIN_URL . 'js/rcd-link-form-creator.js', array('jquery'), null, true);
        
        // Enqueue custom JavaScript file for state and country options
        wp_enqueue_script('select-options', RCD_PLUGIN_URL . 'assets/js/select-options.js', array(), null, true);
   
        // Enqueue custom JavaScript file for link select functionality
        wp_enqueue_script('rcd-link-post', RCD_LINK_PLUGIN_URL . 'js/rcd-link-post.js', array('jquery', 'jquery-ui-dialog'), null, true);

         // Enqueue create nonces for AJAX requests
         wp_enqueue_script('rcd-nonce', RCD_PLUGIN_URL . 'assets/js/rcd-nonce.js', array('jquery', 'jquery-ui-dialog'), null, true);
        
          
        // Enqueue custom CSS file for the form
        wp_enqueue_style('rcd-link-select-css', plugin_dir_url(__FILE__) . '../css/rcd-link-select.css', array(), null, 'all');
        
         // local values to pass to the script

          // Pass AJAX URL and nonce to the script
        wp_localize_script('rcd-tract-form-options', 'linkScriptData', array(
            'wp_nonce'   => wp_create_nonce('download-resource')
        ));

    }
}

// Hook into wp_enqueue_scripts to load scripts and styles
add_action('wp_enqueue_scripts', 'enqueue_rcd_scripts_and_styles');
