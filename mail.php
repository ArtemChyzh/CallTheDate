<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $subject = $_POST["subject"];
        $who = $_POST["who"];
        $whom = $_POST["whom"];
        $when = $_POST["when"];

        $message = "Hello, my darling!<br>I hope you will be able " .strtolower($subject). " in " .strtolower($subject). "<br>Love you so match)<br>" .$who;
        $headers = "From: cupidsmail@calldate.com";

        $success = mail($whom, $subject, $message, $headers);

        if ($success) {
            header("location: index.html");
        }
        else {
            echo "Failed to send invitation. Please try again later.";
        }
    }
?>