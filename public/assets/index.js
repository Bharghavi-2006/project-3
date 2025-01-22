$(document).ready(function(){

    //Add a new birthday
    $('#birthdayForm').on('submit', function (event) {
        event.preventDefault();
        var name = $('#name').val();
        var birthday = $('#birthday').val();
        
        if (!name || !birthday) {
            alert('Please provide both a name and a valid birthday.');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/birthday',
            data: { name: name, birthday: birthday },
            success: function () {
                //do something with the data via front-end
                location.reload();
            },
            error: function (err) {
                alert('Error adding birthday: ' + err.responseText);
            }
        });
    });
    
    //Delete a birthday
    $('#birthdayList').on('click', '.delete-button', function () {
            var name = $(this).closest('li').data('name');
            $.ajax({
                type: 'DELETE',
                url: '/birthday/' + encodeURIcomponent (name),
                success: function () {
                    //do something with frontend framework
                    location.reload();
                },
                error: function (err) {
                    alert('Error deleting birthday: ' +err.responseText);
                }
            });
    });

    //Update a birthday
    $('#birthdayList').on('click', '.update-button', function () {
        var name = $(this).closest('li').data('name');
        var newDate = prompt('Enter new birthday (YYYY-MM-DD):');

        if (newDate) {
            $.ajax({
                type: 'PUT',
                url: '/birthday/' + encodeURIcomponent (name),
                data: { birthday: newDate },
                success: function () {
                    location.reload();
                },
                error: function (err) {
                    alert('Error updating birthday: ' + err.responseText);
                }
            });
        }
    });

    //Search for a birthday
    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        var name = $('#searchName').val().trim();

        if (!name) {
            alert ('Please enter a name to search.');
            return;
        }

        $.ajax({
            type: 'GET',
            url: '/birthday/' + encodeURIcomponent (name),
            success: function (data) {
                if (data) {
                    $('#searchResult').text(`${data.name}'s birthday is on ${new Date(data.birthday).toDateString()}`);
                } else {
                    $('#searchResult').text('No birthday found for that name.');
                }
            },
            error: function (err) {
                alert('Error fetching birthday: ' + err.responseText);
            }
        });
    });
});
