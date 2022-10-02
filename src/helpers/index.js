// Fisher–Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

const slugify = (str) =>{
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
export const preparePath = (array, id) => {
    let link = "";
    array.forEach((item) => {
        let path = slugify(item);
        link += `/${path}`;
    });
    link += `/${id}`;
    return link;
}