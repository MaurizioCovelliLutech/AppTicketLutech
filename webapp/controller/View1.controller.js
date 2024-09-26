sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/SearchField",
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/ui/model/json/JSONModel",
    "sap/m/Token"
], function (Controller, MessageToast, SearchField, Dialog, List, StandardListItem, JSONModel,Token) {
    "use strict";

    return Controller.extend("yproject1.controller.View1", {

        onInit: function () {
            var oClientsModel = new JSONModel([
                { key: "AGSM", text: "AGSM" },
                { key: "ENEL", text: "ENEL" }
            ]);
            this.getView().setModel(oClientsModel, "clients");

            var oTypesModel = new JSONModel([
                { key: "AMS", text: "AMS" },
                { key: "EVO", text: "EVO" }
            ]);
            this.getView().setModel(oTypesModel, "types");

            var oEnvironmentsModel = new JSONModel([
                { key: "DEV", text: "DEV" },
                { key: "TEST", text: "TEST" },
                { key: "PROD", text: "PROD" }
            ]);
            this.getView().setModel(oEnvironmentsModel, "environments");

            var oSelectedTypeModel = new JSONModel({ value: "" });
            this.getView().setModel(oSelectedTypeModel, "selectedType");

            var oCCModel = new sap.ui.model.json.JSONModel({
                ccEmails: []
            });
        
        

            this.getView().setModel(oCCModel, "CCModel");
            
            var oMultiInput1 = this.getView().byId("ccEmail");
		
            var fnValidator = function(args){
				var text = args.text;

				return new Token({key: text, text: text});
			};

			oMultiInput1.addValidator(fnValidator);


        },

        onTokenUpdate: function (oEvent) {
            var oCCModel = this.getView().getModel("CCModel");
            var aTokens = oEvent.getSource().getTokens();
            var aEmails = [];

            aTokens.forEach(function (oToken) {
                aEmails.push(oToken.getText());
            });

            oCCModel.setProperty("/ccEmails", aEmails);
        },

        onStep2Complete: function () {
            var oModel = this.getView().getModel("selectedType");
            var selectedType = oModel.getProperty("/value");
        
            if (selectedType === "AMS") {
                var ticketCode = this.getView().byId("ticketCode").getValue();
                var emailBodyAMS = this.getView().byId("emailBodyAMS").getValue();
                var environment = this.getView().byId("environment").getSelectedKey();
                var variantName = this.getView().byId("variantName").getValue();
                var transaction = this.getView().byId("transaction").getValue();
        
                if (!ticketCode || !emailBodyAMS || !environment || !variantName || !transaction) {
                    MessageToast.show("compila tutto per AMS");
                    return;
                }
            } else if (selectedType === "EVO") {
                var evoCode = this.getView().byId("evoCode").getValue();
                var emailBodyEVO = this.getView().byId("emailBodyEVO").getValue();
                var analysis = this.getView().byId("functionalAnalysis").getValue();
                var analysisDesc = this.getView().byId("functionalAnalysisDesc").getValue();
        
                if (!evoCode || !emailBodyEVO || !analysis || !analysisDesc) {
                    MessageToast.show("compila tutto per EVO");
                    return;
                }
            }
        
            this.getView().byId("wizard").nextStep();
        }
        ,

        showStep: function (stepId) {
            var aSteps = ["AMS", "EVO"];
            aSteps.forEach(function (step) {
                this.getView().byId(step).setVisible(step === stepId);
            }.bind(this));

            this.getView().byId("wizard").nextStep();
        },
        
        onSendMail: function () {
            var oSelectedType = this.getView().getModel("selectedType").getProperty("/value");
            var oEmailDetails;

            
            if (oSelectedType === "AMS") {
                var oAMSModel = this.getView().getModel("AMSModel").getData();
                oEmailDetails = {
                    subject: "AMS - " + oAMSModel.ticketCode,
                    body: oAMSModel.emailBody
                };
            }
            
            else if (oSelectedType === "EVO") {
                var oEVOModel = this.getView().getModel("EVOModel").getData();
                oEmailDetails = {
                    subject: "EVO - " + oEVOModel.evoCode,
                    body: oEVOModel.emailBody
                };
            }

            var aCCEmails = this.getView().getModel("CCModel").getProperty("/ccEmails");
            oEmailDetails.ccEmails = aCCEmails.join(", ");

            var sMailToLink = "mailto:tuamail@dominio.com" +
                "?cc=" + encodeURIComponent(oEmailDetails.ccEmails) +
                "&subject=" + encodeURIComponent(oEmailDetails.subject) +
                "&body=" + encodeURIComponent(oEmailDetails.body);

            window.location.href = sMailToLink;
        },

        onFileChangeAMS: function (oEvent) {
            var oFileUploader = this.getView().byId("fileUploader");
            var oFile = oFileUploader.oFileUpload.files[0]; 
            this.getView().setModel(new JSONModel(oFile), "AMSModel");
            if (oFile) {
                var oAMSModel = this.getView().getModel("AMSModel");
                oAMSModel.setProperty("/attachment", oFile);
                MessageToast.show("File caricato per ams: " + oFile.name);
            }
        },
        /*onStep2Complete: function () {
            var selectedType = this.getView().getModel("selectedType").getProperty("/value");

            if (selectedType === "AMS") {
                if (!this.getView().byId("ticketCode").getValue() || !this.getView().byId("emailBodyAMS").getValue()) {
                    MessageToast.show("Compila tutti i campi.");
                    return;
                }
            } else if (selectedType === "EVO") {
                if (!this.getView().byId("evoCode").getValue() || !this.getView().byId("emailBodyEVO").getValue()) {
                    MessageToast.show("Compila tutti i campi.");
                    return;
                }
            }

            this.getView().byId("wizard").nextStep();
        },*/

        onNavBack: function () {
            this.getView().byId("wizard").previousStep();
        }
    });
});
