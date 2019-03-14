window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    let summarySection = document.querySelector('.summaryFull');
    const temperatureSpan = document.querySelector('.temperature span');
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/109df3b42235b38a8d9aee233c2f44cf/${lat},${long}`;
        
        fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                //set DOM Elements from the Api
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //farenheit to celsius
                let celsius = ((temperature - 32) * (5/9));
                //set icon
                setIcons(icon, document.querySelector(".icon"));
                //change F to C
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                });
                //Insert full summary
                summarySection.textContent = data.hourly.summary;
            });        
        });

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}});