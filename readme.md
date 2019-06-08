# EVA (short for Email Validator)

EVA (short for Email Validator) is a validation tool aimed at keeping your platforms free from fake or disposable email accounts.

This plugin for Javascript provides an easy 3 step integration to get you set and running in no time:

1 - Download and install it in your Javascript system

2 - Create and account at [https://e-va.io](https://e-va.io) and generate an API Key

3 - Configure this module with the newly generated API KEY.

That's it. Your Javascript system is now able to keep those fake email accounts at bay.

Any questions, issues, suggestions, contact us at [support@e-va.io](mailto:support@e-va.io)

>## Installing
>EVA email validation and checker JavaScript plugin is easy to install. Copy the code below and paste just before the </body> tag of your website.
```
<script type="text/javascript">

EVA_API_KEY = 'YOUR_PUBLIC_API_KEY_HERE';

// In case of a slow connection the validation may take longer than desired.
// in those cases, the request may timeout.
// Here you can set that timeout or simply leave it commented to use the default (3 seconds).
// var EVA_TIMEOUT_SECONDS = 3;

</script>

<script async type="text/javascript" src="cdn_JS"></script>
```

>## Important Notes:
>- You can get your API key from EVA dashboard.
>- Do not forget to add your website address into approved CORS domains of your API key.
>- The widget will search for all fields with the attribute type="email" and class="eva-validator".
