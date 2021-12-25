import React, { useContext } from 'react';
import { gitUserContext } from './gitUserContext';
import './GitUsers.css'

const GitUsers = () => {
    const githubUserContext = useContext(gitUserContext)
    return (
        <div>
            {githubUserContext.isLoading ? (
                <h3>Loading</h3>
            ) : (
                <ul>
                    {githubUserContext.error ? <p>{githubUserContext.error}</p> : githubUserContext.users.length < 1 ?
                        <p>No Results Found</p>
                        : githubUserContext.users.map((user) =>
                            <li key={user.id}>
                                <div class="column">
    <div class="card">
      <img src={user.avatar_url} alt="user-pic"/>
      <div class="container">
        <h2>{user.login}</h2>
        <p><button class="button"><a href={`https://www.github.com/${user.login}`} rel="noopener noreferrer" target="_blank">
                                  Open User Profile</a></button></p>
      </div>
    </div>
  </div>
                                 
                            </li>)}
                </ul>)
            }
        </div>
    );
}

export default GitUsers;