/*$(document).ready(function()) {
    $("form").submit(function()) { // Событие отправки с формы
        var form_data = $(this).serialize(); // Собираем данные из полей
        $ajax({
            tipe: "POST", // Метод отправки
            url: "sendform.php", // Путь к PHP обработчику sendform.php
            data: form_data,
            success: function() {
                $.('.popup')addClass('active');
            }
        });
        event.preventDefault();
    });
});

*/



jQuery(document).ready(function(){
    jQuery("form").submit(function() { // Событие отправки с формы
        var form_data = jQuery(this).serialize(); // Собираем данные из полей
        console.log(form_data);
		jQuery.ajax({
			type: "POST", // Метод отправки
			url: "sendform.php", // Путь к PHP обработчику sendform.php
			data: form_data,
			/*success: swal({
				title: "Спасибо за заявку!",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            })*/
        });
        $(this).find('input, textarea').prop('disabled', true);
        event.preventDefault();
    });
});