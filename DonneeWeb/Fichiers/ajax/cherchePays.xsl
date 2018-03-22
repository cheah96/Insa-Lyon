<?xml version="1.0"?>

<xsl:stylesheet version  ="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:param name="countryName" />

<xsl:template match="/">
	<HTML>
		<BODY>
			<p>
				<xsl:choose>
					<xsl:when test="count(//country[name/common=$countryName]) = 1" >
						Nom officiel : <xsl:value-of select="//country[name/common=$countryName]/name/official" /><br />
						Capitale : <xsl:value-of select="//country[name/common=$countryName]/capital" />
					</xsl:when>
					<xsl:otherwise>
						Aucun pays trouve !
					</xsl:otherwise>
				</xsl:choose>
			</p>
		</BODY>
	</HTML>			
</xsl:template>

</xsl:stylesheet>
