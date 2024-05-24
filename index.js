/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Control the default view mode */
const viewerConfig = {
    /* Allowed possible values are "FIT_PAGE", "FIT_WIDTH", "TWO_COLUMN", "TWO_COLUMN_FIT_PAGE" or "". */
    defaultViewMode: "",
};

/* Wait for Adobe Acrobat Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    const pipsFileName = "Panoptic PIPs v1.0.0.pdf"
    const pipsUrl = 'https://raw.githubusercontent.com/panoptic-labs/whitepaper/main/Panoptic_PIPs_v1.0.0.pdf'
    const pipsMetadata = {
        url: pipsUrl,
        fileName: pipsFileName,
    }

    const whitepaperFileName = "Panoptic Whitepaper v1.3.1.pdf"
    const whitepaperUrl = 'https://raw.githubusercontent.com/panoptic-labs/whitepaper/main/Panoptic_Whitepaper_v1.3.1.pdf'
    const whitepaperMetadata = {
        url: whitepaperUrl,
        fileName: whitepaperFileName,
    }

    // If subdomain is "pips", fileToPreview will be pipsUrl.
    // If subdomain is "paper", fileToPreview will be whitepaperUrl.
    // Otherwise, fileToPreview should be empty string.
    const fileToView = window.location.host.includes("pips")? pipsMetadata : window.location.host.includes("paper")? whitepaperMetadata : "";

    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "cd79a2959f874a68b5afcfa7363f91b9",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: fileToView.url,
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                headers: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: fileToView.fileName
        }
    }, viewerConfig);
});
