sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Token"
], function (Controller, MessageToast, Token) {
    "use strict";

    return Controller.extend("yproject1.controller.View1", {

        onInit: function () {
            var oAMSModel = new sap.ui.model.json.JSONModel({
                ticketCode: "",
                emailBody: "",
                variantName: "",
                transaction: "",
                attachment: null
            });
            var oEVOModel = new sap.ui.model.json.JSONModel({
                evoCode: "",
                emailBody: "",
                analysisDesc: "",
                attachment: null
            });

            var oCCModel = new sap.ui.model.json.JSONModel({
                ccEmails: []
            });

            this.getView().setModel(oAMSModel, "AMSModel");
            this.getView().setModel(oEVOModel, "EVOModel");
            this.getView().setModel(oCCModel, "CCModel");
        },

        handleUploadPressAMS: function () {
            var oFileUploader = this.getView().byId("fileUploaderAMS");
            if (!oFileUploader.getValue()) {
                MessageToast.show("Seleziona un file prima di caricare.");
            } else {
                oFileUploader.upload();
            }
        },

        onFileChangeAMS: function (oEvent) {
            var oAMSModel = this.getView().getModel("AMSModel");
            var oFile = oEvent.getParameter("files")[0]; 
            oAMSModel.setProperty("/attachment", oFile); 
            MessageToast.show("File caricato per AMS: " + oFile.name);
        },

        handleUploadPressEVO: function () {
            var oFileUploader = this.getView().byId("fileUploaderEVO");
            if (!oFileUploader.getValue()) {
                MessageToast.show("Seleziona un file prima di caricare.");
            } else {
                oFileUploader.upload();
            }
        },

        onFileChangeEVO: function (oEvent) {
            var oEVOModel = this.getView().getModel("EVOModel");
            var oFile = oEvent.getParameter("files")[0];
            oEVOModel.setProperty("/attachment", oFile); 
            MessageToast.show("File caricato per EVO: " + oFile.name);
        },

        onTokenChange: function (oEvent) {
            var oCCModel = this.getView().getModel("CCModel");
            var aTokens = oEvent.getSource().getTokens();
            var aEmails = [];

            aTokens.forEach(function (oToken) {
                aEmails.push(oToken.getText());
            });

            oCCModel.setProperty("/ccEmails", aEmails);
        },

        onSendMail: function () {
            var oSelectedType = this.getView().getModel("selectedType").getProperty("/value");
            var oEmailDetails;

            if (oSelectedType === "AMS") {
                var oAMSModel = this.getView().getModel("AMSModel").getData();
                oEmailDetails = {
                    subject: "AMS - " + oAMSModel.ticketCode,
                    body: oAMSModel.emailBody,
                    attachment: oAMSModel.attachment
                };
            }
            else if (oSelectedType === "EVO") {
                var oEVOModel = this.getView().getModel("EVOModel").getData();
                oEmailDetails = {
                    subject: "EVO - " + oEVOModel.evoCode,
                    body: oEVOModel.emailBody,
                    attachment: oEVOModel.attachment
                };
            }

            var aCCEmails = this.getView().getModel("CCModel").getProperty("/ccEmails"); //mailin CC
            oEmailDetails.ccEmails = aCCEmails.join(", ");

           if (oEmailDetails.attachment) {
                MessageToast.show("Email inviata con allegato: " + oEmailDetails.attachment.name + " a " + oEmailDetails.ccEmails);
            } else {
                MessageToast.show("Email inviata senza allegato a " + oEmailDetails.ccEmails);
            }
        },








        _________________________________________________________

        sap.ui.define([
            "sap/ui/core/mvc/Controller",
            "sap/m/MessageToast",
            "sap/m/Token"
        ], function (Controller, MessageToast, Token) {
            "use strict";
        
            return Controller.extend("yproject1.controller.View1", {
        
                onInit: function () {
                    var oAMSModel = new sap.ui.model.json.JSONModel({
                        ticketCode: "",
                        emailBody: "",
                        variantName: "",
                        transaction: "",
                        attachment: null
                    });
                    var oEVOModel = new sap.ui.model.json.JSONModel({
                        evoCode: "",
                        emailBody: "",
                        analysisDesc: "",
                        attachment: null
                    });
        
                    var oCCModel = new sap.ui.model.json.JSONModel({
                        ccEmails: []
                    });
        
                    this.getView().setModel(oAMSModel, "AMSModel");
                    this.getView().setModel(oEVOModel, "EVOModel");
                    this.getView().setModel(oCCModel, "CCModel");
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
        
                onSendMail: function () {
                    var oSelectedType = this.getView().getModel("selectedType").getProperty("/value");
                    var oEmailDetails;
        
                    if (oSelectedType === "AMS") {
                        var oAMSModel = this.getView().getModel("AMSModel").getData();
                        oEmailDetails = {
                            subject: "AMS - " + oAMSModel.ticketCode,
                            body: oAMSModel.emailBody,
                            attachment: oAMSModel.attachment
                        };
                    }
                    else if (oSelectedType === "EVO") {
                        var oEVOModel = this.getView().getModel("EVOModel").getData();
                        oEmailDetails = {
                            subject: "EVO - " + oEVOModel.evoCode,
                            body: oEVOModel.emailBody,
                            attachment: oEVOModel.attachment
                        };
                    }
        
                    var aCCEmails = this.getView().getModel("CCModel").getProperty("/ccEmails");
                    oEmailDetails.ccEmails = aCCEmails.join(", ");
        
                    if (oEmailDetails.attachment) {
                        MessageToast.show("Email inviata con allegato: " + oEmailDetails.attachment.name + " a " + oEmailDetails.ccEmails);
                    } else {
                        MessageToast.show("Email inviata senza allegato a " + oEmailDetails.ccEmails);
                    }
                }
            });
        });
        
    });
});
