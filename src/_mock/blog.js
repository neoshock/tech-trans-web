import { faker } from '@faker-js/faker';
import { fetchWithToken } from '../utils/helper';

// ----------------------------------------------------------------------

const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/blog`;

export const createBlog = async (newBlog) => {
    const response = await fetchWithToken(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
    });

    return response;
};

export const getBlogs = async () => {
    const response = await fetchWithToken(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(response.data);
    return response.data;
};

export const getBlogDetail = async (id) => {
    const response = await fetchWithToken(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let post = response.data;
    console.log(post);
    post = {
        id: post.blogId,
        cover: `/assets/images/covers/cover_${1}.jpg`,
        title: post.issue,
        createdAt: post.createdAt,
        view: faker.datatype.number(),
        comment: faker.datatype.number(),
        share: faker.datatype.number(),
        favorite: faker.datatype.number(),
        author :{
            name: post.teacherName != null ?
                post.teacherName : 'Desconocido',
            avatarUrl: `/assets/images/avatars/avatar_${1}.jpg`,
        },
        content: post.content,
        background: faker.image.imageUrl(
            1920,
            1080,
            'computer',
            true,
            true,
        )
    }
    return post;
}

export default async function fetchAndPreparePost() {
    let posts = [];
    try {
        posts = await getBlogs();
        posts = posts.map((post, index) => {
            return {
                id: post.blogId,
                cover: `/assets/images/covers/cover_${index + 1}.jpg`,
                title: post.issue,
                createdAt: post.createdAt,
                view: faker.datatype.number(),
                comment: faker.datatype.number(),
                share: faker.datatype.number(),
                favorite: faker.datatype.number(),
                author: {
                    name: post.teacherName,
                    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
                },
                content: post.content,
                background: faker.image.imageUrl(
                    1920,
                    1080,
                    'computer',
                    true,
                    true,
                )
            };
        });
    } catch (error) {
        console.error('Error in fetchAndPreparePost:', error);
    }
    return posts;
}
