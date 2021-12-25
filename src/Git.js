import React, { useEffect } from "react";
import { GitUserProvider } from "./gitUserContext";
import GitUsers from "./GitUsers";
import './Git.css';

const Git = () => {

    const [search, setsearch] = React.useState('');
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const getUsers = async (search) => {
        if (search !== "") {
            setIsLoading(true);
            await fetch(`https://api.github.com/search/users?q=${search}&limit=24`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        setError(data.message);
                    }
                    setUsers(data.items)
                    setIsLoading(false);
                })
        } else {
            setUsers([]);
        }
    }

    useEffect(() => {
        getUsers(search);
    }, [search]);

    const githubUserContent = { search, error, users, isLoading }
    return (
        <GitUserProvider value={githubUserContent}>
            <div className='gitusers'>
            <h1 className="title">GitHub User Searcher</h1>
            <input type='text' placeholder="type a user..." onChange={(event) => setsearch(event.target.value)}></input>
            </div>
            <div className='gitusers'>
            <GitUsers />
            </div>
        </GitUserProvider>);
}
export default Git;