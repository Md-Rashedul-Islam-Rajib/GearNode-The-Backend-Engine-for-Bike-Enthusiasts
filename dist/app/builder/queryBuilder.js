"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            const regexQuery = searchableFields.map((field) => ({
                [field]: { $regex: search, $options: 'i' },
            }));
            this.modelQuery = this.modelQuery.find({
                $or: regexQuery,
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        // Exclude non-filter fields directly using a set
        const excludeFields = new Set([
            'search',
            'minPrice',
            'maxPrice',
            'sortBy',
            'sortOrder',
            'filter',
            'limit',
            'page',
            'fields',
        ]);
        for (const key of Object.keys(queryObj)) {
            if (excludeFields.has(key)) {
                delete queryObj[key];
            }
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    authorFilter() {
        var _a;
        const id = (_a = this.query) === null || _a === void 0 ? void 0 : _a.filter;
        if (id) {
            this.modelQuery = this.modelQuery.find({ author: id });
        }
        return this;
    }
    // sort() {
    //   const sortFields =
    //     (this.query?.sort as string)?.split(',').join(' ') || '-createdAt';
    //   this.modelQuery = this.modelQuery.sort(sortFields);
    //   return this;
    // }
    sort() {
        var _a, _b;
        const sortBy = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || 'createdAt';
        const sortOrder = ((_b = this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) || 'desc';
        // Add sorting to the query
        const sortQuery = {};
        sortQuery[sortBy] = sortOrder === 'desc' ? -1 : 1;
        // Ensure sort direction is -1 (desc) or 1 (asc)
        this.modelQuery = this.modelQuery.sort(sortQuery);
        return this;
    }
    // paginate() {
    //   const page = Math.max(Number(this.query?.page) || 1, 1); // Ensure page >= 1
    //   const limit = Math.max(Number(this.query?.limit) || 10, 1); // Ensure limit >= 1
    //   const skip = (page - 1) * limit;
    //   this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    //   return this;
    // }
    // fields() {
    //   const fieldsToSelect =
    //     (this.query?.fields as string)?.split(',').join(' ') || '-__v';
    //   this.modelQuery = this.modelQuery.select(fieldsToSelect);
    //   return this;
    // }
    getQuery() {
        return this.modelQuery;
    }
}
exports.default = QueryBuilder;
