const removePrefix = (url) => {
  return url.replace(/.*?:\/\//, ""); // Menghapus segalanya sebelum dan termasuk ://
};

export default removePrefix;
