const { Inhibitor } = require('gcommands')

class OwnerOnlyInhibitor extends Inhibitor.Inhibitor {
    constructor(options) {
        super(options)

        this.ownerIds = ['1007665529189843205', '1054127027730518199']
    }

    run(ctx) {
        if (!this.ownerIds.includes(ctx.userId)) return ctx.reply(this.resolveMessage(ctx) || 'Pode não')
        else return true 
    }
}

module.exports = OwnerOnlyInhibitor
    