import React from 'react';
import { EuiBasicTable, } from '@elastic/eui';

export const PostsTable = ({ selectedPosts }) => {
  const columns = [
    {
      field: 'id',
      name: 'ID',
      'data-test-subj': 'idCell',
    },
    {
      field: 'label',
      name: 'Title',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
  ];
  const getRowProps = (post) => {
    const { id } = post;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
    };
  };

  const getCellProps = (post, column) => {
    const { id } = post;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${String(field)}`,
      textOnly: true,
    };
  };

  return (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable"
      items={selectedPosts}
      rowHeader="firstName!!"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};