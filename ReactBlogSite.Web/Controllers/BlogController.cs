using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBlogSite.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactBlogSite.Web.Models;

namespace ReactBlogSite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly string _connectionString;

        public BlogController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getposts")]
        public List<Post> GetPosts(int pageNumber = 1)
        {
            var amountDisplayed = 3;
            var repo = new BlogRepository(_connectionString);
            var amountToSkip = (pageNumber - 1) * amountDisplayed;
            return repo.GetPosts(amountToSkip, amountDisplayed);
        }

        [HttpGet]
        [Route("getpost")]
        public Post GetPost(int postID = 1)
        {
            var repo = new BlogRepository(_connectionString);
            return repo.GetPost(postID);
        }

        [HttpGet]
        [Route("GetTotalPosts")]
        public object GetTotalPosts()
        {
            var repo = new BlogRepository(_connectionString);
            var total = repo.GetPostsCount();
            return new { Total = total };
        }

        [HttpGet]
        [Route("getmostrecentpostid")]
        public PostIDViewModel GetMostRecentPostID()
        {
            var repo = new BlogRepository(_connectionString);
            var postID = repo.GetMostRecentPostID();
            return new PostIDViewModel { PostID = postID };
        }

        [HttpGet]
        [Route("gecommentatorname")]
        public object GeCommentatorName()
        {
            var commentatorName = String.IsNullOrEmpty(Request.Cookies["commentator-name"]) ? "" : Request.Cookies["commentator-name"];
            return new { CommentatorName = commentatorName };
        }

        [HttpPost]
        [Route("addcomment")]
        public void AddComment(Comment comment)
        {
            Response.Cookies.Append("commentator-name", comment.CommentatorName);
            var repo = new BlogRepository(_connectionString);
            comment.Date = DateTime.Now;
            repo.AddComment(comment);
        }

        [HttpPost]
        [Route("addpost")]
        public void AddPost(Post post)
        {
            var repo = new BlogRepository(_connectionString);
            post.DateSubmitted = DateTime.Now;    
            repo.AddPost(post);
        }
    }
}
