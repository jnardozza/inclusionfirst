$('#createSchedule').on(
	'click',
	function(){
	    submitNew();
	}
);

$(function() { // document ready
	$('#calendar').fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		editable: true,
		scrollTime: '07:00',
		customButtons: {
  			    newSchedule: {
  			        text: 'Add Schedule',
  			        click: function() {
  			            newSchedule();
  			        }
  			    }
  			},
		header: {
			left: 'prevYear,prev,today,next,nextYear newSchedule',
			center: 'title',
			right: 'timelineDay,timelineSevenDays,month'
		},
		defaultView: 'timelineDay',
		views: {
			timelineSevenDays: {
				type: 'timeline',
				duration: { days: 7 },
				resourceGroupField: 'clientName',
				slotDuration: '24:00',
				resources: {
       				url: 'get_resources.php',
       				type: 'POST'
   				},
				events: {
       				url: 'get_events.php',
       				type: 'POST'
   				},
			}
		},
		resourceGroupField: 'clientName',
		eventClick: function(event, jsEvent, view){
			selectEvent(event, jsEvent, view);
		},
		resources: {
       		url: 'get_resources.php',
       		type: 'POST'
   		},
		events: {
       		url: 'get_events.php',
       		type: 'POST'
   		}
	});

});

function submitNew(){

	var request = {};
//	request["title"] = document.getElementById('input_title').value;
	request["client_id"] = document.getElementById('input_client').value;
	request["personnel_id"] = document.getElementById('input_personnel').value;
	request["service_id"] = document.getElementById('input_service').value;
	request["description"] = document.getElementById('input_description').value;
	request["dateStart"] = document.getElementById('input_dateStart').value;
	request["dateEnd"] = document.getElementById('input_dateEnd').value;
	request["timeStart"] = document.getElementById('input_timeStart').value;
	request["timeEnd"] = document.getElementById('input_timeEnd').value;

	//var sunday = [];
	//sunday[0] = document.getElementById('input_sunday').value;
	//sunday[1] = document.getElementById('input_sundayTimeStart').value;
	//sunday[2] = document.getElementById('input_sundayTimeEnd').value;
	//request["sunday"] = sunday;
//
	//var monday = [];
	//monday[0] = document.getElementById('input_monday').value;
	//monday[1] = document.getElementById('input_mondayTimeStart').value;
	//monday[2] = document.getElementById('input_mondayTimeEnd').value;
	//request["monday"] = monday;
//
	//var tuesday = [];
	//tuesday[0] = document.getElementById('input_tuesday').value;
	//tuesday[1] = document.getElementById('input_tuesdayTimeStart').value;
	//tuesday[2] = document.getElementById('input_tuesdayTimeEnd').value;
	//request["tuesday"] = tuesday;
//
	//var wednesday = [];
	//wednesday[0] = document.getElementById('input_wednesday').value;
	//wednesday[1] = document.getElementById('input_wednesdayTimeStart').value;
	//wednesday[2] = document.getElementById('input_wednesdayTimeEnd').value;
	//request["wednesday"] = wednesday;
//
	//var thursday = [];
	//thursday[0] = document.getElementById('input_thursday').value;
	//thursday[1] = document.getElementById('input_thursdayTimeStart').value;
	//thursday[2] = document.getElementById('input_thursdayTimeEnd').value;
	//request["thursday"] = thursday;
//
	//var friday = [];
	//friday[0] = document.getElementById('input_friday').value;
	//friday[1] = document.getElementById('input_fridayTimeStart').value;
	//friday[2] = document.getElementById('input_fridayTimeEnd').value;
	//request["friday"] = friday;
//
	//var saturday = [];
	//saturday[0] = document.getElementById('input_saturday').value;
	//saturday[1] = document.getElementById('input_saturdayTimeStart').value;
	//saturday[2] = document.getElementById('input_saturdayTimeEnd').value;
	//request["saturday"] = saturday;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      		//close the popover and reload the data source
    	}
  	}
	xhttp.open("POST", "submitSchedule.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("request=" + request);

}

function selectEvent(event, jsEvent, view){
	var details = 	'<h4>Details</h4>' +
					'<table>' +
						'<tr>' +
							'<td>Client:</td>' +
							'<td>' + event.clientName + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Personnel:</td>' +
							'<td>' + event.personnelName + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Service:</td>' +
							'<td>' + event.serviceName + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Description:</td>' +
							'<td><input value=\'' + event.description + '\'></input></td>' +
						'<tr>' +
							'<td>Date:</td>' +
							'<td><input type="date" value=\'' + event.date + '\'></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Time:</td>' +
							'<td><input type="time" value=\'' + event.startTime + '\'></input> to <input type="time" value=\'' + event.endTime + '\'></input></td>' +
						'</tr>' +
					'</table>';
	var repeat = 	'<h4>Repeat Options</h4>' +
					'<table>' +
						'<tr>' +
							'<th>Day</th>' +
							'<th>Repeat</th>' +
							'<th>Start Time</th>' +
							'<th>End Time</th>' +
						'</tr>' +
						'<tr>' +
							'<td>Sunday:</td>' +
							'<td><select><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time"></input></td>' +
							'<td><input type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Monday:</td>' +
							'<td><select><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time"></input></td>' +
							'<td><input type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Tuesday:</td>' +
							'<td><select><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time"></input></td>' +
							'<td><input type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Wednesday:</td>' +
							'<td><select><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time"></input></td>' +
							'<td><input type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Thursday:</td>' +
							'<td><select><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time"></input></td>' +
							'<td><input type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Friday:</td>' +
							'<td><select><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time"></input></td>' +
							'<td><input type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Saturday:</td>' +
							'<td><select><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time"></input></td>' +
							'<td><input type="time"></input></td>' +
						'</tr>' +
					'</table>';
           	$('#selectTitle').html(event.title);
           	$('#selectBody').html(details + repeat);
           	$('#modalSelect').modal();
}

function newSchedule(){
	var details = 	'<h4>Details</h4>' +
					'<table>' +
						'<tr>' +
							'<td>Client:</td>' +
							'<td><input id="input_client"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Personnel:</td>' +
							'<td><input id="input_personnel"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Service:</td>' +
							'<td><input id="input_service"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Description:</td>' +
							'<td><input id="input_description"></input></td>' +
						'<tr>' +
							'<td>Date:</td>' +
							'<td><input id="input_dateStart" type="date"> to <input id="input_dateEnd" type="date"></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Time:</td>' +
							'<td><input id="input_timeStart" type="time"></input> to <input id="input_timeEnd" type="time"></input></td>' +
						'</tr>' +
					'</table>';
	var repeat = 	'<h4>Repeat Options</h4>' +
					'<table>' +
						'<tr>' +
							'<th>Day</th>' +
							'<th>Repeat</th>' +
							'<th>Start Time</th>' +
							'<th>End Time</th>' +
						'</tr>' +
						'<tr>' +
							'<td>Sunday:</td>' +
							'<td><select id="input_sunday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input id="input_sundayTimeStart" type="time"></input></td>' +
							'<td><input id="input_sundayTimeEnd" type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Monday:</td>' +
							'<td><select id="input_monday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input id="input_mondayTimeStart" type="time"></input></td>' +
							'<td><input id="input_mondayTimeEnd" type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Tuesday:</td>' +
							'<td><select id="input_tuesday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input id="input_tuesdayTimeStart" type="time"></input></td>' +
							'<td><input id="input_tuesdayTimeEnd" type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Wednesday:</td>' +
							'<td><select id="input_wednesday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input id="input_wednesdayTimeStart" type="time"></input></td>' +
							'<td><input id="input_wednesdayTimeEnd" type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Thursday:</td>' +
							'<td><select id="input_thursday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input id="input_thursdayTimeStart" type="time"></input></td>' +
							'<td><input id="input_thursdayTimeEnd" type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Friday:</td>' +
							'<td><select id="input_friday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input id="input_fridayTimeStart" type="time"></input></td>' +
							'<td><input id="input_fridayTimeEnd" type="time"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Saturday:</td>' +
							'<td><select id="input_saturday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input id="input_saturdayTimeStart" type="time"></input></td>' +
							'<td><input id="input_saturdayTimeEnd" type="time"></input></td>' +
						'</tr>' +
					'</table>';
           	$('#modalTitle').html('New Schedule');
           	$('#modalBody').html(details + repeat);
           	$('#modalNew').modal();
}