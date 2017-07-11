Meteor.methods({
  addSigner(data){
    Signers.insert({
          initiative: data.initiative,
          user: data.user,
          date: data.date,
		  displayName: data.displayName
        });

    
    let initiative = Initiatives.findOne({"_id": data.initiative});
    console.log(initiative);

    let targetNumber = initiative.targetNumber;
    console.log(targetNumber);
    let signerCount = initiative.signerCount;
    console.log(signerCount);

    signerCount = signerCount + 1;
    console.log(signerCount);
    let newRating = signerCount / targetNumber;
    console.log(newRating);
    Initiatives.update({"_id": data.initiative}, {"$set": {"rating": newRating, "signerCount": signerCount}  });
  },

  removeSigner(initiativeId, userId){
    //check(resolution, Object);
   /* if(Meteor.userId() !== resolution.user){
      throw new Meteor.Error('not-authorised');
    }*/
    Signers.remove({
        "$and":[
          {initiative: initiativeId},
          {user: userId}
        ]         
        });

    let initiative = Initiatives.findOne({"_id": initiativeId});
    let targetNumber = initiative.targetNumber;
    let signerCount = initiative.signerCount;

    signerCount = signerCount - 1;
    let newRating = signerCount / targetNumber;

    Initiatives.update({"_id": initiativeId}, {"$set": {"rating": newRating, "signerCount": signerCount}  });
  },

  updateOrInsertLike(userId, commentId, value){
    //check(resolution, Object);
   /* if(Meteor.userId() !== resolution.user){
      throw new Meteor.Error('not-authorised');
    }*/
    let doc = CommentLikes.findOne({"$and": [{user: userId}, {comment: commentId}]} );

    let comment = Comments.findOne({"_id": commentId});
    let likes = comment.likes;
    let dislikes = comment.dislikes;

    doc 
    ? 
      (value !== doc.value) 
      ? 
      (
        CommentLikes.update({"_id": doc._id}, {$set: {"value": value}}), 
        (value) ? (likes = likes + 1, dislikes = dislikes - 1) : (likes = likes - 1, dislikes = dislikes + 1)
      )
      :
      ( 
        CommentLikes.remove(doc._id),
        (value) ? (likes = likes - 1) : (dislikes = dislikes - 1)
      )
    
    : 
    (
    CommentLikes.insert({user: Meteor.userId(), value: value, comment:commentId}),
    (value) ? (likes = likes + 1) : (dislikes = dislikes + 1)
    );

    Comments.update({"_id":commentId}, {"$set": {"likes": likes, "dislikes": dislikes}  });

  },

  finishInitiative(initiativeId){
    Initiatives.update({"_id": initiativeId}, {$set: {"finished": true}});

    Email.send({
      to: "zeljkicc@hotmail.com",
      from: "zeljkicc@hotmail.com",
      subject: "Example Email",
      text: "The contents of our email in plain text."
    });

  },

  createInitiative(initiative){
	  let textId = Text.insert({
		  text: initiative.text
	  });
	  
	  let pictureId = Pictures.insert({
		  data: initiative.imageSrc
	  });
	  
	  let newInitiative = {
		  name: initiative.name,
		  description: initiative.description,
		  textId: textId,
		  pictureId: pictureId,
		  endDate: initiative.endDate,
		  value24: initiative.value24,
		  targetNumber: initiative.targetNumber,
		  date: initiative.date,
		  user: initiative.user,
		  finished: initiative.finished,
		  location: initiative.location,
		  front: initiative.front,
		  showData: initiative.showData
	  }
	  
	  console.log(newInitiative);
	  
      newInitiative.rating = 0;
      newInitiative.signerCount = 0;
	  
      Initiatives.insert(newInitiative);
  },

  deleteInitiative(id){
     Initiatives.remove({"_id": id});

     //povratna vrednost
  },
  toggleFrontInitiative(data){
     Initiatives.update({"_id": data.id}, {
      "$set": {"front": data.value}
     });

     //povratna vrednost
  },
  deleteComment(id){
     Comments.remove({"_id": id});
  },
 registerUser(user){
	   Accounts.createUser({
            email: user.email,
            password: user.password,
            profile: {
            	firstname: user.firstname,
            	lastname: user.lastname,
            	place: user.place,
            	imgSrc: user.imgSrc,
				role: "user",
				date: new Date()
            }
			
	  });
			
		//Accounts.loginWithPassword(user.email, user.password); 
            
   
		
		
		
        	
   },
   
   createComment(comment){
	   Comments.insert(comment);
   },
   
   updateProfile(data){
		Meteor.users.update(Meteor.userId(), {
					$set: {
						emails: 
						[
							{
								address: data.email,
								verified: false
							}
						],
						profile: {
							firstname: data.firstname,
							lastname: data.lastname,
							place: data.place,
							imgSrc: data.imgSrc							
						}
					}
				});
   }
		



  

});