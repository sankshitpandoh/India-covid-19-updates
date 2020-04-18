let receivedData
let dateTime
let lastUpdateTime = []
let month = ['January','February','March','April','May','June','July','August','September','October','November','December']

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       receivedData = JSON.parse(this.responseText);
      //  console.log(receivedData.data.summary.total)
       dateTime = new Date(receivedData.lastRefreshed)
       lastUpdateTime[0] = dateTime.getDate()
       lastUpdateTime[1] = dateTime.getMonth()
       lastUpdateTime[2] = dateTime.getFullYear()
       lastUpdateTime[3] = dateTime.toLocaleTimeString()
      //  console.log(month[lastUpdateTime[1]])
       document.querySelector(".lastUpdate span").innerHTML = `${lastUpdateTime[0]} ${month[lastUpdateTime[1]]} ${lastUpdateTime[2]} ${lastUpdateTime[3]} `
       document.getElementById("tCases").innerHTML = receivedData.data.summary.total
       document.getElementById("iCases").innerHTML = receivedData.data.summary.confirmedCasesIndian
       document.getElementById("fCases").innerHTML = receivedData.data.summary.confirmedCasesForeign
       document.getElementById("rCases").innerHTML = receivedData.data.summary.discharged
       document.getElementById("dCases").innerHTML = receivedData.data.summary.deaths
      }
    };
    xhttp.open("GET", "https://api.rootnet.in/covid19-in/stats/latest", true);
    xhttp.send();
