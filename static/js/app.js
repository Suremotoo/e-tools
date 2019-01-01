$(document).ready(function() {
    $(".latest-version").hide();

    $('.scroll-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    $(window).scroll(function() {
        $(".section").each(function() {
            var section = $(this);
            var sectionScreenshot = section.find(".screenshot");

            var direction;
            if (section.hasClass("alt")) {
                direction = "left";
            } else {
                direction = "right";
            }

            if (sectionScreenshot.css('display') == 'none' && isScrolledIntoView(section)) {
                sectionScreenshot.show("slide", {
                    duration: 1000,
                    direction: direction
                });
            }
        });
    });

    getLatestReleaseDetails();
});

function getLatestReleaseDetails() {
    $.getJSON("https://api.github.com/repos/Suremotoo/e-tools/releases/latest").done(function(release) {
        var asset;
        var downloadURL;
        var assetsArr = release.assets;
        for (var i = 0; i < assetsArr.length; i++) {
            asset = assetsArr[i];
            var name = asset.name;
            if (name.indexOf("mac.zip") != -1) {
                downloadURL = "https://github.com/Suremotoo/e-tools/releases/download/" + release.tag_name + "/" + asset.name;
                $("#download-mac").attr("href", downloadURL);
                continue;
            }
            if (name.indexOf("linux.zip") != -1) {
                downloadURL = "https://github.com/Suremotoo/e-tools/releases/download/" + release.tag_name + "/" + asset.name;
                $("#download-linux").attr("href", downloadURL);
                continue;
            }
            if (name.indexOf("win.zip") != -1) {
                downloadURL = "https://github.com/Suremotoo/e-tools/releases/download/" + release.tag_name + "/" + asset.name;
                $("#download-windows").attr("href", downloadURL);
                continue;
            }
        }

        var releaseDate = new Date(release.created_at);
        var d = releaseDate.getDate();
        var m = releaseDate.getMonth() + 1;
        var y = releaseDate.getFullYear();

        $(".latest-version .version span").text(release.tag_name);
        $(".latest-version .date span").text(d + "/" + m + "/" + y);
        $(".latest-version").fadeIn(500);
        $("#coffee-loading").hide();
    });
}

function isScrolledIntoView(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}



function detectOS() {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
    }
    return "other";
}