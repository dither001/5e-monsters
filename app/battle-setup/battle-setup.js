(function() {
	'use strict';

	angular
		.module('app')
		.controller('BattleSetupController', BattleSetupController);

	BattleSetupController.$inject = ['$state', 'actionQueue', 'combat', 'util', 'combatConstants'];

	function BattleSetupController($state, actionQueue, combat, util, constants) {
		var vm = this;
		
		vm.partial = util.partialFactory("app/battle-setup/partials/");
		vm.combat = combat;

		activate();

		////////////////

		function activate() {
			var combatState = combat.init(),
				forward;

			if ( combatState & constants.NO_PLAYERS ) {
				actionQueue.unshift("players.manage", "You must select a party");
				forward = true;
			}

			if ( combatState & constants.NO_MONSTERS ) {
				actionQueue.unshift("encounter-manager", "You must select an encounter");
				forward = true;
			}

			if ( forward ) {
				// In the end, send them back here
				actionQueue.queue("battle-setup");

				actionQueue.next($state);
			}
		}
	}
})();
