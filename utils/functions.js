function convertToSlug(title) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

function cleanPosts(data) {
    let cleaned = []
    data.forEach(item => {
        cleaned.push(cleanPost(item))
    });
    return cleaned
}

function cleanPost(post) {
    return extract_meta_data(post, 'post_meta')
}

function extract_meta_data(data, meta_data_key) {
    data = data.toJSON()
    const meta = data[meta_data_key]
    delete data[meta_data_key]
    meta.forEach(item => {
        data[item.meta_key] = item.meta_value
    });
    return data
}

export {
    convertToSlug,
    extract_meta_data,
    cleanPosts,
    cleanPost
}