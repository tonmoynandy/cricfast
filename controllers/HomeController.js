
var request 		= require('request');
var cheerio 		= require('cheerio');
var http = require('http'),
Stream = require('stream').Transform;
var fs 				= require('fs');
var HomeController = {

	index  : function(req, res){
		var url = "http://www.cricbuzz.com/cricket-team/women";
		var urlArr = [
			"http://www.cricbuzz.com/cricket-team",
			"http://www.cricbuzz.com/cricket-team/domestic",
			"http://www.cricbuzz.com/cricket-team/league",
			"http://www.cricbuzz.com/cricket-team/women"
		];
		for(let u of urlArr) {
			let url = u;
			request(url, function(error, response, html){
				
				var $ = cheerio.load(html);
				var result = [];
				$(".cb-team-item").each(function(i,e){
					var teamLink = $(e).find('a').attr('href');
					var teamImg =  $(e).find('img').attr('src');
					var teamname = $(e).find('a').attr('title');
					teamname = teamname.split(' ').join('_').toLowerCase();
					http.request("http:"+teamImg, function(responseImg) {                                        
					  var data = new Stream();                                                    

					  responseImg.on('data', function(chunk) {                                       
					    data.push(chunk);                                                         
					  });                                                                         

					  responseImg.on('end', function() {                                             
					    fs.writeFileSync("public/files/team-flags/"+teamname+".png", data.read());                               
					  });                                                                         
					}).end();
					result.push({
						name : $(e).find('a').attr('title'),
						teamLink : teamLink,
						teamImg : teamImg
					})
				})
				//res.send(result);
			})
		}
		//response.render("index");
		//response.send("index");
	},

}
module.exports =  HomeController;