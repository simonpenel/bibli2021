/*
Functions that deal with navigation and language switch
*/
function onLoad() {
	SwitchLanguage("int-fr","tree-fr","wiki-fr"); // IMPORTANT!!! REMOVE FOR PROD ON PHONES
//  Ajout Simon:
	setupTimers();
//	console.log(navigator.language)
	//UNCOMMENT WHAT FOLLOWS WHEN THE FR VERSION IS READY. AND TERMINATE THE TRANSLATION (TODO)
/*	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);displaySpecies(largeur,hauteur)
*/
/*  var largeur = window.innerWidth; // maj de la largeur en cas de modif
	var hauteur = window.innerHeight; // maj de la largeur en cas de modif*/

//	displaySpecies_BS();
}
function onDeviceReady() {
	// testCon();
	flyvalue = window.localStorage.getItem("fly")
	if ( flyvalue=== null) {
		window.localStorage.setItem("fly", "false")
	}
	if ( flyvalue=== "true") { //la case était coché en quittant l"appli la dernière fois
		$("#ChoiceExplo").find('i').toggleClass('fa-square-o fa-check-square-o')
	}
	langvalue = window.localStorage.getItem("lang")
	if (langvalue===null) {
		if (navigator.language==="fr-FR") {
			SwitchLanguage("int-fr", "tree-fr","wiki-fr")
		}
		else {
			SwitchLanguage("int-en", "tree-en1","wiki-en")
		}
	}
	else {
		langvalues=langvalue.split("+")
		SwitchLanguage(langvalues[0],langvalues[1],langvalues[2])
	}
	//put back the saved stuff
	favorissauvegarde = window.localStorage.getItem("favoris")
	if (favorissauvegarde!==null) {
		$("#favoritesdiv").html(favorissauvegarde)
	}
	//ADD CONTROL FOR BACK BUTTON
	document.addEventListener("backbutton", onBackKeyDown, false);
}

//function that handles how the back button of the phone behaves.
function onBackKeyDown() {
	$('.modal').modal('hide'); //fermer tous les modal
	$('.swiper-container').hide()
}
function onOffline() {
	//connection
	$(".divconnectionerror").show()
}
function onOnline() {
	//connection
	$(".divconnectionerror").hide()
}
