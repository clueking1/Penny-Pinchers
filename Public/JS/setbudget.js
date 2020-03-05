$('.budget-form').on('submit', function (e) {
    e.preventDefault()

    const updateBudget = {
        budget: $('.budget-form [name=budget]').val().trim(),
        grocery: $('.groceryBudget').val(),
        transportation: $('.transportationBudget').val(),
        dining: $('.diningBudget').val(),
        shopping: $('.shoppingBudget').val()
    }

    $.ajax('/setBudget', {
        type: 'PUT',
        data: updateBudget
    }).then(
        function() {
            location.reload()
        }
    )
})