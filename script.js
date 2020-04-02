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
        .then((responseData) => {


            let cityInfo = responseData.data.request[0].query;
            let weatherInfo = responseData.data.weather[0];

            console.log(cityInfo, weatherInfo);

            let weatherObj = {

                date: weatherInfo.date,
                tempMin: weatherInfo.mintempC,
                tempMax: weatherInfo.maxtempC,
                avgTemp: weatherInfo.avgtempC,
                sunrise: weatherInfo.astronomy[0].sunrise,
                sunset: weatherInfo.astronomy[0].sunset

            };
            // document.querySelector('h2').textContent = `Forecast for ${weatherObj.date}, ${cityInfo}`;
            $('h2').text(`Forecast for ${weatherObj.date}, ${cityInfo}`);
            $('h2').css('display', 'block');
            console.log(weatherObj);
            (function sendDataToFirebase() {
                let postOptions = {
                    method: 'POST',
                    headers: {
                        'Contend-Type': 'application/json'
                    },
                    body: JSON.stringify(responseData)
                };

                fetch('https://weather-forecast-b8dbe.firebaseio.com/Countries.json', postOptions)
                    .then((response) => {
                        return response.text();
                    })
                    .then((resp) => { console.log(resp) })
                    .catch((error) => { console.log(error); alert('City name is EMPTY. Please fill in a correct city name!') })
            })();

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

$('#btn3').click(function (e) {
    let town = document.getElementById('input').value;
    let URL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=d32da97ae5564c43a3f72157203103&q=${town}&format=json&num_of_days=1`;
    document.getElementById('input').value = '';
    (async function () {
        try {
            let data = await (await fetch(URL)).json();
            console.log(data);

        } catch (error) {
            console.log(error);
            alert('City name is EMPTY. Please fill in a correct city name!')

        }
    })();
})


