const tf = require("@tensorflow/tfjs-node");
async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const predictionArray = prediction.dataSync();
    const probability = predictionArray[0];
    const label = probability > 0.5 ? "Cancer" : "Non-cancer";

    let suggestion;

    if (label === "Cancer") {
      suggestion = "Segera periksa ke dokter";
    } else if (label === "Non-cancer") {
      suggestion = "Kamu kemungkinan besar tidak memiliki kanker!";
    }

    return { label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
