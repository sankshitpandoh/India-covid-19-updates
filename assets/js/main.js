let receivedData
let dateTime
let lastUpdateTime = []
let month = ['January','February','March','April','May','June','July','August','September','October','November','December']

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      receivedData = JSON.parse(this.responseText);
      updateSummaryStats(receivedData)
      updateSingleStateStats(receivedData)
  }
};
xhttp.open("GET", "https://api.rootnet.in/covid19-in/stats/latest", true);
xhttp.send();

new WOW().init();

function updateSummaryStats(receivedData){
  dateTime = new Date(receivedData.lastRefreshed)
  lastUpdateTime[0] = dateTime.getDate()
  lastUpdateTime[1] = dateTime.getMonth()
  lastUpdateTime[2] = dateTime.getFullYear()
  lastUpdateTime[3] = dateTime.toLocaleTimeString()
  document.querySelector(".lastUpdate span").innerHTML = `${lastUpdateTime[0]} ${month[lastUpdateTime[1]]} ${lastUpdateTime[2]} ${lastUpdateTime[3]} `
  document.getElementById("tCases").innerHTML = receivedData.data.summary.total
  document.getElementById("iCases").innerHTML = receivedData.data.summary.confirmedCasesIndian
  document.getElementById("fCases").innerHTML = receivedData.data.summary.confirmedCasesForeign
  document.getElementById("aCases").innerHTML = receivedData.data.summary.total - (receivedData.data.summary.discharged + receivedData.data.summary.deaths)
  document.getElementById("rCases").innerHTML = receivedData.data.summary.discharged
  document.getElementById("dCases").innerHTML = receivedData.data.summary.deaths

  // counting up the case numbers using JQuery
  $('.g-stat-cont h4').counterUp({
    delay: 10,
    time: 1000
    });
}

function updateSingleStateStats(receivedData){
  for(let i = 0; i < receivedData.data.regional.length; i++){
    document.querySelector(".single-state-list").innerHTML += `<div class="col-12 p-1 wow bounceInUp"> <div class="single-state d-flex justify-content-center">
    <div class="col-2 d-flex align-items-center"> <h3 class="text-left"> ${receivedData.data.regional[i].loc} </h3> </div>
    <div class="col-2 d-flex align-items-center justify-content-center"> <h3 text-center> ${receivedData.data.regional[i].confirmedCasesIndian + receivedData.data.regional[i].confirmedCasesForeign } </h3> </div>
    <div class="col-2 d-flex align-items-center justify-content-center"> <h3 text-center> ${(receivedData.data.regional[i].confirmedCasesIndian + receivedData.data.regional[i].confirmedCasesForeign) - (receivedData.data.regional[i].discharged + receivedData.data.regional[i].deaths) } </h3> </div>
    <div class="col-2 d-flex align-items-center justify-content-center"> <h3 text-center> ${receivedData.data.regional[i].discharged} </h3> </div>
    <div class="col-2 d-flex align-items-center justify-content-center"> <h3 text-center> ${receivedData.data.regional[i].deaths} </h3> </div> 
    </div></div>`
  }
}

