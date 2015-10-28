(function() {
	"use strict";

	angular
		.module("app.admin")
		.service("adminService", adminService);

	function adminService($q) {
		return {
			getMeetingRooms: getMeetingRooms,
			addMeetingRoom: addMeetingRoom,
			deleteRoom: deleteRoom
		}

		function success(data) {
			var roomsArray = [];
			try {
				
				data.forEach(function(ele, index, array) {
					roomsArray.push({
						'name': ele.get("name"),
						'avail': ele.get("avail"),
						'id': ele.id
					});
				})
				
			} catch(e) {
				roomsArray.push({
					'name': data.get("name"),
					'avail': data.get("avail"),
					'id': data.id
				});
			}

			return $q.resolve(roomsArray);
			
		}

		function failure(err) {
			console.log(err);
			return $q.reject(err);
		}

		function deleteRoom(roomId) {
			var MeetingRooms = Parse.Object.extend("MeetingRooms");
			var query = new Parse.Query(MeetingRooms);

			return query.get(roomId)
				.then(function(room) {
					return room.destroy()
				}).then(function(data) {
					return data
				}, function(err) {
					return err
				});
		}


		function addMeetingRoom(roomData) {
			var MeetingRooms = Parse.Object.extend("MeetingRooms");
			var meetingRooms = new MeetingRooms();

			return meetingRooms.save(roomData).then(success, failure);
		}

		function getMeetingRooms() {
			var MeetingRooms = Parse.Object.extend("MeetingRooms");
			var query = new Parse.Query(MeetingRooms);

			return query.find().then(success, failure);
		}
	}

})();