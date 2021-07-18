sap.ui.define(["sap/ui/core/Control"],
	function(Control){
		return Control.extend("myfiori.controls.myHeading",{
				metadata: {
					properties: {
						"spiderman": "",
						"color":"",
						"border":""
					},
					events:{},
					aggregations:{},
					methods:{}
					
				},
				init: function(){
					this.setBorder("2px solid black");
				},
				renderer: function(oRm, oControl){
					//oRm.write("<h1 style='color:"+ oControl.getColor() +"'>" + oControl.getSpiderman() + "</h1>");
					oRm.write("<h1");
					oRm.addStyle("color", oControl.getColor());
					oRm.addStyle("border", oControl.getBorder());
					oRm.writeStyles();
					oRm.write(">" + oControl.getSpiderman() + "</h1>");
				}
			});
	}
);