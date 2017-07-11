import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './MainLayout.jsx';
import Proba from './Proba.jsx';
import App from './App.jsx';

import CreateInitiative from './initiative/CreateInitiative';
import InitiativesList from './initiative/InitiativesList';
import InitiativeDetails from './initiative/InitiativeDetails';

import Register from './user/Register';
import LoginForm from './user/LoginForm';
import UpdateProfile from './user/UpdateProfile';

import FrontPage from './FrontPage';
import About from './About';
import Contact from './Contact';


import AdminPanel from './admin/AdminPanel';
import UserListAdmin from './admin/user/UserListAdmin';
import InitiativeListAdmin from './admin/initiative/InitiativeListAdmin';
import CommentListAdmin from './admin/comment/CommentListAdmin';

import AndroidAppDownload from './AndroidAppDownload.jsx';


FlowRouter.route('/', {
	action(){
		mount(MainLayout, {
			content: (<FrontPage />)
		})
	}
});

FlowRouter.route('/createinitiative', {
	action(){
		mount(MainLayout, {
			content: (<CreateInitiative />)
		})
	}
});

FlowRouter.route('/initiativeslist', {
	action(){
		mount(MainLayout, {
			content: (<InitiativesList />)
		})
	},
	triggersEnter: [() => {
    window.scrollTo(0, 0);
  	}]
});

FlowRouter.route('/initiativeslist/:id', {
	triggersEnter: [() => {
    	window.scrollTo(0, 0);
  	}],
	action(params){
		mount(MainLayout, {
			content: (<InitiativeDetails id={params.id} />)
		})
	}
});

FlowRouter.route('/initiativeslist/search/:word', {
	triggersEnter: [() => {
    window.scrollTo(0, 0);
  	}],
	action(params){
		mount(MainLayout, {
			content: (<InitiativeDetails word={params.word}/>)
		})
	}
});


FlowRouter.route('/register', {
	action(){
		mount(MainLayout, {
			content: (<Register />)
		})
	}
});


FlowRouter.route('/login', {

	action(){
		mount(MainLayout, {
			content: (<LoginForm />)
		})
	}
});

FlowRouter.route('/updateprofile', {

	action(){
		mount(MainLayout, {
			content: (<UpdateProfile id={Meteor.userId()} />)
		})
	}
});


FlowRouter.route('/about', {

	action(){
		mount(MainLayout, {
			content: (<About />)
		})
	}
});

FlowRouter.route('/contact', {

	action(){
		mount(MainLayout, {
			content: (<Contact />)
		})
	}
});






FlowRouter.route('/admin/users', {

	action(){
		mount(MainLayout, {
			content: (<UserListAdmin />)
		})
	}
});

FlowRouter.route('/admin/initiatives', {

	action(){
		mount(MainLayout, {
			content: (<InitiativeListAdmin />)
		})
	}
});

FlowRouter.route('/admin/comments', {

	action(){
		mount(MainLayout, {
			content: (<CommentListAdmin />)
		})
	}
});

FlowRouter.route('/admin', {

	action(){		
		mount(MainLayout, {
			content: (<AdminPanel />)
		})
	}
});

FlowRouter.route('/android-app', {

	action(){		
		mount(MainLayout, {
			content: (<AndroidAppDownload />)
		})
	}
});



