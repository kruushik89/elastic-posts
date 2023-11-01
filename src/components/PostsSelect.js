import React, { useEffect, useState } from 'react';
import { getAllPosts } from "../services/posts";
import { EuiComboBox } from '@elastic/eui';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const getPosts = async () => {
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const transformedPosts = posts.map(post => ({ label: post.title, id: post.id }));
    setOptions(transformedPosts);
  }, [posts]);

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelected] = useState([]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      setOptions([...options, newOption]);
    }

    setSelected([...selectedOptions, newOption]);
  };

  return (
    <EuiComboBox
      aria-label="Accessible screen reader label"
      placeholder="Select posts"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      isClearable={true}
      data-test-subj="demoComboBox"
      autoFocus
    />
  );
};

export default Posts;