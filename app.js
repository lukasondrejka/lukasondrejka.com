window.onload = function () {
    var canonicalLink = document.querySelector("link[rel='canonical']").href;
    var currentLink = window.location.href;

    if (canonicalLink != currentLink) {
        window.location.href = canonicalLink;
    }
}
