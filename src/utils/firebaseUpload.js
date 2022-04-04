import { storage } from "./firebase"
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
async function handleUpload(file) {
    return new Promise(function (resolve, reject) {
        const ranInt = Math.floor(Math.random() * 100000) + 1000
        console.log(ranInt)
        const storageRef = ref(storage, `/images/${ranInt}${file.name}`);
        // const uploadTask = ref.put(file);
        const metadata = {
            contentType: 'image/jpeg'
        };
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;

                    default:
                        console.log('Default in upload');
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        reject()
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        reject()
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;

                    default:
                        console.log('Default in upload error');
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });
    // uploadTask.on("state_changed", console.log, console.error, () => {
    //   ref
    //     .getDownloadURL()
    //     .then((url) => {
    //       setFile(null);
    //       console.log('URL: ', url);
    //       setURL(url);
    //     });
    // });
}

export { handleUpload }