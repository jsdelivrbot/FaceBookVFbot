


var https = require('https');
var express = require('express');
const Agent = require('node-agent-sdk').Agent;
var echoAgent = new Agent({
	accountId: '13099967',
	username: 'facebookbot',
	appKey: 'e1fdfd1a05c5415890b4279235b4dac6',
	secret: '66482e8afaeb9460',
	accessToken: '268f398c9fbd41c6a939aee1a60a7455',
	accessTokenSecret: '6996463d0940bbe0'
});


var bearer = "";
var agentsLogged = [];
var activeSkills = [];
var FaceBookSkill = 1089726032;
var answer = [];
var limboskill = 1051213232;
var risvegliataskill = 1051213332;
var accountNumber = 13099967;
var botID = 1089636032;
var customBotID = accountNumber + "." + botID;
var agentJSON = {};
var skill = "xyz";
var convID = "682e0bbe-f7af-477b-97ba-461a6bd91780";
var yesno = "";
var comments = "";
var minutes = "";
var telefono;
var ricontatto;
var cfiscale;
var vfTag;
var triplettauno;
var triplettadue;
var triplettatre;
var visitorID;






var app = express();
app.listen(process.env.PORT);
app.set('port', (process.env.PORT || 5000));

// Required to allow access to the service across different domains
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Content-Type', 'text/plain');
  next();
});


app.get('/add', checkValues);
	
function checkValues(req, res, next) {	
	telefono = req.query.telefono;
	ricontatto = req.query.ricontatto;
	cfiscale = req.query.cfiscale;
	vfTag = req.query.vfTag;
	triplettauno = req.query.triplettauno;
	triplettadue = req.query.triplettadue;
	triplettatre = req.query.triplettatre;
	visitorID = req.query.visitorID;
	var retrieve = req.query.retrieve;


	yesno = req.query.yesno;
	comments = req.query.comments;
	minutes = req.query.minutes;
	convID = req.query.convID;
	skill = req.query.skill;
	
	if(retrieve === "1"){
		var request = require('request');
		var oauth = "Bearer " + bearer;
		var body = {"consumer":visitorID,"status":["OPEN","CLOSE"]};
		var url = 'https://lo.msghist.liveperson.net/messaging_history/api/account/13099967/conversations/consumer/search?=Order:[desc]';
		request.post({
			url: url,
			json: true,
			body: body,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': oauth
			}
		}, function (e, r, b) {
			var arraylength = b._metadata.count;
			for (var i = 0; i < arraylength; i++){
				if(b.conversationHistoryRecords[i].hasOwnProperty('transfers')){
					if (typeof b.conversationHistoryRecords[i].transfers !== 'undefined' && b.conversationHistoryRecords[i].transfers.length > 0) {
						var arraylength2 = b.conversationHistoryRecords[i].transfers.length;
						for (var z = (arraylength2 -1); z > -1; z--){
							if(b.conversationHistoryRecords[i].transfers[z].hasOwnProperty('contextData')){
								if(b.conversationHistoryRecords[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
									if(b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
										var numero_telefono = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].name;
										var numero_ricontatto = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[1].name;
										var numero_cfiscale = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[2].name;
										z = 0;
										i = arraylength;
									
									}
								}
							}
						}
					}
				}
			}

			res.send([numero_telefono,numero_ricontatto,numero_cfiscale]);
		});
		
		
	
		


	}
	else if(retrieve === "0"){
		skill = convertSkill();
		markConvFB();
		res.send([skill]);
	}
	else{
		skill = convertSkill();
		markConv();
		res.send([skill]);
	}
		
	

  
	
	// Output result in a JSON object
	// res.send({'result': convID});
}


app.get('/ping', function(req, res, next) {

	// Output result in a JSON object
	res.send({'result': convID});
});



echoAgent.on('closed', data => {
	console.log('socket closed', data);
	echoAgent.reconnect();
});




setInterval(function() {
    https.get("https://git.heroku.com/vodafonebotdario.git");
}, 600000); // every 5 minutes (300000) every 10 minutes (600000)


function retrieveSkills(){

	console.log("SKILLS");
	var request = require('request');
	var oauth = "Bearer " + bearer;
	var url = 'https://lo.ac.liveperson.net/api/account/13099967/configuration/le-users/skills';
	request.get({
    		url: url,
    		json: true,
    		headers: {
        		'Content-Type': 'application/json',
			'Authorization': oauth
    		}
	}, function (e, r, b) {

		activeSkills = b;

	});


}


function convertSkill(){
	
	var found = 0;
	for (var i = 0; i < activeSkills.length; i++) {
		if(activeSkills[i].name === skill){
			found = 1;
			return activeSkills[i].id;
		}
	}
	if(!found){
		return -1;
	}


}




function markConv(){
	
	console.log("***tagging");

	const metadata = [{
		type: 'BotResponse', // Bot context information about the last consumer message
		externalConversationId: convID,
		businessCases: [
			'RightNow_Categorization' // identified capability
		],
		intents: [ // Last consumer message identified intents
		{
			id: 'yesno',
			name: yesno,
			confidenceScore: 1
		},
		{
			id: 'comments',
			name: comments,
			confidenceScore: 1
		},
		{
			id: 'minutes',
			name: minutes,
			confidenceScore: 1
		}]
	}];




	echoAgent.updateConversationField({
		conversationId: convID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "ADD",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
			} else {
				// console.log("joining completed");
			}
	});





	echoAgent.updateConversationField({
		conversationId: convID,
		conversationField: [{
			field: "Skill",
			type: "UPDATE",
			skill: skill
		}]
		}, null, metadata, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("transfered completed");
			}
	});




	echoAgent.updateConversationField({
		conversationId: convID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "REMOVE",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
			} else {
				// console.log("leave completed");
			}
	});




}




function markConvFB(){
	
	console.log("***taggingFB");

	const metadata = [{
		type: 'BotResponse', // Bot context information about the last consumer message
		externalConversationId: convID,
		businessCases: [
			'RightNow_Categorization' // identified capability
		],
		intents: [ // Last consumer message identified intents
		{
			id: 'telefono',
			name: telefono,
			confidenceScore: 1
		},
		{
			id: 'ricontatto',
			name: ricontatto,
			confidenceScore: 1
		},
		{
			id: 'cfiscale',
			name: cfiscale,
			confidenceScore: 1
		},
		{
			id: 'vfTag',
			name: vfTag,
			confidenceScore: 1
		},
		{
			id: 'triplettauno',
			name: triplettauno,
			confidenceScore: 1
		},
		{
			id: 'triplettadue',
			name: triplettadue,
			confidenceScore: 1
		},
		{
			id: 'triplettatre',
			name: triplettatre,
			confidenceScore: 1
		}	
		]
	}];




	echoAgent.updateConversationField({
		conversationId: convID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "ADD",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
			} else {
				// console.log("joining completed");
			}
	});





	echoAgent.updateConversationField({
		conversationId: convID,
		conversationField: [{
			field: "Skill",
			type: "UPDATE",
			skill: skill
		}]
		}, null, metadata, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("transfered completed");
			}
	});




	echoAgent.updateConversationField({
		conversationId: convID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "REMOVE",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
			} else {
				// console.log("leave completed");
			}
	});




}






function retrieveAgentsLogged(){

	console.log("AGENTS");
	var request = require('request');
	var oauth = "Bearer " + bearer;
	var body = {"status":["ONLINE"]};
	var url = 'https://lo.msghist.liveperson.net/messaging_history/api/account/13099967/agent-view/status';
	request.post({
    		url: url,
    		body: body,
    		json: true,
    		headers: {
        		'Content-Type': 'application/json',
			'Authorization': oauth
    		}
	}, function (e, r, b) {

		if(typeof b.agentStatusRecords !== 'undefined'){
			for (var m = 0; m < (b.agentStatusRecords.length); m++){
				agentsLogged = agentsLogged.concat(b.agentStatusRecords[m].agentLoginName);
			}
		agentJSON = b;
			
		}

	});


}



function closeChat(dialogID, wasNPSsent){
		console.log ("wasNPSsent = " + wasNPSsent);
	
		var request = require('request');
		var oauth = "Bearer " + bearer;
		var body = {"conversationId":dialogID};
		var pushedTags = "something";
		var url = 'https://lo.msghist.liveperson.net/messaging_history/api/account/13099967/conversations/conversation/search';
		request.post({
			url: url,
			json: true,
			body: body,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': oauth
			}
		}, function (e, r, b) {
			var arraylength = b._metadata.count;
			for (var i = 0; i < arraylength; i++){
				if(b.conversationHistoryRecords[i].hasOwnProperty('transfers')){
					if (typeof b.conversationHistoryRecords[i].transfers !== 'undefined' && b.conversationHistoryRecords[i].transfers.length > 0) {
						var arraylength2 = b.conversationHistoryRecords[i].transfers.length;
						for (var z = (arraylength2 -1); z > -1; z--){
							if(b.conversationHistoryRecords[i].transfers[z].hasOwnProperty('contextData')){
								if(b.conversationHistoryRecords[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
									if(b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
										pushedTags = JSON.stringify(b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[3].name);
										triplettauno = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[4].name;
										triplettadue = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[5].name;
										triplettatre = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[6].name;
										z = 0;
										i = arraylength;
									
									}
								}
							}
						}
					}
				}
			}
			
			var cond1 = 0;
			var cond2 = 0;
			var cond3 = 0;
			var cond4 = 0;


			
			if(triplettauno === "Prospect / Dummie"){
				cond1 = 1;
			}
			if(!(pushedTags === "" || pushedTags === undefined)){
				if(pushedTags.includes("KO DEFINITIVO")){
					cond2 = 1;
				}
				if(pushedTags.includes("Richiesta dati mancanti")){
					if(!pushedTags.includes("Messaggio Diretto") && !pushedTags.includes("Contatto Outbound OK")){
						cond3 = 1;
					}
				}
				if(pushedTags.includes("Senza Risposta")){
					cond4 = 1;
				}
			}
		
			console.log(pushedTags);
			console.log(cond1 + " " + cond2 + " " + cond3 + " " + cond4 + " " + wasNPSsent);
			 
			
			if(cond1 || cond2 || cond3 || cond4 || cond5 || wasNPSsent){
				echoAgent.updateConversationField({
					conversationId: dialogID,
					conversationField: [{
						field: "ConversationStateField",
						conversationState: "CLOSE"
					}]
				});
			
			} else{
				console.log("agent out");
				echoAgent.updateConversationField({
					'conversationId': dialogID,
					'conversationField': [
						{
						field: 'ParticipantsChange',
						type: 'ADD',
						userId: customBotID,
						role: 'ASSIGNED_AGENT'
						}]
					}, (e, resp) => {
   						if (e) { 
							console.error(e) 
    						} else {
							console.log("agent in");
							echoAgent.publishEvent({
								'dialogId': dialogID,
								'event': {
									message: "completa la nostra survey!! https://www.vodafone.it", // escalation message
									contentType: "text/plain",
									type: "ContentEvent"
									}

								}, (e, resp) => {
   								if (e) { 
									console.error(e) 
    								} else {
									console.log("message sent");
									var myTimestamp = Date.now();
									const metadata = [{
										type: 'BotResponse', // Bot context information about the last consumer message
										externalConversationId: dialogID,
										businessCases: [
											'RightNow_Categorization' // identified capability
											],
										intents: [ // Last consumer message identified intents
											{
												id: 'NPSsent',
												name: "NPSsent",
												confidenceScore: 1
											}]
									}];
									echoAgent.updateConversationField({
										'conversationId': dialogID,
										'conversationField': [
											{
												field: "Skill",
												type: "UPDATE",
												skill: limboskill
											}]
										}, null, metadata, function(err) {
										if (err) {
											console.error(err)
										} else {
											console.log("transfered completed");
										}
									});
		
			
									echoAgent.updateConversationField({
										'conversationId': dialogID,
										'conversationField': [
											{
											field: 'ParticipantsChange',
											type: 'REMOVE',
											userId: customBotID,
											role: 'ASSIGNED_AGENT'
											}]

										}, (e, resp) => {
   											if (e) { 
												console.error(e) 
    											}
											else {
												console.log("transfered completed");
												setTimeout(function(){
													echoAgent.updateConversationField({
														conversationId: dialogID,
														conversationField: [{
															field: "ConversationStateField",
															conversationState: "CLOSE"
														}]
													});
												}, 3000);
											}
    									
									});
							

								}
							});
						}
				});


		
		
			}


		});
		
		


}


function FaceBookWelcomeMessage(dialogID, timestamp, fbName){
	var d = new Date(timestamp);
	var dateOfWeek = d.getDay();
	var hourOfWeek = d.getHours();
	if (dateOfWeek == 0 || ((hourOfWeek < 7) || (hourOfWeek > 18))){
		var messageFB = "Ciao " + fbName + " grazie per averci scritto. Rispondiamo ai Messaggi Privati tutti i giorni dalle 08.00 alle 22.00. Prendiamo in carico la tua segnalazione e ti risponderemo negli orari di apertura. Servizio Clienti Vodafone.";
	}
	else{
		var messageFB = "Ciao " +  fbName + "! Benvenuto nel Servizio Clienti Vodafone su Facebook un nostro consulente gestirà la tua richiesta di assistenza. Ti invitiamo a fornirci il numero di telefono per il quale richiedi assistenza e il motivo della tua richiesta.";
	}
	
	echoAgent.updateConversationField({
		'conversationId': dialogID,
		'conversationField': [
		{
			field: 'ParticipantsChange',
			type: 'ADD',
			userId: customBotID,
			role: 'ASSIGNED_AGENT'
		}]
		}, (e, resp) => {
   			if (e) { 
				console.error(e) 
    		}
	});
	echoAgent.publishEvent({
		'dialogId': dialogID,
		'event': {
			message: messageFB, // escalation message
			contentType: "text/plain",
			type: "ContentEvent"
			}

		}, (e, resp) => {
   			if (e) { 
				console.error(e) 
    		}
	});
	echoAgent.updateConversationField({
		'conversationId': dialogID,
		'conversationField': [
		{
			field: "Skill",
			type: "UPDATE",
			skill: FaceBookSkill
		}]

		}, function(err) {
   			if (err) { 
				console.error(err) 
    		} else {
				console.log("transfered completed");
			}
	});

	echoAgent.updateConversationField({
		'conversationId': dialogID,
		'conversationField': [
							
			{
			field: 'ParticipantsChange',
			type: 'REMOVE',
			userId: customBotID,
			role: 'ASSIGNED_AGENT'
			}]

		}, (e, resp) => {
   			if (e) { 
				console.error(e) 
    		}
    		console.log("Transfering..." , resp)
	});

	
	
	
	 
	
	
}



function limboChat(dialogID, agentID) {

	var agentToRemove = accountNumber + "." + agentID
	
	
		const metadata = [{
			type: 'BotResponse', // Bot context information about the last consumer message
			externalConversationId: dialogID,
			businessCases: [
				'RightNow_Categorization' // identified capability
			],
			intents: [ // Last consumer message identified intents
			{
				id: 'yesno',
				name: "---",
				confidenceScore: 1
			},
			{
				id: 'comments',
				name: "---",
				confidenceScore: 1
			},
			{
				id: 'minutes',
				name: "limbo",
				confidenceScore: 1
			}]
		}];


		

		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
				{
				field: 'ParticipantsChange',
				type: 'REMOVE',
				userId: agentToRemove,
				role: 'ASSIGNED_AGENT'
				}]
			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
		});





		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
				{
				field: 'ParticipantsChange',
				type: 'ADD',
				userId: customBotID,
				role: 'ASSIGNED_AGENT'
				}]
			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
		});


		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
				{
				field: "Skill",
				type: "UPDATE",
				skill: limboskill
				}]

			}, null, metadata, function(err) {
   				if (err) { 
					console.error(err) 
    				} else{
					console.log("transferring complete");

				echoAgent.updateConversationField({
					'conversationId': dialogID,
					'conversationField': [
						{
						field: "ManualETTR",
						time: Date.now()
						}]
					}, (e, resp) => {
   						if (e) { 
							console.error(e) 
    						}
				});


			}
		});
	
		



		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
							
				{
				field: 'ParticipantsChange',
				type: 'REMOVE',
				userId: customBotID,
				role: 'ASSIGNED_AGENT'
				}]

			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
    			console.log("Transfering..." , resp)
		});





	


}


function checkIfConnected(agentName){

	if(agentsLogged.includes(agentName)){
		var a = agentJSON.agentStatusRecords.length;
		for (var m = 0; m < a; m++){
			if(agentJSON.agentStatusRecords[m].agentLoginName === agentName){
				if((agentJSON.agentStatusRecords[m].configuredMaxSlots - agentJSON.agentStatusRecords[m].busySlots)>=1){
					console.log(agentJSON.agentStatusRecords[m].configuredMaxSlots + " ***** " + agentJSON.agentStatusRecords[m].busySlots);
					m = a;
					return 1;
				}
				else{
					return 0;
				}
			}

		}
	}
	else{
		return 0;
	}

}


function sendAlertMessageFB(dialogID, fbName) {
	
	
		const metadata = [{
			type: 'BotResponse', // Bot context information about the last consumer message
			externalConversationId: dialogID,
			businessCases: [
				'RightNow_Categorization' // identified capability
			],
			intents: [ // Last consumer message identified intents
			{
				id: 'alert',
				name: "alertFB",
				confidenceScore: 1
			}]
		}];

		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
				{
				field: 'ParticipantsChange',
				type: 'ADD',
				userId: customBotID,
				role: 'MANAGER'
				}]
			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
		});


		echoAgent.publishEvent({
			'dialogId': dialogID,
			'event': {
				message: "Ciao " + fbName + " attendiamo la tua risposta se hai ancora bisogno del nostro supporto :)", // escalation message
				contentType: "text/plain",
				type: "ContentEvent"
				}

			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
		});

		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
							
				{
				field: 'ParticipantsChange',
				type: 'REMOVE',
				userId: customBotID,
				role: 'MANAGER'
				}]

			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
    			console.log("Transfering..." , resp)
		});
	
}


function wakeUpChat(dialogID, agentName) {

		var isSent = 0;
	
	
		const metadata = [{
			type: 'BotResponse', // Bot context information about the last consumer message
			externalConversationId: dialogID,
			businessCases: [
				'RightNow_Categorization' // identified capability
			],
			intents: [ // Last consumer message identified intents
			{
				id: 'yesno',
				name: "---",
				confidenceScore: 1
			},
			{
				id: 'comments',
				name: "---",
				confidenceScore: 1
			},
			{
				id: 'minutes',
				name: "risvegliata",
				confidenceScore: 1
			}]
		}];

		var transferToActualSkill = 0;
		var skillPreviousAgent = "***" + agentName;
		if(checkIfConnected(agentName)){
			for (var m = 0; m < (activeSkills.length); m++){
				if(activeSkills[m].name === skillPreviousAgent){
					transferToActualSkill = activeSkills[m].id;
					m = activeSkills.length;
				}

			}
		}
		else{
			transferToActualSkill = risvegliataskill;
		}

		console.log(transferToActualSkill);
		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
				{
				field: 'ParticipantsChange',
				type: 'ADD',
				userId: customBotID,
				role: 'ASSIGNED_AGENT'
				}]
			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
		});


		if((transferToActualSkill === risvegliataskill) && (!isSent)){

			echoAgent.publishEvent({
				'dialogId': dialogID,
				'event': {
					message: "ciao! la tua conversazione ricevera' presto risposta!", // escalation message
					contentType: "text/plain",
					type: "ContentEvent"
					}

				}, (e, resp) => {
   					if (e) { 
						console.error(e) 
    				}
			});
			isSent = 1;



		}
		

		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
				{
				field: "Skill",
				type: "UPDATE",
				skill: transferToActualSkill
				}]

			}, null, metadata, function(err) {
   				if (err) { 
					console.error(err) 
    			} else {
				console.log("transfered completed");
			}
		});



		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
							
				{
				field: 'ParticipantsChange',
				type: 'REMOVE',
				userId: customBotID,
				role: 'ASSIGNED_AGENT'
				}]

			}, (e, resp) => {
   				if (e) { 
					console.error(e) 
    			}
    			console.log("Transfering..." , resp)
		});






}






function proceedWithActions(){

	console.log("ACTIONS");

	for (var m = 0; m < (answer.length); m++){
		if(answer[m].info.latestSkillName === "facebook_bot"){
			var howManyMessagesFaceBook = answer[m].messageRecords.length;
			if(howManyMessagesFaceBook){
				if(answer[m].messageRecords[(howManyMessagesFaceBook - 1)].sentBy === "Consumer"){
					FaceBookWelcomeMessage(answer[m].info.conversationId, answer[m].info.startTimeL, answer[m].consumerParticipants[0].firstName);
				}
			}
		}
		else{


		var howManyMessages = answer[m].messageRecords.length;
			if(howManyMessages){
				var thisConversationHasResponse = 0;
				var thisConversationHasAlert = 0;
				var sendAlert = (Date.now() - (1000*60*10));            // timestamp "send Alert" conversation
				var whatTimeAlert = answer[m].messageRecords[(howManyMessages - 1)].timeL;
				for (var q = (howManyMessages - 1); q > 0; q--){
					if(answer[m].messageRecords[q].sentBy === "Agent" && answer[m].messageRecords[q].participantId !== "1089636032"){
						if(whatTimeAlert < sendAlert && !thisConversationHasAlert){
							sendAlertMessageFB(answer[m].info.conversationId, answer[m].consumerParticipants[0].firstName);
						}
						thisConversationHasResponse = 1;
						q = 0;
					}
					else if(answer[m].messageRecords[q].sentBy === "Consumer"){
						q = 0;
					}
					else if(answer[m].messageRecords[q].sentBy === "Agent" && answer[m].messageRecords[q].participantId === "1089636032"){
						thisConversationHasAlert = 1;
					}
					   
				}
				
				if(answer[m].hasOwnProperty('transfers')){
					if (typeof answer[m].transfers !== 'undefined' && answer[m].transfers.length > 0) {
						var arraylength = answer[m].transfers.length;
						if(answer[m].transfers[(arraylength -1)].hasOwnProperty('contextData')){
							if(answer[m].transfers[(arraylength -1)].contextData.hasOwnProperty('structuredMetadata')){
								var sendToLimbo = answer[m].transfers[(arraylength -1)].contextData.structuredMetadata[0].botResponse.intents[2].name;
							}
						}
						
					}
					
				}

					
				var moveToLimbo = (Date.now() - (1000*60*15));            // timestamp "move to Limbo" conversation
				// var closure = (Date.now() - (1000*60*60*24));            // timestamp closure conversation
				var closure = (Date.now() - (1000*30));            // timestamp closure conversation
				var whatTime = 0;
				for (var k = (howManyMessages - 1); k > 0; k--){
					if(answer[m].messageRecords[k].sentBy === "Agent" && answer[m].messageRecords[k].participantId !== "1089636032"){
						whatTime = answer[m].messageRecords[k].timeL;
					}
				}
				
					
				if((answer[m].messageRecords[(howManyMessages - 1)].sentBy === "Consumer") && (answer[m].info.latestSkillId === limboskill)){
					console.log("***wakingup");
					wakeUpChat(answer[m].info.conversationId, answer[m].info.latestAgentLoginName);
				}
				else{
					if (thisConversationHasResponse && sendToLimbo !== "noLimbo" && answer[m].info.latestSkillId !== limboskill && answer[m].messageRecords[(answer[m].messageRecords.length - 1)].participantId !== botID){
						if((whatTime < moveToLimbo) && (answer[m].info.latestSkillId !== limboskill)){
							console.log("***Limbo");
							limboChat(answer[m].info.conversationId, answer[m].info.latestAgentId);
						}
					}
				
		 			if (answer[m].messageRecords[(howManyMessages - 1)].sentBy === "Agent" && whatTime){
						if (whatTime < closure){
							console.log("***closing");
							var convToClose = answer[m].info.conversationId;
							var arraylength = answer[m].messageRecords.length;
							for (var z = 0; z < arraylength; z++){
								if(answer[m].messageRecords[z].sentBy === "Consumer"){
									var participantId = answer[m].messageRecords[z].participantId;
									z = arraylength;
								}
							}
							var timestampNPSsent = 0;
							var request = require('request');
							var oauth = "Bearer " + bearer;
							var body = {"consumer":participantId,"status":["CLOSE"]};
							var url = 'https://lo.msghist.liveperson.net/messaging_history/api/account/13099967/conversations/consumer/search?=Order:[desc]';
							request.post({
								url: url,
								json: true,
								body: body,
								headers: {
									'Content-Type': 'application/json',
									'Authorization': oauth
								}
							}, function (e, r, b) {
								var arraylength = b._metadata.count;
								for (var i = 0; i < arraylength; i++){
									if(b.conversationHistoryRecords[i].hasOwnProperty('transfers')){
										if (typeof b.conversationHistoryRecords[i].transfers !== 'undefined' && b.conversationHistoryRecords[i].transfers.length > 0) {
											var arraylength2 = b.conversationHistoryRecords[i].transfers.length;
											for (var z = (arraylength2 -1); z > -1; z--){
												if(b.conversationHistoryRecords[i].transfers[z].hasOwnProperty('contextData')){
													if(b.conversationHistoryRecords[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
														if(b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "NPSsent"){
															timestampNPSsent = b.conversationHistoryRecords[i].transfers[z].timeL;
															z = 0;
															i = arraylength;
															var wasNPSsent = 0;
															var NPSmaxTime = (Date.now() - (1000*60*10));
															if (timestampNPSsent > NPSmaxTime){
																wasNPSsent = 1;
															}
															console.log("timestampNPSsent = " + timestampNPSsent);
															console.log("NPSmaxTime = " + NPSmaxTime);
															closeChat(convToClose, wasNPSsent);
														}
													}
												}
											}
										}
									}
								}
							});
							
							
		 				}
		 			}
				}

		 	}
		}

	}



}




function tryUntilSuccess(integer, callback) {


	var now = Date.now();
	var before = (Date.now() - (1000*60*60*24*30));    // only the conversation of the last 30 days will be fetched
	var request = require('request');
	var oauth = "Bearer " + bearer;
	var body = {"start":{"from":before,"to":now}, "status": ["open"]};
	var url = 'https://lo.msghist.liveperson.net/messaging_history/api/account/13099967/conversations/search?offset=' + integer + '&limit=100';
		request.post({
    			url: url,
    			body: body,
    			json: true,
    			headers: {
        			'Content-Type': 'application/json',
				'Authorization': oauth
    			}
		}, function (e, r, b) {
			if(b.hasOwnProperty('conversationHistoryRecords')){
    				if((b.conversationHistoryRecords.length) == 100){
	 				answer = answer.concat(b.conversationHistoryRecords);
         				integer = integer + 100;
         				tryUntilSuccess(integer, callback);

    				}
    				else{
					integer = 0;
					answer = answer.concat(b.conversationHistoryRecords);
					proceedWithActions();
    				}
			}else{
				tryUntilSuccess(integer, callback);
			}

		});

}








var integer = 0;

setTimeout(function(){
	console.log("********* let's go! **********");
	bearer = echoAgent.transport.configuration.token;
	retrieveSkills();
	setInterval(function(){
		agentsLogged = [];
		retrieveAgentsLogged();
		setTimeout(function(){
			answer = [];
			console.log("fetching convs");
			tryUntilSuccess(integer, function(err, resp) {
    				// Your code here...
			});
						
		}, 2000);
	}, 10000);
}, 10000);






