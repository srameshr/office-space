(function() {
	"use strict";

	angular
		.module("app.space")
		.service("spaceService", spaceService);

	function spaceService($q) {
		return {
			getMeetingRooms: getMeetingRooms,
			bookMeetingRoom: bookMeetingRoom
		};

		// Private
		function success(data) {
			var roomsArray = [];
			try {
				
				data.forEach(function(ele, index, array) {
					roomsArray.push({
						'name': ele.get("name"),
						'avail': ele.get("avail"),
						'id': ele.id,
						'duration': ele.get("duration")
					});
				})
				
			} catch(e) {
				roomsArray.push({
					'name': data.get("name"),
					'avail': data.get("avail"),
					'id': data.id,
					'duration': ele.get("duration")
				});
			}

			return $q.resolve(roomsArray);
			
		}

		function failure(err) {
			return $q.reject(err);
		}


		/*
		  @ngDoc -- bookMeetingRoom Privates
		*/
		
		function _bookRoom(room, roomData) {
			room.set("avail", roomData.avail);
			room.set("duration", roomData.duration);
			return room.save();
		}

		function _getNewRoomData(newRoomData) {
			return $q.resolve(
					{
						'name': newRoomData.get('name'),
						'id': newRoomData.id,
						'duration': newRoomData.get('duration'),
						'avail': newRoomData.get('avail')
					}
				);
		}

		/*
		  @ngDoc -- method: Public

		*/
		function bookMeetingRoom(roomData) {

			var MeetingRooms = Parse.Object.extend("MeetingRooms");
			var query = new Parse.Query(MeetingRooms);

			return query.get(roomData.id)
				.then(function(room) {
					return _bookRoom(room, roomData);
				}).then(function(newRoomData) {
					return _getNewRoomData(newRoomData);
				}, function(err) {
					return $q.reject(err);
				});
		}


		function getMeetingRooms() {
			var MeetingRooms = Parse.Object.extend("MeetingRooms");
			var query = new Parse.Query(MeetingRooms);

			return query.find().then(success, failure);
		}

	}
})();