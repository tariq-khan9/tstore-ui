const storeModel = (id, slug, name, category, description, image_path, price, open) => {
    localStorage.setItem('id', id)
    localStorage.setItem('slug', slug)
    localStorage.setItem('name', name)
    localStorage.setItem('category', category)
    localStorage.setItem('description', description)
    localStorage.setItem('image_path', image_path)
    localStorage.setItem('price', price)
    localStorage.setItem('open', open)
}
const getModel = () => {
   return localStorage.getItem('open', 'open')
}

export {storeModel, getModel}