$('.bill-form').on('submit', function (e) {
    e.preventDefault()

    var updateCat = {
        budget: $('.bill-form [name=amount]').val().trim(),
        cat: $('.dropdown-content').val()
    }

    $.ajax('/logBill', {
        type: 'PUT',
        data: updateCat
    }).then(
        function() {
            location.reload()
        }
    )
})