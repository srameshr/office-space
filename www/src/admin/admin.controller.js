(function() {
	"use strict";

	angular
		.module("app.admin")
		.controller("AdminCtrl", AdminCtrl);

	function AdminCtrl(meetingRoomsData, $ionicPopup, adminService, $scope, $ionicScrollDelegate, logger) {
		
		var vm = this;

		(function() {
			// Constructor
			// Properties
			vm.showAddHelp = false;
			vm.rooms = [];
			vm.rooms = meetingRoomsData;

		    // methods
			this.onDropComplete = onDropComplete;
			this.removeRoom = removeRoom;
			this.init = init;

		}).call(vm);

		init();

		function init() {
			if(vm.rooms.length === 0) {
				vm.showAddHelp = true;
			}
		}


		function removeRoom(room) {

			function deleteSuccess() {
					//vm.rooms.splice(index, 1);
					vm.rooms.splice(arguments[1], 1);
					if(vm.rooms.length === 0) {
						vm.showAddHelp = true;
					}
					logger.success("The Room has been successfully removed!");
			}

			function deleteFailure(err) {
				logger.error("Error in removal! " + err.message);
			}

			vm.rooms.some(function(ele, index, arr) {
				if(ele.name === room.name) {
					adminService.deleteRoom(ele.id)
						.then(deleteSuccess.apply(this, arguments), deleteFailure);
					return true; // Why wait for db, when you have deleted manually for users conf
				}
			})
		}


		function onDropComplete() {

			function success(meetingRoom) {

				vm.rooms.push(meetingRoom[0]);
				$ionicScrollDelegate.resize();
				vm.showAddHelp = false;
				logger.success("Room has been successfully created!");
			
			}

			function failure(meetingRoom, err) {
				logger.err("Failure in deleting room. " + err.message);
			}


			function getRoomNumber() {
				if(vm.rooms.length === 0) {
					return 1
				}
				else {
					return (1 + parseInt( (vm.rooms[vm.rooms.length - 1].name.split(" ")[1]), 10));
				}
			}

			function confirmStatus(status) {
				if(status) {
					var room = {
						avail: true,
						name: 'Room ' + getRoomNumber(),
						duration: {}
					};
					adminService.addMeetingRoom(room).then(success, failure);
				}
				else {
					return false;
				}
			}

			// Invokes this
			$ionicPopup.confirm({
				title: 'Add Meeting Room',
				template: 'Do you want to add a new meeting room?'
			}).then(confirmStatus, function(){return false;});

		}
	}
})();