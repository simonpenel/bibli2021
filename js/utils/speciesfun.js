// INITIALISATION VARIABLES GLOBALES
// =================================

var widthMax = 500; // Largeur max d'une vignette
var borderSpecies = 20;  // Epaisseur entre les images d'especes
var pictureDir = "img/speciesImages"  ; // Repertoire des images
var indexLangue = 0;
var barre_width_percent = 20;

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
  var leftSpecies =largeur - 200;
	var nbcol = Math.floor( nbspec / 6 ) + 1;
  var nblin = Math.floor( nbspec / nbcol) + 1;
	var barre_width = barre_width_percent * largeur / 100 ;
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
function selectThis() {}
