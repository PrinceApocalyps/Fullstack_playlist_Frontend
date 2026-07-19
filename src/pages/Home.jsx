import NavBar from "../components/Navbar";
import DisplayGrid from "../components/DisplayGrid";
import CreatePlaylist from "../components/CreatePlaylist";
import { useState, useEffect, useCallback } from "react";


function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHidden, setIsHidden] = useState(true);

    const fetchPlaylist = useCallback(()=>{
        fetch("http://localhost:8000/playlists")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPlaylists(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    },[]);

    useEffect(()=>{
        fetchPlaylist();
    }, [fetchPlaylist])

    function toggleHidden(){
        setIsHidden(!isHidden)
    }

    return (
        <>
            <NavBar></NavBar>
            <div>
                <span className="title-container">
                    <h1>Your Playlists</h1>
                    <button onClick={toggleHidden} className="button">New Playlist</button>
                </span>
                <div className="grid-container">
                    <DisplayGrid playlists={playlists} loading={loading} error={error} onDelete={fetchPlaylist}></DisplayGrid>
                </div>
                <div className={`${isHidden ? 'hidden' : ''}`}>
                    <CreatePlaylist onCreation={fetchPlaylist}></CreatePlaylist>
                </div>
            </div>

            
        </>
    )
}

export default Home