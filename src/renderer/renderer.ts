// Sends information to the the process.
const sendToProcess = (eventType: string, ...data: any[]): Promise<void> => {
    return window.parent.ipc.send(window, eventType, data);
}

const url: string = "https://github.com/aarontburn/nexus-core/blob/main/docs/getting_started/Introduction.md#Nexus";

// Handle events from the process.
const handleEvent = (eventType: string, data: any[]) => {
    switch (eventType) {
        case "user-agent": {
            // Create the webview
            const { userAgent, partition } = data[0];

            const html: string = `
                <webview 
                    allowpopups 
                    src="${url}"
                    partition="${partition}" 
                    userAgent="${userAgent}"
                ></webview>
            `
            document.getElementById("app").insertAdjacentHTML('beforeend', html);
            break;
        }
        default: {
            console.warn(`Uncaught message: ${eventType} | ${data}`);
            break;
        }
    }
}

// Attach event handler.
window.parent.ipc.on(window, (eventType: string, data: any[]) => {
    handleEvent(eventType, data);
});


// Instruct the module process to initialize once the renderer is ready.
sendToProcess("init");

