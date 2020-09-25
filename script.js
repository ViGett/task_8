/*
1) Добавьте на страницу форму регистрации с полями: логин, e-mail, пароль, подтвердите пароль.
2) Добавьте кнопку «Зарегистрироваться».
3) После нажатия на кнопку «Зарегистрироваться» должна быть осуществлена проверка всех введённых данных.
4) Если они корректные, то вывести элемент
с текстом «Спасибо за регистрацию!», очистив всю форму.
5) Если данные некорректные, то вывести элемент
с соответствующим текстом рядом с тем элементом, где была ошибка.
Примечание: логин должен быть от 3 до 32 символов (только буквы и цифры), пароль должен быть минимум 4 символа и, разумеется, должен совпадать с полем «подтвердите пароль».
*/

function submit(event) {
    event.preventDefault();
    clearErrors();

    let error = false;
    let form = event.target;
    let login = form.querySelector('input[name="login"]');
    let email = form.querySelector('input[name="email"]');
    let pass = form.querySelector('input[name="pass"]');
    let conf_pass = form.querySelector('input[name="conf_pass"]');

    if (!login.value.match(/^[a-z0-9_-]{3,32}$/i)) {
        error = true;
        login.after(getError('Некоректный логин'));
    }

    if (!email.value.match(/^[a-z0-9_][a-z0-9-_\.]*[a-z0-9_]*@([a-z0-9]+[a-z0-9_-]*[a-z0-9]+\.)+[a-z0-9]+$/i)) {
        error = true;
        email.after(getError('Некоректный E-Mail'));
    }

    if (pass.value.length < 4) {
        error = true;
        pass.after(getError('Слишком короткий пароль'));
    }

    if (pass.value != conf_pass.value) {
        error = true;
        conf_pass.after(getError('Пароли не совпадают'));
    }

    if (!error) {
        let p = document.createElement('p');
        p.innerHTML = 'Спасибо за регистрацию!';
        login.value = '';
        email.value = '';
        pass.value = '';
        conf_pass.value = '';
        form.prepend(p);
    }
}

function clearErrors() {
    let errors = document.querySelectorAll('.error');
    for (let e of errors) e.remove();
}

function getError(msg) {
    let span = document.createElement('span');
    span.innerHTML = msg;
    span.classList.add('error');
    return span;
}

document.addEventListener('DOMContentLoaded', function(event) {

    document.querySelector('form').addEventListener('submit', submit);

})
