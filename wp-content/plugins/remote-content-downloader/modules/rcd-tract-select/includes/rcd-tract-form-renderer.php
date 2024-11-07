<?php
function rcd_render_tract_form($tract_type) {
    ob_start();
    ?>
    <div id="rcd-tract-form-container">
        <form id="rcd-tract-form" data-form-type="<?php echo esc_attr($tract_type); ?>">
            <div>
                <label for="lang1">I want to share the Gospel with a person who reads:</label>
                <select id="lang1" name="lang1" style="display:none;"></select>
            </div>

            <?php if ($tract_type === 'bilingual-page' || $tract_type === 'bilingual-book') : ?>
                <div id="lang2-container">
                    <label for="lang2">I also want the tract to have text in:</label>
                    <select id="lang2" name="lang2" style="display:none;"></select>
                </div>
            <?php endif; ?>

            <div id="audience-container">
                <label for="audience">Audience</label>
                <select id="audience" name="audience" style="display:none;"></select>
            </div>

            <div id="papersize-container">
                <label for="papersize">Paper size</label>
                <select id="papersize" name="papersize" style="display:none;"></select>
            </div>

            <div id="contact-container">
                <label for="contact">For further information, they should contact ministries in:</label>
                <select id="contact" name="contact" style="display:none;"></select>
            </div>
        </form>
        <div id="download-container" style="display:none;">
        <div id="rcd-tract-results"></div>
    </div>
    <?php
    return ob_get_clean();
}
?>
