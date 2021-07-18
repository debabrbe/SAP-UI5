sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"myfiori/Models/model",
	"myfiori/utils/formatter",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, models, formatter, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("myfiori.controller.SecondView", {
		
		myFormatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myfiori.view.SecondView
		 */
		onInit: function() {
			var oModel = models.createFruitModel();
			this.getView().setModel(oModel,"viewModel");
			var oViewModel = new sap.ui.model.json.JSONModel();
			oViewModel.setData({
				inp: "Punjab",
				myVis: true
			});
			this.getView().setModel(oViewModel, "sampleModel");
			this.getOwnerComponent().getRouter().attachRoutePatternMatched(this.showMeMagic, this);
		},
		showMeMagic: function(oEvent){
			var idFruit = oEvent.getParameter("arguments").frtName;
			var sPath = "/fruits/" + idFruit;
			this.getView().bindElement(sPath);
		},
		changeMode: function(){
			var oSample = this.getView().getModel("sampleModel");
			var value = oSample.getProperty("/myVis");
			if(value === true){
				value = false;
			}else{
				value = true;
			}
			oSample.setProperty("/myVis", value);
			
		},
		onApprove: function(){
			MessageBox.confirm("Would you like to order these fruits",{
				title: "Confirmation by Anubhav",
				onClose: this.handleOnClose
			});
		},
		handleOnClose: function(status){
			if(status === "OK"){
				MessageToast.show("Your order has been placed successfully");
			}else{
				MessageBox.error("OOps!! you cancelled at final step");
			}
		},
		onBack: function(){
			var oView = this.getView();
			var oApp = oView.getParent();
			oApp.to("idFirst");
		},
		fieldId: null,
		oSupplierPopup: null,
		onSupplier: function(oEvent){
			var oInput = oEvent.getSource();
			this.fieldId = oInput.getId();
			//alert("you pressed f4 on " + this.fieldId);
			//Create object of xml fragment
			if(this.oSupplierPopup === null){
				this.oSupplierPopup = new sap.ui.xmlfragment("myfiori.fragments.myPopup", this);
				this.oSupplierPopup.bindAggregation("items",{
					path: '/suppliers',
					template: new sap.m.StandardListItem({
						title: "{name}",
						description: "{State}"
					})
				});
				this.oSupplierPopup.setTitle("Magic happens in Punjab");
				this.getView().addDependent(this.oSupplierPopup);
			}
			
			this.oSupplierPopup.open();
		},
		oCityPopup: null,
		onMario: function(){
			sap.m.MessageBox.alert("Wow, i have extended standard functionality of UI5");
		},
		onCity: function(oEvent){
			this.fieldId = oEvent.getSource().getId();
			if(this.oCityPopup === null){
				this.oCityPopup = new sap.ui.xmlfragment("myfiori.fragments.myPopup", this);
				this.oCityPopup.bindAggregation("items",{
					path: "/cityNames",
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{Telephone}"
					})
				});
				this.oCityPopup.setTitle("Cities");
				this.oCityPopup.setMultiSelect(false); 
				this.getView().addDependent(this.oCityPopup);
			}
			this.oCityPopup.open();
		},
		onConfirm: function(oEvent){
			debugger;
			if(this.getView().byId(this.fieldId) !== undefined){
				// if(oEvent.getParameter("selectedItem").getTitle() !== undefined){
					this.getView().byId(this.fieldId).setValue(oEvent.getParameter("selectedItem").getTitle());
				// }
				// else{
				// 	this.getView().byId(this.fieldId).setValue(oEvent.getParameter("selectedItem").getLabel());
				// }
			}
			else{
				sap.ui.getCore().byId(this.fieldId).setValue(oEvent.getParameter("selectedItem").getLabel());
			}
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myfiori.view.SecondView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myfiori.view.SecondView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myfiori.view.SecondView
		 */
		//	onExit: function() {
		//
		//	}

	});

});