<?xml version="1.0"?>

<xsl:stylesheet version  ="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<HTML>
		<BODY>
			<xsl:for-each select="//country">
				<xsl:apply-templates select="." />
			</xsl:for-each>
		</BODY>
	</HTML>			
</xsl:template>

<xsl:template match="country">
	<option value="{name/common}" />
</xsl:template>

</xsl:stylesheet>
