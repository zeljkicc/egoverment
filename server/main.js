import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
  Initiatives._ensureIndex( { name: "text" } )
  


  process.env.MAIL_URL = "smtp://postmaster@sandbox08f5d3bc931c42189f981ecfe1a07898.mailgun.org:1ac4babe1f84e5c7fd65d2af72255d54@smtp.mailgun.org:587";

 // process.env.BIND_IP="192.168.0.10";
/*
 let user = Meteor.users.findOne({email: "borko"});

 if(!user){
      Accounts.createUser({
            email: "borko",
            password: "borko",
            profile: {
              firstname: "admin",
              lastname: "admin",
              place: "admin",
              imgSrc: ""
            }   
        });

      Roles.addUsersToRoles( Meteor.users.findOne({email: "borko"}), 'admin' );

 }
 */
 
 //creating admin profiles////////////////////////////
 let admin1 = Accounts.findUserByEmail("admin555@admin.com");
 
 if(!admin1){
	 Accounts.createUser({
            email: "admin555@admin.com",
            password: "Admin555!",
            profile: {
              firstname: "admin",
              lastname: "admin",
              place: "admin",
              imgSrc: "/img/profile.png",
			  role: "admin"
            }   
        });
 }
 
 
  let admin2 = Accounts.findUserByEmail("admin777@admin.com");
 
 if(!admin2){
	 Accounts.createUser({
            email: "admin777@admin.com",
            password: "Admin777!",
            profile: {
              firstname: "admin",
              lastname: "admin",
              place: "admin",
              imgSrc: "/img/profile.png",
			  role: "admin"
            }   
        });
 }
//////////////////////////////////////////////////////

});



//za search/////////////////////////////////////////////////////////////
SearchSource.defineSource('initiatives', function(searchText, options) {
  var options = {sort: {date: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {name: regExp};
    return Initiatives.find(selector, options).fetch();
  } else {
    return Initiatives.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);
  var exps = _.map(words, function(word) {
    return "(?=.*" + word + ")";
  });
  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
}
/////////////////////////////////////////////////////////////////////////


// Listen to incoming HTTP requests, can only be used on the server
WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
  
});




//za mLab mongo
//mongodb://admin555:Admin555!@ds139072.mlab.com:39072/egoverment