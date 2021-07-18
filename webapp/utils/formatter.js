sap.ui.define([],function(){
	return {
		
		getState: function(inp){
			switch (inp) {
				case "Available":
					return "Success";
				case "Discontinued":
					return "Error";
				case "Out of Stock":
					return "Warning";
			}
		},
		getIcon: function(inp){
			switch (inp) {
				case "Discontinued":
					return "sap-icon://alert";
				default:
			}
		},
		checkStatus: function(inp){
			if(inp === 'Punjab'){
				return true;
			}else{
				return true;
			}
		}
		
		
	};
});