import { useState } from 'react';

function CreatePlaylist({onCreation}) {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');

function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:8000/playlists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, genre })
        })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                return response.json();
            })
            .then(() => {
                onCreation(); //Refetch

                setTitle(''); //clear the form
                setGenre('');
            })
            .catch((err) => console.error('Error creating playlist:', err));
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='form-items'>
                <label htmlFor="name">Playlist Name</label>
                <input
                    id="name"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className='form-items'>
                <label htmlFor="genre">Genre</label>
                <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                >
                    <option value="">Select a genre</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="jazz">Jazz</option>
                    <option value="electronic">Electronic</option>
                </select>
            </div>

            <button type="submit" className="button ">Create Playlist</button>
        </form>
    )
}

export default CreatePlaylist