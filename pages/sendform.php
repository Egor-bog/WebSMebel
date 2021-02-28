<?php
console.log(form_data);
//Сбор данных из полей формы. 
$name = $_POST['name'];
$email = $_POST['email']; 
$comment = $_POST['comment']; 
console.log($name);
$token = "1586211798:AAGlkdifQ9e77Xr28jVCrk3Vbt4CgIXYHqI"; 
$chat_id = "553426980"; /
$sitename = "mariolli.by"; 

$arr = array(

  'Заказ с сайта: ' => $sitename,
  'Имя: ' => $name,
  'Клиент' => $email,
  'Коментарий: ' => $comment
  
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>