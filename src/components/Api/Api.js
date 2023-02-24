class Api {
    constructor() {
        this.token = localStorage.getItem("token");
        this.path = "https://api.react-learning.ru";
        this.group = "sm8"
    }

//методы

signIn(body) {
    return fetch(`${this.path}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify(body)
        });
    }

signUp(body) {
    body.group = this.group;
    return fetch(`${this.path}/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },
        body: JSON.stringify(body)
    });
}

getAllPosts(token) {
    return fetch(`${this.path}/v2/${this.group}/posts`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}

getPost(id) {
    return fetch(`${this.path}/v2/${this.group}/posts/${id}`, {
        headers: {
            "authorization": `Bearer ${this.token}`
        }
    })
}

addPost(body) {
    return fetch(`${this.path}/v2/${this.group}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.token}`
            },
        body: JSON.stringify(body)
    })
}

editPost(id, body) {
    return fetch(`${this.path}/v2/${this.group}/posts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.token}`
            },
        body: JSON.stringify(body)
    })
}

deletePost(id) {
    return fetch(`${this.path}/v2/${this.group}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${this.token}`
            }
    })
}

userInfo(token) {
    return fetch(`${this.path}/v2/${this.group}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}` 
            }
    })
}

getUserInfo(id) {
    return fetch(`${this.path}/v2/${this.group}/users/${id}`, {
        headers: {
            "authorization": `Bearer ${this.token}`
        }
    })
}

getPostComments(id) {
    return fetch(`${this.path}/v2/${this.group}/posts/comments/${id}`, {
        headers: {
            "authorization": `Bearer ${this.token}`
        }
    })
}

addComment(body, id) {
    return fetch(`${this.path}/v2/${this.group}/posts/comments/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${this.token}`
            },
        body: JSON.stringify(body)
    })
}

deleteComment(postId, commentId) {
    return fetch(`${this.path}/v2/${this.group}/posts/comments/${postId}/${commentId}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${this.token}`
            }
    })
}

setLike(id) {
    return fetch(`${this.path}/v2/${this.group}/posts/likes/${id}`, {
        method: "PUT",
        headers: {
            "authorization": `Bearer ${this.token}`
        }
    })
}

deleteLike(id) {
    return fetch(`${this.path}/v2/${this.group}/posts/likes/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${this.token}`
        }
    })
}

editUser(body) {
    return fetch(`${this.path}/v2/${this.group}/users/me`, {
        method: "PATCH",
        headers: {
            "authorization": `Bearer ${this.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

editAvatar(body) {
    return fetch(`${this.path}/v2/${this.group}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            "authorization": `Bearer ${this.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}


}



export const api = new Api({
    path: 'https://api.react-learning.ru',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
    group: 'sm8',
})