// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var _splash,
        _coordinates = { x: 0, y: 0, width: 0, height: 0 };


    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {

            _splash = args.detail.splashScreen;
            _coordinates = _splash.imageLocation;
            ExtendedSplash.show(_splash);

            window.addEventListener("resize", onResize, false);
            _splash.addEventListener("dismissed", onSplashScreenDismissed, false);

            args.setPromise(WinJS.UI.processAll());
        }
    };

    // Begin additional loading tasks here…
    function performSetupTasks() {
       
      
    }

    // The splash screen has been dismissed and the extended splash screen is now in view.
    function onSplashScreenDismissed() {
        //Windows Credential Picker
        try {
            var message = "Login";
            var targetName = "Welcome";
            console.log("Credential Picker");
            Windows.Security.Credentials.UI.CredentialPicker.pickAsync(targetName, message).then(function (results) {
                //document.getElementById("OutputDomainName").value = results.credentialDomainName;
                //document.getElementById("OutputUserName").value = results.credentialUserName;
                //document.getElementById("OutputPassword").value = results.credentialPassword;
                //document.getElementById("OutputCredentialSaved").value = results.credentialSaved ? "Yes" : "No";
                //document.getElementById("OutputCredentialSaveState").value = (results.credentialSaveOption === Windows.Security.Credentials.UI.CredentialSaveOption.hidden) ? "Hidden" :
                //                                                             ((results.credentialSaveOption === Windows.Security.Credentials.UI.CredentialSaveOption.selected) ? "Selected" : "Unselected");
                //WinJS.log && WinJS.log("pickAsync status: " + results.errorCode, "sample", "status");
                console.log("Username:" + results.credentialUserName);
                console.log("Password:" + results.credentialPassword);
                removeSplash();
            });
        } catch (err) {
            WinJS.log && WinJS.log("Error message: " + err.message, "sample", "error");
            MSApp.terminateApp(err);
            console.log(err.message);
        }
    }

    function removeSplash() {
        //Delay for Extended Splash Screen
        setTimeout(function () {
            console.log("3 Seconds Elapsed"); var elem = document.getElementById('extendedSplashScreen');
            elem.parentNode.removeChild(elem); return false;
        }, 3000);
    }

    function onResize() {
        
        if (_splash) {
            _coordinates = _splash.imageLocation;
            ExtendedSplash.updateImageLocation(_splash);
        }
    }

    app.start();
})();
