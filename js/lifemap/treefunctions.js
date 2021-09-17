//HERE We create two variables that will be responsible for storing taxids of species from and two which roads may be computed
var taxidFrom;
var taxidTo;	
function getMrca(a1, a2) {
  	//we explore a1 and check if the value is present in a2.
  	//if it is, we store both the corresponding indexes in a1 and a2 (and cut after?...)
  		for (var i = 0; i < a1.length; i++) {
   		if (a2.indexOf(a1[i]) != -1) {
    		mrca = a1[i];
			break; 
	    }
    }	
    if (mrca===0) {mrca = 1;}
	return mrca;
}
function getRoute(a1, a2) {
  		//we explore a1 and check if the value is present in a2.
  		//if it is, we store both the corresponding indexes in a1 and a2 (and cut after?...)
  		var res1 = [];
  		var res2 = [];
  		for (var i = 0; i < a1.length; i++) {
   		res1.push(a1[i]);
   		if (a2.indexOf(a1[i]) != -1) {
    		var i2=a2.indexOf(a1[i]);
			break; 
		}
  		}
    for (var i = 0; i < i2; i++) {
	    res2.push(a2[i]);
    }
	return res1.concat(res2.reverse());
   }  

   var zoomTo = function(taxid) {
	$("#route-details").hide();
	$("#theMenu").modal("hide");
 		var url = 'http://'+ServerAddress+'/solr/taxo/select?q=taxid:"'+taxid+'"&wt=json';
	if (taxid === 1) {
		if ($('#ChoiceExplo').find('i').attr('class').match("fa-check-square-o")===null) {
			map.setView(L.latLng([-4.226497,0]),7);
		}
		else {map.flyTo( L.latLng([-4.226497,0]),7);}
	}
	else if (typeof taxid != 'undefined') {
  		$.ajax({
			url : url,
			success : function(data) {
			var docs = JSON.stringify(data.response.docs);
			var jsonData = JSON.parse(docs);
			if ($('#ChoiceExplo').find('i').attr('class').match("fa-check-square-o")===null) {
				map.setView(jsonData[0].coordinates, jsonData[0].zoom);
			}
			else {	
				map.flyTo(jsonData[0].coordinates, jsonData[0].zoom);		    
			}
		},
		dataType : 'jsonp',
		jsonp : 'json.wrf'
		});	    
	}
	else {
		alert('We could not Zoom to this location. \nPlease send and email to damien.de-vienne@univ-lyon1.fr explaining this issue and the taxid that was problematic.');
	}
};

//We create here the function that will build popups (modals).
function CreatePopUps() {
//we only remove markers that have their popup closed.
	map.removeLayer(markers);
	markers = new L.FeatureGroup();
	z = map.getZoom() + 4;
	bb = map.getBounds();
	var lon1 = bb._southWest.lng;
	var lon2 = bb._northEast.lng;
	var lat1 = bb._southWest.lat;
	var lat2 = bb._northEast.lat;
	var URL2 = "http://"+ServerAddress+"/solr/taxo/select?q=*:*&fq=zoom:[0 TO " + z + "]&fq=lat:[" + lat1 + " TO " + lat2 + "]&fq=lon:[" + lon1 + " TO " + lon2 + "]&wt=json&rows=1000";
	$.ajax({
		url : URL2,
		success : function(data) {
			var ok = data.response.docs;
			$.each(ok, function( index, value ) {
				var latlong = new L.LatLng(ok[index].lat[0], ok[index].lon[0]);
				var marker = L.marker(latlong,{icon: mark});
				var str = ok[index].all;
				str=str.split("|");
				var spname = str[0];					  
				var comname = str[1];
				var rank = str[2];
				var taxid = str[3];
				marker.on("click", function() {
					markofun(taxid, spname, comname, rank);
				})
				markers.addLayer(marker);
				}
			);
		},
	dataType : 'jsonp',
	jsonp : 'json.wrf'
	});
	//We need to create something for the root as well.
	var marker = L.marker([-4.226497,0], {icon: mark, zIndexOffset:-1000});
	//create and bind content to marker (TODO)
	//bind marker to markers group
	markers.addLayer(marker);
	markers.addTo(map);
}; 

	//MAIN SEARCH FUNCTIONS (SINGLE AND ITINERARY)
	//This little code fixes the width of the suggestions
jQuery.ui.autocomplete.prototype._resizeMenu = function () {
		var ul = this.menu.element;
 		ul.outerWidth(this.element.outerWidth());
}
//SEARCH FUNCTIONS
function loadSearchFunction() {
	$(function() {
		var str;
		var URL_PREFIX = "http://"+ServerAddress+"/solr/taxo/suggesthandler?suggest.q=";
		var URL_PREFIX_FINAL = "http://"+ServerAddress+"/solr/taxo/select?q=taxid:";
		var URL_SUFFIX = "&wt=json";
		$("#searchinput").autocomplete({
			//ONLY FOR IOS: 
			open: function(event, ui) {
  				    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
		    },
		    //END ONLY FOR IOS
			source : function(request, response) {
				var URL = URL_PREFIX + $("#searchinput").val() + URL_SUFFIX;
				$.ajax({
					url : URL,
					success : function(data) {
						var step1=data.suggest.mySuggester[$("#searchinput").val()];
						var docs = JSON.stringify(step1.suggestions);
						var jsonData = JSON.parse(docs);
						jsonData.sort(function(a,b) {
							a1 = a.term.split("|")[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
							b1 = b.term.split("|")[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
							return(a1.length-b1.length);
						})
							response($.map(jsonData, function(value, key) {
								str = value.term;
								str=str.split("|");
								var issp = str[2];
								issp = issp.replace(/<b>/g,"");
								issp = issp.replace(/<\/b>/g,"");
								issp = issp.replace(" ","");
								issp = issp.replace(/[\x00-\x2f\x3a-\x40]/g,"");
								var taxid = str[3];
								taxid = taxid.replace(/<b>/g,"");
								taxid = taxid.replace(/<\/b>/g,"");
								taxid = taxid.replace(" ","");
								taxid = taxid.replace(/[\x00-\x2f\x3a-\x40]/g,"");
								var spname = str[0];
								spname=spname.replace(/<b>/g,"");
								spname=spname.replace(/<\/b>/g,"");
								var commonname = str[1];
								commonname=commonname.replace(/<b>/g,"");
								commonname=commonname.replace(/<\/b>/g,"");
								var renderval = spname + commonname;
								console.log(issp)
								if ((issp==="species")||(issp==="subspecies")||(issp==="espèce")||(issp==="sousespèce")) {
									labOK = "<div style='border-bottom:1px solid #989898; padding: 20px;'><span class=\"scinameItalic\">" + str[0] + "</span><span class=\"commonname\">" + str[1] + "</span><br><span class=\"rank\" >" + str[2] + "</span></div>";			
								}
								else {
									labOK = "<div style='border-bottom:1px solid #989898; padding: 20px;'><span class=\"sciname\">" + str[0] + "</span><span class=\"commonname\">" + str[1] + "</span><br><span class=\"rank\">" + str[2] + "</span></div>";
								}
								return {
									label : labOK,
									value : renderval,
									taxidfinal: taxid,
									spname:spname,
									commonname:commonname,
									rank:issp											
								}
							}));
					},
					dataType : 'jsonp',
					jsonp : 'json.wrf'
				});
			},
			minLength : '1',
			autoFocus: false,
			html: true,
			focus: function() {
		    		// prevent value inserted on focus
		    		return false;
			},
			select: function(e, ui) {
				var taxidok = ui.item.taxidfinal;
				var spnameok = ui.item.spname;	
				var commonnameok = ui.item.commonname;
				var rankok = ui.item.rank;
				//We copy the search to the search box for the ways.
				$("#searchinput2").val(ui.item.value);
				//We store the taxid to variable taxidFrom.
				taxidFrom = taxidok;
				$("#searchinput").blur();						
				var URL = URL_PREFIX_FINAL + taxidok + URL_SUFFIX;
				$.ajax({
					url : URL,
					success : function(data) {
						map.removeLayer(SPfocus);
						var docs = JSON.stringify(data.response.docs);
						var jsonData = JSON.parse(docs);
						//map.setView(jsonData[0].coordinates, jsonData[0].zoom-1);
						if ($('#ChoiceExplo').find('i').attr('class').match("fa-check-square-o")===null) {
							map.setView(jsonData[0].coordinates, jsonData[0].zoom-1);
						}
						else {
							map.flyTo(jsonData[0].coordinates, jsonData[0].zoom-1);
						}
						SPfocus = L.marker(jsonData[0].coordinates, {icon: pin1})								
						SPfocus.on("click", function() {
							markofun(taxidok, spnameok,commonnameok,rankok);
						})
						SPfocus.addTo(map);
					},
					dataType : 'jsonp',
					jsonp : 'json.wrf'
				});	    
			}
		})
	});
	$(function() {
		var str;
		var URL_PREFIX = "http://"+ServerAddress+"/solr/taxo/suggesthandler?suggest.q=";
		var URL_PREFIX_FINAL = "http://"+ServerAddress+"/solr/taxo/select?q=taxid:";
		var URL_SUFFIX = "&wt=json";
		$("#searchinput2").autocomplete({
			source : function(request, response) {
				var URL = URL_PREFIX + $("#searchinput2").val() + URL_SUFFIX;
				$.ajax({
					url : URL,
					position: { my: "left top", at: "left bottom", of: ".test" },
					success : function(data) {
						var step1=data.suggest.mySuggester[$("#searchinput2").val()];
						var docs = JSON.stringify(step1.suggestions);
						var jsonData = JSON.parse(docs);
						jsonData.sort(function(a,b) {
							a1 = a.term.split("|")[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
							b1 = b.term.split("|")[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
							return(a1.length-b1.length);
						})
						response($.map(jsonData, function(value, key) {
							str = value.term;
							str=str.split("|");
							var issp = str[2];
							issp = issp.replace(/<b>/g,"");
							issp = issp.replace(/<\/b>/g,"");
							issp = issp.replace(" ","");
							issp = issp.replace(/[\x00-\x2f\x3a-\x40]/g,"");
							var taxid = str[3];
							taxid = taxid.replace(/<b>/g,"");
							taxid = taxid.replace(/<\/b>/g,"");
							taxid = taxid.replace(" ","");
							taxid = taxid.replace(/[\x00-\x2f\x3a-\x40]/g,"");
							var spname = str[0];
							spname=spname.replace(/<b>/g,"");
							spname=spname.replace(/<\/b>/g,"");
							var commonname = str[1];
							commonname=commonname.replace(/<b>/g,"");
							commonname=commonname.replace(/<\/b>/g,"");
							var renderval = spname + commonname;
							if ((issp==="species")||(issp==="subspecies")||(issp==="espèce")||(issp==="sousespèce")) {
								labOK = "<div style='border-bottom:1px solid #989898; padding: 20px;'><span class=\"scinameItalic\">" + str[0] + "</span><span class=\"commonname\">" + str[1] + "</span><br><span class=\"rank\" >" + str[2] + "</span></div>";			
							}
							else {
								labOK = "<div style='border-bottom:1px solid #989898; padding: 20px;'><span class=\"sciname\">" + str[0] + "</span><span class=\"commonname\">" + str[1] + "</span><br><span class=\"rank\">" + str[2] + "</span></div>";
							}
							return {
								label : labOK,
								value : renderval,
								taxidfinal: taxid
							}
						}));
					},
					dataType : 'jsonp',
					jsonp : 'json.wrf'
				});
			},
			minLength : '1',
			autoFocus: false,
			html: true,
			focus: function() {
		    		// prevent value inserted on focus
		    		return false;
			},
			select: function(e, ui) {
				var taxidok = ui.item.taxidfinal;			    
				//We store the taxid to variable taxidFrom
				taxidFrom = taxidok;
				$("#searchinput2").blur();
				focusorgo();
			}, 
		})
	});
	$(function() {
		var str;
		var URL_PREFIX = "http://"+ServerAddress+"/solr/taxo/suggesthandler?suggest.q=";
		var URL_PREFIX_FINAL = "http://"+ServerAddress+"/solr/taxo/select?q=taxid:";
		var URL_SUFFIX = "&wt=json";
		$("#searchinput3").autocomplete({
			source : function(request, response) {
				var URL = URL_PREFIX + $("#searchinput3").val() + URL_SUFFIX;
				$.ajax({
					url : URL,
					position: { my: "left top", at: "left bottom", of: ".test" },
					success : function(data) {
						var step1=data.suggest.mySuggester[$("#searchinput3").val()];
						var docs = JSON.stringify(step1.suggestions);
						var jsonData = JSON.parse(docs);
						jsonData.sort(function(a,b) {
							a1 = a.term.split("|")[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
							b1 = b.term.split("|")[0].replace(/<b>/g,"").replace(/<\/b>/g,"");
							return(a1.length-b1.length);
						})
						response($.map(jsonData, function(value, key) {
							str = value.term;
							str=str.split("|");
							var issp = str[2];
							issp = issp.replace(/<b>/g,"");
							issp = issp.replace(/<\/b>/g,"");
							issp = issp.replace(" ","");
							issp = issp.replace(/[\x00-\x2f\x3a-\x40]/g,"");
							var taxid = str[3];
							taxid = taxid.replace(/<b>/g,"");
							taxid = taxid.replace(/<\/b>/g,"");
							taxid = taxid.replace(" ","");
							taxid = taxid.replace(/[\x00-\x2f\x3a-\x40]/g,"");
							var spname = str[0];
							spname=spname.replace(/<b>/g,"");
							spname=spname.replace(/<\/b>/g,"");
							var commonname = str[1];
							commonname=commonname.replace(/<b>/g,"");
							commonname=commonname.replace(/<\/b>/g,"");
							var renderval = spname + commonname;
							if ((issp==="species")||(issp==="subspecies")||(issp==="espèce")||(issp==="sousespèce")) {
								labOK = "<div style='border-bottom:1px solid #989898; padding: 20px;'><span class=\"scinameItalic\">" + str[0] + "</span><span class=\"commonname\">" + str[1] + "</span><br><span class=\"rank\" >" + str[2] + "</span></div>";			
							}
							else {
								labOK = "<div style='border-bottom:1px solid #989898; padding: 20px;'><span class=\"sciname\">" + str[0] + "</span><span class=\"commonname\">" + str[1] + "</span><br><span class=\"rank\">" + str[2] + "</span></div>";
							}
							return {
								label : labOK,
								value : renderval,
								taxidfinal: taxid
							}
						}));
					},
					dataType : 'jsonp',
					jsonp : 'json.wrf'
				});
			},
			minLength : '1',
			autoFocus: false,
			html: true,
			focus: function() {
		    		// prevent value inserted on focus
		    		return false;
			},
			select: function(e, ui) {
				var taxidok = ui.item.taxidfinal;			    
				taxidTo = taxidok;
				$("#searchinput3").blur();
				focusorgo();
			}
		})
	});
}
//Now we create a function that will handle the fact 
//that the focus is always on the search box that is empty, and that when both are full, 
//we start computing the route, etc...
function focusorgo() {
	if ((taxidTo===undefined)&&(taxidFrom!=undefined)) {
		$("#searchinput3").focus();
	}
	else if ((taxidFrom===undefined)&&(taxidTo!=undefined)) {
		$("#searchinput2").focus();
	}
	else if ((taxidFrom===undefined)&&(taxidTo===undefined)) {
		$("#searchinput2").focus();
	}
	else { //Both are defined. We can go for it: search path etc.
		mrcaroute();
	}
}
function mrcaroute() {
	map.removeLayer(SPfocus);
	//get infos
	taxidFrom = taxidFrom.replace(/\s+/g, '');
	taxidTo = taxidTo.replace(/\s+/g, '');
	var url = 'http://'+ServerAddress+'/solr/addi/select?q=*:*&fq=taxid:('+taxidFrom+' '+taxidTo+')&wt=json';
	$.ajax({
	    url : url,
	    success : function(data) {
		    var res = data.response.docs;
			var asc1 = res[0].ascend;
			asc1 = [parseInt(res[0].taxid)].concat(asc1);
			if ((taxidFrom==='1')||(taxidTo==='1')) {
				var route = asc1;
				var asc2 = [0];
			}
			else { 
				var asc2 = res[1].ascend;
				asc2 = [parseInt(res[1].taxid)].concat(asc2);
			    var route = getRoute(asc1,asc2);
			}
			if (taxidFrom!=res[0].taxid[0]) {
					route = route.reverse();
			}
			var mrca = getMrca(asc1,asc2);
			routeq = route.toString().replace(/,/g,' ');
			url2 = 'http://'+ServerAddress+'/solr/taxo/select?q=*:*&fq=taxid:(' + routeq + ')&wt=json&rows=10000';
			$.ajax({
			    url : url2,
			    success: function(data2) {
				map.removeLayer(markersRoute);
				map.removeLayer(polyline);
				$("#details-content").empty();
				markersRoute = new L.FeatureGroup();
				//we get taxid order of this new list (different from the input order asked to solr
				dataok = data2.response.docs;
				//we try to put dataok in the original order
				var neworder = [];
				for (var j=0;j < dataok.length; j++) {
				    neworder[j] = dataok[j].taxid[0];
				}
				//we will store lat and longs here 
				latlngs = [];
				names = [];
				taxids = [];
				ranks = [];
				commons = [];
				for (j=0;j < route.length; j++) {
				    if (route[j]===0) { //we pass by the root
						latlngs[j] = L.latLng([-4.226497,0]);
						names[j] = "Root";
						taxids[j] = 1;
						ranks[j] = "Root";
						commons[j] = " ";
				    }
				    else {
						var where = neworder.indexOf(route[j]);
						latlngs[j] = L.latLng([dataok[where].lat[0],dataok[where].lon[0]]);
						names[j] = dataok[where].sci_name;
						taxids[j] = (dataok[where].taxid)[0];
						ranks[j] = (dataok[where].rank)[0];
						commons[j] = dataok[where].common_name;
						if (commons[j]===undefined) {commons[j] = " ";}
						else {commons[j] = " "+commons[j]+" ";}
				    }
				    var mark = L.marker(latlngs[j], {icon: circl, clickable:false}).setOpacity(0.6).addTo(map);
				    markersRoute.addLayer(mark);
				}
				var mrcaindex = taxids.indexOf(mrca);
				var sp1 = L.marker(latlngs[0], {icon: pin1});
				sp1.on("click", function() {
					markofun(taxids[0], names[0],commons[0], ranks[0]);
				})	
				markersRoute.addLayer(sp1);
				var sp2 = L.marker(latlngs[latlngs.length-1], {icon: pin3});
				sp2.on("click", function() {
					markofun(taxids[latlngs.length-1], names[latlngs.length-1],commons[latlngs.length-1], ranks[latlngs.length-1]);
				})	
				markersRoute.addLayer(sp2);
				if ((mrcaindex!=0)&&(mrcaindex!=(names.length-1))) { //case where there is no mrca (one of the clade is the mrca)
				    var spmrca = L.marker(latlngs[mrcaindex], {icon: pin2});
				    spmrca.on("click", function() {
						markofun(taxids[mrcaindex], names[mrcaindex],commons[mrcaindex], ranks[mrcaindex]);
					})
				    markersRoute.addLayer(spmrca);							    
							    $("#routemrca").empty();
				    $("#routemrca").append(names[mrcaindex]);
							    $("#mrcablock").show();	
					for (i=0;i<names.length;i++) {
						ht = "<div class='col-xs-12 vcenter' onclick='javascript:zoomTo("+taxids[i]+");'>";
						if (i!=0) {ht+= "<div class='row'><i class='fa fa-ellipsis-v fa-fw fa-lg' style='color:grey;'></i></div>";}
						if (i===0) { //from 
							ht+="<div class='row routestick'><i class='fa fa-map-marker fa-fw fa-lg' style='color:#ffcc00; text-shadow: 1px 1px 1px #ccc;'></i><span class='sciname'>"+names[i]+"</span>&nbsp<span class='rank'>"+ranks[i]+"</span></div>";
							ht+="</div>" //close xs-10 column
						}
						else if (i===mrcaindex) { //to
							ht+="<div class='row  routestick'><i class='fa fa-map-marker fa-fw fa-lg' style='color:red; text-shadow: 1px 1px 1px #ccc;'></i><span class='sciname'>"+names[i]+"</span>&nbsp<span class='rank'>"+ranks[i]+"</span></div>";
						}
						else if (i===(names.length-1)) { //to
							ht+="<div class='row routestick'><i class='fa fa-map-marker fa-fw fa-lg' style='color:blue; text-shadow: 1px 1px 1px #ccc;'></i><span class='sciname'>"+names[i]+"</span>&nbsp<span class='rank'>"+ranks[i]+"</span></div>";
						}
						else { //intermediate nodes
							ht+="<div class='row routestick'><i class='fa fa-caret-right fa-fw fa-lg' style='color:grey;'></i><span class='sciname'>"+names[i]+"</span>&nbsp<span class='rank'>"+ranks[i]+"</span></div>";	
						}
						$("#details-content").append(ht);
					}
				}
				else {
					$("#mrcablock").hide();	
					for (i=0;i<names.length;i++) {
						ht = "<div class='col-xs-12 vcenter' onclick='javascript:zoomTo("+taxids[i]+");'>";
						if (i!=0) {ht+= "<div class='row'><i class='fa fa-ellipsis-v fa-fw' style='color:grey;'></i></div>";}
						if (i===0) { //from 
							ht+="<div class='row routestick'><i class='fa fa-map-marker fa-fw fa-lg' style='color:#ffcc00; text-shadow: 1px 1px 1px #ccc;'></i><span class='sciname'>"+names[i]+"</span>&nbsp<span class='rank'>"+ranks[i]+"</span></div>";
							ht+="</div>" //close xs-10 column
						}
						else if (i===(names.length-1)) { //to
							ht+="<div class='row routestick'><i class='fa fa-map-marker fa-fw fa-lg' style='color:blue; text-shadow: 1px 1px 1px #ccc;'></i><span class='sciname'>"+names[i]+"</span>&nbsp<span class='rank'>"+ranks[i]+"</span></div>";
						}
						else { //intermediate nodes
							ht+="<div class='row routestick'><i class='fa fa-caret-right fa-fw fa-lg' style='color:grey;'></i><span class='sciname'>"+names[i]+"</span>&nbsp<span class='rank'>"+ranks[i]+"</span></div>";	
						}
						$("#details-content").append(ht);
					}
				}
				polyline = L.polyline(latlngs, {color: 'red', clickable:false, weight:6});
				polyline.addTo(map);
				if (focus) map.fitBounds(polyline.getBounds(), {paddingTopLeft:[20,140], paddingBottomRight:[0,120]});
				markersRoute.addTo(map);
				$("#routefrom").empty();
				$("#routeto").empty();
				$("#routefrom").append(names[0]);
				$("#routeto").append(names[names.length-1]);
				$("#route-bottom").show();
			    },
			    dataType : 'jsonp',
			    jsonp : 'json.wrf'
				});
		},
   		dataType : 'jsonp',
   		jsonp : 'json.wrf'
   	})
};
			
