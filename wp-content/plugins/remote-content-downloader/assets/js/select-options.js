/**
 * mail_list_options
 * -----------------
 * An object that stores mailing list options and their descriptions.
 * Each key represents a unique mailing list identifier, and the value is the corresponding description.
 * 
 * Example usage:
 * - 'followup' => 'Tell me how to help new Christians grow'
 * - 'tips' => 'Send me tips on how to use this material'
 *
 * @type {Object}
 */
const allMailLists = {
    'followup': 'Tell me how to help new Christians grow',
    'tips': 'Send me tips on how to use this material',
    'start': 'Give me ideas for starting my first group',
    'multiply': 'I want to know how to get my groups to multiply',
    'weekly': 'Receive weekly emails',
    'abc': 'ABC\'s of Evangelism and Discipleship',
    'holiday': 'I want to know how to plan holiday outreach events',
    'habits': 'Habits of effective evangelists'
};

/**
 * us_state_options
 * ----------------
 * An array of state abbreviations for the United States.
 * 
 * Example:
 * - "AL" => Alabama
 * - "CA" => California
 *
 * @type {Array}
 */
const usaStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

/**
 * aus_state_options
 * -----------------
 * An array of state and territory abbreviations for Australia.
 * 
 * Example:
 * - "NSW" => New South Wales
 * - "QLD" => Queensland
 *
 * @type {Array}
 */
const aus_state_options = [
    "NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"
];

/**
 * country_options
 * ---------------
 * An array of country names.
 * This list contains all the countries of the world and can be used in dropdown menus or selection fields.
 *
 * Example:
 * - "Australia"
 * - "United States"
 * - "Canada"
 *
 * @type {Array}
 */
const countryOptions = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", 
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", 
    "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", 
    "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", 
    "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", 
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", 
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
    "Estonia", "Eswatini", "Ethiopia", "Fiji", 
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", 
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", 
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
    "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", 
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", 
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", 
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", 
    "Mongolia", "Montenegro", "Morocco", "Mozambique", 
    "Myanmar", "Namibia", "Nauru", "Nepal", 
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", 
    "Palau", "Palestine State", "Panama", "Papua New Guinea", 
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", 
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", 
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", 
    "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", 
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", 
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
    "United Kingdom", "United States", "Uruguay", 
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

/**
 * tractFormatOptions is an object that holds the available options for tract formats.
 * Each key in the object represents a specific format, and the corresponding value is the description of that format.
 * Example usage:
 * Accessing the description for the 'PAGE' format.
 * console.log(tractFormatOptions['PAGE']);  // Output: 'Print 6 page tract'
 */
const tractFormatOptions = {
    'PAGE': 'Print 6 page tract',       // A tract format that allows users to print a 6-page tract.
    'BOOK': 'Make my own books',  // A format for users who want to create their own booklets.
    'TABLET': 'Show on a tablet',       // A format optimized for showing the tract on a tablet.
    'PHONE': 'Download pdf for mobile phone',  // A mobile-friendly PDF download format for phones.
    'VIEW': 'View on mobile phone',     // A format that allows users to view the tract directly on a mobile phone.
    'BUY': 'Buy readymade tracts'       // An option for users who want to purchase pre-made tracts.
};




/**
 * contactOptions is an object that holds the available contact locations.
 * Each key in the object is an abbreviation for a country or region, and the value is the full name of the location.
 * Example usage:
 * Accessing the full name for the 'AU' contact option.
 * console.log(contactOptions['AU']);  // Output: 'Australia'
 */
const contactOptions = {
    'AU': 'Australia',           // Contact option for Australia.
    'BR': 'Brazil',              // Contact option for Brazil.
    'CM': 'Cambodia',            // Contact option for Cambodia.
    'UC': 'Canada',              // Contact option for Canada.
    'CH': 'China',               // Contact option for China.
    'CY': 'Cyprus',              // Contact option for Cyprus.
    'EU': 'Europe',              // Contact option for Europe.
    'FR': 'France',              // Contact option for France.
    'GE': 'Germany',             // Contact option for Germany.
    'ID': 'Indonesia',           // Contact option for Indonesia.
    'KO': 'Korea',               // Contact option for Korea.
    'ME': 'Middle East',         // Contact option for the Middle East.
    'NZ': 'New Zealand',         // Contact option for New Zealand.
    'PH': 'Philippines',         // Contact option for the Philippines.
    'PN': 'Pakistan',            // Contact option for Pakistan.
    'RS': 'South Africa',        // Contact option for South Africa.
    'SA': 'South America',       // Contact option for South America.
    'SG': 'Singapore',           // Contact option for Singapore.
    'TH': 'Thailand',            // Contact option for Thailand.
    'UK': 'United Kingdom',      // Contact option for the United Kingdom.
    'US': 'USA',                 // Contact option for the United States of America.
    'UW': 'Local contact only'   // Contact option for a local-only contact.
};




