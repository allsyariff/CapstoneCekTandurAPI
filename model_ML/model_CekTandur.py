import tensorflow as tf
import json

# Path ke file .tflite Anda
tflite_file_path = "cek_tandur.tflite"
json_output_path = "cek_tandur.json"

# Load model TFLite
with open(tflite_file_path, "rb") as f:
    tflite_model = f.read()

interpreter = tf.lite.Interpreter(model_content=tflite_model)
interpreter.allocate_tensors()

# Ekstrak detail model
model_details = {
    "inputs": [
        {
            "name": detail["name"],
            "shape": detail["shape"].tolist(),
            "dtype": str(detail["dtype"])
        }
        for detail in interpreter.get_input_details()
    ],
    "outputs": [
        {
            "name": detail["name"],
            "shape": detail["shape"].tolist(),
            "dtype": str(detail["dtype"])
        }
        for detail in interpreter.get_output_details()
    ]
}

# Simpan sebagai file JSON
with open(json_output_path, "w") as json_file:
    json.dump(model_details, json_file, indent=4)

print(f"File JSON berhasil disimpan di: {json_output_path}")
