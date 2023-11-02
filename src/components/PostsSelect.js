import React, { useEffect, useState } from 'react';
import { EuiComboBox } from '@elastic/eui';

const PostsSelect = ({ posts, isLoading, selectedOptions, setSelected, isError }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const transformedPosts = posts.map(post => ({ label: post.title, id: post.id }));
    setOptions(transformedPosts);
  }, [posts]);

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
      isLoading={isLoading}
      isInvalid={isError}
    />
  );
};

export default PostsSelect;