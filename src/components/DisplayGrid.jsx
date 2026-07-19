import { Link } from "react-router"
function Card(props) {

    function handleDelete(e){
        e.preventDefault();
        e.stopPropagation();

        fetch(`import.meta.env.VITE_API_URL/${props.id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            props.onDelete(); // tell parent to refetch playlists
            })
            .catch((err) => console.error('Error deleting playlist:', err));
    }
    
    return (
        <>
            <Link to={"/"}>
                <div  className="playlist-card">
                    <button className="del-button" onClick={handleDelete}>🗑️</button>
                    <h2>{props.title}</h2>
                    <p>{props.count} songs</p>
                </div>
            </Link>
        </>

    )
}

function DisplayGrid({playlists, loading, error, onDelete}) {

    if (loading) return <p>Loading playlists...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="playlist-grid">
            {playlists.map((playlist) => (
                <Card
                    key={playlist.id}
                    id={playlist.id}
                    title={playlist.title}
                    onDelete={onDelete}
                    // count={playlists.length}
                />
            ))}
        </div>
    )
}

export default DisplayGrid