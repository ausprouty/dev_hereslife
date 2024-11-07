<?php
/*
Plugin Name: Remote Content Downloader
Plugin URI: https://hereslife.com/remote-content-downloader
Description: A plugin to interact with the database and download content remotely.
Version: 1.0
Author: Bob Prouty
Author URI: https://hereslife.com
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: remote-content-downloader
Requires PHP: 7.4
*/

// Ensure the plugin directory is defined only once
if (!defined('RCD_PLUGIN_DIR')) {
    define('RCD_PLUGIN_DIR', __DIR__ . '/');
}

if (!defined('RCD_PLUGIN_URL')) {
    define('RCD_PLUGIN_URL', plugin_dir_url(__FILE__));
}

// Include logging functions (assumes the 'includes/logging-functions.php' exists)
if (file_exists(RCD_PLUGIN_DIR . 'includes/logging-functions.php')) {
    include_once RCD_PLUGIN_DIR . 'includes/logging-functions.php';
}

// Include module files dynamically
/**
 * Include all module files.
 *
 * Scans the 'modules' directory and includes each module's main file.
 *
 * @return void
 */
function rcd_include_modules() {
    $modules_dir = RCD_PLUGIN_DIR . 'modules/';
    
    // Scan the modules directory for subdirectories (modules)
    $modules = array_filter(glob($modules_dir . '*'), 'is_dir');
    
    // Loop through each module directory and include the main PHP file
    foreach ($modules as $module_dir) {
        $module_name = basename($module_dir);
        $module_file = $modules_dir . $module_name . '/' . $module_name . '.php';
       
        if (file_exists($module_file)) {
            include_once $module_file;
        }
    }
}
add_action('plugins_loaded', 'rcd_include_modules');

// Localize variables without enqueuing scripts
/**
 * Localizes API and key data for front-end scripts.
 *
 * This function registers a dummy script handle and localizes variables to be used
 * in front-end JavaScript.
 *
 * @return void
 */
function rcd_localize_variables() {
    // Register a dummy script handle (since no actual script is being enqueued)
    wp_register_script('rcd-dummy-handle', '');

    // Localize data (API endpoint and API key)
    $localize_data = array(
        'ajaxurl' => admin_url('admin-ajax.php'), // Set AJAX URL
        'hlApiEndpoint' => defined('HL_API_ENDPOINT') ? HL_API_ENDPOINT : '',
        'mylanguageApiEndpoint' => defined('MYLANGUAGE_API_ENDPOINT') ? MYLANGUAGE_API_ENDPOINT : '',
        'hlApiKey'    => defined('HL_API_KEY') ? HL_API_KEY : '',
        'hlNonceSalt'=> defined('WORDPRESS_HL_NONCE_SALT') ? WORDPRESS_HL_NONCE_SALT : '',
    );

    // Localize the variables for front-end use
    wp_localize_script('rcd-dummy-handle', 'RCDSettings', $localize_data);

    
    // Enqueue custom CSS file for the plugin
    wp_enqueue_style('rcd-standard-css', RCD_PLUGIN_URL . 'assets/css/rcd-standard.css', array(), null, 'all');

    
    // Enqueue the dummy script (required to use wp_localize_script)
    wp_enqueue_script('rcd-dummy-handle');
}
add_action('wp_enqueue_scripts', 'rcd_localize_variables');

// Security best practices
// Ensure that sensitive information is properly sanitized or escaped when necessary
