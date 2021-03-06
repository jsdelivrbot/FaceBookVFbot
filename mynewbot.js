var events = require('events');
var emitter = new events.EventEmitter();


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
var totalAgentsLogged = [];
var activeSkills = [];
var FaceBookSkill = 1089726032;
var limboskill = 1051213232;
var freezeskill = 1096182732;
var risvegliataskill = 1051213332;
var human_skill = 987637232;
var human_risvegliata_skill = 1096374432;
var human_night_skill = 1105369932;
var human_night_risvegliata_skill = 1105551632;
var facebook_night_risvegliata_skill = 1102673332;
var facebook_night_skill = 1102673132;
var facebook_risvegliata_skill = 1096374632;
var outbound_risvegliata_skill = 1096374732;
var outboundFBskill = 1093097632;
var outbound_fixed_skill = 1105849832;
var outbound_fixed_risvegliata_skill = 1105849932;
var fixed_risvegliata_skill = 1117781332;
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
var noteTecniche;
var visitorID;
var conversationsToDownload = 0;
var conversationsPartial = 0
var myCheckConversationsPartial = 0;






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
			
			if(b){
				if(b.hasOwnProperty('_metadata')){
					var arraylength = 0;
					if(b._metadata.hasOwnProperty('count')){
						arraylength = b._metadata.count;
					} else{
						console.log("empty!!!!!");
					}
					var myGreenLight = false;
					var numero_telefono = "---";
					var numero_ricontatto = "---";
					var numero_cfiscale = "---";
					
					for (var i = 0; i < arraylength; i++){
						if(b.hasOwnProperty('conversationHistoryRecords')){
							if(b.conversationHistoryRecords.length > 0){
								if(b.conversationHistoryRecords[i].hasOwnProperty('transfers')){
									if (typeof b.conversationHistoryRecords[i].transfers !== 'undefined' && b.conversationHistoryRecords[i].transfers.length > 0) {
										var arraylength2 = b.conversationHistoryRecords[i].transfers.length;
										for (var z = (arraylength2 -1); z > -1; z--){
											if(b.conversationHistoryRecords[i].transfers[z].hasOwnProperty('contextData')){
												if(b.conversationHistoryRecords[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
													if(b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														numero_telefono = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].name;
														numero_ricontatto = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[1].name;
														numero_cfiscale = b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[2].name;
														z = 0;
														myGreenLight = true;
													}
												}
											}
										}
									}
								}
								if(b.conversationHistoryRecords[i].hasOwnProperty('agentParticipants')){
									if (typeof b.conversationHistoryRecords[i].agentParticipants !== 'undefined' && b.conversationHistoryRecords[i].agentParticipants.length > 0) {
										var arraylength3 = b.conversationHistoryRecords[i].agentParticipants.length;
										for (var z = (arraylength3 -1); z > -1; z--){
											if(b.conversationHistoryRecords[i].agentParticipants[z].hasOwnProperty('contextData')){
												if(b.conversationHistoryRecords[i].agentParticipants[z].contextData.hasOwnProperty('structuredMetadata')){
													if(b.conversationHistoryRecords[i].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														numero_telefono = b.conversationHistoryRecords[i].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[0].name;
														numero_ricontatto = b.conversationHistoryRecords[i].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[1].name;
														numero_cfiscale = b.conversationHistoryRecords[i].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[2].name;
														z = 0;
														myGreenLight = true;
													}
												}
											}
										}
									}
								}
							}
						}
						if(myGreenLight){
							i = arraylength;
						}
					}
					console.log(currentconvID);

					var request = require('request');
					var oauth = "Bearer " + bearer;
					var body = {"conversationId" : currentconvID};
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
						if(e){
							res.send("errore");
						} else{
							var arraylength = 0;
							if(b.hasOwnProperty('_metadata')){
								if(b._metadata.hasOwnProperty('count')){
									arraylength = b._metadata.count;
								} else{
									console.log("empty!!!!!");
								}
							}
							// console.log("b length: " + arraylength);
							if( arraylength > 0 ){
								var vodafoneTag = "";
								var tripletta1 = "";
								var tripletta2 = "";
								var tripletta3 = "";
								var noteTecniche = "";
								var options = { year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric' };
								if(b.conversationHistoryRecords[0].hasOwnProperty('transfers')){
									if (typeof b.conversationHistoryRecords[0].transfers !== 'undefined' && b.conversationHistoryRecords[0].transfers.length > 0) {
										var arraylength2 = b.conversationHistoryRecords[0].transfers.length;
										for (var z = (arraylength2 -1); z > -1; z--){
											if(b.conversationHistoryRecords[0].transfers[z].hasOwnProperty('contextData')){
												if(b.conversationHistoryRecords[0].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
													if(b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														vodafoneTag = b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[3].name;
														tripletta1 = b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[4].name;
														tripletta2 = b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[5].name;
														tripletta3 = b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[6].name;
														z = 0;

													}
												}
											}
										}

										for (var f = 0; f < arraylength2; f++){
											if(b.conversationHistoryRecords[0].transfers[f].hasOwnProperty('contextData')){
												if(b.conversationHistoryRecords[0].transfers[f].contextData.hasOwnProperty('structuredMetadata')){
													var timestampMyLog = new Date(b.conversationHistoryRecords[0].transfers[f].timeL + (3600000*2)).toLocaleString('it-IT', options);
													if(b.conversationHistoryRecords[0].transfers[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														noteTecniche = noteTecniche + timestampMyLog + " --> tag\n";
													}
													if(b.conversationHistoryRecords[0].transfers[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "NPSsent"){
														noteTecniche = noteTecniche + timestampMyLog + " --> NPS\n";
													}

													if(b.conversationHistoryRecords[0].transfers[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "awakeLater"){
														var timestampFreeze = new Date(parseInt(b.conversationHistoryRecords[0].transfers[f].contextData.structuredMetadata[0].botResponse.intents[0].name) + (3600000*2)).toLocaleString('it-IT', options);
														noteTecniche = noteTecniche + timestampMyLog + " --> freeze (" + timestampFreeze + ")\n";
													}

													if(b.conversationHistoryRecords[0].transfers[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "yesno"){
														if(b.conversationHistoryRecords[0].transfers[f].contextData.structuredMetadata[0].botResponse.intents[2].name === "limbo"){
															noteTecniche = noteTecniche + timestampMyLog + " --> limbo\n";
														}
														if(b.conversationHistoryRecords[0].transfers[f].contextData.structuredMetadata[0].botResponse.intents[2].name === "risvegliata"){
															noteTecniche = noteTecniche + timestampMyLog + " --> risvegliata\n";
														}
													}
												}
											}
										}
									}
								}
								
								
								if(b.conversationHistoryRecords[0].hasOwnProperty('agentParticipants')){
									if (typeof b.conversationHistoryRecords[0].agentParticipants !== 'undefined' && b.conversationHistoryRecords[0].agentParticipants.length > 0) {
										var arraylength3 = b.conversationHistoryRecords[0].agentParticipants.length;
										for (var z = (arraylength3 -1); z > -1; z--){
											if(b.conversationHistoryRecords[0].agentParticipants[z].hasOwnProperty('contextData')){
												if(b.conversationHistoryRecords[0].agentParticipants[z].contextData.hasOwnProperty('structuredMetadata')){
													if(b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														vodafoneTag = b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[3].name;
														tripletta1 = b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[4].name;
														tripletta2 = b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[5].name;
														tripletta3 = b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[6].name;
														z = 0;

													}
												}
											}
										}

										for (var f = 0; f < arraylength3; f++){
											if(b.conversationHistoryRecords[0].agentParticipants[f].hasOwnProperty('contextData')){
												if(b.conversationHistoryRecords[0].agentParticipants[f].contextData.hasOwnProperty('structuredMetadata')){
													var timestampMyLog = new Date(b.conversationHistoryRecords[0].agentParticipants[f].timeL + (3600000*2)).toLocaleString('it-IT', options);
													if(b.conversationHistoryRecords[0].agentParticipants[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
														noteTecniche = noteTecniche + timestampMyLog + " --> tag\n";
													}
													if(b.conversationHistoryRecords[0].agentParticipants[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "NPSsent"){
														noteTecniche = noteTecniche + timestampMyLog + " --> NPS\n";
													}

													if(b.conversationHistoryRecords[0].agentParticipants[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "awakeLater"){
														var timestampFreeze = new Date(parseInt(b.conversationHistoryRecords[0].agentParticipants[f].contextData.structuredMetadata[0].botResponse.intents[0].name) + (3600000*2)).toLocaleString('it-IT', options);
														noteTecniche = noteTecniche + timestampMyLog + " --> freeze (" + timestampFreeze + ")\n";
													}

													if(b.conversationHistoryRecords[0].agentParticipants[f].contextData.structuredMetadata[0].botResponse.intents[0].id === "yesno"){
														if(b.conversationHistoryRecords[0].agentParticipants[f].contextData.structuredMetadata[0].botResponse.intents[2].name === "limbo"){
															noteTecniche = noteTecniche + timestampMyLog + " --> limbo\n";
														}
														if(b.conversationHistoryRecords[0].agentParticipants[f].contextData.structuredMetadata[0].botResponse.intents[2].name === "risvegliata"){
															noteTecniche = noteTecniche + timestampMyLog + " --> risvegliata\n";
														}
													}
												}
											}
										}
									}
								}
								
							}


							res.send([numero_telefono,numero_ricontatto,numero_cfiscale,vodafoneTag,tripletta1,tripletta2,tripletta3,noteTecniche]);
						}
					});
				}
			}else{
				res.send(["errore","errore","errore","","","","",""]);
			}

		});
		
		
	
		


	}
	else if(retrieve === "2"){
		awakeLater(numeroMinAwake, agentID, currentconvID);
		res.send("done");
		// var myAnswer = emitter.on('freeze', function (data) {
			// res.send(data);
			// console.log(data);
		// });
	}
	else if(retrieve === "3"){
		limboChat(currentconvID, agentID);
		// var myAnswer = emitter.on('limbo', function (data) {
			// res.send(data);
			// console.log(data);
		// });
		res.send("done");
	}
	else if(retrieve === "0"){
		skill = convertSkill();
		markConvFB(currentconvID);
		var myAnswer = emitter.on(currentconvID, function (data) {
			res.send(data);
			console.log(data);
			emitter.removeAllListeners(currentconvID);
		});
		// res.send(myAnswer);
		// markConvFB(currentconvID);
		// res.send([skill]);
	}
	else if(retrieve === "web"){
		skill = convertSkill();
		markConv(currentconvID);
		// var myAnswer = emitter.on('taggingWeb', function (data) {
			// res.send(data);
			// console.log(data);
		// });
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
		}, null, metadata, function(err) {
			if(err) {
				console.log(err);
				console.error("error_adding_bot_markconvFB");
				emitter.emit(currentconvID, 'errore');
			} else {
				console.log("transfered completed");
				emitter.emit(currentconvID, 'inviato');
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
			console.log(agentsLogged);
			agentJSON = b;
			
		}

	});
	
	var request = require('request');
	var oauth = "Bearer " + bearer;
	var body = {"status":["ONLINE","AWAY","BACK_SOON"]};
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
				totalAgentsLogged = totalAgentsLogged.concat(b.agentStatusRecords[m].agentLoginName);
			}
			console.log(totalAgentsLogged);

		}

	});


}


function checkNPSwasSent(json, isFacebook, channel){
	
	
	var convToClose = json.info.conversationId;
	var wasNPSsent = 0;
	var myAgentGroup = "";
	var channelType = "";
	var arraylength = json.messageRecords.length;
	for (var z = 0; z < arraylength; z++){
		if(json.messageRecords[z].sentBy === "Consumer"){
			var participantId = json.messageRecords[z].participantId;
			z = arraylength;
		}
	}
	var arraylength2 = json.agentParticipants.length;
	if (arraylength2){
		for (var u = (arraylength2 - 1); u >= 0; u--){
			if(json.agentParticipants[u].userTypeName === "Human"){
				myAgentGroup = json.agentParticipants[u].agentGroupName;
				u = 0;
			}
		}
	}
	if (channel === "facebook"){
		channelType = "PM";
	}
	if (channel === "facebook_night"){
		channelType = "PM";
	}
	if (channel === "outbound"){
		channelType = "OUT";
	}
	var myCustomMSG = "Ti ringrazio di avere utilizzato il nostro servizio Facebook, ti rimetto in contatto con TOBi, se avrai bisogno di altre informazioni puoi chiedergliele direttamente! Ti ricordo che cliccando sul link seguente puoi esprimere il tuo parere su quanto hai gradito il supporto che ti ho fornito. Per me è molto importante ricevere la tua risposta e che la tua soddisfazione sia massima! Ci conto :-) https://assets.kampyle.com/clients/vodafone/direct/form.html?region=prodEuIrland&websiteId=67241&formId=4313&caseID=" + convToClose + "&channel=facebook&group=" + myAgentGroup + "&type=" +  channelType;
	console.log(myCustomMSG);
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
			
			var arraylength3 = 0;
			if(b.hasOwnProperty('_metadata')){
				if(b._metadata.hasOwnProperty('count')){
					arraylength3 = b._metadata.count;
				}
			}

			console.log("isFacebook = " + isFacebook);
			if(isFacebook < 1){
			wasNPSsent = 1;
			console.log("marked point 1");
		}
		if (arraylength3 === 0){
			console.log("nessuna conv");
			console.log("sto chiudendo. wasNPSsent = " + wasNPSsent);
			closeChat(convToClose, wasNPSsent, myCustomMSG);
		} else{
			arraylength3 = b.conversationHistoryRecords.length;				
			for (var i = 0; i < arraylength3; i++){
				if(b.hasOwnProperty('conversationHistoryRecords')){
					if(b.conversationHistoryRecords.length > 0){
						if(b.conversationHistoryRecords[i].hasOwnProperty('transfers')){
				
							if (typeof b.conversationHistoryRecords[i].transfers !== 'undefined') {
								var arraylength2 = b.conversationHistoryRecords[i].transfers.length;
								for (var z = (arraylength2 -1); z > -1; z--){
									if(b.conversationHistoryRecords[i].transfers[z].hasOwnProperty('contextData')){
										if(b.conversationHistoryRecords[i].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
											if(b.conversationHistoryRecords[i].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "NPSsent"){
												timestampNPSsent = b.conversationHistoryRecords[i].transfers[z].timeL;
												z = 0;
												i = arraylength3;
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
				}
				
			}
			closeChat(convToClose, wasNPSsent, myCustomMSG);
		}
	});
}



function closeChat(dialogID, wasNPSsent, myCustomMSG){
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
			var arraylength = 0;
			if(b.hasOwnProperty('_metadata')){
				if(b._metadata.hasOwnProperty('count')){
					arraylength = b._metadata.count;
				} else{
					console.log("empty!!!!!");
				}
			}
			// console.log("b length: " + arraylength);
			if( arraylength > 0 ){	
				console.log("inside closing");
				console.log("dialogID " + dialogID);

				if(b.hasOwnProperty('conversationHistoryRecords')){
					if(b.conversationHistoryRecords.length > 0){
						if(b.conversationHistoryRecords[0].hasOwnProperty('transfers')){
							if(typeof b.conversationHistoryRecords[0].transfers !== 'undefined') {
								var arraylength2 = b.conversationHistoryRecords[0].transfers.length;
								for (var z = (arraylength2 -1); z > -1; z--){
									if(b.conversationHistoryRecords[0].transfers[z].hasOwnProperty('contextData')){
										if(b.conversationHistoryRecords[0].transfers[z].contextData.hasOwnProperty('structuredMetadata')){
											if(b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
												pushedTags = JSON.stringify(b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[3].name);
												triplettauno = b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[4].name;
												triplettadue = b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[5].name;
												triplettatre = b.conversationHistoryRecords[0].transfers[z].contextData.structuredMetadata[0].botResponse.intents[6].name;
												z = 0;
									
											}
										}
									}
								}
							}
						}
						if(b.conversationHistoryRecords[0].hasOwnProperty('agentParticipants')){
							if(typeof b.conversationHistoryRecords[0].agentParticipants !== 'undefined') {
								var arraylength2 = b.conversationHistoryRecords[0].agentParticipants.length;
								for (var z = (arraylength2 -1); z > -1; z--){
									if(b.conversationHistoryRecords[0].agentParticipants[z].hasOwnProperty('contextData')){
										if(b.conversationHistoryRecords[0].agentParticipants[z].contextData.hasOwnProperty('structuredMetadata')){
											if(b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[0].id === "telefono"){
												pushedTags = JSON.stringify(b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[3].name);
												triplettauno = b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[4].name;
												triplettadue = b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[5].name;
												triplettatre = b.conversationHistoryRecords[0].agentParticipants[z].contextData.structuredMetadata[0].botResponse.intents[6].name;
												z = 0;
									
											}
										}
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
				if((pushedTags.includes("Dispatch")) || (pushedTags.includes("Escalation"))){
					cond1 = 1;
				}
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
			console.log(dialogID);
			
			if(cond1 || cond2 || cond3 || cond4 || wasNPSsent){
				
				myCustomMSG = "Ti ringrazio di avere utilizzato il nostro servizio Facebook, Ti rimetto in contatto con TOBi, se avrai bisogno di altre informazioni puoi chiedergliele direttamente!";
				console.log("sending simple closure message");
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
							console.error("error_adding_bot_NPS: " + dialogID);
    						} else {
							console.log("agent in");
						}
				});
				
				echoAgent.publishEvent({
						'dialogId': dialogID,
						'event': {
							message: myCustomMSG, // escalation message
							contentType: "text/plain",
							type: "ContentEvent"
							}

						}, (e, resp) => {
   						if (e) { 
							console.error(e);
							console.error("error_sending_closure_message: " + dialogID);
    						} else {
							console.log("message sent");
							var myTimestamp = Date.now();
							echoAgent.updateConversationField({
								'conversationId': dialogID,
								'conversationField': [
									{
										field: "Skill",
										type: "UPDATE",
										skill: limboskill
									}]
								}, (e, resp) => {
								if (e) {
									console.error(e);
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
									role: 'MANAGER'
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
				
			
			} else{
				console.log("sending NPS");
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
							console.error("error_adding_bot_NPS: " + dialogID);
    						} else {
							console.log("agent in");
						}
				});
				
				echoAgent.publishEvent({
						'dialogId': dialogID,
						'event': {
							message: myCustomMSG, // escalation message
							contentType: "text/plain",
							type: "ContentEvent"
							}

						}, (e, resp) => {
   						if (e) { 
							console.error(e);
							console.error("error_sending_msg_NPS: " + dialogID);
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
									role: 'MANAGER'
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







function wakeUpChat(dialogID, agentName, channel, comeFromLimbo) {

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
		var thisSkillExists = 0;
		for (var mz = 0; mz < (activeSkills.length); mz++){
			if(activeSkills[mz].name === skillPreviousAgent){
				thisSkillExists = 1;
				transferToActualSkill = activeSkills[mz].id;
				mz = activeSkills.length;
			}
		}
		if(checkIfConnected(agentName) && (thisSkillExists === 1)){
			// do nothing
		}
		else{
			if (channel === "web"){
				transferToActualSkill = human_risvegliata_skill;
			}
			if (channel === "web_night"){
				transferToActualSkill = human_night_risvegliata_skill;
			}
			if (channel === "facebook"){
				transferToActualSkill = facebook_risvegliata_skill;
			}
			if (channel === "facebook_night"){
				transferToActualSkill = facebook_night_risvegliata_skill;
			}
			if (channel === "fixed"){
				transferToActualSkill = fixed_risvegliata_skill;
			}
			if (channel === "outbound"){
				if (comeFromLimbo){
					transferToActualSkill = outboundFBskill;
				} else{
					transferToActualSkill = outbound_risvegliata_skill;
				}	
			}
			if (channel === "outbound_fixed"){
				if (comeFromLimbo){
					transferToActualSkill = outbound_fixed_skill;
				} else{
					transferToActualSkill = outbound_fixed_risvegliata_skill;
				}
			}
		}
			
		console.log("Awake to skill: " + transferToActualSkill + " ****  Channel: " + channel);
		console.log ("dialogID: " + dialogID);
		console.log("!!!!!!!!!!!!!!");
		console.log("!!!!!!!!!!!!!!");
		
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
    				} else{
					isSent = 1;
				}
			});
				
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
					role: 'MANAGER'
					}]

				}, (e, resp) => {
   					if (e) { 
						console.error(e);
						console.error("error_removing_bot_wakeUp");
    					}
    				console.log("Transfering..." , resp)
			});


		} else{
				
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
					role: 'MANAGER'
					}]

				}, (e, resp) => {
   					if (e) { 
						console.error(e);
						console.error("error_removing_bot_wakeUp");
    					}
    				console.log("Transfering..." , resp)
			});
				
				
		}

	
}






function proceedWithActions(answer){

	console.log("ACTIONS");
	var nowIsTimeToAction = Date.now();
	var closure = (nowIsTimeToAction - (1000*60*60*24));            // timestamp closure conversation
	var moveToLimbo = (nowIsTimeToAction - (1000*60*20));            // timestamp "move to Limbo" conversation
	var bringMeBackAtGeneral = (nowIsTimeToAction - (1000*60*10));  // timestamp "move to the general risveglio" conversation
	var sendAlert = (nowIsTimeToAction - (1000*60*60*23));            // timestamp "send Alert" conversation

	for (var m = 0; m < (answer.length); m++){
		
		setTimeout(function(m) {
		

			var isFacebook = 0;
			var isOutbound = 0;
			var lastTimeAwakened = 0;
			var lastTimeInLimbo = 0;
			var lastTimeInFreeze = 0;
			var channel = "web";
			var isToBeAwakened = 0;
			var isToBeAwakenedTimestamp = 0;


			if((answer[m].info.latestSkillName === "Facebook_priv") || (answer[m].info.latestSkillName === "facebook_risvegliate")){
				channel = "facebook";
				isFacebook = 1;
				isOutbound = 0;
			} else if((answer[m].info.latestSkillName === "Facebook_priv_night") || (answer[m].info.latestSkillName === "Facebook_priv_night_risvegli")){
				channel = "facebook_night";
				isFacebook = 1;
				isOutbound = 0;	
			} else if((answer[m].info.latestSkillName === "Fixed") || (answer[m].info.latestSkillName === "Fixed_risvegliata")){
				channel = "fixed";
				isFacebook = 1;
				isOutbound = 0;	
			} else if((answer[m].info.latestSkillName === "human") || (answer[m].info.latestSkillName === "human_risvegliate")){
				channel = "web";
				isFacebook = 0;
				isOutbound = 0;	
			} else if((answer[m].info.latestSkillName === "human_night") || (answer[m].info.latestSkillName === "human_night_risvegliate")){
				channel = "web_night";
				isFacebook = 0;
				isOutbound = 0;	
			} else if((answer[m].info.latestSkillName === "Outbound") || (answer[m].info.latestSkillName === "outbound_risvegliate")){
				channel = "outbound";
				isFacebook = 0;
				isOutbound = 1;	
			} else if((answer[m].info.latestSkillName === "Outbound_fixed") || (answer[m].info.latestSkillName === "Outbound_fixed_risvegliate")){
				channel = "outbound_fixed";
				isFacebook = 0;
				isOutbound = 1;	
			} else if(answer[m].hasOwnProperty('transfers')){
				if (typeof answer[m].transfers !== 'undefined' && answer[m].transfers.length > 0) {
					for (var y = 0; y < (answer[m].transfers.length); y++){
						if((answer[m].transfers[0].sourceSkillName === "Facebook_priv") || (answer[m].transfers[0].sourceSkillName === "facebook_risvegliate")){
							channel = "facebook";
							isFacebook = 1;
							isOutbound = 0;	
						}
						if((answer[m].transfers[0].sourceSkillName === "Facebook_priv_night") || (answer[m].transfers[0].sourceSkillName === "Facebook_priv_night_risvegli")){
							channel = "facebook_night";
							isFacebook = 1;
							isOutbound = 0;	
						}
						if((answer[m].transfers[0].sourceSkillName === "Fixed") || (answer[m].transfers[0].sourceSkillName === "Fixed_risvegliata")){
							channel = "fixed";
							isFacebook = 1;
							isOutbound = 0;	
						}
						if((answer[m].transfers[0].sourceSkillName === "human") || (answer[m].transfers[0].sourceSkillName === "human_risvegliate")){
							channel = "web";
							isFacebook = 0;
							isOutbound = 0;	
						}
						if((answer[m].transfers[0].sourceSkillName === "human_night") || (answer[m].transfers[0].sourceSkillName === "human_night_risvegliate")){
							channel = "web_night";
							isFacebook = 0;
							isOutbound = 0;	
						}
						if((answer[m].transfers[0].sourceSkillName === "Outbound") || (answer[m].transfers[0].sourceSkillName === "outbound_risvegliate")){
							channel = "outbound";
							isFacebook = 0;
							isOutbound = 1;	
						}
						if((answer[m].transfers[0].sourceSkillName === "Outbound_fixed") || (answer[m].transfers[0].sourceSkillName === "Outbound_fixed_risvegliate")){
							channel = "outbound_fixed";
							isFacebook = 0;
							isOutbound = 1;	
						}
					}
				}
			}



			var howManyMessages = answer[m].messageRecords.length;
				if(howManyMessages){
					var thisConversationHasResponse = 0;
					var thisConversationHasAlert = 0;
					var whatTimeAlert = answer[m].messageRecords[(howManyMessages - 1)].timeL;
					for (var q = (howManyMessages - 1); q > 0; q--){
						if(answer[m].messageRecords[q].sentBy === "Agent" && answer[m].messageRecords[q].participantId !== "1089636032"){
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
							for (var w = (arraylength - 1); w > 0; w--){
								if(answer[m].transfers[w].hasOwnProperty('contextData')){
									if(answer[m].transfers[w].contextData.hasOwnProperty('structuredMetadata')){
										if(answer[m].transfers[w].contextData.structuredMetadata[0].botResponse.intents.length > 2){
											if(answer[m].transfers[w].contextData.structuredMetadata[0].botResponse.intents[2].name === "limbo"){
												lastTimeInLimbo = answer[m].transfers[w].timeL;
												w = 0;
											}
										}
									}
								}
							}
							if(arraylength > 2){
								if(answer[m].transfers[(arraylength -2)].hasOwnProperty('contextData')){
									if(answer[m].transfers[(arraylength -2)].contextData.hasOwnProperty('structuredMetadata')){
										if(answer[m].transfers[(arraylength -2)].contextData.structuredMetadata[0].botResponse.intents.length == 1){
											isToBeAwakened = answer[m].transfers[(arraylength -2)].contextData.structuredMetadata[0].botResponse.intents[0].id;
											isToBeAwakenedTimestamp = parseInt(answer[m].transfers[(arraylength -2)].contextData.structuredMetadata[0].botResponse.intents[0].name);
											lastTimeInFreeze = answer[m].transfers[(arraylength -2)].timeL;
										}
									}
								}
							}

						}

					}




					var whatTime = 0;
					for (var k = (howManyMessages - 1); k > -1; k--){
						if(answer[m].messageRecords[k].sentBy === "Agent" && answer[m].messageRecords[k].participantId !== "1089636032"){
							whatTime = answer[m].messageRecords[k].timeL;
							k = 0;
						}
					}
					var whatTimeAgent = 0;
					for (var k = (howManyMessages - 1); k > -1; k--){
						if(answer[m].messageRecords[k].sentBy === "Agent"){
							whatTimeAgent = answer[m].messageRecords[k].timeL;
							k = 0;
						}
					}
					var whatTimeCustomer = 0;
					for (var k = (howManyMessages - 1); k > -1; k--){
						if(answer[m].messageRecords[k].sentBy === "Consumer"){
							whatTimeCustomer = answer[m].messageRecords[k].timeL;
							k = 0;
						}
					}
					var postuma = 0;
					if(lastTimeAwakened !== 0){
						if (whatTimeAlert < lastTimeAwakened){
							postuma = 1;
						}
					}

					if(isToBeAwakened === "awakeLater"){
						// console.log("thisIsToBeAwakened in " + (isToBeAwakenedTimestamp - Date.now()));
						if(isToBeAwakenedTimestamp < nowIsTimeToAction){
							console.log("***unfreezing");
							wakeUpChat(answer[m].info.conversationId, answer[m].info.latestAgentLoginName, channel, false);
						}
					}

					if(answer[m].messageRecords[(answer[m].messageRecords.length - 1)].sentBy === "Consumer") {
						if ((answer[m].info.latestSkillId === limboskill) && whatTimeCustomer){
							if(whatTimeCustomer < closure){
								console.log("***closing");
								console.log("isFacebook = " + isFacebook);
								checkNPSwasSent(answer[m], isFacebook, channel); //enable NPS
							} else if (whatTimeCustomer > lastTimeInLimbo){
								wakeUpChat(answer[m].info.conversationId, answer[m].info.latestAgentLoginName, channel, true);
							}

						}
						else if ((answer[m].info.latestSkillId === freezeskill) && (whatTimeCustomer > lastTimeInFreeze)){
							console.log("***wakingup");
							wakeUpChat(answer[m].info.conversationId, answer[m].info.latestAgentLoginName, channel, true);
						} else if (answer[m].info.latestSkillName.indexOf("***") > -1){
							if(whatTime < bringMeBackAtGeneral){
								if (answer[m].info.latestQueueState === "IN_QUEUE"){
									wakeUpChat(answer[m].info.conversationId, "56yghju765rfvbhu7656yg", channel, true);
								}

							}
						}

					}
					else{

						if (!postuma && thisConversationHasResponse && (answer[m].info.latestSkillId !== limboskill) && (isOutbound === 0) && (answer[m].info.latestSkillId !== freezeskill) && (answer[m].messageRecords[(answer[m].messageRecords.length - 1)].participantId !== botID)){
							if((whatTime < moveToLimbo) && (answer[m].info.latestSkillId !== limboskill)){
								console.log("***Limbo");
								limboChat(answer[m].info.conversationId, answer[m].info.latestAgentId);
							}
						}
						else if ((answer[m].info.latestSkillId === limboskill) && (whatTimeAgent > 0)){
							if(answer[m].info.conversationId == "73ff4268-171c-4398-9c11-f5c0c1c7770f"){
								console.log("we are inside");
							}

							if (whatTimeAgent < closure){
								console.log("***closing");
								console.log("isFacebook = " + isFacebook);
								checkNPSwasSent(answer[m], isFacebook, channel); //enable NPS
								// checkNPSwasSent(answer[m], 0, channel);  //disable NPS

							}
						}
					}


				}
				
				
				if (m === (answer.length - 1)){
					console.log("END_ACTIONS");
				}
			
			}, 0, m);
		
		}
	


}




function tryUntilSuccess(integer, callback) {


	var now = Date.now();
	var before = (Date.now() - (1000*60*60*24*30));    // only the conversation of the last 60 days will be fetched
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
			
			if(b){
			
				if(integer == 0){
					conversationsToDownload = 0;
					if(b.hasOwnProperty('_metadata')){
						if(b._metadata.hasOwnProperty('count')){
							conversationsToDownload = b._metadata.count;
						}
					}

					conversationsPartial = 0;
					myCheckConversationsPartial = 0;
				}
				if (conversationsToDownload > 0){
					if(b.hasOwnProperty('conversationHistoryRecords')){
						conversationsPartial = conversationsPartial + b.conversationHistoryRecords.length;
						if (myCheckConversationsPartial < conversationsPartial){
							if(conversationsPartial < conversationsToDownload){
								integer = conversationsPartial;
								myCheckConversationsPartial = conversationsPartial;
								console.log(conversationsPartial + "<--->" + conversationsToDownload);
								proceedWithActions(b.conversationHistoryRecords);
								tryUntilSuccess(integer, callback);
							} else{
								integer = 0;
								console.log(conversationsPartial + "<--->" + conversationsToDownload);
								proceedWithActions(b.conversationHistoryRecords);
								setTimeout(function(){
									agentsLogged = [];
									totalAgentsLogged = [];
									retrieveAgentsLogged();
									setTimeout(function(){
										console.log("fetching convs");
										tryUntilSuccess(integer, function(err, resp) {
											// Your code here...
										});

									}, 2000);

								}, 2000);
							}
						} else{
							integer = 0;
							console.log(conversationsPartial + "<--->" + conversationsToDownload);
							proceedWithActions(b.conversationHistoryRecords);
							setTimeout(function(){
								agentsLogged = [];
								totalAgentsLogged = [];
								retrieveAgentsLogged();
								setTimeout(function(){
									console.log("fetching convs");
									tryUntilSuccess(integer, function(err, resp) {
										// Your code here...
									});

								}, 2000);

							}, 2000);
						}
					} else{
						console.log("conversationHistoryRecords is null");
						tryUntilSuccess(integer, function(err, resp) {
							
						});
					}
				} else{
					integer = 0;
					setTimeout(function(){
						agentsLogged = [];
						totalAgentsLogged = [];
						retrieveAgentsLogged();
						setTimeout(function(){
							console.log("fetching convs");
							tryUntilSuccess(integer, function(err, resp) {
								// Your code here...
							});

						}, 2000);

					}, 2000);
				}
				
			} else{
				setTimeout(function(){
					console.log("error fetching");
					tryUntilSuccess(integer, function(err, resp) {
						// Your code here...
					});
				}, 10000);
			}
			
			
			

		});

}








var integer = 0;

echoAgent.on('connected', msg=>{
	console.log("********* let's go! **********");
	bearer = echoAgent.transport.configuration.token;
	retrieveSkills();
	setTimeout(function(){
		console.log("first fetch");
		retrieveAgentsLogged();
		setTimeout(function(){
			console.log("fetching convs");
			tryUntilSuccess(integer, function(err, resp) {
    				// Your code here...
			});
						
		}, 2000);
	}, 2000);
});
