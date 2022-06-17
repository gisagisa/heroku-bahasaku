var model, mask_model, ctx, videoWidth, videoHeight, canvas;
const video = document.getElementById("videoElement");
const state = {
  backend: "webgl",
};
async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "user" },
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

const renderPrediction = async () => {
    tf.engine().startScope()
    //estimatefaces model takes in 4 parameter (1) video, returnTensors, flipHorizontal, and annotateBoxes
    const predictions = await model.predict(video);
    console.log(predictions)
    //update frame
    requestAnimationFrame(renderPrediction);
    tf.engine().endScope()
};



const setupPage = async () => {
    await tf.setBackend(state.backend);
    await setupCamera();
    video.play();

    videoWidth = video.videoWidth;
    videoHeight = video.videoHeight;
    video.width = videoWidth;
    video.height = videoHeight;

    
    model = await tf.loadLayersModel('model/model.json');

   renderPrediction();
};

setupPage();
