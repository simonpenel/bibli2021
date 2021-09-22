// INITIALISATION VARIABLES GLOBALES
// =================================

var widthMax = 500; // Largeur max d'une vignette
var borderSpecies = 20;  // Epaisseur entre les images d'especes
var pictureDir = "img/speciesImages"  ; // Repertoire des images
var indexLangue = 1;
var barre_width_percent = 20;
var selected = "";
var arraySpecies = [
		 [9606,    ["Homo sapiens","Humain"]],
		 [10090,   ["Mus musculus","Souris grise"]],
		 [59546,   ["Damaliscus jimela","Topi du Serengeti"]],
		 [85517,   ["Phacochoerus aethiopicus","Phacochère commun"]],
		 [9927,    ["Connochaetes taurinus","Gnou bleu"]],
		 [9970,    ["Syncerus caffer","Buffle d'Afrique"]],
		 [9785,    ["Loxodonta africana","Eléphant d'Afrique"]],
		 [9689,    ["Panthera leo","Lion"]],
		 [9678,    ["Crocuta crocuta","Hyène tachetée"]],
		 [94188,    ["Cryptoprocta ferox","Fossa"]],
		 [9622,    ["Lycaon    pictus","Lycaon"]],
		 [9447,    ["Lemur catta","Maki catta"]],
		 [31869,    ["Daubentonia madagascariensis","Aye-Aye"]],
		 [5699,    ["Trypanosoma vivax","Trypanosoma vivax"]],
		 [9993,    ["Marmota marmota","Marmotte"]],
		 [7227,    ["Drosophila melanogaster","Mouche du vinaigre"]]
		];

// Cree une map a partir du tableau
// On utilise une map pour preserver
// l'ordre des donnees ce qui n'est
// pas possible avec un dictionnaire.
var mapSpecies = new Map(arraySpecies);	var dicoSpecies = {};
var data = [];
mapSpecies.forEach(function(valeur, clef) {
  data.push(clef);
  dicoSpecies[clef]=valeur;
});

// Affiche la barre qui contient les especes
// -----------------------------------------
function displaySpecies(largeur,hauteur){
  var nbspec = data.length;
  var topSpecies = 20;
	// var nbcol = Math.floor( nbspec / 7 ) + 1;
  // var nblin = Math.floor( nbspec / nbcol) + 1;
	var barre_width = barre_width_percent * largeur / 100 ;
	var nblin = Math.floor(Math.sqrt(nbspec * hauteur / barre_width)) +1 ;
	var nbcol = Math.floor( nbspec / nblin) + 1;
	var leftSpecies = largeur - barre_width ;
  var width = Math.floor(barre_width / nbcol);
  var height = Math.floor(hauteur / nblin);
  if (width > height) {
    width = height;
  }
  if (width > widthMax) {
    width = widthMax;
  }
  width = width - borderSpecies;
  var element= document.getElementById('barre');
  var divBarre = document.createElement("div");
  // divBarre.setAttribute("style", "position:absolute; width:" + largeur+ "px;");
  divBarre.setAttribute("id", 'posters');
  element.appendChild(divBarre);
  var j = topSpecies;
  var k = 0;
  for (i = 0; i < nbspec; i++) {
    addSpecies(data[i],k*(width)+leftSpecies,j,width-borderSpecies);
    k++ ;
    if (k >= nbcol) {
      k = 0;
      j = j  + width + borderSpecies;
    }

  }
}

// Ajoute une espece dans la div posters
// ------------------------------------
function addSpecies(imageName,left,top,width) {
console.log(imageName,left,top,width);
  var element= document.getElementById('posters');
  var divSpecies = document.createElement("div");
  divSpecies.setAttribute("style", "position:absolute; left:" + left + "px; top:" + top + "px; width: "+width+"px; height:"+(width*1)+"px")
  divSpecies.setAttribute("class","thumbnail");
  var divDescription = document.createElement("div");
  divDescription.setAttribute("style", "position:absolute; left:" + left + "px; top:" +(width+top) + "px; width: "+width+"px;")
  divDescription.setAttribute("class","description");
  divDescription.setAttribute("id", "legend_"+imageName);
  var divImage = document.createElement("img");
  divImage.setAttribute("src", pictureDir+"/"+imageName+".jpg");
  divImage.setAttribute("style", "width: "+width+"px; border-radius: 20%");
  divImage.setAttribute("id", imageName);
  divImage.setAttribute("class","thumbnail");
  divImage.setAttribute("data-micron","tada");
  // divImage.setAttribute("data-micron-bind",true);
  divImage.onclick = selectThis;
  console.log(dicoSpecies[imageName][indexLangue]);
  var divLegend = document.createTextNode(dicoSpecies[imageName][indexLangue]);
  divDescription.appendChild(divLegend);
  divSpecies.appendChild(divImage);
  // dragElement(divSpecies);
  element.appendChild(divSpecies);
  element.appendChild(divDescription);
}

// Efface les especes
// ------------------
function cleanBarre() {
  var element= document.getElementById('barre');
  var divBarre = document.getElementById('posters');
  element.removeChild(divBarre);
	var largeur = window.innerWidth; // maj de la largeur en cas de modif
	var hauteur = window.innerHeight; // maj de la largeur en cas de modif
	displaySpecies(largeur,hauteur);
}

// Action quand on clique sur une espece
// -------------------------------------
function selectThis() {
	// micron.getEle("#me").interaction("bounce");
  // micron.getEle("."+this.id).interaction("bounce");
  // this.interaction("bounce");
  var taxidok = this.id;
  var URL_PREFIX = "http://"+ServerAddress+"/solr/taxo/suggesthandler?suggest.q=";
  var URL_PREFIX_FINAL = "http://"+ServerAddress+"/solr/taxo/select?q=taxid:";
  var URL_SUFFIX = "&wt=json";
  var URL = URL_PREFIX_FINAL + taxidok + URL_SUFFIX;
  var largeur = window.innerWidth; // maj de la largeur en cas de modif
  // Action sur lifemap
    taxidFrom = taxidok;
    $.ajax({
      url : URL,
      success : function(data) {
        map.removeLayer(SPfocus);
        var docs = JSON.stringify(data.response.docs);
        var jsonData = JSON.parse(docs);
        if ($('#ChoiceExplo').find('i').attr('class').match("fa-check-square-o")===null) {
          map.setView(jsonData[0].coordinates, jsonData[0].zoom-1);
        }
        else {
          map.flyTo(jsonData[0].coordinates, jsonData[0].zoom-1)
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
    if (selected) {
      degrise(selected);
      }
    grise(this.id);  // On la grise
    selected = this.id;
}

// Grise une division
// ------------------
function grise (imageName) {
  var image = document.getElementById(imageName);
  image.style.opacity = "0.5";
  image.style.filter  = 'alpha(opacity=50)'; // IE fallback
  var legend = document.getElementById("legend_"+imageName);
  legend.style.color = "red";

}
// Degrise une division
// ------------------
function degrise (imageName) {
  var image = document.getElementById(imageName);
  image.style.opacity = "1.0";
  image.style.filter  = 'alpha(opacity=100)'; // IE fallback
  var legend = document.getElementById("legend_"+imageName);
  legend.style.color = "yellow";
}
