export let isNull = (value: any): boolean => {
  return value === null || value === undefined;
};

export let isNotNull = (value: any): boolean => {
  return !isNull(value);
};

export let isEmpty = (value: any): boolean => {
  if (isNotNull(value)) {
    if (value instanceof Array) {
      return value.length === 0;
    }
    return value.toString().trim() === '' || value === 'undefined';
  } else {
    return true;
  }
};

export let isNotEmpty = (value: any): boolean => {
  return !isEmpty(value);
};
