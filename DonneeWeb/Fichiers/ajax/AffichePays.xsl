<?xml version="1.0"?>

<xsl:stylesheet version  ="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:param name="countryCCA2" />

<xsl:template match="/">
	<HTML>
		<BODY>
			<table border="3" width="100%" align="center" style = "table-layout: fixed;">
				<tr>
					<th>Nom</th>
					<th>Capitale</th>
					<th>Drapeau</th>
				</tr>
				<tr>
					<td>
						<xsl:value-of select="//country[codes/cca2 = $countryCCA2]/name/common"/>
					</td>
					<td>
						<xsl:value-of select="//country[codes/cca2 = $countryCCA2]/capital"/>
					</td>
					<td>
						<img src="http://www.geonames.org/flags/x/{translate($countryCCA2, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"/>
					</td>
				</tr>
			</table>
		</BODY>
	</HTML>			
</xsl:template>

</xsl:stylesheet>
