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


    function onSplashScreenDismissed() {

        //document.querySelector("#learnMore").addEventListener("click", ExtendedSplash.remove, false);
        //setInterval(function () { ExtendedSplash.remove }, 3000, false);
        //setTimeout(function () { ExtendedSplash.remove }, 3000);

        //Splash Screen With Delay 
        /*setTimeout(function () {
           console.log("3 Seconds Elapsed"); var elem = document.getElementById('extendedSplashScreen');
           elem.parentNode.removeChild(elem); return false;
       }, 3000);*/

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
                console.log("Result" + results);

                
                setTimeout(function () {
                    console.log("3 Seconds Elapsed"); var elem = document.getElementById('extendedSplashScreen');
                    elem.parentNode.removeChild(elem); return false;
                }, 3000);
            });
        } catch (err) {
            WinJS.log && WinJS.log("Error message: " + err.message, "sample", "error");
        }
    }


    function onResize() {
        
        if (_splash) {
            _coordinates = _splash.imageLocation;
            ExtendedSplash.updateImageLocation(_splash);
        }
    }

    app.start();
})();
