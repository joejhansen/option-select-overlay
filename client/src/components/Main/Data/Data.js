import { Outlet, NavLink } from "react-router-dom"

const Data = ({ theme }) => {
    const styles = {
        ul: {
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            padding: '0',
            // color: theme ? theme.text : 'black',
        },
        active: {
            color: theme.accent,
            textDecoration: 'none',
        },
        inactive: {
            color: theme.text,
            textDecoration: 'none',
        }
    }
    return (
        <div className="container">
            <p>Data</p>
            <div className="row">
                <div className="col">
                    <ul style={styles.ul}>
                        <li>

                            <NavLink
                                style={({ isActive }) => {
                                    return (
                                        isActive
                                            ? styles.active
                                            : styles.inactive
                                    )
                                }}
                                to={`/data/connectcode`}>
                                Connect Codes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return (
                                        isActive
                                            ? styles.active
                                            : styles.inactive
                                    )
                                }}
                                to={`/data/displayname`}>
                                Display Names
                            </NavLink>

                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return (
                                        isActive
                                            ? styles.active
                                            : styles.inactive
                                    )
                                }}
                                to={`/data/game`}>
                                Games
                            </NavLink>

                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Data