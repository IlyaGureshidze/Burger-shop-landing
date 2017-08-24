<?php
    header("Content-Type: text/html; charset=utf-8");

    $fio = $_POST['fio'];
    $phone = $_POST['phone'];
    $payment = $_POST['payment-ways'];
    $street = $_POST['street'];
    $home = $_POST['home'];
    $building = $_POST['building'];
    $flat = $_POST['flat'];
    $floor = $_POST['floor'];
    $text = $_POST['text'];
    $callback = $_POST['isCallBack'];
    $callback = isset($callback) ? 'НЕТ' : 'ДА'; 

    $message = '
    <html>
        <head>
        <meta name="charset" content="UTF-8">
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: ' . $name . '</li>
                <li>Телефон: ' . $phone . '</li>
                <li>Улица: ' . $street . '</li>
                <li>Дом: ' . $home . '</li>
                <li>Корпус: ' . $building . '</li>
                <li>Квартира: ' . $flat . '</li>
                <li>Этаж: ' . $floor . '</li>
                <li>Способ оплаты: ' . $payment . '</li>
                <li>Нужно ли перезванивать клиенту: ' . $callback . '</li>
                <li>Комментарий к заказу: ' . $text . '</li>
            </ul>
        </body>
    </html>    
    ';

    $headers = "From: Администратор сайта <enigmaster90@gmail.com>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('enigmaster90@mail.ru', 'Новый заказ на сайте', $message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "OK";
        $data['message'] = "Сообщение отправлено";
    }else{
        $data['status'] = "NO";
        $data['message'] = "Произошла ошибка сервера!";
    }

    echo json_encode($data);


?>