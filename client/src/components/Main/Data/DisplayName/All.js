import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { QUERY_DISPLAY_NAMES } from "../../../../utils/apollo/queries"
import { Link } from "react-router-dom"

const DisplayName = ({ theme }) => {
    const { loading, data } = useQuery(QUERY_DISPLAY_NAMES)
    const styles = {
        card: {
            backgroundColor: theme.primary,
            color: theme.text
        },
        link: {
            textDecoration: 'none',
            color: theme.accent
        }
    }
    useEffect(() => {
    }, [])

    const renderDisplayNames = (data) => {
        const names = data.displayNames
        let render = []
        for (let name of names) {
            const linkToDisplayName = `../${name._id}`
            const renderConnectCodes = []
            for (let code of name.codeIds) {
                const linkToConnectCode = `../../connectcode/${code._id}`
                renderConnectCodes.push(<li><Link to={linkToConnectCode} style={styles.link}>{code.connectCode}</Link></li>)
            }
            render.push(
                <div className='row'>
                    <div className="col">
                        <div className="card" style={styles.card}>
                            <p><Link to={linkToDisplayName} style={styles.link}>{name.displayName}</Link></p>
                            <p>Connect Codes</p>
                            <ul>{renderConnectCodes}</ul>
                        </div>
                    </div>
                </div>

            )
        }
        return render
    }

    return (
        <div className="container">
            {loading ? <p>loading</p> : renderDisplayNames(data)}

        </div>
    )
}

export default DisplayName