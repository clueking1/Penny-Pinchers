console.log('Attached')
$('.bill-form').on('submit', function (e) {
    e.preventDefault()

    var updateCat = {
        budget: $('.bill-form [name=amount]').val().trim(),
        cat: $('.dropdown-content').val()
    }

    console.log(updateCat)

    $.ajax('/logBill', {
        type: 'PUT',
        data: updateCat,
        success: function() {
            alert('hi')
        }
    })
})