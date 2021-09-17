function getWikiDesc (spname) {
	var res = '';
	return $.getJSON(wikiurl="https://"+wikilang+".wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages&titles="+spname+"&redirects&exsentences=3&piprop=original|thumbnail|name&pithumbsize=300&callback=?").then(function(data){
		var page = data.query.pages;
		key = Object.keys(page)[0]
		if (key!="-1") {
			res = page[key];
			return res;
		}
		else {
			return null;
		}
	});
}


function markofun(taxid, spname,comname, rank) {
	taxid = taxid.trim();
	spname = spname.trim();
	comname = comname.trim();
	rank = rank.trim()

	//Switch star to active if this node is in favourite already.
	SetStatusOfFavoStar(taxid)

	$('#modaltitle').empty();
	$('#modalbody-text').empty();	
	$('#modalbody-pict').empty();
	$('#modalbody-links').empty();	
    if ((rank==="species")||(rank==="subspecies")||(rank==="espèce")||(rank==="sous-espèce")) {
		$('#modaltitle').append("<span class='scinameItalic'>"+spname+" </span>");	
    }
    else {
		$('#modaltitle').append("<span class='sciname'>"+spname+" </span>");	
	}
	$('#modaltitle').append("<span class='commonname'>"+comname+" </span>");
	$('#modaltitle').append("<span class='rank'>"+rank+" </span>");	
	$("#invisibledata").empty()
	$("#invisibledata").append([taxid,spname,comname,rank].join("|"));
	text = "<div style='font-style:center; color:grey;'>"+wikinoarticle+"</div>";
	pict = "";
	if (spname!="Root") {
		getWikiDesc(spname).then(function(resu){
			if (resu!=null) {
				text = '<div>' + resu.extract + '</div>';
				text += "<div style='padding-bottom:10px;text-align:right; font-size:xx-small;'><a href='https://"+wikilang+".wikipedia.org/wiki/" + spname + "' target='_blank' style='color:grey;'>"+wikimoreon+"<i class='fa fa-wikipedia-w'></i>ikipedia</a><br></div>";
				$('#modalbody-text').append(text);	
				if (resu.thumbnail!==undefined) {
					//we add the image to the popup
					pict = '<div><a href="https://'+wikilang+'.wikipedia.org/wiki/' + spname + '" target="_blank"><img src ='+resu.thumbnail.source+' width="100%"></a></div>'
					$('#modalbody-pict').append(pict);
				}
				else {
					pict = "<div style='padding:10px; font-size:xx-small; text-align:center; color:grey;'>"+wikinopicture+"</div>";
					$('#modalbody-pict').append(pict);
				}
			}
			else {
				$('#modalbody-text').append(text);
				$('#modalbody-pict').append(pict);
			}
		})
	}
	$('#myModal').modal('show');
	$('#viewfullancestry').on("click", function() {
		taxidFrom = taxid;
		taxidTo = "1";
		$("#myModal").modal("hide");
		$("#mainsearch").hide();					
		$('#searchinput2').val(spname + ' ' + comname);
		$('#searchinput3').val('Root');
		$("#route-top").show();
		mrcaroute();
	})
};
