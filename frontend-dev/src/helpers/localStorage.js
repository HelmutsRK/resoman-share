export function saveToLocalStorage(storageKey, dataObj){
    const data = JSON.stringify(dataObj)
    localStorage.setItem(storageKey, data);
}

export function getFromLocalStorage(storageKey) {
    try {
        return JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
        return null;
    }
}

export function deleteFromLocalStorage(storageKey){
    localStorage.removeItem(storageKey);
}