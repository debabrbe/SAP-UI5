sap.ui.define(
	["sap/ui/model/json/JSONModel"],
	function(JSONModel){
		return{
			createFruitModel: function(){
				var oModel = new JSONModel();
				oModel.loadData("Models/localdata/Fruits.json");
				return oModel;
			}
		};
});