(function() {
	"use strict";

	angular
		.module("app.space")
		.controller("SpaceCtrl", SpaceCtrl);

	function SpaceCtrl(roomsAvailData, $scope, $ionicModal, spaceService, logger) {
		var vm = this;
		

		(function() {
			// Constructor
			this.meetingRooms = [];
			this.meetingRooms = roomsAvailData;
			this.roomData = null;
			vm.modal = null;

			//Methods
			this.releaseRoom = releaseRoom;
			this.showRoomInfo = showRoomInfo;
			this.bookRoom = bookRoom;
			this.init = init;
		}).call(vm)


		init();

		function init() {
			$ionicModal.fromTemplateUrl('src/space/templates/availability-modal.html', {
    			scope: $scope,
    			animation: 'slide-in-up'
  			}).then(function(modal) {
    			vm.modal = modal;
  			});
		}
		

		function success(data) {
			vm.meetingRooms.some(function(ele, index, array) {
				if(ele.name === data.name) {
					vm.meetingRooms.splice(index,1, ele);
					$scope.$broadcast("indicateStatus");
					if(data.avail === true) {
						logger.info("Room has been released");
					}
					else {
						logger.info("Room has been booked");
					}
					return true;
				}
			});
		}

		function failure(err) {
			logger.warn("Failred to book the meeting room! " + err.message)
		}

		function updateRoom(roomData) {
			return spaceService.bookMeetingRoom(roomData)
					.then(success, failure);

		}

		function releaseRoom(roomData) {
			angular.extend(roomData, {
					duration: {},
					avail: true
				});
			updateRoom(roomData);
			vm.modal.hide();
		}
		
		function bookRoom(data, validity) {
			if(validity) { // Falling back to browser validation
				var roomData = vm.roomData;
				angular.extend(roomData, {
					duration: {
						from: (data.fromDate.toDateString() + " " + data.fromTime.toTimeString()),
						to: (data.toDate.toDateString() + " " +  data.toTime.toTimeString())
					},
					avail: false
				});

				updateRoom(roomData);
				vm.modal.hide();
			}
		}

  		function showRoomInfo(roomData) {
  			vm.roomData = roomData;
  			vm.modal.show();
  		}

	}
})();