import { Process } from "@nexus-app/nexus-module-builder"
import { session } from "electron";
import * as path from "path";

// These is replaced to the ID specified in export-config.js during export. DO NOT MODIFY.
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
// ---------------------------------------------------

const ICON_PATH: string = path.join(__dirname, "../assets/outlook-icon.png")


export default class SampleProcess extends Process {


    public constructor() {
        super({
            moduleID: MODULE_ID,
            moduleName: MODULE_NAME,
            paths: {
                iconPath: ICON_PATH,
                htmlPath: path.join(__dirname, "../renderer/index.html"),
            },
            httpOptions: {
                userAgent: session
                    .fromPartition(`persist:${MODULE_ID}`)
                    .getUserAgent()
                    .replace(/Electron\/*/, ''),
                partition: `persist:${MODULE_ID}`
            }
        });

    }

    public async initialize(): Promise<void> {
        this.sendToRenderer("params", {
            url: 'https://outlook.live.com/mail/0/',
            // url: 'https://go.microsoft.com/fwlink/p/?LinkID=2125442&deeplink=owa%2F%3Fstate%3D1%26redirectTo%3DaHR0cHM6Ly9vdXRsb29rLmxpdmUuY29tL21haWwv',
            userAgent: session.fromPartition(`persist:${MODULE_ID}`).getUserAgent().replace(/Electron\/*/, ''),
            partition: `persist:${MODULE_ID}`
        })
    }

    public async handleEvent(eventType: string, data: any[]): Promise<any> {
        switch (eventType) {
            case "init": this.initialize();
        }
    }

}