export const orderOptions = [
    { label: 'Random', value: 'random' },
    { label: 'Desc', value: 'desc' },
    { label: 'Asc', value: 'asc' },
 ];

 export const typeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Static', value: 'static' },
  { label: 'Animated', value: 'animated' },
];

const arr = new Array(4).fill(1);
export const optionsLimit = arr.map((_, idx) => ({
    label: `Limit: ${(idx + 1) * 5}`,
    value: (idx + 1) * 5,
 }));

 const arr2 = new Array(4).fill(1);
export const optionsLimitPerPage = arr2.map((_, idx) => ({
    label: `${(idx + 1) * 5} items per page`,
    value: (idx + 1) * 5,
 }));


    
