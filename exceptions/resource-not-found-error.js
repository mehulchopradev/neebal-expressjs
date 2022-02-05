export default class ResourceNotFoundError extends Error {
  constructor(resourceId) {
    super();
    this.resourceId = resourceId;
  }
}