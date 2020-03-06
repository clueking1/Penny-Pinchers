$('.signup-form').on('submit', function (e) {
    e.preventDefault()

    const signUp = {
        userinfo: $('.form [name=user]').val().trim(),
        firstName: $('.fname').val().trim(),
        lastName: $('.lName').val().trim(),
        uName: $('.uName').val().trim(),
        pwd: $('.pwd').val().trim(),
        pwd2: $('.pwd2').val().trim()
    }

    $.ajax('/signup', {
        type: 'PUT',
        data: signUp
    }).then(
        function () {
            location.reload()
            console.log(data)
        }

    )
})