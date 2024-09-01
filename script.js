

var inputCity;
var city = document.querySelector("#city");
var getCity = document.querySelector("#getCity");
var url;
getCity.addEventListener("click", (event) => {
  try{
    event.preventDefault();
  inputCity = city.value;
  cityName.innerHTML = inputCity;
  console.log(inputCity);
  url = "https://weatherapi-com.p.rapidapi.com/current.json?q=" + inputCity;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "47f027df57msh218b41edb40cf5bp177401jsn85bbc2af682d",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };
  city.value = "";
  // console.log(url);
  fetchData(url, options);
  }catch(error){
    console.log(error);
  }
  
});

async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    var card = document.querySelector("#card");
    console.log(data);
    let flag = "error" in data;
    if(flag){
      // console.log(data.error);
      // p = document.querySelectorAll('p');
      // p.forEach(element => {
      //   element.innerHTML = "";
      // });
      cityName.innerHTML = "Data Not Found";
      card.style.background = "linear-gradient(rgba(244, 6, 6, 0.5), rgba(246, 7, 7, 0.5)),url(cloudBackground.svg)";
      card.style.color = "white";
      condition.innerHTML = "";
    tempC.innerHTML = "";
    tempF.innerHTML = "";
    windM.innerHTML = "";
    windK.innerHTML = "";
    windD.innerHTML = "";
    humidity.innerHTML = ""; 
      
      return;
    }    
    
    // console.log(data.error);
    condition.innerHTML = data.current.condition.text;
    tempC.innerHTML = data.current.temp_c;
    tempF.innerHTML = data.current.temp_f;
    windM.innerHTML = data.current.wind_mph;
    windK.innerHTML = data.current.wind_kph;
    windD.innerHTML = data.current.wind_degree;
    humidity.innerHTML = data.current.humidity;    
    var day = data.current.is_day;
    var check = data.current.condition.text;
    var text = "rain";
    const position = check.indexOf(text);
    var image = document.querySelector("#img");
    var image1 = document.querySelector("#img1");
    if (position !== -1) {
      image.src = "rainy.svg";
      image.style.display = "block";

    } else{
      image.src = "cloud.svg";
      image.style.display = "block";
    }
    // console.log(day);
    console.log(day);
    if(day==0){
      card.style.background = "linear-gradient(rgba(21, 13, 13, 0.5), rgba(21, 9, 9, 0.5)),url(cloudBackground.svg)"; 
      card.style.color = "white";
      image1.src = "moon.svg";
      image1.style.display = "block";
    }else{
      card.style.background = "linear-gradient(rgba(243, 242, 242, 0.5), rgba(245, 243, 243, 0.5)),url(cloudBackground.svg)";
      card.style.color = "black";
      image1.src = "sunny.svg";
      image1.style.display = "block";
    }
   
  } catch (error) {
    console.error("Error: ", error);
    
  }
}

