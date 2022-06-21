
export enum EventType {
	EVENT_ON_DID_CHANGE_WORKSPACE_FOLDERS,
	EVENT_ON_DID_CHANGE_CONFIGURATION,
}

export class EventManager {
	private static eventList: { [k: number]: Function[]; } = {};

	/** 发起事件 */
	static fireEvent<T>(eventType: EventType, event: T) {
		if (EventManager.eventList[eventType]) {
			for (const callback of EventManager.eventList[eventType]) {
				callback(event);
			}
		}
	}

	/** 监听事件 */
	static listenToEvent<T>(eventType: EventType, callback: (event: T) => void) {
		if (EventManager.eventList[eventType] === undefined) {
			EventManager.eventList[eventType] = [];
		}
		EventManager.eventList[eventType].push(callback);
		return EventManager.eventList[eventType].length - 1;
	}
	/** 停止监听事件 */
	static stopListenToEvent(eventType: EventType, index: number) {
		if (EventManager.eventList[eventType]) {
			EventManager.eventList[eventType].splice(index, 1);
		}
	}
}