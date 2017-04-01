// var admin = require("firebase-admin");

// var serviceAccount = require(__dirname + "/dride-2384f-firebase-adminsdk-m1piu-73dbeedc24.json");
// // Get a database reference
// // Initialize the app with a service account, granting admin privileges
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://dride-2384f.firebaseio.com"
// });


// const mkdirp = require('mkdirp-promise');
// const gcs = require('@google-cloud/storage')();
// const spawn = require('child-process-promise').spawn;
// const LOCAL_TMP_FOLDER = '/tmp/';

// // Max height and width of the thumbnail in pixels.
// const THUMB_MAX_HEIGHT = 640;
// const THUMB_MAX_WIDTH = 480;
// // Thumbnail prefix added to file names.
// const THUMB_PREFIX = 'thumb_';
// const thumbler = require('video-thumb');

// const fs = require("fs"); //Load the filesystem module
// var glob = require("glob")

// const Thumbler = require('thumbler');



// var n, uid, timestamp;



// const filePath = event.data.name;
// const filePathSplit = filePath.split('/');
// const fileName = filePathSplit.pop();
// const fileDir = filePathSplit.join('/') + (filePathSplit.length > 0 ? '/' : '');
// const thumbFilePath = `${fileDir}${THUMB_PREFIX}${fileName}`;
// const tempLocalDir = `${LOCAL_TMP_FOLDER}${fileDir}`;
// const tempLocalFile = `${tempLocalDir}${fileName}`;
// const tempLocalThumbFile = `${LOCAL_TMP_FOLDER}${thumbFilePath}`;


// // Exit if this is triggered on a file that is not an image.
// console.log(event.data)
// if (!event.data.contentType.startsWith('video/')) {
//     console.log('This is not an video.');
//     return;
// }

// // Exit if this is a move or deletion event.
// if (event.data.resourceState === 'not_exists') {
//     console.log('This is a deletion event.');
//     return;
// }

// // Create the temp directory where the storage file will be downloaded.
// console.log('tmpdir' + tempLocalDir)
// return mkdirp(tempLocalDir).then(() => {
//     // Download file from bucket.
//     console.log('bucket' + event.data.bucket)

//     //find uid & timestamp from filename
//     n = event.data.name.split('/');
//     uid = n[1];
//     timestamp = n[2].split('.')[0];

//     console.log('n ' + n)
//     console.log('ts ' + timestamp)

//     const bucket = gcs.bucket(event.data.bucket);
//     return bucket.file(filePath).download({
//         destination: tempLocalFile
//     }).then(() => {
//         console.log('The file has been downloaded to', tempLocalFile);
//         // Generate a thumbnail using ImageMagick.


//         return Thumbler({
//             type: 'video',
//             input: tempLocalFile,
//             output: '/tmp/snapshot.jpg',
//             time: '00:00:01',
//             size: '640x480' // this optional if null will use the destination of the video 
//         }, function(err, path) {
//             console.log(err)
//             console.log(path)


//             if (err) {
//                 console.log('--errr ' + err)
//                 return err;
//             }

//             console.log('--n ' + n)
//             console.log('--ts ' + timestamp)

//             bucket.upload('/tmp/snapshot.jpg', {
//                 destination: 'thumbs/' + uid + '/' + timestamp + '.jpg'
//             }).then(() => {
//                 var db = admin.database();
//                 var ref = db.ref("clips").child(uid).child(timestamp).update({

//                     thumbs: {
//                         'src': 'https://storage.cloud.google.com/dride-2384f.appspot.com/thumbs/' + uid + '/' + timestamp + '.jpg'
//                     },
//                     active: 1

//                 })

//                 console.log('Thumbnail uploaded to Storage at', path);
//             });


//             return path;
//         });


//     });
// });
