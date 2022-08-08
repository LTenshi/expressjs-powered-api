import NodeCache from "node-cache";
import exportJob from "../models/exportJob";
import importJob from "../models/importJob";
import { jobDataObject } from "../models/jobDataObject";

//Data cache used in the save/loads
const dataCache = new NodeCache( { stdTTL: 120, checkperiod: 600 } );

//Simulating processing via timeouts...
async function processExport (exportJob: exportJob) {
    switch(exportJob.type) {
        case "epub":
            console.log("Processing an epub... 10s");
            setTimeout(function() {
                saveToStorage(exportJob, "export");
            }, 10000);
            break;
        case "pdf":
            console.log("Processing a pdf... 25s");
            setTimeout(function() {
                saveToStorage(exportJob, "export");
            }, 25000);
            break;
        default:
            break;
    }
    return;
}

async function processImport (importJob: importJob) {
    console.log("Processing import... 60s");
    importJob.state = "pending";
    setTimeout(function() {
        saveToStorage(importJob, "import");
    }, 60000);
    return;
}


//This function can be replaced by any other data storage method
async function saveToStorage (data: jobDataObject, dataCacheLocation: string) {
    console.log(`Saving to storage`);
    data.state = "finished";
    data.updated_at = new Date();

    //Save to cache
    let cacheValue: any = await dataCache.get(dataCacheLocation);
    if (!cacheValue) {
        cacheValue = [];
        cacheValue.push(data);
        dataCache.set(dataCacheLocation, cacheValue, 120);
    }
    else {
        cacheValue.push(data);
        dataCache.set(dataCacheLocation, 0, 120);
    }

    console.log("Process finished");
}

async function loadFromStorage(dataCacheLocation: string) {
    return await dataCache.get(dataCacheLocation);
}

export { processExport, processImport, loadFromStorage }