import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { CATCH_POKEMON, SAVE_ITEM } from "../utils/mutations"
import { QUERY_ME } from "../utils/queries"
import Auth from "../utils/auth";
import '../assets/biome.css'
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "antd"
import beachimg from "../assets/beach.jpg";
import oceanimg from "../assets/ocean.jpg";
// Function found at https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export const Beach = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        const loggedIn = Auth.loggedIn();
        if (loggedIn === true) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            Auth.logout();
            navigate('/login');
        }
    }, [location]);

    const [catchPkmn, { error }] = useMutation(CATCH_POKEMON);
    const [saveItem, states] = useMutation(SAVE_ITEM);
    const { data, refetch } = useQuery(QUERY_ME);
    useEffect(() => {
        refetch();
    }, [data]);

    const [loading, setloading] = useState(true);
    const [poke, setPoke] = useState<Record<string, any>>({});
    const [isShiny, setShiny] = useState<boolean>(false);
    const [item, setItem] = useState<Record<string, any>>({});
    const [narration, setNarration] = useState<string>('');
    const [clicked, setClicked] = useState<boolean>(false);
    const [setting, setSetting] = useState('beach');

    const getPokemon = async (id: any) => {
        if (id === 'walk') {
            try {
                const pokeArr = ["Krabby", "Kingler", "Sandygast", "Palossand", "Staryu", "Slowpoke", "Stunfisk", "Tirtouga", "Carracosta", "Pyukumuku", "Wimpod", "Golisopod", "Gimmighoul", "Wigglet", "Wugtrio"]
                const randomPokemonChoice = pokeArr[Math.floor(Math.random() * pokeArr.length)]
                const randomPokemon = randomPokemonChoice.toLowerCase();
                console.log(`Random pokemon: ${randomPokemon}`);
                const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
                const response = encounter.json();
                console.log(response);
                return response;
            } catch (err) {
                console.error("Pokemon not found!");
            }
        } else if (id === 'fish') {
            try {
                const pokeArr = ["Magikarp", "Gyarados", "Horsea", "Seadra", "Kingdra", "Dratini", "Dragonair", "Dhelmise", "Mareanie", "Toxapex", "Feebas", "Milotic", "Goldeen", "Seaking", "Tentacool", "Tentacruel", "Chinchou", "Lanturn", "Kabuto", "Kabutops", "Bruxish", "Veluza", "Luvdisc", "Remoraid", "Octillery", "Clamperl", "Huntail", "Gorebyss"]
                const randomPokemonChoice = pokeArr[Math.floor(Math.random() * pokeArr.length)];
                const randomPokemon = randomPokemonChoice.toLowerCase();
                const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
                const response = encounter.json();
                console.log(response);
                return response;
            } catch (err) {
                console.error("Pokemon not found!");
            }
        } else if (id === 'surf') {
            try {
                const pokeArr = ["Basculin", "Basculegion", "Frillish", "Jellicent", "Froakie", "Frogadier", "Greninja", "Piplup", "Prinplup", "Empoleon", "Seel", "Dewgong", "Lapras", "Vaporeon", "Tentacool", "Tentacruel", "Mantyke", "Mantine", "Wailmer", "Wailord"]
                const randomPokemonChoice = pokeArr[Math.floor(Math.random() * pokeArr.length)];
                const randomPokemon = randomPokemonChoice.toLowerCase();
                const encounter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
                const response = encounter.json();
                console.log(response);
                return response;
            } catch (err) {
                console.error("Pokemon not found!");
            }
        }
    }


    const getItem = async (id: any) => {
        if (id === 'walk') {
            try {
                const itemArr = ["potion", "poke-ball", "heart-scale", "soft-sand", "shell-bell"];
                const randomItem = itemArr[Math.floor(Math.random() * itemArr.length)];
                const find = await fetch(`https://pokeapi.co/api/v2/item/${randomItem}`);
                const response = find.json();
                console.log(response);
                return response;
            } catch (err) {
                console.error("Item not found!");
            }
        } else if (id === 'fish') {
            try {
                const itemArr = ["expert-belt", "amulet-coin", "choice-band", "choice-scarf", "silk-scarf"];
                const randomItem = itemArr[Math.floor(Math.random() * itemArr.length)];
                const find = await fetch(`https://pokeapi.co/api/v2/item/${randomItem}`);
                const response = find.json();
                console.log(response);
                return response;
            } catch (err) {
                console.error("Item not found!");
            }
        } else if (id === 'surf') {
            try {
                const itemArr = ["float-stone", "water-gem"];
                const randomItem = itemArr[Math.floor(Math.random() * itemArr.length)];
                const find = await fetch(`https://pokeapi.co/api/v2/item/${randomItem}`);
                const response = find.json();
                console.log(response);
                return response;
            } catch (err) {
                console.error("Item not found!");
            }
        }

    }

    useEffect(() => {
    }, [setting, narration])

    // const shinyChance = () => {
    // const shinyChance = Math.random()
    // if (shinyChance > .80) {
    //     shiny = true
    // }
    // return shiny
    // }
    // For future ref, call click functions handleclick
    const roll = (event: any) => {
        setClicked(true)
        const chances = [1, 2, 3]
        const randomNum = chances[Math.floor(Math.random() * chances.length)]
        console.log(randomNum)
        if (randomNum === 1) {
            setloading(true)
            getPokemon(event.target.id).then((pokemon) => {
                setPoke(pokemon); console.log(pokemon)
                const shinyChance = Math.random()
                if (shinyChance > .8) {
                    setShiny(true)
                } else {
                    setShiny(false)
                }
                console.log(isShiny)
                setNarration(`A wild ${toTitleCase(pokemon.name)} appeared!
                Go, ${toTitleCase(data.Me.team[0].name)}!`)

            })
            setItem({})
        } else if (randomNum === 2) {
            getItem(event.target.id).then((item) => { setItem(item); console.log(item); setNarration(`You found a(n) ${toTitleCase(item.name)}!`) })
            setPoke({})
        } else if (randomNum === 3 && event.target.id === 'walk' || event.target.id === 'surf' || event.target.id === 'fish') {
            setPoke({})
            setItem({})
            setNarration("Nothing appeared...")
        }
        //also get random item
        setloading(false)

    }
    const handleCatchPokemon = async () => {
        const coinFlip = Math.random()
        if (coinFlip >= .5) {
            setNarration(`Congratulations! You caught the ${toTitleCase(poke.name)}!`)
            setPoke({})
            let storedPokemon;
            if (isShiny) {
                storedPokemon = {
                    name: poke.name,
                    pokemonId: poke.id,
                    front_sprite: poke.sprites.front_shiny,
                    back_sprite: poke.sprites.back_shiny
                }
            } else {
                storedPokemon = {
                    name: poke.name,
                    pokemonId: poke.id,
                    front_sprite: poke.sprites.front_default,
                    back_sprite: poke.sprites.back_default
                }
            }
            try {
                await catchPkmn({
                    variables: { input: { ...storedPokemon } },
                });
                if (error) {
                    throw new Error(`Couldn't catch pokemon!`)
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            setNarration(`Get some better pokeballs dweeb`)
        }
    }

    const grabItem = async () => {
        setNarration(`You picked up the ${toTitleCase(item.name)}.`)
        setItem({})
        // TODO: Set up graphql mutations to handle adding items to inventory
        try {
            const itemInfo = {
                name: item.name,
                itemId: item.id,
                sprite: item.sprites.default
            }

            await saveItem({
                variables: { input: { ...itemInfo } }
            })
            if (states.error) {
                throw new Error('Nice try butterfingers')
            }

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            {loggedIn &&
                <div className="biome-container">
                    {!clicked && <h1>You go to the beach.</h1>}
                    {clicked && <h1>{narration}</h1>}
                    <div className="biomediv">
                        {setting === 'beach' && <img className="biomeimg" src={beachimg} alt="beach" />}
                        {setting === 'ocean' && <img className="biomeimg" src={oceanimg} alt="ocean" />}
                        {!loading && poke && !isShiny && <img className='wildpokeimg' src={poke?.sprites?.front_default} alt={poke.name} />}
                        {!loading && poke && isShiny && <img className='wildpokeimg' src={poke?.sprites?.front_shiny} alt={poke.name} />}
                        {!loading && data.Me && <img className='mypokemon' src={data?.Me?.team[0]?.back_sprite} />}
                        {!loading && item && <img className='itemimg' src={item?.sprites?.default} alt={item.name} />}
                    </div>
                    <div className="acnbtndiv">
                        <div className='priacndiv'>
                            <button className='acnbtn' id="walk" onClick={(event) => {
                                roll(event)
                                setSetting('beach')

                            }
                            }>Walk</button>

                            <button className='acnbtn' id="fish" onClick={(event) => roll(event)
                            }>Fish</button>

                            <button className='acnbtn' id="surf" onClick={(event) => {
                                roll(event)
                                setSetting('ocean')

                            }
                            }>Surf</button>
                        </div>
                        <div className='secacndiv'>
                            {clicked && poke.name && <button className='acnbtn' onClick={() => {
                                handleCatchPokemon()
                            }}>Catch it!</button>}
                            {clicked && item.name && <button className='acnbtn' onClick={() => {
                                grabItem()
                            }}
                            >Pick up!</button>}
                        </div>
                    </div>
                </div>}
            {!loggedIn &&
                <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'margin': '3rem' }}>
                    <Card variant={"outlined"} style={{ width: 300 }}>
                        <p>
                            You must be logged in to view this page!
                            <br />
                            Redirecting...
                        </p>
                    </Card>
                </div>
            }
        </>
    )
}