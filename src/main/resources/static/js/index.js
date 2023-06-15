$(document).ready(function () {
    // Определяем пользователя (имя и роли)
    let user = {};
    $.ajax({
        url: "http://localhost:8080/user",
        type: 'GET',
        success: function (data) {
            user = data;
            $('#nameAndRolesOfUser').empty();
            let roles = '';
            for (let i = 0; i < data.roles.length; i++) {
                roles += data.roles[i] + ' ';
            }
            user.rolesAsString = roles;
            $('#nameAndRolesOfUser').append(`
                <span class="font-weight-bold">${data.name}</span>
                <span>with roles: ${roles} </span>
            `);
            $('#nameAndRolesOfUser').trigger('onLoadNameAndRolesUserData');
        },
        error: function (jqXHR) {
            let errorData = JSON.parse(jqXHR.responseText);
            $('#nameAndRolesOfUser').empty();
            $('#nameAndRolesOfUser').append(`<span class="text-danger">${errorData.message}</span>`);
        }
    });

    // Формируем навигационную панель после получения данных с сервера
    $('#nameAndRolesOfUser').on('onLoadNameAndRolesUserData', function () {
        for (let i = 0; i < user.roles.length; i++) {
            if (user.roles[i] === 'USER') {
                $('.sidebar ul').append(`
                <li class="py-1">
                    <a href="/user" id="anchorButtonToUser">User</a>
                </li>
            `);
            }
            if (user.roles[i] === 'ADMIN') {
                $('.sidebar ul').append(`
                <li class="py-1">
                    <a href="/admin" id="anchorButtonToAdmin">Admin</a>
                </li>
            `);
            }
        }
        $('.sidebar ul :nth-child(1)').addClass('active');

        // Инициируем событие для загрузки первоначального содержимого User Content или Admin Content        
        if ($('.sidebar ul :nth-child(1) [href="/user"]').text().includes('User')) {
            console.log(user);
            $('#personContent').trigger('onLoadUserContent'); // Если кнопка User активна, то показываем userContent 
        } else {
            $('#personContent').trigger('onLoadAdminContent');// Если кнопка Admin активна, то показываем adminContent 
        }
    });

    //Событие загрузки UserContent
    $('#personContent').on('onLoadUserContent', function () {
        if (('#personContent div').length) {
            $('#personContent').empty();
        }
        let userContent = `
                <div class="my-3"><h2>User information-page</h2></div>
                <div class="tab-content">
                    <div id="aboutUser" class="tab-pane border border-top-0 active">
                        <h5 class="pt-3 mb-3 pl-4 pb-3 bg-light borderline">About user</h5>
                        <div class="ml-4 mr-4">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Age</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.firstName}</td>
                                    <td>${user.surname}</td>
                                    <td>${user.age}</td>
                                    <td>${user.name}</td>
                                    <td>${user.rolesAsString}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>`;
        $('#personContent').append(String(userContent));
    });

    //Событие загрузки AdminContent
    $('#personContent').on('onLoadAdminContent', function () {
        if (('#personContent div').length) {
            $('#personContent').empty();
        }
        $.ajax({
            url: "http://localhost:8080/admin",
            type: 'GET',
            success: function (userData) {
                let tableRowsUsersContent = '';
                for (let i = 0; i < userData.length; i++) {
                    let rolesAsString = '';
                    for (let j = 0; j < userData[i].roles.length; j++) {
                        rolesAsString += userData[i].roles[j] + ' ';
                    }

                    tableRowsUsersContent += `
                        <tr>
                            <td>${userData[i].id}</td>
                            <td>${userData[i].firstName}</td>
                            <td>${userData[i].surname}</td>
                            <td>${userData[i].age}</td>
                            <td>${userData[i].name}</td>
                            <td>${rolesAsString}</td>
                            <td>
                                <div>
                                    <input class="btn btn-info btn-sm editModalButton"
                                        type="submit" value="Edit">
                                </div>
                            </td>
                            <td>
                                <div>
                                    <input class="btn btn-danger btn-sm deleteModalButton"
                                        type="submit" value="Delete">
                                </div>
                            </td>
                        </tr>`;
                }

                let adminContent = `
                <div class="my-3">
                    <h2>Admin panel</h2>
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" href="#adminTab" data-toggle="tab">Users table</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#userInsertTab" data-toggle="tab">New User</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <!--Начало Tab ADMIN'а для вставки записи-->
                    <div id="adminTab" class="tab-pane border border-top-0 active">
                        <h5 class="pt-3 mb-3 pl-4 pb-3 bg-light botomline">All users</h5>
                        <div class="ml-4 mr-4">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Age</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                ${tableRowsUsersContent}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--КОНЕЦ Tab ADMIN'а для вставки записи-->
                
                    <!--Начало Tab USER INSERT'а для добавления записи-->
                    <div id="userInsertTab" class="tab-pane border">
                        <h5 class="pt-3 mb-3 pl-4 pb-3 bg-light botomline">Add new user</h5>
                        <div class="row justify-content-center">
                            <div class="col-4 mt-2">
                                <form method="POST" action="/admin" id="insertUserForm">
                                    <div class="form-group">
                                        <span class="text-danger text-center font-weight-bold"" id="errorMessage"></span>
                                        <div class="d-flex font-weight-bold justify-content-center">
                                            <label for="name">First name</label>
                                        </div>
                                        <input type="text" name="firstName" id="name" class="form-control">
                                        <span class="text-danger text-center"></span>
                                    </div>
                                    <div class="form-group">
                                        <div class="d-flex font-weight-bold justify-content-center">
                                            <label for="surname">Last name</label>
                                        </div>
                                        <input type="text" name="surname" id="surname" class="form-control">
                                        <span class="text-danger text-center"></span>
                                    </div>
                                    <div class="form-group">
                                        <div class="d-flex font-weight-bold justify-content-center">
                                            <label for="age">Age</label>
                                        </div>
                                        <input type="number" name="age" id="age" class="form-control">
                                        <span class="text-danger text-center"></span>
                                    </div>
                                    <div class="form-group">
                                        <div class="d-flex font-weight-bold justify-content-center">
                                            <label for="login">E-mail</label>
                                        </div>
                                        <input type="text" name="name" id="login" class="form-control">
                                        <span class="text-danger text-center"></span>
                                    </div>
                                    <div class="form-group">
                                        <div class="d-flex font-weight-bold justify-content-center">
                                            <label for="password">Пароль</label>
                                        </div>
                                        <input type="password" name="password" id="password"
                                               class="form-control">
                                        <span class="text-danger text-center"></span>
                                    </div>
                                    <div class="d-flex-column justify-content-center">
                                        <div class="d-flex font-weight-bold justify-content-center">
                                            <label>Role</label>
                                        </div>
                                        <select name="roles" class="custom-select" multiple size="2">
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="USER">USER</option>
                                        </select>
                                        <span class="text-danger text-center"></span>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center my-3">
                                        <button class="btn btn btn-success" type="submit">
                                            Add new user
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> <!--Конец Tab USER INSERT формы для добавления записи-->
                </div> <!--Конец TabContent`;

                $('#personContent').append(adminContent);
            },

            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'No connection.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                $('#personContent').html(msg);
            }
        });
    });

    $('#main-container .nav').on('click', '#anchorButtonToUser', function () {
        $('.sidebar ul li').removeClass('active');
        $('#anchorButtonToUser').parent().addClass('active');
        $('#personContent').trigger('onLoadUserContent');
        return false;
    });

    $('#main-container .nav').on('click', '#anchorButtonToAdmin', function () {
        $('.sidebar ul li').removeClass('active');
        $('#anchorButtonToAdmin').parent().addClass('active');
        $('#personContent').trigger('onLoadAdminContent');
        return false;
    });


    //Обработчик события добавления пользователя
    $('#main-container').on('click', '#insertUserForm button', function (event) {
        event.preventDefault();
        $('#insertUserForm span').text('');

        var userData = {};
        $('#insertUserForm').find('input, select').each(function () {
            userData[this.name] = $(this).val();
        });

        $.ajax({
            url: "http://localhost:8080/admin",
            type: 'POST',
            data: JSON.stringify(userData),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (response) {
                $('#personContent').trigger('onLoadAdminContent');
            },
            error: function (jqXHR) {
                let errorData = JSON.parse(jqXHR.responseText);
                console.log(JSON.stringify(errorData)) //
                $('#errorMessage').text(errorData['message']);
                for (let prop in errorData.errors) {
                    if (prop !== 'roles') {
                        selector = `#insertUserForm input[name="${prop}"] + span`;
                        $(selector).text(errorData.errors[prop]);
                    } else {
                        selector = `#insertUserForm select[name="${prop}"]`;
                        $(selector).parent('div').children('span').text(errorData.errors[prop]);
                    }
                }
            }
        });
    });

});


