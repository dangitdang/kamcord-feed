var feedURL = "https://rawgit.com/dangitdang/kamcord-feed/master/feeds/feed"
var getFeed = function(index, callback){
	$.getJSON(feedURL+index+".json", callback);
};

var currentPage = 0;

var displayFeed = function(index,callback){
	var rawResult=getFeed(index, function(result) {
		console.log(result);
		var feedInfo = result.response.feed_info
		for (var i = 0; i < feedInfo.length; i++){
			var interactions = feedInfo[i].interaction_counts
			var interaction_info = $('<ul>', 
				{class:"info"})
			var id = feedInfo[i].video_id
			$('<li>').addClass('views').text(interactions.views + " views").appendTo(interaction_info);
			$('<li>').addClass('comments').text(interactions.comments  + " comments").appendTo(interaction_info);
			var video = $("<video preload='none'>").attr(
				'poster',feedInfo[i].thumbnail_urls.regular.url).append($('<source>', {
				src : feedInfo[i].video_urls.encoded[0].url
			}));
			$('<div>',{
				class:"container",
				html:$("<div>", 
						{class:"stream",
						 'data-video-id':id,
						  html: $('<h5>', {class:'title', text:feedInfo[i].title})
						}).append(video,interaction_info)
			}).appendTo('.main-container');
		}
		$('<div>',{
			class:"container",
			id:"more",
			html:$("<div>",
				{class:"stream",
				 html:$("<h1>").text("MORE VIDEOS")})
		}).appendTo(".main-container");
		callback();
	});
}

var getStreamURL = function(id){
	return "https://securecontent.kamcord.com/kamcord-games-1-videos/"+id
}

var setUpContent = function(){
		$('video').click(function(){
			if (this.paused){
				this.play();
			}else {
				this.pause();
			}		
		});
		$("#more").click(function(){
			$(this).remove();
			currentPage += 1
			displayFeed(currentPage,setUpContent);
		})
}
$(function (){
	displayFeed(currentPage,setUpContent);
});




