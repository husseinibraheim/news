import { Model, Document } from "mongoose";
import { ModelHelpers } from "../utils/modelHelpers";

class UserServices<T extends Document | any> {
  private ModelHelpers: ModelHelpers<T>;

  constructor(private Model: Model<T>) {
    this.ModelHelpers = new ModelHelpers<T>(Model);
  }
  create = (data: any) => {
    return new this.Model(data).save();
  };

  findOne = (id: string) => {
    return this.Model.findById(id);
  };
  update = (id: string, data: any) => {
    return this.Model.findByIdAndUpdate(id, data, { new: true });
  };
  delete = (id: string) => {
    return this.Model.findByIdAndDelete(id);
  };
  getAll = () => {
    return this.Model.find({});
  }
}

export default UserServices;
