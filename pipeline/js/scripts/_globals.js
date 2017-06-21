//operating system constants
const isMac = navigator.userAgent.indexOf('Mac OS X') != -1 ? true : false;
const theOs = getMobileOperatingSystem();
const isMobile = (theOs == "Android" || theOs == "iOS" || theOs == "Windows Phone");

//simple browser sniff function
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "WindowsPhone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "notmobile";
}
