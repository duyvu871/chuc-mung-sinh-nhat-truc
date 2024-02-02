const $_V = document.querySelector.bind(document);
const $$_V = document.querySelectorAll.bind(document);
const createVisualElement = domString => new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
createVisualElement.bind(document);
const setLocalStorageItems = (key,items) => {
    let value = JSON.stringify(items)
    localStorage.setItem(key,value)
}
const deleteLocalStorageItems = (key) => {
    localStorage.removeItem(key)
}

function chunkArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

