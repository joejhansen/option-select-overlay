import { useQuery } from "@apollo/client"
import { QUERY_CONNECT_CODES } from "../../../../utils/apollo/queries"
import { Link } from "react-router-dom"
const ConnectCodeAll = ({ theme }) => {
    const { loading, data } = useQuery(QUERY_CONNECT_CODES)

    const styles = {
        card: {
            backgroundColor: theme.primary,
            color: theme.text,
            position: 'relative',
            border: `solid ${theme.text} 2px`,
            bordeRadius: '.333rem',
            boxShadow: `-5px 5px 0px 3px ${theme.accent}`,
            margin: `1rem 0`
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        },
        entryWrapper: {
            padding: '.5rem'
        },
        gameScroll: {
            maxHeight: '15rem',
            overflow: 'auto'
        }
    }

    const renderConnectCodes = (data) => {
        let render = []
        for (let codeId of data.codeIds) {
            let displayNames = []
            for (let displayName of codeId.displayNames) {
                const linkToDisplayName = `../../displayname/${displayName._id}`
                displayNames.push(
                    <li key={displayName.displayName}><Link to={linkToDisplayName} style={styles.link}>{displayName.displayName}</Link></li>
                )
            }
            let games = []
            for (let game of codeId.games) {
                const linkToGame = `../../game/${game._id}`
                const date = new Date(parseInt(game.metadata.startAt))
                const localDate = date.toLocaleDateString()
                const localTime = date.toLocaleTimeString()
                games.push(<li key={game._id}>Played on <Link to={linkToGame} style={styles.link}>{localDate} at {localTime}</Link></li>)
            }
            const codeIdLink = codeId.connectCode.replace('#','-')
            const linkToConnectCode = `../${codeIdLink}`
            render.push(
                <div className='row' key={codeId.connectCode}>
                    <div className="col">
                        <div className="card" style={styles.card}>
                            <div style={styles.entryWrapper}>
                                <p><Link to={linkToConnectCode} style={styles.link}>{codeId.connectCode}</Link></p>
                                <p>{codeId.createdAt}</p>
                                <p>Display Names</p>
                                <ul>{displayNames}</ul>
                                <p>Games</p>
                                <ul style={styles.gameScroll}>{games}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (render)
    }

    return (
        <div className="container">
            {loading ? <p>loading</p> : renderConnectCodes(data)}

        </div>
    )
}

export default ConnectCodeAll