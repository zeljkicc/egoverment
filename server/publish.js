Initiatives = new Mongo.Collection("initiatives");

Comments = new Mongo.Collection("comments");



Signers = new Mongo.Collection("signers");

CommentLikes = new Mongo.Collection("comment-likes");

Pictures = new Mongo.Collection("pictures");

Text = new Mongo.Collection("text");

//initiatives-------------------------------------
Meteor.publish("allInitiatives", function(){
    return Initiatives.find();
});

Meteor.publish("limitInitiatives", function(sort){
    return Initiatives.find({finished: false},sort);
});

Meteor.publish("oneInitiative", function(id){
    return Initiatives.find({_id: id});
});

Meteor.publish("textInitiatives", function(text){
	//console.log("Ovde smo");
	//console.log(Initiatives.find({"name": "/.*" + text + ".*/"}));
    //return Initiatives.find({"name": "/.*" + text + ".*/"});
	
	return Initiatives.find({
						  $text:
							{
							  $search: text
							}
						});
});

//---------------------------------------------

//comments-------------------------------------
Meteor.publish("allComments", function(){
    return Comments.find();
});

Meteor.publish("limitComments", function(sort){
    return Comments.find({}, sort);
});

Meteor.publish("commentsIni", function(data){
	//console.log(data);
	//console.log(Comments.find({initiative: data.initiative},{limit: data.limit}).fetch());
    return Comments.find({initiative: data.initiative},data.sort);
});

//-----------------------------------------------

//commentLikes-----------------------------------
Meteor.publish("commentLikes", function(data){
	console.log(data);
    return CommentLikes.find({comment: data.comment});
});
//-----------------------------------------------

//users------------------------------------------
Meteor.publish("limitUsers", function(data){
    return Meteor.users.find({}, {sort: {date: -1}, limit:data.limit});
});
//-----------------------------------------------

//signers------------------------------------------
Meteor.publish("limitSigners", function(data){ 
    return Signers.find({initiative: data.initiative}, {sort: {date: -1}, limit:data.limit});
});
//-----------------------------------------------

//images------------------------------------------
Meteor.publish("pictureById", function(id){
    return Pictures.find({_id: id});
});
//-----------------------------------------------

//text------------------------------------------
Meteor.publish("textById", function(id){
    return Text.find({_id: id});
});
//-----------------------------------------------