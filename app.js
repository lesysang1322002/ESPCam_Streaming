// Database Paths
var dataTempPath = 'tem';
var dataHumPath = 'humi';
var dataAirPath = 'air';
var button1Path = 'button1';
var button2Path = 'button2';
var button3Path = 'button3';
var button4Path = 'button4';

// Get a database reference 
const dataTemp = database.ref(dataTempPath);
const dataHum = database.ref(dataHumPath);
const dataAir = database.ref(dataAirPath);
const button1 = database.ref(button1Path);
const button2 = database.ref(button2Path);
const button3 = database.ref(button3Path);
const button4 = database.ref(button4Path);

// Variables to save database current values
var tempReading;
var humReading;
var airReading;

dataTemp.on('value', (snapshot) => {
  tempReading = snapshot.val();
  console.log(tempReading);
  document.getElementById("temperature").innerHTML = tempReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

dataHum.on('value', (snapshot) => {
  humReading = snapshot.val();
  console.log(humReading);
  document.getElementById("humidity").innerHTML = humReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

dataAir.on('value', (snapshot) => {
  airReading = snapshot.val();
  console.log(airReading);
  document.getElementById("airQuality").innerHTML = airReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

function Button1() {
  button1.set(true) // Cập nhật giá trị thành true
  .then(() => {
      console.log('Button1 value updated to true');
  })
  .catch((error) => {
      console.error('Error updating button1 value:', error);
  });
}

function Button2() {
  button2.set(true) // Cập nhật giá trị thành true
  .then(() => {
      console.log('Button2 value updated to true');
  })
  .catch((error) => {
      console.error('Error updating button2 value:', error);
  });
}

function Button3() {
  button3.set(true) // Cập nhật giá trị thành true
  .then(() => {
    console.log('Button3 value updated to true'); 
  })
  .catch((error) => { 
    console.error('Error updating button3 value:', error);
  });
}

function Button4() {
  button4.set(true) // Cập nhật giá trị thành true
  .then(() => {
    console.log('Button4 value updated to true');
  })
  .catch((error) => {
    console.error('Error updating button4 value:', error);
  });
}

function updateImage() {
    var imgRef = storageRef.child('data/photo.jpg');

    firebase.auth().signInAnonymously().then(function() {
        imgRef.getDownloadURL().then(function(url){
            document.getElementById('img').src = url;
        }).catch(function(error) {
            console.error(error);
        });
    });

    imgRef.getMetadata()
      .then((metadata) => {
        var date = new Date(metadata.timeCreated);
        var time = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
        var writtenDate = (date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
        document.getElementById("date-time").innerHTML = time + " at " + writtenDate;
      })
      .catch((error)=> {
        console.error(error);
      });

    // Call updateImage again after a short delay to keep updating
    setTimeout(updateImage, 1000); // 1000ms = 1s, adjust as needed
}

document.addEventListener('DOMContentLoaded', function() {
    // Initial image load
    updateImage();
});
