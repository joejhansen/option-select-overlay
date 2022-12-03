const { Schema, model } = require('mongoose');
const example = [
    {
        "playerIndex": 0,
        "port": 1,
        "characterId": 12,
        "characterColor": 0,
        "startStocks": 4,
        "type": 0,
        "teamId": 0,
        "controllerFix": "UCF",
        "nametag": "",
        "displayName": "TEST SLIPPI-JS",
        "connectCode": "PUSH#676",
        "userId": "QV2bSvShPUVT4ydFPOhfjb6BpEs2"
    },
    {
        "playerIndex": 1,
        "port": 2,
        "characterId": 23,
        "characterColor": 2,
        "startStocks": 4,
        "type": 0,
        "teamId": 1,
        "controllerFix": "UCF",
        "nametag": "",
        "displayName": "y",
        "connectCode": "NAEL#376",
        "userId": "LcGj7sD4TKTYLFe9E2FvPCVJnpk2"
    }
]
const displayNameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    displayName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        maxLength: 15,
    },
    codeIds: [{ type: Schema.Types.ObjectId, ref: 'CodeId' }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
})

const DisplayName = model('DisplayName', displayNameSchema)

module.exports = DisplayName