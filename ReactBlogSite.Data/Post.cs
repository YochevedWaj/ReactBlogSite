using System;
using System.Collections.Generic;

namespace ReactBlogSite.Data
{
    public class Post
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime DateSubmitted { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
