const CrudRepository = require("./crud-repository");
const { Ticket } = require("../models");
const { ENUM } = require("../utils/common");
const { PENDING } = ENUM.TICKET_STATUS_ENUMS;

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
    }
    
    async getPendingTickets() {
        const response = await Ticket.findAll({
            where: {
                status: PENDING
            }
        });
        return response;
    }
}

module.exports = TicketRepository;
