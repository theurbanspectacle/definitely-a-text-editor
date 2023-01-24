const butInstall = document.getElementById('buttonInstall');

let promptEvent;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    promptEvent = event;
    butInstall.setAttribute('style', 'display: block;');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (promptEvent) {
        promptEvent.prompt();
        promptEvent = undefined;
        butInstall.setAttribute('style', 'display: none;');
    } else {
        console.error('Prompt event not available', {promptEvent});
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', () => {
    promptEvent = undefined;
    butInstall.setAttribute('style', 'display: none;');
});
