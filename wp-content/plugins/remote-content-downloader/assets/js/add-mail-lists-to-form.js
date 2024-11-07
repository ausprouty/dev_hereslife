document.addEventListener('DOMContentLoaded', function() {
    /**
     * Updates the hidden input field with selected mailing lists.
     * 
     * - Collects the values of checked mailing list checkboxes.
     * - Ensures a hidden input field (`selected_mail_lists`) is present in the form.
     * - Updates the hidden input field with a comma-separated string of selected mailing list values.
     * 
     * @return void
     */
    function updateMailingLists() {
        // Collect values of all checked mailing list checkboxes
        const selectedMailLists = Array.from(document.querySelectorAll('input[name^="mail_lists["]:checked'))
            .map(checkbox => checkbox.value);

        const form = document.querySelector('form');
        if (!form) return;

        // Ensure hidden input field exists or create it if missing
        let hiddenInput = form.querySelector('input[name="selected_mail_lists"]');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'selected_mail_lists';
            form.appendChild(hiddenInput);
        }

        // Update the hidden input with a comma-separated list of selected values
        hiddenInput.value = selectedMailLists.join(',');
    }

    /**
     * Attaches event listeners to all mailing list checkboxes.
     * 
     * This function binds the `change` event to any checkbox whose name starts with 'mail_lists[',
     * and triggers the `updateMailingLists` function when a checkbox is checked or unchecked.
     * 
     * @return void
     */
    function attachCheckboxListeners() {
        const mailingListCheckboxes = document.querySelectorAll('input[name^="mail_lists["]');
        mailingListCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateMailingLists);
        });
    }

    // Initialize the mailing list checkboxes functionality
    attachCheckboxListeners();
});
