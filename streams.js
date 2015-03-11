var feedURL = "http://www.kamcord.com/app/v1/videos/feeds/1/1?page="
var getFeed = function(index){
	return $.getJSON("feeds/feed"+index+".json", function (data){
		console.log(data);
		return data;
	});
}

