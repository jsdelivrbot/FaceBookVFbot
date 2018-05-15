


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
var freezeskill = 1096182732;
var risvegliataskill = 1051213332;
var human_risvegliata_skill = 1096374432;
var facebook_risvegliata_skill = 1096374632;
var outbound_risvegliata_skill = 1096374732;
var outboundFBskill = 1093097632;
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
	var numeroMinAwake = req.query.numeroMinAwake;
	var agentID = req.query.agentID;


	yesno = req.query.yesno;
	comments = req.query.comments;
	minutes = req.query.minutes;
	var currentconvID = req.query.convID;
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
			
			if(b.hasOwnProperty('_metadata')){
			
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
			
			var request = require('request');
			var oauth = "Bearer " + bearer;
			var body = {"consumer":visitorID,"status":["OPEN"]};
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
											var vodafoneTag = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[3].name;
											var tripletta1 = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[4].name;
											var tripletta2 = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[5].name;
											var tripletta3 = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[6].name;
											z = 0;
											i = arraylength;
									
										}
									}
								}
							}
						}
					}
				}

				res.send([numero_telefono,numero_ricontatto,numero_cfiscale,vodafoneTag,tripletta1,tripletta2,tripletta3]);
			});
			}

		});
		
		
	
		


	}
	else if(retrieve === "2"){
		awakeLater(numeroMinAwake, agentID, currentconvID);
		res.send("done");
	}
	else if(retrieve === "3"){
		limboChat(currentconvID, agentID);
		res.send("done");
	}
	else if(retrieve === "0"){
		skill = convertSkill();
		markConvFB(currentconvID);
		res.send([skill]);
	}
	else if(retrieve === "web"){
		skill = convertSkill();
		markConv(currentconvID);
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


function awakeLater(numeroMinAwake, agentID, dialogID){
	
	console.log("agentID " + agentID);
	console.log("dialogID " + dialogID);
	console.log("skill " + limboskill);
	
		var agentToRemove = accountNumber + "." + agentID
		console.log(numeroMinAwake + " *** " + agentID + " *** " + dialogID);
		var awakeTimestamp = Date.now() + (numeroMinAwake*60*1000);
		console.log(awakeTimestamp);
		awakeTimestamp = awakeTimestamp.toString();
	
	

	
		const metadata = [{
			type: 'BotResponse', // Bot context information about the last consumer message
			externalConversationId: dialogID,
			businessCases: [
				'RightNow_Categorization' // identified capability
			],
			intents: [ // Last consumer message identified intents
			{
				id: 'awakeLater',
				name: awakeTimestamp,
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
					console.error(e);
					console.error("error_removing_agent_limbo");
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
					console.error(e);
					console.error("error_adding_bot_limbo");
    			}
		});


		
		echoAgent.updateConversationField({
			'conversationId': dialogID,
			'conversationField': [
				{
				field: "Skill",
				type: "UPDATE",
				skill: freezeskill
				}]

			}, null, metadata, function(err) {
   				if (err) { 
					console.error(err);
					console.error("error_changing_skill_limbo");
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
							console.error(e);
							console.error("error_changing_ETTR_limbo");
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
					console.error(e);
					console.error("error_removing_bot_limbo");
    			}
    			console.log("Transfering..." , resp)
		});



}


function markConv(currentconvID){
	
	console.log("***tagging");

	const metadata = [{
		type: 'BotResponse', // Bot context information about the last consumer message
		externalConversationId: currentconvID,
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
		conversationId: currentconvID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "ADD",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
				console.error("error_adding_bot_markconv");
			} else {
				// console.log("joining completed");
			}
	});





	echoAgent.updateConversationField({
		conversationId: currentconvID,
		conversationField: [{
			field: "Skill",
			type: "UPDATE",
			skill: skill
		}]
		}, null, metadata, function(err) {
			if(err) {
				console.log(err);
				console.error("error_changing_skill_markconv");
			} else {
				console.log("transfered completed");
			}
	});




	echoAgent.updateConversationField({
		conversationId: currentconvID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "REMOVE",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
				console.error("error_removing_bot_markconv");
			} else {
				// console.log("leave completed");
			}
	});




}




function markConvFB(currentconvID){
	
	console.log("***taggingFB");

	const metadata = [{
		type: 'BotResponse', // Bot context information about the last consumer message
		externalConversationId: currentconvID,
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
		conversationId: currentconvID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "ADD",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
				console.error("error_adding_bot_markconvFB");
			} else {
				// console.log("joining completed");
			}
	});





	echoAgent.updateConversationField({
		conversationId: currentconvID,
		conversationField: [{
			field: "Skill",
			type: "UPDATE",
			skill: skill
		}]
		}, null, metadata, function(err) {
			if(err) {
				console.log(err);
				console.error("error_changing_skill_markconvFB");
			} else {
				console.log("transfered completed");
			}
	});




	echoAgent.updateConversationField({
		conversationId: currentconvID,
		conversationField: [{
			field: "ParticipantsChange",
			type: "REMOVE",
			role: "READER"
		}]
		}, function(err) {
			if(err) {
				console.log(err);
				console.error("error_removing_bot_markconvFB");
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


function checkNPSwasSent(m, isFacebook){
	var convToClose = answer[m].info.conversationId;
	var wasNPSsent = 0;
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
			console.log("isFacebook = " + isFacebook);
			if(isFacebook < 1){
			wasNPSsent = 1;
			console.log("marked point 1");
		}
		if (arraylength === 0){
			console.log("nessuna conv");
			console.log("sto chiudendo. wasNPSsent = " + wasNPSsent);
			closeChat(convToClose, wasNPSsent);
		}
								
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
									var NPSmaxTime = (Date.now() - (1000*60*10));
									if (timestampNPSsent > NPSmaxTime){
										wasNPSsent = 1;
										console.log("marked point 2");
									}
															
								}
														
			
							}
						}
					}
				}
			}
		}
		closeChat(convToClose, wasNPSsent);
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
			console.log("inside closing");
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
					if(!(pushedTags.includes("Messaggio Diretto")) && !(pushedTags.includes("Contatto Outbound OK"))){
						cond3 = 1;
					}
				}
				if(pushedTags.includes("Senza Risposta")){
					cond4 = 1;
				}
			}
		
			console.log(pushedTags);
			console.log(cond1 + " " + cond2 + " " + cond3 + " " + cond4 + " " + wasNPSsent);
			 
			
			if(cond1 || cond2 || cond3 || cond4 || wasNPSsent){
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
							console.error(e);
							console.error("error_adding_bot_NPS");
    						} else {
							console.log("agent in");
							echoAgent.publishEvent({
								'dialogId': dialogID,
								'event': {
									message: "Grazie per aver contattato il servizio clienti Vodafone. Ti mando un link dove puoi esprimere il tuo parere su quanto hai gradito il supporto fornito. https://assets.kampyle.com/clients/vodafone/direct/form.html?region=prodEuIrland&websiteId=67241&formId=4313", // escalation message
									contentType: "text/plain",
									type: "ContentEvent"
									}

								}, (e, resp) => {
   								if (e) { 
									console.error(e);
									console.error("error_sending_msg_NPS");
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
											console.error(err);
											console.error("error_changing_skill_NPS");
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
												console.error(e);
												console.error("error_removing_bot_NPS");
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
	var offhour = 0;
	if (dateOfWeek == 0 || ((hourOfWeek < 7) || (hourOfWeek > 18))){
		offhour = 1;
		var messageFBout1 = "Ciao " + fbName + " grazie per averci scritto. Rispondiamo ai Messaggi Privati tutti i giorni dalle 08.00 alle 21.00. Prendiamo in carico la tua segnalazione e ti risponderemo negli orari di apertura. Servizio Clienti Vodafone.";
		var messageFBout2 = "Ti ricordiamo che per poter rispondere alle tue esigenze e' sempre necessario il numero di cellulare e di rete fissa per il quale richiedi assistenza e una descrizione dettagliata della richiesta.";
	}
	else{
		var messageFB1 = "Ciao " +  fbName + "! Benvenuto nel Servizio Clienti Vodafone su Facebook, un nostro consulente gestirà a breve la tua richiesta di assistenza.";
		var messageFB2 = "Ti ricordiamo che per poter rispondere alle tue esigenze e' sempre necessario il numero di cellulare e di rete fissa per il quale richiedi assistenza e una descrizione dettagliata della richiesta.";
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
				console.error(e);
				console.error("error_adding_bot_welcomeFB");
    		}
	});
	
	/********************************** remove me before to go in  production *****************************
	
	if (offhour === 1){
		echoAgent.publishEvent({
			'dialogId': dialogID,
			'event': {
				message: messageFBout1, // escalation message
				contentType: "text/plain",
				type: "ContentEvent"
				}

			}, (e, resp) => {
   				if (e) { 
					console.error(e);
					console.error("error_sending_msg_welcomeFB1");
    				} else{
					echoAgent.publishEvent({
						'dialogId': dialogID,
						'event': {
							message: messageFBout2, // escalation message
							contentType: "text/plain",
							type: "ContentEvent"
							}

						}, (e, resp) => {
   							if (e) { 
								console.error(e);
								console.error("error_sending_msg_welcomeFB2");
    						}
					});
				}
		});
	} else{
		echoAgent.publishEvent({
			'dialogId': dialogID,
			'event': {
				message: messageFB1, // escalation message
				contentType: "text/plain",
				type: "ContentEvent"
				}

			}, (e, resp) => {
   				if (e) { 
					console.error(e);
					console.error("error_sending_msg_welcomeFB3");
    				} else{
					echoAgent.publishEvent({
						'dialogId': dialogID,
						'event': {
							message: messageFB2, // escalation message
							contentType: "text/plain",
							type: "ContentEvent"
							}

						}, (e, resp) => {
   							if (e) { 
								console.error(e);
								console.error("error_sending_msg_welcomeFB4");
    						}
					});
				}
		});
	}
	
	********************************** remove me before to go in  production *****************************/
	
	setTimeout(function(){
		
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
					console.error(err);
					console.error("error_changing_skill_welcomeFB");
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
					console.error(e);
					console.error("error_removing_bot_welcomeFB");
    			}
    			console.log("Transfering..." , resp)
		});

		
	}, 3000);

	

	
	
	
	 
	
	
}



function limboChat(dialogID, agentID) {
	
	console.log("agentID " + agentID);
	console.log("dialogID " + dialogID);

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
					console.error(e);
					console.error("error_removing_agent_limbo");
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
					console.error(e);
					console.error("error_adding_bot_limbo");
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
					console.error(err);
					console.error("error_changing_skill_limbo");
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
							console.error(e);
							console.error("error_changing_ETTR_limbo");
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
					console.error(e);
					console.error("error_removing_bot_limbo");
    			}
    			console.log("Transfering..." , resp)
		});





	


}


function checkIfConnected(agentName){
	var weHaveAnAgent = 0;
	if(agentsLogged.includes(agentName)){
		var a = agentJSON.agentStatusRecords.length;
		for (var m = 0; m < a; m++){
			if(agentJSON.agentStatusRecords[m].agentLoginName === agentName){
				m = a;
				weHaveAnAgent = 1;

			}

		}
	}
	return weHaveAnAgent;

}


function sendAlertMessageFB(dialogID, fbName) {
	
	/********************************** remove me before to go in  production *****************************
	
	
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
					console.error(e);
					console.error("error_adding_bot_alertFB");
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
					console.error(e);
					console.error("error_sending_msg_alertFB");
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
					console.error(e);
					console.error("error_removing_bot_alertFB");
    			}
    			console.log("Transfering..." , resp)
		});
		
	********************************** remove me before to go in  production *****************************/
	
}




function wakeUpChat(dialogID, agentName, channel) {

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
			if (channel === "web"){
				transferToActualSkill = human_risvegliata_skill;
			}
			if (channel === "facebook"){
				transferToActualSkill = facebook_risvegliata_skill;
			}
			if (channel === "outbound"){
				transferToActualSkill = outbound_risvegliata_skill;
			}
			
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
					console.error(e);
					console.error("error_adding_bot_wakeUp");
    			}
		});


		if((transferToActualSkill === risvegliataskill) && (!isSent) && (channel !== "web")){

			echoAgent.publishEvent({
				'dialogId': dialogID,
				'event': {
					message: "ciao! la tua conversazione ricevera' presto risposta!", // escalation message
					contentType: "text/plain",
					type: "ContentEvent"
					}

				}, (e, resp) => {
   					if (e) { 
						console.error(e);
						console.error("error_sending_msg_wakeUp");
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
					console.error(err);
					console.error("error_changing_skill_wakeUp");
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
					console.error(e);
					console.error("error_removing_bot_wakeUp");
    			}
    			console.log("Transfering..." , resp)
		});






}






function proceedWithActions(){

	console.log("ACTIONS");

	for (var m = 0; m < (answer.length); m++){

		var isFacebook = 0;
		var lastTimeAwakened = 0;
		var channel = "web";
		var isToBeAwakened = 0;
		var isToBeAwakenedTimestamp = 0;
		if(answer[m].hasOwnProperty('transfers')){
			if (typeof answer[m].transfers !== 'undefined' && answer[m].transfers.length > 0) {
				if(answer[m].transfers[0].sourceSkillName === "facebook_bot"){
					isFacebook = 1;
					channel = "facebook";
				}
			}
		}
		if(answer[m].hasOwnProperty('transfers')){
			if (typeof answer[m].transfers !== 'undefined' && answer[m].transfers.length > 0) {
				for (var y = 0; y < (answer[m].transfers.length); y++){
					if(answer[m].transfers[y].targetSkillName === "Outbound"){
						channel = "outbound";
					}
				}
			}
		}
						
						
					
					

		
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
				var sendAlert = (Date.now() - (1000*60*60*23));            // timestamp "send Alert" conversation
				var whatTimeAlert = answer[m].messageRecords[(howManyMessages - 1)].timeL;
				for (var q = (howManyMessages - 1); q > 0; q--){
					if(answer[m].messageRecords[q].sentBy === "Agent" && answer[m].messageRecords[q].participantId !== "1089636032"){
						if((whatTimeAlert < sendAlert) && !thisConversationHasAlert && (isFacebook === 1)){
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
						for (var w = (arraylength - 1); w > 0; w--){
							if(answer[m].transfers[w].hasOwnProperty('contextData')){
								if(answer[m].transfers[w].contextData.hasOwnProperty('structuredMetadata')){
									if(answer[m].transfers[w].contextData.structuredMetadata[0].botResponse.intents.length > 2){
										if(answer[m].transfers[w].contextData.structuredMetadata[0].botResponse.intents[2].name === "risvegliata"){
											lastTimeAwakened = answer[m].transfers[w].timeL;
											w = 0;
										}
									}
								}
							}
						}
						if(answer[m].transfers[(arraylength -2)].hasOwnProperty('contextData')){
							if(answer[m].transfers[(arraylength -2)].contextData.hasOwnProperty('structuredMetadata')){
								if(answer[m].transfers[(arraylength -2)].contextData.structuredMetadata[0].botResponse.intents.length == 1){
									isToBeAwakened = answer[m].transfers[(arraylength -2)].contextData.structuredMetadata[0].botResponse.intents[0].id;
									isToBeAwakenedTimestamp = parseInt(answer[m].transfers[(arraylength -2)].contextData.structuredMetadata[0].botResponse.intents[0].name);
								}
								
							}
						}
						
					}
					
				}

					
				var moveToLimbo = (Date.now() - (1000*60*1));            // timestamp "move to Limbo" conversation
				var closure = (Date.now() - (1000*60*60*6));            // timestamp closure conversation
				// var closure = (Date.now() - (1000*60*3));            // timestamp closure conversation
				var whatTime = 0;
				for (var k = (howManyMessages - 1); k > 0; k--){
					if(answer[m].messageRecords[k].sentBy === "Agent" && answer[m].messageRecords[k].participantId !== "1089636032"){
						whatTime = answer[m].messageRecords[k].timeL;
					}
				}
				var postuma = 0;
				if(lastTimeAwakened !== 0){
					if (whatTimeAlert < lastTimeAwakened){
						postuma = 1;
					}
				}
				
				if(isToBeAwakened === "awakeLater"){
					console.log("thisIsToBeAwakened in " + (isToBeAwakenedTimestamp - Date.now()));
					console.log(answer[m].info.conversationId);
					if(isToBeAwakenedTimestamp < (Date.now())){
						console.log("***unfreezing");
						wakeUpChat(answer[m].info.conversationId, answer[m].info.latestAgentLoginName, channel);
					}
				}
				
				if(answer[m].messageRecords[(answer[m].messageRecords.length - 1)].sentBy === "Consumer") {
					if ((answer[m].info.latestSkillId === limboskill) || (answer[m].info.latestSkillId === freezeskill)){
						console.log("***wakingup");
						wakeUpChat(answer[m].info.conversationId, answer[m].info.latestAgentLoginName, channel);
					} else if (answer[m].info.latestSkillName.indexOf("***") > -1){
						console.log("inside *** skill");
						var bringMeBackAtGeneral = (Date.now() - (1000*60*3));  // timestamp "move to the general risveglio" conversation
						if(whatTime < bringMeBackAtGeneral){
							console.log("inside again **** skills");
							console.log("howManyMessages " + answer[m].messageRecords.length);
							for (var r = (answer[m].messageRecords.length - 1); r > 0; r--){
								console.log("howManyMessages " + answer[m].messageRecords.length);
								if(answer[m].messageRecords[r].sentBy === "Agent" && answer[m].messageRecords[r].participantId !== botID){
									console.log("inside ***** skills");
									if(answer[m].hasOwnProperty('transfers')){
										if (typeof answer[m].transfers !== 'undefined' && answer[m].transfers.length > 0) {
											var myarraylength = answer[m].transfers.length;
											console.log("inside last step skills");
											console.log("timestamp transfer: " + answer[m].transfers[(myarraylength -1)].timeL);
											console.log (">>>>>>>>>>>");
											console.log("timestamp risposta: " + answer[m].messageRecords[r].timeL);
											console.log("bot or not???");
											console.log(answer[m].transfers[(myarraylength -1)].sourceAgentId + " ==???? " + botID);
											if((answer[m].transfers[(myarraylength -1)].timeL > answer[m].messageRecords[r].timeL) && answer[m].transfers[(myarraylength -1)].sourceAgentId === botID){
												console.log("test riuscito!!!!!!!!!!");
												wakeUpChat(answer[m].info.conversationId, "56yghju765rfvbhu7656yg", channel);
											}
										}	
									}
									r = 0;			
								}
							}
						}
					}

				}
				else{
					if (!postuma && thisConversationHasResponse && answer[m].info.latestSkillId !== limboskill && answer[m].info.latestSkillId !== outboundFBskill && answer[m].info.latestSkillId !== freezeskill && answer[m].messageRecords[(answer[m].messageRecords.length - 1)].participantId !== botID){
						if((whatTime < moveToLimbo) && (answer[m].info.latestSkillId !== limboskill)){
							console.log("***Limbo");
							limboChat(answer[m].info.conversationId, answer[m].info.latestAgentId);
						}
					}
				
		 			if (thisConversationHasResponse && whatTime && (isToBeAwakened !== "awakeLater")){
						if (whatTime < closure){
							console.log("***closing");
							console.log("isFacebook = " + isFacebook);
							// checkNPSwasSent(m, isFacebook);
							checkNPSwasSent(m, 0); // remove before production!!!!!
							
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






