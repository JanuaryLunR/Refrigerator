const { ServiceBroker } = require("moleculer");
const { MongoAdapter } = require("moleculer-db-adapter-mongo");

const broker = new ServiceBroker({
    nodeID: "user-service",
    transporter: "NATS"
});

// Add your user service actions and methods here
broker.createService({
    name: "user",
    adapter: new MongoAdapter(process.env.MONGO_URI),
    collection: "users",
    actions: {
        async list(ctx) {
            return this.adapter.find(ctx.params);
        },
        async get(ctx) {
            return this.adapter.findById(ctx.params.id);
        },
        async create(ctx) {
            return this.adapter.insert(ctx.params);
        },
        async update(ctx) {
            return this.adapter.updateById(ctx.params.id, ctx.params);
        },
        async remove(ctx) {
            return this.adapter.removeById(ctx.params.id);
        }
    }
});

module.exports = broker;

module.exports = broker;
