document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = RCDSettings.mylanguageApiEndpoint;
    const ajaxurl = myScriptData.ajaxurl;
    const form = document.getElementById('rcd-study-form');
    const wp_nonce = myScriptData.wp_nonce;

    if (form) {
        const parentContainer = document.querySelector('#rcd-study-form-container');
        const downloadContainer = parentContainer.querySelector('#download-container');
        const formType = form.getAttribute('data-form-type');
        const languageSelect = form.querySelector('#language');
        const session = form.querySelector('#session');

        // Populate the first language field on load
        populateLanguageSelect(apiEndpoint, formType);

        function populateLanguageSelect(apiEndpoint, formType) {
            const languageUrl = `${apiEndpoint}/dbs/languages`;
            console.log(`Fetching from: ${languageUrl}`); 
            addPlaceholder(languageSelect, 'Select a language...');

            fetch(languageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data) && data.length) {
                        data.forEach(item => 
                            languageSelect.add(new Option(item.lang1, item.lang1))
                        );
                        languageSelect.style.display = 'block'; // Show the select field
                    } else {
                        console.warn('No languages found'); 
                    }
                })
                .catch(error => 
                    console.error('Error fetching language data:', error)
                );
        }
         /**
         * Adds a placeholder option to a <select> element.
         * @param {HTMLSelectElement} selectElement - The <select> element.
         * @param {string} placeholderText - The placeholder text.
         */
         function addPlaceholder(selectElement, placeholderText) {
            const placeholder = new Option(placeholderText, '');
            placeholder.disabled = true;
            placeholder.selected = true;
            selectElement.add(placeholder);
        }
    }
});
