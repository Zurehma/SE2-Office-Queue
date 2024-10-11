// Queue manager module

import ServiceDAO from "../dao/serviceDAO.mjs";

/**
 * Queue manager class
 */
function QueueManager() {
  this.queues = {};
  this.serviceDAO = new ServiceDAO();

  /**
   * Constructor
   */
  this.init = async () => {
    let services = await this.serviceDAO.getServices();
    services.forEach((service) => (this.queues[service.code] = { service: service, queue: [] }));
  };

  /**
   *
   * @param {*} serviceCode The service code of the queue you want to enqueue the new ticket
   * @returns
   * - **undefined** if the service code does not exist
   * - The ticket value that has added to the queue
   */
  this.enqueue = (serviceCode) => {
    if (!this.queues.hasOwnProperty(serviceCode)) return undefined;

    const ticket = serviceCode + (this.queues[serviceCode].queue.length + 1);
    this.queues[serviceCode].queue.push(ticket);
    return ticket;
  };

  /**
   *
   * @param {*} serviceCode The service code of the queue you want to dequeue the new ticket
   * @returns
   * - **undefined** if the service code does not exist or if the queue is empty
   * - The ticket value that has been removed from the queue
   */
  this.dequeue = (serviceCode) => {
    if (!this.queues.hasOwnProperty(serviceCode) || this.queues[serviceCode].queue.length === 0)
      return undefined;

    return this.queues[serviceCode].queue.shift();
  };

  /**
   *
   * @param {*} serviceCode The service code of the queue you want to check the length
   * @returns
   * - **undefined** if the service code does not exist
   * - **true** if the length of the queue is 0 else **false**
   */
  this.isEmpty = (serviceCode) => {
    if (!this.queues.hasOwnProperty(serviceCode)) return undefined;

    return this.queues[serviceCode].queue.length === 0;
  };

  /**
   *
   * @param {*} serviceCode The service code of the queue you want to check the length
   * @returns
   * - **undefined** if the service code does not exist
   * - The number of people in queue for the given service
   */
  this.length = (serviceCode) => {
    if (!this.queues.hasOwnProperty(serviceCode)) return undefined;

    return this.queues[serviceCode].queue.length;
  };

  /**
   *
   * @param {*} serviceCode The service code of the queue you want to check the length
   * @returns
   * - **undefined** if the service code does not exist
   * - The waiting time based on the number of people in queue
   */
  this.waitingTime = (serviceCode) => {
    if (!this.queues.hasOwnProperty(serviceCode)) return undefined;

    return this.queues[serviceCode].queue.length * this.queues[serviceCode].service.averageTime;
  };

  /**
   * Reset the queue manager
   */
  this.reset = () => {
    for (let serviceCode in this.queues) {
      if (this.queues.hasOwnProperty(serviceCode)) {
        this.queues[serviceCode].queue = [];
      }
    }
  };
}

export default QueueManager;
