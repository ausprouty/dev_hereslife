document.addEventListener('DOMContentLoaded', function () {
    // Delegate click event to a parent element, like the document body
    document.body.addEventListener('click', function (event) {
        // Check if the clicked element has the required class
        if (event.target.classList.contains('resource-download-link')) {
            event.preventDefault();
            handleDownloadClick(event.target); // Call the function to handle the form generation
        }
    });
});

function handleDownloadClick(link) {
    // Check if the form already exists
    var existingForm = document.querySelector('#download-form');
    if (existingForm) {
        return;  // If the form is already present, don't add it again
    }

    var file = link.getAttribute('data-file');
    var mailLists = link.getAttribute('data-mail-lists').split(',');
    var itemName = link.getAttribute('data-name');

    // Create the form dynamically
    var form = document.createElement('form');
    form.setAttribute('id', 'download-form');
    form.setAttribute('method', 'post');
    form.classList.add('rcd-form');

    // Form title
    var formTitle = document.createElement('h3');
    formTitle.innerText = itemName;
    formTitle.classList.add('rcd-form-title');
    form.appendChild(formTitle);

    // Static text
    var staticText = document.createElement('p');
    staticText.innerText = 'This is the static text that will appear after the title.';
    staticText.classList.add('rcd-static-text');
    form.appendChild(staticText);

    // Close button
    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('rcd-close');
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';

    closeButton.addEventListener('click', function (event) {
        event.stopPropagation();
        console.log('Close button clicked');
        if (form) form.remove();
    });

    form.appendChild(closeButton);

    // Email input
    form.appendChild(createInputField('email', 'Enter your email', 'email'));

    // First name input
    form.appendChild(createInputField('text', 'Enter your first name', 'first_name'));

    // Country select
    var countryLabel = document.createElement('label');
    countryLabel.setAttribute('for', 'country');
    countryLabel.innerText = 'Country';
    form.appendChild(countryLabel);

    var countrySelect = document.createElement('select');
    countrySelect.setAttribute('id', 'country');
    countrySelect.setAttribute('name', 'country');
    countrySelect.classList.add('rcd-select');

    var defaultOption = new Option('Select Country', '');
    countrySelect.appendChild(defaultOption);

    countryOptions.forEach(function (country) {
        var option = new Option(country, country);
        countrySelect.appendChild(option);
    });

    form.appendChild(countrySelect);

    // State container
    var stateContainer = document.createElement('div');
    stateContainer.setAttribute('id', 'state-container');
    stateContainer.style.display = 'none';
    stateContainer.classList.add('rcd-hidden');

    var stateLabel = document.createElement('label');
    stateLabel.setAttribute('for', 'state');
    stateLabel.innerText = 'State';
    stateContainer.appendChild(stateLabel);

    var stateSelect = document.createElement('select');
    stateSelect.setAttribute('id', 'state');
    stateSelect.setAttribute('name', 'state');
    stateSelect.classList.add('rcd-select');
    stateContainer.appendChild(stateSelect);

    form.appendChild(stateContainer);

    // Handle country change event
    countrySelect.addEventListener('change', function () {
        var country = countrySelect.value;
        stateSelect.innerHTML = '';

        if (country === 'Australia') {
            populateStateSelect(['NSW', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'ACT', 'NT']);
            stateContainer.style.display = 'block';
        } else if (country === 'United States') {
            populateStateSelect(usaStates);
            stateContainer.style.display = 'block';
        } else {
            stateContainer.style.display = 'none';
        }
    });

    // Mail list checkboxes
    mailLists.forEach(function (code) {
        var trimmedCode = code.trim();
        if (allMailLists.hasOwnProperty(trimmedCode)) {
            var checkboxGroup = document.createElement('div');
            checkboxGroup.classList.add('checkbox-group');

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = trimmedCode;
            checkbox.name = `mail_lists[${trimmedCode}]`;
            checkbox.value = trimmedCode;
            checkbox.classList.add('rcd-checkbox');
            checkboxGroup.appendChild(checkbox);

            var label = document.createElement('label');
            label.setAttribute('for', trimmedCode);
            label.innerText = allMailLists[trimmedCode];
            label.classList.add('rcd-label');
            checkboxGroup.appendChild(label);

            form.appendChild(checkboxGroup);
        }
    });

    // Prayer textarea
    var prayerLabel = document.createElement('label');
    prayerLabel.setAttribute('for', 'prayer');
    prayerLabel.innerText = 'How can we pray for you?';
    form.appendChild(prayerLabel);

    var prayerTextarea = document.createElement('textarea');
    prayerTextarea.id = 'prayer';
    prayerTextarea.name = 'prayer';
    prayerTextarea.placeholder = 'Your prayer request';
    prayerTextarea.classList.add('rcd-textarea');
    form.appendChild(prayerTextarea);

    // Submit button
    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.id = 'download-resource-button';
    submitButton.innerText = 'Download Resource';
    submitButton.classList.add('rcd-button');
    form.appendChild(submitButton);

    link.insertAdjacentElement('afterend', form);

    // Pre-fill form fields from session storage if available
    var storedData = sessionStorage.getItem('hlCid');
    if (storedData) {
        var parsedData = JSON.parse(storedData);
        console.log(parsedData);
        if (parsedData.email) document.getElementById('email').value = parsedData.email;
        if (parsedData.first_name) document.getElementById('first_name').value = parsedData.first_name;
        if (parsedData.country) {
            countrySelect.value = parsedData.country;
            countrySelect.dispatchEvent(new Event('change'));
        }
        if (parsedData.state) document.getElementById('state').value = parsedData.state;
    }

    // Add event listener for submit button
    submitButton.addEventListener('click', async function () {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('email', document.getElementById('email').value);
        formData.append('first_name', document.getElementById('first_name').value);
        formData.append('country', document.getElementById('country').value);
        formData.append('state', document.getElementById('state').value);
        formData.append('prayer', document.getElementById('prayer').value);
        formData.append('apiKey', RCDSettings.hlApiKey);
        formData.append('wp_nonce', linkScriptData.nonce);
        formData.append('action', 'download-resource');

        mailLists.forEach(function (code) {
            var checkbox = document.getElementById(code.trim());
            if (checkbox && checkbox.checked) {
                formData.append('mail_lists[]', checkbox.value);
            }
        });

        try {
            const response = await fetch(RCDSettings.apiEndpoint + '/materials/download', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + RCDSettings.hlApiKey },
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

// Helper function to create input fields
function createInputField(type, placeholder, id) {
    var input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    input.placeholder = placeholder;
    input.classList.add('rcd-input');
    return input;
}

// Helper function to populate state dropdown
function populateStateSelect(states) {
    var defaultOption = new Option('SELECT STATE:', '');
    stateSelect.appendChild(defaultOption);
    states.forEach(function (state) {
        var option = new Option(state, state);
        stateSelect.appendChild(option);
    });
}
