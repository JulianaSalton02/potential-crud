import { Schema, model } from "mongoose";

    const DeveloperSchema = new Schema({
      name:  { type: String },
      sex:   { type: String },
      age:   { type: Number },
      birthDate: { type: Date },
      hobby: { type: String },
      });
      
      export default model('Developer', DeveloperSchema);





