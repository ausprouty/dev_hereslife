<?php
function rcd_render_study_form($study) {
    ob_start();
    ?>
    <div id="rcd-study-form-container">
        <form id="rcd-study-form" data-form-type="<?php echo esc_attr($study); ?>">
            <div id="language-container">
                <label for="language">I want to do a Discover Bible Study with a group who read:</label>
                <select id="language" name="language"></select>
            </div>
            <div id="lesson-container">
                    <label for="lesson">We will see what God says about:</label>
                    <select id="lesson" name="lesson" </select>
            </div> 
        </form>
        <div id="download-container" style="display:none;">
    </div>
    <?php
    return ob_get_clean();
}
?>