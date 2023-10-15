// Define sample data for forum posts
const posts = [
    { id: 1, title: 'What is KPO and BPO', content: 'BPO refers to outsourcing non-primary activities to the third-party service provider for service to decrease the company\'s cost and increase productivity and efficiency. On the other hand, KPO refers to outsourcing highly skilled personnel to transfer or assign knowledge and processes to another company.', votes: 999, userId: 1, author:'Server' },
    { id: 2, title: 'Title of a Dummy Post', content: 'Content for a Dummy Post', votes: 0, userId: 2, author:'vpranav2310' },
    // Add more posts as needed
];

// Define a map to store comments for each post
const commentsMap = new Map();

// Function to add a comment for a post
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        // Get the comments list for this post
        const commentsList = commentsMap.get(postId) || [];

        // Add the new comment to the list
        commentsList.push(commentText);

        // Update the commentsMap with the new list of comments
        commentsMap.set(postId, commentsList);

        // Clear the comment input field
        commentInput.value = '';

        // Render the comments for this post
        renderComments(postId);
    }
}

// Function to render comments for a post
function renderComments(postId) {
    const commentsList = commentsMap.get(postId) || [];
    const commentsContainer = document.getElementById(`comments-${postId}`);

    // Clear existing comments
    commentsContainer.innerHTML = '';

    // Add each comment to the comments list
    commentsList.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment;
        commentsContainer.appendChild(commentItem);
    });
}

// Function to render the forum with specified posts
function renderForum(postsToRender) {
    const forumSection = document.querySelector('.forum');

    // Clear the forum content
    forumSection.innerHTML = '';

    // Loop through posts and create HTML elements for each post
    postsToRender.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const votearea =document.createElement('div');
        votearea.classList.add("votess");

        const contentElement = document.createElement('p');
        contentElement.textContent = post.content;

        const authorElement = document.createElement('p');
        authorElement.textContent = `${post.author}`;

        const voteElement = document.createElement('span');
        voteElement.textContent = `${post.votes}`;
        voteElement.setAttribute('class', 'vote');

        const upvoteButton = document.createElement('button');
        upvoteButton.textContent = 'Upvote';
        upvoteButton.setAttribute('class', 'vote');
        upvoteButton.setAttribute('class', 'btn-grad');
        upvoteButton.addEventListener('click', () => {
            post.votes++;
            voteElement.textContent = `${post.votes}`;
        });

        const downvoteButton = document.createElement('button');
        downvoteButton.textContent = 'Downvote';
        downvoteButton.setAttribute("class", "vote");
        downvoteButton.setAttribute("class", "btn-grad");
        downvoteButton.addEventListener('click', () => {
            post.votes--;
            voteElement.textContent = `${post.votes}`;
        });

        // Create comment input field and button
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment';
        commentInput.id = `comment-input-${post.id}`;

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.setAttribute("Class", "btn-grad");
        commentButton.setAttribute("Class", "block");
        commentButton.addEventListener('click', () => {
            addComment(post.id);
        });

        // Create comments list container
        const commentsContainer = document.createElement('ul');
        commentsContainer.id = `comments-${post.id}`;

        postDiv.appendChild(authorElement);
        postDiv.appendChild(titleElement);
        postDiv.appendChild(contentElement);
        postDiv.appendChild(votearea);
        votearea.appendChild(upvoteButton);
        votearea.appendChild(voteElement);
        votearea.appendChild(downvoteButton);
        postDiv.appendChild(commentInput);
        postDiv.appendChild(commentButton);
        postDiv.appendChild(commentsContainer);

        forumSection.appendChild(postDiv);

        renderComments(post.id);
    });
}

// Initialize the Quill rich text editor
var quill = new Quill('#editor', {
    theme: 'snow', // Choose a theme (e.g., 'snow' for a clean, minimal theme)
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
        ],
    },
});

// Function to handle form submission for creating a new post
// Function to handle form submission for creating a new post
function handleCreatePost(event) {
    event.preventDefault();

    const titleInput = document.getElementById('post-title');
    const authorInput = document.getElementById('post-author');
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    // Get the HTML content from the Quill editor
    const content = quill.root.innerHTML;

    if (title === '' || content === '' || author === '') {
        alert('Please fill in all required fields.');
        return;
    }

    // Create a new post object
    const newPost = {
        id: posts.length + 1,
        title: title,
        author: author,
        content: content, // Include the HTML content from Quill
        votes: 0,
        userId: 1,
    };

    // Add the new post to the posts array
    posts.push(newPost);

    // Clear the form inputs
    titleInput.value = '';
    quill.root.innerHTML = ''; // Clear the Quill editor content
    authorInput.value = '';

    // Render the forum to display the new post
    renderForum(posts);
}

// Add a submit event listener to the create post form
const createPostForm = document.getElementById('create-post-form');
createPostForm.addEventListener('submit', handleCreatePost);

// Initialize the forum with all posts
document.addEventListener('DOMContentLoaded', function () {
    renderForum(posts);
});

