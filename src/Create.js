import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Ajay');
    const [isPending, setIspending] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        setIspending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('New blog posted');
            setIspending(false);
            navigate('/');
        })
    }

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label >Blog Title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

                <label >Blog Body:</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

                <label >Blog Author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Ajay">Ajay</option>
                    <option value="Aman">Aman</option>
                </select>
                {isPending && <button>Adding blog...</button>}
                {!isPending && <button>Add blog</button>}

            </form>
        </div>
    );
}

export default Create;