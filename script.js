function createDiv(divClass = null) {
    let div = document.createElement("div");
    if (divClass !== null) {
      div.setAttribute("class", divClass);
    }
    return div;
  }
  
  function createImg(src = null, imgClass = null) {
    let img = document.createElement("img");
    if (imgClass !== null) {
      img.setAttribute("class", imgClass);
    }
    if (src !== null) {
      img.setAttribute("src", src);
    }
    return img;
  }
  
  function addBreak() {
    let br = document.createElement("br");
    return br;
  }
  
  function addParagraph(pclass = null) {
    let p = document.createElement("p");
    if (pclass !== null) p.setAttribute("class", pclass);
    return p;
  }
  
  function addButton(text, bclass = null) {
    let button = document.createElement("button");
    button.innerText = text;
    if (bclass !== null) {
      button.setAttribute("class", bclass);
    }
  
    return button;
  }
  
  function getWeather(country) {
    let url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      country +
      "&appid=9069688a96d60b45c00135f76c6433d8";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById(
          country
        ).innerHTML = `<span style='font-weight:bold;color: rgb(22, 235, 22);'>Weather Data</span> <br>
        Humidity : ${data["main"]["humidity"]} 
        <br> Pressure : ${data["main"]["pressure"]}
        <br>Temparature : ${data["main"]["temp"]}
        <br>Maximum Temparature : ${data["main"]["temp_max"]}
        <br>Minimum Temparature : ${data["main"]["temp_min"]}`;
      })
      .catch((err) => {
        document.getElementById(
          country
        ).innerHTML = `<span style='color: red; font-weight: bold;'>No weather data found !</span>`;
        console.log(err);
      });
  }
  
  function createCards(data, Container) {
    let i = 0;
    while (i < data.length) {
      let col = 0;
      let rowDiv = createDiv("row");
  
      while (col + i < data.length && col < 3) {
        let colDiv = createDiv("col-lg-4 col-sm-6");
        let cardDiv = createDiv("card text-center text-white");
  
        let cardHeader = createDiv("card-header bg-dark");
        cardHeader.innerHTML = data[col + i]["name"];
  
        let cardImage = createImg(
          data[col + i].flag,
          "card-img-top img-fluid flagClass"
        );
  
        let cardBody = createDiv("card-body text-light");
  
        let paragraph = addParagraph("card-text");
        let paragraph2 = addParagraph("card-text");
        paragraph2.setAttribute("id", data[col + i]["name"]);
        paragraph.innerHTML =
          "Capital : " +
          data[col + i]["capital"] +
          "<br>" +
          "Region : " +
          data[col + i]["region"] +
          "<br>" +
          "Country Code : " +
          data[col + i]["alpha3Code"] +
          "<br>" +
          "Latitude : " +
          data[col + i]["latlng"][0] +
          "<br>" +
          "Longitude : " +
          data[col + i]["latlng"][1];
        cardBody.appendChild(paragraph);
        cardBody.appendChild(paragraph2);
  
        let button = addButton("Click for weather", "btn btn-outline-light");
        button.value = data[i + col]["name"];
        button.setAttribute("onclick", "getWeather(this.value)");
        cardBody.appendChild(button);
  
        cardDiv.append(cardHeader, cardImage, cardBody);
  
        colDiv.append(cardDiv);
        rowDiv.append(colDiv);
  
        col++;
      }
      i = i + 3;
      Container.append(rowDiv);
    }
  }
  
  let Container = createDiv("container");
  
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      createCards(data, Container);
    })
    .catch((err) => {
      console.err(err);
    });
  
  document.body.append(Container);