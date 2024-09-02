<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace with your email address
    $to = "nibraz999@gmail.com";
    $subject = "New Contact Form Submission";

    // Collect form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Check that data was sent correctly
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a failure message if validation fails
        echo "Please fill in all fields correctly.";
        exit;
    }

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $headers = "From: $name <$email>";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        // Set a success message
        echo "OK";
    } else {
        // Set a failure message
        echo "There was a problem sending your message. Please try again.";
    }
}
?>
