sap.ui.define(
	["sap/ui/core/UIComponent",
	 "myfiori/Models/model"],
	function(UIComponent, Models){
		return UIComponent.extend("myfiori.Component",{
			metadata: {
				"manifest":"json"
			},
			init: function(){
				UIComponent.prototype.init.apply(this);
				var oModel = Models.createFruitModel();
				this.setModel(oModel);
				this.getRouter().initialize();
			},
			destroy: function(){
				
			}
			//createContent: function(){
				// var oView = new sap.ui.view({
				// 	id: "idMain",
				// 	type: sap.ui.core.mvc.ViewType.XML,
				// 	viewName: "myfiori.view.App"
				// });
				
				// var oView1 = new sap.ui.view({
				// 	id:"idFirst",
				// 	type: sap.ui.core.mvc.ViewType.XML,
				// 	viewName: "myfiori.view.FirstView"
				// });
				
				// var oView2 = new sap.ui.view({
				// 	id:"idSecond",
				// 	type: sap.ui.core.mvc.ViewType.XML,
				// 	viewName: "myfiori.view.SecondView"
				// });
				
				// oView.byId("idAnubhav").addMasterPage(oView1).addDetailPage(oView2);
				
				// return oView;
			//}
		});
});