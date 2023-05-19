document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    const postButton = document.getElementById('postButton');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const imageInput = document.getElementById('image');
    const postsContainer = document.getElementById('posts');
  
    addButton.addEventListener('click', function() {
      modal.style.display = 'block';
    });
  
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    postButton.addEventListener('click', function() {
      const title = titleInput.value;
      const content = contentInput.value;
      const imageFile = imageInput.files[0];
  
      if (title && content && imageFile) {
        const reader = new FileReader();
  
        reader.onload = function() {
          const imageUrl = reader.result;
          const post = createPost(title, content, imageUrl);
          postsContainer.appendChild(post);
  
          // Save the post to localStorage
          savePost(title, content, imageUrl);
  
          // Reset input values
          titleInput.value = '';
          contentInput.value = '';
          imageInput.value = '';
        };
  
        reader.readAsDataURL(imageFile);
  
        modal.style.display = 'none';
      }
    });
  
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    // Load existing posts from localStorage
    loadPosts();
  
    function createPost(title, content, imageUrl) {
      const post = document.createElement('div');
      post.classList.add('post');
  
      const postImage = document.createElement('img');
      postImage.src = imageUrl;
      post.appendChild(postImage);
  
      const postTitle = document.createElement('h2');
      postTitle.textContent = title;
      post.appendChild(postTitle);
  
      const postContent = document.createElement('p');
      postContent.textContent = content;
      post.appendChild(postContent);
  
      const postDateTime = document.createElement('p');
      postDateTime.textContent = getCurrentDateTime();
      post.appendChild(postDateTime);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        post.remove();
  
        // Remove the post from localStorage
        deletePost(title);
      });
      post.appendChild(deleteButton);
  
      return post;
    }
  
    function getCurrentDateTime() {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return now.toLocaleDateString('en-US', options);
    }
  
    function savePost(title, content, imageUrl) {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
  
      const post = {
        title: title,
        content: content,
        imageUrl: imageUrl
      };
  
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  
    function deletePost(title) {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
  
      posts = posts.filter(function(post) {
        return post.title !== title;
      });
  
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  
    function loadPosts() {
      let posts = JSON.parse(localStorage.getItem('posts')) || [];
  
      posts.forEach(function(post) {
        const { title, content, imageUrl } = post;
        const newPost = createPost(title, content, imageUrl);
        postsContainer.appendChild(newPost);
      });
    }
  });
  