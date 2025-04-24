import { Process } from "@nexus/nexus-module-builder"
import { session } from "electron";

// These is replaced to the ID specified in export-config.js during export. DO NOT MODIFY.
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
// ---------------------------------------------------

// If you have an icon, specify the relative path from this file.
// Can be a .png, .jpeg, .jpg, or .svg
// const ICON_PATH: string = path.join(__dirname, "...")

const ICON_PATH: string = undefined;

export default class SampleProcess extends Process {

    /**
     *  The constructor. Should not directly be called, 
     *      and should not contain logic relevant to the renderer.
     */
    public constructor() {
        super({
            moduleID: MODULE_ID,
            moduleName: MODULE_NAME,
            paths: {
                iconPath: ICON_PATH,
                urlPath: "https://github.com/aarontburn/nexus-core/blob/main/docs/getting_started/Introduction.md#Nexus"
            },
            httpOptions: {
                userAgent: session
                    .fromPartition(`persist:${MODULE_ID}`)
                    .getUserAgent()
                    .replace(/Electron\/*/, ''),
                partition: `persist:${MODULE_ID}`
            }
        });


        // If you want to use a <webview> tag instead, your constructor may look like this:

        // super({
        //     moduleID: MODULE_ID,
        //     moduleName: MODULE_NAME,
        //     paths: {
        //         iconPath: ICON_PATH,
        //         htmlPath: path.join(__dirname, "../renderer/index.html"),
        //     }
        // });


    }

    // This function is only needed if you have a renderer process via the webview tag

    // public async initialize(): Promise<void> {
    //     this.sendToRenderer("user-agent", {
    //         userAgent: session.fromPartition(`persist:${MODULE_ID}`).getUserAgent().replace(/Electron\/*/,''),
    //         partition: `persist:${MODULE_ID}`
    //     });
    // }

    // This function is only needed if you have a renderer process via the webview tag

    // public async handleEvent(eventType: string, data: any[]): Promise<any> {
    //     switch (eventType) {
    //         case "init": {
    //             this.initialize();
    //             break;
    //         }
    //         default: {
    //             console.warn(`[${MODULE_NAME}] Uncaught message: ${eventType} | ${data}`);
    //             break;
    //         }
    //     }
    // }

}