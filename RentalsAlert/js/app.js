//localforage APIs
function set (key, obdata) {
	localforage.setItem(key.toString(), obdata).then(function(value) {
    // This will output `1`.
    console.log(obdata.type + "House has been saved!");
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});
}

function get() {
//localforage iterate through all key/value pairs
//using ES6 Promises.
var bone = [];
var ini = "";
var out = "";

localforage.iterate(function(value, key, iterationNumber) {
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.
    //console.log([key, value]);
    bone.push(value);

}).then(function() {
    console.log('Iteration has completed');
    for(var i=0; i<bone.length; i++) {
			ini = "<div class=\"border m-2 bg-light shadow col\" id=\""+bone[i].id+" \">Type: "+bone[i].type+"<br>Location: "+bone[i].location+"<br>Description: "+bone[i].description+"</div>";
			out += ini;
		}
		document.getElementById('headin').innerHTML = "Saved Houses";
		document.getElementById('allHouses').innerHTML = out;
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});
}



//Register service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


//searching
function dinga() {
	var q = document.getElementById('searchform').value;
	let data = {
     	loc: q
	};
	fetch('query.php', {
		method: 'post',
		body: JSON.stringify(data)
	}).then(response => response.text()).then(data => {
		document.getElementById('prefered').innerHTML = data;
	})
}

//variable for storing database data as object
var jar;
//All available houses to be loaded when page loads
window.addEventListener('load', () => {
	fetch('search.php').then(response => response.json()).then(data => {
		jar = data;
		var out = "";
		var ini = "";
		for(var i=0; i<jar.length; i++) {
			ini = "<div class=\"border m-2 bg-light shadow col\" id=\""+jar[i].id+" \">Type: "+jar[i].type+"<br>Location: "+jar[i].location+"<br>Description: "+jar[i].description+"<br><button onclick=\"matrix("+jar[i].id+")\">Save</button></div>";
			out += ini;
		}
		document.getElementById('allHouses').innerHTML = out;
	})
});

//function for the save buttons, for saving a house in localforage for offline viewing
function matrix(arg) {
	set(arg, jar[arg - 1]);
}