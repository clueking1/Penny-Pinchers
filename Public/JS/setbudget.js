console.log('attached')
console.log($('form.budget-form'))
$('.budget-form').on('submit', function (e) {
    console.log('Submitted')
    e.preventDefault()

    const updateBudget = {
        
        
        grocery: $('.budget-form [name=grocery-input]').val().trim(),
        transportation: $('.budget-form [name=transportation-input]').val().trim(),
        dining: $('.budget-form [name=dining-input]').val().trim(),
        shopping: $('.budget-form [name=shopping-input]').val().trim()
    }

    console.log(updateBudget)

    $.ajax('/setBudget', {
        type: 'PUT',
        data: updateBudget
    }).then(
        function() {
            console.log('DID A THING')
        }
    )
})