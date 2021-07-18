sap.ui.define(
	["sap/m/Button"],
	function(Button){
		return Button.extend("myfiori.controls.superButton",{
			metadata: {
				events: {
					"mario": {}
				}
			},
			renderer: {},
			onmouseover: function(){
				this.fireMario();
			}
		});
	}
);