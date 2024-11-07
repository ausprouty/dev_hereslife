<?php

function rcd_render_link_form($atts) {
    // Include the country and state options for the select elements
    include_once RCD_PLUGIN_DIR . 'includes/select-options.php';
    
    // Sanitize file and name query parameters or attributes
    $file = isset($_GET['file']) ? sanitize_text_field($_GET['file']) : $atts['file'];
    $session = isset($_GET['session']) ? sanitize_text_field($_GET['session']) : $atts['session'];
    $name = isset($_GET['name']) ? sanitize_text_field($_GET['name']) : $atts['name'];
    $mail_lists = isset($atts['mail_lists']) ? sanitize_text_field($atts['mail_lists']) : '';

    if (empty($file) || empty($name)) {
        return '<p>Invalid file or name attribute.</p>';
    }

    ob_start(); ?>
    <a href="#" class="resource-download-link" 
       data-file="<?= esc_attr($file) ?>" 
       data-session="<?= esc_attr($session) ?>" 
       data-mail-lists="<?= esc_attr($mail_lists) ?>" 
       data-name="<?= esc_attr($name) ?>">
        <?= esc_html($name) ?>
    </a>
    <?php 
    return ob_get_clean();

}
add_shortcode('rcd-link-select', 'rcd_render_link_form');
