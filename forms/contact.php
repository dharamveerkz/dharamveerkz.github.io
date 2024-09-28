<?php
// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'uniquecoloursofbihar@gmail.com';

if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
} else {
    die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = htmlspecialchars(strip_tags($_POST['name'])); // Sanitize input
$contact->from_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL); // Sanitize email
$contact->subject = htmlspecialchars(strip_tags($_POST['subject'])); // Sanitize subject

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
$contact->smtp = array(
    'host' => 'smtp.example.com',
    'username' => 'your-username',
    'password' => 'your-password',
    'port' => '587'
);
*/

// Add messages with proper sanitization
$contact->add_message(htmlspecialchars(strip_tags($_POST['name'])), 'From');
$contact->add_message(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL), 'Email');
$contact->add_message(htmlspecialchars(strip_tags($_POST['message'])), 'Message', 10);

echo $contact->send();
?>
