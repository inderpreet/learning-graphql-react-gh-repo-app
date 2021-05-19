import React, { useCallback, useEffect, useState } from "react";
import github from "./db";
import query from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";

function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("pic32");
  let [totalCount, setTotalCount] = useState(null);

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString));
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes;
        const total = data.data.search.repositoryCount;
        setUserName(viewer.login);
        setRepoList(repos);
        setTotalCount(total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageCount, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>Repos
      </h1>
      <p>Hey there {userName}</p>

      <p>
        <b>Search for:</b> {queryString} | <b>Items per Page:</b> {pageCount} |{" "}
        <b>Total Items:</b> {totalCount}
      </p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(q) => {
          setQueryString(q);
        }}
        onTotalChange={(num) => {
          setPageCount(num);
        }}
      />

      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo, index) => (
            <RepoInfo key={index} repo={repo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
