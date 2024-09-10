sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/SearchField",
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, SearchField, Dialog, List, StandardListItem, JSONModel) {
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
