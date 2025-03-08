import { Card } from "antd"
import arceustlogo from "../assets/arceusteralogotransparent.png"

export const Home = () => {
    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem 5rem', }}>
            <Card variant={'outlined'} style={{ width: "50rem" }}>
                <div>
                    <img src={arceustlogo} alt="Arceust Era" style={{ height: "20vw", width: "20vw" }} />
                    <h1>
                        Welcome to the Poké-safari!
                    </h1>
                    <h2>
                        Sign-up for an account with us to play our Pokémon minigame!
                        <br />
                        With our game you can:
                        <ul className="welcome">
                            <li>Catch pokemon</li>
                            <li>View your party and inventory</li>
                            <li>Or go to the pokécenter to swap out or release your Pokémon!</li>
                        </ul>
                    </h2>
                </div>
            </Card>
        </div>
    )
}