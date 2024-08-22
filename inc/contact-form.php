<?php

$received_data = json_decode(file_get_contents("php://input"));

if(!isset($_POST) || $received_data === null || $received_data->action !== 'send-email'){
  $http = (empty($_SERVER['HTTPS']) ? 'http' : 'https');
  header('Location: ' . $http . '://' . $_SERVER['SERVER_NAME']);
  exit;
}

function cleanUpCode($input, $encoding = 'UTF-8'){
  return htmlspecialchars(
    strip_tags($input),
    ENT_QUOTES | ENT_HTML5,
    $encoding
  );
}

if ($received_data->action === 'send-email') {
  $name = $received_data->name;
  $mail = $received_data->mail ;
  $subject = $received_data->subject;
  $message = $received_data->message;
  $mailSignature = $received_data->mailSignature;
  $sendFrom = '';

  if($mailSignature !== ''){
    $sendFrom = "<br><br>---<br><small>" . $mailSignature . "</small>";
  }

  // $receiver => insert here your email address:
  $receiver = "!!! here your email address !!!";
  $name = cleanUpCode($name);
  $mail = cleanUpCode($mail);
  $subject = cleanUpCode($subject);
  $message = nl2br(cleanUpCode($message));

  $from = "From: " . $name . " <" . $receiver . ">\n";
  $from .= "Reply-To: " . $mail . "\n";
  $from .= "Content-Type: text/html;charset=UTF-8\n";
  $text = $message . $sendFrom;
  $success = mail($receiver, $subject, $text, $from);

  echo json_encode($success);
}