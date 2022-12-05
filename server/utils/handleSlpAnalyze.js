const handleSlpAnalyze = (payload) => {
    const {
        settings,                           //object     
        metadata,                           //object
        stats,                              //object
        // frames,                          //object
        rollbackFrames,                     //object
        winners                             //object
    } = payload

    //players is an array of at least 2 objects
    const {
        slpVersion,                         //string matching /\d{0,3}.\d{0,3}.\d{0,3}/
        isTeams,                            //boolean
        isPAL,                              //boolean
        stageId,                            //num
        players: playersSettings,           //array. players is shared as a keyname throughout
        scene,                              //num
        gameMode,                           //num
        language                            //num
    } = settings
    const player1 = playersSettings[0]
    const {
        playerIndex: playerIndex1,          //num
        port: port1,                        //num
        characterId: characterId1,          //num
        characterColor: characterColor1,    //num
        startStocks: startStocks1,          //num
        type: type1,                        //num
        teamId: teamId1,                    //num
        controllerFix: controllerFix1,      //string that may or may not be "UCF" for universal controller fix
        nametag: nametag1,                  //string, usually empty ''
        displayName: displayName1,          //string length {1,15} per slippi.gg rules
        connectCode: connectCode1,          //string that will be /\w{1,4}#\d{1,3}/
        userId: userId1                     //string. this is a uuid made through slippi.gg account
    } = player1
    const player2 = playersSettings[1]
    const player3 = playersSettings[2]
    const player4 = playersSettings[3]

    //players is an object with at least two players denoted by their index, 0 through 3 at most for ports 1-4
    const {
        startAt,                            //string. example : "2022-12-05T03:43:00Z"
        lastFrame,                          //num
        players: playersMetadata,           //object with object where keys = index
        playedOn                            //string. usually 'dolphin'
    } = metadata
    // TODO: convert PlayersMetadata to an array in the order of the playerindex or else the mongoose model wont work
    // TODO: convert players.characters to just 'character' where the value is a number equal to the keyvalue of the original object. see below
    // for some reason, players.characters is "characterNum": "someRandomNumIDKWhatIt'sFor", so let's get rid of the value and just use the key as a number

    const {
        lastFrames,                         //num
        playableFrameCount,                 //num
        stocks,                             //array of objects in chronological order by the frame the stock was lost.
        conversions,                        //array of objects in chronological order by the frame the combo->kill starts
        combos,                             //array of objects in chronological order by the frame the combo starts. will include everything in array in line above
        actionCounts,                       //array of objects equal to the ammount of players in that game, ordered by playerindex
        overall,                            //array of objects equal to the ammount of players in that game, ordered by playerindex
        gameComplete                        //boolean. checking for quit-outs(LRAStart)
    } = stats
    // TODO: parse stocks, conversions, combos, and overall for juicy info
    // stats does not include any reference to the DisplayName or ConnectCode

    //all of these may be 0 if played on a local connection, therefore no lag and no need for rollback
    const {
        frames: framesRollback,             //object
        count,                              //num = framesRollback length
        lengths                             //array. not sure what this is
    } = rollbackFrames

    //this is an array for some reason. idk why. maybe for teams? we destructure it and then put the stuff in an object for conformity
    const winnersParsed = { ...winners }
    // TODO: parse this into an array as well for mongoose


    // we're doing frames last just in case
    // and we're going to use lodash because i'm scared to do this with vanilla
    // so, frames is an object containing more objects with keys representing their index i.e. the first object on the top level is a frame with key '0', the next is the frame with key '1', and so on
    // and we need to return useful data from this.
    // i'm probably just going to do this seperately because it's a shitload of data to iterate through.

    // now we convert to the model shapes
}