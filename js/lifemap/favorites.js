
function SetStatusOfFavoStar(taxid) {
	const favoids = $.map($('#favoritesdiv > div'), div => div.id);
	console.log(favoids)
	console.log(taxid)
	if (favoids.includes(taxid)) {
//		$("#clickonfavostar").find('i').attr("class","fa fa-star savedfavo")
		$("#clickonfavostar").attr("class","label label-warning")
		$("#clickonfavostar").find('span').html(isfavotext) //remove previous text
	}
	else {
//		$("#clickonfavostar").find('i').attr("class","fa fa-star unsavedfavo")
		$("#clickonfavostar").attr("class","label label-default")
		$("#clickonfavostar").find('span').html(addtofavotext) //remove previous text

	}
}

function AddFavoritesToMenu(taxid,spname,comname,rank) {
	$("#favoritesdiv").append('<div id="'+taxid+'" class="row vertical-align listfavo"></div>');
	$("#"+taxid).append('<div class="col-xs-2" style="padding-right:0px; text-align: right;"></div>')
	$("#"+taxid).append('<div id="col-'+taxid+'" onclick="zoomTo('+taxid+');" class="col-xs-8"></div>')
	$("#"+taxid).append('<div class="col-xs-2" onclick="RemoveFavoriteFromMenu('+taxid+');"><i class="fa fa-minus-circle fa-fw" style="font-size:15px; color: #989898;"></i></div>')
	$("#col-"+taxid).append('<span class="sciname">'+spname+' </span><span class="commonname">'+comname+' </span><span class="rank"><br>'+rank+' </span>')
	//and we change the rank of sciname if rank if a species or a sub species 
	console.log(rank)
	if ((rank==='espèce')||(rank==='sous-espèce')) $("#col-"+taxid).find("span.sciname").toggleClass('sciname scinameItalic')
	console.log("DONE ADDING FAVO")
	checknumberoffavoritesAndSave()
	// makepopupwork("added",spname,rank)
}
function RemoveFavoriteFromMenu(taxid) {
	console.log("CELUI LA IL FAUT LE RETIER")
	$("#"+taxid).remove();
	checknumberoffavoritesAndSave();
	// makepopupwork("removed",spname,rank)
}

// function makepopupwork(whataction, spname, rank) {
// 	console.log(whataction)
// 	if ((rank==='species')||(rank==='subspecies')||(rank==='espèce')||(rank==='sous-espèce')) {
// 		spname = "<i>" + spname + "</i>"
// 	}
// 	spname = "<b>"+spname+"<b>"
// 	$("#nameofaddedspecies").html(spname)
// 	if (whataction==="added") {
// 		$("#removeoradded").html(addedtofavopopup);
// 	}
// 	if (whataction==="removed") {
// 		$("#removeoradded").html(removedfromfavopopup)
// 	}
// 	$("#InfoFavo").show().delay(3000).hide(0);
// }

function checknumberoffavoritesAndSave() {
	const favoids = $.map($('#favoritesdiv > div'), div => div.id);
	console.log(favoids)
	if ((favoids.length===1)&&(favoids[0]==="messagenofavorite")) $("#messagenofavorite").show()
	else $("#messagenofavorite").hide()
	//AND EVERY TIME WE MAKE MODIFICATIONS TO THIS WE SAVE THE FAVORITES FOR LATER USE (AFTER RESTARING PHONE).
	WWW = document.querySelector("#favoritesdiv").innerHTML
	window.localStorage.setItem("favoris", WWW)
}

$("#clickonfavostar").click(function() {
	//get data
	datatowrite = $("#invisibledata").html(); //CA MARCHE
	[taxid,spname,comname,rank] = datatowrite.split("|")
	console.log([taxid,spname,comname,rank])		
	//CHANGER L'ICONE DE L'ÉTOILE
	if($(this).hasClass("label-default")) { //This one is not yet in favorites
		$("#clickonfavostar").attr("class","label label-warning")
		$("#clickonfavostar").find('span').html(isfavotext) //remove previous text
		AddFavoritesToMenu(taxid,spname,comname,rank)
	}
	else {
		$("#clickonfavostar").attr("class","label label-default")
		$("#clickonfavostar").find('span').html(addtofavotext) //remove previous text
		//ON FAIT LA MEME CHOSE MAIS CETTE FOIS ON SUPPRIME L'ENTREE DANS LES FAVORIS
		RemoveFavoriteFromMenu(taxid)
	}
	//À LA FIN ON SAUVEGARDE TOUTE LA DIV DANS WINDOW.LOCALSTORAGE. SI TROP LOURD ON LE FERA JUSTE EN QUITTANT L'APP... 
	console.log("j'ai cliqué")
})



// //This will contain what concerns the saving (restoring is in action.js) of favorites
// WWW = document.querySelector("#favoritesdiv").innerHTML
// //console.log(WWW)
// //window.localStorage.setItem("favoris", WWW)
// $("#favoritesdiv").append(WWW);
// //console.log($("#favoritesdiv").html());
