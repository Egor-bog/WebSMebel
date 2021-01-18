jQuery(document).ready(function(){
    jQuery("form").submit(function() { // Событие отправки с формы
        var form_data = jQuery(this).serialize(); // Собираем данные из полей
        
		jQuery.ajax({
			type: "POST", // Метод отправки
			url: "sendform.php", // Путь к PHP обработчику sendform.php
			data: form_data,
			success: swal({
				title: "Спасибо за заявку!",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            })
        });
        $(this).find('input, textarea').prop('disabled', true);

        $(".popup__modal").addClass("active");

      // alert ("Спасибо за заявку!");
   // function restart () {
  //      document.getElementById("contactform").reset();
   // };
  //  setTimeout(restart, 3000);
        event.preventDefault();
    });
});