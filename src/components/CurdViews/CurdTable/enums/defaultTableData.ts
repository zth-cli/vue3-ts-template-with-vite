export const defaultTableData =
  process.env.MODE === 'production'
    ? []
    : [
        {
          creator: 'rzx007',
          id: 12,
          projectName: 'name',
          createDate: '12-11',
          description: 'w21',
          _disabled: 0,
        },
        {
          creator: 'rzx007',
          id: 13,
          projectName: 'name',
          createDate: '12-11',
          description: 'w21',
          _disabled: 0,
        },
      ]
