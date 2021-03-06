$(document).ready(function() {
    var user = "AtlassianPS";

    // if (data = JSON.parse(localStorage[id])) { // use cache
    //     console.debug("using cache for: " + id, data);
    //     // setRepoData("{{ forloop.index }}", data);
    // } else {
    //     $.get("https://api.github.com/users/" + id + "/repos?per_page=100", function(data) {
    //         localStorage[id] = JSON.stringify(data); // store cache
    //         // setRepoData("{{ forloop.index }}", data);
    //     });
    // }

    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + user + "/repos?per_page=100",
        tryCount: 0,
        retryLimit: 3,
        async: !0,
        dataType: "json",
        success: function(data) {
            $.each(data, function(index, data) {
                let id = user + '/' + data.name;
                $("div.module.item[repo='" + data.name + "']").find(".html_url").attr("href", data.html_url);
                $("div.module.item[repo='" + data.name + "']").find(".item-description").html(data.description);
                $("div.module.item[repo='" + data.name + "']").find(".img.logo").attr("alt", data.name);
                $("div.module.item[repo='" + data.name + "']").find(".fork").html('<i class="fa fa-code-fork"></i> ' + data.forks_count);
                $("div.module.item[repo='" + data.name + "']").find(".star").html('<i class="fa fa-star"></i> ' + data.stargazers_count);

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        $("div.module.item[repo='" + data.name + "']").find("img.logo").src = "data:" + xhr.getResponseHeader("Content-Type") + ";base64," + btoa(String.fromCharCode.apply(null, new Uint8Array(xhr.response)));
                        $("div.module.item[repo='" + data.name + "']").find("img.logo").removeClass("hide");
                    }
                }
                xhr.responseType = "arraybuffer";
                xhr.open("GET", "https://raw.githubusercontent.com/" + id + "/master/logo.png", true);
                xhr.send();
            });
        }
    }).done(function(data) {
        // if (console && console.log) {
        // console.log("Sample of data:", data.slice(0, 100));
        // }
    });
});