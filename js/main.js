/*
Author: Courtney Ardis 
Project: Web App Part 2
Term: 1207
*/

//This javascript file is linked to addItem.html

//Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function() {
	
	//'$' used by jquery and jqmobile as reserved word; changed function name to 'e' for future use
	//getElementById Function
	function e(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	//Variable defaults
	var comicGenre = ["--Choose A Genre--", "Superhero", "Horror", "Sci-fi", "Western", "Romance", "Pulp"],
		styleValue;

	//Select field and options populated
	function makeGenre(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags
			selectLi = e("select"),
			makeSelect = document.createElement("select");
		makeSelect.setAttribute("id", "genre");
		for(var i=0, j=comicGenre.length; i<j; i++){
			var makeOption = document.createElement("option");
			var	optText = comicGenre[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of the selected radio button for the storeData function
	function getSelectedRadio(){
		var radios = document.forms[0].illStyle;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				styleValue = radios[i].value;
			}
		}
	}

	//Toggle how the comicForm, clearData, displayData, and addNew links display on the addItem.html page
	function toggleControls(n){
		switch(n){
			case "on":
				e('comicForm').style.display = "none";
				e('clearData').style.display = "inline";
				e('displayData').style.display = "none";
				e('addNew').style.display = "inline";				
				break;
			case "off":
				e('comicForm').style.display = "block";
				e('clearData').style.display = "inline";
				e('displayData').style.display = "inline";
				e('addNew').style.display = "none";
				e('items').style.display = "none";
				break;
			default:
				return false;
		}
	}

	//Function that stores the form fields into Local Storage with a key and value
	function storeData(){
		var id    				= Math.floor(Math.random()*100000000001);
		//Gather up all our form field values and store in an object
		//Object properties contain an array with the form label and input value
		getSelectedRadio();
		var item 				= {};
			item.comicTitle		= ["Title of Comic:", e('comicTitle').value];
			item.seriesTitle	= ["Title of Series:", e('seriesTitle').value];
			item.issueNum		= ["Issue Number:", e('issueNum').value];
			item.dateReleased	= ["Date Released:", e('dateReleased').value];
			item.publisher		= ["Publisher:", e('publisher').value];
			item.rateIssue		= ["Rate of Issue:", e('rateIssue').value];
			item.genre 			= ["Genre:", e('genre').value];
			item.illStyle		= ["Illustration Style:", styleValue];
			item.comments		= ["Comments:", e('comments').value];
		//Save data into Local Storage: Use Stringify to convert our object to a string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Comic saved to index!");
	}

	//Function that displays the data that has been saved into Local Storage
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage.");
		}
		//Write Data from Local Storage to the browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		e('items').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0] + " " + obj[n][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}

	//Function that clears all the items that have been saved in Local Storage
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All comics were deleted!");
			window.location.reload();
			return false;
		}
	}


	//Function calls
	makeGenre();

	//Set Link and Submit Click Events
	var displayLink = e('displayData');
	displayLink.addEventListener("click", getData);
	var clearLink = e('clearData');
	clearLink.addEventListener("click", clearLocal);
	var save = e('submit');
	save.addEventListener("click", storeData);

});