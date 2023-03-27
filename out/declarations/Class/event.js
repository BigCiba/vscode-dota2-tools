"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType[EventType["EVENT_ON_DID_CHANGE_WORKSPACE_FOLDERS"] = 0] = "EVENT_ON_DID_CHANGE_WORKSPACE_FOLDERS";
    EventType[EventType["EVENT_ON_DID_CHANGE_CONFIGURATION"] = 1] = "EVENT_ON_DID_CHANGE_CONFIGURATION";
})(EventType = exports.EventType || (exports.EventType = {}));
class EventManager {
    /** 发起事件 */
    static fireEvent(eventType, event) {
        if (EventManager.eventList[eventType]) {
            for (const callback of EventManager.eventList[eventType]) {
                callback(event);
            }
        }
    }
    /** 监听事件 */
    static listenToEvent(eventType, callback) {
        if (EventManager.eventList[eventType] === undefined) {
            EventManager.eventList[eventType] = [];
        }
        EventManager.eventList[eventType].push(callback);
        return EventManager.eventList[eventType].length - 1;
    }
    /** 停止监听事件 */
    static stopListenToEvent(eventType, index) {
        if (EventManager.eventList[eventType]) {
            EventManager.eventList[eventType].splice(index, 1);
        }
    }
}
exports.EventManager = EventManager;
EventManager.eventList = {};
//# sourceMappingURL=event.js.map