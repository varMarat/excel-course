export function capitalize (eventName){
    if(!eventName){
        return ''
    }
    return eventName.charAt(0).toUpperCase() + eventName.slice(1)
}