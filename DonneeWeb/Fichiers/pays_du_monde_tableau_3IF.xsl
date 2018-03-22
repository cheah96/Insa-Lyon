<?xml version="1.0" encoding="UTF-8"?>

<!-- New document created with EditiX at Wed Mar 14 16:11:18 CET 2018 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
	
	<xsl:template match="/">
	<html> 
		 <head> 
			    <title> 
			    Pays du monde 
			  </title> 
		 </head> 
	 
		 <body style="background-color:white;">  
			   <h1>Les pays du monde</h1> 
			    <p>Mise en forme par : Stanley Cheah, Valentin Rigolle (B3128)</p>
			    
			    <xsl:apply-templates select="/countries/metadonnees"/>
				
				<h2>Continents (regions)</h2>
				
				<xsl:for-each select="//region[not(preceding::region=.)]">
					<xsl:apply-templates select="." />
				</xsl:for-each>
				<hr />
				
				<p>
					Pays avec 7 voisins :
					<xsl:for-each select="//country[count(borders) = 7]/name/common">
						<xsl:value-of select="."/>
						<xsl:if test="position() &lt; last()">
							, 
						</xsl:if>
					</xsl:for-each>
				</p>
				<p>
					Pays ayant le plus long nom :
					<xsl:for-each select = "//country/name/common">
						<xsl:sort select = "string-length()" data-type="number" order = "descending"/>
						<xsl:if test = "position()=1">
							<xsl:value-of select = "."/>
						</xsl:if>
					</xsl:for-each>
				</p>
				<hr/>
				<h1>Pays par ordre alphabétique</h1>
				<table border="3" width="100%" align="center">
					<tr>
						<th>N°</th>
						<th>Nom</th>
						<th>Capitale</th>
						<th>Continent<br/>Sous-continent</th>
						<th>Voisins</th>
						<th>Coordonnées</th>
						<th>Drapeau</th>
					</tr>
					<xsl:for-each select="countries/country">
						<xsl:sort select="name/common" />
						<tr>
							<td>
								<xsl:value-of select="position()"/>
							</td>
							<xsl:apply-templates select="." />
						</tr>
					</xsl:for-each>
				</table>
		 </body> 
	</html>
	</xsl:template>
	
	<xsl:template match="metadonnees">
		 <p style="text-align:center; color:blue;">
			Objectif : <xsl:value-of select="objectif"/>
		 </p><hr/>
	</xsl:template>
	
	<xsl:template match="country">
		<td>
			<span style="color:green">
				<xsl:value-of select="name/common"/>
			</span>
			(<xsl:value-of select="name/official" />)<br/>
			<xsl:if test="count(name/native_name[@lang='fra']) = 1">
				<span style="color:brown">
					Nom français : <xsl:value-of select="name/native_name[@lang='fra']/official" />
				</span>
			</xsl:if>
		</td>
		<td>
			<xsl:value-of select = "capital"/><br/>
		</td>
		<td> 
			<xsl:value-of select = "infosRegion/region" /> <br/>
			<xsl:value-of select = "infosRegion/subregion" /> <br/>
		</td>
		<td>
			<xsl:for-each select = "borders">
				<xsl:apply-templates select="." />
				<xsl:if test="position() &lt; last()">
					, 
				</xsl:if>
			</xsl:for-each>
		</td>
		<td>
			Latitude : <xsl:value-of select = "coordinates/@lat"/> <br/>
			Longitude : <xsl:value-of select = "coordinates/@long"/> <br/>
		</td>
		<td>
			<img src="http://www.geonames.org/flags/x/{translate(codes/cca2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/> 
		</td>
	</xsl:template>
	
	<xsl:template match="borders">
		<xsl:variable name="code_cca3">
			<xsl:value-of select="text()" />
		</xsl:variable>
		<xsl:value-of select="//country[codes/cca3 = $code_cca3]/name/common" />
	</xsl:template>
	
	<xsl:template match="region">
	<xsl:choose>
		<xsl:when test=".=''">
			<h3>Sans continent</h3>
			<xsl:value-of select="count(//country[infosRegion/region=''])"/> pays
		</xsl:when>
		<xsl:otherwise>
			<xsl:variable name="nom_region">
				<xsl:value-of select="." />
			</xsl:variable>
			<h3><xsl:value-of select="." /></h3>
			Sous-régions : 
			<xsl:for-each select="//infosRegion[region=$nom_region]/subregion[not(preceding::subregion=.)]">
				<xsl:apply-templates select="." />
				<xsl:variable name="nom_subregion">
					<xsl:value-of select="." />
				</xsl:variable>
				<xsl:if test="position() &lt; last()">
						, 
				</xsl:if>
			</xsl:for-each>
		</xsl:otherwise>
	</xsl:choose>
	</xsl:template>
	
	<xsl:template match="subregion">
		<xsl:variable name="nom_subregion">
			<xsl:value-of select="." />
		</xsl:variable>
		<xsl:value-of select="." />
		 (
		<xsl:value-of select="count(//country[infosRegion/subregion=$nom_subregion])"/>
		 pays)
	</xsl:template>

</xsl:stylesheet>
