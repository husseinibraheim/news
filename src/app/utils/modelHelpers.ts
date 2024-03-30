import { Model, Document, Query } from "mongoose";
import APIError from "./apiError";

export class ModelHelpers<T extends Document | any> {
  constructor(private Model: Model<T>) {
    this.Model = Model;
  }

  async paginate(criteria = {}, currentPage?: number, perPage?: number) {
    const totalItems = await this.Model.countDocuments(criteria);
    const totalPages = Math.ceil(totalItems / perPage);
    const skipAmount = (currentPage - 1) * perPage;

    const query = this.Model.find(criteria);
    if (currentPage && perPage) {
      query.limit(perPage).skip(skipAmount);
    }
    const data = await query.exec();
    return {
      data,
      currentPage,
      perPage,
      totalItems,
      totalPages,
    };
  }
  async sort(criteria: any = {}, sortBy: string, sortValue: number) {
    const sortOptions = {};
    sortOptions[sortBy] = sortValue;
    const data = this.Model.find(criteria).sort(sortOptions);
    return data;
  }

  async paginateAndSort(
    criteria: any = {},
    paginationOptions?: {
      currentPage?: number;
      perPage?: number;
    },
    sortOptions?: {
      sortBy: string;
      sortValue: 1 | -1;
    }
  ) {
    const totalItems = await this.Model.countDocuments(criteria);
    const totalPages = Math.ceil(totalItems / paginationOptions.perPage);
    const skipAmount =
      (paginationOptions.currentPage - 1) * paginationOptions.perPage;

    let query = this.Model.find(criteria);

    if (sortOptions) {
      query.sort({ [sortOptions.sortBy]: sortOptions.sortValue });
    }

    if (paginationOptions) {
      query.skip(skipAmount).limit(paginationOptions.perPage);
    }
    const data = await query.exec();

    return { data, totalItems, totalPages, ...paginationOptions };
  }
}
