const buildFormData = (data: { [key: string]: any }) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined)
      formData.append(key, value);
  }

  return formData;
}

export default buildFormData;