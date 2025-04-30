// Sends information to the the process.
const sendToProcess = (eventType: string, ...data: any[]): Promise<void> => {
    return window.parent.ipc.send(window, eventType, data);
}
const loginURL: string = 'https://go.microsoft.com/fwlink/p/?LinkID=2125442';

window.parent.ipc.on(window, (eventType: string, data: any[]) => {
    switch (eventType) {
        case "params": {
            const { url, userAgent, partition } = data[0];

            const html: string = `
                <webview 
                    src="${url}"
                    id="view"
                    allowpopups 
                    partition="${partition}" 
                    userAgent="${userAgent}">
                </webview>
            `
            document.getElementById("app").insertAdjacentHTML('beforeend', html);

            const webview: HTMLElement = document.getElementById('view');

            let count = 0;
            const interval: NodeJS.Timeout = setInterval(() => {
                const noLoginRedirect = 'microsoft-365/outlook/email-and-calendar-software-microsoft-outlook';
                if (webview.getAttribute("src").includes(noLoginRedirect)) {
                    webview.setAttribute("src", loginURL);
                    clearInterval(interval);
                }
                count++;
                if (count > 5) {
                    clearInterval(interval);
                }
            }, 2000);

            break;
        }
        default: {
            console.warn("Uncaught message: " + eventType + " | " + data)
            break;
        }
    }
});

sendToProcess("init");

