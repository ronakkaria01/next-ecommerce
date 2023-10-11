import jwt from "jsonwebtoken"

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

async function refreshAccessToken(token) {
    try {
        const refreshResponse = await fetch(`${process.env.API_URL}/refresh`, {
            method: 'POST',
            body: JSON.stringify({
                refreshToken: token.refreshToken,
            })
        })

        if (!refreshResponse.ok) {
            throw new Error('Error refreshing tokens');
        }

        const refreshedData = (await refreshResponse.json())
        return {
            ...token,
            accessToken: refreshedData.data.accessToken,
            refreshToken: refreshedData.data.refreshToken,
            expiresIn: refreshedData.data.expiresIn,
        };
    } catch (error) {
        console.error("here", error);

        // NOTE: if the refreshToken is not valid when we try to make, it will hit this error.
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

function generateTokens(user) {
    const accessToken = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET)
    const refreshToken = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_REFRESH_SECRET)
    const expiresIn = Date.now() + 5000
    return {
        user,
        accessToken,
        refreshToken,
        expiresIn
    }
}

export {
    convertToSlug,
    extract_meta_data,
    cleanPosts,
    cleanPost,
    refreshAccessToken,
    generateTokens
}