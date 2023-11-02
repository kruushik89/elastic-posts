import { EuiButton, EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import PostsSelect from "./components/PostsSelect";
import { PostsTable } from "./components/PostsTable";
import { useEffect, useState } from "react";
import { getAllPosts } from "./services/posts";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedOptions, setSelected] = useState([]);
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = () => setSelectedPosts(selectedOptions);

  return (
    <EuiProvider colorMode="light">
      <div className="app">
        <div className="app-select">
          <PostsSelect
            posts={posts}
            isLoading={isLoading}
            selectedOptions={selectedOptions}
            setSelected={setSelected}
            isError={error}
          />
          <EuiButton
            color="primary"
            isDisabled={!selectedOptions.length}
            onClick={handleSubmit}
            className="app-submit"
          >
            Submit
          </EuiButton>
        </div>
        <div className="app-table">
          <PostsTable selectedPosts={selectedPosts}/>
        </div>
      </div>
    </EuiProvider>
  );
}

export default App;
