const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { successLog, errorLog } = require('./logMessage');

const genrateThumbnail = async (data) => {
    try {
        const { folderPath, videoFile, outputFileName } = data
        // where we upload the thumbnail like publik/thumbnail  
        const outputFolderPath = path.join(__dirname, folderPath)
        // complete video input file path URL like http://example.com/upload/video.mp4
        const inputVideoPath = videoFile; 
        // Time offset in seconds for the thumbnail (e.g., 5 seconds into the video)
        const thumbnailTimeOffset = 5;

        const dimensions = await getVideoDimensions(inputVideoPath)
        const tempDimensions = `${dimensions?.width}x${dimensions?.height}` || process.env.THUMBNAIL_HEIGHT_WIDTH;

        await new Promise((resolve, reject) => {
            ffmpeg(inputVideoPath)
                .screenshots({
                    count       : 1,
                    folder      : outputFolderPath,
                    filename    : outputFileName,
                    size        : tempDimensions,
                    timemarks   : [thumbnailTimeOffset],
                })
                .on("end", () => {
                    successLog("Thumbnail creating successfully")
                    resolve()
                })
                .on('error', (err) => {
                    errorLog("creating thumbnail", err)
                    reject(err)
                });
        })    

        return true
    } catch (error) {
        console.log("Error: genrate thumbnail error", error);
        return false
    }
}

function getVideoDimensions(videoUrl) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoUrl, (err, metadata) => {
            if (err) {
                errorLog("get dimention", err)
                reject(err);
            } else {
                const { width, height } = metadata.streams[0];
                resolve({ width, height });
            }
        });
    });
}

module.exports = genrateThumbnail;


// const fileData = {
//     folderPath      : "../../thumbs", // store thumbnail 
//     videoFile       : actualimagepath,  // http://example.com/upload/file/demo.mp4
//     outputFileName  : "test-4512548-demo.mpd"  // genrate temp new file name 
// }
// const getData = genrateThumbnail(fileData)
// if (!getData) {
//     return helpers.showResponse(false, Messages.SOMETHING_WENT_WRONG, null, null, 400);
// }