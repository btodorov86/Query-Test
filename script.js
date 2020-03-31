let btn = $('#btn');




$('#btn').click(function (e) { 
    e.preventDefault();
    let town = document.getElementById('input').value;
    let URL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=d32da97ae5564c43a3f72157203103&q=${town}&format=json&num_of_days=1`;    
    document.getElementById('input').value = '';
     fetch(URL)
     .then((response) => {
        return response.json();
        
         
     })
     .then((countries) => {
         console.log(countries);
         
     })
     .catch(err => console.log(err));
    
});

$('#btn2').click(function (e) { 
    e.preventDefault();
    let town = document.getElementById('input').value;
    let URL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=d32da97ae5564c43a3f72157203103&q=${town}&format=json&num_of_days=1`;    
    document.getElementById('input').value = '';
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "json",
        success: function (data) {
            solve(data);
            
        }

        
    });
    function solve(data) {
        console.log(Object.entries(data));    
    }
    
    

    

   

    
});

$('#btn3').click( function (e) {
    let town = document.getElementById('input').value;
    let URL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=d32da97ae5564c43a3f72157203103&q=${town}&format=json&num_of_days=1`;    
    document.getElementById('input').value = '';
    (async function () {
        try {
            let data = await (await fetch(URL)).json();
            console.log(data);
            
        } catch (error) {
            console.log(error);
            
        }
    })();
})


