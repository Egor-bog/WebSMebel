<?php
console.log(form_data);
//Сбор данных из полей формы. 
$name = $_POST['name'];// Берём данные из input c атрибутом name="name"
$email = $_POST['email']; // Берём данные из input c атрибутом name="mail"
$comment = $_POST['comment']; // Берём данные из input c атрибутом name="phone"
console.log($name);
$token = "1503250586:AAFh8LxuCs32Aj65DOMVpNLYknTKub4aaqg"; // Тут пишем токен
$chat_id = "1229323655"; // Тут пишем ID группы, куда будут отправляться сообщения
$sitename = "mariolli.by"; //Указываем название сайта

$arr = array(

  'Заказ с сайта: ' => $sitename,
  'Имя: ' => $name,
  'Почта' => $email,
  'Коментарий: ' => $comment
  
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>