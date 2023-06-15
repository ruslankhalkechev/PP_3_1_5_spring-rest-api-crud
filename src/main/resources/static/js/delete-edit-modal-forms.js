$(document).ready(function () {

    //Обработчик события нажатия на кнопку УДАЛЕНИЯ пользователя в ТАБЛИЦЕ ADMIN TAB
    $('#main-container').on('click', '.deleteModalButton', function (event) {

        let modalFormDeleteContent = `
                                <div class="modal fade" tabindex="-1" role="dialog" id="deleteModalContent">
                                <!--Модальная форма для удаления записи-->
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Delete user</h4>
                                                <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times; </span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row justify-content-center">
                                                    <div class="col-6 mt-2">
                                                        <form id="modalDeleteForm" method="DELETE"
                                                              action="/admin/none">
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="idModalDelete">ID</label>
                                                                </div>
                                                                <input type="text" name="idModalDeleteName"
                                                                       id="idModalDelete"
                                                                       class="form-control" disabled>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="firstNameModalDelete">First name</label>
                                                                </div>
                                                                <input type="text" name="firstNameModalDeleteName"
                                                                       id="firstNameModalDelete"
                                                                       class="form-control" disabled>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="surnameModalDelete">Last name</label>
                                                                </div>
                                                                <input type="text" name="surnameModalDeleteName"
                                                                       id="surnameModalDelete"
                                                                       class="form-control" disabled>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="ageModalDelete">Age</label>
                                                                </div>
                                                                <input type="number" name="ageModalDeleteName"
                                                                       id="ageModalDelete"
                                                                       class="form-control" disabled>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="loginModalDelete">E-mail</label>
                                                                </div>
                                                                <input type="text" name="loginModalDeleteName"
                                                                       id="loginModalDelete"
                                                                       class="form-control" disabled>
                                                            </div>
                                                            <div class="d-flex-column justify-content-center">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="selectedRoleDelete">Role</label>
                                                                </div>
                                                                <select name="role" class="custom-select"
                                                                        multiple size="2" id="selectedRoleDelete"
                                                                        disabled>
                                                                    <option value="ADMIN">ADMIN</option>
                                                                    <option value="USER">USER</option>
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                    Close
                                                </button>
                                                <button type="submit" class="btn btn-danger" form="modalDelete" id="deleteButton">Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                <!--КОНЕЦ Модальной формы для удаления записи-->
                                </div>`;
        $('#adminTab table').append(modalFormDeleteContent);

        $('#deleteModalContent').modal();

        let buttonClicked = $(event.currentTarget);
        let $userData = $(buttonClicked).closest('tr').children('td').slice(0, 6);
        $('#idModalDelete').val($userData[0].innerHTML);
        $('#firstNameModalDelete').val($userData[1].innerHTML);
        $('#surnameModalDelete').val($userData[2].innerHTML);
        $('#ageModalDelete').val($userData[3].innerHTML);
        $('#loginModalDelete').val($userData[4].innerHTML);
        if (($userData[5].innerHTML).includes('ADMIN')) {
            $('#selectedRoleDelete option[value="ADMIN"]').prop("selected", true);
        }
        if (($userData[5].innerHTML).includes('USER')) {
            $('#selectedRoleDelete option[value="USER"]').prop("selected", true);
        }
    });


    $('#main-container').on('hide.bs.modal', '#deleteModalContent', function (event) {
        $('#deleteModalContent').remove();
    });


    //Обработчик события нажатия на кнопку DELETE в МОДАЛЬНОЙ ФОРМЕ
    $('#main-container').on('click', '#deleteButton', function (event) {
        let urlForDeleteById = 'http://localhost:8080/admin/' + $('#idModalDelete').val();
        $('#modalDeleteForm').attr('action', urlForDeleteById);
        $.ajax({
            url: urlForDeleteById,
            type: 'DELETE',
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                $('#deleteModalContent').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                $('#personContent').trigger('onLoadAdminContent');
            },
        });
    });


    //Обработчик события нажатия на кнопку РЕДАКТИРОВАНИЯ пользователя в ТАБЛИЦЕ ADMIN TAB
    $('#main-container').on('click', '.editModalButton', function (event) {

        let modalFormEditContent = `
                                
                                <div class="modal fade" tabindex="-1" role="dialog" id="editModalContent"> 
                                <!--Модальная форма для редактирования записи-->
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Edit user</h4>
                                                <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times; </span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row justify-content-center">
                                                    <div class="col-6 mt-2">
                                                        <form id="modalEditForm" method="PATCH"
                                                              action="/admin/none">
                                                            <div class="form-group">
                                                                <span class="text-danger text-center font-weight-bold" id="errorMessageInEditModal"></span>
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="idModalEdit">ID</label>
                                                                </div>
                                                                <input type="text" name="id"
                                                                       id="idModalEdit"
                                                                       class="form-control" disabled>
                                                                <span class="text-danger text-center"> </span>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="firstNameModalEdit">First name</label>
                                                                </div>
                                                                <input type="text" name="firstName"
                                                                       id="firstNameModalEdit"
                                                                       class="form-control">
                                                                <span class="text-danger text-center"> </span>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="surnameModalEdit">Last name</label>
                                                                </div>
                                                                <input type="text" name="surname"
                                                                       id="surnameModalEdit"
                                                                       class="form-control">
                                                                <span class="text-danger text-center"> </span>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="ageModalEdit">Age</label>
                                                                </div>
                                                                <input type="number" name="age"
                                                                       id="ageModalEdit"
                                                                       class="form-control">
                                                                <span class="text-danger text-center"> </span>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="nameModalEdit">E-mail</label>
                                                                </div>
                                                                <input type="text" name="name"
                                                                       id="nameModalEdit"
                                                                       class="form-control">
                                                                <span class="text-danger text-center"> </span>
                                                            </div>

                                                            <div class="form-group">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="password">Пароль</label>
                                                                </div>
                                                                <input type="password" name="password" id="passwordModalEdit"
                                                                    class="form-control">
                                                                <span class="text-danger text-center"> </span>
                                                            </div>
                                                            <div class="d-flex-column justify-content-center">
                                                                <div class="d-flex font-weight-bold justify-content-center">
                                                                    <label for="roleModalEdit">Role</label>
                                                                </div>
                                                                <select name="roles" class="custom-select"
                                                                        multiple size="2" id="roleModalEdit">
                                                                    <option value="ADMIN">ADMIN</option>
                                                                    <option value="USER">USER</option>
                                                                </select>
                                                                <span class="text-danger text-center" id="roleError"> </span>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                    Close
                                                </button>
                                                <button type="submit" class="btn btn-primary" form="modalEditForm" id="editButton">Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                <!--КОНЕЦ Модальной формы для удаления записи-->
                                </div>`;

        $('#adminTab table').append(modalFormEditContent);

        $('#editModalContent').modal();

        let buttonClicked = $(event.currentTarget);
        let $userData = $(buttonClicked).closest('tr').children('td').slice(0, 6);
        $('#idModalEdit').val($userData[0].innerHTML);
        $('#firstNameModalEdit').val($userData[1].innerHTML);
        $('#surnameModalEdit').val($userData[2].innerHTML);
        $('#ageModalEdit').val($userData[3].innerHTML);
        $('#nameModalEdit').val($userData[4].innerHTML);
        if (($userData[5].innerHTML).includes('ADMIN')) {
            $('#roleModalEdit option[value="ADMIN"]').prop("selected", true);
        }
        if (($userData[5].innerHTML).includes('USER')) {
            $('#roleModalEdit option[value="USER"]').prop("selected", true);
        }
    });


    $('#main-container').on('hide.bs.modal', '#editModalContent', function (event) {
        $('#editModalContent').remove();
    });


    //Обработчик события нажатия на кнопку EDIT в МОДАЛЬНОЙ ФОРМЕ
    $('#main-container').on('click', '#editButton', function (event) {
        event.preventDefault();
        $('#modalEditForm span').text('');
        var userData = {};
        $('#modalEditForm').find('input, select').each(function () {
            userData[this.name] = $(this).val();
        });
        let urlForEditById = 'http://localhost:8080/admin/' + $('#idModalEdit').val();
        $('#modalEditForm').attr('action', urlForEditById);
        console.log(JSON.stringify(userData));
        $.ajax({
            url: urlForEditById,
            type: 'PATCH',
            data: JSON.stringify(userData),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                $('#editModalContent').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $('#personContent').trigger('onLoadAdminContent');
            },
            error: function (jqXHR) {
                let errorData = JSON.parse(jqXHR.responseText);
                console.log(JSON.stringify(errorData)) //
                $('#errorMessageInEditModal').text(errorData['message']);
                for (let prop in errorData.errors) {
                    if (prop !== 'roles') {
                        selector = `#modalEditForm input[name="${prop}"] + span`;
                        $(selector).text(errorData.errors[prop]);
                    } else {
                        selector = `#modalEditForm select[name="${prop}"]`;
                        $(selector).parent('div').children('span').text(errorData.errors[prop]);
                    }
                }
            }
        });
    });

});



