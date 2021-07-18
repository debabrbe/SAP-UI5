sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"myfiori/Models/model",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Models, Anubhav, FilterOpr) {
	"use strict";
	return Controller.extend("myfiori.controller.FirstView", {
		onNext: function(){
			//navigate to next view which is a children of App
			//var oApp =	this.getView().getParent();
			//oApp.to("idSecond");
			this.oRouter.navTo("detail");
		},
		oFruits: null,
		onFilter: function(){
			if(this.oFruits == null){
				this.oFruits = new sap.ui.xmlfragment("myfiori.fragments.myPopup");
				//Suppling data to the fragment using aggregation binding
				this.oFruits.bindAggregation("items",{
					path: "/fruits",
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{color}"
					})
				});
				this.oFruits.setTitle("Here are Fruits");
			}
			
			this.oFruits.open();
		},
		onSearch: function(oEvent){
			//Get the value enetered by user in search field
			var value = oEvent.getParameter("query");
			//if its a live change event value wont come by query parameter
			//we will have this safeguarding for the event
			if(value == undefined){
				value = oEvent.getParameter("newValue");
			}
			
			//just check value of searchString inside console
			console.log(value);
			
			//prepare the filter object Operand1   Operator   Operand2
			//dependency managed by scaffolding template
			var oFilter = new Anubhav("name", sap.ui.model.FilterOperator.Contains , value);
			var oFilter1 = new Anubhav("type", sap.ui.model.FilterOperator.Contains, value);
			var oFilterMain = new Anubhav({
				filters: [oFilter, oFilter1],
				and: false
			});
			
			//get the items of list control and apply the filter
			var oList = this.getView().byId("idSpidy");
			var oBinding = oList.getBinding("items");
			oBinding.sap.ui.model.Filter(oFilterMain);
			
			///this.getView().byId("idSpidy").getBinding("items").filter(oFilter);
		},
		takeMe: function(){
			var oFeed = this.getView().byId("myFeed");
			window.open(oFeed.getInfo());
		},
		onDelete: function(oEvent){
			var toBeDel = oEvent.getParameter("listItem");
			//var oList = this.getView().byId("idSpidy");
			var oList = oEvent.getSource();
			oList.removeItem(toBeDel);
		},
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf myfiori.view.FirstView
		 */
			onInit: function() {
				//var oModel = Models.createFruitModel();
				//sap.ui.getCore().setModel(oModel);
				//this.getView().setModel(oModel);
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.attachRoutePatternMatched(this.manageSelection, this);
				
			},
			manageSelection: function(oEvent){
				var index = oEvent.getParameter("arguments").frtName;
				var oList = this.getView().byId("idSpidy");
				var selected = this.getView().getModel().getProperty("/fruits/" + index);
				for (var i=0; i< oList.getItems().length; i++) {
					 if (oList.getItems()[i].getTitle() === selected.name){
					 	var oListItem = oList.getItems()[parseInt(i)];
						oList.setSelectedItem(oListItem);
						return;
					 }
				}
			},
			onItemPress: function(oEvent){
				//var test = oEvent.getParameters();
				//console.log(test);
				//Step 1 : Get the object of view 2 -- was a simple form
				//var oView2 = this.getView().getParent().getParent().getDetailPage("idSecond"); //this.getView().getParent().getPages()[1];
				//Step 2 : get the path of element selected -- source was a table
				var sPath = oEvent.getParameter("listItem").getBindingContextPath();
				//Step 3 : bind the second view with this element
				//oView2.bindElement(sPath);
				//Step 4: Navigate to second view
				//this.onNext();
				this.oRouter.navTo("detail",{
					frtName: sPath.split("/")[sPath.split("/").length - 1]
				});
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf myfiori.view.FirstView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf myfiori.view.FirstView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf myfiori.view.FirstView
		 */
		//	onExit: function() {
		//
		//	}

	});

});