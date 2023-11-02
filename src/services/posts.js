export const getAllPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
  } catch (e) {
    throw Error(e);
  }
}