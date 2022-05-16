using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBlogSite.Data
{
    public class BlogRepository
    {
        private string _connectionString;
        public BlogRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Post> GetPosts(int amountToSkip, int amountDisplayed)
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.Include(p => p.Comments)
                .OrderByDescending(p => p.DateSubmitted)
                .Skip(amountToSkip)
                .Take(amountDisplayed).ToList();
        }

        public int GetPostsCount()
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.Count();
        }

        public Post GetPost(int postID)
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.Include(p => p.Comments).FirstOrDefault(p => p.ID == postID);
        }
        public int GetMostRecentPostID()
        {
            using var context = new BlogDataContext(_connectionString);
            return context.Posts.OrderByDescending(p => p.DateSubmitted).Select(p => p.ID).FirstOrDefault();
        }

        public void AddPost(Post post)
        {
            using var context = new BlogDataContext(_connectionString);
            context.Posts.Add(post);
            context.SaveChanges();
        }

        public void AddComment(Comment comment)
        {
            using var context = new BlogDataContext(_connectionString);
            context.Comments.Add(comment);
            context.SaveChanges();
        }
    }
}
