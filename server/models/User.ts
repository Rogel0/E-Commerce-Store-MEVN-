const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: false },
  fullName: { type: String, required: false },
  profilePicture: { type: String, required: false },
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip: { type: Number, required: false },
  },
});

export default model("User", userSchema);
