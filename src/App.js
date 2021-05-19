import React, {useCallback, useEffect, useState} from 'react';
import github from "./db";
import query from "./Query";
import RepoInfo from './RepoInfo';

function App() {

    let [userName, setUserName] = useState('');
    let [repoList, setRepoList] = useState(null);

    const fetchData = useCallback(() => {
        fetch(github.baseURL, {
            method: "POST",
            headers: github.headers,
            body: JSON.stringify(query),
        })
            .then((resp) => resp.json())
            .then((data) => {
                const viewer = data.data.viewer;
                const repos = data.data.search.nodes;
                console.log(repos);
                setUserName(viewer.login);
                setRepoList(repos);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="App container mt-5">
            <h1 className="text-primary">
                <i className="bi bi-diagram-2-fill"></i>Repos
            </h1>
            <p>
                Hey there {userName}
            </p>

            { repoList && (
                    <ul className='list-group list-group-flush'>
                        { repoList.map( (repo, index) => (
                                <RepoInfo key={index} repo={repo}/>
                        ))
                        }
                    </ul>
                )
            }
        </div>
    );
}

export default App;
