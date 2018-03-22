//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeNode(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'élement avec l'id "nom" avec la chaine de caractéres en paramètre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant à l'URL relative donné dans le paramètreet le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML à l'aide de XMLHttpRequest synchrone (le 3° paramètre est défini à false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant à l'URL donnée en paramètre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON à l'aide de XMLHttpRequest synchrone (le 3° paramètre est défini à false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_ajaxBibliographie(xmlDocumentUrl, xslDocumentUrl, newElementName) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'élément à remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier élément fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier élément "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];

    // Remplacement de l'élément
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_ajaxEmployees(xmlDocumentUrl) {


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    //extraction des noms à partir du document XML (avec une feuille de style ou en javascript)
    var lesNoms = xmlDocument.getElementsByTagName("LastName");

    // Parcours de la liste des noms avec une boucle for et 
    // construction d'une chaine de charactères contenant les noms séparés par des espaces 
    // Pour avoir la longueur d'une liste : attribut 'length'
    // Accès au texte d'un noeud "LastName" : NOM_NOEUD.firstChild.nodeValue
    var chaineDesNoms = "";
    for (i = 0; i < lesNoms.length; i++) {
        if (i > 0) {
            chaineDesNoms = chaineDesNoms + ", ";
        }
        chaineDesNoms = chaineDesNoms + lesNoms[i].firstChild.nodeValue + " ";
    }


    // Appel (ou recopie) de la fonction setNom(...) ou bien autre façon de modifier le texte de l'élément "span"
    setNom(chaineDesNoms);



}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxEmployeesTableau(xmlDocumentUrl, xslDocumentUrl) {
    //commenter la ligne suivante qui affiche la boîte de dialogue!
    alert("Fonction à compléter...");
}

function Bouton1_CouleurArrierePlan() {
	document.body.setAttribute("style", "background-color: blue;");
	document.getElementById("myButton1").setAttribute("style", "color: white;");
}

function Bouton2_CouleurArrierePlan() {
	document.body.setAttribute("style", "background-color: white;");
	document.getElementById("myButton1").setAttribute("style", "color: black;");
}

function Bouton3_AfficherPays(nomPays) {
	 var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML("cherchePays.xsl");

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML("countriesTP.xml");
	
	xsltProcessor.setParameter(null, "countryName", nomPays);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

	var elementHtmlParent = window.document.getElementById("descriptionPays");
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
	
    // Premier élément "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName("p")[0];

    // Remplacement de l'élément
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);
}

function Bouton4_AfficherSVG() {
    var element = document.getElementById("fichierSVG");
	/*if (!element.getElementsByTagName("object").length) {
		var object = document.createElement("object");
		object.type = "image/svg+xml";
		object.data = "exemple.svg";
		element.appendChild(object);
	}*/
	var xmlExempleSVG = chargerHttpXML("exemple.svg");
	if (!element.getElementsByTagName("svg").length) {
		element.appendChild(xmlExempleSVG.getElementsByTagName("svg")[0]);
	}
}

function Bouton5_RendreSVGClickable() {
	var element = document.getElementById("fichierSVG");
	if (element.getElementsByTagName("svg").length) {
		var svg = recupererPremierEnfantDeTypeNode(element);
		var func = function() {
			document.getElementById("titleSVG").textContent=this.getAttribute("title");
		};
		svg.getElementById("leCercle").addEventListener("mousedown", func, false);
		svg.getElementById("leRect").addEventListener("mousedown", func, false);
		svg.getElementById("laCourbe").addEventListener("mousedown", func, false);
	}
}

function Bouton6_AfficherWorldHigh() {
    var element = document.getElementById("worldHighSVG");
	var xmlExempleSVG = chargerHttpXML("worldHigh.svg");
	if (!element.getElementsByTagName("svg").length) {
		element.appendChild(xmlExempleSVG.getElementsByTagName("svg")[0]);
	}
}

function Bouton7_RendreWorldHighClickable() {
	var element = document.getElementById("worldHighSVG");
	if (element.getElementsByTagName("svg").length) {
		var svg = recupererPremierEnfantDeTypeNode(element);
		var func = function() {
			document.getElementById("titleWorldHigh").textContent=this.getAttribute("title");
		};
		var children = svg.children[1].children;
		for (var i = 0; i < children.length; i++) {
			children[i].addEventListener("mousedown", func, false);
		}
	}
}

function Bouton8_ActiverSurvolWorldHigh() {
	var element = document.getElementById("worldHighSVG");
	if (element.getElementsByTagName("svg").length) {
		var svg = recupererPremierEnfantDeTypeNode(element);
		var funcEnt = function() {
			this.setAttribute("style","fill : blue");
			Bouton8_AfficherPays(this.getAttribute("id"));
		};
		var funcSort = function() {
			this.removeAttribute("style");
		};
		var children = svg.children[1].children;
		for (var i = 0; i < children.length; i++) {
			children[i].addEventListener("mouseover", funcEnt, false);
			children[i].addEventListener("mouseleave", funcSort, false);
		}
	}
}

function Bouton8_AfficherPays(cca2) {
	 var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL à l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML("AffichePays.xsl");

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML à l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML("countriesTP.xml");
	
	xsltProcessor.setParameter(null, "countryCCA2", cca2);

    // Création du document XML transformé par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

	var elementHtmlParent = window.document.getElementById("tableauPays");
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
	
    // Premier élément "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName("table")[0];

    // Remplacement de l'élément
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);
}

function Bouton9_AfficherDatalist() {
	var elementHtmlParent = window.document.getElementById("choixPays");
	if (!elementHtmlParent.children.length) {
		var xsltProcessor = new XSLTProcessor();
		var xslDocument = chargerHttpXML("DatalistPays.xsl");
		xsltProcessor.importStylesheet(xslDocument);
		var xmlDocument = chargerHttpXML("countriesTP.xml");
		var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
		var options = newXmlDocument.getElementsByTagName("option");
		for (var i = 0; i < options.length; i++) {
			elementHtmlParent.appendChild(options[i]);
		}
	}
}
