
export enum EventType {
	EVENT_ON_DID_CHANGE_WORKSPACE_FOLDERS,
	EVENT_ON_DID_CHANGE_CONFIGURATION,
}

export class EventManager {
	private static eventList: { [k: number]: Function[]; } = {};

	/** Fire an event */
	static fireEvent<T>(eventType: EventType, event: T) {
		if (EventManager.eventList[eventType]) {
			for (const callback of EventManager.eventList[eventType]) {
				callback(event);
			}
		}
	}

	/** Listen to an event */
	static listenToEvent<T>(eventType: EventType, callback: (event: T) => void) {
		if (EventManager.eventList[eventType] === undefined) {
			EventManager.eventList[eventType] = [];
		}
		EventManager.eventList[eventType].push(callback);
		return EventManager.eventList[eventType].length - 1;
	}
	/** Stop listening to an event */
	static stopListenToEvent(eventType: EventType, index: number) {
		if (EventManager.eventList[eventType]) {
			EventManager.eventList[eventType].splice(index, 1);
		}
	}
}