<?php
/*
Plugin Name: RCD Link Select
Description: A plugin to display a popup form for downloading resources after collecting user information.
Version: 1.0
Author: Your Name
*/

// Define constants
define('RCD_LINK_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('RCD_LINK_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include the form rendering file
include_once RCD_LINK_PLUGIN_DIR . 'includes/rcd-link-form.php';

// Include the script/style enqueuing file
include_once RCD_LINK_PLUGIN_DIR . 'includes/rcd-link-enqueue-scripts.php';


/**
 * Shortcode handler for rendering the download link with popup form
 *
 * @param array $atts Attributes passed from the shortcode
 * @return string HTML content to display the link and form
 */
function rcd_link_select_shortcode($atts) {
    // Extract shortcode attributes
    $attributes = shortcode_atts(array(
        'file' => '',
        'session' => '',
        'name' => '',
        'mail_lists' => array()
    ), $atts);

    
    // Generate the download link that opens the popup
    //$link = '<a href="javascript:void(0);" onclick="openPopup();">' . esc_html($attributes['name']) . '</a>';

    // Render the form (from included file)
    return rcd_render_link_form($attributes);

    
}
add_shortcode('rcd_link_select', 'rcd_link_select_shortcode');
